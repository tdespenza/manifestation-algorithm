import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';

// ── Stub vue-chartjs ──────────────────────────────────────────────────────────
vi.mock('vue-chartjs', () => ({
  Line: { template: '<canvas class="line-chart-stub" />' }
}));

// ── Mock history store using hoisted plain state ──────────────────────────────
const storeState = vi.hoisted(() => ({
  isLoading: false,
  sessions: [] as any[],
  trends: {} as Record<string, any[]>
}));
const fetchHistoryMock = vi.hoisted(() => vi.fn().mockResolvedValue(undefined));

vi.mock('@/stores/history', () => ({
  useHistoryStore: () => ({
    get isLoading() {
      return storeState.isLoading;
    },
    get sessions() {
      return storeState.sessions;
    },
    get trends() {
      return storeState.trends;
    },
    fetchHistory: fetchHistoryMock
  })
}));

// ── Mock vue-router with controlled params ───────────────────────────────────
const routerState = vi.hoisted(() => ({ paramId: 'Health' }));
const routerMocks = vi.hoisted(() => ({ back: vi.fn(), push: vi.fn() }));

vi.mock('vue-router', () => ({
  useRoute: () => ({ params: { id: routerState.paramId } }),
  useRouter: () => ({ back: routerMocks.back, push: routerMocks.push })
}));

import CategoryDetailView from '@/views/CategoryDetailView.vue';

