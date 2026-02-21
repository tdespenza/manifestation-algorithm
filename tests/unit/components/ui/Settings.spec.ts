import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';

// ── Tauri app API mock ────────────────────────────────────────────────────────
vi.mock('@tauri-apps/api/app', () => ({
  getVersion: vi.fn().mockResolvedValue('0.2.2')
}));

import { getVersion } from '@tauri-apps/api/app';

// ── DB mock ───────────────────────────────────────────────────────────────────
const dbMocks = vi.hoisted(() => ({
  clearSession: vi.fn().mockResolvedValue(undefined)
}));

vi.mock('@/services/db', () => ({
  clearSession: dbMocks.clearSession
}));

// ── Store mock ────────────────────────────────────────────────────────────────
const storeMocks = vi.hoisted(() => ({
  reset: vi.fn(),
  init: vi.fn().mockResolvedValue(undefined),
  setSaveLastSession: vi.fn().mockResolvedValue(undefined),
  saveLastSession: true as boolean
}));

vi.mock('@/stores/questionnaire', () => ({
  useQuestionnaireStore: () => ({
    sessionId: 'test-session-id',
    get saveLastSession() {
      return storeMocks.saveLastSession;
    },
    reset: storeMocks.reset,
    init: storeMocks.init,
    setSaveLastSession: storeMocks.setSaveLastSession
  })
}));

import Settings from '@/components/ui/Settings.vue';

describe('Settings.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
  });

  it('renders the settings panel with a title', async () => {
    const wrapper = mount(Settings);
    await flushPromises();
    expect(wrapper.text()).toContain('App Settings');
    expect(wrapper.text()).toContain('Manifestation Algorithm v0.2.2');
  });

  it('emits "close" when close button is clicked', async () => {
    const wrapper = mount(Settings);
    const closeBtn = wrapper.find('button.btn-close');
    expect(closeBtn.exists()).toBe(true);
    await closeBtn.trigger('click');
    expect(wrapper.emitted('close')).toBeTruthy();
  });

  it('"Clear All Answers" shows the confirm dialog', async () => {
    const wrapper = mount(Settings);
    const clearBtn = wrapper.find('button.btn-danger');
    await clearBtn.trigger('click');
    await wrapper.vm.$nextTick();
    expect((wrapper.vm as any).clearConfirmVisible).toBe(true);
    expect(dbMocks.clearSession).not.toHaveBeenCalled();
  });

  it('doClear clears session, resets store and emits close', async () => {
    const wrapper = mount(Settings);
    await (wrapper.vm as any).doClear();
    await flushPromises();
    expect(dbMocks.clearSession).toHaveBeenCalledWith('test-session-id');
    expect(storeMocks.reset).toHaveBeenCalled();
    expect(storeMocks.init).toHaveBeenCalled();
    expect(wrapper.emitted('close')).toBeTruthy();
  });

  it('cancelling the confirm dialog hides it without clearing', async () => {
    const wrapper = mount(Settings);
    const vm = wrapper.vm as any;
    // Open confirm dialog via requestClear
    await (wrapper.vm as any).requestClear();
    await wrapper.vm.$nextTick();
    expect(vm.clearConfirmVisible).toBe(true);
    // Trigger @cancel on ConfirmDialog — this fires the inline handler
    const dialog = wrapper.findComponent({ name: 'ConfirmDialog' });
    await dialog.vm.$emit('cancel');
    await wrapper.vm.$nextTick();
    expect(vm.clearConfirmVisible).toBe(false);
    expect(dbMocks.clearSession).not.toHaveBeenCalled();
  });

  it('falls back to v0.2.2 when getVersion rejects', async () => {
    vi.mocked(getVersion).mockRejectedValueOnce(new Error('not in tauri'));
    const wrapper = mount(Settings);
    await flushPromises();
    expect(wrapper.text()).toContain('v0.2.2');
  });

  it('renders the Save Last Session toggle', async () => {
    const wrapper = mount(Settings);
    await flushPromises();
    const toggle = wrapper.find('button.btn-toggle');
    expect(toggle.exists()).toBe(true);
    expect(toggle.text()).toBe('On');
    expect(toggle.classes()).toContain('active');
  });

  it('clicking the Save Last Session toggle calls store.setSaveLastSession', async () => {
    const wrapper = mount(Settings);
    await flushPromises();
    const toggle = wrapper.find('button.btn-toggle');
    await toggle.trigger('click');
    expect(storeMocks.setSaveLastSession).toHaveBeenCalledWith(false);
  });

  it('Save Last Session toggle shows "Off" when saveLastSession is false', async () => {
    storeMocks.saveLastSession = false;
    const wrapper = mount(Settings);
    await flushPromises();
    const toggle = wrapper.find('button.btn-toggle');
    expect(toggle.text()).toBe('Off');
    expect(toggle.classes()).not.toContain('active');
    storeMocks.saveLastSession = true; // restore for subsequent tests
  });
});
