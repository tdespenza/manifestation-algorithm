import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ref } from 'vue';
import { mount, flushPromises } from '@vue/test-utils';
import UpdateNotification from '@/components/ui/UpdateNotification.vue';

// ── Mock the composable so the component becomes a pure rendering test ───────

const mockService = {
  state: ref<'idle' | 'downloading' | 'ready' | 'error'>('idle'),
  newVersion: ref(''),
  releaseNotes: ref(''),
  downloadProgress: ref(0),
  errorMessage: ref(''),
  dismissed: ref(false),
  restart: vi.fn(),
  dismiss: vi.fn(),
  checkForUpdates: vi.fn()
};

vi.mock('@/composables/useUpdateService', () => ({
  useUpdateService: () => mockService
}));

// ── Suite ────────────────────────────────────────────────────────────────────

describe('UpdateNotification.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockService.state.value = 'idle';
    mockService.newVersion.value = '';
    mockService.releaseNotes.value = '';
    mockService.downloadProgress.value = 0;
    mockService.errorMessage.value = '';
    mockService.dismissed.value = false;
  });

  // ── idle ──────────────────────────────────────────────────────────────

  it('renders nothing in idle state', () => {
    const wrapper = mount(UpdateNotification);
    expect(wrapper.find('.update-banner').exists()).toBe(false);
  });

  it('renders nothing when dismissed is true', async () => {
    mockService.state.value = 'ready';
    mockService.dismissed.value = true;
    const wrapper = mount(UpdateNotification);
    await flushPromises();
    expect(wrapper.find('.update-banner').exists()).toBe(false);
  });

  // ── downloading ───────────────────────────────────────────────────────

  it('shows downloading banner with progress bar', async () => {
    mockService.state.value = 'downloading';
    mockService.newVersion.value = '2.0.0';
    mockService.downloadProgress.value = 42;

    const wrapper = mount(UpdateNotification);
    await flushPromises();

    const banner = wrapper.find('.update-banner');
    expect(banner.exists()).toBe(true);
    expect(banner.classes()).toContain('downloading');
    expect(banner.text()).toContain('2.0.0');
    expect(banner.text()).toContain('42%');
  });

  it('downloading banner has no dismiss button (user cannot cancel a download)', async () => {
    mockService.state.value = 'downloading';
    const wrapper = mount(UpdateNotification);
    await flushPromises();
    expect(wrapper.find('.btn-dismiss').exists()).toBe(false);
  });

  it('shows 0% progress by default in downloading state', async () => {
    mockService.state.value = 'downloading';
    mockService.downloadProgress.value = 0;
    const wrapper = mount(UpdateNotification);
    await flushPromises();
    expect(wrapper.text()).toContain('0%');
  });

  it('shows 100% progress fill when download is complete', async () => {
    mockService.state.value = 'downloading';
    mockService.downloadProgress.value = 100;
    const wrapper = mount(UpdateNotification);
    await flushPromises();
    const fill = wrapper.find('.update-progress-fill');
    expect(fill.attributes('style')).toContain('width: 100%');
  });

  it('renders no "Update Now" button (auto-download — no manual trigger needed)', async () => {
    mockService.state.value = 'downloading';
    const wrapper = mount(UpdateNotification);
    await flushPromises();
    expect(wrapper.text()).not.toContain('Update Now');
  });

  // ── ready ─────────────────────────────────────────────────────────────

  it('shows ready banner with version and restart button', async () => {
    mockService.state.value = 'ready';
    mockService.newVersion.value = '3.0.0';

    const wrapper = mount(UpdateNotification);
    await flushPromises();

    const banner = wrapper.find('.update-banner');
    expect(banner.exists()).toBe(true);
    expect(banner.classes()).toContain('ready');
    expect(banner.text()).toContain('3.0.0');
    expect(banner.text()).toContain('Restart Now');
    expect(banner.text()).toContain('ready to launch');
  });

  it('calls restart() when "Restart Now" is clicked', async () => {
    mockService.state.value = 'ready';
    const wrapper = mount(UpdateNotification);
    await flushPromises();
    await wrapper.find('.btn-primary').trigger('click');
    expect(mockService.restart).toHaveBeenCalled();
  });

  it('calls dismiss() when the ready ✕ button is clicked', async () => {
    mockService.state.value = 'ready';
    const wrapper = mount(UpdateNotification);
    await flushPromises();
    await wrapper.find('.btn-dismiss').trigger('click');
    expect(mockService.dismiss).toHaveBeenCalled();
  });

  // ── error ─────────────────────────────────────────────────────────────

  it('shows error banner with message', async () => {
    mockService.state.value = 'error';
    mockService.errorMessage.value = 'disk full';

    const wrapper = mount(UpdateNotification);
    await flushPromises();

    const banner = wrapper.find('.update-banner');
    expect(banner.exists()).toBe(true);
    expect(banner.classes()).toContain('error');
    expect(banner.text()).toContain('disk full');
    expect(banner.text()).toContain('Update failed');
  });

  it('calls dismiss() when the error ✕ button is clicked', async () => {
    mockService.state.value = 'error';
    const wrapper = mount(UpdateNotification);
    await flushPromises();
    await wrapper.find('.btn-dismiss').trigger('click');
    expect(mockService.dismiss).toHaveBeenCalled();
  });

  // ── accessibility ─────────────────────────────────────────────────────

  it('banner has role="status" and aria-live="polite"', async () => {
    mockService.state.value = 'downloading';
    const wrapper = mount(UpdateNotification);
    await flushPromises();
    const banner = wrapper.find('.update-banner');
    expect(banner.attributes('role')).toBe('status');
    expect(banner.attributes('aria-live')).toBe('polite');
  });

  it('dismiss button has aria-label="Dismiss"', async () => {
    mockService.state.value = 'error';
    const wrapper = mount(UpdateNotification);
    await flushPromises();
    expect(wrapper.find('.btn-dismiss').attributes('aria-label')).toBe('Dismiss');
  });
});
