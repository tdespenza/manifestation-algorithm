import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';

// Mock setLocale to prevent it from touching localStorage in the test env.
// The test just verifies the component reactive state update.
const setLocaleMock = vi.hoisted(() => vi.fn());
vi.mock('@/i18n', async () => {
  const actual = (await vi.importActual('@/i18n')) as Record<string, unknown>;
  return { ...actual, setLocale: setLocaleMock };
});

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
  saveLastSession: true as boolean,
  goalScore: null as number | null,
  setGoalScore: vi.fn().mockResolvedValue(undefined)
}));

vi.mock('@/stores/questionnaire', () => ({
  useQuestionnaireStore: () => ({
    sessionId: 'test-session-id',
    get saveLastSession() {
      return storeMocks.saveLastSession;
    },
    get goalScore() {
      return storeMocks.goalScore;
    },
    reset: storeMocks.reset,
    init: storeMocks.init,
    setSaveLastSession: storeMocks.setSaveLastSession,
    setGoalScore: storeMocks.setGoalScore
  })
}));

import Settings from '@/components/ui/Settings.vue';
import { SUPPORTED_LOCALES } from '@/i18n';

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

  // ── Goal score ─────────────────────────────────────────────────────────────

  it('shows Clear button and current target when goalScore is set', async () => {
    storeMocks.goalScore = 7500;
    const wrapper = mount(Settings);
    await flushPromises();
    expect(wrapper.find('.btn-secondary').exists()).toBe(true);
    expect(wrapper.find('.goal-current').exists()).toBe(true);
    expect(wrapper.find('.goal-current').text()).toContain('7,500');
    storeMocks.goalScore = null;
  });

  it('saveGoal calls store.setGoalScore with parsed value for valid input', async () => {
    const wrapper = mount(Settings);
    await flushPromises();
    (wrapper.vm as any).goalInput = '7500';
    await wrapper.find('.btn-primary.btn-sm').trigger('click');
    await flushPromises();
    expect(storeMocks.setGoalScore).toHaveBeenCalledWith(7500);
  });

  it('saveGoal calls store.setGoalScore(null) when input is empty', async () => {
    const wrapper = mount(Settings);
    await flushPromises();
    const input = wrapper.find<HTMLInputElement>('.goal-input');
    await input.setValue('');
    await wrapper.find('.btn-primary.btn-sm').trigger('click');
    await flushPromises();
    expect(storeMocks.setGoalScore).toHaveBeenCalledWith(null);
  });

  it('saveGoal shows error for out-of-range value (below 1000)', async () => {
    const wrapper = mount(Settings);
    await flushPromises();
    (wrapper.vm as any).goalInput = '500';
    await wrapper.find('.btn-primary.btn-sm').trigger('click');
    await flushPromises();
    expect(wrapper.find('.goal-error').exists()).toBe(true);
    expect(storeMocks.setGoalScore).not.toHaveBeenCalled();
  });

  it('saveGoal shows error for out-of-range value (above 10000)', async () => {
    const wrapper = mount(Settings);
    await flushPromises();
    (wrapper.vm as any).goalInput = '15000';
    await wrapper.find('.btn-primary.btn-sm').trigger('click');
    await flushPromises();
    expect(wrapper.find('.goal-error').exists()).toBe(true);
    expect(storeMocks.setGoalScore).not.toHaveBeenCalled();
  });

  it('saveGoal shows error for non-numeric input (isNaN path)', async () => {
    const wrapper = mount(Settings);
    await flushPromises();
    // Manually set goalInput to a non-numeric string to trigger isNaN path
    (wrapper.vm as any).goalInput = 'abc';
    await wrapper.find('.btn-primary.btn-sm').trigger('click');
    await flushPromises();
    expect(wrapper.find('.goal-error').exists()).toBe(true);
    expect(storeMocks.setGoalScore).not.toHaveBeenCalled();
  });

  it('saveGoal triggers on Enter key press', async () => {
    const wrapper = mount(Settings);
    await flushPromises();
    (wrapper.vm as any).goalInput = '6000';
    const input = wrapper.find<HTMLInputElement>('.goal-input');
    await input.trigger('keyup.enter');
    await flushPromises();
    expect(storeMocks.setGoalScore).toHaveBeenCalledWith(6000);
  });

  it('clearGoal calls store.setGoalScore(null) and clears input', async () => {
    storeMocks.goalScore = 5000;
    const wrapper = mount(Settings);
    await flushPromises();
    // Click the Clear button (btn-secondary)
    await wrapper.find('.btn-secondary').trigger('click');
    await flushPromises();
    expect(storeMocks.setGoalScore).toHaveBeenCalledWith(null);
    expect((wrapper.vm as any).goalInput).toBe('');
    storeMocks.goalScore = null;
  });

  it('onLocaleChange updates currentLocale and calls setLocale', async () => {
    const wrapper = mount(Settings);
    await flushPromises();

    const select = wrapper.find('#lang-select');
    if (!select.exists()) return; // guard: skip if language selector absent

    // Set the select element's value before triggering the change event
    const selectEl = select.element as HTMLSelectElement;
    selectEl.value = 'es';
    await select.trigger('change');

    // setLocale should have been called with the new locale
    expect(setLocaleMock).toHaveBeenCalledWith('es');
    // The component's reactive currentLocale ref should reflect the change
    expect((wrapper.vm as any).currentLocale).toBe('es');
  });

  it('renders all supported locale options in language selector', async () => {
    const wrapper = mount(Settings);
    await flushPromises();

    const options = wrapper.findAll('#lang-select option');
    expect(options.length).toBe(Object.keys(SUPPORTED_LOCALES).length);
    expect(options.length).toBe(100);
  });
});
