# Database Schema Expansion Plan (Phase 2)

## Goal
To support the visualization dashboard and detailed analytics, we need to transition from storing only the immediate session state to persisting historical records of completed sessions.

## Current Schema (v1)
- `stats`: Stores only `completion_date` and `total_score`.
- `questionnaire_responses`: Stores only the *current* active session (unique constraint on session_id + question_number).
- `settings`: Key-value store.

## Proposed Schema (v2)

### 1. `historical_sessions`
Tracks each completed questionnaire run.
```sql
CREATE TABLE historical_sessions (
  id TEXT PRIMARY KEY, -- UUID
  completed_at TIMESTAMP NOT NULL,
  total_score REAL NOT NULL,
  duration_seconds INTEGER, -- Time taken to complete
  notes TEXT -- Optional user reflection
);
```

### 2. `historical_responses`
 detailed breakdown of answers for historical analysis (e.g., "How has my 'Emotions' score trended?").
```sql
CREATE TABLE historical_responses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id TEXT NOT NULL,
  question_id TEXT NOT NULL, -- e.g. "1a", "2b"
  category TEXT NOT NULL,    -- e.g. "Core Vibration", "Physical Reality"
  answer_value INTEGER NOT NULL,
  FOREIGN KEY(session_id) REFERENCES historical_sessions(id) ON DELETE CASCADE
);
```

### 3. Indexes
- index on `historical_sessions(completed_at)` for fast date-range filtering.
- index on `historical_responses(question_id)` for trend analysis of specific questions.

## Migration Strategy
1. create new tables via migration 2.
2. Update `saveCompletion` logic to:
   - Generate a UUID.
   - Insert into `historical_sessions`.
   - Copy current `questionnaire_responses` into `historical_responses` linked to that UUID.
   - Clear the active `questionnaire_responses` (start fresh) or keep as "latest".
