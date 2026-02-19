import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { ref } from 'vue';

// ── Mock useNetwork composable ────────────────────────────────────────────────
const mockSharingEnabled = ref(false);
const mockToggleSharing = vi.fn().mockResolvedValue(undefined);

vi.mock('@/composables/useNetwork', () => ({
  useNetwork: () => ({
    sharingEnabled: mockSharingEnabled,
    toggleSharing: mockToggleSharing,
  }),
}));

import SharingToggle from '@/components/ui/SharingToggle.vue';

describe('SharingToggle.vue', () => {
  beforeEach(() => {
    mockSharingEnabled.value = false;
    vi.clearAllMocks();
  });

  it('renders heading and privacy badge', () => {
    const wrapper = mount(SharingToggle);
    expect(wrapper.text()).toContain('Anonymous Network Sharing');
    expect(wrapper.text()).toContain('Privacy-First');
  });

  it('shows "Sharing disabled" text when sharingEnabled is false', () => {
    const wrapper = mount(SharingToggle);
    expect(wrapper.text()).toContain('Sharing disabled');
  });

  it('shows "Sharing enabled" text when sharingEnabled is true', async () => {
    mockSharingEnabled.value = true;
    const wrapper = mount(SharingToggle);
    await wrapper.vm.$nextTick();
    expect(wrapper.text()).toContain('Sharing enabled');
  });

  it('shows sharing active badge when sharingEnabled is true', async () => {
    mockSharingEnabled.value = true;
    const wrapper = mount(SharingToggle);
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.sharing-active-badge').exists()).toBe(true);
    expect(wrapper.find('.sharing-off-note').exists()).toBe(false);
  });

  it('shows sharing off note when sharingEnabled is false', () => {
    const wrapper = mount(SharingToggle);
    expect(wrapper.find('.sharing-off-note').exists()).toBe(true);
    expect(wrapper.find('.sharing-active-badge').exists()).toBe(false);
  });

  it('checkbox reflects sharingEnabled value', async () => {
    mockSharingEnabled.value = true;
    const wrapper = mount(SharingToggle);
    await wrapper.vm.$nextTick();
    const checkbox = wrapper.find<HTMLInputElement>('input[type="checkbox"]');
    expect(checkbox.element.checked).toBe(true);
  });

  it('calls toggleSharing when checkbox changes', async () => {
    const wrapper = mount(SharingToggle);
    const checkbox = wrapper.find('input[type="checkbox"]');
    // Simulate checking the box
    const inputEl = checkbox.element as HTMLInputElement;
    inputEl.checked = true;
    await checkbox.trigger('change');
    expect(mockToggleSharing).toHaveBeenCalledWith(true);
  });
});
