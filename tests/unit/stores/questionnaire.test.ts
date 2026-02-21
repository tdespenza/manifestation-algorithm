import { describe, it, expect, vi, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useQuestionnaireStore } from '@/stores/questionnaire';

// Mock DB service
const dbMocks = vi.hoisted(() => ({
  saveAnswer: vi.fn(),
  loadAnswers: vi.fn().mockResolvedValue({}),
  getLastActive: vi.fn().mockResolvedValue(null),
  updateLastActive: vi.fn().mockResolvedValue(undefined),
  clearSession: vi.fn(),
  loadHistoricalSessions: vi.fn().mockResolvedValue([]),
  loadSessionResponses: vi.fn().mockResolvedValue([]),
  saveHistoricalSession: vi.fn().mockResolvedValue('uuid-1')
}));

vi.mock('@/services/db', () => ({
  saveAnswer: dbMocks.saveAnswer,
  loadAnswers: dbMocks.loadAnswers,
  getLastActive: dbMocks.getLastActive,
  updateLastActive: dbMocks.updateLastActive,
  clearSession: dbMocks.clearSession,
  loadHistoricalSessions: dbMocks.loadHistoricalSessions,
  loadSessionResponses: dbMocks.loadSessionResponses,
  saveHistoricalSession: dbMocks.saveHistoricalSession
}));

