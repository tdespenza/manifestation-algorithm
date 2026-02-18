import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import Questionnaire from '../Questionnaire.vue';
import { useQuestionnaireStore } from '../../../stores/questionnaire';

describe('Questionnaire.vue', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('shows saving indicator when store isSaving is true', async () => {
    const wrapper = mount(Questionnaire, {
      global: {
        plugins: [createTestingPinia({
            createSpy: vi.fn,
            stubActions: false,
            initialState: {
                questionnaire: {
                    answers: {},
                    isSaving: false
                }
            }
        })]
      }
    });

    const store = useQuestionnaireStore();
    
    // Simulate saving state directly
    store.isSaving = true;
    
    await wrapper.vm.$nextTick();
    
    const indicator = wrapper.find('.save-indicator');
    expect(indicator.classes()).toContain('saving');
    expect(indicator.text()).toBe('Saving...');
    
    // Simulate save completion
    store.isSaving = false;
    await wrapper.vm.$nextTick();
    
    expect(indicator.classes()).toContain('saved');
    expect(indicator.text()).toBe('Saved');
  });

  it('displays correct score from store', async () => {
    const wrapper = mount(Questionnaire, {
        global: {
          plugins: [createTestingPinia({
              createSpy: vi.fn,
              stubActions: false,
          })]
        }
    });
    
    const scoreEl = wrapper.find('.current-score');
    expect(scoreEl.text()).toBe('0');
  });
});
