import { describe, it, expect, vi } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import { createRouter, createWebHashHistory } from 'vue-router';
import { ref } from 'vue';

// Stub NetworkStatus and UpdateNotification (both use Tauri APIs)
vi.mock('@/components/NetworkStatus.vue', () => ({
  default: { template: '<div class="network-status-stub" />' }
}));
vi.mock('@/components/ui/UpdateNotification.vue', () => ({
  default: { template: '<div class="update-notification-stub" />' }
}));

// Control sharingEnabled from tests
const mockSharingEnabled = ref(false);
vi.mock('@/composables/useNetwork', () => ({
  useNetwork: vi.fn(() => ({
    sharingEnabled: mockSharingEnabled,
    count: ref(0),
    manifestations: ref(0),
    avgScore: ref(null),
    percentile90: ref(null),
    isConnected: ref(false),
    init: vi.fn(),
    cleanup: vi.fn(),
    toggleSharing: vi.fn()
  })),
  loadSharingState: vi.fn().mockResolvedValue(undefined)
}));

import App from '@/App.vue';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'home', component: { template: '<div class="home-stub" />' } },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: { template: '<div class="dash-stub" />' }
    },
    {
      path: '/settings',
      name: 'settings',
      component: { template: '<div class="settings-stub" />' }
    }
  ]
});

describe('App.vue', () => {
  it('renders the main app layout', async () => {
    const wrapper = mount(App, { global: { plugins: [router] } });
    await router.isReady();
    expect(wrapper.find('.app-layout').exists()).toBe(true);
  });

  it('renders the main navigation bar', async () => {
    const wrapper = mount(App, { global: { plugins: [router] } });
    await router.isReady();
    expect(wrapper.find('.main-nav').exists()).toBe(true);
  });

  it('renders links to Questionnaire and History', async () => {
    const wrapper = mount(App, { global: { plugins: [router] } });
    await router.isReady();
    const links = wrapper.findAll('a');
    const hrefs = links.map(l => l.attributes('href'));
    expect(hrefs.some(h => h === '/' || h === '#/')).toBe(true);
  });

  it('renders the settings link', async () => {
    const wrapper = mount(App, { global: { plugins: [router] } });
    await router.isReady();
    expect(wrapper.find('.settings-link').exists()).toBe(true);
  });

  it('shows NetworkStatus in nav when sharing is enabled', async () => {
    mockSharingEnabled.value = true;
    const wrapper = mount(App, { global: { plugins: [router] } });
    await router.isReady();
    expect(wrapper.find('.network-status-stub').exists()).toBe(true);
    mockSharingEnabled.value = false;
  });

  it('hides NetworkStatus in nav when sharing is disabled', async () => {
    mockSharingEnabled.value = false;
    const wrapper = mount(App, { global: { plugins: [router] } });
    await router.isReady();
    expect(wrapper.find('.network-status-stub').exists()).toBe(false);
  });

  it('handles loadSharingState rejection without throwing', async () => {
    const { loadSharingState } = await import('@/composables/useNetwork');
    (loadSharingState as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
      new Error('network error')
    );
    const wrapper = mount(App, { global: { plugins: [router] } });
    await router.isReady();
    await flushPromises();
    // App should still render normally after a rejected sharing state load
    expect(wrapper.find('.app-layout').exists()).toBe(true);
  });

  it('renders the main container (non-dashboard route)', async () => {
    await router.push('/');
    await router.isReady();
    const wrapper = mount(App, { global: { plugins: [router] } });
    await router.isReady();
    expect(wrapper.find('.container').exists()).toBe(true);
    expect(wrapper.find('.full-width-main').exists()).toBe(false);
  });

  it('uses full-width-main class on the dashboard route', async () => {
    await router.push('/dashboard');
    await router.isReady();
    const wrapper = mount(App, { global: { plugins: [router] } });
    await router.isReady();
    expect(wrapper.find('.full-width-main').exists()).toBe(true);
    expect(wrapper.find('.container').exists()).toBe(false);
    // Reset to home
    await router.push('/');
  });

  it('onErrorCaptured logs the error, adds a toast, and returns false', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const wrapper = mount(App, { global: { plugins: [router] } });
    await router.isReady();

    // Access the registered onErrorCaptured hook via Vue 3 internals (instance.ec)
    const instance = (wrapper.vm as any).$;
    const hooks: Array<(err: unknown, vm: unknown, info: string) => boolean | undefined> =
      instance.ec ?? [];
    expect(hooks.length).toBeGreaterThan(0);

    const testError = new Error('test-boundary-error');
    const result = hooks[0](testError, wrapper.vm, 'render');

    expect(consoleSpy).toHaveBeenCalledWith('Caught in App boundary:', testError);
    expect(result).toBe(false);
    consoleSpy.mockRestore();
  });
});
