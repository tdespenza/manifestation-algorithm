<template>
  <!-- Resume Dialog -->
  <ResumeDialog
    v-if="store.hasSavedSession"
    :is-historical="store.isHistoricalPreFill"
    @resume="store.resumeSession()"
    @fresh="store.startFresh()"
  />

  <div ref="containerRef" class="questionnaire" tabindex="-1" @keydown="handleGlobalKey">
    <!-- Sticky Header -->
    <div class="header">
      <div class="status-container">
        <div class="save-indicator" :class="{ saving: isSaving, saved: !isSaving }">
          {{ isSaving ? 'Saving...' : 'Saved' }}
        </div>
      </div>

      <!-- Progress bar -->
      <div class="progress-wrapper">
        <div class="progress-text">
          {{ store.percentComplete }}% complete ({{ answeredCount }}/{{ store.totalQuestions }})
        </div>
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: store.percentComplete + '%' }"></div>
        </div>
      </div>

      <div class="score-summary">
        <div class="max-info">Max: {{ maxScore.toLocaleString() }}</div>
        <div class="current-score" :class="{ success: score >= 5000 }">{{ formattedScore }}</div>
        <div class="score-label">Current Score</div>
      </div>
    </div>

    <!-- Question Navigation Mode toggle -->
    <div class="mode-toggle">
      <button :class="{ active: mode === 'scroll' }" @click="mode = 'scroll'">Scroll All</button>
      <button :class="{ active: mode === 'step' }" @click="mode = 'step'">Step by Step</button>
    </div>

    <!-- SCROLL MODE: show all questions -->
    <div v-if="mode === 'scroll'" class="questions-list">
      <div v-for="q in questions" :key="q.id" :ref="el => (questionRefs[q.id] = el as HTMLElement)">
        <QuestionItem :question="q" :highlighted="false" />
      </div>
    </div>

    <!-- STEP MODE: show one question at a time with prev/next nav -->
    <div v-else class="step-mode">
      <div class="step-header">
        <span class="step-counter"
          >Question {{ store.currentIndex + 1 }} of {{ store.totalQuestions }}</span
        >
      </div>
      <QuestionItem
        v-if="store.currentQuestion"
        :question="store.currentQuestion"
        :highlighted="true"
      />
      <!-- Navigation Controls -->
      <div class="nav-controls">
        <button
          class="nav-btn prev-btn"
          :disabled="store.currentIndex === 0"
          @click="store.goToPrev()"
        >
          ← Previous
        </button>
        <div class="dot-nav">
          <span
            v-for="(_, idx) in store.totalQuestions"
            :key="idx"
            class="dot"
            :class="{ active: idx === store.currentIndex, answered: isAnswered(idx) }"
            :title="`Question ${idx + 1}`"
            @click="store.goToIndex(idx)"
          ></span>
        </div>
        <button
          class="nav-btn next-btn"
          :disabled="store.currentIndex === store.totalQuestions - 1"
          @click="store.goToNext()"
        >
          Next →
        </button>
      </div>
      <div class="keyboard-hint">
        Tip: Use <kbd>←</kbd> <kbd>→</kbd> to navigate · <kbd>1</kbd>–<kbd>9</kbd> / <kbd>0</kbd> to
        rate
      </div>
    </div>

    <!-- Submit -->
    <div class="submit-actions">
      <div v-if="submitError" class="completion-hint error-hint">{{ submitError }}</div>
      <button class="submit-button" :disabled="isSubmitting" @click="submit">
        {{ isSubmitting ? 'Saving...' : 'Complete Assessment' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import { useQuestionnaireStore } from '../../stores/questionnaire';
import { questions as allTopLevelQuestions } from '../../data/questions';
import { getMaxPossibleScore } from '../../services/scoring';
import type { Question } from '../../types';
import QuestionItem from './QuestionItem.vue';
import ResumeDialog from './ResumeDialog.vue';

const store = useQuestionnaireStore();
const router = useRouter();
const containerRef = ref<HTMLElement | null>(null);
const questionRefs: Record<string, HTMLElement> = {};
const mode = ref<'scroll' | 'step'>('scroll');
const submitError = ref<string | null>(null);
const isSubmitting = ref(false);

// Flatten leaf questions for dot navigation
function flattenLeaves(qs: Question[]): Question[] {
  return qs.flatMap(q =>
    q.hasSubPoints && q.subPoints?.length ? flattenLeaves(q.subPoints) : [q]
  );
}
const leafQuestions = flattenLeaves(allTopLevelQuestions);

const isSaving = computed(() => store.isSaving);
const score = computed(() => store.score);
const maxScore = getMaxPossibleScore();
const formattedScore = computed(() => Math.round(score.value).toLocaleString());
const isComplete = computed(() => store.isComplete);
const answeredCount = computed(
  () => Object.keys(store.answers).filter(k => store.answers[k] >= 1).length
);

function isAnswered(idx: number): boolean {
  const q = leafQuestions[idx];
  return q ? (store.answers[q.id] ?? 0) >= 1 : false;
}

/** Keyboard navigation handler for step mode */
function handleGlobalKey(e: KeyboardEvent) {
  if (mode.value !== 'step') return;
  // Avoid interfering with slider focus
  const tag = (e.target as HTMLElement).tagName;
  if (tag === 'INPUT') return;

  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
    e.preventDefault();
    store.goToNext();
  } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
    e.preventDefault();
    store.goToPrev();
  } else if (e.key >= '1' && e.key <= '9') {
    const val = Number.parseInt(e.key);
    if (store.currentQuestion) store.setAnswer(store.currentQuestion.id, val);
  } else if (e.key === '0') {
    // '0' key = 10
    if (store.currentQuestion) store.setAnswer(store.currentQuestion.id, 10);
  }
}

