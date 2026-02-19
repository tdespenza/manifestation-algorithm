import type Database from '@tauri-apps/plugin-sql';

interface Migration {
  id: number;
  name: string;
  up: (db: Database) => Promise<void>;
}

const migrations: Migration[] = [
  {
    id: 1,
    name: 'initial_schema',
    up: async (db: Database) => {
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
  },
  {
    id: 2,
    name: 'historical_schema',
    up: async (db: Database) => {
      // Historical Sessions
      await db.execute(`
        CREATE TABLE IF NOT EXISTS historical_sessions (
          id TEXT PRIMARY KEY,
          completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          total_score REAL NOT NULL,
          duration_seconds INTEGER,
          notes TEXT
        );
      `);

      // Historical Responses
      await db.execute(`
        CREATE TABLE IF NOT EXISTS historical_responses (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          session_id TEXT NOT NULL,
          question_id TEXT NOT NULL,
          category TEXT NOT NULL,
          answer_value INTEGER NOT NULL,
          FOREIGN KEY(session_id) REFERENCES historical_sessions(id) ON DELETE CASCADE
        );
      `);

      // Indexes
      await db.execute(
        'CREATE INDEX IF NOT EXISTS idx_sessions_completed ON historical_sessions(completed_at);'
      );
      await db.execute(
        'CREATE INDEX IF NOT EXISTS idx_responses_qid ON historical_responses(question_id);'
      );
    }
  },
  {
    id: 3,
    name: 'optimized_indexes',
    up: async (db: Database) => {
      // Additional indexes for trends calculation
      await db.execute(
        'CREATE INDEX IF NOT EXISTS idx_responses_session_id ON historical_responses(session_id);'
      );
      await db.execute(
        'CREATE INDEX IF NOT EXISTS idx_responses_category ON historical_responses(category);'
      );
    }
  }
];

export async function runMigrations(db: Database) {
  // Ensure migrations table exists
  await db.execute(`
    CREATE TABLE IF NOT EXISTS _migrations (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Get applied migrations
  const applied = await db.select<{ id: number }[]>('SELECT id FROM _migrations');
  const appliedIds = new Set(applied.map(m => m.id));

  // Run pending migrations
  for (const migration of migrations) {
    if (!appliedIds.has(migration.id)) {
      console.warn(`Applying migration ${migration.id}: ${migration.name}`);
      try {
        await migration.up(db);
        await db.execute('INSERT INTO _migrations (id, name) VALUES ($1, $2)', [
          migration.id,
          migration.name
        ]);
        console.warn(`Migration ${migration.id} applied successfully.`);
      } catch (e) {
        console.error(`Failed to apply migration ${migration.id}:`, e);
        throw e; // Stop migration process on failure
      }
    }
  }
}
