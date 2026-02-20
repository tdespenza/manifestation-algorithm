<template>
  <div class="settings-panel">
    <div class="panel-header">
      <h2>App Settings</h2>
      <button @click="$emit('close')">X</button>
    </div>

    <div class="settings-group">
      <div class="setting-item">
        <span class="setting-label">Reset Progress</span>
        <button id="clear-answers-btn" class="btn btn-danger" @click="confirmClear">
          Clear All Answers
        </button>
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

const emit = defineEmits(['close']);
const appVersion = ref('...');
onMounted(async () => {
  try {
    appVersion.value = `v${await getVersion()}`;
  } catch {
    appVersion.value = 'v0.2.2';
  }
});

// Typo fix, was using string usage
const store = useQuestionnaireStore();

async function confirmClear() {
  if (confirm('Are you sure? This will delete all your answers.')) {
    await clearSession(store.sessionId);
    store.reset();
    store.init();
    emit('close');
  }
}
</script>

<style scoped>
.settings-panel {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 1rem;
}

.setting-label {
  font-weight: 500;
  color: #374151;
}

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
}

.btn-danger {
  background-color: var(--color-danger, #ef4444);
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
</style>
