import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { calculateScore } from '../services/scoring';
import { questions } from '../data/questions';
import type { Question } from '../types';
import { SESSION_TIMEOUT_MS } from '../constants';
import {
  saveAnswer as dbSaveAnswer,
  loadAnswers,
  getLastActive,
  updateLastActive,
  clearSession,
  saveHistoricalSession
} from '../services/db';

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
  const currentIndex = ref(0);

  const score = computed(() => calculateScore(answers.value));

  const percentComplete = computed(() => {
    const answered = Object.keys(answers.value).length;
    return Math.floor((answered / TOTAL_QUESTIONS_COUNT) * 100);
  });

  const isComplete = computed(() =>
    // Require every leaf question to have an explicitly set answer (1-10).
    // Unanswered questions are NOT treated as complete — the user must move
    // each slider at least once. Default-1 fill-in only happens on submit.
    allQuestions.every(q => {
      const val = answers.value[q.id];
      if (val === undefined) return false;
      return typeof val === 'number' && val >= 1 && val <= 10;
    })
  );

  /** Total leaf question count */
  const totalQuestions = computed(() => TOTAL_QUESTIONS_COUNT);

  /** The currently focused leaf question */
  const currentQuestion = computed(() => allQuestions[currentIndex.value]);

  function goToNext() {
    if (currentIndex.value < TOTAL_QUESTIONS_COUNT - 1) {
      currentIndex.value++;
    }
  }

  function goToPrev() {
    if (currentIndex.value > 0) {
      currentIndex.value--;
    }
  }

  function goToIndex(idx: number) {
    if (idx >= 0 && idx < TOTAL_QUESTIONS_COUNT) {
      currentIndex.value = idx;
    }
  }

  /** True if there's a saved session with data (for resume dialog) */
  const hasSavedSession = ref(false);

  async function init() {
    try {
      const lastActive = await getLastActive(sessionId.value);
      if (lastActive) {
        const timeSince = Date.now() - Number.parseInt(lastActive, 10);
        if (timeSince > SESSION_TIMEOUT_MS) {
          await clearSession(sessionId.value);
          answers.value = {};
          await updateLastActive(sessionId.value);
          hasSavedSession.value = false;
          return;
        }
      }

      const saved = await loadAnswers(sessionId.value);
      hasSavedSession.value = Object.keys(saved).length > 0;
      answers.value = saved;
      await updateLastActive(sessionId.value);
    } catch (e) {
      console.error('Failed to init store:', e);
    }
  }

  /** Resume saved session (load answers without clearing) */
  async function resumeSession() {
    // answers are already loaded in init — just confirm
    hasSavedSession.value = false;
  }

  /** Discard saved session and start fresh */
  async function startFresh() {
    await clearSession(sessionId.value);
    answers.value = {};
    currentIndex.value = 0;
    hasSavedSession.value = false;
    await updateLastActive(sessionId.value);
  }

  async function setAnswer(questionId: string, value: number) {
    if (value < 1 || value > 10) return;
    // Validate that questionId exists in the known leaf questions
    if (!allQuestions.some(q => q.id === questionId)) {
      console.error('Invalid question ID:', questionId);
      return;
    }
    answers.value[questionId] = value;
    try {
      isSaving.value = true;
      await dbSaveAnswer(sessionId.value, questionId, value);
      updateLastActive(sessionId.value).catch(console.error);
    } catch (e) {
      console.error('Failed to save answer:', e);
    } finally {
      isSaving.value = false;
    }
  }

  async function submitSession(): Promise<string> {
    try {
      isSaving.value = true;
      // Fill in default value of 1 for any questions the user never touched
      const fullAnswers: Record<string, number> = {};
      for (const q of allQuestions) {
        fullAnswers[q.id] = answers.value[q.id] ?? 1;
      }
      const finalScore = score.value;
      const historyId = await saveHistoricalSession(finalScore, fullAnswers);
      await clearSession(sessionId.value);
      answers.value = {};
      currentIndex.value = 0;
      return historyId;
    } catch (e) {
      console.error('Failed to submit session:', e);
      throw e;
    } finally {
      isSaving.value = false;
    }
  }

  /** Reset all in-memory state (for use after clearing a session). */
  function reset() {
    answers.value = {};
    currentIndex.value = 0;
    hasSavedSession.value = false;
    isSaving.value = false;
  }

  return {
    answers,
    score,
    percentComplete,
    isComplete,
    totalQuestions,
    currentQuestion,
    currentIndex,
    hasSavedSession,
    init,
    resumeSession,
    startFresh,
    goToNext,
    goToPrev,
    goToIndex,
    setAnswer,
    submitSession,
    reset,
    sessionId,
    isSaving
  };
});
