import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';

// Stub the Settings component
vi.mock('@/components/ui/Settings.vue', () => ({
  default: {
    template: '<div class="settings-stub" @click="$emit(\'close\')" />',
    emits: ['close']
  }
}));

import SettingsView from '@/views/SettingsView.vue';

describe('SettingsView.vue', () => {
  it('renders without errors', async () => {
    const mockPush = vi.fn();
    const wrapper = mount(SettingsView, {
      global: { mocks: { $router: { push: mockPush } } }
    });
    expect(wrapper.find('.settings-view').exists()).toBe(true);
  });

  it('shows Settings heading', () => {
    const wrapper = mount(SettingsView, {
      global: { mocks: { $router: { push: vi.fn() } } }
    });
    expect(wrapper.find('h1').text()).toBe('Settings');
  });

  it('renders the Settings child component stub', () => {
    const wrapper = mount(SettingsView, {
      global: { mocks: { $router: { push: vi.fn() } } }
    });
    expect(wrapper.find('.settings-stub').exists()).toBe(true);
  });

  it('navigates to / when Settings emits close', async () => {
    const mockPush = vi.fn();
    const wrapper = mount(SettingsView, {
      global: { mocks: { $router: { push: mockPush } } }
    });
    await wrapper.find('.settings-stub').trigger('click');
    await wrapper.vm.$nextTick();
    expect(mockPush).toHaveBeenCalledWith('/');
  });
});
