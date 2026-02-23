# Manifestation Algorithm — Product Roadmap

_Last updated: 2026-02-22 · Current release: v0.9.1_

---

## Guiding Principles

1. **Honest self-assessment** — scores should reflect true engagement, never inflate.
2. **Privacy by default** — all data stays on-device; sharing is always opt-in.
3. **Progressive disclosure** — advanced features appear only when a user is ready.
4. **Desktop-first, performance-second** — Tauri + Rust keeps the app lightweight.

---

## Status Legend

| Symbol | Meaning |
|---|---|
| ✅ | Shipped |
| 🔨 | In progress |
| 📋 | Planned / next |
| 💡 | Future / aspirational |

---

## v1.0 — "Solid Foundation" _(target: Q2 2026)_

### P0 — Must ship

| # | Item | Owner | Notes |
|---|---|---|---|
| 1 | First-run onboarding screen | UX / Dev | Explain scoring model before first submit |
| 2 | Category improvement recommendations | Product / Dev | Show "focus areas" after each submission |
| 3 | Replace tauri updater pubkey placeholder | ✅ DevOps | Ed25519 keypair generated; pubkey in `tauri.conf.json`; store private key as `TAURI_SIGNING_PRIVATE_KEY` CI secret |
| 4 | Score explanation tooltip | UX | Small "?" next to score explaining formula |
| 5 | Stable session ID generation | ✅ Dev | UUID-based; persisted via `settings` table |

### P1 — Should ship

| # | Item | Owner | Notes |
|---|---|---|---|
| 6 | ADR-006: scoring defaults documented | ✅ Architect | `planning-artifacts/ADR-006-…` |
| 7 | Rust unit tests — `identity.rs`, `network.rs` | Dev | Cover peer identity and bootstrap logic |
| 8 | Decompose `network.rs` into sub-modules | Architect | Split announce/discovery/ranking into modules |
| 9 | Bootstrap peers configurable via settings | Dev | Move hard-coded peer list to DB settings |
| 10 | Dashboard empty state with CTA | ✅ Dev | "Start First Assessment" button already in place |

---

## v1.1 — "Insights & Polish" _(target: Q3 2026)_

| # | Item | Priority | Notes |
|---|---|---|---|
| 1 | Historical session pagination | P2 | Currently renders all sessions; paginate at 20/page |
| 2 | Goal / target score setting | P3 | Let user set a target and show gap vs actual |
| 3 | CSS design tokens `:root` variables | P2 | Extract repeated hex values to CSS custom properties |
| 4 | Security test suite | P2 | PII validation, answer signing, SQL injection guard |
| 5 | Decompose `DashboardView.vue` (981 lines) | P2 | Extract `SessionList`, `DateRangeControl`, `BulkDelete` |

---

## v2.0 — "Network & Community" _(target: Q4 2026)_

| # | Item | Priority | Notes |
|---|---|---|---|
| 1 | Peer discovery UX overhaul | P1 | Visual peer map, ranking leaderboard |
| 2 | Aggregate anonymised benchmarks | P2 | Show user's percentile vs network |
| 3 | Mobile companion app | P3 | Capacitor or Tauri mobile (when stable) |
| 4 | Export to PDF / shareable summary card | P3 | One-click summary for social sharing |

---

## Completed in v0.x

- ✅ Tauri 2 + Rust + libp2p peer networking
- ✅ SQLite encrypted storage (AES-256-GCM via `sqlcipher`)
- ✅ 100 % unit / integration test coverage
- ✅ 735 Playwright E2E tests across Chromium, Firefox, Mobile Safari
- ✅ Chart fullscreen, Excel / CSV / PDF / HTML export, clipboard copy
- ✅ Score quality tiers (Excellent / Good / Needs Work)
- ✅ Date-range filtering with custom picker
- ✅ Keyboard shortcuts (digit keys for quick scoring)
- ✅ Category breakdown sparklines with trend detection
- ✅ GitHub private security advisory reporting
