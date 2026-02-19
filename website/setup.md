---
layout: default
title: Installation & Setup
---

# Installation & Setup

## System Requirements

| Component | Minimum | Recommended |
|-----------|---------|-------------| 
| OS | Windows 10, macOS 11, Ubuntu 20.04 | Windows 11, macOS 13, Ubuntu 22.04 |
| RAM | 2GB | 4GB+ |
| Disk | 200MB | 500MB+ |
| Node.js | 18 | 20+ |
| Rust | 1.70 | Latest stable |

## Platform-Specific Prerequisites

### macOS
```bash
xcode-select --install
```

### Ubuntu/Debian
```bash
sudo apt-get install -y \
  libgtk-3-dev libwebkit2gtk-4.1-dev libappindicator3-dev \
  librsvg2-dev patchelf libssl-dev libsoup-3.0-dev pkg-config
```

### Windows
No additional system dependencies required. Windows SDK is included in Tauri build process.

## Installation Steps

### 1. Clone Repository
```bash
git clone https://github.com/tdespenza/manifestation-algorithm.git
cd manifestation-algorithm
```

### 2. Install Node Dependencies
```bash
npm install
```

### 3. Configure Git Hooks (One-time)
```bash
git config core.hooksPath .githooks
```

This enables automatic version synchronization on every commit.

### 4. Development Mode
```bash
npm run tauri dev
```

This launches the Tauri development window with hot-reload on both frontend and backend changes.

## Troubleshooting

### Port Already in Use
If port 1420 is already in use:
```bash
# Kill the process using port 1420
lsof -ti:1420 | xargs kill -9
```

### Rust Compilation Issues
```bash
# Update Rust toolchain
rustup update

# Clear Rust cache
cargo clean
cargo build
```

### Node Issues
```bash
# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## Building for Distribution

```bash
npm run tauri build
```

Output binaries:
- **Windows**: `src-tauri/target/release/bundle/msi/`
- **macOS**: `src-tauri/target/release/bundle/dmg/`
- **Linux**: `src-tauri/target/release/bundle/appimage/`

## Version Management

Versions are automatically synchronized across:
- `package.json`
- `src-tauri/Cargo.toml`
- `src-tauri/tauri.conf.json`

To bump version:
```bash
npm version patch   # 0.1.0 → 0.1.1
npm version minor   # 0.1.0 → 0.2.0
npm version major   # 0.1.0 → 1.0.0
```

The git pre-commit hook will automatically sync versions on commit.
