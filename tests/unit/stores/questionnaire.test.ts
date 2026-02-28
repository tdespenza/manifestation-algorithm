import { describe, it, expect, vi, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useQuestionnaireStore } from '@/stores/questionnaire';

vi.mock('@tauri-apps/api/core', () => ({
  invoke: vi.fn()
}));

vi.mock('@/composables/useNetwork', () => ({
  useNetwork: () => ({
    sharingEnabled: { value: false }
  })
}));

// Mock DB service
const dbMocks = vi.hoisted(() => ({
  saveAnswer: vi.fn(),
  loadAnswers: vi.fn().mockResolvedValue({}),
  getLastActive: vi.fn().mockResolvedValue(null),
  updateLastActive: vi.fn().mockResolvedValue(undefined),
  clearSession: vi.fn(),
  loadHistoricalSessions: vi.fn().mockResolvedValue([]),
  loadSessionResponses: vi.fn().mockResolvedValue([]),
  saveHistoricalSession: vi.fn().mockResolvedValue('uuid-1'),
  getSetting: vi.fn().mockResolvedValue(null),
  setSetting: vi.fn().mockResolvedValue(undefined)
}));

vi.mock('@/services/db', () => ({
  saveAnswer: dbMocks.saveAnswer,
  loadAnswers: dbMocks.loadAnswers,
  getLastActive: dbMocks.getLastActive,
  updateLastActive: dbMocks.updateLastActive,
  clearSession: dbMocks.clearSession,
  loadHistoricalSessions: dbMocks.loadHistoricalSessions,
  loadSessionResponses: dbMocks.loadSessionResponses,
  saveHistoricalSession: dbMocks.saveHistoricalSession,
  getSetting: dbMocks.getSetting,
  setSetting: dbMocks.setSetting
}));

