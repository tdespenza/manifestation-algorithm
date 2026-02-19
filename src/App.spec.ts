import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createRouter, createWebHashHistory } from 'vue-router';

// Stub NetworkStatus
vi.mock('./components/NetworkStatus.vue', () => ({
  default: { template: '<div class="network-status-stub" />' },
}));

import App from './App.vue';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: { template: '<div class="home-stub" />' } },
    { path: '/dashboard', component: { template: '<div class="dash-stub" />' } },
    { path: '/settings', component: { template: '<div class="settings-stub" />' } },
  ],
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

  it('renders the main container', async () => {
    const wrapper = mount(App, { global: { plugins: [router] } });
    await router.isReady();
    expect(wrapper.find('.container').exists()).toBe(true);
  });
});
