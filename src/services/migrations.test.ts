import { describe, it, expect, vi, beforeEach } from 'vitest';
import { runMigrations } from './migrations';
// We don't import the real class to safeguard against runtime errors, just use type
import type Database from '@tauri-apps/plugin-sql';

// Mock DB interface
const mockDb = {
  execute: vi.fn(),
  select: vi.fn(),
} as unknown as Database;

describe('Database Migrations', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create migrations table and run pending migrations', async () => {
    // Mock select returning empty array (no migrations applied)
    (mockDb.select as any).mockResolvedValue([]);

    await runMigrations(mockDb);

    // 1. Should create _migrations table
    expect(mockDb.execute).toHaveBeenCalledWith(expect.stringContaining('CREATE TABLE IF NOT EXISTS _migrations'));

    // 2. Should query for applied migrations
    expect(mockDb.select).toHaveBeenCalledWith('SELECT id FROM _migrations');

    // 3. Should run migration 1 (initial schema) creation
    // Check for one of the tables
    expect(mockDb.execute).toHaveBeenCalledWith(expect.stringContaining('CREATE TABLE IF NOT EXISTS stats'));
    expect(mockDb.execute).toHaveBeenCalledWith(expect.stringContaining('CREATE TABLE IF NOT EXISTS questionnaire_responses'));

    // 4. Should record migration 1
    expect(mockDb.execute).toHaveBeenCalledWith(
        'INSERT INTO _migrations (id, name) VALUES ($1, $2)', 
        [1, 'initial_schema']
    );
  });

  it('should skip already applied migrations', async () => {
    // Mock select returning migration 1 applied
    (mockDb.select as any).mockResolvedValue([{ id: 1 }]);

    await runMigrations(mockDb);

    // Should create _migrations table (always checked)
    expect(mockDb.execute).toHaveBeenCalledWith(expect.stringContaining('CREATE TABLE IF NOT EXISTS _migrations'));

    // Should NOT run migration 1 logic
    // We check that specific create statement for stats is NOT called
    const calls = (mockDb.execute as any).mock.calls;
    const createStatsCall = calls.find((call: any[]) => call[0].includes('CREATE TABLE IF NOT EXISTS stats'));
    expect(createStatsCall).toBeUndefined();

    // Should NOT insert record again
    const insertCall = calls.find((call: any[]) => call[0].includes('INSERT INTO _migrations'));
    expect(insertCall).toBeUndefined();
  });
});
