# Database Reference

The app uses **SQLite** via `tauri-plugin-sql` v2. The database file (`manifestation.db`) is created in the OS application-data directory managed by Tauri:

| OS | Path |
|----|------|
| macOS | `~/Library/Application Support/manifestation-app/manifestation.db` |
| Windows | `%APPDATA%\manifestation-app\manifestation.db` |
| Linux | `~/.local/share/manifestation-app/manifestation.db` |

---

## Table of Contents

- [Schema](#schema)
- [Migrations](#migrations)
- [Service Layer](#service-layer)
- [Query Examples](#query-examples)

---

## Schema

### `questionnaire_responses` — Live session answers

Stores the answers for the current in-progress assessment session. This table is cleared when a session is submitted.

```sql
CREATE TABLE IF NOT EXISTS questionnaire_responses (
  id             INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id     TEXT    NOT NULL,
  question_number TEXT   NOT NULL,           -- question ID, e.g. '1a', '23g'
  answer_value   INTEGER NOT NULL,           -- 1–10
  answered_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(session_id, question_number)        -- one answer per question per session
);
```

The `UNIQUE` constraint means `saveAnswer` uses `INSERT OR REPLACE` for upsert behaviour.

---

### `settings` — Key-value configuration

Holds lightweight application settings, primarily the session heartbeat timestamps.

```sql
CREATE TABLE IF NOT EXISTS settings (
  key        TEXT PRIMARY KEY,
  value      TEXT NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Known keys:**

| Key pattern | Value | Description |
|-------------|-------|-------------|
| `last_active_<sessionId>` | Unix timestamp (ms, string) | Heartbeat used to detect expired sessions (> 30 days = expired) |

---

### `historical_sessions` — Completed assessment summaries

One row per submitted assessment.

```sql
CREATE TABLE IF NOT EXISTS historical_sessions (
  id               TEXT PRIMARY KEY,          -- UUID v4
  completed_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  total_score      REAL    NOT NULL,           -- 0.0–10000.0
  duration_seconds INTEGER,                   -- reserved, not yet tracked
  notes            TEXT                        -- reserved, nullable
);

CREATE INDEX IF NOT EXISTS idx_sessions_completed ON historical_sessions(completed_at);
```

---

### `historical_responses` — Per-question answers for completed sessions

Snapshot of all answers at submission time, with category labels for efficient trend queries.

```sql
CREATE TABLE IF NOT EXISTS historical_responses (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id   TEXT    NOT NULL,
  question_id  TEXT    NOT NULL,              -- e.g. '1a', '23g'
  category     TEXT    NOT NULL,              -- parent question description
  answer_value INTEGER NOT NULL,              -- 1–10
  FOREIGN KEY(session_id) REFERENCES historical_sessions(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_responses_qid ON historical_responses(question_id);
```

The `ON DELETE CASCADE` constraint means deleting a session row automatically removes all its response rows.

---

### `stats` — Legacy aggregation table (Migration 1)

Created in the initial migration; no longer actively written to. Present for backwards-compatibility.

```sql
CREATE TABLE IF NOT EXISTS stats (
  id               INTEGER PRIMARY KEY AUTOINCREMENT,
  completion_date  TEXT    NOT NULL,
  total_score      REAL    NOT NULL,
  created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## Migrations

Migrations are defined in `src/services/migrations.ts` and applied automatically when the database connection is first opened (`getDb()`).

### How it works

1. The migration runner checks for a `schema_migrations` table. If it does not exist, it creates one:
   ```sql
   CREATE TABLE IF NOT EXISTS schema_migrations (
     id         INTEGER PRIMARY KEY,
     name       TEXT NOT NULL,
     applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```
2. It reads all applied migration IDs from the table.
3. For each migration not yet applied (ordered by `id`), it runs the `up` function and records the ID.
4. If any migration throws, the error propagates and the app initialization fails — the user sees an error rather than operating on a partially-migrated schema.

### Current migrations

| ID | Name | Description |
|----|------|-------------|
| 1 | `initial_schema` | Creates `stats`, `questionnaire_responses`, `settings` |
| 2 | `historical_schema` | Creates `historical_sessions`, `historical_responses`, and indexes |

### Adding a migration

```typescript
// in src/services/migrations.ts
const migrations: Migration[] = [
  // ... existing migrations ...
  {
    id: 3,
    name: 'add_notes_full_text_index',
    up: async (db: Database) => {
      await db.execute(`
        CREATE INDEX IF NOT EXISTS idx_sessions_notes
        ON historical_sessions(notes)
        WHERE notes IS NOT NULL;
      `);
    }
  }
];
```

Rules:
- IDs must be monotonically increasing integers.
- Migrations are **additive only** — never drop or rename columns in an existing migration.
- Test the migration path locally before shipping.

---

## Service Layer

All database access goes through `src/services/db.ts`. The module lazily opens a single connection and runs migrations on the first call to `getDb()`.

### Functions

#### `saveAnswer(sessionId, questionId, value)`
Upserts a single answer for the live session.
```typescript
await saveAnswer('default-session', '1a', 7);
```

#### `loadAnswers(sessionId) → Record<string, number>`
Returns all answers for a session, keyed by question ID.
```typescript
const answers = await loadAnswers('default-session');
// { '1a': 7, '1b': 5, ... }
```

#### `updateLastActive(sessionId)`
Writes the current Unix timestamp to `settings` as the session heartbeat.

#### `getLastActive(sessionId) → string | null`
Returns the last-active timestamp string, or `null` if never set.

#### `clearSession(sessionId)`
Deletes all `questionnaire_responses` rows and the `last_active_<sessionId>` settings key for the given session.

#### `saveHistoricalSession(totalScore, answers, durationSeconds?, notes?) → string`
Inserts a row into `historical_sessions` and all answer rows into `historical_responses` in a transaction. Returns the new session UUID.

#### `loadHistoricalSessions() → SessionSummary[]`
Returns all completed sessions ordered by `completed_at DESC`.

#### `loadSessionResponses(sessionId) → DetailedResponse[]`
Returns all question-level answers for one historical session.

#### `loadCategoryTrend(category) → CategoryTrendPoint[]`
Returns `(completed_at, answer_value)` pairs for a specific category, ordered by date ascending.

---

## Query Examples

**Most recent session score:**
```sql
SELECT total_score, completed_at
FROM historical_sessions
ORDER BY completed_at DESC
LIMIT 1;
```

**Average score per category across all sessions:**
```sql
SELECT r.category, AVG(r.answer_value) AS avg_rating
FROM historical_responses r
GROUP BY r.category
ORDER BY avg_rating DESC;
```

**Category trend over the last 30 days:**
```sql
SELECT s.completed_at, r.answer_value
FROM historical_responses r
JOIN historical_sessions s ON r.session_id = s.id
WHERE r.category = 'Make a Decision'
  AND s.completed_at >= datetime('now', '-30 days')
ORDER BY s.completed_at ASC;
```

**Session count and score range:**
```sql
SELECT COUNT(*) AS sessions,
       MIN(total_score) AS min_score,
       MAX(total_score) AS max_score,
       AVG(total_score) AS avg_score
FROM historical_sessions;
```
