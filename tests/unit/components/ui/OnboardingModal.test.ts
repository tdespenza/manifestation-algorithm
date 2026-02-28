import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import OnboardingModal from '@/components/ui/OnboardingModal.vue';

describe('OnboardingModal.vue', () => {
  function make() {
    return mount(OnboardingModal, { attachTo: document.body });
  }

  it('renders the first welcome step on mount', () => {
    const wrapper = make();
    expect(wrapper.find('[role="dialog"]').exists()).toBe(true);
    expect(wrapper.find('.step-title').text()).toContain('Welcome');
    wrapper.unmount();
  });

  it('has aria-modal=true', () => {
    const wrapper = make();
    expect(wrapper.find('[aria-modal="true"]').exists()).toBe(true);
    wrapper.unmount();
  });

  it('advances to step 2 when Next is clicked', async () => {
    const wrapper = make();
    await wrapper.find('.btn-next').trigger('click');
    expect(wrapper.find('.step-title').text()).toContain('Scoring');
    wrapper.unmount();
  });

  it('renders score tiers on step 2', async () => {
    const wrapper = make();
    await wrapper.find('.btn-next').trigger('click');
    expect(wrapper.find('.tier--excellent').exists()).toBe(true);
    expect(wrapper.find('.tier--good').exists()).toBe(true);
    expect(wrapper.find('.tier--needs-work').exists()).toBe(true);
    wrapper.unmount();
  });

  it('advances to step 3 (privacy) from step 2', async () => {
    const wrapper = make();
    await wrapper.find('.btn-next').trigger('click'); // step 1
    await wrapper.find('.btn-next').trigger('click'); // step 2
    expect(wrapper.find('.step-title').text()).toContain('Private');
    wrapper.unmount();
  });

  it('emits "complete" when Get Started is clicked on last step', async () => {
    const wrapper = make();
    await wrapper.find('.btn-next').trigger('click');
    await wrapper.find('.btn-next').trigger('click');
    await wrapper.find('.btn-next').trigger('click');
    expect(wrapper.emitted('complete')).toHaveLength(1);
    wrapper.unmount();
  });

  it('emits "complete" immediately when Skip is clicked', async () => {
    const wrapper = make();
    await wrapper.find('.btn-skip').trigger('click');
    expect(wrapper.emitted('complete')).toHaveLength(1);
    wrapper.unmount();
  });

  it('shows 3 step dots', () => {
    const wrapper = make();
    expect(wrapper.findAll('.dot')).toHaveLength(3);
    wrapper.unmount();
  });

  it('first dot is active on mount', () => {
    const wrapper = make();
    const dots = wrapper.findAll('.dot');
    expect(dots[0].classes()).toContain('active');
    expect(dots[1].classes()).not.toContain('active');
    wrapper.unmount();
  });

  it('second dot becomes active after Next', async () => {
    const wrapper = make();
    await wrapper.find('.btn-next').trigger('click');
    const dots = wrapper.findAll('.dot');
    expect(dots[0].classes()).toContain('done');
    expect(dots[1].classes()).toContain('active');
    wrapper.unmount();
  });
});
