import { describe, it, expect, vi, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useQuestionnaireStore } from './questionnaire';

// Mock DB service
const dbMocks = vi.hoisted(() => ({
  saveAnswer: vi.fn(),
  loadAnswers: vi.fn().mockResolvedValue({}),
}));

vi.mock('../services/db', () => ({
  saveAnswer: dbMocks.saveAnswer,
  loadAnswers: dbMocks.loadAnswers,
}));

describe('Questionnaire Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
  });

  describe('Initialization', () => {
    it('init should load answers on success', async () => {
      dbMocks.loadAnswers.mockResolvedValue({ '1a': 5 });
      const store = useQuestionnaireStore();
      
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
  });
  
  it('calculateScore computed should work', () => {
    const store = useQuestionnaireStore();
    store.answers['2'] = 5; 
    expect(store.score).toBe(50);
  });
});
