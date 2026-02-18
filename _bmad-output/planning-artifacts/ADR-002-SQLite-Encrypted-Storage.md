# ADR-002: Local Database - SQLite with sqlcipher Encryption

**Date**: 2026-02-18  
**Status**: Accepted  
**Context**: Need secure, embedded database for questionnaire responses and statistics  
**Deciders**: Architecture Team, Security Lead  

---

## Problem Statement

The application must:
- Store questionnaire responses and calculated scores locally (no cloud)
- Encrypt all user data at rest (security requirement)
- Support cross-platform operation (Windows/macOS/Linux)
- Operate offline completely
- Maintain data for 5+ years without external dependencies
- Be lightweight (<50MB total app size)

Database options vary significantly in capability and overhead.

---

## Decision

**Use SQLite enhanced with sqlcipher for AES-256 encryption at rest.**

---

## Rationale

### No External Dependencies
- **SQLite**: Embedded, file-based database (no server required)
- **Cloud databases** (Firebase, Supabase, etc.): Require internet, cloud costs, potential privacy issues
- **Advantage**: Complete user data sovereignty, zero server costs, offline-first

### Encryption Implementation
- **sqlcipher**: Drop-in SQLite replacement with:
  - AES-256 CBC encryption
  - PBKDF2 key derivation (64,000 iterations)
  - No performance penalty for normal queries
  - Military-grade security (used by actual military apps)
- **Unencrypted SQLite**: Data visible if device compromised
- **Advantage**: sqlcipher is transparent to application code

### File Size and Performance
- **SQLite**: 0MB overhead (built into OS libraries)
- **PostgreSQL**: 50MB+ server binary, excessive for desktop
- **MongoDB**: 100MB+, designed for remote replication
- **Advantage**: SQLite adds only database data size, no engine overhead

### Cross-Platform Compatibility
- **SQLite**: Identical implementation on Windows/macOS/Linux
- **Database-specific solutions**: Each platform would need different approach
- **Advantage**: Single schema, single query language across all platforms

### Offline-First Architecture
- **SQLite**: Works completely offline, syncs when online (if needed)
- **Cloud-only databases**: Fail without internet
- **Advantage**: Core functionality never blocked by network

### Storage Efficiency
- Estimated sizes:
  - 1 year of weekly questionnaires: ~5MB
  - 5 years of daily data: ~20MB
  - Network results cache (1000s): ~100MB
- **Total for full feature**: ~120MB per user (acceptable)
- **Advantage**: SQLite's compression extremely efficient

### Security Model
- Database encrypted at rest (sqlcipher)
- Encryption key random per session (not persistent)
- Proves consistency with local SHA256 hash (no identity exposed)
- **Advantage**: User data protected even if device stolen

---

## Consequences

### Positive
✅ Zero external dependencies: Complete offline capability  
✅ Transparent encryption: Application code unchanged  
✅ Excellent performance: Sub-100ms queries typical  
✅ Tiny footprint: No server, minimal disk usage  
✅ Data ownership: All data remains on user's device  
✅ Cross-platform: Identical schema/queries on all OS  
✅ Mature technology: 20+ years stable development  

### Negative
❌ Single-user limitation: Not designed for multiple users on same device  
❌ No remote backup: User responsible for backup (solved with export)  
❌ Limited data types: No native JSON (worked around with TEXT)  
❌ No transactions across databases: Not relevant for single DB  

### Mitigation
- Export/import CSV for user backups
- Document backup procedures clearly
- Automatic backup to system AppData folder
- Guide users to enable OS-level encryption (BitLocker, FileVault, etc.)

---

## Alternatives Considered

### 1. Cloud Database (Firebase, Supabase)
**Pros**: Automatic backup, cloud redundancy, real-time sync  
**Cons**: Privacy concerns, ongoing costs, internet dependency, vendor lock-in  
**Decision Rationale**: Contradicts core design principle of zero cloud, complete user privacy  

### 2. Unencrypted SQLite
**Pros**: Simpler implementation, marginally faster  
**Cons**: Data visible if device compromised, security violation  
**Decision Rationale**: Cannot accept plaintext storage for user data  

### 3. PostgreSQL Embedded
**Pros**: More powerful than SQLite  
**Cons**: Not designed for embedding, 50MB+ overhead, unnecessary complexity  
**Decision Rationale**: SQLite sufficient for our data model  

### 4. LevelDB / RocksDB
**Pros**: High-performance key-value stores  
**Cons**: No SQL, would require custom query layer, less mature  
**Decision Rationale**: SQL provides better expressiveness for stats queries  

