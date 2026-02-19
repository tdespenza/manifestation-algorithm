# Contributing to Manifestation Algorithm

First off, thanks for taking the time to contribute! 🎉

The goal of the Manifestation Algorithm is to build a privacy-first, offline-capable tool for personal development tracking. We welcome contributions from everyone.

## Code of Conduct

This project and everyone participating in it is governed by the [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## How to Contribute

### Reporting Bugs

- Ensure the bug was not already reported by searching on GitHub under [Issues](https://github.com/tdespenza/manifestation-algorithm/issues).
- If you're unable to find an open issue addressing the problem, [open a new one](https://github.com/tdespenza/manifestation-algorithm/issues/new). Be sure to include a **title and clear description**, as much relevant information as possible, and a **code sample** or an **executable test case** demonstrating the expected behavior that is not occurring.

### Suggesting Enhancements

- Open a new issue with a clear title and description.
- Explain why this enhancement would be useful to most users.
- Provide examples of how the feature would work.

### Pull Requests

1. **Fork the repo** and create your branch from `dev`.
2. If you've added code that should be tested, add tests.
3. If you've changed APIs, update the documentation.
4. Ensure the test suite passes (`npm run test` and `cargo test`).
5. Make sure your code lints (`cargo clippy` and `npm run lint`).
6. Issue that pull request!

## Development Setup

### Prerequisites

- Node.js ≥ 20
- Rust (stable)
- Tauri CLI

### Initial Setup

```bash
git clone https://github.com/YOUR-USERNAME/manifestation-algorithm.git
cd manifestation-algorithm
npm install
git config core.hooksPath .githooks
```

### Running Locally

```bash
npm run tauri dev
```

### Running Tests

```bash
# Frontend
npm run test

# Backend
cd src-tauri && cargo test
```

## Project Structure

- `src/` - Vue 3 Frontend
- `src-tauri/` - Rust Backend
- `website/` - GitHub Pages site
- `docs/` - Architecture & Protocol documentation

## Commit Messages

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Formatting, missing semi colons, etc
- `refactor:` Refactoring production code
- `test:` Adding tests, refactoring test
- `chore:` Build scripts, no production code change

## Architecture

Please review the [Architecture Decisions](_bmad-output/planning-artifacts/ADR-Index.md) before making major architectural changes.

## License

By contributing, you agree that your contributions will be licensed under its MIT License.
