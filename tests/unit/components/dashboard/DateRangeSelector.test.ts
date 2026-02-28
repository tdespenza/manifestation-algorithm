import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import DateRangeSelector from '@/components/dashboard/DateRangeSelector.vue';
import type { DateRange } from '@/composables/useDateFilter';

const defaultRanges: DateRange[] = [
  { label: '7d', value: '7d' },
  { label: '30d', value: '30d' },
  { label: 'All', value: 'all' },
  { label: 'Custom', value: 'custom' }
];

const defaultProps = {
  modelValue: '30d',
  ranges: defaultRanges,
  customStart: '',
  customEnd: '',
  todayStr: '2024-06-01'
};

describe('DateRangeSelector.vue', () => {
  it('renders one pill per range', () => {
    const wrapper = mount(DateRangeSelector, { props: defaultProps });
    const pills = wrapper.findAll('.range-pill');
    expect(pills).toHaveLength(defaultRanges.length);
  });

  it('marks the active pill based on modelValue', () => {
    const wrapper = mount(DateRangeSelector, { props: defaultProps });
    const active = wrapper.findAll('.range-pill.active');
    expect(active).toHaveLength(1);
    expect(active[0].text()).toBe('30d');
  });

  it('emits update:modelValue when a pill is clicked (select function)', async () => {
    const wrapper = mount(DateRangeSelector, { props: defaultProps });
    const pill = wrapper.findAll('.range-pill')[0]; // '7d'
    await pill.trigger('click');
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['7d']);
  });

  it('does not show custom date inputs by default (modelValue != custom)', () => {
    const wrapper = mount(DateRangeSelector, { props: defaultProps });
    expect(wrapper.find('#custom-start').exists()).toBe(false);
    expect(wrapper.find('#custom-end').exists()).toBe(false);
  });

  it('shows custom date inputs when modelValue is "custom"', () => {
    const wrapper = mount(DateRangeSelector, {
      props: { ...defaultProps, modelValue: 'custom' }
    });
    expect(wrapper.find('#custom-start').exists()).toBe(true);
    expect(wrapper.find('#custom-end').exists()).toBe(true);
  });

  it('uses todayStr as max for end date input', () => {
    const wrapper = mount(DateRangeSelector, {
      props: { ...defaultProps, modelValue: 'custom', todayStr: '2024-06-01' }
    });
    const endInput = wrapper.find<HTMLInputElement>('#custom-end');
    expect(endInput.attributes('max')).toBe('2024-06-01');
  });

  it('uses todayStr as max for start date input when no customEnd set', () => {
    const wrapper = mount(DateRangeSelector, {
      props: { ...defaultProps, modelValue: 'custom', customEnd: '' }
    });
    const startInput = wrapper.find<HTMLInputElement>('#custom-start');
    expect(startInput.attributes('max')).toBe('2024-06-01');
  });

  it('uses customEnd as max for start date input when customEnd is set', () => {
    const wrapper = mount(DateRangeSelector, {
      props: { ...defaultProps, modelValue: 'custom', customEnd: '2024-05-15' }
    });
    const startInput = wrapper.find<HTMLInputElement>('#custom-start');
    expect(startInput.attributes('max')).toBe('2024-05-15');
  });

  it('emits update:customStart on start date input', async () => {
    const wrapper = mount(DateRangeSelector, {
      props: { ...defaultProps, modelValue: 'custom' }
    });
    const startInput = wrapper.find<HTMLInputElement>('#custom-start');
    Object.defineProperty(startInput.element, 'value', { value: '2024-01-15', writable: true });
    await startInput.trigger('input');
    expect(wrapper.emitted('update:customStart')).toBeTruthy();
  });

  it('emits update:customEnd on end date input', async () => {
    const wrapper = mount(DateRangeSelector, {
      props: { ...defaultProps, modelValue: 'custom' }
    });
    const endInput = wrapper.find<HTMLInputElement>('#custom-end');
    Object.defineProperty(endInput.element, 'value', { value: '2024-01-31', writable: true });
    await endInput.trigger('input');
    expect(wrapper.emitted('update:customEnd')).toBeTruthy();
  });

  it('falls back to today when todayStr prop is not provided', () => {
    // todayStr is optional — when absent the component computes toISOString().slice(0,10)
    const wrapper = mount(DateRangeSelector, {
      props: { modelValue: 'custom', ranges: defaultRanges, customStart: '', customEnd: '' }
    });
    // no crash and custom inputs are present
    expect(wrapper.find('#custom-end').exists()).toBe(true);
    const maxAttr = wrapper.find<HTMLInputElement>('#custom-end').attributes('max');
    expect(maxAttr).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});
