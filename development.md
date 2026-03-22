---
layout: default
title: Development Guide
---

# Development Guide

## Project Structure

```
manifestation-algorithm/
├── src/                          # Frontend (Vue 3)
│   ├── components/              # Vue components
│   │   ├── ui/                 # Questionnaire, dialogs
│   │   ├── dashboard/          # Stats views
│   │   └── charts/             # Visualizations
│   ├── composables/            # Vue composables (hooks)
│   ├── stores/                 # Pinia state management
│   ├── services/               # API services (db, network)
│   ├── types/                  # TypeScript interfaces
│   ├── views/                  # Page-level components
│   └── data/                   # Static data (questions)
│
├── src-tauri/                   # Backend (Rust)
│   ├── src/
│   │   ├── lib.rs             # Main library (Tauri commands)
│   │   ├── network.rs         # libp2p networking
│   │   ├── identity.rs        # User identity management
│   │   └── db.rs              # Database layer
│   └── Cargo.toml             # Rust dependencies
│
├── website/                     # GitHub Pages (you are here!)
├── docs/                        # Architecture knowledge
├── _bmad/                       # BMAD runtime (agents, workflows)
├── _bmad-output/               # BMAD artifacts
├── package.json                # Node dependencies
├── tsconfig.json               # TypeScript config
├── vite.config.ts              # Vite build config
└── .github/workflows/          # CI/CD pipelines
```

## Development Workflow

### 1. Feature Development
```bash
# Create feature branch
git checkout -b feature/my-feature

# Make changes, commit regularly
git commit -m "feat: describe change"

# Run tests frequently
npm run test
cargo test
```

### 2. Testing Checklist
- [ ] Unit tests pass: `npm run test`
- [ ] Type check passes: `npx vue-tsc --noEmit`
- [ ] Rust compiles: `cargo check --lib`
- [ ] No linting errors (configured in eslint/prettier)
- [ ] Manual testing in dev mode: `npm run tauri dev`

### 3. Committing Changes
```bash
# Version sync happens automatically via pre-commit hook
git add .
git commit -m "feat: my feature

Detailed description of changes.
Relates to issue #123"

# Hook automatically:
# ✓ Syncs versions across package.json/Cargo.toml/tauri.conf.json
# ✓ Stages updated config files
```

### 4. Push & Merge
```bash
# Push feature branch
git push origin feature/my-feature

# Create pull request on GitHub
# After review and approval:
git checkout main
git merge feature/my-feature
git push origin main
```

## Testing

### Frontend Tests
```bash
# Run all tests
npm run test

# Run specific test file
npx vitest src/services/db.test.ts

# Watch mode (re-run on changes)
npx vitest

# Coverage report
npm run test:coverage
```

### Backend Tests
```bash
# Run Rust tests
cd src-tauri
cargo test

# Run specific test
cargo test database_operations

# With output
cargo test -- --nocapture
```

### End-to-End Testing
```bash
# Start dev environment
npm run tauri dev

# Manual flow testing:
# 1. Launch app
# 2. Answer first 3 questions
# 3. Close app (force quit)
# 4. Reopen app → verify data persisted
# 5. Complete questionnaire
# 6. Verify scores calculated correctly
```

## Debugging

### Frontend Debugging
```bash
# Run with Chrome DevTools
npm run tauri dev

# In dev window:
# - Right-click → Inspect Element
# - Ctrl+Shift+I (or Cmd+Option+I on macOS)
```

### Backend Debugging
```bash
# Add debug logging in Rust
println!("Debug: {:?}", variable);

# Run with verbose output
RUST_LOG=debug npm run tauri dev

# Or in src-tauri:
RUST_LOG=debug cargo test -- --nocapture
```

### Database Debugging
```bash
# Inspect SQLite file directly
sqlite3 ~/.manifestation-algorithm/manifestation.db

# List tables
.tables

# Query data
SELECT * FROM stats LIMIT 5;
```

## Code Style

### TypeScript/Vue
- 2 spaces indentation
- Semicolons required
- Prettier for formatting
- ESLint for linting

### Rust
- 4 spaces indentation
- `rustfmt` for formatting (automatic)
- `clippy` for linting (run with `cargo clippy`)

## Performance Tips

1. **Profile before optimizing**
   ```bash
   # Frontend performance
   npm run tauri dev  # Use Chrome DevTools Performance tab
   
   # Rust performance
   cargo build --release
   ```

2. **Common bottlenecks**
   - Database queries: Add indexes
   - Component re-renders: Use `v-once` or `computed`
   - Bundle size: Check with `npm run build`

## Useful Commands

```bash
# Frontend
npm run dev              # Vite dev server
npm run build            # Build for production
npm run test             # Run tests
npm run test:coverage    # Coverage report

# Tauri
npm run tauri dev        # Dev window (the main workflow)
npm run tauri build      # Create installer
npm run tauri info       # System info

# Backend
cargo check              # Syntax check
cargo build              # Debug build
cargo build --release    # Optimized build
cargo test               # Run tests
cargo clippy             # Lint
cargo fmt                # Format

# Version Management
npm version patch        # Auto-sync all version files
npm run sync-version     # Manual version sync
```

## Contributing

1. **Code quality**: All tests must pass
2. **Type safety**: TypeScript and Rust enforced
3. **Documentation**: Add comments for non-obvious code
4. **Commit messages**: Use conventional commits (feat:, fix:, docs:, etc.)
5. **No hardcoded secrets**: Use environment variables

Welcome to the team! 🚀
