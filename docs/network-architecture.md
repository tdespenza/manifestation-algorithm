# Network Architecture

The manifestation-algorithm app includes a built-in P2P networking layer using `rust-libp2p`. This allows users to discover peers and verify manifestation patterns in a decentralized manner.

## Components

### 1. PeerNode (Backend)

The `PeerNode` struct in `src-tauri/src/network.rs` encapsulates the libp2p `Swarm`. It runs in a dedicated Tokio task spawned during app initialization.

**Key Features:**
- **Transport**: TCP + Noise encryption + Yamux multiplexing.
- **Discovery**: Kademlia DHT + mDNS (local discovery).
- **Communication**: GossipSub protocol for pub/sub messaging.
- **Node Identity**: Ed25519 `node_key.bin` — persistent; stored in `app_data_dir` with `0o600` permissions. Used only for Noise transport-layer encryption and Kademlia peer routing.
- **User Identity**: Separate Ed25519 `user_identity.json` — persistent; used to sign published `ManifestationResult` payloads at the application layer. The public key is included in every `SignedManifestation` so peers can verify authenticity without knowing the sender's `PeerId`.
- **Gossipsub mode**: `MessageAuthenticity::Anonymous` — the node's `PeerId` is never attached to gossipsub messages, providing transport-level privacy while still enabling application-level signature verification.
- **Bandwidth monitoring**: Bytes in/out are tracked per interval and included in `network-stats` events.

### 2. NetworkState (Integration)

The `NetworkState` struct wraps a `mpsc::Sender<Command>` channel that allows the Tauri main thread to send commands to the `PeerNode` task.

### 3. Frontend Integration

Two primary mechanisms expose network status to the Vue frontend:
1.  **Commands**: `get_peer_count` returns the current number of connected peers.
2.  **Events**: The backend emits `network-stats` events whenever the peer count changes or significant network activity occurs.

## Data Flow

1. **Startup**: `lib.rs` generates or loads the persistent node keypair (`node_key.bin`) and user identity (`user_identity.json`), then spawns the `PeerNode` Tokio task.
2. **Listening**: The node listens on a random TCP port (e.g. `/ip4/0.0.0.0/tcp/0`).
3. **mDNS discovery**: On `MdnsEvent::Discovered`, newly found local peers are dialled automatically.
4. **Kademlia bootstrap**: After connecting to the first peer, a Kademlia `FIND_NODE` bootstrap is triggered for further peer discovery.
5. **Result publishing**: When the user completes an assessment and sharing is enabled:
   a. `publish_result` IPC command is called from the frontend.
   b. Rust validates the score and category values.
   c. A `ManifestationResult` is constructed and its CIDv1 is computed (SHA2-256 → DAG-JSON multihash).
   d. The result is signed with the user identity key and wrapped in a `SignedManifestation`.
   e. The signed JSON bytes are published on the `manifestation-results/v1` gossipsub topic.
6. **Receiving results**: Incoming gossipsub messages are:
   a. Signature-verified against the embedded public key.
   b. Deduplicated via an LRU CID cache.
   c. Aggregated into running statistics (count, mean, p90, per-category averages).
7. **Stats emission**: On a ~5-second Tokio interval, a `NetworkStatUpdate` struct is serialised and emitted to the frontend via `AppHandle::emit("network-stats", ...)`.

## Privacy Model

| Concern | Mitigation |
|---------|------------|
| Transport identity linkage | `MessageAuthenticity::Anonymous` on gossipsub: `PeerId` never in messages |
| Application-level identity | User identity key is not a `PeerId`; no linkage to IP or node key |
| PII in payload | `ManifestationResult` contains only score, per-category averages, and an ISO8601 timestamp — no name, email, device ID |
| Result spamming | LRU CID deduplication; score range validation server-side |

## Future Plans

- **DHT persistence**: Save Kademlia routing table to disk across restarts.
- **Content routing**: Use Kademlia to advertise and fetch historical aggregated proofs.
