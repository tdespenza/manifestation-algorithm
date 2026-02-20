#!/usr/bin/env node

/**
 * Synchronize version across all configuration files
 * Reads version from package.json and updates:
 * - src-tauri/Cargo.toml
 * - src-tauri/tauri.conf.json
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');

// Read package.json
const packageJsonPath = path.join(projectRoot, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
const version = packageJson.version;

console.log(`📌 Syncing version: ${version}`);

// Update Cargo.toml
const cargoPath = path.join(projectRoot, 'src-tauri', 'Cargo.toml');
let cargoContent = fs.readFileSync(cargoPath, 'utf8');
cargoContent = cargoContent.replace(
  /^version = ".*?"$/m,
  `version = "${version}"`
);
fs.writeFileSync(cargoPath, cargoContent);
console.log(`✓ Updated src-tauri/Cargo.toml`);

// Update tauri.conf.json
const tauriConfPath = path.join(projectRoot, 'src-tauri', 'tauri.conf.json');
const tauriConf = JSON.parse(fs.readFileSync(tauriConfPath, 'utf8'));
tauriConf.version = version;
fs.writeFileSync(tauriConfPath, JSON.stringify(tauriConf, null, 2) + '\n');
console.log(`✓ Updated src-tauri/tauri.conf.json`);

// Update Cargo.lock (root package entry only)
const cargoLockPath = path.join(projectRoot, 'src-tauri', 'Cargo.lock');
let cargoLockContent = fs.readFileSync(cargoLockPath, 'utf8');
// Replace the version line that immediately follows the root package name declaration
cargoLockContent = cargoLockContent.replace(
  /(name = "manifestation-app"\nversion = )"[^"]+"/,
  `$1"${version}"`
);
fs.writeFileSync(cargoLockPath, cargoLockContent);
console.log(`✓ Updated src-tauri/Cargo.lock`);

console.log(`\n✅ Version synced successfully!`);
