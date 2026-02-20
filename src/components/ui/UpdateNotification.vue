<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { check } from '@tauri-apps/plugin-updater';
import { relaunch } from '@tauri-apps/plugin-process';

type UpdateState = 'idle' | 'available' | 'downloading' | 'ready' | 'error';

const state = ref<UpdateState>('idle');
const newVersion = ref('');
const releaseNotes = ref('');
const downloadProgress = ref(0);
const errorMessage = ref('');
const dismissed = ref(false);

// Only runs inside the Tauri shell — not in a plain browser.
const isTauri = () => typeof window !== 'undefined' && '__TAURI_INTERNALS__' in window;

onMounted(async () => {
  if (!isTauri()) return;

  // Small delay so it doesn't block app startup UI.
  await new Promise(r => setTimeout(r, 3000));

  try {
    const update = await check();
    if (!update) return;

    newVersion.value = update.version;
    releaseNotes.value = update.body ?? '';
    state.value = 'available';
  } catch (err) {
    // Silently swallow — updater failures must never break the app.
    console.warn('[updater] check failed:', err);
  }
});

async function install() {
  if (!isTauri()) return;
  state.value = 'downloading';
  downloadProgress.value = 0;

  try {
    const update = await check();
    if (!update) return;

    let downloaded = 0;
    let total = 0;

    await update.downloadAndInstall(event => {
      if (event.event === 'Started') {
        total = event.data.contentLength ?? 0;
      } else if (event.event === 'Progress') {
        downloaded += event.data.chunkLength;
        downloadProgress.value = total > 0 ? Math.round((downloaded / total) * 100) : 0;
      } else if (event.event === 'Finished') {
        downloadProgress.value = 100;
      }
    });

    state.value = 'ready';
  } catch (err) {
    errorMessage.value = String(err);
    state.value = 'error';
  }
}

async function restart() {
  if (!isTauri()) return;
  try {
    await relaunch();
  } catch {
    // Fallback: let the user restart manually.
    state.value = 'ready';
  }
}
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
      <!-- Available -->
      <template v-if="state === 'available'">
        <span class="update-icon">🆕</span>
        <span class="update-text">
          <strong>Update available — v{{ newVersion }}</strong>
          <span v-if="releaseNotes" class="update-notes">{{ releaseNotes }}</span>
        </span>
        <div class="update-actions">
          <button class="btn-primary" @click="install">Update Now</button>
          <button class="btn-dismiss" aria-label="Dismiss" @click="dismissed = true">✕</button>
        </div>
      </template>

      <!-- Downloading -->
      <template v-else-if="state === 'downloading'">
        <span class="update-icon">⬇️</span>
        <span class="update-text">
          <strong>Downloading update…</strong>
          <span class="update-notes">v{{ newVersion }}</span>
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
        <span class="update-icon">✅</span>
        <span class="update-text">
          <strong>v{{ newVersion }} installed!</strong>
          <span class="update-notes">Restart the app to apply the update.</span>
        </span>
        <div class="update-actions">
          <button class="btn-primary" @click="restart">Restart Now</button>
          <button class="btn-dismiss" aria-label="Dismiss" @click="dismissed = true">✕</button>
        </div>
      </template>

      <!-- Error -->
      <template v-else-if="state === 'error'">
        <span class="update-icon">⚠️</span>
        <span class="update-text">
          <strong>Update failed.</strong>
          <span class="update-notes">{{ errorMessage }}</span>
        </span>
        <button class="btn-dismiss" aria-label="Dismiss" @click="dismissed = true">✕</button>
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
  background: #f1fbf2;
  color: #1b5e20;
}

.update-icon {
  font-size: 1.05rem;
  flex-shrink: 0;
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
