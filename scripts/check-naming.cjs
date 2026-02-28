const fs = require('node:fs');
const path = require('node:path');

const rootDir = process.cwd();

const checks = [
  {
    root: 'src/components',
    matcher: file => file.endsWith('.vue'),
    isValid: file => /^[A-Z][A-Za-z0-9]*\.vue$/.test(path.basename(file)),
    expected: 'PascalCase.vue'
  },
  {
    root: 'src/views',
    matcher: file => file.endsWith('.vue'),
    isValid: file => /^[A-Z][A-Za-z0-9]*\.vue$/.test(path.basename(file)),
    expected: 'PascalCase.vue'
  },
  {
    root: 'src/composables',
    matcher: file => file.endsWith('.ts'),
    isValid: file => /^[a-z][A-Za-z0-9]*\.ts$/.test(path.basename(file)),
    expected: 'camelCase.ts'
  },
  {
    root: 'src/services',
    matcher: file => file.endsWith('.ts'),
    isValid: file => /^[a-z][A-Za-z0-9]*\.ts$/.test(path.basename(file)),
    expected: 'camelCase.ts'
  },
  {
    root: 'e2e/tests',
    matcher: file => file.endsWith('.test.ts'),
    isValid: file => /^[a-z0-9]+(?:-[a-z0-9]+)*\.test\.ts$/.test(path.basename(file)),
    expected: 'kebab-case.test.ts'
  }
];

const ignoredDirs = new Set([
  'node_modules',
  '.git',
  'dist',
  'build',
  'coverage',
  'playwright-report',
  'playwright-results',
  'src-tauri',
  '_bmad',
  '_bmad-output',
  'public',
  'website'
]);

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  const files = [];
  const stack = [dir];

  while (stack.length > 0) {
    const current = stack.pop();
    if (!current) continue;
    const entries = fs.readdirSync(current, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(current, entry.name);
      if (entry.isSymbolicLink()) continue;

      if (entry.isDirectory()) {
        if (ignoredDirs.has(entry.name)) continue;
        stack.push(fullPath);
      } else if (entry.isFile()) {
        files.push(fullPath);
      }
    }
  }

  return files;
}

const violations = [];

for (const file of [...walk(path.join(rootDir, 'src')), ...walk(path.join(rootDir, 'tests')), ...walk(path.join(rootDir, 'e2e'))]) {
  const rel = path.relative(rootDir, file).split(path.sep).join('/');

  if (/\.spec\.(ts|tsx)$/.test(rel)) {
    violations.push(`${rel} -> use .test.ts naming`);
  }

  if (/\s/.test(path.basename(rel))) {
    violations.push(`${rel} -> file names must not contain spaces`);
  }
}

for (const check of checks) {
  const absRoot = path.join(rootDir, check.root);
  for (const file of walk(absRoot)) {
    const rel = path.relative(rootDir, file).split(path.sep).join('/');
    if (!check.matcher(rel)) continue;
    if (!check.isValid(rel)) {
      violations.push(`${rel} -> expected ${check.expected}`);
    }
  }
}

if (violations.length > 0) {
  console.error('\nNaming convention check failed:\n');
  for (const violation of violations) {
    console.error(`- ${violation}`);
  }
  process.exit(1);
}

console.log('Naming convention check passed.');
