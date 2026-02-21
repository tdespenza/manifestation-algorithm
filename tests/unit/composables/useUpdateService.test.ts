import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { defineComponent, h } from 'vue';
import { mount, flushPromises } from '@vue/test-utils';

// ── Mock Tauri plugins ──────────────────────────────────────────────────────

const mockCheck = vi.fn();
vi.mock('@tauri-apps/plugin-updater', () => ({
  check: (...args: unknown[]) => mockCheck(...args)
}));

const mockRelaunch = vi.fn();
vi.mock('@tauri-apps/plugin-process', () => ({
  relaunch: (...args: unknown[]) => mockRelaunch(...args)
}));

// ── Import after mocks ──────────────────────────────────────────────────────

import {
  useUpdateService,
  isTauri,
  INITIAL_DELAY_MS,
  CHECK_INTERVAL_MS
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

/** Simulate an update object with configurable downloadAndInstall behaviour. */
function makeUpdate(version = '1.9.0', body = 'Bug fixes') {
  const downloadAndInstall = vi.fn();
  return { version, body, downloadAndInstall };
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
});

describe('exported constants', () => {
  it('INITIAL_DELAY_MS is 3000', () => {
    expect(INITIAL_DELAY_MS).toBe(3_000);
  });

  it('CHECK_INTERVAL_MS is 3 600 000 (1 hour)', () => {
    expect(CHECK_INTERVAL_MS).toBe(60 * 60 * 1_000);
  });
});

