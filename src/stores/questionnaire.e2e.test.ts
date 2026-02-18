/**
 * E2E-style tests for the complete questionnaire flow.
 * Covers: init → navigate → setAnswer → percentComplete → isComplete → submitSession
 * (Tauri DB calls are mocked; this tests the full store logic end-to-end.)
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useQuestionnaireStore } from './questionnaire';
import { questions } from '../data/questions';

// ── Mock entire DB layer ────────────────────────────────────────────────────

const savedAnswers: Record<string, number> = {};

const dbMocks = vi.hoisted(() => ({
  saveAnswer: vi.fn(),
  loadAnswers: vi.fn(),
  getLastActive: vi.fn().mockResolvedValue(null),
  updateLastActive: vi.fn().mockResolvedValue(undefined),
  clearSession: vi.fn().mockResolvedValue(undefined),
  saveHistoricalSession: vi.fn().mockResolvedValue('hist-e2e-001'),
}));

vi.mock('../services/db', () => ({
  saveAnswer: dbMocks.saveAnswer,
  loadAnswers: dbMocks.loadAnswers,
  getLastActive: dbMocks.getLastActive,
  updateLastActive: dbMocks.updateLastActive,
  clearSession: dbMocks.clearSession,
  saveHistoricalSession: dbMocks.saveHistoricalSession,
}));

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

// ── Tests ────────────────────────────────────────────────────────────────────

describe('E2E: Complete questionnaire flow', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
    dbMocks.loadAnswers.mockResolvedValue({});
    // Fast saveAnswer: skip the 300ms artificial delay by resolving immediately
    dbMocks.saveAnswer.mockResolvedValue(undefined);
    // Use fake timers to skip the 300ms "saving..." indicator delay
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  /** Helper: call setAnswer and advance past the 300ms save delay */
  async function fastSetAnswer(store: ReturnType<typeof useQuestionnaireStore>, id: string, value: number) {
    const p = store.setAnswer(id, value);
    await vi.advanceTimersByTimeAsync(301);
    await p;
  }

  it('Step 1 – init loads an empty session', async () => {
    const store = useQuestionnaireStore();
    await store.init();

    expect(store.answers).toEqual({});
    expect(store.percentComplete).toBe(0);
    expect(store.isComplete).toBe(false);
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

    expect(store.isComplete).toBe(true);
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

    expect(store.isComplete).toBe(true);

    const histId = await store.submitSession();

    expect(histId).toBe('hist-e2e-001');
    expect(dbMocks.saveHistoricalSession).toHaveBeenCalledWith(
      expect.any(Number),
      expect.objectContaining({ [leafIds[0]]: 5 })
    );

    // State should be reset after submit
    expect(store.answers).toEqual({});
    expect(store.isComplete).toBe(false);
    expect(store.percentComplete).toBe(0);
    expect(store.currentIndex).toBe(0);
    expect(dbMocks.clearSession).toHaveBeenCalled();
  });

  it('submitSession throws if questionnaire not complete', async () => {
    const store = useQuestionnaireStore();
    await store.init();

    // Only answer one question
    await fastSetAnswer(store, '2', 7);

    await expect(store.submitSession()).rejects.toThrow('not complete');
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

    // Q2: 100 pts at rating 5 → 50 pts
    await fastSetAnswer(store, '2', 5);
    // Q3: 250 pts at rating 10 → 250 pts
    await fastSetAnswer(store, '3', 10);

    // score should be 50 + 250 = 300
    expect(store.score).toBeCloseTo(300, 2);
  });
});
