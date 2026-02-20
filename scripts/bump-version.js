#!/usr/bin/env node

/**
 * Bump the patch version in package.json, then sync to all config files.
 *
 * Run automatically from the pre-commit hook so every commit on dev gets a
 * unique version number and the auto-merge / release workflow never tries to
 * push a tag that already exists.
 *
 * Files updated:
 *   package.json             — version bumped (patch increment)
 *   src-tauri/Cargo.toml     — version synced
 *   src-tauri/tauri.conf.json — version synced
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

// ── 1. Bump patch version in package.json ─────────────────────────────────
const pkgPath = path.join(root, 'package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

const [major, minor, patch] = pkg.version.split('.').map(Number);
const next = `${major}.${minor}.${patch + 1}`;

pkg.version = next;
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
console.log(`📦 Version bumped: ${major}.${minor}.${patch} → ${next}`);

// ── 2. Sync to Cargo.toml ─────────────────────────────────────────────────
const cargoPath = path.join(root, 'src-tauri', 'Cargo.toml');
let cargo = fs.readFileSync(cargoPath, 'utf8');
cargo = cargo.replace(/^version = ".*?"$/m, `version = "${next}"`);
fs.writeFileSync(cargoPath, cargo);
console.log(`✓ Synced src-tauri/Cargo.toml`);

// ── 3. Sync to tauri.conf.json ────────────────────────────────────────────
const tauriConfPath = path.join(root, 'src-tauri', 'tauri.conf.json');
const tauriConf = JSON.parse(fs.readFileSync(tauriConfPath, 'utf8'));
tauriConf.version = next;
fs.writeFileSync(tauriConfPath, JSON.stringify(tauriConf, null, 2) + '\n');
console.log(`✓ Synced src-tauri/tauri.conf.json`);

console.log(`\n✅ Version ${next} applied to all config files.`);
