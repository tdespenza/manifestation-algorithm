import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick, ref } from 'vue';

// ── Mock useToast with controllable toasts array ──────────────────────────────
const mockToasts = ref<Array<{ id: number; message: string; type: string; duration: number }>>([]);
const mockDismissToast = vi.fn((id: number) => {
  const idx = mockToasts.value.findIndex(t => t.id === id);
  if (idx !== -1) mockToasts.value.splice(idx, 1);
});

vi.mock('@/composables/useToast', () => ({
  useToast: () => ({
    toasts: mockToasts,
    addToast: vi.fn(),
    dismissToast: mockDismissToast
  })
}));

import AppToast from '@/components/ui/AppToast.vue';

// Stub Teleport so content renders inline (not teleported to body) — makes
// wrapper.find() work correctly in jsdom.
const mountOptions = { global: { stubs: { Teleport: true } } };

describe('AppToast.vue', () => {
  beforeEach(() => {
    mockToasts.value = [];
    mockDismissToast.mockClear();
  });

  it('renders no toasts when the stack is empty', () => {
    const wrapper = mount(AppToast, mountOptions);
    expect(wrapper.findAll('.toast')).toHaveLength(0);
    wrapper.unmount();
  });

  it('renders a success toast with correct class and message', async () => {
    mockToasts.value = [{ id: 1, message: 'Saved!', type: 'success', duration: 3500 }];
    const wrapper = mount(AppToast, mountOptions);
    await nextTick();

    const toast = wrapper.find('.toast.success');
    expect(toast.exists()).toBe(true);
    expect(toast.text()).toContain('Saved!');
    wrapper.unmount();
  });

  it('renders an error toast with the error class', async () => {
    mockToasts.value = [{ id: 2, message: 'Export failed', type: 'error', duration: 3500 }];
    const wrapper = mount(AppToast, mountOptions);
    await nextTick();

    const toast = wrapper.find('.toast.error');
    expect(toast.exists()).toBe(true);
    wrapper.unmount();
  });

  it('renders an info toast with the info class', async () => {
    mockToasts.value = [{ id: 3, message: 'Print dialog opened', type: 'info', duration: 3500 }];
    const wrapper = mount(AppToast, mountOptions);
    await nextTick();

    const toast = wrapper.find('.toast.info');
    expect(toast.exists()).toBe(true);
    wrapper.unmount();
  });

  it('clicking the close button calls dismissToast with the correct id', async () => {
    mockToasts.value = [{ id: 42, message: 'Dismiss me', type: 'success', duration: 3500 }];
    const wrapper = mount(AppToast, mountOptions);
    await nextTick();

    await wrapper.find('button.toast-close').trigger('click');
    expect(mockDismissToast).toHaveBeenCalledWith(42);
    wrapper.unmount();
  });

  it('removing a toast from the stack hides it', async () => {
    mockToasts.value = [{ id: 10, message: 'Temp', type: 'info', duration: 1000 }];
    const wrapper = mount(AppToast, mountOptions);
    await nextTick();
    expect(wrapper.findAll('.toast')).toHaveLength(1);

    // Simulate dismissal
    mockToasts.value = [];
    await nextTick();
    expect(wrapper.findAll('.toast')).toHaveLength(0);
    wrapper.unmount();
  });

  it('renders multiple toasts simultaneously', async () => {
    mockToasts.value = [
      { id: 1, message: 'First', type: 'success', duration: 3500 },
      { id: 2, message: 'Second', type: 'error', duration: 3500 },
      { id: 3, message: 'Third', type: 'info', duration: 3500 }
    ];
    const wrapper = mount(AppToast, mountOptions);
    await nextTick();

    expect(wrapper.findAll('.toast')).toHaveLength(3);
    wrapper.unmount();
  });

  it('shows the correct icon for success type', async () => {
    mockToasts.value = [{ id: 1, message: 'OK', type: 'success', duration: 3500 }];
    const wrapper = mount(AppToast, mountOptions);
    await nextTick();

    expect(wrapper.find('.toast-icon').text()).toBe('✓');
    wrapper.unmount();
  });

  it('shows the correct icon for error type', async () => {
    mockToasts.value = [{ id: 2, message: 'Fail', type: 'error', duration: 3500 }];
    const wrapper = mount(AppToast, mountOptions);
    await nextTick();

    expect(wrapper.find('.toast-icon').text()).toBe('✕');
    wrapper.unmount();
  });

  it('shows the correct icon for info type', async () => {
    mockToasts.value = [{ id: 3, message: 'FYI', type: 'info', duration: 3500 }];
    const wrapper = mount(AppToast, mountOptions);
    await nextTick();

    expect(wrapper.find('.toast-icon').text()).toBe('ℹ');
    wrapper.unmount();
  });
});
