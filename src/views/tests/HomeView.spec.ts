import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createRouter, createWebHashHistory } from 'vue-router';

// Stub child components
vi.mock('../../components/ui/Questionnaire.vue', () => ({
  default: { template: '<div class="questionnaire-stub" />' },
}));

import HomeView from '../HomeView.vue';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [{ path: '/', component: HomeView }],
});

describe('HomeView.vue', () => {
  it('renders without errors', async () => {
    const wrapper = mount(HomeView, {
      global: { plugins: [router] },
    });
    expect(wrapper.find('.home-view').exists()).toBe(true);
  });

  it('shows page heading', () => {
    const wrapper = mount(HomeView, {
      global: { plugins: [router] },
    });
    expect(wrapper.find('h1').text()).toBe('Manifestation Algorithm');
  });

  it('renders the Questionnaire stub', () => {
    const wrapper = mount(HomeView, {
      global: { plugins: [router] },
    });
    expect(wrapper.find('.questionnaire-stub').exists()).toBe(true);
  });
});