describe('Questionnaire Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
    // Default mocks
    dbMocks.loadAnswers.mockResolvedValue({});
    dbMocks.loadHistoricalSessions.mockResolvedValue([]);
    dbMocks.getLastActive.mockResolvedValue(null);
  });

  describe('Initialization', () => {
    it('init should load answers on success', async () => {
      dbMocks.loadAnswers.mockResolvedValue({ '1a': 5 });
      dbMocks.getLastActive.mockResolvedValue(Date.now().toString());
      const store = useQuestionnaireStore();

      await store.init();

      expect(store.answers['1a']).toBe(5);
    });

    it('init should load history if current session empty', async () => {
      // Current session empty
      dbMocks.loadAnswers.mockResolvedValue({});
      // History exists
      dbMocks.loadHistoricalSessions.mockResolvedValue([{ id: 'hist-1' }]);
      dbMocks.loadSessionResponses.mockResolvedValue([
        { question_id: '1a', category: 'General', answer_value: 9 }
      ]);

      const store = useQuestionnaireStore();
      await store.init();

      expect(store.answers['1a']).toBe(9);
      // NOW sets hasSavedSession=true so ResumeDialog appears and user can start fresh
      expect(store.hasSavedSession).toBe(true);
      expect(store.isHistoricalPreFill).toBe(true);
    });

    it('init skips prefill when historical responses have no valid question IDs', async () => {
      // No current session
      dbMocks.loadAnswers.mockResolvedValue({});
      // History exists but responses only contain unknown question IDs
      dbMocks.loadHistoricalSessions.mockResolvedValue([{ id: 'hist-old' }]);
      dbMocks.loadSessionResponses.mockResolvedValue([
        { question_id: 'invalid-unknown-id', category: 'Old', answer_value: 7 }
      ]);

      const store = useQuestionnaireStore();
      await store.init();

      // historyAnswers is empty → answers stays empty
      expect(store.answers).toEqual({});
    });

    it('init skips prefill when no historical sessions exist', async () => {
      dbMocks.loadAnswers.mockResolvedValue({});
      dbMocks.loadHistoricalSessions.mockResolvedValue([]); // empty history

      const store = useQuestionnaireStore();
      await store.init();

      expect(store.answers).toEqual({});
    });

    it('init should clear answers if session expired', async () => {
      const store = useQuestionnaireStore();
      // Mock returning OLD time (31 days ago = past 30-day timeout)
      const oldTime = Date.now() - 31 * 24 * 60 * 60 * 1000;

      dbMocks.loadAnswers.mockResolvedValue({ '1a': 5 });
      dbMocks.getLastActive.mockResolvedValue(oldTime.toString());

      await store.init();

      // Answers should be empty because session was expired and cleared
      expect(store.answers).toEqual({});
      expect(dbMocks.clearSession).toHaveBeenCalled();
      expect(dbMocks.updateLastActive).toHaveBeenCalled();
    });

    it('init should not expire if within timeout', async () => {
      const store = useQuestionnaireStore();
      // Mock returning recent time (5 mins ago)
      const recentTime = Date.now() - 5 * 60 * 1000;

      dbMocks.loadAnswers.mockResolvedValue({ '1a': 5 });
      dbMocks.getLastActive.mockResolvedValue(recentTime.toString());

      await store.init();

      expect(store.answers['1a']).toBe(5);
    });

    it('init should handle errors gracefully', async () => {
      // Create a spy. Note: console is global, so verify it's not reused.
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      dbMocks.loadAnswers.mockRejectedValue(new Error('DB Fail'));
      const store = useQuestionnaireStore();

      await store.init();

      expect(consoleSpy).toHaveBeenCalledWith('Failed to init store:', expect.any(Error));
      consoleSpy.mockRestore();
    });
  });

  describe('Setting Answers', () => {
    it('setAnswer should update state and save to db', async () => {
      const store = useQuestionnaireStore();

      await store.setAnswer('1b', 8);

      expect(store.answers['1b']).toBe(8);
      expect(dbMocks.saveAnswer).toHaveBeenCalledWith(expect.anything(), '1b', 8);
    });
    it('setAnswer should update isSaving state', async () => {
      const store = useQuestionnaireStore();
      let wasSavingDuringExecution = false;

      // Mock saveAnswer to check state while running
      dbMocks.saveAnswer.mockImplementation(async () => {
        wasSavingDuringExecution = store.isSaving;
      });

      const promise = store.setAnswer('1c', 7);

      // Check immediate state
      expect(store.isSaving).toBe(true);

      await promise;

      expect(wasSavingDuringExecution).toBe(true);
      expect(store.isSaving).toBe(false);
    });
    it('setAnswer should ignore invalid values', async () => {
      const store = useQuestionnaireStore();

      await store.setAnswer('1b', 0);
      expect(store.answers['1b']).toBeUndefined();

      await store.setAnswer('1b', 11);
      expect(store.answers['1b']).toBeUndefined();

      expect(dbMocks.saveAnswer).not.toHaveBeenCalled();
    });

    it('setAnswer should handle db save failure (optimistic update remains)', async () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      dbMocks.saveAnswer.mockRejectedValue(new Error('Save Fail'));
      const store = useQuestionnaireStore();

      await store.setAnswer('1b', 5);

      // Update happens optimistically
      expect(store.answers['1b']).toBe(5);
      // Error is logged
      expect(consoleSpy).toHaveBeenCalledWith('Failed to save answer:', expect.any(Error));
      consoleSpy.mockRestore();
    });

    it('setAnswer ignores calls with an invalid (unknown) question ID', async () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const store = useQuestionnaireStore();

      await store.setAnswer('totally-invalid-question-id', 5);

      expect(store.answers['totally-invalid-question-id']).toBeUndefined();
      expect(dbMocks.saveAnswer).not.toHaveBeenCalled();
      expect(consoleSpy).toHaveBeenCalledWith(
        'Invalid question ID:',
        'totally-invalid-question-id'
      );
      consoleSpy.mockRestore();
    });
  });

  it('calculateScore computed reflects answer changes', () => {
    const store = useQuestionnaireStore();
    const baseline = store.score; // all implicit default (1) = 10% of max
    // Q2 = 100 pts. Setting from implicit 1 → 5: delta = 100*(5-1)/10 = +40
    store.answers['2'] = 5;
    expect(store.score).toBeCloseTo(baseline + 40);
    // Setting Q2 from 5 → 10: delta = 100*(10-5)/10 = +50
    store.answers['2'] = 10;
    expect(store.score).toBeCloseTo(baseline + 90);
  });

  it('reset() clears all in-memory state to defaults', () => {
    const store = useQuestionnaireStore();
    store.answers['1a'] = 7;
    store.currentIndex = 5;
    store.hasSavedSession = true;
    store.isSaving = true;

    store.reset();

    expect(store.answers).toEqual({});
    expect(store.currentIndex).toBe(0);
    expect(store.hasSavedSession).toBe(false);
    expect(store.isSaving).toBe(false);
  });
});
