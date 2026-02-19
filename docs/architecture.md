# System Architecture

This document describes the overall design of the Manifestation Algorithm desktop application — how the layers interact, how data flows, and why the key technology choices were made.

---

## Table of Contents

- [High-Level Overview](#high-level-overview)
- [Frontend (Vue 3 + TypeScript)](#frontend-vue-3--typescript)
- [Backend (Rust / Tauri)](#backend-rust--tauri)
- [IPC Bridge](#ipc-bridge)
- [Data Flow: Assessment Session](#data-flow-assessment-session)
- [Data Flow: Network Sharing](#data-flow-network-sharing)
- [Key Design Decisions](#key-design-decisions)
- [Architecture Decision Records](#architecture-decision-records)

---

## High-Level Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     Tauri Desktop Window                    │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              Vue 3 Frontend (WebView)               │   │
│  │                                                     │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────────────┐  │   │
│  │  │  Pinia   │  │  Vue     │  │    Chart.js       │  │   │
│  │  │  Stores  │  │  Router  │  │    Components     │  │   │
│  │  └────┬─────┘  └──────────┘  └──────────────────┘  │   │
│  │       │                                             │   │
│  │  ┌────▼─────────────────────────────────────────┐  │   │
│  │  │           Services Layer (TypeScript)         │  │   │
│  │  │  db.ts · scoring.ts · export.ts · db_trends  │  │   │
│  │  └────┬─────────────────────────────────────────┘  │   │
│  └───────┼─────────────────────────────────────────────┘  │
│          │  @tauri-apps/api (invoke / listen)              │
│  ┌───────▼─────────────────────────────────────────────┐  │
│  │              Rust / Tauri Backend                   │  │
│  │                                                     │  │
│  │  ┌──────────────┐   ┌──────────────────────────┐   │  │
│  │  │    lib.rs    │   │       network.rs          │   │  │
│  │  │  (commands)  │   │ (libp2p gossipsub node)   │   │  │
│  │  └──────┬───────┘   └───────────┬──────────────┘   │  │
│  │         │                       │                   │  │
│  │  ┌──────▼───────┐   ┌───────────▼──────────────┐   │  │
│  │  │  SQLite DB   │   │   P2P Gossipsub Network   │   │  │
│  │  │ (plugin-sql) │   │  (TCP+Noise+Yamux+mDNS)  │   │  │
│  │  └──────────────┘   └──────────────────────────┘   │  │
│  └─────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## Frontend (Vue 3 + TypeScript)

### Views (Pages)

| Route | View | Responsibility |
|-------|------|----------------|
| `/` | `HomeView.vue` | Renders the full questionnaire; hosts the `Questionnaire` component |
| `/dashboard` | `DashboardView.vue` | Score chart, category cards, network rankings, session list, CSV export |
| `/category/:id` | `CategoryDetailView.vue` | Deep-dive on a single category's trend and response history |
| `/settings` | `SettingsView.vue` | App settings: clear session, anonymous sharing toggle |

### Components

```
src/components/
├── charts/
│   └── ProgressChart.vue      # Line chart (Chart.js). Colour = black (up) / red (down)
├── dashboard/
│   ├── CategoryCard.vue       # Sparkline + trend arrow per category
│   ├── NetworkRanking.vue     # Live peer stats + SharingToggle
│   └── StatsPanel.vue         # Mean / median / max / count summary
└── ui/
    ├── Questionnaire.vue      # Sticky header, scroll/step modes, submit
    ├── QuestionItem.vue       # Single slider + label
    ├── ResumeDialog.vue       # "Welcome Back" modal for session recovery
    ├── Settings.vue           # Clear-answers button + version stamp
    └── SharingToggle.vue      # Checkbox that calls toggleSharing() IPC
```

### State Management (Pinia)

**`questionnaire` store** (`src/stores/questionnaire.ts`)
- Holds `answers: Record<string, number>` for the live in-progress session.
- Calls `db.ts` on every `setAnswer()` (auto-save).
- On `init()`: loads the current session; if empty, pre-fills from the most recent historical session.
- On `submitSession()`: fills unanswered questions with default `1`, calculates final score, saves to `historical_sessions`.
- `isComplete` always returns `true` to allow 0%-progress submission.

**`history` store** (`src/stores/history.ts`)
- Loads completed sessions (`SessionSummary[]`) and consolidated category trends from SQLite.
- Used exclusively by `DashboardView`.

### Services

| File | Purpose |
|------|---------|
| `db.ts` | SQLite CRUD: `saveAnswer`, `loadAnswers`, `getLastActive`, `updateLastActive`, `clearSession`, `saveHistoricalSession`, `loadHistoricalSessions`, `loadSessionResponses`, `loadCategoryTrend` |
| `db_trends.ts` | Aggregates per-category averages from `historical_responses` |
| `migrations.ts` | Versioned schema runner — applies pending migrations on startup |
| `scoring.ts` | `calculateScore(answers)` · `getMaxPossibleScore()` |
| `export.ts` | Serialises `historical_sessions` to CSV and triggers download |

### Scoring Formula

```
Total Score = Σ (question.points × (userRating / 10))
```

- User rating: 1–10 (integer).
- Unanswered questions default to rating = 1 during `submitSession`.
- Max possible score: **10,100 points** (rating = 10 on all questions).

See [scoring-formula.md](scoring-formula.md) for the full weight table.

---

## Backend (Rust / Tauri)

### `lib.rs` — Tauri Commands & App Bootstrap

Exposes the following Tauri IPC commands (callable from the frontend via `invoke()`):

| Command | Description |
|---------|-------------|
| `get_peer_count` | Returns the number of currently connected libp2p peers |
| `publish_result` | Signs and broadcasts a `ManifestationResult` to gossipsub (requires opt-in) |
| `get_network_sharing` | Returns the current sharing opt-in state (`bool`) |
| `set_network_sharing` | Enables or disables sharing; persists to `app_settings.json` |

**App bootstrap flow (`setup` hook)**:
1. Resolve the Tauri `app_data_dir`.
2. Load or generate an Ed25519 **libp2p node keypair** (`node_key.bin`) — used for transport only.
3. Load or generate a separate Ed25519 **user identity keypair** (`user_identity.json`) — used to sign published scores.
4. Load persisted `sharing_enabled` state from `app_settings.json`.
5. Spawn the `PeerNode` Tokio task with an `mpsc::Sender<Command>` channel.
6. Store `NetworkState` in Tauri managed state.

### `network.rs` — libp2p P2P Node

**Transport stack:**
```
TCP → Noise (encryption) → Yamux (multiplexing)
```

**Behaviours composed via `#[derive(NetworkBehaviour)]`:**

| Behaviour | Role |
|-----------|------|
| `GossipSub` | Pub/sub for `ManifestationResult` messages on topic `manifestation-results/v1` |
| `Kademlia` | DHT-based peer discovery and content routing |
| `mDNS` | Zero-config local network peer discovery |
| `Identify` | Exchanges protocol and agent version on connection |
| `Ping` | Keep-alive pings |

**Message flow:**
1. User enables sharing → `publish_result` IPC command is called with `score` and `category_scores`.
2. A `ManifestationResult` struct is created and its CID is computed (SHA2-256 → CIDv1 DAG-JSON).
3. The result is wrapped in a `SignedManifestation` with a base64-encoded Ed25519 signature.
4. The signed JSON is serialised and published to the gossipsub topic.
5. When a peer's message is received, it is signature-verified, deduplicated via an LRU cache, and aggregated into running statistics.
6. Periodically, a `NetworkStatUpdate` event is emitted to the frontend over Tauri's event bus.

**Privacy guarantees:**
- `MessageAuthenticity::Anonymous` is set on gossipsub — the `PeerId` is never embedded in messages.
- Application-level signing with the `user_identity` key provides integrity without exposing transport identity.
- No IP addresses, no emails, no device fingerprints are included in any published payload.

### `identity.rs` — User Identity

- Generates a random Ed25519 keypair on first launch via `OsRng`.
- Persists to `<app_data_dir>/user_identity.json` with `0o600` file permissions on Unix.
- Provides `sign(msg) → Signature` and `verify(msg, sig, pubkey) → bool`.
- The public key is included in every `SignedManifestation` so peers can verify authenticity.

---

## IPC Bridge

The frontend communicates with the Rust backend exclusively through Tauri's IPC mechanism:

**Commands** (request/response):
```typescript
import { invoke } from '@tauri-apps/api/core';

const peerCount = await invoke<number>('get_peer_count');
await invoke('set_network_sharing', { enabled: true });
```

**Events** (server-push):
```typescript
import { listen } from '@tauri-apps/api/event';

const unlisten = await listen<NetworkStatUpdate>('network-stats', event => {
  // update reactive refs
});
```

The `useNetwork` composable (`src/composables/useNetwork.ts`) encapsulates both patterns and exposes reactive Vue refs (`count`, `avgScore`, `percentile90`, `categoryStats`, `bandwidthStats`, `sharingEnabled`) to any component that needs them.

---

## Data Flow: Assessment Session

```
User moves slider
      │
      ▼
QuestionItem emits answer
      │
      ▼
store.setAnswer(id, value)        ← questionnaire Pinia store
      │
      ├─► answers.value[id] = value   (reactive, instant UI update)
      │
      └─► db.saveAnswer(sessionId, id, value)   (SQLite upsert)
              │
              └─► updateLastActive(sessionId)   (session heartbeat)

User clicks "Complete Assessment"
      │
      ▼
store.submitSession()
      │
      ├─► fills defaults (rating=1) for unanswered questions
      ├─► calculateScore(fullAnswers)
      ├─► saveHistoricalSession(score, answers)   → historical_sessions + historical_responses
      ├─► clearSession(sessionId)                 → removes questionnaire_responses
      └─► router.push('/dashboard')
```

---

## Data Flow: Network Sharing

```
User enables sharing toggle
      │
      ▼
SharingToggle → invoke('set_network_sharing', { enabled: true })
      │
      ▼
Rust: save_settings(path, true)   → app_settings.json
      │
      ▼
Dashboard: store.submitSession() finishes
      │
      ▼
invoke('publish_result', { score, category_scores })
      │
      ▼
Rust: ManifestationResult { score, timestamp, category_scores }
      │
      ├─► Compute CIDv1 (SHA2-256 → DAG-JSON)
      ├─► Sign with user_identity (Ed25519)
      └─► gossipsub.publish(topic, signed_json)
              │
              ▼
        Peer network receives, verifies, deduplicates, aggregates
              │
              ▼
        Periodic network-stats event → frontend reactive state
```

---

## Key Design Decisions

### 1. Offline-first, local SQLite
All session data is stored in an SQLite database in the OS app-data directory. No network connection is required to use the app. The gossipsub layer is entirely additive.

### 2. Separate node identity vs. user identity
The libp2p keypair (`node_key.bin`) is used only for transport-layer Noise encryption and Kademlia peer routing. The `user_identity` Ed25519 key is used only to sign published results. This separation ensures that even if the gossip protocol ever exposed the node's `PeerId`, it cannot be linked to the application-level public key.

### 3. `gossipsub::MessageAuthenticity::Anonymous`
Publishing over gossipsub with anonymous mode prevents the protocol from attaching the sender's `PeerId` to messages. Sign-and-verify is handled one layer up in the `SignedManifestation` struct.

### 4. `isComplete` always `true`
Sliders default to `1` on submit (rather than requiring every slider to be touched). This means a user can submit a 0%-progress assessment and receive a baseline score. This is intentional — minimum engagement should still produce a valid (if low) score.

### 5. Schema migrations
`migrations.ts` uses a version table in SQLite to track which migrations have been applied. New columns or tables are always additive; destructive migrations are not permitted.

---

## Architecture Decision Records

Full ADRs are in `_bmad-output/planning-artifacts/`:

| ADR | Decision |
|-----|----------|
| ADR-001 | Desktop framework: Tauri (vs. Electron) |
| ADR-002 | Storage: SQLite (`tauri-plugin-sql`) |
| ADR-003 | P2P network: libp2p gossipsub (vs. centralised API) |
| ADR-004 | Frontend: Vue 3 (vs. React) |
| ADR-005 | Zero-PII privacy design |
| ADR-006 | Distribution: GitHub Releases |
