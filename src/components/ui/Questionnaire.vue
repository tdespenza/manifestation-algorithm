<template>
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
        <div
          class="progress-bar"
          role="progressbar"
          :aria-valuenow="store.percentComplete"
          aria-valuemin="0"
          aria-valuemax="100"
          aria-label="Assessment completion progress"
        >
          <div class="progress-fill" :style="{ width: store.percentComplete + '%' }"></div>
        </div>
      </div>

      <div class="score-summary">
        <div class="max-info">Max: {{ maxScore.toLocaleString() }}</div>
        <div class="current-score" :class="{ success: answeredCount > 0 && score >= 5000 }">
          {{ formattedScore }}
        </div>
        <div class="score-label">
          {{ answeredCount === 0 ? 'Answer to score' : 'Current Score' }}
        </div>
        <div class="score-quality" :style="{ color: scoreQuality.color }">
          {{ scoreQuality.label }}
        </div>
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
      <button
        class="submit-button"
        :class="submitButtonState.cssClass"
        :disabled="isSubmitting"
        :title="submitButtonState.title"
        @click="submit"
      >
        {{ isSubmitting ? 'Saving...' : 'Complete Assessment' }}
      </button>
      <div v-if="!isSubmitting && !submitError" class="completion-hint">
        {{ submitButtonState.hint }}
      </div>
    </div>

    <!-- Reset danger zone -->
    <div class="reset-zone">
      <span class="reset-zone-label">Want to start fresh?</span>
      <button class="reset-btn" @click="showResetConfirm = true">Reset all answers</button>
    </div>

    <!-- Reset confirmation dialog -->
    <ConfirmDialog
      v-if="showResetConfirm"
      title="Reset All Answers?"
      message="This will clear every answer and start from scratch. This cannot be undone."
      confirm-label="Reset"
      cancel-label="Keep Answers"
      icon="🔄"
      uid="questionnaire-reset"
      @confirm="doReset"
      @cancel="showResetConfirm = false"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import { useQuestionnaireStore } from '../../stores/questionnaire';
import { questions as allTopLevelQuestions } from '../../data/questions';
import { getMaxPossibleScore } from '../../services/scoring';
import type { Question } from '../../types';
import QuestionItem from './QuestionItem.vue';
import ConfirmDialog from './ConfirmDialog.vue';

const store = useQuestionnaireStore();
const router = useRouter();
const containerRef = ref<HTMLElement | null>(null);
const questionRefs = reactive<Record<string, HTMLElement>>({});
const mode = ref<'scroll' | 'step'>('scroll');
const submitError = ref<string | null>(null);
const isSubmitting = ref(false);
const showResetConfirm = ref(false);

function doReset() {
  store.startFresh();
  showResetConfirm.value = false;
}

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
const answeredCount = computed(
  () => Object.keys(store.answers).filter(k => store.answers[k] >= 1).length
);
const formattedScore = computed(() =>
  answeredCount.value === 0 ? '--' : Math.round(score.value).toLocaleString()
);

const scoreQuality = computed(() => {
  if (answeredCount.value === 0) return { label: 'Not Started', color: '#94a3b8' };
  const pct = score.value / maxScore;
  if (pct >= 0.75) return { label: 'Manifesting ✦', color: '#1a8a3a' };
  if (pct >= 0.5) return { label: 'Aligned', color: '#0d7a5f' };
  if (pct >= 0.25) return { label: 'Building', color: '#6b5ca5' };
  return { label: 'Starting Out', color: '#94a3b8' };
});