describe('CategoryDetailView.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
    storeState.isLoading = false;
    storeState.sessions = [];
    storeState.trends = {};
    routerState.paramId = 'Health';
    fetchHistoryMock.mockResolvedValue(undefined);
  });

  it('shows loading when store is loading and no category data', async () => {
    storeState.isLoading = true;
    const wrapper = mount(CategoryDetailView);
    await new Promise(r => setTimeout(r, 0));
    expect(wrapper.find('.loading').exists()).toBe(true);
    expect(wrapper.text()).toContain('Loading...');
  });

  it('shows "not found" message when category has no data and not loading', async () => {
    routerState.paramId = 'Unknown';
    storeState.sessions = [{ id: 's1' }];
    storeState.trends = {};
    const wrapper = mount(CategoryDetailView);
    await new Promise(r => setTimeout(r, 0));
    expect(wrapper.text()).toContain('No data found');
  });

  it('shows category data when trends exist for this category', async () => {
    storeState.trends = {
      Health: [
        { date: '2024-01-01T00:00:00.000Z', value: 7 },
        { date: '2024-01-02T00:00:00.000Z', value: 8 }
      ]
    };
    storeState.sessions = [{ id: 's1' }];
    const wrapper = mount(CategoryDetailView);
    await new Promise(r => setTimeout(r, 0));
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.category-detail-view').exists()).toBe(true);
    expect(wrapper.find('h1').text()).toBe('Health');
  });

  it('calls fetchHistory when sessions are empty on mount', async () => {
    storeState.sessions = [];
    mount(CategoryDetailView);
    await new Promise(r => setTimeout(r, 0));
    expect(fetchHistoryMock).toHaveBeenCalled();
  });

  it('does NOT call fetchHistory when sessions are already loaded', async () => {
    storeState.sessions = [{ id: 's1' }];
    mount(CategoryDetailView);
    await new Promise(r => setTimeout(r, 0));
    expect(fetchHistoryMock).not.toHaveBeenCalled();
  });

  it('shows history table rows for each data point', async () => {
    storeState.trends = {
      Health: [
        { date: '2024-01-01T00:00:00.000Z', value: 7 },
        { date: '2024-01-02T00:00:00.000Z', value: 8 },
        { date: '2024-01-03T00:00:00.000Z', value: 9 }
      ]
    };
    storeState.sessions = [{ id: 's1' }];
    const wrapper = mount(CategoryDetailView);
    await new Promise(r => setTimeout(r, 0));
    await wrapper.vm.$nextTick();
    const rows = wrapper.findAll('tbody tr');
    expect(rows).toHaveLength(3);
  });

  it('score gets "high-score" class when >= 8', async () => {
    storeState.trends = {
      Health: [{ date: '2024-01-01T00:00:00.000Z', value: 9 }]
    };
    storeState.sessions = [{ id: 's1' }];
    const wrapper = mount(CategoryDetailView);
    await new Promise(r => setTimeout(r, 0));
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.high-score').exists()).toBe(true);
  });

  it('score gets "med-score" class when >= 5 and < 8', async () => {
    storeState.trends = {
      Health: [{ date: '2024-01-01T00:00:00.000Z', value: 6 }]
    };
    storeState.sessions = [{ id: 's1' }];
    const wrapper = mount(CategoryDetailView);
    await new Promise(r => setTimeout(r, 0));
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.med-score').exists()).toBe(true);
  });

  it('score gets "low-score" class when < 5', async () => {
    storeState.trends = {
      Health: [{ date: '2024-01-01T00:00:00.000Z', value: 3 }]
    };
    storeState.sessions = [{ id: 's1' }];
    const wrapper = mount(CategoryDetailView);
    await new Promise(r => setTimeout(r, 0));
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.low-score').exists()).toBe(true);
  });

  it('chartData borderColor is red for downtrend (last < first)', async () => {
    storeState.trends = {
      Health: [
        { date: '2024-01-01T00:00:00.000Z', value: 9 },
        { date: '2024-01-02T00:00:00.000Z', value: 5 }
      ]
    };
    storeState.sessions = [{ id: 's1' }];
    const wrapper = mount(CategoryDetailView);
    await new Promise(r => setTimeout(r, 0));
    await wrapper.vm.$nextTick();
    const vm = wrapper.vm as unknown as { chartData: { datasets: Array<{ borderColor: string }> } };
    expect(vm.chartData.datasets[0].borderColor).toBe('#f44336');
  });

  it('chartData borderColor is black for uptrend (last >= first)', async () => {
    storeState.trends = {
      Health: [
        { date: '2024-01-01T00:00:00.000Z', value: 5 },
        { date: '2024-01-02T00:00:00.000Z', value: 9 }
      ]
    };
    storeState.sessions = [{ id: 's1' }];
    const wrapper = mount(CategoryDetailView);
    await new Promise(r => setTimeout(r, 0));
    await wrapper.vm.$nextTick();
    const vm = wrapper.vm as unknown as { chartData: { datasets: Array<{ borderColor: string }> } };
    expect(vm.chartData.datasets[0].borderColor).toBe('#000000');
  });

  it('chartData defaults to uptrend (black) when only 1 data point', async () => {
    storeState.trends = {
      Health: [{ date: '2024-01-01T00:00:00.000Z', value: 7 }]
    };
    storeState.sessions = [{ id: 's1' }];
    const wrapper = mount(CategoryDetailView);
    await new Promise(r => setTimeout(r, 0));
    await wrapper.vm.$nextTick();
    const vm = wrapper.vm as unknown as { chartData: { datasets: Array<{ borderColor: string }> } };
    expect(vm.chartData.datasets[0].borderColor).toBe('#000000');
  });

  it('formatScore formats to 2 decimal places', async () => {
    storeState.trends = {
      Health: [{ date: '2024-01-01T00:00:00.000Z', value: 7.5 }]
    };
    storeState.sessions = [{ id: 's1' }];
    const wrapper = mount(CategoryDetailView);
    await new Promise(r => setTimeout(r, 0));
    await wrapper.vm.$nextTick();
    const vm = wrapper.vm as unknown as { formatScore: (n: number) => string };
    expect(vm.formatScore(7.5)).toBe('7.50');
    expect(vm.formatScore(10)).toBe('10.00');
  });

  it('back button calls router.back()', async () => {
    storeState.trends = {
      Health: [{ date: '2024-01-01T00:00:00.000Z', value: 7 }]
    };
    storeState.sessions = [{ id: 's1' }];
    const wrapper = mount(CategoryDetailView, {
      global: { mocks: { $router: routerMocks } }
    });
    await new Promise(r => setTimeout(r, 0));
    await wrapper.vm.$nextTick();
    await wrapper.find('.back-btn').trigger('click');
    expect(routerMocks.back).toHaveBeenCalled();
  });

  it('go-to-dashboard button calls router.push("/dashboard") in empty state', async () => {
    storeState.trends = {};
    storeState.sessions = [];
    storeState.isLoading = false;
    const wrapper = mount(CategoryDetailView, {
      global: { mocks: { $router: routerMocks } }
    });
    await new Promise(r => setTimeout(r, 0));
    await wrapper.vm.$nextTick();
    const btn = wrapper.find('button');
    expect(btn.exists()).toBe(true);
    await btn.trigger('click');
    expect(routerMocks.push).toHaveBeenCalledWith('/dashboard');
  });
});
