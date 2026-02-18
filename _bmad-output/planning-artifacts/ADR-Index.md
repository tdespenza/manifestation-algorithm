# ADR Index - Architecture Decision Records
## Manifestation Algorithm Desktop Application

**Project**: Manifestation Algorithm  
**Date Created**: 2026-02-18  
**Last Updated**: 2026-02-18  
**Status**: All ADRs Accepted  

---

## Overview

This document serves as the master index for all Architecture Decision Records (ADRs) for the Manifestation Algorithm desktop application project. Each ADR documents a major architectural decision, its rationale, alternatives considered, and consequences.

ADRs follow the RFC 3986 format with:
- **Title**: Clear decision summary
- **Status**: Proposed, Accepted, Deprecated, Superseded
- **Context**: Problem being addressed
- **Decision**: What was decided
- **Rationale**: Why this decision
- **Consequences**: Positive and negative impacts
- **Alternatives**: Other options considered

---

## ADR Catalog

### Core Infrastructure

#### [ADR-001: Desktop Framework - Tauri over Electron](ADR-001-Desktop-Framework-Tauri.md)
**Status**: ✅ Accepted  
**Date**: 2026-02-18  
**Summary**: Use Tauri (Rust + Vue 3) instead of Electron for desktop application framework.

**Key Decision Points**:
- Bundle size: 50MB (Tauri) vs 150MB (Electron) - 66% smaller
- Memory safety: Rust compile-time guarantees vs JavaScript runtime
- Performance: System WebView vs embedded Chromium
- IPFS integration: Native Rust access vs IPC bridges

**Consequences**:
- ✅ Smaller app distribution
- ✅ Better security (memory-safe Rust)
- ✅ Lower barrier to IPFS embedding
- ❌ Team must learn Rust

**Impact**: Foundation for entire application architecture. Critical for bundle size constraint and embedded IPFS.

---

#### [ADR-002: Local Database - SQLite + Encrypted Storage](ADR-002-SQLite-Encrypted-Storage.md)
**Status**: ✅ Accepted  
**Date**: 2026-02-18  
**Summary**: Use SQLite with sqlcipher (AES-256) for encrypted local data storage.

**Key Decision Points**:
- Encryption: AES-256-CBC with PBKDF2 key derivation
- Storage: File-based, embedded, cross-platform
- Privacy: All data remains on user's device
- Scale: Supports 5+ years of data (<50MB)

**Consequences**:
- ✅ Zero server dependency
- ✅ Complete data privacy (encrypted at rest)
- ✅ Works completely offline
- ✅ Cross-platform identical schema
- ❌ No remote backup by default
- ❌ Single-user per device

**Impact**: Enables privacy-first architecture. No cloud component needed. Users have complete data ownership.

---

#### [ADR-003: Decentralized Network - IPFS for P2P Sharing](ADR-003-IPFS-Decentralized-Network.md)
**Status**: ✅ Accepted  
**Date**: 2026-02-18  
**Summary**: Use IPFS (InterPlanetary File System) with PubSub for anonymous result sharing and network aggregation.

**Key Decision Points**:
- Network model: Decentralized DHT vs centralized server
- Anonymity: Content-addressed (no IP tracking) vs identity-based
- Cost: $0 per user vs $0.10-1.00/GB bandwidth
- Resilience: Network improves as users join vs single point of failure

**Consequences**:
- ✅ Zero operational costs (scales to millions)
- ✅ Complete anonymity by design
- ✅ Censorship-resistant (no central server to block)
- ✅ Distributed redundancy (survives peer failures)
- ❌ Initial latency: DHT discovery 5-10 seconds
- ❌ Network churn affects performance
- ❌ Requires critical mass to be useful

**Impact**: Enables unique value proposition (distributed, anonymous, free). Differentiates from centralized competitors.

---

### Frontend & UI

