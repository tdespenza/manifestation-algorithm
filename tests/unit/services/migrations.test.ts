import { describe, it, expect, vi, beforeEach } from 'vitest';
import { runMigrations } from '@/services/migrations';
// We don't import the real class to safeguard against runtime errors, just use type
import type Database from '@tauri-apps/plugin-sql';

// Mock DB interface
const mockDb = {
  execute: vi.fn(),
  select: vi.fn()
} as unknown as Database;

describe('Database Migrations', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (mockDb.execute as any).mockResolvedValue([]);
    (mockDb.select as any).mockResolvedValue([]);
  });

  it('should create migrations table and run pending migrations', async () => {
    // Mock select returning empty array (no migrations applied)
    (mockDb.select as any).mockResolvedValue([]);

    await runMigrations(mockDb);

    // 1. Should create _migrations table
    expect(mockDb.execute).toHaveBeenCalledWith(
      expect.stringContaining('CREATE TABLE IF NOT EXISTS _migrations')
    );

    // 2. Should query for applied migrations
    expect(mockDb.select).toHaveBeenCalledWith('SELECT id FROM _migrations');

    // 3. Should run migration 1 (initial schema) creation
    // Check for one of the tables
    expect(mockDb.execute).toHaveBeenCalledWith(
      expect.stringContaining('CREATE TABLE IF NOT EXISTS stats')
    );
    expect(mockDb.execute).toHaveBeenCalledWith(
      expect.stringContaining('CREATE TABLE IF NOT EXISTS questionnaire_responses')
    );
    expect(mockDb.execute).toHaveBeenCalledWith(
      expect.stringContaining('CREATE TABLE IF NOT EXISTS settings')
    );

    // 4. Should record migration 1
    expect(mockDb.execute).toHaveBeenCalledWith(
      'INSERT INTO _migrations (id, name) VALUES ($1, $2)',
      [1, 'initial_schema']
    );

    // 5. Should run migration 2 schema/index SQL
    expect(mockDb.execute).toHaveBeenCalledWith(
      expect.stringContaining('CREATE TABLE IF NOT EXISTS historical_sessions')
    );
    expect(mockDb.execute).toHaveBeenCalledWith(
      expect.stringContaining('CREATE TABLE IF NOT EXISTS historical_responses')
    );
    expect(mockDb.execute).toHaveBeenCalledWith(
      'CREATE INDEX IF NOT EXISTS idx_sessions_completed ON historical_sessions(completed_at);'
    );
    expect(mockDb.execute).toHaveBeenCalledWith(
      'CREATE INDEX IF NOT EXISTS idx_responses_qid ON historical_responses(question_id);'
    );

    // 6. Should run migration 3 index SQL
    expect(mockDb.execute).toHaveBeenCalledWith(
      'CREATE INDEX IF NOT EXISTS idx_responses_session_id ON historical_responses(session_id);'
    );
    expect(mockDb.execute).toHaveBeenCalledWith(
      'CREATE INDEX IF NOT EXISTS idx_responses_category ON historical_responses(category);'
    );

    // 7. Should record all migration IDs/names
    expect(mockDb.execute).toHaveBeenCalledWith(
      'INSERT INTO _migrations (id, name) VALUES ($1, $2)',
      [2, 'historical_schema']
    );
    expect(mockDb.execute).toHaveBeenCalledWith(
      'INSERT INTO _migrations (id, name) VALUES ($1, $2)',
      [3, 'optimized_indexes']
    );
  });

  it('logs applying and success messages for each pending migration', async () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    (mockDb.select as any).mockResolvedValue([]);

    await runMigrations(mockDb);

    expect(warnSpy).toHaveBeenCalledWith('Applying migration 1: initial_schema');
    expect(warnSpy).toHaveBeenCalledWith('Applying migration 2: historical_schema');
    expect(warnSpy).toHaveBeenCalledWith('Applying migration 3: optimized_indexes');

    expect(warnSpy).toHaveBeenCalledWith('Migration 1 applied successfully.');
    expect(warnSpy).toHaveBeenCalledWith('Migration 2 applied successfully.');
    expect(warnSpy).toHaveBeenCalledWith('Migration 3 applied successfully.');
    warnSpy.mockRestore();
  });

  it('should skip already applied migrations', async () => {
    // Mock select returning ALL 3 migrations applied
    (mockDb.select as any).mockResolvedValue([{ id: 1 }, { id: 2 }, { id: 3 }]);

    await runMigrations(mockDb);

    // Should create _migrations table (always checked)
    expect(mockDb.execute).toHaveBeenCalledWith(
      expect.stringContaining('CREATE TABLE IF NOT EXISTS _migrations')
    );

    // Should NOT run migration 1 logic — stats table NOT created
    const calls = (mockDb.execute as any).mock.calls;
    const createStatsCall = calls.find((call: any[]) =>
      call[0].includes('CREATE TABLE IF NOT EXISTS stats')
    );
    expect(createStatsCall).toBeUndefined();

    // Should NOT insert ANY migration record for already-applied ones
    const insertCall = calls.find((call: any[]) => call[0].includes('INSERT INTO _migrations'));
    expect(insertCall).toBeUndefined();
  });

  it('should throw and stop when a migration fails', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    // No migrations applied yet
    (mockDb.select as any).mockResolvedValue([]);
    // Make execute throw on the first CREATE TABLE call (migration 1 body)
    (mockDb.execute as any).mockImplementation((sql: string) => {
      if (sql.includes('CREATE TABLE IF NOT EXISTS stats')) {
        throw new Error('Migration 1 failed');
      }
      return Promise.resolve([]);
    });

    await expect(runMigrations(mockDb)).rejects.toThrow('Migration 1 failed');
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('Failed to apply migration 1'),
      expect.any(Error)
    );
    consoleSpy.mockRestore();
  });
});
