import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ref } from 'vue';
import { mount, flushPromises } from '@vue/test-utils';
import UpdateNotification from '@/components/ui/UpdateNotification.vue';

const mockService = {
  state: ref<'idle' | 'ready'>('idle'),
  newVersion: ref(''),
  releaseNotes: ref(''),
  dismissed: ref(false),
  openReleasePage: vi.fn(),
  dismiss: vi.fn(),
  checkForUpdates: vi.fn()
};

vi.mock('@/composables/useUpdateService', () => ({
  useUpdateService: () => mockService
}));

describe('UpdateNotification.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockService.state.value = 'idle';
    mockService.newVersion.value = '';
    mockService.releaseNotes.value = '';
    mockService.dismissed.value = false;
  });

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

  it('shows update-available banner with version and Get Update button', async () => {
    mockService.state.value = 'ready';
    mockService.newVersion.value = '3.0.0';
    const wrapper = mount(UpdateNotification);
    await flushPromises();
    const banner = wrapper.find('.update-banner');
    expect(banner.exists()).toBe(true);
    expect(banner.classes()).toContain('ready');
    expect(banner.text()).toContain('3.0.0');
    expect(banner.text()).toContain('Get Update');
    expect(banner.text()).toContain('is available');
  });

  it('shows fallback release notes text when releaseNotes is empty', async () => {
    mockService.state.value = 'ready';
    mockService.newVersion.value = '3.1.0';
    mockService.releaseNotes.value = '';
    const wrapper = mount(UpdateNotification);
    await flushPromises();
    expect(wrapper.text()).toContain('Visit the release page');
  });

  it('shows provided release notes when set', async () => {
    mockService.state.value = 'ready';
    mockService.newVersion.value = '3.2.0';
    mockService.releaseNotes.value = 'Performance improvements';
    const wrapper = mount(UpdateNotification);
    await flushPromises();
    expect(wrapper.find('.update-notes').text()).toContain('Performance improvements');
  });

  it('calls openReleasePage() when Get Update is clicked', async () => {
    mockService.state.value = 'ready';
    const wrapper = mount(UpdateNotification);
    await flushPromises();
    await wrapper.find('.btn-primary').trigger('click');
    expect(mockService.openReleasePage).toHaveBeenCalled();
  });

  it('calls dismiss() when the ready X button is clicked', async () => {
    mockService.state.value = 'ready';
    const wrapper = mount(UpdateNotification);
    await flushPromises();
    await wrapper.find('.btn-dismiss').trigger('click');
    expect(mockService.dismiss).toHaveBeenCalled();
  });

  it('banner has role=status and aria-live=polite', async () => {
    mockService.state.value = 'ready';
    const wrapper = mount(UpdateNotification);
    await flushPromises();
    const banner = wrapper.find('.update-banner');
    expect(banner.attributes('role')).toBe('status');
    expect(banner.attributes('aria-live')).toBe('polite');
  });

  it('dismiss button has aria-label=Dismiss', async () => {
    mockService.state.value = 'ready';
    const wrapper = mount(UpdateNotification);
    await flushPromises();
    expect(wrapper.find('.btn-dismiss').attributes('aria-label')).toBe('Dismiss');
  });
});
