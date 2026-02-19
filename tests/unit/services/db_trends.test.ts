import { describe, it, expect, vi, beforeEach } from 'vitest';

const mocks = vi.hoisted(() => {
  const execute = vi.fn().mockResolvedValue([]);
  const select = vi.fn().mockResolvedValue([]);
  const load = vi.fn().mockResolvedValue({ execute, select });
  return { load, execute, select };
});

vi.mock('@tauri-apps/plugin-sql', () => ({
  default: { load: mocks.load },
}));

import { loadConsolidatedCategoryTrends } from '@/services/db_trends';

describe('db_trends service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.execute.mockResolvedValue([]);
    mocks.select.mockResolvedValue([]);
  });

  it('returns empty object when no historical data exists', async () => {
    // First call: migrations table setup, then select returns []
    mocks.select.mockResolvedValue([]);
    const result = await loadConsolidatedCategoryTrends();
    expect(result).toEqual({});
  });

  it('groups rows by category and returns TrendPoint arrays', async () => {
    mocks.select.mockImplementation((query: string) => {
      // Migration meta query
      if (query.includes('_migrations')) return Promise.resolve([{ id: 1 }, { id: 2 }, { id: 3 }]);
      // Main aggregation query
      return Promise.resolve([
        { date: '2024-01-01T00:00:00.000Z', category: 'Health', score: 7.5 },
        { date: '2024-01-02T00:00:00.000Z', category: 'Health', score: 8.0 },
        { date: '2024-01-01T00:00:00.000Z', category: 'Wealth', score: 5.25 },
      ]);
    });

    const result = await loadConsolidatedCategoryTrends();

    expect(Object.keys(result).sort()).toEqual(['Health', 'Wealth']);
    expect(result['Health']).toHaveLength(2);
    expect(result['Health'][0]).toEqual({ date: '2024-01-01T00:00:00.000Z', value: 7.5 });
    expect(result['Health'][1]).toEqual({ date: '2024-01-02T00:00:00.000Z', value: 8 });
    expect(result['Wealth'][0]).toEqual({ date: '2024-01-01T00:00:00.000Z', value: 5.25 });
  });

  it('rounds values to 2 decimal places', async () => {
    mocks.select.mockImplementation((query: string) => {
      if (query.includes('_migrations')) return Promise.resolve([{ id: 1 }, { id: 2 }, { id: 3 }]);
      return Promise.resolve([
        { date: '2024-01-01T00:00:00.000Z', category: 'Focus', score: 7.555555 },
      ]);
    });

    const result = await loadConsolidatedCategoryTrends();
    expect(result['Focus'][0].value).toBe(7.56);
  });
});
