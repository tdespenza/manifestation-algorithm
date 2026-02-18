# Network Architecture

The manifestation-algorithm app includes a built-in P2P networking layer using `rust-libp2p`. This allows users to discover peers and verify manifestation patterns in a decentralized manner.

## Components

### 1. PeerNode (Backend)

The `PeerNode` struct in `src-tauri/src/network.rs` encapsulates the libp2p `Swarm`. It runs in a dedicated Tokio task spawned during app initialization.

**Key Features:**
- **Transport**: TCP + Noise encryption + Yamux multiplexing.
- **Discovery**: Kademlia DHT + mDNS (local discovery).
- **Communication**: GossipSub protocol for pub/sub messaging.
- **Identity**: Ed25519 keypair generated on startup (ephemeral for now, planned for persistence).

### 2. NetworkState (Integration)

The `NetworkState` struct wraps a `mpsc::Sender<Command>` channel that allows the Tauri main thread to send commands to the `PeerNode` task.

### 3. Frontend Integration

Two primary mechanisms expose network status to the Vue frontend:
1.  **Commands**: `get_peer_count` returns the current number of connected peers.
2.  **Events**: The backend emits `network-stats` events whenever the peer count changes or significant network activity occurs.

## Data Flow

1.  **Startup**: `lib.rs` spawns the `PeerNode` task and stores the command channel in `AppHandle` state.
2.  **Listening**: The node automatically listens on a random TCP port.
3.  **Update**: On `SwarmEvent::Behavior(AppBehaviourEvent::Mdns(MdnsEvent::Discovered))`, the node dials new peers.
4.  **Stats**: On `SwarmEvent::ConnectionEstablished` or `ConnectionClosed`, a `NetworkStatUpdate` is sent to the frontend via the event channel.

## Future Plans

- **Persistence**: Save DHT routing table to disk.
- **Content Routing**: Use Kademlia to store/retrieve manifestation proofs.
- **Bandwidth Monitoring**: Track data usage.
