import Database from '@tauri-apps/plugin-sql';
import { runMigrations } from './migrations';

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
  const rows = await db.select<{question_number: string, answer_value: number}[]>(
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
  await db.execute(
    'INSERT OR REPLACE INTO settings (key, value) VALUES ($1, $2)',
    [`last_active_${sessionId}`, now]
  );
}

export async function getLastActive(sessionId: string): Promise<string | null> {
  const db = await getDb();
  const rows = await db.select<{value: string}[]>(
    'SELECT value FROM settings WHERE key = $1',
    [`last_active_${sessionId}`]
  );
  if (rows.length > 0) return rows[0].value;
  return null;
}

/**
 * Save completion stats.
 */
export async function saveCompletion(totalScore: number) {
  const db = await getDb();
  const date = new Date().toISOString();
  await db.execute(
    'INSERT INTO stats (completion_date, total_score) VALUES ($1, $2)',
    [date, totalScore]
  );
}
