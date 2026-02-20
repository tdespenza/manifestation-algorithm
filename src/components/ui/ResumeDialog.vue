<template>
  <div class="overlay">
    <dialog open class="dialog" aria-labelledby="resume-title">
      <div class="icon">{{ isHistorical ? '📋' : '💡' }}</div>
      <h2 id="resume-title">
        {{ isHistorical ? 'Continue from Last Session?' : 'Welcome Back!' }}
      </h2>

      <p v-if="isHistorical">
        Your answers from your <strong>last completed session</strong> have been pre-loaded. Would
        you like to keep those values as a starting point, or begin with a completely blank
        questionnaire?
      </p>
      <p v-else>
        You have a session in progress. Would you like to resume where you left off, or start a
        fresh assessment?
      </p>

      <div v-if="confirmingFresh" class="confirm-zone">
        <p class="confirm-warning">⚠️ This will clear all current answers. Are you sure?</p>
        <div class="actions">
          <button class="btn-danger" @click="$emit('fresh')">Yes, Start Fresh</button>
          <button class="btn-secondary" @click="confirmingFresh = false">Cancel</button>
        </div>
      </div>
      <div v-else class="actions">
        <button class="btn-primary" @click="$emit('resume')">
          {{ isHistorical ? 'Keep Last Values' : 'Resume Session' }}
        </button>
        <button class="btn-secondary" @click="confirmingFresh = true">Start Fresh</button>
      </div>
    </dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

defineProps<{ isHistorical?: boolean }>();
defineEmits<{ (e: 'resume'): void; (e: 'fresh'): void }>();

const confirmingFresh = ref(false);
</script>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
}

.dialog {
  background: white;
  border: none;
  border-radius: 20px;
  padding: 40px;
  max-width: 420px;
  width: 90%;
  text-align: center;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  animation: slideUp 0.3s ease;
  /* Reset native <dialog> margin: auto so the flex parent owns centering */
  margin: 0;
  position: static;
}

@keyframes slideUp {
  from {
    transform: translateY(30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.icon {
  font-size: 3em;
  margin-bottom: 12px;
}

h2 {
  font-size: 1.5em;
  font-weight: 700;
  color: #0a1f7d;
  margin-bottom: 12px;
}

p {
  color: #555;
  line-height: 1.6;
  margin-bottom: 28px;
}

.actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-primary {
  padding: 12px 28px;
  background: var(--true-cobalt, #0047ab);
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 1em;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 12px rgba(0, 71, 171, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(0, 71, 171, 0.4);
}

.btn-secondary {
  padding: 12px 28px;
  background: transparent;
  color: #c0392b;
  border: 2px solid #c0392b;
  border-radius: 25px;
  font-size: 1em;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-secondary:hover {
  background: #c0392b;
  color: white;
}

.confirm-zone {
  margin-top: 8px;
  animation: fadeConfirm 0.2s ease;
}

@keyframes fadeConfirm {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.confirm-warning {
  font-size: 0.9em;
  color: #b71c1c;
  background: #fff3f3;
  border: 1px solid #ffcdd2;
  border-radius: 8px;
  padding: 10px 14px;
  margin-bottom: 16px;
}

.btn-danger {
  padding: 12px 28px;
  background: #d32f2f;
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 1em;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 12px rgba(211, 47, 47, 0.3);
}

.btn-danger:hover {
  background: #b71c1c;
  transform: translateY(-1px);
}
</style>
