import { ref, onMounted, onUnmounted } from 'vue';
import { check } from '@tauri-apps/plugin-updater';
import { relaunch } from '@tauri-apps/plugin-process';

export type UpdateState = 'idle' | 'downloading' | 'ready' | 'error';

/** Delay before the first update check (ms). Exported for test control. */
export const INITIAL_DELAY_MS = 3_000;

/** How often to re-check for updates after the first check (ms). */
export const CHECK_INTERVAL_MS = 60 * 60 * 1_000; // 1 hour

/** True when the page is running inside the Tauri shell. */
export function isTauri(): boolean {
  return typeof window !== 'undefined' && '__TAURI_INTERNALS__' in window;
}

/**
 * Background auto-update service.
 *
 * On mount it waits INITIAL_DELAY_MS, then calls checkForUpdates().
 * If an update is found it immediately begins downloading + installing it in
 * the background — no user click required.  Once ready the caller should show
 * a "Restart Now" prompt.
 *
 * An hourly interval keeps looking for subsequent releases.
 */
export function useUpdateService() {
  const state = ref<UpdateState>('idle');
  const newVersion = ref('');
  const releaseNotes = ref('');
  const downloadProgress = ref(0);
  const errorMessage = ref('');
  const dismissed = ref(false);

  let initialTimer: ReturnType<typeof setTimeout> | null = null;
  let pollInterval: ReturnType<typeof setInterval> | null = null;

  /**
   * Check for an update and, if one exists, download + install it automatically.
   * Skips silently when already downloading or when not inside Tauri.
   */
  async function checkForUpdates(): Promise<void> {
    if (!isTauri()) return;
    // Don't start a second download while one is in progress or already done.
    if (state.value === 'downloading' || state.value === 'ready') return;

    let update;
    try {
      update = await check();
    } catch {
      // Silently swallow check() failures — update check errors must never
      // disrupt the app (e.g. offline, server unreachable).
      return;
    }
    if (!update) return;

    newVersion.value = update.version;
    releaseNotes.value = update.body ?? '';
    state.value = 'downloading';
    downloadProgress.value = 0;

    try {
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
    } catch (dlErr) {
      errorMessage.value = String(dlErr);
      state.value = 'error';
    }
  }

  /** Relaunch the app to apply the installed update. */
  async function restart(): Promise<void> {
    if (!isTauri()) return;
    try {
      await relaunch();
    } catch {
      // Fallback: keep the ready banner in case relaunch fails.
      state.value = 'ready';
    }
  }

  /** Dismiss the error or ready banner without restarting. */
  function dismiss(): void {
    dismissed.value = true;
  }

  onMounted(() => {
    if (!isTauri()) return;
    initialTimer = setTimeout(() => {
      void checkForUpdates();
      pollInterval = setInterval(() => void checkForUpdates(), CHECK_INTERVAL_MS);
    }, INITIAL_DELAY_MS);
  });

  onUnmounted(() => {
    if (initialTimer !== null) clearTimeout(initialTimer);
    if (pollInterval !== null) clearInterval(pollInterval);
  });

  return {
    state,
    newVersion,
    releaseNotes,
    downloadProgress,
    errorMessage,
    dismissed,
    restart,
    dismiss,
    checkForUpdates
  };
}
