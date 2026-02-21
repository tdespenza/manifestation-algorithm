<script setup lang="ts">
import { useUpdateService } from '@/composables/useUpdateService';

const {
  state,
  newVersion,
  releaseNotes,
  downloadProgress,
  errorMessage,
  dismissed,
  restart,
  dismiss
} = useUpdateService();
</script>

<template>
  <Transition name="update-banner">
    <div
      v-if="!dismissed && state !== 'idle'"
      class="update-banner"
      :class="state"
      role="status"
      aria-live="polite"
    >
      <!-- Downloading (auto-starts when update is found) -->
      <template v-if="state === 'downloading'">
        <span class="update-icon downloading-icon">⬇️</span>
        <span class="update-text">
          <strong>Downloading v{{ newVersion }}…</strong>
          <span class="update-notes">Update is being installed in the background</span>
        </span>
        <div class="update-progress-wrap">
          <div class="update-progress-bar">
            <div class="update-progress-fill" :style="{ width: downloadProgress + '%' }" />
          </div>
          <span class="update-pct">{{ downloadProgress }}%</span>
        </div>
      </template>

      <!-- Ready to restart -->
      <template v-else-if="state === 'ready'">
        <span class="update-icon">🚀</span>
        <span class="update-text">
          <strong>v{{ newVersion }} ready to launch!</strong>
          <span class="update-notes">{{
            releaseNotes || 'Restart the app to apply the update.'
          }}</span>
        </span>
        <div class="update-actions">
          <button class="btn-primary" @click="restart">Restart Now</button>
          <button class="btn-dismiss" aria-label="Dismiss" @click="dismiss">✕</button>
        </div>
      </template>

      <!-- Error -->
      <template v-else-if="state === 'error'">
        <span class="update-icon">⚠️</span>
        <span class="update-text">
          <strong>Update failed.</strong>
          <span class="update-notes">{{ errorMessage }}</span>
        </span>
        <button class="btn-dismiss" aria-label="Dismiss" @click="dismiss">✕</button>
      </template>
    </div>
  </Transition>
</template>

<style scoped>
.update-banner {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.6rem 1rem;
  font-size: 0.84rem;
  font-weight: 500;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  background: #e8f4fd;
  color: #0d47a1;
}

.update-banner.error {
  background: #fff3e0;
  color: #e65100;
}

.update-banner.ready {
  background: linear-gradient(135deg, #e8f5e9 0%, #f1fbf2 100%);
  color: #1b5e20;
  border-bottom-color: rgba(46, 125, 50, 0.15);
}

.update-icon {
  font-size: 1.05rem;
  flex-shrink: 0;
}

.downloading-icon {
  animation: bounce-down 0.9s ease-in-out infinite;
}

@keyframes bounce-down {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(3px);
  }
}

.update-text {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  flex: 1;
  min-width: 0;
}

.update-notes {
  font-weight: 400;
  opacity: 0.8;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.update-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
}

.btn-primary {
  background: #1565c0;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 0.3rem 0.85rem;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s;
}
.btn-primary:hover {
  background: #0d47a1;
}

.btn-dismiss {
  background: transparent;
  border: none;
  cursor: pointer;
  color: inherit;
  opacity: 0.55;
  font-size: 0.85rem;
  padding: 0.2rem 0.4rem;
  border-radius: 3px;
  transition: opacity 0.15s;
}
.btn-dismiss:hover {
  opacity: 1;
}

/* Progress bar */
.update-progress-wrap {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
  min-width: 120px;
}
.update-progress-bar {
  flex: 1;
  height: 6px;
  border-radius: 3px;
  background: rgba(0, 0, 0, 0.12);
  overflow: hidden;
}
.update-progress-fill {
  height: 100%;
  background: #1565c0;
  border-radius: 3px;
  transition: width 0.2s;
}
.update-pct {
  font-size: 0.75rem;
  font-weight: 600;
  min-width: 35px;
  text-align: right;
}

/* Transition */
.update-banner-enter-active,
.update-banner-leave-active {
  transition:
    max-height 0.3s ease,
    opacity 0.3s ease;
  overflow: hidden;
  max-height: 80px;
}
.update-banner-enter-from,
.update-banner-leave-to {
  max-height: 0;
  opacity: 0;
}
</style>
