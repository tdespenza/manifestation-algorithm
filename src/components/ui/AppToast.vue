<template>
  <Teleport to="body">
    <div class="toast-stack" aria-live="polite" aria-atomic="false">
      <TransitionGroup name="toast">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          class="toast"
          :class="toast.type"
          role="status"
        >
          <span class="toast-icon">{{ icons[toast.type] }}</span>
          <span class="toast-message">{{ toast.message }}</span>
          <button class="toast-close" aria-label="Dismiss" @click="dismissToast(toast.id)">
            ✕
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { useToast } from '../../composables/useToast';

const { toasts, dismissToast } = useToast();

const icons: Record<string, string> = {
  success: '✓',
  error: '✕',
  info: 'ℹ'
};
</script>

<style scoped>
.toast-stack {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  z-index: 10000;
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  pointer-events: none;
  max-width: 360px;
}

.toast {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.75rem 1rem;
  border-radius: 10px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  font-size: 0.875rem;
  font-weight: 500;
  pointer-events: all;
  background: #fff;
  border-left: 4px solid #ccc;
}

.toast.success {
  border-left-color: #43a047;
  background: #f1fbf2;
  color: #1b5e20;
}

.toast.error {
  border-left-color: #d32f2f;
  background: #fff3f3;
  color: #b71c1c;
}

.toast.info {
  border-left-color: #1976d2;
  background: #e8f0fe;
  color: #0d47a1;
}

.toast-icon {
  font-size: 1rem;
  line-height: 1;
  flex-shrink: 0;
  font-weight: 700;
}

.toast-message {
  flex: 1;
  line-height: 1.4;
}

.toast-close {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 0.75rem;
  opacity: 0.5;
  padding: 0 0 0 4px;
  flex-shrink: 0;
  color: inherit;
  line-height: 1;
}

.toast-close:hover {
  opacity: 1;
}

/* Slide-in from right */
.toast-enter-active {
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.toast-leave-active {
  transition: all 0.2s cubic-bezier(0.4, 0, 1, 1);
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(80px);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(80px);
}
</style>
