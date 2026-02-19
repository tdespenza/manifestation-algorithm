# Manifestation Algorithm

[![License: MIT](https://img.shields.io/badge/License-MIT-violet.svg)](LICENSE)

A privacy-first desktop application for tracking and scoring personal development practices, built with **Tauri + Vue 3 + TypeScript**.

---

## Features

- **40-Category Questionnaire** – Weighted 1-10 slider inputs mapping to a 10,000-point score model
- **Local Encrypted Storage** – SQLite with automatic migration versioning
- **Auto-Save** – Answers persist every time you move to the next question
- **Session Recovery** – Resume or discard an in-progress session on startup
- **Dashboard & Statistics** – Track score history and category breakdowns over time
- **Anonymous Network Ranking** – Opt-in P2P gossipsub network using libp2p for aggregate percentile rankings, with Ed25519 application-level signing (no node identity exposed)
- **Privacy-First** – Zero PII; category keys are validated to reject emails/URLs

---

## Prerequisites

| Tool | Version |
|------|---------|
| Node.js | ≥ 20 |
| npm | ≥ 10 |
| Rust | stable (via [rustup](https://rustup.rs)) |
| Tauri CLI | installed via `npm run tauri` |

### macOS extras
```bash
xcode-select --install
```

### Ubuntu/Debian extras
```bash
sudo apt-get install -y \
  libgtk-3-dev libwebkit2gtk-4.1-dev libappindicator3-dev \
  librsvg2-dev patchelf libssl-dev libsoup-3.0-dev pkg-config
```

---

## Setup

```bash
# Clone
git clone https://github.com/tyshawn/manifestation-algorithm.git
cd manifestation-algorithm

# Install JS dependencies
npm install

# Configure git hooks (one-time setup)
git config core.hooksPath .githooks

# Run in development mode (hot-reload frontend + Tauri window)
npm run tauri dev
```

> **Note**: Git hooks are automatically wired to sync version numbers across `package.json`, `Cargo.toml`, and `tauri.conf.json` on every commit.

---

## Testing

```bash
# Frontend unit tests (Vitest)
npx vitest run

# Frontend tests with coverage
npx vitest run --coverage

# TypeScript type-check only
npx vue-tsc --noEmit

# Rust backend tests
cd src-tauri && cargo test
```

---

## Building

```bash
# Build distributable for current platform
npm run tauri build

# Output is in src-tauri/target/release/bundle/
```

Cross-platform builds are handled by GitHub Actions CI (see `.github/workflows/ci.yml`).

---

## Version Management

Versions are automatically synchronized across three files on every commit via git pre-commit hook:
- `package.json` (source of truth)
- `src-tauri/Cargo.toml` 
- `src-tauri/tauri.conf.json`

### Bumping Version

```bash
npm version patch   # 0.1.0 → 0.1.1
npm version minor   # 0.1.0 → 0.2.0
npm version major   # 0.1.0 → 1.0.0
```

Or manually sync without bumping:

```bash
npm run sync-version
```

The git pre-commit hook ensures all three files stay in sync automatically.

---

## Project Structure

```
src/
  components/
    ui/           # Questionnaire, QuestionItem, ResumeDialog
    dashboard/    # CategoryCard, StatsPanel, NetworkRanking
    charts/       # ProgressChart
  composables/    # useNetwork (P2P state)
  data/           # questions.ts (the 40 categories definition)
  services/       # db.ts, migrations.ts, scoring.ts, sessionManager.ts
  stores/         # Pinia stores (questionnaire, history)
  types/          # TypeScript interfaces
  views/          # HomeView, DashboardView, CategoryDetailView, SettingsView
src-tauri/
  src/
    lib.rs        # Tauri commands + app setup
    network.rs    # libp2p gossipsub node + aggregation
    identity.rs   # Ed25519 user identity (persistent, separate from node ID)
```

---

## Architecture Decisions

See `_bmad-output/planning-artifacts/ADR-*.md` for full Architecture Decision Records covering:
- Desktop framework (Tauri)
- Encrypted storage (SQLite)
- P2P network (IPFS/libp2p)
- Frontend (Vue 3)
- Privacy design (Zero PII)

---

## License

MIT License — see [LICENSE](LICENSE) for details.

Copyright © 2026 Global Information Network
Created By Giovanni Ilacqua
Updated by Tyshawn Despenza
