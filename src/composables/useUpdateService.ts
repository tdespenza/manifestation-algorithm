import { ref, onMounted, onUnmounted } from 'vue';
import { check } from '@tauri-apps/plugin-updater';
import { openUrl } from '@tauri-apps/plugin-opener';

export type UpdateState = 'idle' | 'ready';

/** Delay before the first update check (ms). Exported for test control. */
export const INITIAL_DELAY_MS = 3_000;

/** How often to re-check for updates after the first check (ms). */
export const CHECK_INTERVAL_MS = 60 * 60 * 1_000; // 1 hour

/** Release page URL — opened when the user clicks "Get Update". */
export const RELEASE_PAGE_URL = 'https://tdespenza.github.io/manifestation-algorithm/';

/** True when the page is running inside the Tauri shell. */
export function isTauri(): boolean {
  return typeof window !== 'undefined' && '__TAURI_INTERNALS__' in window;
}

/**
 * Background update-notification service.
 *
 * On mount it waits INITIAL_DELAY_MS, then calls checkForUpdates().
 * When a new release is found it transitions to 'ready' state so the UI
 * can show a banner directing users to the release download page.
 *
 * An hourly interval keeps looking for subsequent releases.
 */
export function useUpdateService() {
  const state = ref<UpdateState>('idle');
  const newVersion = ref('');
  const releaseNotes = ref('');
  const dismissed = ref(false);

  let initialTimer: ReturnType<typeof setTimeout> | null = null;
  let pollInterval: ReturnType<typeof setInterval> | null = null;

  /**
   * Check for a new release. When one is found, transition to ready state.
   * Skips silently when already ready or when not inside Tauri.
   */
  async function checkForUpdates(): Promise<void> {
    if (!isTauri()) return;
    // Don't check again while already displaying an update notification.
    if (state.value === 'ready') return;

    let update;
    try {
      update = await check();
    } catch (err) {
      console.error(err);
      // Silently swallow check() failures — update check errors must never
      // disrupt the app (e.g. offline, server unreachable).
      return;
    } finally {
      // Signal to E2E tests that the update check has run (regardless of result).
      // This flag lets tests replace time-based waits with condition-based waits.
      (window as unknown as Record<string, unknown>).__updateCheckDone = true;
    }
    if (!update) return;

    newVersion.value = update.version;
    releaseNotes.value = update.body ?? '';
    state.value = 'ready';
  }

  /**
   * Open the release page in the user's default browser so they can
   * download the new version.  Uses the Tauri opener plugin inside the
   * desktop shell and falls back to window.open() in a plain browser.
   */
  async function openReleasePage(): Promise<void> {
    try {
      if (isTauri()) {
        await openUrl(RELEASE_PAGE_URL);
      } else {
        window.open(RELEASE_PAGE_URL, '_blank');
      }
    } catch (err) {
      console.error(err);
    }
  }

  /** Dismiss the update banner without visiting the release page. */
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
    dismissed,
    openReleasePage,
    dismiss,
    checkForUpdates
  };
}
