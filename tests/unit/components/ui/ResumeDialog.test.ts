import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import ResumeDialog from '@/components/ui/ResumeDialog.vue';

describe('ResumeDialog.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('renders the overlay and welcome message by default', () => {
    const wrapper = mount(ResumeDialog);
    expect(wrapper.find('.overlay').exists()).toBe(true);
    expect(wrapper.text()).toContain('Welcome Back!');
  });

  it('emits "resume" when Resume Session button is clicked', async () => {
    const wrapper = mount(ResumeDialog);
    await wrapper.find('button.btn-primary').trigger('click');
    expect(wrapper.emitted('resume')).toBeTruthy();
  });

  it('clicking Start Fresh shows the confirm zone', async () => {
    const wrapper = mount(ResumeDialog);
    await wrapper.find('button.btn-secondary').trigger('click');
    await nextTick();
    expect(wrapper.find('.confirm-zone').exists()).toBe(true);
    expect(wrapper.find('.confirm-warning').exists()).toBe(true);
  });

  it('emits "fresh" after confirming Start Fresh', async () => {
    const wrapper = mount(ResumeDialog);
    await wrapper.find('button.btn-secondary').trigger('click');
    await nextTick();
    await wrapper.find('button.btn-danger').trigger('click');
    expect(wrapper.emitted('fresh')).toBeTruthy();
  });

  it('hides confirm zone when Cancel is clicked without emitting fresh', async () => {
    const wrapper = mount(ResumeDialog);
    await wrapper.find('button.btn-secondary').trigger('click');
    await nextTick();
    expect(wrapper.find('.confirm-zone').exists()).toBe(true);
    // Cancel is the second button inside confirm-zone → btn-secondary
    const cancelBtn = wrapper.find('.confirm-zone button.btn-secondary');
    await cancelBtn.trigger('click');
    await nextTick();
    expect(wrapper.find('.confirm-zone').exists()).toBe(false);
    expect(wrapper.emitted('fresh')).toBeFalsy();
  });

  it('does not call window.confirm at any point', async () => {
    const confirmSpy = vi.fn();
    vi.stubGlobal('confirm', confirmSpy);
    const wrapper = mount(ResumeDialog);
    await wrapper.find('button.btn-secondary').trigger('click');
    await nextTick();
    await wrapper.find('button.btn-danger').trigger('click');
    expect(confirmSpy).not.toHaveBeenCalled();
  });

  it('shows "Continue from Last Session?" when isHistorical is true', () => {
    const wrapper = mount(ResumeDialog, { props: { isHistorical: true } });
    expect(wrapper.text()).toContain('Continue from Last Session?');
    expect(wrapper.find('button.btn-primary').text()).toBe('Keep Last Values');
  });

  it('shows "Welcome Back!" when isHistorical is false', () => {
    const wrapper = mount(ResumeDialog, { props: { isHistorical: false } });
    expect(wrapper.text()).toContain('Welcome Back!');
    expect(wrapper.find('button.btn-primary').text()).toBe('Resume Session');
  });

  it('emits "resume" with isHistorical=true via the primary button', async () => {
    const wrapper = mount(ResumeDialog, { props: { isHistorical: true } });
    await wrapper.find('button.btn-primary').trigger('click');
    expect(wrapper.emitted('resume')).toBeTruthy();
  });
});
