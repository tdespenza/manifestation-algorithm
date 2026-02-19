# Tauri IPC Command Reference

The Rust backend exposes commands that the Vue frontend calls via Tauri's `invoke()` API. There is also one server-push event emitted from Rust to the frontend.

All commands are registered in `src-tauri/src/lib.rs`.

---

## Table of Contents

- [Calling Commands from the Frontend](#calling-commands-from-the-frontend)
- [Commands](#commands)
  - [get_peer_count](#get_peer_count)
  - [get_network_sharing](#get_network_sharing)
  - [set_network_sharing](#set_network_sharing)
  - [publish_result](#publish_result)
- [Events](#events)
  - [network-stats](#network-stats)
- [Composable: useNetwork](#composable-usenetwork)

---

## Calling Commands from the Frontend

```typescript
import { invoke } from '@tauri-apps/api/core';
import { listen } from '@tauri-apps/api/event';

// Command (request → response)
const result = await invoke<ReturnType>('command_name', { param1: value });

// Event listener (server-push)
const unlisten = await listen<PayloadType>('event-name', event => {
  console.log(event.payload);
});

// Clean up listener (e.g. in onUnmounted)
unlisten();
```

Errors thrown by Rust commands surface as rejected promises. Wrap calls in `try/catch` when the error should be surfaced to the user.

---

## Commands

### `get_peer_count`

Returns the current number of connected libp2p peers.

**Signature:**
```typescript
invoke<number>('get_peer_count'): Promise<number>
```

**Parameters:** none

**Returns:** `number` — connected peer count (0 if the P2P node has not initialised yet)

**Example:**
```typescript
const peers = await invoke<number>('get_peer_count');
console.log(`Connected to ${peers} peers`);
```

**Rust source:** Sends a `Command::GetPeerCount` message over the `mpsc` channel to the background libp2p task and awaits the reply via a one-shot channel.

---

### `get_network_sharing`

Returns the user's current opt-in state for anonymous result sharing.

**Signature:**
```typescript
invoke<boolean>('get_network_sharing'): Promise<boolean>
```

**Parameters:** none

**Returns:** `boolean` — `true` if sharing is enabled, `false` otherwise

**Persistence:** The value is loaded from `app_settings.json` in the Tauri `app_data_dir` at startup and cached in `NetworkState.sharing_enabled`.

**Example:**
```typescript
const enabled = await invoke<boolean>('get_network_sharing');
```

---

### `set_network_sharing`

Enables or disables anonymous result sharing and persists the preference.

**Signature:**
```typescript
invoke<void>('set_network_sharing', { enabled: boolean }): Promise<void>
```

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `enabled` | `boolean` | yes | `true` to opt in, `false` to opt out |

**Returns:** `void` (rejects on persistence error)

**Side-effects:**
- Updates `NetworkState.sharing_enabled` in shared Tauri state.
- Writes `{ "sharing_enabled": <bool> }` to `<app_data_dir>/app_settings.json`.

**Example:**
```typescript
await invoke('set_network_sharing', { enabled: true });
```

---

### `publish_result`

Signs the assessment result with the user's persistent Ed25519 identity key and broadcasts it to the gossipsub network. No-ops if sharing is disabled.

**Signature:**
```typescript
invoke<void>('publish_result', {
  score: number,
  categoryScores: Record<string, number>
}): Promise<void>
```

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `score` | `number` | yes | Total assessment score (0–10000) |
| `categoryScores` | `Record<string, number>` | yes | Average rating per category (0.0–10.0) |

**Returns:** `void` (rejects with validation error if score is out of range; rejects silently if sharing is disabled)

**Validation (Rust-side):**
- `score` must be in `[0.0, 10100.0]` — returns `Err("Invalid score")` otherwise.
- Each value in `categoryScores` must be in `[0.0, 10.0]` — returns `Err("Invalid category score")` otherwise.

**Message format published to gossipsub:**

```json
{
  "payload": {
    "score": 7843.5,
    "timestamp": "2025-06-01T12:00:00Z",
    "category_scores": {
      "Make a Decision": 8.2,
      "Morning Routine": 7.5
    }
  },
  "public_key": "<base64-encoded Ed25519 public key>",
  "signature": "<base64-encoded Ed25519 signature over payload JSON>"
}
```

**Example:**
```typescript
await invoke('publish_result', {
  score: totalScore,
  categoryScores: { 'Make a Decision': 8.2, 'Morning Routine': 7.5 }
});
```

---

## Events

### `network-stats`

Emitted by the Rust backend on a periodic interval to update the frontend with the latest aggregated peer statistics.

**Event name:** `"network-stats"`

**Payload type:**
```typescript
interface NetworkStatUpdate {
  peer_count: number;          // Current connected peer count
  avg_score: number;           // Mean total score across all received results
  percentile_90: number;       // 90th percentile score
  sample_count: number;        // Number of results received in the aggregation window
  category_stats: Record<string, {
    avg: number;               // Mean rating for this category (0.0–10.0)
    count: number;             // Number of samples contributing to the average
  }>;
  bandwidth_in: number;        // Bytes received since last update
  bandwidth_out: number;       // Bytes sent since last update
}
```

**Example:**
```typescript
import { listen } from '@tauri-apps/api/event';

const unlisten = await listen<NetworkStatUpdate>('network-stats', event => {
  const { peer_count, avg_score, percentile_90 } = event.payload;
  console.log(`${peer_count} peers | avg=${avg_score} | p90=${percentile_90}`);
});
```

**Frequency:** Approximately every 5 seconds (configured in the Tokio task loop in `network.rs`).

---

## Composable: useNetwork

Rather than calling `invoke` and `listen` directly, use the `useNetwork` composable (`src/composables/useNetwork.ts`), which wraps all IPC concerns into reactive Vue refs:

```typescript
import { useNetwork } from '@/composables/useNetwork';

const {
  count,           // Ref<number>   — peer count
  avgScore,        // Ref<number>   — network average score
  percentile90,    // Ref<number>   — 90th percentile score
  categoryStats,   // Ref<Record<string, { avg: number; count: number }>>
  bandwidthIn,     // Ref<number>   — bytes/interval received
  bandwidthOut,    // Ref<number>   — bytes/interval sent
  sharingEnabled,  // Ref<boolean>  — current opt-in state
  toggleSharing,   // () => Promise<void>
} = useNetwork();
```

The composable sets up the `network-stats` listener on mount and removes it on unmount. It also calls `get_network_sharing` on initialisation to hydrate `sharingEnabled`.