describe('Questionnaire Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
    // Default mocks
    dbMocks.loadAnswers.mockResolvedValue({});
    dbMocks.loadHistoricalSessions.mockResolvedValue([]);
    dbMocks.getLastActive.mockResolvedValue(null);
    dbMocks.getSetting.mockResolvedValue(null);
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
      expect(store.isHistoricalPreFill).toBe(false);
      expect(store.hasSavedSession).toBe(false);
    });

    it('init skips prefill when no historical sessions exist', async () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      dbMocks.loadAnswers.mockResolvedValue({});
      dbMocks.loadHistoricalSessions.mockResolvedValue([]); // empty history

      const store = useQuestionnaireStore();
      await store.init();

      expect(store.answers).toEqual({});
      expect(store.isHistoricalPreFill).toBe(false);
      expect(dbMocks.loadSessionResponses).not.toHaveBeenCalled();
      expect(consoleSpy).not.toHaveBeenCalledWith('Failed to init store:', expect.anything());
      consoleSpy.mockRestore();
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

    it('init does not expire when exactly at timeout boundary', async () => {
      const store = useQuestionnaireStore();
      const now = 1_800_000_000_000;
      const nowSpy = vi.spyOn(Date, 'now').mockReturnValue(now);
      const atBoundary = now - 30 * 24 * 60 * 60 * 1000;

      dbMocks.loadAnswers.mockResolvedValue({ '1a': 5 });
      dbMocks.getLastActive.mockResolvedValue(atBoundary.toString());

      await store.init();

      expect(store.answers['1a']).toBe(5);
      expect(dbMocks.clearSession).not.toHaveBeenCalled();
      nowSpy.mockRestore();
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

    it('does not parse lastActive when DB returns null', async () => {
      const parseSpy = vi.spyOn(Number, 'parseInt');
      dbMocks.getLastActive.mockResolvedValueOnce(null);
      const store = useQuestionnaireStore();

      await store.init();

      expect(parseSpy).not.toHaveBeenCalledWith(null as unknown as string, 10);
      parseSpy.mockRestore();
    });

    it('init persists generated session_id when none exists', async () => {
      const randomSpy = vi
        .spyOn(crypto, 'randomUUID')
        .mockReturnValue('00000000-0000-4000-8000-000000000000');
      const store = useQuestionnaireStore();

      await store.init();

      expect(dbMocks.getSetting).toHaveBeenCalledWith('session_id');
      expect(store.sessionId).toBe('00000000-0000-4000-8000-000000000000');
      expect(dbMocks.setSetting).toHaveBeenCalledWith(
        'session_id',
        '00000000-0000-4000-8000-000000000000'
      );
      randomSpy.mockRestore();
    });

    it('init keeps default goalScore null when goal_score setting is empty string', async () => {
      dbMocks.getSetting
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce('')
        .mockResolvedValueOnce('persisted-uuid');

      const store = useQuestionnaireStore();
      await store.init();

      expect(store.goalScore).toBeNull();
      expect(dbMocks.getSetting).toHaveBeenCalledWith('goal_score');
    });

    it('init sets saveLastSession true when persisted setting is "true"', async () => {
      dbMocks.getSetting
        .mockResolvedValueOnce('true')
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce('persisted-uuid');

      const store = useQuestionnaireStore();
      await store.init();

      expect(store.saveLastSession).toBe(true);
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

    it('setAnswer accepts boundary values 1 and 10', async () => {
      const store = useQuestionnaireStore();

      await store.setAnswer('1b', 1);
      await store.setAnswer('1c', 10);

      expect(store.answers['1b']).toBe(1);
      expect(store.answers['1c']).toBe(10);
      expect(dbMocks.saveAnswer).toHaveBeenNthCalledWith(1, expect.anything(), '1b', 1);
      expect(dbMocks.saveAnswer).toHaveBeenNthCalledWith(2, expect.anything(), '1c', 10);
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

  describe('Default state', () => {
    it('starts with default session id and not saving', () => {
      const store = useQuestionnaireStore();
      expect(store.sessionId).toBe('default-session');
      expect(store.isSaving).toBe(false);
    });

    it('hasSavedSession is true when answers exist before resumeSession', async () => {
      const store = useQuestionnaireStore();
      store.answers['1a'] = 3;
      expect(store.hasSavedSession).toBe(true);

      await store.resumeSession();
      expect(store.hasSavedSession).toBe(false);
    });
  });

  describe('Save Last Session Setting', () => {
    it('saveLastSession defaults to true', () => {
      const store = useQuestionnaireStore();
      expect(store.saveLastSession).toBe(true);
    });

    it('setSaveLastSession updates the ref and persists to DB', async () => {
      const store = useQuestionnaireStore();
      await store.setSaveLastSession(false);
      expect(store.saveLastSession).toBe(false);
      expect(dbMocks.setSetting).toHaveBeenCalledWith('save_last_session', 'false');
    });

    it('setSaveLastSession(true) persists true string to DB', async () => {
      const store = useQuestionnaireStore();
      await store.setSaveLastSession(true);
      expect(store.saveLastSession).toBe(true);
      expect(dbMocks.setSetting).toHaveBeenCalledWith('save_last_session', 'true');
    });

    it('init loads save_last_session setting from DB', async () => {
      dbMocks.getSetting.mockResolvedValueOnce('false');
      const store = useQuestionnaireStore();
      await store.init();
      expect(store.saveLastSession).toBe(false);
      expect(dbMocks.getSetting).toHaveBeenCalledWith('save_last_session');
    });

    it('init keeps saveLastSession true when setting is not persisted (null)', async () => {
      dbMocks.getSetting.mockResolvedValueOnce(null);
      const store = useQuestionnaireStore();
      await store.init();
      expect(store.saveLastSession).toBe(true);
    });

    it('init skips historical pre-fill when saveLastSession is false', async () => {
      dbMocks.getSetting.mockResolvedValueOnce('false');
      dbMocks.loadAnswers.mockResolvedValue({});
      dbMocks.loadHistoricalSessions.mockResolvedValue([{ id: 'hist-1' }]);
      dbMocks.loadSessionResponses.mockResolvedValue([
        { question_id: '1a', category: 'General', answer_value: 9 }
      ]);

      const store = useQuestionnaireStore();
      await store.init();

      expect(store.answers).toEqual({});
      expect(store.hasSavedSession).toBe(false);
      expect(store.isHistoricalPreFill).toBe(false);
      expect(dbMocks.loadHistoricalSessions).not.toHaveBeenCalled();
    });

    it('init auto-resumes in-progress session regardless of saveLastSession setting', async () => {
      dbMocks.getSetting.mockResolvedValueOnce('false');
      dbMocks.loadAnswers.mockResolvedValue({ '1a': 7 });
      const store = useQuestionnaireStore();
      await store.init();
      expect(store.answers['1a']).toBe(7);
      expect(store.hasSavedSession).toBe(true);
      expect(store.isHistoricalPreFill).toBe(false);
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
    store.answers['1a'] = 7; // hasSavedSession is computed — becomes true automatically
    store.currentIndex = 5;
    store.isSaving = true;

    store.reset();

    expect(store.answers).toEqual({});
    expect(store.currentIndex).toBe(0);
    expect(store.hasSavedSession).toBe(false);
    expect(store.isSaving).toBe(false);
  });

  describe('ensureSessionId', () => {
    it('restores persisted session ID from settings when available', async () => {
      // init calls getSetting three times: save_last_session, goal_score, session_id
      // Return null for the first two, then a persisted ID for session_id
      dbMocks.getSetting
        .mockResolvedValueOnce(null) // save_last_session
        .mockResolvedValueOnce(null) // goal_score
        .mockResolvedValueOnce('persisted-uuid'); // session_id

      const store = useQuestionnaireStore();
      await store.init();

      expect(store.sessionId).toBe('persisted-uuid');
      // setSetting should NOT be called for session_id when it already exists
      expect(dbMocks.setSetting).not.toHaveBeenCalledWith('session_id', expect.any(String));
    });
  });

  describe('leaf-question flattening', () => {
    it('derives totalQuestions from flattened leaf question set', () => {
      const store = useQuestionnaireStore();
      expect(store.totalQuestions).toBe(54);
    });

    it('navigates through flattened leaf question order', () => {
      const store = useQuestionnaireStore();

      expect(store.currentQuestion?.id).toBe('1a');
      store.goToNext();
      expect(store.currentQuestion?.id).toBe('1b');

      store.goToIndex(21);
      expect(store.currentQuestion?.id).toBe('19a');
    });

    it('goToIndex only updates for valid index bounds', () => {
      const store = useQuestionnaireStore();

      store.goToIndex(0);
      expect(store.currentIndex).toBe(0);

      store.goToIndex(store.totalQuestions - 1);
      expect(store.currentIndex).toBe(store.totalQuestions - 1);

      store.goToIndex(-1);
      expect(store.currentIndex).toBe(store.totalQuestions - 1);

      store.goToIndex(store.totalQuestions);
      expect(store.currentIndex).toBe(store.totalQuestions - 1);
    });
  });

  describe('goalScore init from settings', () => {
    it('init parses stored goal_score when persisted value is non-empty', async () => {
      dbMocks.getSetting
        .mockResolvedValueOnce(null) // save_last_session
        .mockResolvedValueOnce('7500'); // goal_score — truthy branch at line 140

      const store = useQuestionnaireStore();
      await store.init();

      expect(store.goalScore).toBe(7500);
    });
  });

  describe('setGoalScore', () => {
    it('setGoalScore(null) clears the goal and persists empty string', async () => {
      const store = useQuestionnaireStore();
      await store.setGoalScore(null);

      expect(store.goalScore).toBeNull();
      expect(dbMocks.setSetting).toHaveBeenCalledWith('goal_score', '');
    });

    it('setGoalScore(value) sets the goal and persists the stringified value', async () => {
      const store = useQuestionnaireStore();
      await store.setGoalScore(7500);

      expect(store.goalScore).toBe(7500);
      expect(dbMocks.setSetting).toHaveBeenCalledWith('goal_score', '7500');
    });
  });

  describe('submitSession', () => {
    it('resets isSaving to false after successful submit', async () => {
      const store = useQuestionnaireStore();
      store.answers['1a'] = 8;

      const historyId = await store.submitSession();

      expect(historyId).toBe('uuid-1');
      expect(store.isSaving).toBe(false);
      expect(dbMocks.clearSession).toHaveBeenCalledWith(expect.any(String));
    });

    it('resets isSaving to false when submit throws', async () => {
      dbMocks.saveHistoricalSession.mockRejectedValueOnce(new Error('save failed'));
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const store = useQuestionnaireStore();
      store.answers['1a'] = 9;

      await expect(store.submitSession()).rejects.toThrow('save failed');
      expect(store.isSaving).toBe(false);

      consoleSpy.mockRestore();
    });

    it('sets isSaving true while submitSession is in flight', async () => {
      let resolveHistory: ((value: string) => void) | undefined;
      dbMocks.saveHistoricalSession.mockImplementationOnce(
        () =>
          new Promise<string>(resolve => {
            resolveHistory = resolve;
          })
      );

      const store = useQuestionnaireStore();
      store.answers['1a'] = 8;

      const pending = store.submitSession();
      expect(store.isSaving).toBe(true);

      resolveHistory?.('uuid-inflight');
      await pending;
      expect(store.isSaving).toBe(false);
    });

    it('startFresh clears session state and historical prefill flags', async () => {
      dbMocks.loadAnswers.mockResolvedValue({});
      dbMocks.loadHistoricalSessions.mockResolvedValue([{ id: 'hist-1' }]);
      dbMocks.loadSessionResponses.mockResolvedValue([
        { question_id: '1a', category: 'General', answer_value: 9 }
      ]);

      const store = useQuestionnaireStore();
      await store.init();
      expect(store.hasSavedSession).toBe(true);
      expect(store.isHistoricalPreFill).toBe(true);

      await store.startFresh();

      expect(store.answers).toEqual({});
      expect(store.currentIndex).toBe(0);
      expect(store.isHistoricalPreFill).toBe(false);
      expect(store.hasSavedSession).toBe(false);
      expect(dbMocks.clearSession).toHaveBeenCalledWith(expect.any(String));
      expect(dbMocks.updateLastActive).toHaveBeenCalledWith(expect.any(String));
    });

    it('startFresh keeps resume dialog available for new answers', async () => {
      const store = useQuestionnaireStore();
      await store.resumeSession();
      expect(store.hasSavedSession).toBe(false);

      await store.startFresh();
      store.answers['1a'] = 8;
      expect(store.hasSavedSession).toBe(true);
    });

    it('reset keeps resume dialog available for new answers', () => {
      const store = useQuestionnaireStore();
      store.answers['1a'] = 7;
      store.reset();

      store.answers['1a'] = 5;
      expect(store.hasSavedSession).toBe(true);
    });
  });
});
