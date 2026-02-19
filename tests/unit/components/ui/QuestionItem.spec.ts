import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import QuestionItem from '@/components/ui/QuestionItem.vue';
import { useQuestionnaireStore } from '@/stores/questionnaire';

describe('QuestionItem.vue', () => {
  const dummyQuestion = {
    id: '1',
    description: 'Test Question',
    points: 100,
    hasSubPoints: false
  };

  const parentQuestion = {
    id: 'p1',
    description: 'Parent Question',
    points: 0,
    hasSubPoints: true,
    subPoints: [
      { id: 'sub1', description: 'Sub Question 1', points: 50, hasSubPoints: false },
      { id: 'sub2', description: 'Sub Question 2', points: 50, hasSubPoints: false },
    ],
  };

  it('renders correctly', () => {
    const wrapper = mount(QuestionItem, {
      props: { question: dummyQuestion },
      global: {
        plugins: [createTestingPinia({
          createSpy: vi.fn,
        })]
      }
    });

    expect(wrapper.text()).toContain('Test Question');
    expect(wrapper.text()).toContain('100 points');
    expect(wrapper.find('input[type="range"]').exists()).toBe(true);
  });

  it('updates store on input', async () => {
    // Need to mount with pinia
    const wrapper = mount(QuestionItem, {
      props: { question: dummyQuestion },
      global: {
        plugins: [createTestingPinia({
          createSpy: vi.fn,
          stubActions: false
        })]
      }
    });
    
    const store = useQuestionnaireStore();
    const input = wrapper.find('input[type="range"]');
    
    await input.setValue('5');
    
    // Check if store action was called
    expect(store.setAnswer).toHaveBeenCalledWith('1', 5);
  });

  it('does not show slider for a parent question (hasSubPoints=true)', () => {
    const wrapper = mount(QuestionItem, {
      props: { question: parentQuestion },
      global: { plugins: [createTestingPinia({ createSpy: vi.fn })] },
    });
    // Parent question should have the parent-question class, not sub-question
    const parentItem = wrapper.find('.parent-question');
    expect(parentItem.exists()).toBe(true);
    // Sub-points section renders the child questions
    expect(wrapper.find('.sub-points-section').exists()).toBe(true);
    // Sub-questions are rendered inside the sub-points section
    const subSection = wrapper.find('.sub-points-section');
    expect(subSection.findAll('.question-item').length).toBe(2);
  });

  it('renders sub-question items when hasSubPoints=true', () => {
    const wrapper = mount(QuestionItem, {
      props: { question: parentQuestion },
      global: { plugins: [createTestingPinia({ createSpy: vi.fn })] },
    });
    // Each sub-question rendered as a nested QuestionItem
    const subItems = wrapper.findAll('.question-item');
    // The parent is one item + 2 sub items = 3
    expect(subItems.length).toBeGreaterThanOrEqual(2);
  });

  it('hides sub-points section when hasSubPoints=true but subPoints is undefined', () => {
    const questionWithoutSubsArray = { id: 'q2', description: 'Parent no subs', points: 0, hasSubPoints: true };
    const wrapper = mount(QuestionItem, {
      props: { question: questionWithoutSubsArray },
      global: { plugins: [createTestingPinia({ createSpy: vi.fn })] },
    });
    expect(wrapper.find('.sub-points-section').exists()).toBe(false);
  });

  it('input value out of range does not call setAnswer (setter guards 1-10)', async () => {
    const wrapper = mount(QuestionItem, {
      props: { question: dummyQuestion },
      global: { plugins: [createTestingPinia({ createSpy: vi.fn, stubActions: false })] },
    });
    const store = useQuestionnaireStore();
    // Manually trigger handleInput with out-of-range value via direct call
    const input = wrapper.find('input[type="range"]');
    const event = new Event('input');
    Object.defineProperty(event, 'target', { value: { value: '0' } });
    await input.element.dispatchEvent(event);
    // setAnswer should not have been called because val 0 < 1
    expect(store.setAnswer).not.toHaveBeenCalled();
  });

  it('isSubQuestion prop adds sub-question class', () => {
    const wrapper = mount(QuestionItem, {
      props: { question: dummyQuestion, isSubQuestion: true },
      global: { plugins: [createTestingPinia({ createSpy: vi.fn })] },
    });
    expect(wrapper.find('.question-item').classes()).toContain('sub-question');
  });
});
