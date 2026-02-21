import { describe, it, expect, vi, beforeEach } from 'vitest';

// Use vi.hoisted to ensure mocks are available for vi.mock
const mocks = vi.hoisted(() => {
  const execute = vi.fn().mockResolvedValue([]);
  const select = vi.fn().mockResolvedValue([]);
  const load = vi.fn().mockResolvedValue({
    execute,
    select
  });
  return { load, execute, select };
});

vi.mock('@tauri-apps/plugin-sql', () => ({
  default: {
    load: mocks.load // Use hoisted value
  }
}));

// Import subject AFTER mocking
import * as dbService from '@/services/db';

describe('Database Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset mocks default behavior if needed
    mocks.execute.mockResolvedValue([]);
    mocks.select.mockResolvedValue([]);
  });

  it('initTables should run migrations on first connect', async () => {
    await dbService.getDb();
    // WAL mode and busy_timeout are set before migrations to prevent SQLITE_BUSY
    expect(mocks.execute).toHaveBeenCalledWith('PRAGMA journal_mode=WAL', []);
    expect(mocks.execute).toHaveBeenCalledWith('PRAGMA busy_timeout=5000', []);
    // Expect execute to be called for CREATE TABLE
    expect(mocks.execute).toHaveBeenCalledWith(
      expect.stringContaining('CREATE TABLE IF NOT EXISTS stats')
    );
    expect(mocks.execute).toHaveBeenCalledWith(
      expect.stringContaining('CREATE TABLE IF NOT EXISTS questionnaire_responses')
    );
  });

  it('saveAnswer should execute insert query', async () => {
    await dbService.saveAnswer('session1', 'q1', 5);
    // It should call execute with params
    expect(mocks.execute).toHaveBeenCalledWith(expect.stringContaining('INSERT OR REPLACE'), [
      'session1',
      'q1',
      5
    ]);
  });

  it('loadAnswers should execute select query and return map', async () => {
    mocks.select.mockResolvedValueOnce([
      { question_number: 'q1', answer_value: 5 },
      { question_number: 'q2', answer_value: 8 }
    ]);

    const result = await dbService.loadAnswers('session1');

    expect(mocks.select).toHaveBeenCalledWith(expect.stringContaining('SELECT question_number'), [
      'session1'
    ]);

    expect(result).toEqual({
      q1: 5,
      q2: 8
    });
  });

  it('clearSession deletes responses and settings entries', async () => {
    await dbService.clearSession('sess-1');
    expect(mocks.execute).toHaveBeenCalledWith(
      expect.stringContaining('DELETE FROM questionnaire_responses'),
      ['sess-1']
    );
    expect(mocks.execute).toHaveBeenCalledWith(expect.stringContaining('DELETE FROM settings'), [
      'last_active_sess-1'
    ]);
  });

  it('updateLastActive inserts current timestamp into settings', async () => {
    await dbService.updateLastActive('sess-2');
    expect(mocks.execute).toHaveBeenCalledWith(
      expect.stringContaining('INSERT OR REPLACE INTO settings'),
      expect.arrayContaining(['last_active_sess-2'])
    );
  });

  it('getLastActive returns null when no row found', async () => {
    mocks.select.mockResolvedValueOnce([]);
    const result = await dbService.getLastActive('sess-3');
    expect(result).toBeNull();
  });

  it('getLastActive returns the value when row exists', async () => {
    mocks.select.mockResolvedValueOnce([{ value: '1700000000000' }]);
    const result = await dbService.getLastActive('sess-4');
    expect(result).toBe('1700000000000');
  });

  it('saveHistoricalSession inserts session and per-question responses', async () => {
    const answers: Record<string, number> = { '1a': 8, '1b': 6 };
    const id = await dbService.saveHistoricalSession(4800, answers, 90, 'test note');

    // Should have inserted the session row
    expect(mocks.execute).toHaveBeenCalledWith(
      expect.stringContaining('INSERT INTO historical_sessions'),
      expect.arrayContaining([4800, 90, 'test note'])
    );

    // Should have inserted a response row for each answer
    expect(mocks.execute).toHaveBeenCalledWith(
      expect.stringContaining('INSERT INTO historical_responses'),
      expect.arrayContaining(['1a', 8])
    );
    expect(mocks.execute).toHaveBeenCalledWith(
      expect.stringContaining('INSERT INTO historical_responses'),
      expect.arrayContaining(['1b', 6])
    );

    expect(typeof id).toBe('string');
    expect(id.length).toBeGreaterThan(0);
  });

  it('saveHistoricalSession handles missing notes (null)', async () => {
    const answers: Record<string, number> = { '2a': 5 };
    await dbService.saveHistoricalSession(3000, answers);
    expect(mocks.execute).toHaveBeenCalledWith(
      expect.stringContaining('INSERT INTO historical_sessions'),
      expect.arrayContaining([null])
    );
  });

  it('saveHistoricalSession with empty answers skips response INSERT', async () => {
    const callsBefore = mocks.execute.mock.calls.length;
    await dbService.saveHistoricalSession(0, {});
    // Only the session INSERT should fire; no historical_responses INSERT
    const newCalls = mocks.execute.mock.calls.slice(callsBefore);
    expect(newCalls.some(c => String(c[0]).includes('INSERT INTO historical_responses'))).toBe(
      false
    );
    expect(newCalls.some(c => String(c[0]).includes('INSERT INTO historical_sessions'))).toBe(true);
  });

  it('saveHistoricalSession with top-level question ID (getCategory top-level branch)', async () => {
    // Question '2' is a top-level question with no sub-points
    const answers: Record<string, number> = { '2': 7 };
    const id = await dbService.saveHistoricalSession(700, answers, 60);
    expect(typeof id).toBe('string');
    expect(mocks.execute).toHaveBeenCalledWith(
      expect.stringContaining('INSERT INTO historical_responses'),
      expect.arrayContaining(['2', 7])
    );
  });

  it('loadHistoricalSessions executes select and returns rows', async () => {
    const rows = [
      {
        id: 's1',
        completed_at: '2024-01-01T00:00:00.000Z',
        total_score: 5000,
        duration_seconds: 120
      }
    ];
    mocks.select.mockResolvedValueOnce(rows);

    const result = await dbService.loadHistoricalSessions();

    expect(mocks.select).toHaveBeenCalledWith(
      expect.stringContaining('SELECT * FROM historical_sessions')
    );
    expect(result).toEqual(rows);
  });

  it('loadSessionResponses executes select with sessionId', async () => {
    const rows = [{ question_id: 'q1', category: 'Health', answer_value: 7 }];
    mocks.select.mockResolvedValueOnce(rows);

    const result = await dbService.loadSessionResponses('sess-5');

    expect(mocks.select).toHaveBeenCalledWith(expect.stringContaining('SELECT question_id'), [
      'sess-5'
    ]);
    expect(result).toEqual(rows);
  });

  it('loadCategoryTrend executes correct JOIN query', async () => {
    const rows = [{ completed_at: '2024-01-01', answer_value: 7.5 }];
    mocks.select.mockResolvedValueOnce(rows);

    const result = await dbService.loadCategoryTrend('Health');

    expect(mocks.select).toHaveBeenCalledWith(
      expect.stringContaining('FROM historical_responses'),
      ['Health']
    );
    expect(result).toEqual(rows);
  });

  it('saveHistoricalSession rethrows on INSERT failure', async () => {
    // Session INSERT succeeds, then response INSERT fails.
    // No BEGIN/COMMIT/ROLLBACK — those were removed because tauri-plugin-sql's
    // connection pool dispatches execute() calls across connections, making
    // manual transaction statements unreliable (SQLITE_BUSY, code 5).
    mocks.execute
      .mockResolvedValueOnce([]) // INSERT INTO historical_sessions
      .mockRejectedValueOnce(new Error('Insert failed')); // INSERT INTO historical_responses

    await expect(dbService.saveHistoricalSession(1000, { '1a': 5 })).rejects.toThrow(
      'Insert failed'
    );

    expect(mocks.execute).not.toHaveBeenCalledWith('ROLLBACK', []);
  });

  it('deleteSession deletes responses then session row', async () => {
    await dbService.deleteSession('sess-del');
    expect(mocks.execute).toHaveBeenCalledWith(
      expect.stringContaining('DELETE FROM historical_responses'),
      ['sess-del']
    );
    expect(mocks.execute).toHaveBeenCalledWith(
      expect.stringContaining('DELETE FROM historical_sessions'),
      ['sess-del']
    );
  });

  it('deleteSessions deletes responses and sessions for all ids', async () => {
    await dbService.deleteSessions(['s1', 's2']);
    expect(mocks.execute).toHaveBeenCalledWith(
      expect.stringContaining('DELETE FROM historical_responses'),
      ['s1', 's2']
    );
    expect(mocks.execute).toHaveBeenCalledWith(
      expect.stringContaining('DELETE FROM historical_sessions'),
      ['s1', 's2']
    );
  });

  it('deleteSessions does nothing when given an empty array', async () => {
    const callsBefore = mocks.execute.mock.calls.length;
    await dbService.deleteSessions([]);
    expect(mocks.execute.mock.calls.length).toBe(callsBefore);
  });
});
