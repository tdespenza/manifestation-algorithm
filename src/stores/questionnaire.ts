import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { calculateScore } from '../services/scoring';
import { saveAnswer as dbSaveAnswer, loadAnswers } from '../services/db';

export const useQuestionnaireStore = defineStore('questionnaire', () => {
  const answers = ref<Record<string, number>>({});
  const sessionId = ref('default-session');

  const score = computed(() => {
    return calculateScore(answers.value);
  });

  async function init() {
    try {
      const saved = await loadAnswers(sessionId.value);
      answers.value = saved;
    } catch (e) {
      console.error('Failed to init store:', e);
    }
  }

  async function setAnswer(questionId: string, value: number) {
    if (value < 1 || value > 10) return;
    
    // Optimistic update
    answers.value[questionId] = value;
    
    // Persist to SQLite
    try {
      await dbSaveAnswer(sessionId.value, questionId, value);
    } catch (e) {
      console.error('Failed to save answer:', e);
    }
  }

  return {
    answers,
    score,
    init,
    setAnswer,
    sessionId
  };
});
