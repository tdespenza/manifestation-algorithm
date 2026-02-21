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

onMounted(async () => {
  try {
    appVersion.value = `v${await getVersion()}`;
  } catch {
    appVersion.value = 'v0.2.2';
  }
});

const store = useQuestionnaireStore();

function requestClear() {
  clearConfirmVisible.value = true;
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
  color: #999;
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
  color: #888;
}

.btn-danger {
  background-color: #ef4444;
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
  background-color: #dc2626;
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
  color: #aaa;
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
  color: #bbb;
  font-size: 0.8rem;
}
</style>
