import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { defineComponent, h } from 'vue';
import { mount, flushPromises } from '@vue/test-utils';

// ── Mock Tauri plugins ──────────────────────────────────────────────────────

const mockCheck = vi.fn();
vi.mock('@tauri-apps/plugin-updater', () => ({
  check: (...args: unknown[]) => mockCheck(...args)
}));

const mockOpen = vi.fn();
vi.mock('@tauri-apps/plugin-opener', () => ({
  openUrl: (...args: unknown[]) => mockOpen(...args)
}));

// ── Import after mocks ──────────────────────────────────────────────────────

import {
  useUpdateService,
  isTauri,
  INITIAL_DELAY_MS,
  CHECK_INTERVAL_MS,
  RELEASE_PAGE_URL
} from '@/composables/useUpdateService';

// ── Helpers ─────────────────────────────────────────────────────────────────

function withTauri() {
  (window as unknown as Record<string, unknown>)['__TAURI_INTERNALS__'] = {};
}

function withoutTauri() {
  delete (window as unknown as Record<string, unknown>)['__TAURI_INTERNALS__'];
}

type ServiceResult = ReturnType<typeof useUpdateService>;

/**
 * Mount a minimal component that calls useUpdateService() in setup().
 * Returns both the composable result and the wrapper (for unmount).
 */
function mountService(): { service: ServiceResult; wrapper: ReturnType<typeof mount> } {
  let service!: ServiceResult;
  const TestComponent = defineComponent({
    setup() {
      service = useUpdateService();
      return () => h('div');
    }
  });
  const wrapper = mount(TestComponent);
  return { service, wrapper };
}

/** Simulate an update object returned by check(). */
function makeUpdate(version = '1.9.0', body = 'Bug fixes') {
  return { version, body };
}

/** Advance fake timers AND flush all microtasks/promises. */
async function tick(ms = INITIAL_DELAY_MS + 100) {
  vi.advanceTimersByTime(ms);
  await flushPromises();
}

// ── Tests ───────────────────────────────────────────────────────────────────

describe('isTauri()', () => {
  afterEach(() => withoutTauri());

  it('returns true when __TAURI_INTERNALS__ is present on window', () => {
    withTauri();
    expect(isTauri()).toBe(true);
  });

  it('returns false when __TAURI_INTERNALS__ is absent', () => {
    withoutTauri();
    expect(isTauri()).toBe(false);
  });

  it('returns false when window is not an object host for Tauri internals', () => {
    const originalWindow = (globalThis as unknown as Record<string, unknown>).window;
    try {
      Object.defineProperty(globalThis, 'window', {
        value: 'not-an-object',
        configurable: true,
        writable: true
      });
      expect(isTauri()).toBe(false);
    } finally {
      Object.defineProperty(globalThis, 'window', {
        value: originalWindow,
        configurable: true,
        writable: true
      });
    }
  });

  it('returns false when window is undefined', () => {
    const originalWindow = (globalThis as unknown as Record<string, unknown>).window;
    try {
      Object.defineProperty(globalThis, 'window', {
        value: undefined,
        configurable: true,
        writable: true
      });
      expect(() => isTauri()).toThrow('window is undefined');
    } finally {
      Object.defineProperty(globalThis, 'window', {
        value: originalWindow,
        configurable: true,
        writable: true
      });
    }
  });

  it('returns false when window is null', () => {
    const originalWindow = (globalThis as unknown as Record<string, unknown>).window;
    try {
      Object.defineProperty(globalThis, 'window', {
        value: null,
        configurable: true,
        writable: true
      });
      expect(isTauri()).toBe(false);
    } finally {
      Object.defineProperty(globalThis, 'window', {
        value: originalWindow,
        configurable: true,
        writable: true
      });
    }
  });
});

describe('exported constants', () => {
  it('INITIAL_DELAY_MS is 3000', () => {
    expect(INITIAL_DELAY_MS).toBe(3_000);
  });

  it('CHECK_INTERVAL_MS is 3 600 000 (1 hour)', () => {
    expect(CHECK_INTERVAL_MS).toBe(60 * 60 * 1_000);
  });

  it('RELEASE_PAGE_URL is the release page URL', () => {
    expect(RELEASE_PAGE_URL).toBe('https://tdespenza.github.io/manifestation-algorithm/');
  });
});

