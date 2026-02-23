import Database from '@tauri-apps/plugin-sql';
import { runMigrations } from './migrations';
import { v4 as uuidv4 } from 'uuid';
import { questions } from '../data/questions';
import type { Question } from '../types';

// ─── Connection-pooling rationale ──────────────────────────────────────────
//
// **Short answer: pooling is already handled lower in the stack; we must NOT
// add another pool here.**
//
// `@tauri-apps/plugin-sql` is backed by sqlx (Rust).  sqlx opens a
// `SqlitePool` with a configurable max_connections (default 5 in the plugin).
// Every call that crosses the Tauri IPC bridge already acquires a connection
// from that pool and releases it when the query completes.
//
// Why adding JS-side pooling would be wrong for this app:
//
//  1. SQLite is an *embedded* file database — there is no network round-trip
//     to amortise.  Connection "setup" costs ~microseconds, not milliseconds.
//
//  2. This is a **single-user desktop app**.  There is exactly one JS
//     execution context (one Vue app), so there are no competing callers that
//     would benefit from holding multiple warm connections.
//
//  3. All DB calls from the frontend are already serialised through Tauri's
//     async IPC channel.  A JS-side pool would queue callers in JS *before*
//     they even reach the Rust layer where the real pool lives.
//
//  4. WAL journal mode (set below) eliminates most write-contention between
//     the JS frontend and the Rust network layer; `busy_timeout` covers the
//     rare case where a write briefly blocks a read.
//
// The correct pattern here is the module-level singleton `db` below: open
// once, reuse forever, let sqlx manage the underlying Rust-side pool.
// ───────────────────────────────────────────────────────────────────────────

let db: Database | null = null;

export async function getDb(): Promise<Database> {
  if (!db) {
    // 'sqlite:manifestation.db' resolves to the OS app-data directory managed
    // by Tauri (e.g. ~/Library/Application Support/com.manifestation.algorithm.app/).
    db = await Database.load('sqlite:manifestation.db');
    // WAL mode allows concurrent reads alongside writes and is far less prone to
    // SQLITE_BUSY (code 5) errors.  The busy_timeout gives the writer up to
    // 5 seconds to retry before surfacing an error, which covers any momentary
    // lock contention between the JS frontend and the Rust network layer.
    await db.execute('PRAGMA journal_mode=WAL', []);
    await db.execute('PRAGMA busy_timeout=5000', []);
    await runMigrations(db);
  }
  return db;
}

export async function clearSession(sessionId: string) {
  const db = await getDb();
  await db.execute('DELETE FROM questionnaire_responses WHERE session_id = $1', [sessionId]);
  await db.execute('DELETE FROM settings WHERE key = $1', [`last_active_${sessionId}`]);
}

/**
 * Save a single answer to the database.
 * Uses UPSERT behavior via INSERT OR REPLACE.
 */
export async function saveAnswer(sessionId: string, questionId: string, value: number) {
  const db = await getDb();
  // Using simplified query parameter syntax for tauri-plugin-sql
  await db.execute(
    'INSERT OR REPLACE INTO questionnaire_responses (session_id, question_number, answer_value) VALUES ($1, $2, $3)',
    [sessionId, questionId, value]
  );
}

/**
 * Load all answers for a specific session.
 */
export async function loadAnswers(sessionId: string): Promise<Record<string, number>> {
  const db = await getDb();
  const rows = await db.select<{ question_number: string; answer_value: number }[]>(
    'SELECT question_number, answer_value FROM questionnaire_responses WHERE session_id = $1',
    [sessionId]
  );

  const answers: Record<string, number> = {};
  rows.forEach(row => {
    answers[row.question_number] = row.answer_value;
  });

  return answers;
}

export async function updateLastActive(sessionId: string) {
  const db = await getDb();
  const now = Date.now().toString();
  await db.execute('INSERT OR REPLACE INTO settings (key, value) VALUES ($1, $2)', [
    `last_active_${sessionId}`,
    now
  ]);
}

export async function getLastActive(sessionId: string): Promise<string | null> {
  const db = await getDb();
  const rows = await db.select<{ value: string }[]>('SELECT value FROM settings WHERE key = $1', [
    `last_active_${sessionId}`
  ]);
  if (rows.length > 0) return rows[0].value;
  return null;
}

export async function getSetting(key: string): Promise<string | null> {
  const db = await getDb();
  const rows = await db.select<{ value: string }[]>('SELECT value FROM settings WHERE key = $1', [
    key
  ]);
  if (rows.length > 0) return rows[0].value;
  return null;
}

export async function setSetting(key: string, value: string): Promise<void> {
  const db = await getDb();
  await db.execute('INSERT OR REPLACE INTO settings (key, value) VALUES ($1, $2)', [key, value]);
}

