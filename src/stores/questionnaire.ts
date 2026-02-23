import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { invoke } from '@tauri-apps/api/core';
import { calculateScore } from '../services/scoring';
import { questions } from '../data/questions';
import type { Question } from '../types';
import { SESSION_TIMEOUT_MS } from '../constants';
import { useNetwork } from '../composables/useNetwork';
import {
  saveAnswer as dbSaveAnswer,
  loadAnswers,
  getLastActive,
  updateLastActive,
  clearSession,
  saveHistoricalSession,
  loadHistoricalSessions,
  loadSessionResponses,
  getSetting,
  setSetting
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

  /** Tracks whether the resume dialog has already been acknowledged (set true on resumeSession(), reset on init/reset). */
  const _resumeDialogDismissed = ref(false);
  /** True when there are session answers that the user hasn't yet acknowledged — drives the ResumeDialog. */
  const hasSavedSession = computed(
    () => Object.keys(answers.value).length > 0 && !_resumeDialogDismissed.value
  );
  /** True when hasSavedSession was triggered by a historical pre-fill (not an in-progress session) */
  const isHistoricalPreFill = ref(false);
  /** Whether to automatically pre-fill from the last completed session */
  const saveLastSession = ref(true);
  /** User-defined target score (null when not set). Stored in settings table as 'goal_score'. */
  const goalScore = ref<number | null>(null);

  /**
   * Load or generate a stable session ID persisted in the settings table.
   * On first run a UUID is generated; subsequent launches restore the saved value.
   */
  async function ensureSessionId() {
    const persistedSessionId = await getSetting('session_id');
    if (persistedSessionId) {
      sessionId.value = persistedSessionId;
    } else {
      // New install — generate a unique, stable session ID.
      // (Any in-progress data previously stored under 'default-session' is
      //  intentionally abandoned; historical sessions are fully preserved.)
      sessionId.value = crypto.randomUUID();
      await setSetting('session_id', sessionId.value);
    }
  }

  /**
   * Attempt to pre-fill answers from the most recent historical session.
   * Returns true when a pre-fill was applied, false otherwise.
   */
  async function tryHistoricalPreFill(): Promise<boolean> {
    if (!saveLastSession.value) return false;
    const history = await loadHistoricalSessions();
    if (history.length === 0) return false;

    const lastSessionId = history[0].id; // Most recent due to DESC order
    const lastResponses = await loadSessionResponses(lastSessionId);
    const historyAnswers: Record<string, number> = {};

    lastResponses.forEach(r => {
      // Only load if valid question ID (in case questions changed)
      if (allQuestions.some(q => q.id === r.question_id)) {
        historyAnswers[r.question_id] = r.answer_value;
      }
    });

    if (Object.keys(historyAnswers).length === 0) return false;

    answers.value = historyAnswers;
    isHistoricalPreFill.value = true;
    return true;
  }

  async function init() {
    _resumeDialogDismissed.value = false; // any fresh init resets dialog state
    try {
      // Load persisted settings before doing any session work
      const settingVal = await getSetting('save_last_session');
      if (settingVal !== null) {
        saveLastSession.value = settingVal === 'true';
      }
      const goalVal = await getSetting('goal_score');
      goalScore.value = goalVal ? parseInt(goalVal, 10) : null;

      await ensureSessionId();

      const lastActive = await getLastActive(sessionId.value);
      if (lastActive) {
        const timeSince = Date.now() - Number.parseInt(lastActive, 10);
        if (timeSince > SESSION_TIMEOUT_MS) {
          await clearSession(sessionId.value);
          answers.value = {};
          await updateLastActive(sessionId.value);
          return;
        }
      }

      const saved = await loadAnswers(sessionId.value);

      // If no current session, try to load the most recent historical answers to pre-fill
      if (Object.keys(saved).length === 0) {
        await tryHistoricalPreFill();
      } else {
        // In-progress session found — auto-resume without a dialog
        answers.value = saved;
        isHistoricalPreFill.value = false;
      }

      await updateLastActive(sessionId.value);
    } catch (e) {
      console.error('Failed to init store:', e);
    }
  }

  /** Resume saved session (load answers without clearing) */
  async function resumeSession() {
    // answers are already loaded in init — dismiss the dialog
    _resumeDialogDismissed.value = true;
  }

  /** Discard saved session and start fresh */
  async function startFresh() {
    _resumeDialogDismissed.value = false;
    await clearSession(sessionId.value);
    answers.value = {};
    currentIndex.value = 0;
    isHistoricalPreFill.value = false;
    await updateLastActive(sessionId.value);
  }

  /** Persist and update the "save last session" setting */
  async function setSaveLastSession(value: boolean) {
    saveLastSession.value = value;
    await setSetting('save_last_session', value.toString());
  }

  /** Persist and update the goal score target (pass null to clear). */
  async function setGoalScore(value: number | null) {
    goalScore.value = value;
    if (value === null) {
      await setSetting('goal_score', '');
    } else {
      await setSetting('goal_score', value.toString());
    }
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
      // Publish anonymously to the P2P network if the user has opted in.
      // This is non-fatal: a network failure must never prevent the session from saving.
      const { sharingEnabled } = useNetwork();
      if (sharingEnabled.value) {
        try {
          await invoke('publish_result', { score: finalScore, categoryScores: fullAnswers });
        } catch (e) {
          console.error('Failed to publish result to network:', e);
        }
      }
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
    _resumeDialogDismissed.value = false;
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
    saveLastSession,
    goalScore,
    init,
    resumeSession,
    startFresh,
    setSaveLastSession,
    setGoalScore,
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
