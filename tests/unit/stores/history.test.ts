import { describe, it, expect, vi, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useHistoryStore } from '@/stores/history';

// Mock db service
const dbMocks = vi.hoisted(() => ({
  loadHistoricalSessions: vi.fn().mockResolvedValue([]),
  loadHistoricalSessionsPage: vi.fn().mockResolvedValue([]),
  countHistoricalSessions: vi.fn().mockResolvedValue(0),
  deleteSession: vi.fn().mockResolvedValue(undefined),
  deleteSessions: vi.fn().mockResolvedValue(undefined)
}));

vi.mock('@/services/db', () => ({
  loadHistoricalSessions: dbMocks.loadHistoricalSessions,
  loadHistoricalSessionsPage: dbMocks.loadHistoricalSessionsPage,
  countHistoricalSessions: dbMocks.countHistoricalSessions,
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
    dbMocks.loadHistoricalSessionsPage.mockResolvedValue([]);
    dbMocks.countHistoricalSessions.mockResolvedValue(0);
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
    dbMocks.loadHistoricalSessionsPage.mockReturnValue(
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

    dbMocks.loadHistoricalSessionsPage.mockResolvedValue(fakeSessions);
    dbMocks.countHistoricalSessions.mockResolvedValue(fakeSessions.length);
    trendsMocks.loadConsolidatedCategoryTrends.mockResolvedValue(fakeTrends);

    const store = useHistoryStore();
    await store.fetchHistory();

    expect(store.sessions).toEqual(fakeSessions);
    expect(store.trends).toEqual(fakeTrends);
    expect(store.error).toBeNull();
  });

  it('fetchHistory sets error and clears isLoading on failure', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    dbMocks.loadHistoricalSessionsPage.mockRejectedValue(new Error('DB read error'));

    const store = useHistoryStore();
    await store.fetchHistory();

    expect(store.error).toContain('DB read error');
    expect(store.isLoading).toBe(false);
    consoleSpy.mockRestore();
  });

  it('fetchHistory clears previous error on new call', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    dbMocks.loadHistoricalSessionsPage.mockRejectedValueOnce(new Error('first fail'));
    const store = useHistoryStore();
    await store.fetchHistory();
    expect(store.error).toBeTruthy();

    dbMocks.loadHistoricalSessionsPage.mockResolvedValue([]);
    dbMocks.countHistoricalSessions.mockResolvedValue(0);
    await store.fetchHistory();
    expect(store.error).toBeNull();
    consoleSpy.mockRestore();
  });

  it('fetchHistory exposes totalCount and hasMore', async () => {
    const fakeSessions = Array.from({ length: 20 }, (_, i) => ({
      id: `s${i}`,
      completed_at: '2024-01-01',
      total_score: 5000,
      duration_seconds: 60
    }));
    dbMocks.loadHistoricalSessionsPage.mockResolvedValue(fakeSessions);
    dbMocks.countHistoricalSessions.mockResolvedValue(45);

    const store = useHistoryStore();
    await store.fetchHistory();

    expect(store.totalCount).toBe(45);
    expect(store.hasMore).toBe(true); // 20 loaded < 45 total
  });

  it('loadMoreSessions appends the next page', async () => {
    const page1 = [
      { id: 'a', completed_at: '2024-01-01', total_score: 5000, duration_seconds: 60 }
    ];
    const page2 = [
      { id: 'b', completed_at: '2024-01-01', total_score: 4000, duration_seconds: 60 }
    ];
    dbMocks.loadHistoricalSessionsPage.mockResolvedValueOnce(page1).mockResolvedValueOnce(page2);
    dbMocks.countHistoricalSessions.mockResolvedValue(2);

    const store = useHistoryStore();
    await store.fetchHistory(); // loads page1
    expect(store.sessions).toHaveLength(1);

    await store.loadMoreSessions();
    expect(store.sessions).toHaveLength(2);
    expect(store.sessions[1].id).toBe('b');
  });

  it('loadMoreSessions is a no-op when hasMore is false', async () => {
    const page1 = [
      { id: 'a', completed_at: '2024-01-01', total_score: 5000, duration_seconds: 60 }
    ];
    dbMocks.loadHistoricalSessionsPage.mockResolvedValue(page1);
    dbMocks.countHistoricalSessions.mockResolvedValue(1); // exactly 1 session total

    const store = useHistoryStore();
    await store.fetchHistory();
    expect(store.hasMore).toBe(false);

    const callCountBefore = dbMocks.loadHistoricalSessionsPage.mock.calls.length;
    await store.loadMoreSessions();
    expect(dbMocks.loadHistoricalSessionsPage.mock.calls.length).toBe(callCountBefore);
  });

  it('deleteSession calls db.deleteSession and refetches history', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const fakeSessions = [
      { id: 's1', completed_at: '2024-01-01', total_score: 4000, duration_seconds: 60 }
    ];
    dbMocks.loadHistoricalSessionsPage.mockResolvedValue(fakeSessions);
    dbMocks.countHistoricalSessions.mockResolvedValue(fakeSessions.length);

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
    dbMocks.loadHistoricalSessionsPage.mockResolvedValue([]);
    dbMocks.countHistoricalSessions.mockResolvedValue(0);

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

  it('fetchAllSessions calls loadHistoricalSessions and returns result', async () => {
    const sessions = [
      { id: 's1', completed_at: '2024-01-01', total_score: 5000, duration_seconds: 60 }
    ];
    dbMocks.loadHistoricalSessions.mockResolvedValueOnce(sessions);
    const store = useHistoryStore();
    const result = await store.fetchAllSessions();
    expect(dbMocks.loadHistoricalSessions).toHaveBeenCalled();
    expect(result).toEqual(sessions);
  });

  it('loadMoreSessions sets error when fetch fails', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    // Set up initial state with hasMore = true (totalCount > sessions.length)
    const page1 = [
      { id: 'a', completed_at: '2024-01-01', total_score: 5000, duration_seconds: 60 }
    ];
    dbMocks.loadHistoricalSessionsPage
      .mockResolvedValueOnce(page1) // first call in fetchHistory
      .mockRejectedValueOnce(new Error('load more failed')); // second call in loadMoreSessions
    dbMocks.countHistoricalSessions.mockResolvedValue(10); // more sessions available

    const store = useHistoryStore();
    await store.fetchHistory();
    expect(store.hasMore).toBe(true);

    await store.loadMoreSessions();
    expect(store.error).toContain('load more failed');
    consoleSpy.mockRestore();
  });
});
