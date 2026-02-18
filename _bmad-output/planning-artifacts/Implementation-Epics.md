# Implementation Epics
## Manifestation Algorithm – Phase-Based Epic Breakdown

**Project**: Manifestation Algorithm Desktop Application  
**Timeline**: 16 weeks (4 phases)  
**Version**: 1.0  
**Created**: February 18, 2026  
**Planning Methodology**: SCRUM (2-week sprints)  

---

## 1. Epic Structure Overview

### Epic Organization
```
Phase 1: Core Application (Weeks 1-4)
├─ EP-1-1: Project Initialization & Setup
├─ EP-1-2: Questionnaire Component
├─ EP-1-3: Score Calculation & Logic
├─ EP-1-4: Local Encrypted Storage
└─ EP-1-5: Auto-Save & Session Management

Phase 2: Statistics Dashboard (Weeks 5-8)
├─ EP-2-1: Database Schema Expansion
├─ EP-2-2: Statistics Calculation Engine
├─ EP-2-3: Dashboard UI Components
├─ EP-2-4: Data Visualization & Charts
└─ EP-2-5: Export & Reporting

Phase 3: IPFS Integration (Weeks 9-12)
├─ EP-3-1: IPFS Node Embedding
├─ EP-3-2: Anonymous Publication System
├─ EP-3-3: PubSub & Real-Time Aggregation
├─ EP-3-4: Percentile & Ranking System
└─ EP-3-5: Network Statistics & Visualization

Phase 4: Distribution & Release (Weeks 13-16)
├─ EP-4-1: Multi-Platform Installers
├─ EP-4-2: Code Signing & Notarization
├─ EP-4-3: Auto-Update System
├─ EP-4-4: CI/CD Pipeline & Release Automation
└─ EP-4-5: Beta Testing & Final Polish
```

---

## PHASE 1: CORE APPLICATION
## Weeks 1-4 (Sprints 1-2)

---

### EP-1-1: Project Initialization & Setup

**Epic Type**: Infrastructure / Setup  
**Priority**: CRITICAL  
**Dependencies**: None  
**Timeline**: Week 1 (Sprint 1, Days 1-5)  

**Related Documents**:
- [ADR-001: Desktop Framework - Tauri](ADR-001-Desktop-Framework-Tauri.md)
- [ADR-004: Vue 3 Frontend](ADR-004-Vue3-Frontend.md)
- [PRD-Phase-1: Core Application](PRD-Phase-1-Core-Application.md)

**Epic Description**:
Initialize Tauri + Vue 3 project with proper build toolchain, development environment, and project structure. Establish code organization, CI/CD foundation, and testing infrastructure.

**Acceptance Criteria**:
- [ ] Tauri project scaffolded with all dependencies
- [ ] Vue 3 + TypeScript configured
- [ ] Build pipeline working on all platforms (Windows, macOS, Linux)
- [ ] Git repository configured with proper gitignore
- [ ] Development environment documented
- [ ] Basic app runs on all three platforms
- [ ] CI/CD GitHub Actions workflow created
- [ ] Testing framework (Jest/Vitest) integrated

**Stories**:

| Story ID | Title | Points | Sprint |
|----------|-------|--------|--------|
| US-1-1-1 | Create Tauri project scaffold | 3 | 1 |
| US-1-1-2 | Configure Vue 3 + TypeScript build | 5 | 1 |
| US-1-1-3 | Set up project folder structure | 2 | 1 |
| US-1-1-4 | Configure Jest unit testing | 3 | 1 |
| US-1-1-5 | Create GitHub Actions CI/CD | 5 | 1 |
| US-1-1-6 | Build cross-platform executables | 5 | 1 |
| US-1-1-7 | Document development setup | 3 | 1 |

**Sprint Estimate**: 26 story points  
**Velocity Target**: 25-30 points/sprint

---

### EP-1-2: Questionnaire Component

**Epic Type**: Feature  
**Priority**: CRITICAL  
**Dependencies**: EP-1-1  
**Timeline**: Weeks 1-2 (Sprints 1-2)  

