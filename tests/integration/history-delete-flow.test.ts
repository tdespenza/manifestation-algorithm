/**
 * Integration tests for history store delete flows.
 * Covers: deleteSession, deleteSessions (bulk), error handling, state updates.
 * (Tauri DB calls are mocked; this tests the full store logic end-to-end.)
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useHistoryStore } from '@/stores/history';

// ── Mock entire DB layer ───────────────────────────────────────────────────────

const dbMocks = vi.hoisted(() => ({
  loadHistoricalSessions: vi.fn(),
  deleteSession: vi.fn(),
  deleteSessions: vi.fn()
}));

const trendsMocks = vi.hoisted(() => ({
  loadConsolidatedCategoryTrends: vi.fn()
}));

vi.mock('@/services/db', () => ({
  loadHistoricalSessions: dbMocks.loadHistoricalSessions,
  deleteSession: dbMocks.deleteSession,
  deleteSessions: dbMocks.deleteSessions
}));

vi.mock('@/services/db_trends', () => ({
  loadConsolidatedCategoryTrends: trendsMocks.loadConsolidatedCategoryTrends
}));

// ── Test Data ─────────────────────────────────────────────────────────────────

function makeSession(id: string, daysAgo = 1) {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return {
    id,
    completed_at: d.toISOString(),
    total_score: 5000,
    duration_seconds: 60,
    answers_snapshot: '{}' satisfies string
  };
}

const SESSION_A = makeSession('session-a', 1);
const SESSION_B = makeSession('session-b', 2);
const SESSION_C = makeSession('session-c', 3);

// ── Setup ─────────────────────────────────────────────────────────────────────

beforeEach(() => {
  setActivePinia(createPinia());
  vi.clearAllMocks();
  // Default: return 3 sessions from DB
  dbMocks.loadHistoricalSessions.mockResolvedValue([SESSION_A, SESSION_B, SESSION_C]);
  trendsMocks.loadConsolidatedCategoryTrends.mockResolvedValue({});
  dbMocks.deleteSession.mockResolvedValue(undefined);
  dbMocks.deleteSessions.mockResolvedValue(undefined);
});

// ── deleteSession ─────────────────────────────────────────────────────────────

describe('deleteSession (single)', () => {
  it('calls db.deleteSession and refetches history on success', async () => {
    const store = useHistoryStore();
    await store.fetchHistory();
    expect(store.sessions).toHaveLength(3);

    // After deletion, DB returns only 2 sessions
    dbMocks.loadHistoricalSessions.mockResolvedValueOnce([SESSION_B, SESSION_C]);

    await store.deleteSession('session-a');

    expect(dbMocks.deleteSession).toHaveBeenCalledWith('session-a');
    expect(dbMocks.loadHistoricalSessions).toHaveBeenCalledTimes(2); // initial + refetch
    expect(store.sessions).toHaveLength(2);
    expect(store.sessions.find(s => s.id === 'session-a')).toBeUndefined();
  });

  it('removes the correct session while leaving others intact', async () => {
    const store = useHistoryStore();
    await store.fetchHistory();

    dbMocks.loadHistoricalSessions.mockResolvedValueOnce([SESSION_A, SESSION_C]);
    await store.deleteSession('session-b');

    expect(store.sessions.map(s => s.id)).toEqual(['session-a', 'session-c']);
  });

  it('sets error and does not refetch when db.deleteSession throws', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    dbMocks.deleteSession.mockRejectedValueOnce(new Error('foreign key constraint'));

    const store = useHistoryStore();
    await store.fetchHistory();
    const callCountBefore = dbMocks.loadHistoricalSessions.mock.calls.length;

    await store.deleteSession('session-a');

    expect(store.error).toContain('foreign key constraint');
    // fetchHistory should NOT have been called again after failure
    expect(dbMocks.loadHistoricalSessions.mock.calls.length).toBe(callCountBefore);
    consoleSpy.mockRestore();
  });

  it('store is not in loading state after a failed deleteSession', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    dbMocks.deleteSession.mockRejectedValueOnce(new Error('timeout'));

    const store = useHistoryStore();
    await store.deleteSession('session-a');

    expect(store.isLoading).toBe(false);
    consoleSpy.mockRestore();
  });
});

// ── deleteSessions (bulk) ─────────────────────────────────────────────────────

describe('deleteSessions (bulk)', () => {
  it('calls db.deleteSessions with all ids and refetches history', async () => {
    const store = useHistoryStore();
    await store.fetchHistory();
    expect(store.sessions).toHaveLength(3);

    dbMocks.loadHistoricalSessions.mockResolvedValueOnce([SESSION_C]);
    await store.deleteSessions(['session-a', 'session-b']);

    expect(dbMocks.deleteSessions).toHaveBeenCalledWith(['session-a', 'session-b']);
    expect(store.sessions).toHaveLength(1);
    expect(store.sessions[0].id).toBe('session-c');
  });

  it('is a no-op (no DB call, no refetch) when given an empty array', async () => {
    const store = useHistoryStore();
    await store.fetchHistory();
    const callsBefore = dbMocks.loadHistoricalSessions.mock.calls.length;

    await store.deleteSessions([]);

    expect(dbMocks.deleteSessions).not.toHaveBeenCalled();
    expect(dbMocks.loadHistoricalSessions.mock.calls.length).toBe(callsBefore);
  });

  it('deletes all sessions when passed all ids', async () => {
    const store = useHistoryStore();
    await store.fetchHistory();

    dbMocks.loadHistoricalSessions.mockResolvedValueOnce([]);
    await store.deleteSessions(['session-a', 'session-b', 'session-c']);

    expect(store.sessions).toHaveLength(0);
  });

  it('sets error and does not refetch when db.deleteSessions throws', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    dbMocks.deleteSessions.mockRejectedValueOnce(new Error('bulk delete failed'));

    const store = useHistoryStore();
    await store.fetchHistory();
    const callCountBefore = dbMocks.loadHistoricalSessions.mock.calls.length;

    await store.deleteSessions(['session-a', 'session-b']);

    expect(store.error).toContain('bulk delete failed');
    expect(dbMocks.loadHistoricalSessions.mock.calls.length).toBe(callCountBefore);
    consoleSpy.mockRestore();
  });

  it('store is not in loading state after a failed deleteSessions', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    dbMocks.deleteSessions.mockRejectedValueOnce(new Error('timeout'));

    const store = useHistoryStore();
    await store.deleteSessions(['session-a']);

    expect(store.isLoading).toBe(false);
    consoleSpy.mockRestore();
  });
});

// ── Sequential delete operations ──────────────────────────────────────────────

describe('sequential delete operations', () => {
  it('supports deleting one session then another independently', async () => {
    const store = useHistoryStore();
    await store.fetchHistory();

    // Delete A → 2 remain
    dbMocks.loadHistoricalSessions.mockResolvedValueOnce([SESSION_B, SESSION_C]);
    await store.deleteSession('session-a');
    expect(store.sessions).toHaveLength(2);

    // Delete B → 1 remains
    dbMocks.loadHistoricalSessions.mockResolvedValueOnce([SESSION_C]);
    await store.deleteSession('session-b');
    expect(store.sessions).toHaveLength(1);
    expect(store.sessions[0].id).toBe('session-c');
  });

  it('supports mixing single and bulk deletes', async () => {
    const store = useHistoryStore();
    await store.fetchHistory();

    // Single delete first
    dbMocks.loadHistoricalSessions.mockResolvedValueOnce([SESSION_B, SESSION_C]);
    await store.deleteSession('session-a');

    // Then bulk delete remaining
    dbMocks.loadHistoricalSessions.mockResolvedValueOnce([]);
    await store.deleteSessions(['session-b', 'session-c']);

    expect(store.sessions).toHaveLength(0);
    expect(dbMocks.deleteSession).toHaveBeenCalledTimes(1);
    expect(dbMocks.deleteSessions).toHaveBeenCalledTimes(1);
  });
});
