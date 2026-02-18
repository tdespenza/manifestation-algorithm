<template>
  <div class="header">
    <div class="status-container">
      <div class="save-indicator" :class="{ saving: isSaving, saved: !isSaving }">
        {{ isSaving ? 'Saving...' : 'Saved' }}
      </div>
    </div>
    <div class="score-summary">
      <div class="max-info">Max: 10,000</div>
      <div class="current-score" :class="{ success: score >= 5000 }">
        {{ formattedScore }}
      </div>
      <div class="score-label">Current Score</div>
    </div>
  </div>

  <div class="questions-list">
    <div v-for="q in questions" :key="q.id">
      <QuestionItem :question="q" />
    </div>
  </div>

  <div class="submit-actions">
    <div v-if="!isComplete" class="completion-hint">
      Complete all questions to save results.
    </div>
    <button 
      class="submit-button"
      :disabled="!isComplete"
      @click="submit"
    >
      {{ isComplete ? 'Complete Assessment' : 'Assessment Incomplete' }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useQuestionnaireStore } from '../../stores/questionnaire';
import { questions } from '../../data/questions';
import QuestionItem from './QuestionItem.vue';

const store = useQuestionnaireStore();
// Use store state for persistence feedback
const isSaving = computed(() => store.isSaving);

const score = computed(() => store.score);
const formattedScore = computed(() => Math.round(score.value).toLocaleString());
const isComplete = computed(() => store.isComplete);

const submit = async () => {
  if (!isComplete.value) return;
  if (!confirm('Are you sure you want to complete this session?')) return;
  
  try {
    await store.submitSession();
    alert('Session saved successfully!');
    // Ideally navigate to history/dashboard
  } catch (e) {
    alert('Failed to save session: ' + e);
  }
};

// Initialization
onMounted(async () => {
  await store.init();
});
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  position: sticky;
  top: 0;
  background: rgba(255, 255, 255, 0.95);
  padding: 15px 20px;
  border-radius: 12px;
  z-index: 10;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
  backdrop-filter: blur(5px);
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
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
}

.score-summary {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.current-score {
  font-size: 2em;
  font-weight: 800;
  color: var(--true-cobalt);
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
  gap: 15px;
}

.completion-hint {
  color: #666;
  font-size: 0.9em;
  font-style: italic;
}

.submit-button {
  padding: 15px 40px;
  background: var(--true-cobalt, #0047AB);
  color: white;
  border: none;
  border-radius: 30px;
  font-size: 1.2em;
  cursor: pointer;
  transition: all 0.3s ease;
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
