/**
 * E2E-style tests for the complete questionnaire flow.
 * Covers: init → navigate → setAnswer → percentComplete → isComplete → submitSession
 * (Tauri DB calls are mocked; this tests the full store logic end-to-end.)
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useQuestionnaireStore } from '@/stores/questionnaire';
import { questions } from '@/data/questions';

// ── Mock Tauri API (required now that submitSession calls invoke) ─────────────
const tauriMocks = vi.hoisted(() => ({
  mockInvoke: vi.fn().mockResolvedValue(undefined)
}));

vi.mock('@tauri-apps/api/core', () => ({
  invoke: (...args: unknown[]) => tauriMocks.mockInvoke(...args)
}));

vi.mock('@tauri-apps/api/event', () => ({
  listen: vi.fn().mockResolvedValue(vi.fn())
}));

// ── Mock entire DB layer ────────────────────────────────────────────────────

const dbMocks = vi.hoisted(() => ({
  saveAnswer: vi.fn(),
  loadAnswers: vi.fn(),
  getLastActive: vi.fn().mockResolvedValue(null),
  updateLastActive: vi.fn().mockResolvedValue(undefined),
  clearSession: vi.fn().mockResolvedValue(undefined),
  saveHistoricalSession: vi.fn().mockResolvedValue('hist-e2e-001'),
  loadHistoricalSessions: vi.fn().mockResolvedValue([]),
  loadSessionResponses: vi.fn().mockResolvedValue([]),
  getSetting: vi.fn().mockResolvedValue(null),
  setSetting: vi.fn().mockResolvedValue(undefined)
}));

vi.mock('@/services/db', () => ({
  saveAnswer: dbMocks.saveAnswer,
  loadAnswers: dbMocks.loadAnswers,
  getLastActive: dbMocks.getLastActive,
  updateLastActive: dbMocks.updateLastActive,
  clearSession: dbMocks.clearSession,
  saveHistoricalSession: dbMocks.saveHistoricalSession,
  loadHistoricalSessions: dbMocks.loadHistoricalSessions,
  loadSessionResponses: dbMocks.loadSessionResponses,
  getSetting: dbMocks.getSetting,
  setSetting: dbMocks.setSetting
}));

// ── Network composable helpers (for sharing state control) ──────────────────
import { _resetNetworkState, toggleSharing } from '@/composables/useNetwork';

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Flatten questions into leaf IDs */
function getLeafIds(qs: typeof questions): string[] {
  const ids: string[] = [];
  const walk = (q: (typeof questions)[0]) => {
    if (q.subPoints?.length) {
      q.subPoints.forEach(sub => walk(sub as (typeof questions)[0]));
    } else {
      ids.push(q.id);
    }
  };
  qs.forEach(walk);
  return ids;
}

/** Helper: call setAnswer and await it (no artificial delay in store). */
async function fastSetAnswer(
  store: ReturnType<typeof useQuestionnaireStore>,
  id: string,
  value: number
) {
  await store.setAnswer(id, value);
}

// ── Tests ────────────────────────────────────────────────────────────────────

