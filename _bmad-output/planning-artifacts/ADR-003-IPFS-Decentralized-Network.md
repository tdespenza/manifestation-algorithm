# ADR-003: Decentralized Network - IPFS for P2P Result Sharing

**Date**: 2026-02-18  
**Status**: Accepted  
**Context**: Enable anonymous sharing of questionnaire results across a peer-to-peer network without central server  
**Deciders**: Architecture Team, Security Lead  

---

## Problem Statement

The application needs to:
- Aggregate questionnaire statistics from many users
- Provide comparative analytics (user rank, network trends) without identity exposure
- Scale to millions of users with zero central server costs
- Maintain complete anonymity (no identity leakage)
- Survive government censorship or network failures
- Zero ongoing operational costs

Traditional centralized approaches don't meet these requirements.

---

## Decision

**Use IPFS (InterPlanetary File System) with PubSub for decentralized, anonymous result aggregation.**

---

## Rationale

### No Central Server Required
- **IPFS**: Distributed hash table (DHT) means every node is a server
  - No company needed to operate network
  - Runs on user's own device
  - Network is peer-to-peer with no hub
- **Traditional approach**: Centralized server
  - $1000s/month in hosting costs
  - Privacy risk (we see all data)
  - Single point of failure
  - Company required (legal liability)
- **Advantage**: Zero operational costs, zero privacy risk by design

### Complete Anonymity
- **IPFS**: Content-addressed (hash-based), not IP-based
  - IPFS peer ID is random (regenerates per session)
  - DHT routing is indirect (no direct connection needed)
  - No tracking of who connects to whom
  - Results published to topic "ma-results" (no identity attached)
- **Traditional REST API to server**: IP address visible, user trackable
- **Advantage**: Impossible to link results to users

### Built-in Redundancy
- **IPFS**: Content replicated across network automatically
  - If one peer goes offline, others still have content
  - No single point of failure for data
  - Network resilience improves with users (vs decreases)
- **Centralized server**: If server down, all data inaccessible
- **Advantage**: Network becomes more reliable as it grows

### Censorship Resistance
- **IPFS**: No single entity controls network
  - Great firewall cannot block (decentralized)
  - No government takedown possible (no central server)
  - Distributed across globe (no single jurisdiction)
- **Centralized**: Easy to censor, takedown server = network gone
- **Advantage**: Network survives any attempt to shut it down

### Cost Scaling
- **IPFS**: Zero cost per additional user
  - User contributes bandwidth (peer running node)
  - DHT queries remain <1Mbps per peer
  - Content replicas distributed (no central bandwidth bill)
- **Centralized**: $0.10-1.00 per GB of bandwidth (scales linearly)
  - 100K users × 100MB cache each = $10K+/month
- **Advantage**: Marginal cost per user approaches zero

### Technology Maturity
- **IPFS**: Production-used by:
  - Cloudflare (distributed CDN)
  - Wikipedia (archival)
  - Filecoin (decentralized storage)
  - Major enterprises (Microsoft, Adobe)
- **Emerging technologies**: Holochain, Polkadot, etc. less proven
- **Advantage**: IPFS proven at scale

---

## Consequences

### Positive
✅ Zero server costs: Every user peer, not client  
✅ Anonymous by design: Content-addressed, not identity-addressed  
✅ Censorship-resistant: Distributed globally, no single point of failure  
✅ Automatic replication: Data survives offline peers  
✅ Scalable to millions: Cost per user approaches zero  
✅ Network resilience: Improves as more users join  
✅ Open standard: Not vendor lock-in (unlike AWS, Google Cloud)  

### Negative
❌ Initial latency: DHT discovery may take 5-10 seconds  
❌ Network churn: Peers joining/leaving causes temporary hiccups  
❌ Bandwidth overhead: DHT gossip adds background traffic  
❌ Learning curve: IPFS concepts different from client-server  
❌ Limited adoption: Most developers unfamiliar with IPFS  
❌ Sparsity risk: Network needs critical mass to be useful  

### Mitigation Strategies
- Local caching: Minimize DHT queries
- Offline mode: App works without network
- Bootstrap nodes: Pre-configured peer list for faster discovery
- Graceful degradation: Stats available from cache when offline
- Documentation: Clear explanation of anonymity model
- Beta launch: Recruit early adopters who understand P2P

---

## Alternatives Considered

### 1. Centralized Server (REST API)
**Pros**: Simple, familiar architecture, fast queries  
**Cons**: Privacy risk, ongoing costs, single point of failure, company required  
**Decision Rationale**: Contradicts core design principle (zero cloud, complete privacy)  

### 2. Blockchain (Ethereum, etc.)
**Pros**: Decentralized, immutable record  
**Cons**: Slow (minutes/transaction), expensive ($10+ per transaction), overkill  
**Decision Rationale**: Don't need immutability or consensus; IPFS sufficient  

### 3. Matrix/Synapse (Federated Chat)
**Pros**: Federated model, decentralized  
**Cons**: Chat-focused, not designed for data aggregation, adds complexity  
**Decision Rationale**: IPFS better suited for immutable result publishing  

### 4. Holochain
**Pros**: Novel DHT approach, cryptographic validation  
**Cons**: Immature, smaller ecosystem, DNA chains required  
**Decision Rationale**: IPFS proven; Holochain still experimental  

### 5. BitTorrent with DHT
**Pros**: Proven peer exchange mechanism  
**Cons**: Designed for file sharing, not real-time messaging  
**Decision Rationale**: IPFS layers messaging/messaging on DHT better  

---

## Technical Architecture