function getCategory(
  questionId: string,
  qs: Question[] = questions,
  parentCategory: string = 'General'
): string {
  for (const q of qs) {
    if (q.id === questionId) return parentCategory === 'General' ? q.description : parentCategory;
    if (q.subPoints) {
      const found = getCategory(questionId, q.subPoints, q.description);
      if (found !== 'General') return found;
    }
  }
  return 'General';
}

/**
 * Save completion stats and full historical record.
 */
export async function saveHistoricalSession(
  totalScore: number,
  answers: Record<string, number>,
  durationSeconds: number = 0,
  notes?: string
): Promise<string> {
  const db = await getDb();
  const id = uuidv4();
  const completedAt = new Date().toISOString();

  // 1. Save session
  await db.execute(
    `INSERT INTO historical_sessions (id, completed_at, total_score, duration_seconds, notes) 
     VALUES ($1, $2, $3, $4, $5)`,
    [id, completedAt, totalScore, durationSeconds, notes || null]
  );

  // 2. Save responses – batch insert
  const entries = Object.entries(answers);
  if (entries.length > 0) {
    const values: string[] = [];
    const params: (string | number)[] = [];
    let paramIdx = 1;
    for (const [qId, val] of entries) {
      const category = getCategory(qId);
      values.push(`($${paramIdx++}, $${paramIdx++}, $${paramIdx++}, $${paramIdx++})`);
      params.push(id, qId, category, val);
    }
    const query = `INSERT INTO historical_responses (session_id, question_id, category, answer_value) VALUES ${values.join(', ')}`;
    await db.execute(query, params);
  }

  // Legacy support: also save to stats table if we want to keep it sync'd or just abandon it.
  // For now, let's keep stats table populated as a simple log, OR migrate away from it.
  // Given we are moving to v2, we can just use historical_sessions.

  return id;
}

export interface SessionSummary {
  id: string;
  completed_at: string;
  total_score: number;
  duration_seconds: number;
  notes?: string;
}

export async function loadHistoricalSessions(): Promise<SessionSummary[]> {
  const db = await getDb();
  return await db.select<SessionSummary[]>(
    'SELECT * FROM historical_sessions ORDER BY completed_at DESC'
  );
}

/** Load a paginated slice of historical sessions. */
export async function loadHistoricalSessionsPage(
  limit: number,
  offset: number
): Promise<SessionSummary[]> {
  const db = await getDb();
  return await db.select<SessionSummary[]>(
    'SELECT * FROM historical_sessions ORDER BY completed_at DESC LIMIT $1 OFFSET $2',
    [limit, offset]
  );
}

/** Return the total number of saved historical sessions. */
export async function countHistoricalSessions(): Promise<number> {
  const db = await getDb();
  const rows = await db.select<[{ total: number }]>(
    'SELECT COUNT(*) as total FROM historical_sessions'
  );
  return rows[0]?.total ?? 0;
}

export interface DetailedResponse {
  question_id: string;
  category: string;
  answer_value: number;
}

export async function loadSessionResponses(sessionId: string): Promise<DetailedResponse[]> {
  const db = await getDb();
  return await db.select<DetailedResponse[]>(
    'SELECT question_id, category, answer_value FROM historical_responses WHERE session_id = $1',
    [sessionId]
  );
}

export interface SessionCategoryScore {
  session_id: string;
  category: string;
  avg_score: number;
}

export async function loadAllSessionCategoryScores(): Promise<SessionCategoryScore[]> {
  const db = await getDb();
  return await db.select<SessionCategoryScore[]>(`
    SELECT session_id, category, ROUND(AVG(answer_value), 2) as avg_score
    FROM historical_responses
    GROUP BY session_id, category
    ORDER BY session_id
  `);
}

export interface CategoryTrendPoint {
  completed_at: string;
  answer_value: number;
}

export async function loadCategoryTrend(category: string): Promise<CategoryTrendPoint[]> {
  const db = await getDb();
  return await db.select<CategoryTrendPoint[]>(
    `SELECT s.completed_at, r.answer_value 
     FROM historical_responses r
     JOIN historical_sessions s ON r.session_id = s.id
     WHERE r.category = $1
     ORDER BY s.completed_at ASC`,
    [category]
  );
}

/**
 * Delete a single historical session and all its responses.
 */
export async function deleteSession(id: string): Promise<void> {
  const db = await getDb();
  // Delete responses first (explicit, avoids relying on SQLite FK pragma)
  await db.execute('DELETE FROM historical_responses WHERE session_id = $1', [id]);
  await db.execute('DELETE FROM historical_sessions WHERE id = $1', [id]);
}

/**
 * Delete multiple historical sessions and all their responses.
 */
export async function deleteSessions(ids: string[]): Promise<void> {
  if (ids.length === 0) return;
  const db = await getDb();
  const placeholders = ids.map((_, i) => `$${i + 1}`).join(', ');
  await db.execute(`DELETE FROM historical_responses WHERE session_id IN (${placeholders})`, ids);
  await db.execute(`DELETE FROM historical_sessions WHERE id IN (${placeholders})`, ids);
}