#### [ADR-004: Frontend Framework - Vue 3 over React/Angular/Svelte](ADR-004-Vue3-Frontend.md)
**Status**: ✅ Accepted  
**Date**: 2026-02-18  
**Summary**: Use Vue 3 with TypeScript for frontend application development.

**Key Decision Points**:
- Bundle size: Vue 33KB vs React 45KB vs Angular 130KB
- Developer experience: Single-file components vs JSX vs decorators
- Build time: Vite <100ms vs Webpack seconds
- Chart.js integration: Native compatibility

**Consequences**:
- ✅ Smallest bundle among major frameworks
- ✅ Excellent developer experience
- ✅ Fast development builds
- ✅ Designer-friendly templates
- ✅ Perfect Chart.js integration
- ❌ Smaller community than React
- ❌ Fewer job listings

**Impact**: Enables rapid development. Fast feedback loop during implementation. Good DX for distributed teams.

---

#### [ADR-007: Visualization - Chart.js for Line Graphs](ADR-007-Chart.js-Visualization.md)
**Status**: ✅ Accepted  
**Date**: 2026-02-18  
**Summary**: Use Chart.js 4.x for all line graph visualizations in statistics dashboard.

**Key Decision Points**:
- Bundle size: Chart.js 12KB vs D3 80KB vs Recharts 45KB
- Capability: Line graphs (primary) vs full power vs React-specific
- Vue integration: Vanilla JS vs React components
- Performance: Canvas rendering for 40+ charts

**Consequences**:
- ✅ Minimal bundle addition
- ✅ Excellent performance (renders 40 charts in <1 second)
- ✅ Simple configuration-based approach
- ✅ Active community, clear documentation
- ❌ Less customizable than D3
- ❌ No advanced analytics built-in

**Impact**: Fast implementation of statistics dashboard. Good performance for real-time updates.

---

### Privacy & Security

#### [ADR-005: Privacy-First Architecture - Zero PII Collection by Design](ADR-005-Zero-PII-Privacy-Design.md)
**Status**: ✅ Accepted  
**Date**: 2026-02-18  
**Summary**: Design application to make PII collection architecturally impossible, not just policy-based.

**Key Decision Points**:
- Data collection: Zero by design vs opt-out
- User accounts: None required vs standard registration
- Telemetry: No tracking vs analytics package
- Server: No central hub vs traditional backend

**Consequences**:
- ✅ User trust through architecture
- ✅ No GDPR/CCPA compliance burden
- ✅ Hacker-proof (no database to steal)
- ✅ Government-resistant (no data to hand over)
- ✅ Privacy is core brand value
- ❌ No product analytics
- ❌ Harder to measure user behavior
- ❌ A/B testing not possible

**Impact**: Differentiates from every other app. User trust is competitive advantage. Simpler legal/compliance.

---

### Distribution & Operations

#### [ADR-006: Distribution - GitHub Releases + GitHub Actions](ADR-006-GitHub-Releases-Distribution.md)
**Status**: ✅ Accepted  
**Date**: 2026-02-18  
**Summary**: Use GitHub Releases as primary distribution channel with GitHub Actions for automated builds.

**Key Decision Points**:
- Hosting: GitHub (free) vs AWS S3 ($500-2000/mo)
- CI/CD: GitHub Actions (free) vs Fastly/Travis ($100-500/mo)
- Code signing: Automated vs manual process
- Auto-update: Tauri built-in vs custom server

**Consequences**:
- ✅ Zero infrastructure costs
- ✅ Automated builds (one tag = release)
- ✅ Transparent build process
- ✅ Familiar to developers (GitHub)
- ✅ Scales to millions at no cost
- ✅ Can move/fork if needed
- ❌ Source code must be public
- ❌ GitHub outage blocks updates (rare, acceptable)

**Impact**: Eliminates DevOps overhead. Enables rapid iteration. No infrastructure to manage/maintain.

---

## Architecture Relationship Diagram

