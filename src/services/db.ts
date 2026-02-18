import Database from '@tauri-apps/plugin-sql';

let db: Database | null = null;

export async function getDb(): Promise<Database> {
  if (!db) {
    // Basic SQLite connection string. 
    // Usually 'sqlite:manifestation.db' creates the file in AppData directory managed by Tauri.
    db = await Database.load('sqlite:manifestation.db');
    await initTables(db);
  }
  return db;
}

async function initTables(db: Database) {
  // Stats table
  await db.execute(`
    CREATE TABLE IF NOT EXISTS stats (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      completion_date TEXT NOT NULL,
      total_score REAL NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Responses table
  // Note: Using updated_at to track latest change time is good practice but not strictly in PRD schema.
  await db.execute(`
    CREATE TABLE IF NOT EXISTS questionnaire_responses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      session_id TEXT NOT NULL,
      question_number TEXT NOT NULL,
      answer_value INTEGER NOT NULL,
      answered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(session_id, question_number)
    );
  `);

  // Settings table
  await db.execute(`
    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
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
