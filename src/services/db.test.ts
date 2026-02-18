import { describe, it, expect, vi, beforeEach } from 'vitest';

// Use vi.hoisted to ensure mocks are available for vi.mock
const mocks = vi.hoisted(() => {
  const execute = vi.fn().mockResolvedValue([]);
  const select = vi.fn().mockResolvedValue([]);
  const load = vi.fn().mockResolvedValue({
    execute,
    select,
  });
  return { load, execute, select };
});

vi.mock('@tauri-apps/plugin-sql', () => ({
  default: {
    load: mocks.load, // Use hoisted value
  },
}));

// Import subject AFTER mocking
import * as dbService from './db';

describe('Database Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset mocks default behavior if needed
    mocks.execute.mockResolvedValue([]);
    mocks.select.mockResolvedValue([]);
  });

  it('initTables should run migrations on first connect', async () => {
    await dbService.getDb();
    // Expect execute to be called for CREATE TABLE
    expect(mocks.execute).toHaveBeenCalledWith(expect.stringContaining('CREATE TABLE IF NOT EXISTS stats'));
    expect(mocks.execute).toHaveBeenCalledWith(expect.stringContaining('CREATE TABLE IF NOT EXISTS questionnaire_responses'));
  });

  it('saveAnswer should execute insert query', async () => {
    await dbService.saveAnswer('session1', 'q1', 5);
    // It should call execute with params
    expect(mocks.execute).toHaveBeenCalledWith(
      expect.stringContaining('INSERT OR REPLACE'),
      ['session1', 'q1', 5]
    );
  });

  it('loadAnswers should execute select query and return map', async () => {
    mocks.select.mockResolvedValueOnce([
      { question_number: 'q1', answer_value: 5 },
      { question_number: 'q2', answer_value: 8 },
    ]);

    const result = await dbService.loadAnswers('session1');
    
    expect(mocks.select).toHaveBeenCalledWith(
        expect.stringContaining('SELECT question_number'),
        ['session1']
    );
    
    expect(result).toEqual({
      'q1': 5,
      'q2': 8
    });
  });
  
  it('saveCompletion should save stats', async () => {
    await dbService.saveCompletion(5000);
    // expect.arrayContaining doesn't work well directly on args list for partial match
    // Check second argument array
     expect(mocks.execute).toHaveBeenCalledWith(
      expect.stringContaining('INSERT INTO stats'),
      expect.arrayContaining([5000])
    );
  });
});
