# Product Requirements Document (PRD)
## Phase 3: IPFS Integration - Anonymous P2P Sharing

**Project**: Manifestation Algorithm Desktop Application  
**Phase**: 3 - IPFS Integration  
**Duration**: Weeks 9-12 (4 weeks)  
**Status**: Planning  
**Created**: February 18, 2026  
**BMAD Artifact Type**: Planning - Product Requirements  
**Dependency**: Phase 1 & 2 Complete  

---

## Executive Summary

Phase 3 introduces peer-to-peer network functionality, enabling users to optionally share their questionnaire results anonymously and receive aggregated statistics from thousands of other users worldwide. This phase transforms the app from a personal tracking tool into a distributed network where users contribute to and benefit from collective manifestation data without any identity exposure.

**Success Criteria**: IPFS node embedded, anonymous result publishing functional, live network statistics aggregating from 100+ peer nodes without any identity leakage.

---

## 1. Product Overview

### Problem Statement
Currently (after Phase 2), the application:
- Stores data locally on each user's device
- Cannot aggregate insights across users (collective intelligence missing)
- Lacks network perspective on manifestation trends
- Remains isolated from other users' experiences
- Cannot provide comparative statistics (e.g., "You're in top 10% of users")

### Solution Vision
Create a decentralized P2P network that:
- Runs IPFS node locally on each user's device
- Allows optional anonymous result sharing via content addressing
- Aggregates statistics from network without revealing identities
- Provides comparative analysis (percentiles, distribution, trends)
- Maintains zero PII collection and complete user anonymity
- Survives network failures and node churn
- Scales to support millions of users with zero central server

### Primary Users
- Users wanting to see network-wide manifestation trends
- Users interested in peer comparison (with anonymity)
- Users contributing to collective intelligence
- Network researchers studying manifestation patterns

---

## 2. Core Features

### Feature 3.1: IPFS Node Embedding

**Description**: Embed IPFS node directly in Tauri application for P2P file sharing and communication.

