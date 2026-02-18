import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { calculateScore } from '../services/scoring';
import { questions } from '../data/questions';
import { Question } from '../types';
import { 
  saveAnswer as dbSaveAnswer, 
  loadAnswers, 
  getLastActive, 
  updateLastActive, 
  clearSession,
  saveHistoricalSession
} from '../services/db';

const SESSION_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes

function getLeafQuestions(qs: Question[]): Question[] {
  let leaves: Question[] = [];
  for (const q of qs) {
    if (q.hasSubPoints && q.subPoints?.length) {
      leaves = leaves.concat(getLeafQuestions(q.subPoints));
    } else {
      leaves.push(q);
    }
  }
  return leaves;
}

const allQuestions = getLeafQuestions(questions);
const TOTAL_QUESTIONS_COUNT = allQuestions.length;

export const useQuestionnaireStore = defineStore('questionnaire', () => {
  const answers = ref<Record<string, number>>({});
  const sessionId = ref('default-session');
  const isSaving = ref(false);

  const score = computed(() => {
    return calculateScore(answers.value);
  });

  const percentComplete = computed(() => {
    const answered = Object.keys(answers.value).length;
    if (TOTAL_QUESTIONS_COUNT === 0) return 0;
    return Math.floor((answered / TOTAL_QUESTIONS_COUNT) * 100);
  });

  const isComplete = computed(() => {
    // Check if every leaf question has an answer
    return allQuestions.every(q => {
      const val = answers.value[q.id];
      return typeof val === 'number' && val >= 1;
    });
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

  async function submitSession(): Promise<string> {
    if (!isComplete.value) {
      throw new Error('Questionnaire is not complete');
    }

    try {
      isSaving.value = true;
      // Calculate score one last time to be sure
      const finalScore = score.value;
      const historyId = await saveHistoricalSession(finalScore, answers.value);
      
      // Clear current session
      await clearSession(sessionId.value);
      answers.value = {}; // Reset local state
      
      return historyId;
    } catch (e) {
      console.error('Failed to submit session:', e);
      throw e;
    } finally {
      isSaving.value = false;
    }
  }

  return {
    answers,
    score,
    percentComplete,
    isComplete,
    init,
    setAnswer,
    submitSession,
    sessionId,
    isSaving
  };
});