### IPFS Integration
```
User App (Tauri)
    ↕️ HTTP
IPFS Node (go-ipfs daemon)
    ├── Local file store
    ├── DHT client
    └── PubSub handler
    ↕️ Swarm protocol
IPFS Network
    ├── 1000s other nodes
    ├── Distributed Hash Table (DHT)
    └── Content replication
```

### Result Flow
```
User completes questionnaire
    ↓
Optional: "Share anonymously?" [Y/N]
    ↓ YES
Strip all PII from result
    ↓
Create JSON: {timestamp, scores, anon_hash}
    ↓
Upload to IPFS (get content hash)
    ↓
Publish hash to "ma-results" PubSub topic
    ↓
Other peers receive notification
    ↓
They fetch full content from DHT
    ↓
They add to local cache
    ↓
They recalculate network stats
    ↓
Their dashboards update in real-time
```

### PubSub Message Format
```json
{
  "type": "result_published",
  "ipfs_hash": "QmXxxx...",
  "timestamp": 1710777600,
  "publisher_peer_id": "12D3KooXxx..."
}
```

### Network Stats Calculation
```rust
fn calculate_network_stats(results: Vec<ResultPayload>) -> NetworkStats {
  let total_score_sum: f64 = results.iter()
    .map(|r| r.total_score)
    .sum();
  
  let average = total_score_sum / results.len() as f64;
  let percentiles = calculate_percentiles(&results);
  
  NetworkStats {
    total_participants: results.len(),
    average_score: average,
    median_score: percentiles[50],
    pct_90: percentiles[90],
    distribution: histogram(&results),
  }
}
```

---

## Anonymity Guarantees

### What's NOT Transmitted
- ❌ IP address (IPFS routing handles via DHT)
- ❌ Device ID or fingerprint
- ❌ Name, email, or PII
- ❌ Exact timestamp (day-precision only)
- ❌ Geographic location

### What IS Transmitted
- ✅ Questionnaire scores (anonymous)
- ✅ Day-precision timestamp (no time-of-day)
- ✅ Deterministic local hash (proves consistency, not identity)
- ✅ IPFS peer ID (random per session, not device ID)

### Privacy Model
```
Your Device IP: 192.168.1.100
    (Not visible to other peers)

Your Device ID: abc123def456
    (Never generated, never sent)

Your IPFS Peer ID: 12D3KooW...xyz (random, changes each session)
    (Visible only to DHT, not linked to results)

Your Result: {timestamp: "2026-02-18", scores: {...}}
    (Sent anonymously via PubSub, no peer ID attached)

Your Anonymous Hash: sha256(your_device_key)
    (Local-only, proves consistency without revealing identity)
```

---

## Network Resilience

### Graceful Degradation
```
Network Online (ideal):
  - Real-time stats updates
  - Fresh results from peers
  - Live peer count visible

Network Temporarily Offline:
  - App continues working
  - Local questionnaires unaffected
  - Questionnaire responses auto-save
  - Network stats from cache (note: "offline" indicator)

Network offline >1 hour:
  - User sees: "Network stats from 1h ago"
  - Can still complete questionnaires
  - Shares will queue when online
  - No data loss
```

### Peer Churn Handling
```
Peer goes offline:
  - Doesn't affect other peers
  - Their results stay in network (replicated)
  - Cache gradually updates

New peer joins:
  - DHT discovers existing nodes
  - Syncs recent results
  - Participates in sharing

Network partition:
  - Each partition syncs independently
  - When rejoined, greatest-timestamp-wins merge
  - No conflicts (append-only design)
```

---

## Comparison: IPFS vs Alternatives

| Factor | IPFS | Centralized | Blockchain | Holochain |
|--------|------|-------------|-----------|-----------|
| Cost | $0 | $1000s/mo | High (gas) | Low but experimental |
| Anonymity | Perfect | Risky | Pseudonymous | Possible |
| Speed | 5-10s | Sub-second | Minutes | Unknown |
| Censorship-resistant | Yes | No | Hard | Maybe |
| Mature | Yes (10y) | Yes | Yes (Ethereum) | No (<5y) |
| Privacy by design | Yes | Requires trust | No | Unclear |
| Scalability | Proven | Linear cost | Slow | Unknown |
| Operational overhead | None | High | None | None |

---

## References

- [IPFS Official Documentation](https://docs.ipfs.io)
- [IPFS PubSub](https://docs.ipfs.io/concepts/pubsub/)
- [IPFS DHT](https://docs.ipfs.io/concepts/dht/)
- [IPFS Content Addressing](https://docs.ipfs.io/concepts/content-addressing/)
- [Go-IPFS HTTP API](https://docs.ipfs.io/reference/http/api/)
- [Distributed Hash Tables](https://en.wikipedia.org/wiki/Distributed_hash_table)

---

## Related ADRs
- ADR-001: Tauri desktop framework
- ADR-005: Zero PII collection design principle
- ADR-006: Anonymous result schema

---

## Implementation Notes

### Phase 3 Deliverables
- Embedded IPFS node (binary bundled with app)
- PubSub subscription manager
- Result validation and filtering
- Network stats aggregation
- Offline mode with caching
- Privacy transparency controls

### Testing Strategy
- Unit tests: IPFS command execution
- Integration tests: Local 2-node network (testnet)
- Performance tests: Latency and bandwidth
- Security tests: No PII leakage, validation errors
- E2E tests: Full flow on all platforms

---

## Sign-Off
**Approved by**: Architecture Lead, Security Lead  
**Date**: 2026-02-18  

---

**Document End: ADR-003.md**
