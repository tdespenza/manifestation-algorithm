#!/usr/bin/env node

/**
 * Bump the version in package.json based on the conventional commit type,
 * then delegate syncing to sync-version.js.
 *
 * Bump rules (Conventional Commits):
 *   BREAKING CHANGE footer or "!" after type  →  major
 *   feat:                                      →  minor
 *   fix: / chore: / docs: / style: /
 *     refactor: / test: / perf: / ci:          →  patch
 *
 * Invoked automatically from the commit-msg hook:
 *   node scripts/bump-version.js <path-to-commit-msg-file>
 *
 * May also be overridden via the BUMP_TYPE env variable:
 *   BUMP_TYPE=minor git commit -m "feat: ..."
 *
 * Files updated (via sync-version.js):
 *   package.json              — version bumped here
 *   src-tauri/Cargo.toml      — synced by sync-version.js
 *   src-tauri/tauri.conf.json — synced by sync-version.js
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

// ── 1. Determine bump type ────────────────────────────────────────────────

/**
 * Parse a conventional commit message and return the SemVer bump level.
 * @param {string} msg
 * @returns {'major'|'minor'|'patch'}
 */
function getBumpType(msg) {
  // BREAKING CHANGE in footer or "!" modifier after the type
  if (/BREAKING[- ]CHANGE/i.test(msg) || /^[a-z]+(?:\(.+\))?!:/m.test(msg)) {
    return 'major';
  }
  if (/^feat(?:\(.+\))?:/m.test(msg)) {
    return 'minor';
  }
  return 'patch';
}

let bumpType;

if (process.env.BUMP_TYPE) {
  bumpType = process.env.BUMP_TYPE;
  console.log(`📌 BUMP_TYPE env overrides to: ${bumpType}`);
} else {
  const msgFile = process.argv[2];
  const commitMsg = msgFile ? fs.readFileSync(msgFile, 'utf8').trim() : '';
  bumpType = getBumpType(commitMsg);
}

// ── 2. Bump version in package.json ──────────────────────────────────────
const pkgPath = path.join(root, 'package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

const [major, minor, patch] = pkg.version.split('.').map(Number);
let next;
switch (bumpType) {
  case 'major':
    next = `${major + 1}.0.0`;
    break;
  case 'minor':
    next = `${major}.${minor + 1}.0`;
    break;
  default:
    next = `${major}.${minor}.${patch + 1}`;
}

pkg.version = next;
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
console.log(`📦 Version bumped (${bumpType}): ${major}.${minor}.${patch} → ${next}`);

// ── 3. Delegate sync to sync-version.js ──────────────────────────────────
execSync('node scripts/sync-version.js', { cwd: root, stdio: 'inherit' });
