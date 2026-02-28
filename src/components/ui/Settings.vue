<template>
  <div class="settings-panel">
    <ConfirmDialog
      v-if="clearConfirmVisible"
      title="Clear All Answers"
      message="This will permanently delete all your current answers and cannot be undone."
      confirm-label="Clear"
      cancel-label="Keep Answers"
      icon="🗑️"
      uid="settings-clear"
      @confirm="doClear"
      @cancel="clearConfirmVisible = false"
    />

    <div class="panel-header">
      <h2>App Settings</h2>
      <button class="btn-close" aria-label="Close settings" @click="$emit('close')">×</button>
    </div>

    <div class="settings-group">
      <div class="settings-section">
        <h3 class="section-title">Data Management</h3>
        <div class="setting-item">
          <div class="setting-info">
            <span class="setting-label">Save Last Session</span>
            <span class="setting-desc"
              >Pre-fill answers from your most recent completed session.</span
            >
          </div>
          <button
            class="btn-toggle"
            :class="{ active: store.saveLastSession }"
            aria-label="Toggle save last session"
            @click="store.setSaveLastSession(!store.saveLastSession)"
          >
            <span class="toggle-track" aria-hidden="true"><span class="toggle-thumb"></span></span>
            <span class="toggle-text-val">{{ store.saveLastSession ? 'On' : 'Off' }}</span>
          </button>
        </div>
        <div class="setting-item">
          <div class="setting-info">
            <span class="setting-label">Reset Progress</span>
            <span class="setting-desc">Delete all saved answers and start fresh.</span>
          </div>
          <button id="clear-answers-btn" class="btn btn-danger" @click="requestClear">
            Clear All Answers
          </button>
        </div>
      </div>

      <div class="settings-section">
        <h3 class="section-title">Goals</h3>
        <div class="setting-item goal-setting-item">
          <div class="setting-info">
            <span class="setting-label">Target Score</span>
            <span class="setting-desc"
              >Set a goal score (1,000–10,000) to track your progress on the dashboard.</span
            >
          </div>
          <div class="goal-input-row">
            <input
              id="goal-score-input"
              v-model="goalInput"
              type="number"
              min="1000"
              max="10000"
              step="100"
              placeholder="e.g. 7500"
              class="goal-input"
              aria-label="Target score"
              @keyup.enter="saveGoal"
            />
            <button class="btn btn-primary btn-sm" @click="saveGoal">Set</button>
            <button
              v-if="store.goalScore !== null"
              class="btn btn-sm btn-secondary"
              @click="clearGoal"
            >
              Clear
            </button>
          </div>
          <p v-if="goalError" class="goal-error" role="alert">{{ goalError }}</p>
          <p v-if="store.goalScore !== null" class="goal-current">
            Current target: <strong>{{ store.goalScore.toLocaleString() }}</strong>
          </p>
        </div>
      </div>

      <div class="setting-about">
        <p>Manifestation Algorithm {{ appVersion }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getVersion } from '@tauri-apps/api/app';
import { useQuestionnaireStore } from '../../stores/questionnaire';
import { clearSession } from '../../services/db';
import ConfirmDialog from './ConfirmDialog.vue';

const emit = defineEmits(['close']);
const appVersion = ref('...');
const clearConfirmVisible = ref(false);
const goalInput = ref('');
const goalError = ref('');

onMounted(async () => {
  try {
    appVersion.value = `v${await getVersion()}`;
  } catch (err) {
    console.error(err);
    appVersion.value = 'v0.2.2';
  }
  // Sync goal input with stored setting
  goalInput.value = store.goalScore !== null ? store.goalScore.toString() : '';
});

const store = useQuestionnaireStore();

function requestClear() {
  clearConfirmVisible.value = true;
}

async function saveGoal() {
  goalError.value = '';
  const raw = goalInput.value.trim();
  if (!raw) {
    await store.setGoalScore(null);
    return;
  }
  const parsed = parseInt(raw, 10);
  if (isNaN(parsed) || parsed < 1000 || parsed > 10000) {
    goalError.value = 'Please enter a score between 1,000 and 10,000.';
    return;
  }
  await store.setGoalScore(parsed);
}

async function clearGoal() {
  goalInput.value = '';
  goalError.value = '';
  await store.setGoalScore(null);
}

async function doClear() {
  clearConfirmVisible.value = false;
  await clearSession(store.sessionId);
  store.reset();
  await store.init();
  emit('close');
}
</script>

<style scoped>
.settings-panel {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 1rem;
}

.panel-header h2 {
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--true-cobalt, #0a1f7d);
  margin: 0;
}

.btn-close {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: none;
  background: #f5f5f5;
  color: #666;
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    background 0.15s,
    color 0.15s;
  line-height: 1;
}

.btn-close:hover {
  background: #ffe8e8;
  color: #d32f2f;
}

.settings-group {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.settings-section {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.section-title {
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #4b5563;
  margin-bottom: 0.75rem;
}

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #fafafa;
  border-radius: 10px;
  border: 1px solid #f0f0f0;
  gap: 1rem;
}

.setting-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.setting-label {
  font-weight: 600;
  color: #1a1a2e;
  font-size: 0.95rem;
}

.setting-desc {
  font-size: 0.82rem;
  color: #4b5563;
}

.btn-danger {
  background-color: #b91c1c;
  color: white;
  padding: 0.5rem 1.1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.88rem;
  white-space: nowrap;
  transition: background 0.15s;
}

.btn-danger:hover {
  background-color: #991b1b;
}

.btn-toggle {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  flex-shrink: 0;
}

.toggle-track {
  width: 48px;
  height: 27px;
  border-radius: 14px;
  background: #d1d5db;
  transition: background 0.25s ease;
  display: flex;
  align-items: center;
  padding: 2px;
  flex-shrink: 0;
}

.toggle-thumb {
  width: 23px;
  height: 23px;
  border-radius: 50%;
  background: white;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.22);
  transition: transform 0.25s ease;
}

.btn-toggle.active .toggle-track {
  background: var(--true-cobalt, #0a1f7d);
}

.btn-toggle.active .toggle-thumb {
  transform: translateX(21px);
}

.toggle-text-val {
  font-size: 0.82rem;
  font-weight: 600;
  color: #4b5563;
  min-width: 22px;
  transition: color 0.2s;
}

.btn-toggle.active .toggle-text-val {
  color: var(--true-cobalt, #0a1f7d);
}

.setting-about {
  text-align: center;
  padding: 0.5rem 0;
}

.setting-about p {
  color: #4b5563;
  font-size: 0.8rem;
}

/* ── Goal score ─────────────────────────────────────────────────────────── */

.goal-setting-item {
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
}

.goal-input-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.goal-input {
  width: 110px;
  padding: 6px 10px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.9rem;
  color: #374151;
}

.goal-input:focus {
  outline: none;
  border-color: var(--true-cobalt, #0a1f7d);
  box-shadow: 0 0 0 2px rgba(10, 31, 125, 0.15);
}

.btn-sm {
  padding: 6px 14px;
  font-size: 0.82rem;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  transition: background 0.15s ease;
}

.btn-primary {
  background: var(--true-cobalt, #0a1f7d);
  color: white;
}

.btn-primary:hover {
  background: #0d2699;
}

.btn-secondary {
  background: #f3f4f6;
  color: #374151;
  border: 1px solid #d1d5db;
}

.btn-secondary:hover {
  background: #e5e7eb;
}

.goal-error {
  font-size: 0.8rem;
  color: #dc2626;
  margin: 0;
}

.goal-current {
  font-size: 0.82rem;
  color: #6b7280;
  margin: 0;
}
</style>
