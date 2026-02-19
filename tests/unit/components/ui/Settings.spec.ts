import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';

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
  init: vi.fn().mockResolvedValue(undefined)
}));

vi.mock('@/stores/questionnaire', () => ({
  useQuestionnaireStore: () => ({
    sessionId: 'test-session-id',
    $reset: storeMocks.reset,
    init: storeMocks.init
  })
}));

import Settings from '@/components/ui/Settings.vue';

describe('Settings.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
    vi.stubGlobal('confirm', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('renders the settings panel with a title', () => {
    const wrapper = mount(Settings);
    expect(wrapper.text()).toContain('App Settings');
    expect(wrapper.text()).toContain('Manifestation Algorithm v0.1.0');
  });

  it('emits "close" when X button is clicked', async () => {
    const wrapper = mount(Settings);
    const closeBtn = wrapper.findAll('button').find(b => b.text() === 'X');
    expect(closeBtn).toBeDefined();
    await closeBtn!.trigger('click');
    expect(wrapper.emitted('close')).toBeTruthy();
  });

  it('"Clear All Answers" clears session, resets store and emits close on confirm', async () => {
    vi.stubGlobal('confirm', vi.fn().mockReturnValue(true));
    const wrapper = mount(Settings);
    const clearBtn = wrapper.find('button.btn-danger');
    await clearBtn.trigger('click');
    // Wait for async confirmClear
    await new Promise(r => setTimeout(r, 0));

    expect(dbMocks.clearSession).toHaveBeenCalledWith('test-session-id');
    expect(storeMocks.reset).toHaveBeenCalled();
    expect(storeMocks.init).toHaveBeenCalled();
    expect(wrapper.emitted('close')).toBeTruthy();
  });

  it('"Clear All Answers" does nothing when confirm is cancelled', async () => {
    vi.stubGlobal('confirm', vi.fn().mockReturnValue(false));
    const wrapper = mount(Settings);
    const clearBtn = wrapper.find('button.btn-danger');
    await clearBtn.trigger('click');
    await new Promise(r => setTimeout(r, 0));

    expect(dbMocks.clearSession).not.toHaveBeenCalled();
    expect(wrapper.emitted('close')).toBeFalsy();
  });
});
