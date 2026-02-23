# Manifestation Algorithm

[![License: MIT](https://img.shields.io/badge/License-MIT-violet.svg)](LICENSE)
[![Tests](https://img.shields.io/badge/tests-581%20unit%20%7C%20735%20E2E-brightgreen)](#testing)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)
[![Tauri](https://img.shields.io/badge/Tauri-2.x-orange)](https://tauri.app/)

A **privacy-first** desktop application for tracking and scoring personal development practices across 40 weighted categories, built with **Tauri 2 + Vue 3 + TypeScript** on the frontend and **Rust + libp2p** on the backend.

> **Offline-first.** All data is stored locally in SQLite — nothing leaves your machine unless you explicitly opt in to anonymous peer ranking.

---

## Features

- **40-Category Questionnaire** – Weighted 1–10 slider inputs mapping to a 10,000-point score model
- **Score Quality Tiers** – Real-time label (Not Started → Starting Out → Building → Aligned → Manifesting) with progress-gated submit button
- **Keyboard Shortcuts** – Press digit keys 1–0 to instantly set the current question rating while in step mode
- **Local Encrypted Storage** – SQLite with WAL mode and automatic migration versioning
- **Auto-Save** – Answers persist every keystroke; no data is lost on close
- **Session Recovery** – Resume or discard an in-progress session on startup
- **Dashboard & Statistics** – Score history charts, category breakdowns, trend analysis with date-range filtering (7d / 30d / 90d / 1y / All Time / custom)
- **Category Drill-Down** – Per-category sparklines with trend detection (improving / stable / declining)
- **Chart Fullscreen** – Expand any chart to fullscreen with one click
- **Chart Clipboard Copy** – Copy any chart as a PNG to the system clipboard
- **Excel Export** – Export session history as a `.xlsx` spreadsheet
- **CSV Export** – Export session history as a plain CSV file
- **PDF Export** – Export your full score report as a PDF
- **HTML Export** – Export a chart and score as a self-contained HTML file
- **Anonymous Network Ranking** – Opt-in P2P gossipsub network using libp2p for aggregate percentile rankings, with Ed25519 application-level signing (no node identity exposed)
- **Auto-Update** – Background update download with in-app notification and one-click install
- **Privacy-First** – Zero PII; category keys are validated to reject emails/URLs; all data stays on your machine unless you opt in

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
    main.rs       # Entry point
    identity.rs   # Ed25519 user identity (persistent, separate from node ID)
    network/      # libp2p gossipsub node + aggregation
      mod.rs      # Public API surface
      node.rs     # GossipSub behaviour + swarm lifecycle
      types.rs    # Shared types (PeerStats, AggregatedScore)
      utils.rs    # Helpers (topic hashing, peer ID formatting)
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

Created by Giovanni Ilacqua

Updated by Tyshawn Despenza

---

> **Disclaimer**: This project is not affiliated with, endorsed by, or connected to GIN (Global Information Network) in any way.
