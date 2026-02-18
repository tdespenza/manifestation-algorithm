import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { calculateScore } from '../services/scoring';
import { 
  saveAnswer as dbSaveAnswer, 
  loadAnswers, 
  getLastActive, 
  updateLastActive, 
  clearSession 
} from '../services/db';

const SESSION_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes

export const useQuestionnaireStore = defineStore('questionnaire', () => {
  const answers = ref<Record<string, number>>({});
  const sessionId = ref('default-session');
  const isSaving = ref(false);

  const score = computed(() => {
    return calculateScore(answers.value);
  });

  async function init() {
    try {
      // Check expiry
      const lastActive = await getLastActive(sessionId.value);
      if (lastActive) {
        const timeSince = Date.now() - parseInt(lastActive, 10);
        if (timeSince > SESSION_TIMEOUT_MS) {
          console.log('Session expired, clearing data.');
          await clearSession(sessionId.value);
          answers.value = {};
          await updateLastActive(sessionId.value);
          return;
        }
      }

      const saved = await loadAnswers(sessionId.value);
      answers.value = saved;
      
      // Update activity timestamp on load
      await updateLastActive(sessionId.value);
    } catch (e) {
      console.error('Failed to init store:', e);
    }
  }

  async function setAnswer(questionId: string, value: number) {
    if (value < 1 || value > 10) return;
    
    // Optimistic update
    answers.value[questionId] = value;
    
    try {
      isSaving.value = true;
      await dbSaveAnswer(sessionId.value, questionId, value);
      
      // Update activity timestamp
      updateLastActive(sessionId.value).catch(console.error);

      // Brief delay so user sees "Saving..."
      await new Promise(r => setTimeout(r, 300));
    } catch (e) {
      console.error('Failed to save answer:', e);
    } finally {
      isSaving.value = false;
    }
  }

  return {
    answers,
    score,
    init,
    setAnswer,
    sessionId,
    isSaving
  };
});
