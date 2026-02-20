import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createRouter, createWebHashHistory } from 'vue-router';

// Stub NetworkStatus and UpdateNotification (both use Tauri APIs)
vi.mock('@/components/NetworkStatus.vue', () => ({
  default: { template: '<div class="network-status-stub" />' }
}));
vi.mock('@/components/ui/UpdateNotification.vue', () => ({
  default: { template: '<div class="update-notification-stub" />' }
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

  it('renders the NetworkStatus stub in nav', async () => {
    const wrapper = mount(App, { global: { plugins: [router] } });
    await router.isReady();
    expect(wrapper.find('.network-status-stub').exists()).toBe(true);
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
});