```
┌─────────────────────────────────────────────────┐
│          ADR-005: Zero PII Privacy              │ (Design Principle)
│        (No collection, encrypted storage)       │
└──────────────────┬──────────────────────────────┘
                   │
                   ├─────────────────────────────┬────────────────────┐
                   ↓                             ↓                    ↓
    ┌──────────────────────────┐  ┌──────────────────────┐ ┌────────────────┐
    │  ADR-001: Tauri Desktop  │  │  ADR-002: SQLite     │ │ ADR-003: IPFS  │
    │  Framework               │  │  Encrypted Storage   │ │ P2P Network    │
    │  (Rust + Vue 3)          │  │  (Local AES-256)     │ │ (Anonymous)    │
    └────────┬────────┬────────┘  └──────────┬──────────┘ └────────────────┘
             │        │                       │                       │
             │        ├───────────────────────┼───────────────────────┤
             │        │                       │                       │
             ↓        ↓                       ↓                       ↓
    ┌──────────────────────────┐  ┌─────────────────────┐ ┌────────────────┐
    │  ADR-004: Vue 3          │  │  Phase 1 Core App   │ │  Phase 3 Network│
    │  Frontend Framework      │  │  Architecture       │ │  Architecture  │
    │                          │  │  (Questionnaire +   │ │  (Anonymous    │
    └──────────┬───────────────┘  │   Auto-save)        │ │   Sharing)     │
               │                  └─────────────────────┘ └────────────────┘
               │
               ├─────────────────────────┬──────────────────┐
               │                         │                  │
               ↓                         ↓                  ↓
    ┌──────────────────────┐  ┌──────────────────────┐  ┌────────────────┐
    │  ADR-007: Chart.js   │  │  Phase 2 Stats       │  │  ADR-006: GitHub│
    │  Line Graphs         │  │  Dashboard           │  │  Releases       │
    └──────────────────────┘  │  Architecture        │  │  Distribution   │
                              │  (Visualization)     │  │  & Auto-Update  │
                              └──────────────────────┘  └────────────────┘
```

---

## ADR Status Summary

| ADR | Title | Status | Phase | Impact |
|-----|-------|--------|-------|--------|
| **001** | Tauri Desktop | ✅ Accepted | 1 | Foundation |
| **002** | SQLite Storage | ✅ Accepted | 1 | Phase 1, 2, 3 |
| **003** | IPFS P2P Network | ✅ Accepted | 3 | Phase 3 |
| **004** | Vue 3 Frontend | ✅ Accepted | 1 | All |
| **005** | Zero PII Privacy | ✅ Accepted | 1 | Strategy |
| **006** | GitHub Distribution | ✅ Accepted | 4 | Phase 4 |
| **007** | Chart.js Vis | ✅ Accepted | 2 | Phase 2 |

---

## ADR Dependencies

```
Phase 1 (Foundation)
├── ADR-001 (Tauri)
├── ADR-002 (SQLite)
├── ADR-004 (Vue 3)
├── ADR-005 (Privacy)
└── Related: ADR-007

Phase 2 (Statistics)
├── Depends on Phase 1
├── ADR-007 (Chart.js)
└── Visualization

Phase 3 (Network)
├── Depends on Phase 1-2
├── ADR-003 (IPFS)
├── ADR-005 (Privacy)
└── Anonymous sharing

Phase 4 (Distribution)
├── Depends on Phase 1-3
├── ADR-006 (GitHub)
└── Auto-updates
```

---

## Cross-Cutting Concerns

### Security (ADR-002, ADR-005)
- Local encryption: AES-256 (ADR-002)
- Zero data collection: No tracking (ADR-005)
- Code signing: GitHub Actions (ADR-006)
- Privacy audit: Required yearly

### Performance (ADR-001, ADR-004, ADR-007)
- Bundle size target: <50MB (ADR-001)
- Frontend framework: Minimal overhead (ADR-004)
- Visualization: Real-time updates (ADR-007)
- Database: <100ms queries (ADR-002)

### Scalability (ADR-003, ADR-006)
- P2P network: Scales to millions (ADR-003)
- Distribution: GitHub Releases unlimited (ADR-006)
- Cost: $0 operational (both)

