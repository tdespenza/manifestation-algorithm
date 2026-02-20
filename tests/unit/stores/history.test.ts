import { describe, it, expect, vi, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useHistoryStore } from '@/stores/history';

// Mock db service
const dbMocks = vi.hoisted(() => ({
  loadHistoricalSessions: vi.fn().mockResolvedValue([]),
  deleteSession: vi.fn().mockResolvedValue(undefined),
  deleteSessions: vi.fn().mockResolvedValue(undefined)
}));

vi.mock('@/services/db', () => ({
  loadHistoricalSessions: dbMocks.loadHistoricalSessions,
  deleteSession: dbMocks.deleteSession,
  deleteSessions: dbMocks.deleteSessions
}));

// Mock db_trends service
const trendsMocks = vi.hoisted(() => ({
  loadConsolidatedCategoryTrends: vi.fn().mockResolvedValue({})
}));

vi.mock('@/services/db_trends', () => ({
  loadConsolidatedCategoryTrends: trendsMocks.loadConsolidatedCategoryTrends
}));

describe('History Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
    dbMocks.loadHistoricalSessions.mockResolvedValue([]);
    dbMocks.deleteSession.mockResolvedValue(undefined);
    dbMocks.deleteSessions.mockResolvedValue(undefined);
    trendsMocks.loadConsolidatedCategoryTrends.mockResolvedValue({});
  });

  it('has correct initial state', () => {
    const store = useHistoryStore();
    expect(store.sessions).toEqual([]);
    expect(store.trends).toEqual({});
    expect(store.isLoading).toBe(false);
    expect(store.error).toBeNull();
  });

  it('fetchHistory sets isLoading true during fetch and false after', async () => {
    const store = useHistoryStore();

    // Intercept loading state changes by watching the value during execution
    let resolveLoad!: (v: unknown) => void;
    dbMocks.loadHistoricalSessions.mockReturnValue(
      new Promise(r => {
        resolveLoad = r;
      })
    );

    const fetchPromise = store.fetchHistory();
    expect(store.isLoading).toBe(true);

    resolveLoad([]);
    await fetchPromise;
    expect(store.isLoading).toBe(false);
  });

  it('fetchHistory populates sessions and trends on success', async () => {
    const fakeSessions = [
      { id: 's1', completed_at: '2024-01-01', total_score: 5000, duration_seconds: 120 }
    ];
    const fakeTrends = {
      Health: [{ date: '2024-01-01', value: 7.5 }]
    };

    dbMocks.loadHistoricalSessions.mockResolvedValue(fakeSessions);
    trendsMocks.loadConsolidatedCategoryTrends.mockResolvedValue(fakeTrends);

    const store = useHistoryStore();
    await store.fetchHistory();

    expect(store.sessions).toEqual(fakeSessions);
    expect(store.trends).toEqual(fakeTrends);
    expect(store.error).toBeNull();
  });

  it('fetchHistory sets error and clears isLoading on failure', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    dbMocks.loadHistoricalSessions.mockRejectedValue(new Error('DB read error'));

    const store = useHistoryStore();
    await store.fetchHistory();

    expect(store.error).toContain('DB read error');
    expect(store.isLoading).toBe(false);
    consoleSpy.mockRestore();
  });

  it('fetchHistory clears previous error on new call', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    dbMocks.loadHistoricalSessions.mockRejectedValueOnce(new Error('first fail'));
    const store = useHistoryStore();
    await store.fetchHistory();
    expect(store.error).toBeTruthy();

    dbMocks.loadHistoricalSessions.mockResolvedValue([]);
    await store.fetchHistory();
    expect(store.error).toBeNull();
    consoleSpy.mockRestore();
  });

  it('deleteSession calls db.deleteSession and refetches history', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const fakeSessions = [
      { id: 's1', completed_at: '2024-01-01', total_score: 4000, duration_seconds: 60 }
    ];
    dbMocks.loadHistoricalSessions.mockResolvedValue(fakeSessions);

    const store = useHistoryStore();
    await store.deleteSession('s1');

    expect(dbMocks.deleteSession).toHaveBeenCalledWith('s1');
    expect(store.sessions).toEqual(fakeSessions); // refetched
    consoleSpy.mockRestore();
  });

  it('deleteSession sets error on failure', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    dbMocks.deleteSession.mockRejectedValueOnce(new Error('DB delete error'));

    const store = useHistoryStore();
    await store.deleteSession('bad-id');

    expect(store.error).toContain('DB delete error');
    consoleSpy.mockRestore();
  });

  it('deleteSessions calls db.deleteSessions with all ids and refetches', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    dbMocks.loadHistoricalSessions.mockResolvedValue([]);

    const store = useHistoryStore();
    await store.deleteSessions(['s1', 's2']);

    expect(dbMocks.deleteSessions).toHaveBeenCalledWith(['s1', 's2']);
    consoleSpy.mockRestore();
  });

  it('deleteSessions does nothing when given empty array', async () => {
    const store = useHistoryStore();
    await store.deleteSessions([]);
    expect(dbMocks.deleteSessions).not.toHaveBeenCalled();
  });

  it('deleteSessions sets error on failure', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    dbMocks.deleteSessions.mockRejectedValueOnce(new Error('bulk delete error'));
    const store = useHistoryStore();
    await store.deleteSessions(['s1', 's2']);
    expect(store.error).toContain('bulk delete error');
    consoleSpy.mockRestore();
  });
});