### 5. IndexedDB (Browser-based)
**Pros**: Built into browsers  
**Cons**: Not suitable for Tauri (Rust backend), limits us to web  
**Decision Rationale**: Tauri architecture uses Rust backend, not browser storage  

---

## Technical Specifications

### Schema Design
```sql
-- Questionnaire responses
CREATE TABLE questionnaire_responses (
  id INTEGER PRIMARY KEY,
  session_id TEXT NOT NULL,
  question_number TEXT NOT NULL,
  answer_value INTEGER NOT NULL,
  answered_at TIMESTAMP,
  UNIQUE(session_id, question_number)
);

-- Statistics (calculated)
CREATE TABLE stats (
  id INTEGER PRIMARY KEY,
  completion_date TEXT NOT NULL UNIQUE,
  total_score REAL NOT NULL,
  category_1 REAL, category_2 REAL, ... category_40 REAL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Network results cache (Phase 3)
CREATE TABLE network_results (
  id INTEGER PRIMARY KEY,
  ipfs_hash TEXT NOT NULL UNIQUE,
  result_data JSON NOT NULL,
  received_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  processed BOOLEAN DEFAULT 0
);

-- Indices for performance
CREATE INDEX idx_responses_session ON questionnaire_responses(session_id);
CREATE INDEX idx_stats_date ON stats(completion_date DESC);
CREATE INDEX idx_network_results_date ON network_results(received_at DESC);
```

### Encryption Configuration (Rust)
```rust
// Enable encryption
sqlx::sqlite::SqlitePool::connect(
  "sqlite:data.db?mode=rwc"
).await?

// Set encryption pragmas
sqlx::query("PRAGMA cipher = 'aes-256-cbc'")
  .execute(&pool).await?
sqlx::query("PRAGMA kdf_iter = '64000'")
  .execute(&pool).await?
```

### Performance Targets
| Operation | Target | Notes |
|-----------|--------|-------|
| Query (40 categories) | <100ms | Indexed lookups |
| Score calculation | <50ms | In-memory computation |
| CSV export (5 years data) | <1s | Disk I/O bound |
| Vacuum/optimize | <5s | Maintenance operation |

---

## Data Privacy Model

### What's Encrypted
- ✅ All questionnaire responses
- ✅ All calculated scores
- ✅ Network results cache
- ✅ User preferences
- ✅ Session data

### What's NOT Stored
- ❌ Name or email
- ❌ IP address
- ❌ Device fingerprint
- ❌ Location (beyond timezone optional)
- ❌ Cookies or tracking identifiers

### Encryption Key Management
- Key generated: Random per application session
- Key stored: Memory only (never persisted)
- Key rotation: Automatic on app restart
- Key length: 256-bit (AES-256)

---

## Backup and Recovery Strategy

### User Data Export
```
Menu → Settings → Data Management → [Export as CSV]
↓
manifestation-data-2026-02-18.csv
(All questionnaires, all 40 categories)
```

### System-Level Backups
- **Windows**: BitLocker (disk-level encryption)
- **macOS**: FileVault (disk-level encryption)
- **Linux**: LUKS (disk-level encryption)
- Data stored in `~/.manifestation-algorithm/data.db`
- Encrypted twice: sqlcipher + OS storage encryption

### Cloud Backup (Optional - User Choice)
- Users can manually export CSV and backup to:
  - Google Drive
  - Dropbox
  - OneDrive
  - Any cloud service they trust
- We provide zero guidance/incentive toward cloud (preserve privacy)

---

## Migration Path (If Needed)

If SQLite ever becomes insufficient:
1. Add secondary database (PostgreSQL, etc.)
2. Migrate via CSV export/import
3. Keep SQLite as primary (doesn't require cloud)
4. No single point of failure among databases

---

## References

- [SQLite Features](https://www.sqlite.org/features.html)
- [sqlcipher Documentation](https://www.zetetic.net/sqlcipher/)
- [SQLite Best Practices](https://www.sqlite.org/bestpractices.html)
- [AES-256 Encryption Standard](https://nvlpubs.nist.gov/nistpubs/fips/nist.fips.197.pdf)

---

## Related ADRs
- ADR-001: Tauri desktop framework
- ADR-005: Zero PII collection design principle

---

## Sign-Off
**Approved by**: Security Lead, Architecture Lead  
**Date**: 2026-02-18  

---

**Document End: ADR-002.md**