const submit = async () => {
  // Allow submission even if 0% complete (defaults apply)
  // However, check isComplete just in case store logic changes later (currently always true)
  if (!isComplete.value || isSubmitting.value) return;

  submitError.value = null;
  isSubmitting.value = true;
  try {
    await store.submitSession();
    router.push('/dashboard');
  } catch (e) {
    submitError.value = 'Failed to save session: ' + e;
  } finally {
    isSubmitting.value = false;
  }
};

const questions = allTopLevelQuestions;

onMounted(async () => {
  await store.init();
  nextTick(() => containerRef.value?.focus());
});
</script>

<style scoped>
.questionnaire {
  outline: none;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  position: sticky;
  top: 0;
  background: rgba(255, 255, 255, 0.97);
  padding: 12px 20px;
  border-radius: 12px;
  z-index: 10;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(5px);
  gap: 16px;
}

.save-indicator {
  font-size: 0.85em;
  color: #888;
  display: flex;
  align-items: center;
  gap: 6px;
}

.save-indicator::before {
  content: '';
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #ccc;
  display: inline-block;
}

.save-indicator.saving::before {
  background: #ff9800;
  animation: pulse 1s infinite;
}

.save-indicator.saved::before {
  background: #4caf50;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.progress-wrapper {
  flex: 1;
  padding: 0 16px;
}

.progress-text {
  font-size: 0.8em;
  color: #666;
  margin-bottom: 6px;
}

.progress-bar {
  height: 6px;
  background: #e0e0e0;
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--true-cobalt, #0047ab);
  border-radius: 3px;
  transition: width 0.4s ease;
}

.score-summary {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.current-score {
  font-size: 2em;
  font-weight: 800;
  color: var(--true-cobalt, #0047ab);
  line-height: 1;
}

.current-score.success {
  color: #4caf50;
}
.score-label {
  font-size: 0.75em;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #666;
}
.max-info {
  font-size: 0.7em;
  color: #aaa;
}

/* Mode Toggle */
.mode-toggle {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
}

.mode-toggle button {
  padding: 6px 16px;
  border: 2px solid #ddd;
  border-radius: 20px;
  background: white;
  cursor: pointer;
  font-size: 0.85em;
  transition: all 0.2s;
}

.mode-toggle button.active {
  background: var(--true-cobalt, #0047ab);
  color: white;
  border-color: var(--true-cobalt, #0047ab);
}

/* Step Mode */
.step-mode {
  min-height: 300px;
}

.step-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.step-counter {
  font-size: 0.9em;
  color: #666;
  font-weight: 600;
}

/* Navigation Controls */
.nav-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
  gap: 16px;
}

.nav-btn {
  padding: 10px 24px;
  border-radius: 25px;
  border: 2px solid var(--true-cobalt, #0047ab);
  background: white;
  color: var(--true-cobalt, #0047ab);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.nav-btn:hover:not(:disabled) {
  background: var(--true-cobalt, #0047ab);
  color: white;
}

.nav-btn:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.dot-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  justify-content: center;
  max-width: 300px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #ddd;
  cursor: pointer;
  transition: all 0.2s;
}

.dot.answered {
  background: #a0beff;
}
.dot.active {
  background: var(--true-cobalt, #0047ab);
  transform: scale(1.3);
}

.keyboard-hint {
  text-align: center;
  font-size: 0.78em;
  color: #999;
  margin-top: 12px;
}

kbd {
  background: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 1px 5px;
  font-size: 0.9em;
}

/* Scroll Mode */
.questions-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Submit Area */
.submit-actions {
  margin: 40px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.completion-hint {
  color: #666;
  font-size: 0.9em;
  font-style: italic;
}
.error-hint {
  color: #e53935;
  font-style: normal;
  font-weight: 500;
}

.submit-button {
  padding: 15px 40px;
  background: var(--true-cobalt, #0047ab);
  color: white;
  border: none;
  border-radius: 30px;
  font-size: 1.2em;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 15px rgba(0, 71, 171, 0.3);
}

.submit-button:disabled {
  background: #ccc;
  cursor: not-allowed;
  box-shadow: none;
}

.submit-button:not(:disabled):hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 71, 171, 0.4);
}
</style>
