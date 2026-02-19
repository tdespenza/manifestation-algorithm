---
layout: default
title: Manifestation Algorithm
---

# Manifestation Algorithm

A privacy-first desktop application for tracking and scoring personal development practices.

## Features

- **40-Category Questionnaire** – Weighted scoring system with 1-10 slider inputs
- **Local Encrypted Storage** – SQLite with AES-256 encryption
- **Auto-Save** – Answers persist automatically as you progress
- **Dashboard & Statistics** – Track score history and category breakdown
- **Anonymous Network Ranking** – Optional P2P percentile rankings via libp2p
- **Cross-Platform** – Windows, macOS, and Linux support
- **Privacy-First** – Zero PII; all data stays on your device

## Quick Start

### Prerequisites
- Node.js ≥ 20
- Rust (stable)
- Tauri CLI

### Setup

```bash
git clone https://github.com/tdespenza/manifestation-algorithm.git
cd manifestation-algorithm

# Configure git hooks (one-time setup)
git config core.hooksPath .githooks

# Install dependencies
npm install

# Run in development
npm run tauri dev
```

### Testing

```bash
# Frontend tests
npx vitest run

# Rust tests
cd src-tauri && cargo test

# Type checking
npx vue-tsc --noEmit
```

### Building

```bash
# Build for your platform
npm run tauri build

# Output: src-tauri/target/release/bundle/
```

## Documentation

- [Architecture Decisions](https://github.com/tdespenza/manifestation-algorithm/tree/main/_bmad-output/planning-artifacts)
- [Phase Plans](https://github.com/tdespenza/manifestation-algorithm/tree/main/_bmad-output/planning-artifacts)
- [Network Design](https://github.com/tdespenza/manifestation-algorithm/blob/main/docs/network-architecture.md)
- [Scoring Formula](https://github.com/tdespenza/manifestation-algorithm/blob/main/docs/scoring-formula.md)

## Technology Stack

- **Frontend**: Vue 3 + TypeScript + Vite
- **Desktop**: Tauri (Rust backend)
- **Database**: SQLite with encryption
- **Network**: libp2p (P2P sharing)
- **Visualization**: Chart.js

## License

See [LICENSE](https://github.com/tdespenza/manifestation-algorithm/blob/main/LICENSE) for details.

## Contributing

This project uses BMAD-driven development. See the [copilot-instructions](https://github.com/tdespenza/manifestation-algorithm/blob/main/.github/copilot-instructions.md) for workflow details.