**Technical Specifications**:
- **IPFS Library**: js-ipfs or go-ipfs (via Rust binary)
- **Node Type**: Full node with DHT participation
- **Data Storage**: ~/.manifestation-algorithm/ipfs/ (user's local storage)
- **Bootstrap Nodes**: Pre-configured set for network discovery
- **Port Configuration**: Random high port (>30000) to avoid conflicts

**Startup Process**:
```rust
// Rust Tauri command to initialize IPFS
#[tauri::command]
async fn init_ipfs_node() -> Result<IpfsConfig, String> {
  // 1. Check if daemon already running
  // 2. If not, start IPFS daemon
  // 3. Return node configuration
  // 4. Store PubSub subscriptions
}
```

**Acceptance Criteria**:
- [ ] IPFS node starts automatically with app launch
- [ ] Node discovery: Connects to DHT within 5 seconds
- [ ] Peer discovery: Shows connected peer count
- [ ] No network traffic until user enables sharing
- [ ] Node graceful shutdown with app exit
- [ ] Error handling: Recovers from temporary network loss
- [ ] Storage: IPFS repo doesn't exceed 500MB (garbage collection)
- [ ] Performance: App startup time <4 seconds (vs 3s baseline + 1s IPFS)

### Feature 3.2: Anonymous Result Publishing

**Description**: Package questionnaire results for anonymous sharing on IPFS network.

**Result Payload Structure**:

```json
{
  "version": "1.0",
  "timestamp": "2026-03-18",
  "timezone_offset": "+00:00",
  "total_score": 7500,
  "categories": {
    "1_master_basics": 8.2,
    "2_activate_words": 7.5,
    "3_find_pain": 8.9,
    // ... all 40 categories
  },
  "user_hash": "sha256_deterministic_hash_only",
  "geographic_region": "anon"
}

// NEVER INCLUDES:
// ❌ Name, email, phone
// ❌ IP address (IPFS DHT handles routing)
// ❌ Device ID or MAC address
// ❌ Precise location (only day-level timestamp)
// ❌ Browser fingerprint
// ❌ Account or user ID
```

**Publishing Process**:
```
1. User completes questionnaire
2. Optional checkbox: "Share results anonymously?"
3. If YES:
   a. Strip all PII from result
   b. Calculate SHA256 hash of local ID (proves consistency)
   c. Create JSON payload
   d. Upload to IPFS (get content hash)
   e. Subscribe to "ma-results" PubSub topic
   f. Publish result hash to topic
4. If NO: Skip sharing, save locally only
```

**Acceptance Criteria**:
- [ ] Sharing is opt-in (default OFF)
- [ ] User sees explicit confirmation: "You are about to share anonymous results"
- [ ] No PII in payload (audit trail verification)
- [ ] Content addressable: SHA256 hash generated for each publish
- [ ] IPFS upload: Complete within 2 seconds
- [ ] PubSub notification sent to all subscribers
- [ ] No errors or network delays block questionnaire saving
- [ ] Sharing history: User can view list of published results (hashes only)

### Feature 3.3: PubSub Topic Subscription

**Description**: Subscribe to "ma-results" topic to receive published results from other users.

**Subscription Architecture**:
```rust
// Rust backend subscribing to IPFS PubSub
#[tauri::command]
async fn subscribe_to_results_topic() -> Result<(), String> {
  // 1. Create IPFS pubsub client
  // 2. Subscribe to topic: "ma-results"
  // 3. Listen for incoming messages (result hashes)
  // 4. When message received:
  //    a. Fetch content from IPFS DHT
  //    b. Validate JSON schema
  //    c. Add to local results cache
  //    d. Trigger stats recalculation
  // 5. Emit event to Vue frontend: "result-received"
}
```

**Data Flow**:
```
Other User A publishes result hash
    ↓
IPFS PubSub broadcasts to "ma-results" topic
    ↓
Your app receives message (hash + peer ID)
    ↓
Your app fetches result from IPFS DHT
    ↓
Your app validates result JSON
    ↓
Your app stores in results cache table
    ↓
Your app recalculates network stats
    ↓
Dashboard updates with aggregated stats
```

**Acceptance Criteria**:
- [ ] Subscription established within 2 seconds of app start
- [ ] Incoming results received within 5 seconds of publish
- [ ] Local results cache populated and persistent
- [ ] Duplicate results filtered (same content hash)
- [ ] Results older than 90 days automatically purged
- [ ] Can un-subscribe and re-subscribe without errors
- [ ] Graceful handling of malformed results (skip, log error)
- [ ] Performance: 1000+ results in cache without slowdown

### Feature 3.4: Result Validation & Security

**Description**: Validate received results to prevent malicious content.

**Validation Checklist**:
```rust
fn validate_result(result: &ResultPayload) -> Result<bool> {
  // 1. Schema validation: All required fields present
  // 2. Type validation: Score is float, categories is object
  // 3. Range validation: Scores 0-10, total 0-10000
  // 4. Timestamp validation: Within last 90 days
  // 5. Size validation: Payload <1KB
  // 6. No script injection: Content safe to store
  // 7. Hash validation: Content matches IPFS hash
  
  // If any validation fails: Skip and log
}
```

**Acceptance Criteria**:
- [ ] Invalid/malformed results silently skipped
- [ ] Error log tracks rejection rate
- [ ] No script injection possible
- [ ] Size limits enforced (<1KB per result)
- [ ] Timestamp validation prevents future-dated results
- [ ] Results older than 90 days rejected
- [ ] Duplicate detection: Same hash only counted once

### Feature 3.5: Live Network Statistics

**Description**: Aggregate anonymous results into network-wide statistics displayed in dashboard.

**Network Stats Tab Layout**:
```
┌─────────────────────────────────────────────────────┐
│ Network Statistics (IPFS Aggregation)               │
├─────────────────────────────────────────────────────┤
│                                                     │
│ Network Status:                                     │
│ ✓ Connected to IPFS Network                         │
│ • Peers: 412                                        │
│ • Your Results Shared: 18                           │
│ • Results Downloaded: 8,234                         │
│ • Network Bandwidth: 0.5 Mbps                       │
│                                                     │
│ Network Statistics (All Scores):                    │
│ • Total Participants: 8,234                         │
│ • Average Score: 6,450 / 10,000                     │
│ • Median Score: 6,200                               │
│ • Score Distribution:                               │
│   ░░░                  (0-2k)    245 users           │
│   ████░░░░░░░░░░       (3-5k)  3,421 users          │
│   █████████████████░░  (6-8k)  3,850 users          │
│   ████████░░░░░░░░░░░░ (9-10k) 1,010 users          │
│                                                     │
│ Your Rank: TOP 15% OF ALL USERS                     │
│ (Score: 7,500 vs Network Average: 6,450)            │
│                                                     │
│ Score Trends (90-day):                              │
│ • Network average improving: ↑ +3.2%               │
│ • Your score improving: ↑ +15.3%                   │
│ • You're outpacing network: +12.1% differential     │
│                                                     │
│ Top Performing Categories (Network):                │
│ 1. Master the Basics: 7.3 avg (6,570 users)        │
│ 2. Activate Words: 6.9 avg (6,570 users)           │
│ 3. Find Pain: 7.1 avg (6,570 users)                │
│                                                     │
│ Categories Needing Most Focus (Network):            │
│ 1. Leverage Your Gifts: 5.4 avg (6,570 users)      │
│ 2. Take Decisive Action: 5.6 avg (6,570 users)     │
│ 3. Overcome Internal Conflict: 5.7 avg (6,570 usr) │
│                                                     │
│ Last Updated: 3 minutes ago                         │
│ [Refresh Now]  [Settings]                           │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**Statistics Calculated**:
```typescript
interface NetworkStats {
  total_participants: number
  average_score: number
  median_score: number
  percentile_10: number
  percentile_25: number
  percentile_50: number
  percentile_75: number
  percentile_90: number
  
  // Distribution histogram (10 buckets)
  score_distribution: { bucket: string, count: number }[]
  
  // Trend calculation
  trend_last_90_days: number
  
  // Per-category averages
  category_averages: { [key: string]: number }
  
  // User's rank
  user_percentile: number
  user_vs_average_delta: number
}
```

**Acceptance Criteria**:
- [ ] Network stats calculated from 100+ results minimum (or show "insufficient data")
- [ ] Percentile rank accurate (verified with test data)
- [ ] Distribution histogram shows visually correct proportions
- [ ] Stats update every 5 minutes (or on new result received)
- [ ] User rank prominently displayed
- [ ] Category averages comparable to user's categories
- [ ] Trend calculation includes min 30-day history
- [ ] Handle scenario: network disconnected (show cached stats, note timestamp)

### Feature 3.6: Privacy & Anonymity Verification

**Description**: User controls and transparency for anonymous sharing.

**Privacy Controls Panel**:
```
┌───────────────────────────────────────────────────┐
│ Privacy & Sharing Settings                        │
├───────────────────────────────────────────────────┤
│                                                   │
│ Sharing Status:                                   │
│ [✓] Participate in Network                        │
│     (Receive aggregated stats, don't share data)  │
│                                                   │
│ [✗] Share Results Anonymously                     │
│     (Contribute to network data, get peer rank)   │
│                                                   │
│ Your Anonymity: [Verified ✓]                      │
│                                                   │
│ What We DON'T Collect:                            │
│ ✓ Your name or email                             │
│ ✓ Your IP address                                │
│ ✓ Your location (precise)                        │
│ ✓ Your device ID                                 │
│ ✓ Cookies or tracking                            │
│                                                   │
│ Shared Data Sample:                               │
│ {                                                 │
│   "timestamp": "2026-03-18",                      │
│   "total_score": 7500,                             │
│   "categories": { ... },                           │
│   "user_hash": "sha256_...",                      │
│   "geographic_region": "anon"                     │
│ }                                                 │
│                                                   │
│ Data Rights:                                       │
│ [Download My Data]  [Delete All Shared Data]      │
│ [View IPFS Hash]    [Audit Log]                   │
│                                                   │
│ ⓘ You can withdraw sharing at any time. Previous  │
│   shared results will remain on network (immutable │
│   IPFS content addressing).                       │
│                                                   │
└───────────────────────────────────────────────────┘
```

**Acceptance Criteria**:
- [ ] Sharing toggle is prominent and easy to understand
- [ ] Sample data shown: Users see exactly what will be shared
- [ ] "Verified" badge shown when anonymity confirmed
- [ ] Privacy checklist: Users understand what's NOT collected
- [ ] Audit log: Users can view list of published result hashes
- [ ] Download data: Can export all personal data anytime
- [ ] Delete shared: Can remove own results from sharing (though immutable on network)
- [ ] Clear warning: Results on IPFS are permanent (content addressing)

### Feature 3.7: Connection Status & Network Health

**Description**: Display real-time IPFS network status and health indicators.

**Status Display**:
```
Network Connection Status:
[●] CONNECTED - 412 peers - 0.5 Mbps - 1.2 GB cache

[·] CONNECTING - Establishing DHT connections...

[○] OFFLINE - Last connected: 2 hours ago

[!] ERROR - IPFS node failed to start
    [Retry] [Troubleshoot]
```

**Acceptance Criteria**:
- [ ] Status updates in real-time
- [ ] Peer count accurate (verified against IPFS stats)
- [ ] Bandwidth usage reasonable (<1 Mbps typical)
- [ ] Offline gracefully: App continues working, shows cached stats
- [ ] Auto-reconnect: Attempts to reconnect if disconnected
- [ ] Troubleshooting: Error codes and suggested fixes
- [ ] Users can see Why stats might be stale if offline

---

## 3. User Flows

### Flow 1: First-Time Network Participation
```
1. User opens app (Phase 1 complete)
2. Dashboard opens (Phase 2)
3. New tab appears: "Network" with explanation
4. User sees: "Join 5,000+ users sharing results anonymously"
5. User clicks [Enable Network Participation]
6. App initializes IPFS node (may take 15-30 seconds first time)
7. Connection status shows: "Connecting to IPFS... please wait"
8. Once connected: "Connected ✓ - 300 peers found"
9. User sees "Network Stats" tab populate with aggregated data
10. User sees their percentile rank: "TOP 20% of all users"
```

### Flow 2: Publishing First Result
```
1. User completes questionnaire
2. Submit dialog appears with new checkbox:
   "Share this result anonymously with the network? [  ]"
3. User clicks checkbox to enable sharing
4. Text appears: "Your data will be completely anonymous"
5. User clicks Submit
6. Result saved locally + published to IPFS
7. Confirmation: "Result shared! Now contributing to network intelligence."
8. After 30 seconds, network stats refresh
9. User rank updates to reflect new result
```

### Flow 3: Viewing Comparative Analytics
```
1. User opens "Network" tab
2. Sees overall network vs personal stats:
   - "You: 7,500 pts (75%) vs Network Avg: 6,450 pts (64%)"
   - "You're in TOP 15%"
3. User clicks "Score Distribution" graph
4. Detail view shows histogram of all network scores
5. User's score highlighted on curve
6. User sees: "Only 15% of users score this high"
7. User checks "Top Categories Network-Wide"
8. Sees network is strongest in "Master Basics", weakest in "Leverage Gifts"
9. User compares own categories to network
```

### Flow 4: Network Disconnection Handling
```
1. User completes questionnaire while offline
2. "Share results?" checkbox is DISABLED (greyed out)
3. Tooltip: "Network feature requires internet connection"
4. User completes questionnaire, saves locally
5. Later, internet reconnects
6. App detects connection: "IPFS network restored"
7. "Network Stats" tab refreshes with latest data
8. User can now re-share historical results (optional)
```

---

## 4. Data Architecture

### Database Schema Extensions

```sql
-- Cache of network results
CREATE TABLE network_results (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ipfs_hash TEXT NOT NULL UNIQUE,
  result_data JSON NOT NULL,
  received_from_peer TEXT,
  received_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  processed BOOLEAN DEFAULT 0,
  processed_at TIMESTAMP
);

-- Published results by this user
CREATE TABLE published_results (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ipfs_hash TEXT NOT NULL UNIQUE,
  local_stats_id INTEGER NOT NULL,
  published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  shared BOOLEAN DEFAULT 1,
  FOREIGN KEY(local_stats_id) REFERENCES stats(id)
);

-- Network statistics cache (calculated)
CREATE TABLE network_stats_cache (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  calculated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  total_participants INTEGER,
  average_score REAL,
  median_score REAL,
  distribution JSON,
  category_averages JSON
);

-- IPFS node configuration
CREATE TABLE ipfs_config (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_network_results_received ON network_results(received_at DESC);
CREATE INDEX idx_published_results_published ON published_results(published_at DESC);
CREATE INDEX idx_network_stats_calculated ON network_stats_cache(calculated_at DESC);
```

### PubSub Message Format

```json
{
  "type": "result_published",
  "ipfs_hash": "QmXxxx...",
  "publisher_peer_id": "QmYyyy...",
  "timestamp": 1710777600
}
```

---

## 5. Technical Architecture

### IPFS Integration Layers

```
Tauri Frontend (Vue)
    ↕️ (invoke Tauri commands)
Tauri Backend (Rust)
    ↕️ (http client)
IPFS Node (go-ipfs daemon)
    ↕️ (Swarm protocol)
IPFS Network (DHT + PubSub)
    ↕️
Other Users' IPFS Nodes
```

### Rust Commands for IPFS Operations

```rust
// Initialize IPFS node
#[tauri::command]
async fn init_ipfs() -> Result<IpfsStatus>

// Publish result to IPFS
#[tauri::command]
async fn publish_result(result: ResultPayload) -> Result<String> // Returns IPFS hash

// Subscribe to results topic
#[tauri::command]
async fn subscribe_to_topic(topic: &str) -> Result<()>

// Get network statistics
#[tauri::command]
async fn get_network_stats() -> Result<NetworkStats>

// Get connected peers
#[tauri::command]
async fn get_peer_info() -> Result<PeerInfo>
```

---

## 6. Performance & Scalability

### Performance Targets

| Operation | Target | Notes |
|-----------|--------|-------|
| IPFS node startup | <5 seconds | First run may be 15-30s (repo init) |
| Result publish | <2 seconds | Upload to DHT |
| Result fetch | <3 seconds | From network DHT |
| Network stats calculate | <500ms | Aggregate 1000s of results |
| UI refresh on new result | <1 second | Re-render stats |
| Memory usage | <150MB | Including IPFS node and results cache |

### Scalability

- **Supports**: 100K+ results in cache without slowdown
- **Node storage**: Configurable, default 1GB IPFS repo
- **Garbage collection**: Auto-cleanup of results >90 days old
- **Distribution**: Histogram bucketing (10 buckets) instead of per-result storage
- **Caching**: Aggregate stats cached, refreshed every 5 min or on new result

---

## 7. Testing Requirements

### Unit Tests
- [ ] Result validation: Valid and invalid payloads
- [ ] Privacy stripping: No PII in published payload
- [ ] Hash calculation: Consistent SHA256 for same data
- [ ] Percentile calculation: Correct ranking for known data sets
- [ ] Distribution histogram: Correct bucketing

### Integration Tests
- [ ] IPFS node initialization and shutdown
- [ ] Publish result → Receive on other subscriber (local test with 2 nodes)
- [ ] Multiple results received → Stats aggregated correctly
- [ ] Old results purged after 90 days
- [ ] Offline mode → Cached stats displayed, graceful error handling

### E2E Tests
- [ ] Complete flow: Enable network → Publish result → See stats
- [ ] Comparative analytics: User rank updated correctly
- [ ] Network statistics: Distribution, averages match expected values
- [ ] Cross-platform: Windows, macOS, Linux node initialization

### Security Tests
- [ ] Malicious payloads: Validation rejects and logs
- [ ] Size limits enforced: >1KB results rejected
- [ ] Script injection: No HTML/JS execution from results
- [ ] IP leakage audit: Verify no direct connections (IPFS DHT routing only)
- [ ] Offline privacy: No data leaked when offline

---

## 8. Acceptance Criteria (Phase Gate)

Phase 3 is **COMPLETE** when:

- [ ] IPFS node embedding: Starts with app, connects to network
- [ ] Anonymous publishing: Results published with zero PII
- [ ] Result validation: Malformed results rejected silently
- [ ] PubSub subscription: "ma-results" topic receives new results <5 seconds
- [ ] Network stats: Calculated from 100+ results, display accurate
- [ ] User rank: Percentile calculation correct, prominently displayed
- [ ] Privacy controls: Users can enable/disable sharing with understanding
- [ ] Network health: Status display shows accurate peer count and bandwidth
- [ ] Performance: No slowdown from Phase 2 baseline
- [ ] Security: Third-party security audit passes
- [ ] Offline handling: App works without network
- [ ] All E2E tests pass on Windows, macOS, Linux

---

## 9. Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| **IPFS Node Startup** | <5 seconds | Measured from user click to "connected" |
| **Result Publish Latency** | <2 seconds | Time from publish call to IPFS upload complete |
| **Network Stats Calc** | <500ms | Aggregate 1000+ results |
| **Percentile Accuracy** | 100% | Verified with known data sets |
| **Memory Usage** | <150MB | Peak memory with 10K results cached |
| **Security Audit** | 0 critical | Third-party audit findings |
| **Test Coverage** | >85% | Code coverage for IPFS integration |
| **Network Participants** | 100+ | Beta test with 100+ users |

---

## 10. Timeline & Milestones

### Week 9: IPFS Integration Foundation
- [ ] Embed IPFS node (go-ipfs binary via Rust)
- [ ] Implement node initialization and startup
- [ ] Create Rust commands for IPFS operations
- [ ] Set up local testing environment

**Deliverable**: IPFS node starts with app, connects to testnet

### Week 10: Anonymous Publishing & Validation
- [ ] Build result payload structure (no PII)
- [ ] Implement publish-to-IPFS command
- [ ] Create validation and security checks
- [ ] Add user confirmation dialog

**Deliverable**: Results publishable, validated, and stored in cache

### Week 11: PubSub & Statistics Aggregation
- [ ] Implement PubSub topic subscription
- [ ] Build results discovery and fetching
- [ ] Calculate network statistics (percentiles, distribution)
- [ ] Create stats aggregation engine

**Deliverable**: Network stats aggregating from multiple nodes

### Week 12: UI & Testing
- [ ] Build Network Stats tab in dashboard
- [ ] Create privacy controls panel
- [ ] Add connection status display
- [ ] Comprehensive testing (unit, integration, E2E, security)

**Deliverable**: All Phase 3 criteria met, ready for Phase 4

---

## 11. Risks & Mitigation

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|-----------|
| IPFS node stability issues | Medium | High | Early testing, fallback to cached/offline mode |
| Network scalability concerns | Low | Medium | Aggregation strategy, histogram bucketing |
| Privacy vulnerability discovery | Low | High | Pre-launch security audit, no transmission of PII |
| Peer connection failures | Medium | Low | Auto-reconnect logic, offline graceful handling |
| Result validation bypasses | Low | High | Comprehensive validation tests, schema enforcement |

---

## 12. Dependencies

- Phase 1: Core Application (MUST be complete)
- Phase 2: Statistics Dashboard (MUST be complete)
- IPFS: go-ipfs or js-ipfs library
- Internet connection (can work offline with cached data)

---

## 13. Out of Scope (Phase 3)

- User identification or accounts (stays anonymous)
- Centralized server for backups
- Social features or messaging
- Machine learning predictions
- Custom filtering of network results
- Real-time streaming (5-minute batch updates acceptable)
- Mobile IPFS nodes (desktop only for Phase 3)

---

## 14. Sign-Off

**Product Manager**: [TBD]  
**Engineering Lead**: [TBD]  
**Date**: February 18, 2026  

This PRD establishes all requirements for Phase 3 IPFS integration. Phase 3 depends on successful Phase 1 and Phase 2 completion.

**Status**: Ready for Development (after Phase 2 complete)

---

**Document End: PRD-Phase-3-IPFS-Integration.md**
