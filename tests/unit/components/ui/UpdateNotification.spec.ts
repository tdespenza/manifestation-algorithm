import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import UpdateNotification from '@/components/ui/UpdateNotification.vue';

// ── Mock the Tauri plugin stubs so we can control return values per-test ────

const mockCheck = vi.fn();
vi.mock('@tauri-apps/plugin-updater', () => ({
  check: (...args: unknown[]) => mockCheck(...args)
}));

const mockRelaunch = vi.fn();
vi.mock('@tauri-apps/plugin-process', () => ({
  relaunch: (...args: unknown[]) => mockRelaunch(...args)
}));

// ── Helpers ─────────────────────────────────────────────────────────────────

function withTauri() {
  (window as unknown as Record<string, unknown>)['__TAURI_INTERNALS__'] = {};
}

function withoutTauri() {
  delete (window as unknown as Record<string, unknown>)['__TAURI_INTERNALS__'];
}

function makeUpdate(version = '1.9.0', body = 'Bug fixes') {
  const downloadAndInstall = vi.fn();
  return { version, body, downloadAndInstall };
}

// Advance fake timers AND flush all microtasks/promises
async function tick(ms = 3100) {
  vi.advanceTimersByTime(ms);
  await flushPromises();
}

// ── Suite ────────────────────────────────────────────────────────────────────