**Related Documents**:
- [PRD-Phase-1: Questionnaire UI](PRD-Phase-1-Core-Application.md#questionnaire-component)
- [Test-Plan-Phase-1: Questionnaire Testing](Test-Plan-Phase-1.md#questionnaire-component)

**Epic Description**:
Implement interactive questionnaire UI component with 40 questions, slider inputs (1-10 scale), navigation controls, progress tracking, and question display. Port existing HTML questionnaire layout to Vue 3 components.

**Acceptance Criteria**:
- [ ] All 40 questions display correctly with proper hierarchy
- [ ] Slider inputs functional for 1-10 scale
- [ ] Question navigation (next/previous/jump to) working
- [ ] Progress indicator shows current position (e.g., "15 of 40")
- [ ] Responsive on multiple screen sizes (1024px+)
- [ ] Accessibility: Keyboard navigation, screen reader support
- [ ] UX: Smooth transitions between questions
- [ ] Mobile: Touch-friendly slider interaction

**Stories**:

| Story ID | Title | Points | Sprint |
|----------|-------|--------|--------|
| US-1-2-1 | Create Question model/interface | 2 | 1 |
| US-1-2-2 | Build QuestionCard component | 5 | 1 |
| US-1-2-3 | Implement Slider input component | 5 | 1 |
| US-1-2-4 | Build question navigation controls | 3 | 1 |
| US-1-2-5 | Implement progress tracking | 3 | 1 |
| US-1-2-6 | Add keyboard navigation | 3 | 1 |
| US-1-2-7 | Style questionnaire layout | 5 | 2 |
| US-1-2-8 | Unit test questionnaire logic | 5 | 2 |
| US-1-2-9 | E2E test complete flow | 5 | 2 |

**Sprint Estimate**: 36 story points (distributed across Sprints 1-2)

---

### EP-1-3: Score Calculation & Logic

**Epic Type**: Feature  
**Priority**: CRITICAL  
**Dependencies**: EP-1-2  
**Timeline**: Weeks 1-2 (Sprints 1-2)  

**Related Documents**:
- [PRD-Phase-1: Score Calculation](PRD-Phase-1-Core-Application.md#score-calculation)
- [Test-Plan-Phase-1: Score Calculation Tests](Test-Plan-Phase-1.md#score-calculation-tests)

**Epic Description**:
Implement score calculation engine that applies weighted formula to 40 category responses, produces total and category scores with two decimal precision, matches original HTML algorithm exactly.

**Acceptance Criteria**:
- [ ] Score calculation logic implemented in Rust
- [ ] Formula matches original HTML implementation exactly
- [ ] Handles all 40 categories with correct weighting
- [ ] Output format: Two decimal places (7234.56)
- [ ] Category breakdown: 40 individual scores generated
- [ ] Edge cases handled: Empty, invalid, partial inputs
- [ ] Unit tests: 100% code coverage
- [ ] Performance: Calculate <50ms for any input

**Stories**:

| Story ID | Title | Points | Sprint |
|----------|-------|--------|--------|
| US-1-3-1 | Define score calculation formula | 2 | 1 |
| US-1-3-2 | Implement core calculation logic | 5 | 1 |
| US-1-3-3 | Add category breakdown logic | 3 | 1 |
| US-1-3-4 | Handle edge cases & validation | 3 | 1 |
| US-1-3-5 | Create unit tests (scoring) | 5 | 2 |
| US-1-3-6 | Verify against original HTML | 3 | 2 |

**Sprint Estimate**: 21 story points

---

### EP-1-4: Local Encrypted Storage

**Epic Type**: Feature  
**Priority**: CRITICAL  
**Dependencies**: EP-1-2, EP-1-3  
**Timeline**: Weeks 2-3 (Sprints 2-3)  

**Related Documents**:
- [ADR-002: SQLite + Encrypted Storage](ADR-002-SQLite-Encrypted-Storage.md)
- [ADR-005: Zero PII Privacy Design](ADR-005-Zero-PII-Privacy-Design.md)
- [PRD-Phase-1: Database Schema](PRD-Phase-1-Core-Application.md#database-schema)
- [Test-Plan-Phase-1: Database Tests](Test-Plan-Phase-1.md#database-operations-tests)

**Epic Description**:
Implement SQLite database with AES-256 encryption (sqlcipher) for storing questionnaire responses locally. Database is never centralized, completely offline-first, ensures PII never leaves the device.

**Acceptance Criteria**:
- [ ] SQLite database created with sqlcipher encryption
- [ ] Encryption: AES-256-CBC, PBKDF2 64K iterations
- [ ] Database schema supports 40 question categories
- [ ] Response persistence: Responses saved to encrypted DB
- [ ] Session isolation: Multiple sessions stored separately
- [ ] Data integrity: Validate all stored data
- [ ] Security: Raw file unreadable without key
- [ ] Performance: <100ms per query
- [ ] Test coverage: 95%+ for DB operations

**Stories**:

| Story ID | Title | Points | Sprint |
|----------|-------|--------|--------|
| US-1-4-1 | Set up SQLite + sqlcipher | 3 | 2 |
| US-1-4-2 | Design database schema | 3 | 2 |
| US-1-4-3 | Implement data models | 3 | 2 |
| US-1-4-4 | Create insert/read operations | 5 | 2 |
| US-1-4-5 | Implement session management | 3 | 2 |
| US-1-4-6 | Add transaction handling | 3 | 3 |
| US-1-4-7 | Test database encryption | 5 | 3 |
| US-1-4-8 | Performance optimization | 3 | 3 |
| US-1-4-9 | Database migration support | 2 | 3 |

**Sprint Estimate**: 30 story points

---

### EP-1-5: Auto-Save & Session Management

**Epic Type**: Feature  
**Priority**: HIGH  
**Dependencies**: EP-1-2, EP-1-4  
**Timeline**: Weeks 3-4 (Sprints 3-4)  

**Related Documents**:
- [PRD-Phase-1: Auto-Save](PRD-Phase-1-Core-Application.md#auto-save-mechanism)
- [Test-Plan-Phase-1: Auto-Save Tests](Test-Plan-Phase-1.md#auto-save-mechanism-tests)

**Epic Description**:
Implement background auto-save mechanism that saves answers every 5 seconds, on question navigation, and on app close. Create session management allowing users to resume from last answered question, with crash recovery.

**Acceptance Criteria**:
- [ ] Auto-save timer: 5-second interval
- [ ] Saves on question change, app close
- [ ] Resume dialog: Offer "Resume" or "Start Over"
- [ ] Session recovery: Restore all previous answers
- [ ] Crash recovery: Restore state after app crash
- [ ] Unsaved changes warning: Show on app close
- [ ] Save feedback: Visual indicator while saving
- [ ] Performance: Save/restore <500ms
- [ ] Session expiry: Expire after 30 days

**Stories**:

| Story ID | Title | Points | Sprint |
|----------|-------|--------|--------|
| US-1-5-1 | Implement auto-save service | 5 | 3 |
| US-1-5-2 | Create session manager | 5 | 3 |
| US-1-5-3 | Build resume dialog component | 3 | 3 |
| US-1-5-4 | Implement crash recovery logic | 5 | 3 |
| US-1-5-5 | Add session expiry logic | 2 | 4 |
| US-1-5-6 | Create save indicator UI | 2 | 4 |
| US-1-5-7 | Test auto-save mechanism | 5 | 4 |
| US-1-5-8 | Test session recovery | 5 | 4 |

**Sprint Estimate**: 32 story points

---

### PHASE 1 SUMMARY

| Metric | Value |
|--------|-------|
| Total Epics | 5 |
| Total Stories | 42 |
| Total Points (est.) | ~145 |
| Duration | 4 weeks (2 sprints) |
| Team Size | 2-3 developers |
| Phase Gates | All Phase 1 tests passing (85%+ coverage) |

---

## PHASE 2: STATISTICS DASHBOARD
## Weeks 5-8 (Sprints 3-4)

---

### EP-2-1: Database Schema Expansion

**Epic Type**: Infrastructure  
**Priority**: CRITICAL  
**Dependencies**: EP-1-4 (Phase 1 complete)  
**Timeline**: Week 5 (Sprint 3, Days 1-5)  

**Related Documents**:
- [PRD-Phase-2: Database](PRD-Phase-2-Statistics-Dashboard.md#database-expansion)

**Epic Description**:
Expand Phase 1 SQLite schema to support statistics aggregation: add timestamp precision (day-only for privacy), aggregate category scores, compute daily/weekly/monthly statistics.

**Acceptance Criteria**:
- [ ] Schema captures: date, all 40 categories, total score
- [ ] Timestamps: Day precision only (YYYY-MM-DD)
- [ ] Aggregation views for: daily, weekly, monthly
- [ ] Index optimization for range queries
- [ ] Data migration from Phase 1 (zero data loss)
- [ ] Performance: Daily stats query <100ms
- [ ] Test coverage: >90%

**Stories**:

| Story ID | Title | Points | Sprint |
|----------|-------|--------|--------|
| US-2-1-1 | Plan schema expansion | 2 | 3 |
| US-2-1-2 | Add statistics tables | 3 | 3 |
| US-2-1-3 | Create migration scripts | 3 | 3 |
| US-2-1-4 | Add database indexes | 3 | 3 |
| US-2-1-5 | Test migration & data integrity | 3 | 3 |

**Sprint Estimate**: 14 story points

---

### EP-2-2: Statistics Calculation Engine

**Epic Type**: Feature  
**Priority**: CRITICAL  
**Dependencies**: EP-2-1  
**Timeline**: Weeks 5-6 (Sprints 3-4)  

**Related Documents**:
- [PRD-Phase-2: Statistics Calculations](PRD-Phase-2-Statistics-Dashboard.md#statistics-calculations)
- [Test-Plan-Phase-2: Statistics Tests](Test-Plan-Phase-2.md#statistics-calculation-tests)

**Epic Description**:
Implement statistics calculation module computing mean, median, standard deviation, quartiles, percentiles for all 40 categories. Support time-series analysis over configurable date ranges.

**Acceptance Criteria**:
- [ ] Calculate: Mean, median, stddev, Q1, Q3, percentiles
- [ ] Category-wise breakdown (40 categories)
- [ ] Time-series support (daily, weekly, monthly)
- [ ] Date range filtering: All presets (7/30/365 days)
- [ ] Trend detection: Improving/stable/declining
- [ ] Handle edge cases: Empty data, single value, large datasets
- [ ] Performance: 5-year aggregation <500ms
- [ ] Accuracy: Verified against reference data
- [ ] Test coverage: 100% for calculations

**Stories**:

| Story ID | Title | Points | Sprint |
|----------|-------|--------|--------|
| US-2-2-1 | Implement basic statistics (mean, median) | 5 | 3 |
| US-2-2-2 | Add quartile & percentile calculations | 5 | 3 |
| US-2-2-3 | Implement trend detection | 3 | 3 |
| US-2-2-4 | Build time-series aggregation | 5 | 4 |
| US-2-2-5 | Add date range filtering | 3 | 4 |
| US-2-2-6 | Optimize for large dataset (5 years) | 3 | 4 |
| US-2-2-7 | Unit tests (statistics logic) | 5 | 4 |

**Sprint Estimate**: 29 story points

---

### EP-2-3: Dashboard UI Components

**Epic Type**: Feature  
**Priority**: CRITICAL  
**Dependencies**: EP-2-2  
**Timeline**: Weeks 6-7 (Sprints 4)  

**Related Documents**:
- [PRD-Phase-2: Dashboard UI](PRD-Phase-2-Statistics-Dashboard.md#user-interface)
- [ADR-004: Vue 3 Frontend](ADR-004-Vue3-Frontend.md)

**Epic Description**:
Build Vue 3 dashboard UI showing 40-category overview grid, detail drill-down views, summary statistics cards. Implement responsive layout, responsive interactions, smooth navigation.

**Acceptance Criteria**:
- [ ] Overview grid: 40 category cards in responsive layout
- [ ] Each card shows: Category name, mean, sparkline
- [ ] Statistics sidebar: Mean, median, stddev, count
- [ ] Detail view: Drill-down chart + extended stats
- [ ] Navigation: Back button, breadcrumb, smooth transitions
- [ ] Responsive: Works 1024px+ screens
- [ ] Performance: Render 40 cards <2 seconds
- [ ] Accessibility: Keyboard navigation, color contrast

**Stories**:

| Story ID | Title | Points | Sprint |
|----------|-------|--------|--------|
| US-2-3-1 | Build DashboardLayout component | 3 | 4 |
| US-2-3-2 | Create CategoryCard component | 5 | 4 |
| US-2-3-3 | Build StatisticsSidebar | 3 | 4 |
| US-2-3-4 | Implement detail view navigation | 5 | 4 |
| US-2-3-5 | Create responsive grid layout | 3 | 4 |
| US-2-3-6 | Add smooth transitions & animations | 3 | 4 |
| US-2-3-7 | Style components (TailwindCSS) | 5 | 4 |

**Sprint Estimate**: 27 story points

---

### EP-2-4: Data Visualization & Charts

**Epic Type**: Feature  
**Priority**: CRITICAL  
**Dependencies**: EP-2-3  
**Timeline**: Week 8 (Sprint 4)  

**Related Documents**:
- [ADR-007: Chart.js Visualization](ADR-007-Chart.js-Visualization.md)
- [PRD-Phase-2: Visualization](PRD-Phase-2-Statistics-Dashboard.md#visualization)

**Epic Description**:
Integrate Chart.js for line charts showing score history over time. Implement sparklines (7-day miniature charts) on category cards, color-coded trends (improving/stable/declining).

**Acceptance Criteria**:
- [ ] Sparklines: 7-day history on each category card
- [ ] Color coding: Red (low), gray (medium), black (high)
- [ ] Detail chart: Line graph over selected time period
- [ ] Trend lines: Visual indication of direction
- [ ] Interactive: Hover for values, zoom/pan capability
- [ ] Performance: Render 40 sparklines <500ms
- [ ] Performance: Detail chart render <500ms
- [ ] Responsive: Charts scale to container size

**Stories**:

| Story ID | Title | Points | Sprint |
|----------|-------|--------|--------|
| US-2-4-1 | Integrate Chart.js library | 2 | 4 |
| US-2-4-2 | Create Sparkline component | 5 | 4 |
| US-2-4-3 | Build detail LineChart component | 5 | 4 |
| US-2-4-4 | Implement trend color coding | 3 | 4 |
| US-2-4-5 | Add chart interactivity (hover, zoom) | 3 | 4 |
| US-2-4-6 | Optimize chart rendering | 3 | 4 |

**Sprint Estimate**: 21 story points

---

### EP-2-5: Export & Reporting

**Epic Type**: Feature  
**Priority**: HIGH  
**Dependencies**: EP-2-3  
**Timeline**: Week 8 (Sprint 4)  

**Related Documents**:
- [PRD-Phase-2: CSV Export](PRD-Phase-2-Statistics-Dashboard.md#csv-export)
- [Test-Plan-Phase-2: CSV Export Tests](Test-Plan-Phase-2.md#csv-export-tests)

**Epic Description**:
Implement CSV export of all statistics (mean, median, stddev, quartiles, counts) for all 40 categories. Support date range selection, filename with timestamp, accurate data matching display.

**Acceptance Criteria**:
- [ ] Export button in dashboard
- [ ] CSV format: Proper headers and data
- [ ] Date range in export filename
- [ ] Data accuracy: Matches displayed values exactly
- [ ] Special characters: Proper escaping/quoting
- [ ] Performance: Generate CSV <1 second
- [ ] File size: <1MB for any dataset

**Stories**:

| Story ID | Title | Points | Sprint |
|----------|-------|--------|--------|
| US-2-5-1 | Create CSV export service | 3 | 4 |
| US-2-5-2 | Build export button UI | 2 | 4 |
| US-2-5-3 | Implement file download | 2 | 4 |
| US-2-5-4 | Add date range to filename | 1 | 4 |
| US-2-5-5 | Test export accuracy | 3 | 4 |

**Sprint Estimate**: 11 story points

---

### PHASE 2 SUMMARY

| Metric | Value |
|--------|-------|
| Total Epics | 5 |
| Total Stories | 29 |
| Total Points (est.) | ~102 |
| Duration | 4 weeks (2 sprints) |
| Team Size | 2-3 developers |
| Phase Gates | Dashboard renders 40 categories <2s, all stats tests passing |

---

## PHASE 3: IPFS INTEGRATION
## Weeks 9-12 (Sprints 5-6)

---

### EP-3-1: IPFS Node Embedding

**Epic Type**: Feature  
**Priority**: CRITICAL  
**Dependencies**: EP-2-5 (Phase 2 complete)  
**Timeline**: Weeks 9-10 (Sprint 5)  

**Related Documents**:
- [ADR-003: IPFS Decentralized P2P Network](ADR-003-IPFS-Decentralized-Network.md)
- [PRD-Phase-3: IPFS Integration](PRD-Phase-3-IPFS-Integration.md#ipfs-node)

**Epic Description**:
Embed IPFS node directly in Tauri application using rust-libp2p/go-ipfs. Initialize DHT (Distributed Hash Table), bootstrap to public IPFS network, maintain persistent peer identity across sessions.

**Acceptance Criteria**:
- [ ] IPFS node initializes on app startup
- [ ] Node connects to DHT bootstrap peers
- [ ] Peer ID persists across restarts
- [ ] Node shutdown gracefully on app close
- [ ] Zero visible lag during startup/shutdown
- [ ] Low bandwidth when idle (<10KB/sec)
- [ ] Handles network disconnection/reconnection
- [ ] Works behind NAT/firewall (UPnP/hole punching)

**Stories**:

| Story ID | Title | Points | Sprint |
|----------|-------|--------|--------|
| US-3-1-1 | Evaluate go-ipfs vs rust-libp2p | 2 | 5 |
| US-3-1-2 | Set up IPFS binary embedding | 5 | 5 |
| US-3-1-3 | Implement IPFS node initialization | 5 | 5 |
| US-3-1-4 | Add DHT bootstrap logic | 3 | 5 |
| US-3-1-5 | Implement graceful shutdown | 2 | 5 |
| US-3-1-6 | Test peer connectivity | 3 | 5 |
| US-3-1-7 | Monitor bandwidth usage | 2 | 5 |

**Sprint Estimate**: 22 story points

---

### EP-3-2: Anonymous Publication System

**Epic Type**: Feature  
**Priority**: CRITICAL  
**Dependencies**: EP-3-1  
**Timeline**: Weeks 10-11 (Sprints 5-6)  

**Related Documents**:
- [ADR-003: IPFS P2P](ADR-003-IPFS-Decentralized-Network.md)
- [ADR-005: Zero PII Privacy](ADR-005-Zero-PII-Privacy-Design.md)
- [PRD-Phase-3: Anonymous Publishing](PRD-Phase-3-IPFS-Integration.md#anonymous-publishing)

**Epic Description**:
Implement cryptographic signing and encoding of questionnaire results for anonymous publication to IPFS. Results contain only day-precision timestamp and category scores, zero personally identifiable information. Generate deterministic CIDs for result storage.

**Acceptance Criteria**:
- [ ] Results encode ONLY: timestamp (day), 40 scores
- [ ] No PII in encoded result: No IP, session ID, device ID
- [ ] Cryptographic signature: Sign with user's private key
- [ ] CID generation: Deterministic, reproducible
- [ ] Publish to IPFS: Result available via CID
- [ ] Timestamp precision: Day-only (no hour/minute)
- [ ] Security: Results unmodifiable (signature prevents tampering)
- [ ] Performance: Publish <2 seconds
- [ ] Privacy: User cannot be identified from result alone

**Stories**:

| Story ID | Title | Points | Sprint |
|----------|-------|--------|--------|
| US-3-2-1 | Design result encoding format | 3 | 5 |
| US-3-2-2 | Implement keypair generation | 3 | 5 |
| US-3-2-3 | Create result signing logic | 5 | 5 |
| US-3-2-4 | Implement CID generation | 3 | 5 |
| US-3-2-5 | Add IPFS publish mechanism | 5 | 6 |
| US-3-2-6 | Implement privacy validation | 3 | 6 |
| US-3-2-7 | Test anonymity (no PII leakage) | 5 | 6 |
| US-3-2-8 | Security audit: Signatures | 3 | 6 |

**Sprint Estimate**: 30 story points

---

### EP-3-3: PubSub & Real-Time Aggregation

**Epic Type**: Feature  
**Priority**: CRITICAL  
**Dependencies**: EP-3-2  
**Timeline**: Week 11-12 (Sprint 6)  

**Related Documents**:
- [PRD-Phase-3: PubSub Subscription](PRD-Phase-3-IPFS-Integration.md#pubsub-subscription)

**Epic Description**:
Implement IPFS PubSub subscription to "ma-results" topic. Receive anonymously published results from other network participants in real-time, validate signatures, aggregate into rolling statistics.

**Acceptance Criteria**:
- [ ] Subscribe to "ma-results" PubSub topic
- [ ] Receive published results in real-time
- [ ] Validate result signatures before aggregation
- [ ] Discard invalid/tampered results
- [ ] Deduplication: Prevent duplicate processing
- [ ] Performance: Process incoming results <100ms
- [ ] Aggregate data without storing PII
- [ ] Handle network delays/out-of-order messages
- [ ] Clean shutdown: Unsubscribe gracefully

**Stories**:

| Story ID | Title | Points | Sprint |
|----------|-------|--------|--------|
| US-3-3-1 | Implement PubSub subscription | 5 | 6 |
| US-3-3-2 | Add message validation logic | 5 | 6 |
| US-3-3-3 | Create aggregation pipeline | 5 | 6 |
| US-3-3-4 | Implement deduplication | 3 | 6 |
| US-3-3-5 | Build real-time UI updates | 5 | 6 |
| US-3-3-6 | Test message ordering & resilience | 5 | 6 |

**Sprint Estimate**: 28 story points

---

### EP-3-4: Percentile & Ranking System

**Epic Type**: Feature  
**Priority**: HIGH  
**Dependencies**: EP-3-3  
**Timeline**: Week 12 (Sprint 6)  

**Related Documents**:
- [PRD-Phase-3: Percentile Calculation](PRD-Phase-3-IPFS-Integration.md#percentile-ranking)

**Epic Description**:
Calculate user's percentile rank based on aggregated network statistics. Show user where they rank compared to all network participants (anonymously). Update in real-time as new results arrive.

**Acceptance Criteria**:
- [ ] Calculate percentile: User score vs all scores
- [ ] Handle ties: Multiple users at same score
- [ ] Accuracy: Verified against reference data
- [ ] Update on new data: Percentile changes as network grows
- [ ] Display: Show percentile prominently (e.g., "Top 25%")
- [ ] Performance: Calculate <50ms even for 100K participants
- [ ] Privacy: No user identification visible

**Stories**:

| Story ID | Title | Points | Sprint |
|----------|-------|--------|--------|
| US-3-4-1 | Implement percentile calculation | 5 | 6 |
| US-3-4-2 | Create ranking display UI | 3 | 6 |
| US-3-4-3 | Add category-wise percentiles | 3 | 6 |
| US-3-4-4 | Real-time percentile updates | 3 | 6 |
| US-3-4-5 | Test percentile accuracy | 5 | 6 |

**Sprint Estimate**: 19 story points

---

### EP-3-5: Network Statistics & Visualization

**Epic Type**: Feature  
**Priority**: HIGH  
**Dependencies**: EP-3-4  
**Timeline**: Week 12 (Sprint 6)  

**Related Documents**:
- [PRD-Phase-3: Network Statistics](PRD-Phase-3-IPFS-Integration.md#network-statistics)

**Epic Description**:
Display aggregated network statistics: total participants, average scores by category, trend indicators, peer count, last update time. Show network health and growth metrics. Update in real-time.

**Acceptance Criteria**:
- [ ] Display: Total responses in network
- [ ] Category stats: Mean, median per category
- [ ] Network visualization: Peer count, connection status
- [ ] Timing: Last update timestamp
- [ ] Trend: Improving/stable/declining per category
- [ ] Performance: Update UI <100ms on new results
- [ ] Handle large datasets: 100K+ results efficiently

**Stories**:

| Story ID | Title | Points | Sprint |
|----------|-------|--------|--------|
| US-3-5-1 | Create network stats service | 3 | 6 |
| US-3-5-2 | Build network stats UI | 5 | 6 |
| US-3-5-3 | Add connection status indicator | 2 | 6 |
| US-3-5-4 | Implement real-time updates | 3 | 6 |
| US-3-5-5 | Add peer count display | 2 | 6 |

**Sprint Estimate**: 15 story points

---

### PHASE 3 SUMMARY

| Metric | Value |
|--------|-------|
| Total Epics | 5 |
| Total Stories | 33 |
| Total Points (est.) | ~114 |
| Duration | 4 weeks (2 sprints) |
| Team Size | 2-3 developers |
| Phase Gates | P2P publishing working, anonymity verified, aggregation <5s |

---

## PHASE 4: DISTRIBUTION & RELEASE
## Weeks 13-16 (Sprints 7-8)

---

### EP-4-1: Multi-Platform Installers

**Epic Type**: Feature  
**Priority**: CRITICAL  
**Dependencies**: EP-3-5 (Phase 3 complete)  
**Timeline**: Weeks 13-14 (Sprints 7-8)  

**Related Documents**:
- [PRD-Phase-4: Distribution](PRD-Phase-4-Distribution-Polish.md#distribution)
- [Test-Plan-Phase-4: Installer Testing](Test-Plan-Phase-4.md#installer-testing)

**Epic Description**:
Create native installers for Windows (MSI), macOS (DMG, dual architecture), and Linux (AppImage). Ensure <50MB installer size, smooth installation, proper uninstallation with cleanup.

**Acceptance Criteria**:
- [ ] Windows MSI: 32-bit and 64-bit installers
- [ ] macOS DMG: Intel (x86_64) and Apple Silicon (arm64)
- [ ] Linux AppImage: x86_64 architecture
- [ ] Installer size: <50MB each platform
- [ ] Install time: <2 minutes
- [ ] Creates Start Menu entry (Windows)
- [ ] Desktop shortcut created
- [ ] Data directory created properly
- [ ] Uninstall: Removes all files, registry cleanup

**Stories**:

| Story ID | Title | Points | Sprint |
|----------|-------|--------|--------|
| US-4-1-1 | Configure Tauri build settings | 3 | 7 |
| US-4-1-2 | Create Windows MSI installer | 5 | 7 |
| US-4-1-3 | Create macOS DMG (Intel) | 5 | 7 |
| US-4-1-4 | Create macOS DMG (ARM64) | 5 | 7 |
| US-4-1-5 | Create Linux AppImage | 5 | 7 |
| US-4-1-6 | Test installation on each platform | 5 | 8 |
| US-4-1-7 | Test uninstallation cleanly | 3 | 8 |

**Sprint Estimate**: 31 story points

---

### EP-4-2: Code Signing & Notarization

**Epic Type**: Feature  
**Priority**: CRITICAL  
**Dependencies**: EP-4-1  
**Timeline**: Weeks 14-15 (Sprint 8)  

**Related Documents**:
- [Test-Plan-Phase-4: Code Signing](Test-Plan-Phase-4.md#code-signing--notarization)

**Epic Description**:
Code sign all executables and installers with valid certificates. Implement macOS notarization to ensure Gatekeeper acceptance. Set up certificate management and renewal procedures.

**Acceptance Criteria**:
- [ ] Windows EXE: Signed with valid code signing cert
- [ ] Windows MSI: Signed with valid cert
- [ ] macOS binaries: Signed with Developer ID
- [ ] macOS DMGs: Signed with Developer ID
- [ ] macOS Notarization: Submitted and approved by Apple
- [ ] Signature verification: All signatures validate correctly
- [ ] Gatekeeper acceptance: Verified on clean Mac
- [ ] Certificate management: Expirations tracked, renewal planned

**Stories**:

| Story ID | Title | Points | Sprint |
|----------|-------|--------|--------|
| US-4-2-1 | Obtain Windows code signing cert | 2 | 7 |
| US-4-2-2 | Obtain macOS Developer ID cert | 2 | 7 |
| US-4-2-3 | Implement Windows code signing | 3 | 7 |
| US-4-2-4 | Implement macOS code signing | 3 | 7 |
| US-4-2-5 | Set up macOS notarization | 5 | 8 |
| US-4-2-6 | Create certificate renewal process | 2 | 8 |
| US-4-2-7 | Verify all signatures | 3 | 8 |

**Sprint Estimate**: 20 story points

---

### EP-4-3: Auto-Update System

**Epic Type**: Feature  
**Priority**: HIGH  
**Dependencies**: EP-4-1  
**Timeline**: Weeks 14-15 (Sprints 7-8)  

**Related Documents**:
- [Test-Plan-Phase-4: Auto-Update Testing](Test-Plan-Phase-4.md#auto-update-testing)

**Epic Description**:
Implement built-in auto-update mechanism checking for new versions daily. Download updates incrementally, verify signatures, install transparently, provide rollback capability.

**Acceptance Criteria**:
- [ ] Check for updates daily
- [ ] Manual check option available
- [ ] Download update in background
- [ ] Verify signature before install
- [ ] Transparent installation with progress
- [ ] Restart prompt for user
- [ ] Rollback if update fails
- [ ] Update history logged
- [ ] Network handling: Retry on failure

**Stories**:

| Story ID | Title | Points | Sprint |
|----------|-------|--------|--------|
| US-4-3-1 | Design update check mechanism | 2 | 7 |
| US-4-3-2 | Implement version checking | 3 | 7 |
| US-4-3-3 | Create update download service | 5 | 7 |
| US-4-3-4 | Implement signature verification | 3 | 7 |
| US-4-3-5 | Build installer integration | 5 | 8 |
| US-4-3-6 | Add rollback capability | 3 | 8 |
| US-4-3-7 | Test update flow end-to-end | 5 | 8 |

**Sprint Estimate**: 26 story points

---

### EP-4-4: CI/CD Pipeline & Release Automation

**Epic Type**: Infrastructure  
**Priority**: CRITICAL  
**Dependencies**: EP-4-2  
**Timeline**: Weeks 15-16 (Sprint 8)  

**Related Documents**:
- [ADR-006: GitHub Releases Distribution](ADR-006-GitHub-Releases-Distribution.md)
- [Test-Plan-Phase-4: CI/CD Testing](Test-Plan-Phase-4.md#cicd-pipeline-testing)

**Epic Description**:
Set up GitHub Actions CI/CD pipeline to automatically build, test, sign, notarize, and release on each git tag. Create release notes, manage artifacts, publish to GitHub Releases.

**Acceptance Criteria**:
- [ ] Build on push: Automatic builds for all commits
- [ ] Test on CI: Run full test suite in GitHub Actions
- [ ] Build releases: Trigger on git tag (v1.0.0)
- [ ] Sign & notarize: Automated signing/notarization
- [ ] Create releases: Auto-generate GitHub Releases
- [ ] Upload artifacts: All installers uploaded
- [ ] Release notes: Generated from commit messages
- [ ] Status checks: Merge blocked if tests fail
- [ ] Artifact retention: Keep builds for 30 days

**Stories**:

| Story ID | Title | Points | Sprint |
|----------|-------|--------|--------|
| US-4-4-1 | Create GitHub Actions workflow | 5 | 8 |
| US-4-4-2 | Add build matrix (Windows/Mac/Linux) | 3 | 8 |
| US-4-4-3 | Integrate test suite in CI | 3 | 8 |
| US-4-4-4 | Automate code signing in CI | 5 | 8 |
| US-4-4-5 | Automate notarization in CI | 3 | 8 |
| US-4-4-6 | Create GitHub Release automation | 3 | 8 |
| US-4-4-7 | Generate release notes | 2 | 8 |

**Sprint Estimate**: 24 story points

---

### EP-4-5: Beta Testing & Final Polish

**Epic Type**: Quality Assurance  
**Priority**: HIGH  
**Dependencies**: EP-4-1, EP-4-3, EP-4-4  
**Timeline**: Weeks 13-16 (Sprints 7-8)  

**Related Documents**:
- [PRD-Phase-4: Beta Testing](PRD-Phase-4-Distribution-Polish.md#beta-testing)
- [Test-Plan-Phase-4: Beta Testing](Test-Plan-Phase-4.md#beta-testing)

**Epic Description**:
Recruit 50-100 beta testers across all platforms. Collect feedback over 4 weeks. Fix critical bugs. Conduct security audit. Write documentation. Prepare for public release.

**Acceptance Criteria**:
- [ ] Beta participants: 50-100 recruited
- [ ] Weekly surveys: Feature feedback collection
- [ ] Crash rate: <1 per 100 hours usage
- [ ] User satisfaction: >8/10 rating
- [ ] Privacy trust: >4.5/5 rating
- [ ] Bug response: Critical fixes <24 hours
- [ ] Documentation: Complete and proofread
- [ ] Security audit: Completed and passed
- [ ] Release notes: Generated

**Stories**:

| Story ID | Title | Points | Sprint |
|----------|-------|--------|--------|
| US-4-5-1 | Prepare beta program | 3 | 7 |
| US-4-5-2 | Recruit beta testers | 3 | 7 |
| US-4-5-3 | Create feedback collection system | 2 | 7 |
| US-4-5-4 | First week beta coordination | 3 | 7 |
| US-4-5-5 | Bug triage & prioritization | 3 | 8 |
| US-4-5-6 | Fix critical bugs | 5 | 8 |
| US-4-5-7 | Write user documentation | 5 | 8 |
| US-4-5-8 | Security audit coordination | 3 | 8 |
| US-4-5-9 | Prepare release announcement | 2 | 8 |

**Sprint Estimate**: 29 story points

---

### PHASE 4 SUMMARY

| Metric | Value |
|--------|-------|
| Total Epics | 5 |
| Total Stories | 36 |
| Total Points (est.) | ~130 |
| Duration | 4 weeks (2 sprints) |
| Team Size | 3-4 (dev + ops + QA) |
| Phase Gates | All installers working, signed/notarized, beta satisfied >8/10 |

---

## PROJECT SUMMARY

### All Phases

| Metric | Phase 1 | Phase 2 | Phase 3 | Phase 4 | Total |
|--------|---------|---------|---------|---------|-------|
| Epics | 5 | 5 | 5 | 5 | 20 |
| Stories | 42 | 29 | 33 | 36 | 140 |
| Story Points | 145 | 102 | 114 | 130 | **491** |
| Duration | 4 weeks | 4 weeks | 4 weeks | 4 weeks | **16 weeks** |
| Team Size | 2-3 | 2-3 | 2-3 | 3-4 | ~3 avg |

### Velocity Targets

```
Phase 1: 70-75 points/sprint (2 sprints = 140-150 total)
Phase 2: 50-55 points/sprint (2 sprints = 100-110 total)
Phase 3: 55-60 points/sprint (2 sprints = 110-120 total)
Phase 4: 60-70 points/sprint (2 sprints = 120-140 total)

Context: New team with 2-3 developers, typical 25-30 pt/sprint velocity
Conservative estimates account for learning curve + integration challenges
```

### Critical Path Dependencies

```
Phase 1 (must complete before Phase 2):
└─ Questionnaire, Score Calc, Storage, Auto-Save

Phase 2 (must complete before Phase 3):
└─ Statistics Dashboard, Charts

Phase 3 (must complete before Phase 4):
└─ IPFS Integration, Network Features

Phase 4 (no Phase 1-3 dependencies once complete):
├─ Can run parallel with Phases 1-3 on different team
└─ Depends on Phase 3 completion for final testing
```

### Quality Gates by Phase

```
Phase 1 Gate: >85% test coverage, all user flows OK, <3s startup
Phase 2 Gate: Dashboard render <2s, stats accuracy verified, export OK
Phase 3 Gate: Anonymity verified, P2P publish/subscribe working, aggregation <5s
Phase 4 Gate: Installers tested, signed/notarized, <1 crash/100hr beta, release ready
```

---

## 2. Sprint Planning Template

### Sprint Planning Meeting (Every 2 Weeks)

```
Duration: 1.5 hours
Attendees: Dev team, Product Manager, Scrum Master

Agenda:
1. Review previous sprint results (15 min)
   ├─ Burn-down chart
   ├─ Completed vs planned
   └─ Blockers & lessons learned

2. Backlog refinement (15 min)
   ├─ Stories ready for sprint
   ├─ Acceptance criteria clear
   └─ Dependencies resolved

3. Sprint planning (45 min)
   ├─ Select stories for sprint
   ├─ Assign to developers
   ├─ Estimate (re-estimate if needed)
   └─ Commit to velocity

4. Planning adjustments (15 min)
   ├─ Team capacity (vacation, etc.)
   ├─ Risk mitigation
   └─ Sprint goal agreement
```

### Sprint Retrospective (Every 2 Weeks)

```
Duration: 1 hour
Focus: What worked, what didn't, improvements

Standard Questions:
1. What went well?
2. What didn't go well?
3. What will we do differently?

Actions: Record 2-3 improvements to try next sprint
```

---

## 3. Integration Points

### Phase Transitions

```
Phase 1 → Phase 2 Transition (End Week 4):
├─ Review Phase 1 test results
├─ Code review & merge main branch
├─ Database schema finalized
├─ Team briefing on Phase 2 scope
└─ Begin Phase 2 sprints

Phase 2 → Phase 3 Transition (End Week 8):
├─ Dashboard UI/UX finalized
├─ Analytics data accessible
├─ Team ramp-up on IPFS/P2P concepts
└─ Begin Phase 3 sprints

Phase 3 → Phase 4 Transition (End Week 12):
├─ P2P infrastructure stable
├─ Anonymity/privacy validated
├─ Begin installer/signing setup
├─ Recruit beta testers
└─ Begin Phase 4 sprints

Post-Release (Week 17+):
├─ Monitor production issues
├─ Patch releases for bugs
├─ Collect user feedback
├─ Plan Phase 5 (future features)
```

---

## 4. Risk Management by Epic

### High-Risk Epics (Mitigation Required)

| Epic | Risk | Probability | Mitigation |
|------|------|-------------|-----------|
| EP-3-1: IPFS Node | Network complexity, latency | HIGH | Early POC, network testing focus |
| EP-3-2: Anonymity | Privacy requirements unclear | MEDIUM | Security audit in Phase 4 |
| EP-4-2: Code Signing | Certificate management | MEDIUM | Automation, renewal alerts |
| EP-4-4: CI/CD | Build complexity (3 platforms) | HIGH | Early setup, parallel builds |
| EP-4-5: Beta Testing | User recruitment, coordination | MEDIUM | Early planning, incentives |

---

## 5. Success Metrics by Epic

Each epic includes tests for:
- **Functional**: Feature works as specified
- **Performance**: Meets speed/memory targets
- **Security**: Privacy, encryption, input validation
- **Quality**: Test coverage >85%, <1% bug escape

Epic completion: All acceptance criteria met + tests passing + code reviewed

---

## Appendix: Story Template

```markdown
## [US-X-Y-Z]: [Story Title]

**Epic**: [EP-X-N]  
**Priority**: [CRITICAL | HIGH | MEDIUM | LOW]  
**Points**: [1-13]  
**Sprint**: [N]  

### Description
As a [role], I want [feature], so that [benefit].

### Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

### Technical Notes
- Implementation approach
- Dependencies
- Test cases

### Definition of Done
- [ ] Code complete
- [ ] Unit tests passing (>85% coverage)
- [ ] Integration tests passing
- [ ] Code review approved
- [ ] Ready to merge to main
```

---

## Document Control

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-02-18 | Initial comprehensive epic breakdown |
| 1.1 | TBD | Post-Phase-1 adjustments |
| 1.2 | TBD | Post-Phase-2 refinements |
| 2.0 | TBD | Post-release retrospective improvements |

---

**Epic Planning Complete**  
**Companion Documents**: [PRDs](PRD-Master-Index.md) | [ADRs](ADR-Index.md) | [Test Plans](Test-Plan-Master-Index.md)  
**Status**: Ready for Sprint Planning  
**Next Step**: Begin Phase 1 Sprint 1 (Week 1, Day 1)

---

**Document End: Implementation-Epics.md**
