import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';

// ── Stub vue-chartjs Line component ──────────────────────────────────────────
vi.mock('vue-chartjs', () => ({
  Line: { template: '<canvas class="chart-stub" />' }
}));

// ── Mock vue-router ───────────────────────────────────────────────────────────
const mockPush = vi.fn();
vi.mock('vue-router', () => ({
  useRouter: () => ({ push: mockPush })
}));

// ── Import component after mocks ─────────────────────────────────────────────
import CategoryCard from '@/components/dashboard/CategoryCard.vue';

const improvingData = [1, 2, 3, 4, 5, 6, 7];
const decliningData = [7, 6, 5, 4, 3, 2, 1];
const stableData = [5, 5, 5, 5, 5, 5, 5];
describe('CategoryCard.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders category name', () => {
    const wrapper = mount(CategoryCard, {
      props: { category: 'Health', trendData: stableData, dates: [] }
    });
    expect(wrapper.find('h3').text()).toBe('Health');
  });

  it('hides score div when currentScore is undefined', () => {
    const wrapper = mount(CategoryCard, {
      props: { category: 'Health', trendData: stableData, dates: [] }
    });
    expect(wrapper.find('.current-score').exists()).toBe(false);
  });

  it('shows score div and "high" class when currentScore >= 8', () => {
    const wrapper = mount(CategoryCard, {
      props: { category: 'Health', trendData: stableData, dates: [], currentScore: 9 }
    });
    expect(wrapper.find('.current-score.high').exists()).toBe(true);
  });

  it('shows "medium" class when currentScore >= 5 and < 8', () => {
    const wrapper = mount(CategoryCard, {
      props: { category: 'Health', trendData: stableData, dates: [], currentScore: 6 }
    });
    expect(wrapper.find('.current-score.medium').exists()).toBe(true);
  });

  it('shows "low" class when currentScore < 5', () => {
    const wrapper = mount(CategoryCard, {
      props: { category: 'Health', trendData: stableData, dates: [], currentScore: 3 }
    });
    expect(wrapper.find('.current-score.low').exists()).toBe(true);
  });

  it('shows no scoreClass when currentScore is 0 (falsy)', () => {
    const wrapper = mount(CategoryCard, {
      props: { category: 'Health', trendData: stableData, dates: [], currentScore: 0 }
    });
    // currentScore === 0 → shows div (0 !== undefined) but scoreClass should be ''
    const scoreEl = wrapper.find('.current-score');
    expect(scoreEl.exists()).toBe(true);
    expect(scoreEl.classes()).not.toContain('high');
    expect(scoreEl.classes()).not.toContain('medium');
    expect(scoreEl.classes()).not.toContain('low');
  });

  it('shows improving trend icon (↑) with trend-up class', () => {
    const wrapper = mount(CategoryCard, {
      props: { category: 'Wealth', trendData: improvingData, dates: [], currentScore: 7 }
    });
    const icon = wrapper.find('.trend-icon');
    expect(icon.exists()).toBe(true);
    expect(icon.text()).toBe('↑');
    expect(icon.classes()).toContain('trend-up');
  });

  it('shows declining trend icon (↓) with trend-down class', () => {
    const wrapper = mount(CategoryCard, {
      props: { category: 'Wealth', trendData: decliningData, dates: [], currentScore: 3 }
    });
    const icon = wrapper.find('.trend-icon');
    expect(icon.exists()).toBe(true);
    expect(icon.text()).toBe('↓');
    expect(icon.classes()).toContain('trend-down');
  });

  it('shows stable trend icon (→) with trend-stable class', () => {
    const wrapper = mount(CategoryCard, {
      props: { category: 'Wealth', trendData: stableData, dates: [], currentScore: 5 }
    });
    const icon = wrapper.find('.trend-icon');
    expect(icon.exists()).toBe(true);
    expect(icon.text()).toBe('→');
    expect(icon.classes()).toContain('trend-stable');
  });

  it('hides trend icon when data is insufficient (< 3 items)', () => {
    const wrapper = mount(CategoryCard, {
      props: { category: 'Health', trendData: [5, 6], dates: [], currentScore: 5 }
    });
    // detectTrend([5,6]) = 'insufficient' → trendIcon = '' → v-if is falsy
    expect(wrapper.find('.trend-icon').exists()).toBe(false);
  });

  it('shows sparkline when trendData.length > 1', () => {
    const wrapper = mount(CategoryCard, {
      props: { category: 'Health', trendData: [5, 7], dates: ['Jan', 'Feb'] }
    });
    expect(wrapper.find('.sparkline-container').exists()).toBe(true);
    expect(wrapper.find('.no-trend').exists()).toBe(false);
  });

  it('shows "no trend" message when trendData has 0 or 1 items', () => {
    const wrapper = mount(CategoryCard, {
      props: { category: 'Health', trendData: [5], dates: ['Jan'] }
    });
    expect(wrapper.find('.no-trend').exists()).toBe(true);
    expect(wrapper.find('.sparkline-container').exists()).toBe(false);
  });

  it('navigates to CategoryDetail on card click', async () => {
    const wrapper = mount(CategoryCard, {
      props: { category: 'Health', trendData: stableData, dates: [] }
    });
    await wrapper.find('.category-card').trigger('click');
    expect(mockPush).toHaveBeenCalledWith({ name: 'CategoryDetail', params: { id: 'Health' } });
  });

  it('chartData borderColor is black for uptrend (last >= first)', () => {
    const wrapper = mount(CategoryCard, {
      props: { category: 'Health', trendData: [3, 5], dates: ['Jan', 'Feb'] }
    });
    // isUptrend = true (5 >= 3) → borderColor = '#000000'
    const vm = wrapper.vm as unknown as { chartData: { datasets: Array<{ borderColor: string }> } };
    expect(vm.chartData.datasets[0].borderColor).toBe('#000000');
  });

  it('chartData borderColor is red for downtrend (last < first)', () => {
    const wrapper = mount(CategoryCard, {
      props: { category: 'Health', trendData: [8, 3], dates: ['Jan', 'Feb'] }
    });
    // isUptrend = false (3 < 8) → borderColor = '#f44336'
    const vm = wrapper.vm as unknown as { chartData: { datasets: Array<{ borderColor: string }> } };
    expect(vm.chartData.datasets[0].borderColor).toBe('#f44336');
  });

  it('isUptrend defaults to true when trendData has only 1 item', () => {
    const wrapper = mount(CategoryCard, {
      props: { category: 'Health', trendData: [5], dates: ['Jan'] }
    });
    const vm = wrapper.vm as unknown as { chartData: { datasets: Array<{ borderColor: string }> } };
    expect(vm.chartData.datasets[0].borderColor).toBe('#000000');
  });

  it('segment borderColor callback returns black for ascending segment', () => {
    const wrapper = mount(CategoryCard, {
      props: { category: 'Health', trendData: [3, 5], dates: ['Jan', 'Feb'] }
    });
    const vm = wrapper.vm as unknown as {
      chartData: { datasets: Array<{ segment: { borderColor: (ctx: unknown) => string } }> };
    };
    const segmentFn = vm.chartData.datasets[0].segment.borderColor;
    // p1.y > p0.y → black
    expect(segmentFn({ p1: { parsed: { y: 6 } }, p0: { parsed: { y: 3 } } })).toBe('#000000');
    // p1.y < p0.y → red
    expect(segmentFn({ p1: { parsed: { y: 2 } }, p0: { parsed: { y: 8 } } })).toBe('#f44336');
    // p1.y === p0.y → black
    expect(segmentFn({ p1: { parsed: { y: 5 } }, p0: { parsed: { y: 5 } } })).toBe('#000000');
    // null values default to 0 via ??
    expect(segmentFn({ p1: { parsed: { y: null } }, p0: { parsed: { y: null } } })).toBe('#000000');
  });
});
