import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import QuestionItem from '../QuestionItem.vue';
import { useQuestionnaireStore } from '../../../stores/questionnaire';

describe('QuestionItem.vue', () => {
  const dummyQuestion = {
    id: '1',
    description: 'Test Question',
    points: 100,
    hasSubPoints: false
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
});