describe('useUpdateService()', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
    mockCheck.mockResolvedValue(null);
    mockRelaunch.mockResolvedValue(undefined);
    withTauri();
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
    expect(service.downloadProgress.value).toBe(0);
    expect(service.errorMessage.value).toBe('');
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
    withoutTauri();
    mountService();
    await tick(CHECK_INTERVAL_MS + 100);
    expect(mockCheck).not.toHaveBeenCalled();
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
  });

  // ── auto-download flow ────────────────────────────────────────────────

  it('transitions idle → downloading → ready when update is found', async () => {
    const update = makeUpdate('2.0.0', 'Great release');
    update.downloadAndInstall.mockImplementation(
      (cb: (e: { event: string; data: Record<string, number> }) => void) => {
        cb({ event: 'Started', data: { contentLength: 1000 } });
        cb({ event: 'Progress', data: { chunkLength: 500 } });
        cb({ event: 'Progress', data: { chunkLength: 500 } });
        cb({ event: 'Finished', data: {} });
        return Promise.resolve();
      }
    );
    mockCheck.mockResolvedValue(update);

    const { service } = mountService();
    await tick();

    expect(service.state.value).toBe('ready');
    expect(service.newVersion.value).toBe('2.0.0');
    expect(service.releaseNotes.value).toBe('Great release');
    expect(service.downloadProgress.value).toBe(100);
  });

  it('sets downloadProgress correctly from progress events', async () => {
    let capturedCb: ((e: { event: string; data: Record<string, number> }) => void) | null = null;
    const update = makeUpdate('2.1.0');
    update.downloadAndInstall.mockImplementation(
      (cb: (e: { event: string; data: Record<string, number> }) => void) => {
        capturedCb = cb;
        return new Promise(() => {}); // never resolves until we fire events
      }
    );
    mockCheck.mockResolvedValue(update);

    const { service } = mountService();
    await tick();

    capturedCb!({ event: 'Started', data: { contentLength: 200 } });
    capturedCb!({ event: 'Progress', data: { chunkLength: 100 } });
    await flushPromises();

    expect(service.state.value).toBe('downloading');
    expect(service.downloadProgress.value).toBe(50);
  });

  it('clamps progress to 0 during Progress events when contentLength is 0 (division guard)', async () => {
    let capturedCb: ((e: { event: string; data: Record<string, number> }) => void) | null = null;
    const update = makeUpdate('2.2.0');
    update.downloadAndInstall.mockImplementation(
      (cb: (e: { event: string; data: Record<string, number> }) => void) => {
        capturedCb = cb;
        return new Promise(() => {}); // never auto-resolves
      }
    );
    mockCheck.mockResolvedValue(update);

    const { service } = mountService();
    await tick();

    capturedCb!({ event: 'Started', data: { contentLength: 0 } });
    capturedCb!({ event: 'Progress', data: { chunkLength: 100 } });
    await flushPromises();

    // With total=0 the guard `total > 0` is false — progress stays 0
    expect(service.state.value).toBe('downloading');
    expect(service.downloadProgress.value).toBe(0);
  });

  it('handles contentLength undefined via nullish coalescing (treated as 0)', async () => {
    const update = makeUpdate('2.3.0');
    update.downloadAndInstall.mockImplementation(
      (cb: (e: { event: string; data: Record<string, number | undefined> }) => void) => {
        cb({ event: 'Started', data: {} }); // no contentLength → undefined → ?? 0
        cb({ event: 'Progress', data: { chunkLength: 50 } });
        cb({ event: 'Finished', data: {} });
        return Promise.resolve();
      }
    );
    mockCheck.mockResolvedValue(update);

    const { service } = mountService();
    await tick();

    expect(service.state.value).toBe('ready');
  });

  it('ignores unknown event types without crashing', async () => {
    const update = makeUpdate('2.4.0');
    update.downloadAndInstall.mockImplementation(
      (cb: (e: { event: string; data: Record<string, number> }) => void) => {
        cb({ event: 'Started', data: { contentLength: 100 } });
        cb({ event: 'UnknownEvent', data: {} } as never);
        cb({ event: 'Finished', data: {} });
        return Promise.resolve();
      }
    );
    mockCheck.mockResolvedValue(update);

    const { service } = mountService();
    await tick();

    expect(service.state.value).toBe('ready');
  });

  it('uses empty string for releaseNotes when body is undefined', async () => {
    const update = { version: '2.5.0', body: undefined, downloadAndInstall: vi.fn() };
    update.downloadAndInstall.mockResolvedValue(undefined);
    mockCheck.mockResolvedValue(update);

    const { service } = mountService();
    await tick();

    expect(service.releaseNotes.value).toBe('');
  });

  // ── error state ───────────────────────────────────────────────────────

  it('transitions to error state when downloadAndInstall throws', async () => {
    const update = makeUpdate('3.0.0');
    update.downloadAndInstall.mockRejectedValue(new Error('disk full'));
    mockCheck.mockResolvedValue(update);

    const { service } = mountService();
    await tick();

    expect(service.state.value).toBe('error');
    expect(service.errorMessage.value).toBe('Error: disk full');
  });

  it('silently swallows check() errors — state stays idle, no error banner', async () => {
    mockCheck.mockRejectedValue(new Error('network fail'));

    const { service } = mountService();
    await tick();

    // check() errors are silently swallowed so they never disrupt the app
    expect(service.state.value).toBe('idle');
    expect(service.errorMessage.value).toBe('');
  });

  // ── idempotency guards ─────────────────────────────────────────────────

  it('skips a new check when already in downloading state', async () => {
    let resolveDl!: () => void;
    const update = makeUpdate('4.0.0');
    update.downloadAndInstall.mockImplementation(() => new Promise<void>(res => (resolveDl = res)));
    mockCheck.mockResolvedValue(update);

    const { service } = mountService();
    await tick(); // fires first check → state = 'downloading'

    expect(service.state.value).toBe('downloading');

    // Advance the poll interval — should NOT call check() again
    vi.advanceTimersByTime(CHECK_INTERVAL_MS + 100);
    await flushPromises();

    // check() was called once (from first tick), NOT a second time
    expect(mockCheck).toHaveBeenCalledTimes(1);

    resolveDl();
  });

  it('skips a new check when already in ready state', async () => {
    const update = makeUpdate('4.1.0');
    update.downloadAndInstall.mockResolvedValue(undefined);
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

  it('polls again after CHECK_INTERVAL_MS when not in ready/downloading state', async () => {
    // First check returns null, second returns an update
    const update = makeUpdate('5.0.0');
    update.downloadAndInstall.mockResolvedValue(undefined);
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

  // ── restart ───────────────────────────────────────────────────────────

  it('restart() calls relaunch() when inside Tauri', async () => {
    const { service } = mountService();
    await service.restart();
    expect(mockRelaunch).toHaveBeenCalled();
  });

  it('restart() is a no-op when not inside Tauri', async () => {
    const { service } = mountService();
    withoutTauri();
    await service.restart();
    expect(mockRelaunch).not.toHaveBeenCalled();
  });

  it('restart() stays in ready state when relaunch() throws', async () => {
    mockRelaunch.mockRejectedValue(new Error('no process plugin'));
    const update = makeUpdate('5.1.0');
    update.downloadAndInstall.mockResolvedValue(undefined);
    mockCheck.mockResolvedValue(update);

    const { service } = mountService();
    await tick();
    expect(service.state.value).toBe('ready');

    await service.restart();
    await flushPromises();

    // Catch block sets state back to 'ready'
    expect(service.state.value).toBe('ready');
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
    withoutTauri();
    const { wrapper } = mountService();
    expect(() => wrapper.unmount()).not.toThrow();
    // Advance — no timers to fire
    vi.advanceTimersByTime(INITIAL_DELAY_MS + CHECK_INTERVAL_MS);
    await flushPromises();
    expect(mockCheck).not.toHaveBeenCalled();
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