const submitButtonState = computed(() => {
  const pct = store.percentComplete;
  const remaining = store.totalQuestions - answeredCount.value;
  if (answeredCount.value === 0) {
    return {
      cssClass: 'incomplete',
      title: 'Answer some questions to complete your assessment',
      hint: `0 of ${store.totalQuestions} questions answered — unanswered questions default to minimum`
    };
  }
  if (pct < 100) {
    return {
      cssClass: 'partial',
      title: `${remaining} question${remaining === 1 ? '' : 's'} remaining`,
      hint: `${remaining} question${remaining === 1 ? '' : 's'} remaining — unanswered questions default to minimum`
    };
  }
  return {
    cssClass: 'complete',
    title: 'Submit your completed assessment',
    hint: 'All questions answered — ready to submit!'
  };
});

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
  if (isSubmitting.value) return;

  submitError.value = null;
  isSubmitting.value = true;
  try {
    await store.submitSession();
    router.push('/dashboard');
  } catch (e) {
    console.error(e);
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
  margin-bottom: 20px;
  position: sticky;
  top: var(--navbar-height, 60px);
  background: rgba(255, 255, 255, 0.96);
  padding: 12px 20px;
  border-radius: 12px;
  z-index: 10;
  box-shadow: 0 2px 14px rgba(0, 0, 0, 0.07);
  backdrop-filter: blur(8px);
  gap: 16px;
  border: 1px solid rgba(255, 255, 255, 0.6);
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

.reset-zone {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 20px 0 28px;
  border-top: 1px dashed #e2e8f0;
  margin-top: 8px;
}

.reset-zone-label {
  font-size: 0.82em;
  color: var(--color-muted, #94a3b8);
  font-weight: 400;
}

.reset-btn {
  background: transparent;
  border: 1px solid transparent;
  border-radius: 6px;
  color: var(--color-muted, #94a3b8);
  font-size: 0.82em;
  font-weight: 500;
  cursor: pointer;
  padding: 5px 12px;
  letter-spacing: 0.01em;
  transition:
    color 0.18s,
    background 0.18s,
    border-color 0.18s;
}

.reset-btn::before {
  content: '↺ ';
  font-style: normal;
}

.reset-btn:hover {
  color: var(--color-danger, #dc2626);
  background: var(--color-danger-bg, rgba(220, 38, 38, 0.06));
  border-color: var(--color-danger-border, rgba(220, 38, 38, 0.25));
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
  background: var(--true-cobalt, #0a1f7d);
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
  color: var(--true-cobalt, #0a1f7d);
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
.score-quality {
  font-size: 0.72em;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-top: 2px;
}
.max-info {
  font-size: 0.7em;
  color: #aaa;
}

/* Mode Toggle — segmented pill */
.mode-toggle {
  display: inline-flex;
  background: #f0f2f8;
  border-radius: 25px;
  padding: 3px;
  margin-bottom: 24px;
  gap: 0;
}

.mode-toggle button {
  padding: 6px 18px;
  border: none;
  border-radius: 22px;
  background: transparent;
  cursor: pointer;
  font-size: 0.85em;
  font-weight: 600;
  color: #888;
  transition: all 0.18s ease;
}

.mode-toggle button.active {
  background: white;
  color: var(--true-cobalt, #0a1f7d);
  box-shadow: 0 2px 8px rgba(10, 31, 125, 0.14);
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
  border: 2px solid var(--true-cobalt, #0a1f7d);
  background: white;
  color: var(--true-cobalt, #0a1f7d);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.18s ease;
}

.nav-btn:hover:not(:disabled) {
  background: var(--true-cobalt, #0a1f7d);
  color: white;
}

.nav-btn:disabled {
  opacity: 0.3;
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
  background: #c0caf7;
}
.dot.active {
  background: var(--true-cobalt, #0a1f7d);
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

.submit-actions {
  margin: 40px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.completion-hint {
  color: #999;
  font-size: 0.85em;
}

.error-hint {
  color: #e53935;
  font-weight: 500;
}

.submit-button {
  padding: 14px 44px;
  background: var(--true-cobalt, #0a1f7d);
  color: white;
  border: none;
  border-radius: 32px;
  font-size: 1.05em;
  font-weight: 700;
  cursor: pointer;
  letter-spacing: 0.02em;
  transition: all 0.22s ease;
  box-shadow: 0 4px 18px rgba(10, 31, 125, 0.32);
}

.submit-button:disabled {
  background: #ccc;
  cursor: not-allowed;
  box-shadow: none;
}

.submit-button:not(:disabled):hover {
  transform: translateY(-2px);
  box-shadow: 0 7px 22px rgba(10, 31, 125, 0.42);
}

.submit-button.incomplete {
  background: var(--dusty-grape, #6061a4);
  opacity: 0.75;
  box-shadow: 0 4px 14px rgba(96, 97, 164, 0.28);
}

.submit-button.partial {
  background: linear-gradient(135deg, var(--dusty-grape, #6061a4), var(--true-cobalt, #0a1f7d));
}

.submit-button.complete {
  background: linear-gradient(135deg, var(--true-cobalt, #0a1f7d), #1a8a3a);
}

.submit-button.complete:not(:disabled):hover {
  box-shadow: 0 7px 24px rgba(26, 138, 58, 0.38);
}
</style>