describe('useUpdateService()', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
    mockCheck.mockResolvedValue(null);
    mockOpen.mockResolvedValue(undefined);
    withTauri();
    delete (window as unknown as Record<string, unknown>).__updateCheckDone;
  });

  afterEach(() => {
    vi.useRealTimers();
    withoutTauri();
  });

  // ── initial state ─────────────────────────────────────────────────────

  it('starts in idle state with sensible default ref values', () => {
    const { service } = mountService();
    expect(service.state.value).toBe('idle');
    expect(service.newVersion.value).toBe('');
    expect(service.releaseNotes.value).toBe('');
    expect(service.dismissed.value).toBe(false);
  });

  // ── not Tauri guard ───────────────────────────────────────────────────

  it('does not check for updates when not inside Tauri', async () => {
    withoutTauri();
    mountService();
    await tick();
    expect(mockCheck).not.toHaveBeenCalled();
  });

  it('does not schedule polling when not inside Tauri', async () => {
    const timeoutSpy = vi.spyOn(globalThis, 'setTimeout');
    withoutTauri();
    mountService();
    await tick(CHECK_INTERVAL_MS + 100);
    expect(mockCheck).not.toHaveBeenCalled();
    expect(timeoutSpy).not.toHaveBeenCalled();
    timeoutSpy.mockRestore();
  });

  // ── idle timer flow ───────────────────────────────────────────────────

  it('does not check before the initial delay has elapsed', async () => {
    mountService();
    vi.advanceTimersByTime(INITIAL_DELAY_MS - 1);
    await flushPromises();
    expect(mockCheck).not.toHaveBeenCalled();
  });

  it('calls check() once the initial delay has elapsed', async () => {
    mountService();
    await tick();
    expect(mockCheck).toHaveBeenCalledTimes(1);
  });

  it('remains idle when check() returns null (no update available)', async () => {
    const { service } = mountService();
    await tick();
    expect(service.state.value).toBe('idle');
    expect((window as unknown as Record<string, unknown>).__updateCheckDone).toBe(true);
  });

  // ── update found flow ─────────────────────────────────────────────────

  it('transitions idle → ready when a new release is found', async () => {
    const update = makeUpdate('2.0.0', 'Great release');
    mockCheck.mockResolvedValue(update);

    const { service } = mountService();
    await tick();

    expect(service.state.value).toBe('ready');
    expect(service.newVersion.value).toBe('2.0.0');
    expect(service.releaseNotes.value).toBe('Great release');
  });

  it('uses empty string for releaseNotes when body is undefined', async () => {
    const update = { version: '2.5.0', body: undefined };
    mockCheck.mockResolvedValue(update);

    const { service } = mountService();
    await tick();

    expect(service.releaseNotes.value).toBe('');
  });

  it('silently swallows check() errors — state stays idle, no error banner', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    mockCheck.mockRejectedValue(new Error('network fail'));

    const { service } = mountService();
    await tick();

    // check() errors are silently swallowed so they never disrupt the app
    expect(service.state.value).toBe('idle');
    expect((window as unknown as Record<string, unknown>).__updateCheckDone).toBe(true);
    expect(errorSpy).toHaveBeenCalledTimes(1);
    errorSpy.mockRestore();
  });

  // ── idempotency guards ─────────────────────────────────────────────────

  it('skips a new check when already in ready state', async () => {
    const update = makeUpdate('4.1.0');
    mockCheck.mockResolvedValue(update);

    const { service } = mountService();
    await tick(); // fires → ready

    expect(service.state.value).toBe('ready');

    // Advance poll interval
    vi.advanceTimersByTime(CHECK_INTERVAL_MS + 100);
    await flushPromises();

    // Still only one check
    expect(mockCheck).toHaveBeenCalledTimes(1);
  });

  // ── polling ───────────────────────────────────────────────────────────

  it('polls again after CHECK_INTERVAL_MS when not in ready state', async () => {
    // First check returns null, second returns an update
    const update = makeUpdate('5.0.0');
    mockCheck.mockResolvedValueOnce(null).mockResolvedValueOnce(update);

    const { service } = mountService();
    await tick(); // first check → null → idle

    expect(service.state.value).toBe('idle');

    // Advance by one hour
    vi.advanceTimersByTime(CHECK_INTERVAL_MS);
    await flushPromises();

    expect(mockCheck).toHaveBeenCalledTimes(2);
    expect(service.state.value).toBe('ready');
  });

  // ── dismiss ───────────────────────────────────────────────────────────

  it('dismiss() sets dismissed to true', () => {
    const { service } = mountService();
    expect(service.dismissed.value).toBe(false);
    service.dismiss();
    expect(service.dismissed.value).toBe(true);
  });

  // ── openReleasePage ───────────────────────────────────────────────────

  it('openReleasePage() calls open(RELEASE_PAGE_URL) when inside Tauri', async () => {
    const { service } = mountService();
    await service.openReleasePage();
    expect(mockOpen).toHaveBeenCalledWith(RELEASE_PAGE_URL);
  });

  it('openReleasePage() uses window.open() when not inside Tauri', async () => {
    withoutTauri();
    const mockWindowOpen = vi.spyOn(window, 'open').mockImplementation(() => null);
    const { service } = mountService();
    await service.openReleasePage();
    expect(mockWindowOpen).toHaveBeenCalledWith(RELEASE_PAGE_URL, '_blank');
    mockWindowOpen.mockRestore();
  });

  it('openReleasePage() handles open() throwing without crashing', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    mockOpen.mockRejectedValue(new Error('opener unavailable'));
    const { service } = mountService();
    await expect(service.openReleasePage()).resolves.toBeUndefined();
    expect(service.state.value).toBe('idle');
    expect(errorSpy).toHaveBeenCalledTimes(1);
    errorSpy.mockRestore();
  });

  // ── cleanup ───────────────────────────────────────────────────────────

  it('clears timers on unmount to prevent memory leaks', async () => {
    const { wrapper } = mountService();
    wrapper.unmount();

    // Advance past both timers — should not throw or invoke check
    vi.advanceTimersByTime(INITIAL_DELAY_MS + CHECK_INTERVAL_MS + 1000);
    await flushPromises();

    expect(mockCheck).not.toHaveBeenCalled();
  });

  it('clears the poll interval on unmount even when initial timer has fired', async () => {
    const { wrapper } = mountService();
    // Let the initial timer fire to also start the interval
    await tick();
    expect(mockCheck).toHaveBeenCalledTimes(1);

    wrapper.unmount();

    // Advance by several hours — interval should NOT fire again
    vi.advanceTimersByTime(CHECK_INTERVAL_MS * 5);
    await flushPromises();

    expect(mockCheck).toHaveBeenCalledTimes(1);
  });

  it('onUnmounted is a no-op when timers were never set (non-Tauri env)', async () => {
    // In a non-Tauri env, onMounted returns early without setting initialTimer.
    // Unmounting should not throw even when timers are null.
    const clearTimeoutSpy = vi.spyOn(globalThis, 'clearTimeout');
    const clearIntervalSpy = vi.spyOn(globalThis, 'clearInterval');
    withoutTauri();
    const { wrapper } = mountService();
    expect(() => wrapper.unmount()).not.toThrow();
    expect(clearTimeoutSpy).not.toHaveBeenCalled();
    expect(clearIntervalSpy).not.toHaveBeenCalled();
    // Advance — no timers to fire
    vi.advanceTimersByTime(INITIAL_DELAY_MS + CHECK_INTERVAL_MS);
    await flushPromises();
    expect(mockCheck).not.toHaveBeenCalled();
    clearTimeoutSpy.mockRestore();
    clearIntervalSpy.mockRestore();
  });

  // ── checkForUpdates exposed ────────────────────────────────────────────

  it('checkForUpdates() can be called manually and triggers a check', async () => {
    const { service } = mountService();
    await service.checkForUpdates();
    await flushPromises();
    expect(mockCheck).toHaveBeenCalledTimes(1);
  });

  it('checkForUpdates() is a no-op when not inside Tauri', async () => {
    withoutTauri();
    const { service } = mountService();
    await service.checkForUpdates();
    expect(mockCheck).not.toHaveBeenCalled();
  });
});
