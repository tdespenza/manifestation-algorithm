import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import ResumeDialog from '../ResumeDialog.vue';

describe('ResumeDialog.vue', () => {
  beforeEach(() => {
    vi.stubGlobal('confirm', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('renders the overlay and welcome message', () => {
    const wrapper = mount(ResumeDialog);
    expect(wrapper.find('.overlay').exists()).toBe(true);
    expect(wrapper.text()).toContain('Welcome Back!');
  });

  it('emits "resume" when Resume Session button is clicked', async () => {
    const wrapper = mount(ResumeDialog);
    await wrapper.find('button.btn-primary').trigger('click');
    expect(wrapper.emitted('resume')).toBeTruthy();
  });

  it('emits "fresh" when Start Fresh is confirmed', async () => {
    vi.stubGlobal('confirm', vi.fn().mockReturnValue(true));
    const wrapper = mount(ResumeDialog);
    await wrapper.find('button.btn-secondary').trigger('click');
    expect(wrapper.emitted('fresh')).toBeTruthy();
  });

  it('does NOT emit "fresh" when Start Fresh is cancelled', async () => {
    vi.stubGlobal('confirm', vi.fn().mockReturnValue(false));
    const wrapper = mount(ResumeDialog);
    await wrapper.find('button.btn-secondary').trigger('click');
    expect(wrapper.emitted('fresh')).toBeFalsy();
  });
});
