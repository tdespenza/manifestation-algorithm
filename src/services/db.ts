import Database from '@tauri-apps/plugin-sql';
import { runMigrations } from './migrations';
import { v4 as uuidv4 } from 'uuid';
import { questions } from '../data/questions';

let db: Database | null = null;

export async function getDb(): Promise<Database> {
  if (!db) {
    // Basic SQLite connection string.
    // Usually 'sqlite:manifestation.db' creates the file in AppData directory managed by Tauri.
    db = await Database.load('sqlite:manifestation.db');
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

function getCategory(questionId: string): string {
  // Check top level
  const top = questions.find(q => q.id === questionId);
  if (top) return top.description; // Self is category if top-level has no subs? Actually let's just use description as category name.

  // Check sub points
  for (const q of questions) {
    if (q.subPoints) {
      const sub = q.subPoints.find(s => s.id === questionId);
      if (sub) return q.description; // Return parent description as category
    }
  }
  // Fallback for independent top-level questions that might be their own category
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

  // 2. Save responses
  for (const [qId, val] of Object.entries(answers)) {
    const category = getCategory(qId);
    await db.execute(
      `INSERT INTO historical_responses (session_id, question_id, category, answer_value) 
       VALUES ($1, $2, $3, $4)`,
      [id, qId, category, val]
    );
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
 * @deprecated Use saveHistoricalSession instead
 */
export async function saveCompletion(totalScore: number) {
  const db = await getDb();
  const date = new Date().toISOString();
  await db.execute('INSERT INTO stats (completion_date, total_score) VALUES ($1, $2)', [
    date,
    totalScore
  ]);
}