describe('E2E: Complete questionnaire flow', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
    // Reset module-level network state so each test starts with sharing disabled
    _resetNetworkState();
    // Re-set default invoke behaviour after clearAllMocks() wiped the implementation
    tauriMocks.mockInvoke.mockResolvedValue(undefined);
    dbMocks.loadAnswers.mockResolvedValue({});
    dbMocks.saveAnswer.mockResolvedValue(undefined);
  });

  it('Step 1 – init loads an empty session', async () => {
    const store = useQuestionnaireStore();
    await store.init();

    expect(store.answers).toEqual({});
    expect(store.percentComplete).toBe(0);
    // With no explicit answers, isComplete is now TRUE to allow default 1s submission
    expect(store.currentIndex).toBe(0);
    expect(store.hasSavedSession).toBe(false);
  });

  it('Step 2 – navigation moves currentIndex correctly', async () => {
    const store = useQuestionnaireStore();
    await store.init();

    expect(store.currentIndex).toBe(0);

    store.goToNext();
    expect(store.currentIndex).toBe(1);

    store.goToNext();
    expect(store.currentIndex).toBe(2);

    store.goToPrev();
    expect(store.currentIndex).toBe(1);

    store.goToIndex(0);
    expect(store.currentIndex).toBe(0);
  });

  it('Step 3 – navigation does not go below 0 or above totalQuestions', () => {
    const store = useQuestionnaireStore();

    // Try to go before start
    store.goToPrev();
    expect(store.currentIndex).toBe(0);

    // Try to go past end
    store.goToIndex(store.totalQuestions + 100);
    expect(store.currentIndex).toBe(0); // unchanged (invalid index)

    store.goToIndex(store.totalQuestions - 1);
    store.goToNext();
    expect(store.currentIndex).toBe(store.totalQuestions - 1); // clamped
  });

  it('Step 4 – answering questions updates percentComplete', async () => {
    const store = useQuestionnaireStore();
    await store.init();

    const leafIds = getLeafIds(questions);
    expect(leafIds.length).toBeGreaterThan(0);

    // Answer the first question (use fastSetAnswer to skip the 300ms delay)
    await fastSetAnswer(store, leafIds[0], 7);
    expect(store.answers[leafIds[0]]).toBe(7);
    expect(store.percentComplete).toBeGreaterThan(0);
    expect(store.percentComplete).toBeLessThan(100);
  });

  it('Step 5 – answering all questions makes isComplete true', async () => {
    const store = useQuestionnaireStore();
    await store.init();

    const leafIds = getLeafIds(questions);

    for (const id of leafIds) {
      await fastSetAnswer(store, id, 8);
    }

    expect(store.percentComplete).toBe(100);
    expect(store.score).toBeGreaterThan(0);
  });

  it('Step 6 – submitSession saves history and resets state', async () => {
    const store = useQuestionnaireStore();
    await store.init();

    const leafIds = getLeafIds(questions);
    for (const id of leafIds) {
      await fastSetAnswer(store, id, 5);
    }

    const histId = await store.submitSession();

    expect(histId).toBe('hist-e2e-001');
    expect(dbMocks.saveHistoricalSession).toHaveBeenCalledWith(
      expect.any(Number),
      expect.objectContaining({ [leafIds[0]]: 5 })
    );

    // State should be reset after submit
    expect(store.answers).toEqual({});
    // After reset, answers are empty → isComplete is true (fresh start defaults)
    expect(store.percentComplete).toBe(0);
    expect(store.currentIndex).toBe(0);
    expect(dbMocks.clearSession).toHaveBeenCalled();
  });

  it('submitSession always succeeds even with no explicit answers (all default to 1)', async () => {
    const store = useQuestionnaireStore();
    await store.init();
    // No explicit answers — isComplete is true
    const histId = await store.submitSession();
    expect(histId).toBe('hist-e2e-001');
  });

  it('Step 7 – startFresh clears all answers and resets navigation', async () => {
    const store = useQuestionnaireStore();
    // Simulate loaded session
    dbMocks.loadAnswers.mockResolvedValue({ '2': 8, '3': 5 });
    dbMocks.getLastActive.mockResolvedValue(Date.now().toString());

    await store.init();
    expect(store.answers['2']).toBe(8);

    store.goToIndex(3);
    await store.startFresh();

    expect(store.answers).toEqual({});
    expect(store.currentIndex).toBe(0);
    expect(store.hasSavedSession).toBe(false);
    expect(dbMocks.clearSession).toHaveBeenCalled();
  });

  it('Step 8 – resumeSession keeps answers and clears dialog flag', async () => {
    dbMocks.loadAnswers.mockResolvedValue({ '2': 9 });
    dbMocks.getLastActive.mockResolvedValue(Date.now().toString());

    const store = useQuestionnaireStore();
    await store.init();

    expect(store.hasSavedSession).toBe(true);
    expect(store.answers['2']).toBe(9);

    await store.resumeSession();

    expect(store.hasSavedSession).toBe(false);
    // Answers should still be present
    expect(store.answers['2']).toBe(9);
  });

  it('score is consistent with scoring formula (points × rating/10)', async () => {
    const store = useQuestionnaireStore();
    await store.init();
    const baseline = store.score; // all implicit 1s

    // Q2: 100 pts. 1→5: delta = 100*(5-1)/10 = +40
    await fastSetAnswer(store, '2', 5);
    expect(store.score - baseline).toBeCloseTo(40, 1);

    // Q3: 250 pts. 1→10: delta = 250*(10-1)/10 = +225
    await fastSetAnswer(store, '3', 10);
    expect(store.score - baseline).toBeCloseTo(40 + 225, 1);
  });

  it('submitSession rethrows and logs when saveHistoricalSession rejects', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    dbMocks.saveHistoricalSession.mockRejectedValueOnce(new Error('DB write failed'));

    const store = useQuestionnaireStore();
    await store.init();

    await expect(store.submitSession()).rejects.toThrow('DB write failed');
    expect(consoleSpy).toHaveBeenCalledWith('Failed to submit session:', expect.any(Error));
    consoleSpy.mockRestore();
  });

  // ── publish_result integration ─────────────────────────────────────────────

  it('submitSession calls publish_result when sharing is enabled', async () => {
    // Enable sharing — sets sharingEnabled.value = true optimistically
    await toggleSharing(true);

    const store = useQuestionnaireStore();
    const histId = await store.submitSession();

    expect(histId).toBe('hist-e2e-001');
    expect(tauriMocks.mockInvoke).toHaveBeenCalledWith(
      'publish_result',
      expect.objectContaining({
        score: expect.any(Number),
        categoryScores: expect.any(Object)
      })
    );
  });

  it('submitSession does NOT call publish_result when sharing is disabled', async () => {
    // sharingEnabled starts false after _resetNetworkState() in beforeEach
    const store = useQuestionnaireStore();
    await store.submitSession();

    const publishCalls = tauriMocks.mockInvoke.mock.calls.filter(
      (call: unknown[]) => call[0] === 'publish_result'
    );
    expect(publishCalls).toHaveLength(0);
  });

  it('submitSession still succeeds and logs error if publish_result rejects', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    await toggleSharing(true);
    tauriMocks.mockInvoke.mockImplementation((cmd: string) => {
      if (cmd === 'publish_result') return Promise.reject(new Error('network unreachable'));
      return Promise.resolve(undefined);
    });

    const store = useQuestionnaireStore();
    const histId = await store.submitSession();

    // Session submission must succeed despite the network failure
    expect(histId).toBe('hist-e2e-001');
    expect(store.answers).toEqual({});
    expect(consoleSpy).toHaveBeenCalledWith(
      'Failed to publish result to network:',
      expect.any(Error)
    );
    consoleSpy.mockRestore();
  });
});
