import Database from '@tauri-apps/plugin-sql';
import { runMigrations } from './migrations';
import { v4 as uuidv4 } from 'uuid';
import { questions } from '../data/questions';
import type { Question } from '../types';

let db: Database | null = null;

export async function getDb(): Promise<Database> {
  if (!db) {
    // Basic SQLite connection string.
    // Usually 'sqlite:manifestation.db' creates the file in AppData directory managed by Tauri.
    db = await Database.load('sqlite:manifestation.db');
    // WAL mode allows concurrent reads alongside writes and is far less prone to
    // SQLITE_BUSY (code 5) errors.  The busy_timeout gives the writer up to
    // 5 seconds to retry before surfacing an error, which covers any momentary
    // lock from another pool connection or in-flight query.
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
    const params: any[] = [];
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
