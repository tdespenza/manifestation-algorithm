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
  saveHistoricalSession,
  loadHistoricalSessions,
  loadSessionResponses
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
  /** True when hasSavedSession was triggered by a historical pre-fill (not an in-progress session) */
  const isHistoricalPreFill = ref(false);

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

      // If no current session, try to load the most recent historical answers
      // to pre-fill (per requirement: "questionnaire must remember the last scores")
      if (Object.keys(saved).length === 0) {
        const history = await loadHistoricalSessions();
        if (history.length > 0) {
          const lastSessionId = history[0].id; // Most recent due to DESC order
          const lastResponses = await loadSessionResponses(lastSessionId);
          const historyAnswers: Record<string, number> = {};

          lastResponses.forEach(r => {
            // Only load if valid question ID (in case questions changed)
            if (allQuestions.some(q => q.id === r.question_id)) {
              historyAnswers[r.question_id] = r.answer_value;
            }
          });

          if (Object.keys(historyAnswers).length > 0) {
            answers.value = historyAnswers;
            // Show the ResumeDialog so the user can choose to continue from
            // their last scores OR start completely blank (Start Fresh).
            hasSavedSession.value = true;
            isHistoricalPreFill.value = true;
          }
        }
      } else {
        answers.value = saved;
      }

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
    isHistoricalPreFill.value = false;
    await updateLastActive(sessionId.value);
  }

  async function setAnswer(questionId: string, value: number) {
    if (value < 1 || value > 10) return;
    // Validate that questionId exists in the known leaf questions
    const validQuestionIds = new Set(allQuestions.map(q => q.id));
    if (!validQuestionIds.has(questionId)) {
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
      // Recalculate score from the complete answer set (including default fills)
      const finalScore = calculateScore(fullAnswers);
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
    totalQuestions,
    currentQuestion,
    currentIndex,
    hasSavedSession,
    isHistoricalPreFill,
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