### Privacy (ADR-005, ADR-002, ADR-003)
- No collection: Architectural (ADR-005)
- Encryption: AES-256 at rest (ADR-002)
- Anonymity: Content-addressed P2P (ADR-003)

---

## Technology Stack Summary

| Layer | Technology | ADR | Status |
|-------|-----------|-----|--------|
| **Desktop** | Tauri 1.x | ADR-001 | ✅ |
| **Backend** | Rust + Tokio | ADR-001 | ✅ |
| **Frontend** | Vue 3 + TypeScript | ADR-004 | ✅ |
| **Build** | Vite | ADR-004 | ✅ |
| **Database** | SQLite + sqlcipher | ADR-002 | ✅ |
| **Charts** | Chart.js 4.x | ADR-007 | ✅ |
| **Styling** | TailwindCSS | — | ✅ |
| **Network** | IPFS + PubSub | ADR-003 | ✅ |
| **Distribution** | GitHub Releases | ADR-006 | ✅ |
| **CI/CD** | GitHub Actions | ADR-006 | ✅ |
| **Privacy** | AES-256 encryption | ADR-002 | ✅ |
| **Anonymity** | IPFS DHT + hashing | ADR-003, ADR-005 | ✅ |

---

## Decision-Making Process

### ADR Lifecycle
```
1. Problem Identified
   └─→ ADR written (status: Proposed)

2. Review & Discussion
   └─→ Team feedback, alternatives considered

3. Decision Made
   └─→ ADR accepted (status: Accepted)

4. Implementation
   └─→ Coding begins in scheduled phase

5. If Superseded
   └─→ New ADR created (status: Superseded)
   └─→ Link to superseding ADR
```

### Future ADRs
As project evolves, new ADRs may be needed for:
- Mobile app (iOS/Android)
- Machine learning features
- Third-party integrations
- Data export formats
- i18n/localization strategy
- Accessibility standards

---

## Reference & Learning

### How to Read ADRs
1. Start with **Status** (is it accepted?)
2. Read **Context** (understand the problem)
3. Review **Alternatives** (why not X?)
4. Check **Rationale** (convinced by decision?)
5. Note **Consequences** (tradeoffs accepted?)

### How to Use ADRs
- **New team member**: Understand architecture decisions and rationale
- **Code review**: Reference ADR when evaluating architecture-level PRs
- **Proposals**: Create ADR before proposing major changes
- **Documentation**: ADRs explain "why" not just "how"

---

## Related Documents

**See Also**:
- [Technical Research Document](manifestation-algorithm-technical-research.md) - Complete architecture & specifications
- [PRD Master Index](PRD-Master-Index.md) - Product requirements overview
- [PRD Phase 1](PRD-Phase-1-Core-Application.md) - Questionnaire & Storage details
- [PRD Phase 2](PRD-Phase-2-Statistics-Dashboard.md) - Analytics & Visualization specs
- [PRD Phase 3](PRD-Phase-3-IPFS-Integration.md) - P2P Network specifications
- [PRD Phase 4](PRD-Phase-4-Distribution-Polish.md) - Release & Auto-Update specs

---

## Sign-Off

**Project**: Manifestation Algorithm Desktop Application  
**ADR Approval Date**: 2026-02-18  
**Status**: All ADRs Accepted, Ready for Implementation  

### Stakeholder Sign-Off
- [ ] Architecture Lead: _________________ Date: _______
- [ ] Engineering Lead: _________________ Date: _______
- [ ] Security Lead: ____________________ Date: _______
- [ ] Product Lead: _____________________ Date: _______

---

## Notes

- All ADRs are stored in: `_bmad-output/planning-artifacts/`
- ADR format follows: RFC 3986 (Architecture Decision Records)
- Decisions are final unless explicitly superseded
- All team members should read relevant ADRs before contributing

---

**Document End: ADR-Index.md**