describe('UpdateNotification.vue', () => {
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

  // ── idle state (no update) ─────────────────────────────────────────────

  it('renders nothing when no update is available', async () => {
    const wrapper = mount(UpdateNotification);
    await tick();
    expect(wrapper.find('.update-banner').exists()).toBe(false);
  });

  it('does nothing when not running inside Tauri', async () => {
    withoutTauri();
    const wrapper = mount(UpdateNotification);
    await tick();
    expect(wrapper.find('.update-banner').exists()).toBe(false);
    expect(mockCheck).not.toHaveBeenCalled();
  });

  it('swallows check() errors silently', async () => {
    mockCheck.mockRejectedValue(new Error('network fail'));
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const wrapper = mount(UpdateNotification);
    await tick();
    expect(wrapper.find('.update-banner').exists()).toBe(false);
    consoleSpy.mockRestore();
  });

  // ── available state ────────────────────────────────────────────────────

  it('shows the available banner when an update is found', async () => {
    mockCheck.mockResolvedValue(makeUpdate('2.0.0', 'New features'));
    const wrapper = mount(UpdateNotification);
    await tick();
    const banner = wrapper.find('.update-banner');
    expect(banner.exists()).toBe(true);
    expect(banner.classes()).toContain('available');
    expect(banner.text()).toContain('2.0.0');
    expect(banner.text()).toContain('New features');
  });

  it('shows "Update Now" button in available state', async () => {
    mockCheck.mockResolvedValue(makeUpdate());
    const wrapper = mount(UpdateNotification);
    await tick();
    expect(wrapper.text()).toContain('Update Now');
  });

  it('hides the banner when the dismiss (✕) button is clicked', async () => {
    mockCheck.mockResolvedValue(makeUpdate());
    const wrapper = mount(UpdateNotification);
    await tick();
    expect(wrapper.find('.update-banner').exists()).toBe(true);
    await wrapper.find('.btn-dismiss').trigger('click');
    await flushPromises();
    expect(wrapper.find('.update-banner').exists()).toBe(false);
  });

  it('shows banner even when release notes are empty', async () => {
    const update = makeUpdate('1.5.0', undefined as unknown as string);
    // body is undefined — component uses ?? ''
    mockCheck.mockResolvedValue({ ...update, body: undefined });
    const wrapper = mount(UpdateNotification);
    await tick();
    expect(wrapper.find('.update-banner').exists()).toBe(true);
    expect(wrapper.text()).toContain('1.5.0');
  });

  // ── downloading state ──────────────────────────────────────────────────

  it('enters downloading state and shows progress bar when Update Now is clicked', async () => {
    const update = makeUpdate('3.0.0');
    update.downloadAndInstall.mockImplementation(
      (
        cb: (e: { event: string; data: { contentLength?: number; chunkLength?: number } }) => void
      ) => {
        cb({ event: 'Started', data: { contentLength: 1000 } });
        cb({ event: 'Progress', data: { chunkLength: 500 } });
        cb({ event: 'Progress', data: { chunkLength: 500 } });
        cb({ event: 'Finished', data: {} });
        return Promise.resolve();
      }
    );
    mockCheck.mockResolvedValue(update);

    const wrapper = mount(UpdateNotification);
    await tick(); // triggers onMounted check → available
    mockCheck.mockResolvedValue(update); // install() calls check() again
    await wrapper.find('.btn-primary').trigger('click');
    await flushPromises();

    // After download completes the state should be 'ready'
    const banner = wrapper.find('.update-banner');
    expect(banner.exists()).toBe(true);
    expect(banner.classes()).toContain('ready');
    expect(wrapper.text()).toContain('installed');
  });

  it('reflects intermediate progress during download', async () => {
    let progressCallback:
      | ((e: { event: string; data: { contentLength?: number; chunkLength?: number } }) => void)
      | null = null;
    const update = makeUpdate('3.1.0');
    update.downloadAndInstall.mockImplementation((cb: typeof progressCallback) => {
      progressCallback = cb;
      return new Promise(() => {}); // never resolves until we call cb
    });
    mockCheck.mockResolvedValue(update);

    const wrapper = mount(UpdateNotification);
    await tick();
    mockCheck.mockResolvedValue(update);

    // Start install (don't await — it won't settle yet)
    wrapper.find('.btn-primary').trigger('click');
    await flushPromises();

    // Fire progress events
    progressCallback!({ event: 'Started', data: { contentLength: 200 } });
    progressCallback!({ event: 'Progress', data: { chunkLength: 100 } });
    await flushPromises();

    const banner = wrapper.find('.update-banner');
    expect(banner.classes()).toContain('downloading');
    expect(banner.text()).toContain('50%');
  });

  it('handles progress when contentLength is 0 (unknown size)', async () => {
    const update = makeUpdate('3.2.0');
    update.downloadAndInstall.mockImplementation(
      (
        cb: (e: { event: string; data: { contentLength?: number; chunkLength?: number } }) => void
      ) => {
        cb({ event: 'Started', data: { contentLength: 0 } });
        cb({ event: 'Progress', data: { chunkLength: 100 } });
        cb({ event: 'Finished', data: {} });
        return Promise.resolve();
      }
    );
    mockCheck.mockResolvedValue(update);

    const wrapper = mount(UpdateNotification);
    await tick();
    mockCheck.mockResolvedValue(update);
    await wrapper.find('.btn-primary').trigger('click');
    await flushPromises();

    // Should not crash and should reach ready state
    expect(wrapper.find('.update-banner').classes()).toContain('ready');
  });

  it('handles progress when contentLength is undefined (nullish coalescing branch)', async () => {
    const update = makeUpdate('3.3.0');
    update.downloadAndInstall.mockImplementation(
      (
        cb: (e: { event: string; data: { contentLength?: number; chunkLength?: number } }) => void
      ) => {
        cb({ event: 'Started', data: {} }); // contentLength omitted → undefined → ?? 0
        cb({ event: 'Progress', data: { chunkLength: 50 } });
        cb({ event: 'Finished', data: {} });
        return Promise.resolve();
      }
    );
    mockCheck.mockResolvedValue(update);

    const wrapper = mount(UpdateNotification);
    await tick();
    mockCheck.mockResolvedValue(update);
    await wrapper.find('.btn-primary').trigger('click');
    await flushPromises();

    expect(wrapper.find('.update-banner').classes()).toContain('ready');
  });

  it('ignores unknown event types in the progress callback (implicit else branch)', async () => {
    const update = makeUpdate('3.4.0');
    update.downloadAndInstall.mockImplementation(
      (
        cb: (e: { event: string; data: { contentLength?: number; chunkLength?: number } }) => void
      ) => {
        cb({ event: 'Started', data: { contentLength: 100 } });
        cb({ event: 'UnknownEvent', data: {} } as never); // triggers the implicit else
        cb({ event: 'Finished', data: {} });
        return Promise.resolve();
      }
    );
    mockCheck.mockResolvedValue(update);

    const wrapper = mount(UpdateNotification);
    await tick();
    mockCheck.mockResolvedValue(update);
    await wrapper.find('.btn-primary').trigger('click');
    await flushPromises();

    expect(wrapper.find('.update-banner').classes()).toContain('ready');
  });

  // ── error state ────────────────────────────────────────────────────────

  it('shows the error banner if downloadAndInstall throws', async () => {
    const update = makeUpdate('4.0.0');
    update.downloadAndInstall.mockRejectedValue(new Error('disk full'));
    mockCheck.mockResolvedValue(update);

    const wrapper = mount(UpdateNotification);
    await tick();
    mockCheck.mockResolvedValue(update);
    await wrapper.find('.btn-primary').trigger('click');
    await flushPromises();

    const banner = wrapper.find('.update-banner');
    expect(banner.classes()).toContain('error');
    expect(banner.text()).toContain('disk full');
  });

  it('can dismiss the error banner', async () => {
    const update = makeUpdate('4.1.0');
    update.downloadAndInstall.mockRejectedValue(new Error('oops'));
    mockCheck.mockResolvedValue(update);

    const wrapper = mount(UpdateNotification);
    await tick();
    mockCheck.mockResolvedValue(update);
    await wrapper.find('.btn-primary').trigger('click');
    await flushPromises();

    expect(wrapper.find('.update-banner').exists()).toBe(true);
    await wrapper.find('.btn-dismiss').trigger('click');
    await flushPromises();
    expect(wrapper.find('.update-banner').exists()).toBe(false);
  });

  // ── ready state / restart ──────────────────────────────────────────────

  it('calls relaunch when Restart Now is clicked', async () => {
    const update = makeUpdate('5.0.0');
    update.downloadAndInstall.mockImplementation(
      (
        cb: (e: { event: string; data: { contentLength?: number; chunkLength?: number } }) => void
      ) => {
        cb({ event: 'Finished', data: {} });
        return Promise.resolve();
      }
    );
    mockCheck.mockResolvedValue(update);

    const wrapper = mount(UpdateNotification);
    await tick();
    mockCheck.mockResolvedValue(update);
    await wrapper.find('.btn-primary').trigger('click');
    await flushPromises();

    // Now in ready state — click Restart Now
    await wrapper.find('.btn-primary').trigger('click');
    await flushPromises();

    expect(mockRelaunch).toHaveBeenCalled();
  });

  it('stays in ready state if relaunch throws (manual restart fallback)', async () => {
    mockRelaunch.mockRejectedValue(new Error('no process plugin'));
    const update = makeUpdate('5.1.0');
    update.downloadAndInstall.mockImplementation(
      (
        cb: (e: { event: string; data: { contentLength?: number; chunkLength?: number } }) => void
      ) => {
        cb({ event: 'Finished', data: {} });
        return Promise.resolve();
      }
    );
    mockCheck.mockResolvedValue(update);

    const wrapper = mount(UpdateNotification);
    await tick();
    mockCheck.mockResolvedValue(update);
    await wrapper.find('.btn-primary').trigger('click'); // download
    await flushPromises();
    await wrapper.find('.btn-primary').trigger('click'); // restart
    await flushPromises();

    // On error the state reverts to 'ready' (manual restart banner stays)
    expect(wrapper.find('.update-banner').classes()).toContain('ready');
  });

  it('can dismiss the ready banner', async () => {
    const update = makeUpdate('5.2.0');
    update.downloadAndInstall.mockImplementation(
      (
        cb: (e: { event: string; data: { contentLength?: number; chunkLength?: number } }) => void
      ) => {
        cb({ event: 'Finished', data: {} });
        return Promise.resolve();
      }
    );
    mockCheck.mockResolvedValue(update);

    const wrapper = mount(UpdateNotification);
    await tick();
    mockCheck.mockResolvedValue(update);
    await wrapper.find('.btn-primary').trigger('click');
    await flushPromises();

    await wrapper.find('.btn-dismiss').trigger('click');
    await flushPromises();
    expect(wrapper.find('.update-banner').exists()).toBe(false);
  });

  // ── install() with no update available (guard branch) ─────────────────

  it('does nothing in install() if check returns null after download start', async () => {
    // First check → update, second check (inside install) → null
    const update = makeUpdate('6.0.0');
    mockCheck
      .mockResolvedValueOnce(update) // onMounted
      .mockResolvedValueOnce(null); // install()

    const wrapper = mount(UpdateNotification);
    await tick();
    await wrapper.find('.btn-primary').trigger('click');
    await flushPromises();

    // State goes to downloading then returns early — no error, no ready
    // Component stays in downloading state (update is null so install exits early)
    // Banner should still exist (state = 'downloading', not dismissed)
    expect(wrapper.find('.update-banner').exists()).toBe(true);
  });

  it('restart() is a no-op when not in Tauri', async () => {
    const update = makeUpdate('5.3.0');
    update.downloadAndInstall.mockImplementation(
      (
        cb: (e: { event: string; data: { contentLength?: number; chunkLength?: number } }) => void
      ) => {
        cb({ event: 'Finished', data: {} });
        return Promise.resolve();
      }
    );
    mockCheck.mockResolvedValue(update);

    const wrapper = mount(UpdateNotification);
    await tick();
    mockCheck.mockResolvedValue(update);
    await wrapper.find('.btn-primary').trigger('click'); // download
    await flushPromises();

    withoutTauri(); // remove Tauri before restart
    await wrapper.find('.btn-primary').trigger('click'); // restart
    await flushPromises();

    // relaunch should NOT have been called; banner stays in ready state
    expect(mockRelaunch).not.toHaveBeenCalled();
    expect(wrapper.find('.update-banner').classes()).toContain('ready');
  });

  // ── not-Tauri guard in install() ──────────────────────────────────────

  it('install() is a no-op when not in Tauri', async () => {
    // Start in Tauri so onMounted runs, then remove it before install
    mockCheck.mockResolvedValue(makeUpdate());
    const wrapper = mount(UpdateNotification);
    await tick();

    withoutTauri(); // remove Tauri
    await wrapper.find('.btn-primary').trigger('click');
    await flushPromises();

    // Should stay in available state, not downloading
    expect(wrapper.find('.update-banner').classes()).toContain('available');
  });
});
