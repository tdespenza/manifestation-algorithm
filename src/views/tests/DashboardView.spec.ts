import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import { createRouter, createWebHashHistory } from 'vue-router';

// ── Stub child components ─────────────────────────────────────────────────────
vi.mock('../../components/charts/ProgressChart.vue', () => ({
  default: { template: '<div class="progress-chart-stub" />' },
}));
vi.mock('../../components/dashboard/CategoryCard.vue', () => ({
  default: {
    template: '<div class="category-card-stub" />',
    props: ['category', 'trendData', 'dates', 'currentScore'],
  },
}));
vi.mock('../../components/dashboard/StatsPanel.vue', () => ({
  default: { template: '<div class="stats-panel-stub" />', props: ['sessions'] },
}));
vi.mock('../../components/dashboard/NetworkRanking.vue', () => ({
  default: { template: '<div class="network-ranking-stub" />' },
}));

// ── Mock export service ───────────────────────────────────────────────────────
const exportMocks = vi.hoisted(() => ({
  exportToCSV: vi.fn().mockResolvedValue(undefined),
}));
vi.mock('../../services/export', () => ({
  exportToCSV: (...args: unknown[]) => exportMocks.exportToCSV(...args),
}));

// ── Mock history store with plain state via vi.hoisted ────────────────────────
const dashState = vi.hoisted(() => ({
  isLoading: false,
  sessions: [] as any[],
  trends: {} as Record<string, any[]>,
}));
const fetchHistoryMock = vi.hoisted(() => vi.fn().mockResolvedValue(undefined));

vi.mock('../../stores/history', () => ({
  useHistoryStore: () => ({
    get isLoading() { return dashState.isLoading; },
    get sessions() { return dashState.sessions; },
    get trends() { return dashState.trends; },
    fetchHistory: fetchHistoryMock,
  }),
}));

import DashboardView from '../DashboardView.vue';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/dashboard', component: DashboardView },
    { path: '/', component: { template: '<div />' } },
  ],
});

function makeSession(
  id: string,
  daysAgo: number,
  score = 5000
): { id: string; completed_at: string; total_score: number; duration_seconds: number } {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return { id, completed_at: d.toISOString(), total_score: score, duration_seconds: 60 };
}

describe('DashboardView.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
    dashState.isLoading = false;
    dashState.sessions = [];
    dashState.trends = {};
    fetchHistoryMock.mockResolvedValue(undefined);
    exportMocks.exportToCSV.mockResolvedValue(undefined);
    vi.stubGlobal('alert', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('shows loading indicator while isLoading', async () => {
    dashState.isLoading = true;
    const wrapper = mount(DashboardView, { global: { plugins: [router] } });
    expect(wrapper.find('.loading').text()).toContain('Loading history');
  });

  it('shows empty state when no sessions', async () => {
    const wrapper = mount(DashboardView, { global: { plugins: [router] } });
    expect(wrapper.find('.empty-state').exists()).toBe(true);
    expect(wrapper.find('.history-content').exists()).toBe(false);
  });

  it('shows history content and stats when sessions exist', async () => {
    dashState.sessions = [makeSession('s1', 5, 4000)];
    dashState.trends = { Health: [{ date: new Date().toISOString(), value: 7 }] };
    const wrapper = mount(DashboardView, { global: { plugins: [router] } });
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.history-content').exists()).toBe(true);
    expect(wrapper.find('.empty-state').exists()).toBe(false);
  });

  it('calls fetchHistory on mount', () => {
    mount(DashboardView, { global: { plugins: [router] } });
    expect(fetchHistoryMock).toHaveBeenCalled();
  });

  it('shows range selector and export button when sessions exist', async () => {
    dashState.sessions = [makeSession('s1', 5)];
    const wrapper = mount(DashboardView, { global: { plugins: [router] } });
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.range-selector').exists()).toBe(true);
    expect(wrapper.find('.export-btn').exists()).toBe(true);
  });

  it('hides range selector and export button when no sessions', () => {
    const wrapper = mount(DashboardView, { global: { plugins: [router] } });
    expect(wrapper.find('.controls-bar').exists()).toBe(false);
  });

  it('filters sessions by 7d range', async () => {
    dashState.sessions = [
      makeSession('recent', 3, 5000),
      makeSession('old', 10, 3000),
    ];
    const wrapper = mount(DashboardView, { global: { plugins: [router] } });
    await wrapper.vm.$nextTick();

    const select = wrapper.find<HTMLSelectElement>('#range-select');
    await select.setValue('7d');
    await wrapper.vm.$nextTick();

    // The vm should have only 1 session within 7d
    const vm = wrapper.vm as unknown as { sessions: any[] };
    expect(vm.sessions).toHaveLength(1);
    expect(vm.sessions[0].id).toBe('recent');
  });

  it('returns all sessions for "all" range', async () => {
    dashState.sessions = [makeSession('s1', 200), makeSession('s2', 400)];
    const wrapper = mount(DashboardView, { global: { plugins: [router] } });
    await wrapper.vm.$nextTick();

    (wrapper.vm as any).selectedRange = 'all';
    await wrapper.vm.$nextTick();

    const vm = wrapper.vm as unknown as { sessions: any[] };
    expect(vm.sessions).toHaveLength(2);
  });

  it('filters by 90d range', async () => {
    dashState.sessions = [
      makeSession('recent', 45, 5000),
      makeSession('old', 120, 3000),
    ];
    const wrapper = mount(DashboardView, { global: { plugins: [router] } });
    await wrapper.vm.$nextTick();
    (wrapper.vm as any).selectedRange = '90d';
    await wrapper.vm.$nextTick();
    const vm = wrapper.vm as unknown as { sessions: any[] };
    expect(vm.sessions).toHaveLength(1);
    expect(vm.sessions[0].id).toBe('recent');
  });

  it('filters by 1y range', async () => {
    dashState.sessions = [
      makeSession('thisYear', 180, 5000),
      makeSession('twoYearsAgo', 800, 3000),
    ];
    const wrapper = mount(DashboardView, { global: { plugins: [router] } });
    await wrapper.vm.$nextTick();
    (wrapper.vm as any).selectedRange = '1y';
    await wrapper.vm.$nextTick();
    const vm = wrapper.vm as unknown as { sessions: any[] };
    expect(vm.sessions).toHaveLength(1);
    expect(vm.sessions[0].id).toBe('thisYear');
  });

  it('filters trends by date range', async () => {
    const old = new Date();
    old.setDate(old.getDate() - 60);
    const recent = new Date();
    recent.setDate(recent.getDate() - 5);

    dashState.sessions = [makeSession('s1', 5)];
    dashState.trends = {
      Health: [
        { date: old.toISOString(), value: 5 },
        { date: recent.toISOString(), value: 7 },
      ],
    };
    const wrapper = mount(DashboardView, { global: { plugins: [router] } });
    await wrapper.vm.$nextTick();
    const select = wrapper.find<HTMLSelectElement>('#range-select');
    await select.setValue('30d');
    await wrapper.vm.$nextTick();

    const vm = wrapper.vm as unknown as { trends: Record<string, any[]> };
    expect(vm.trends['Health']).toHaveLength(1);
    expect(vm.trends['Health'][0].value).toBe(7);
  });

  it('excludes trend categories with no data in filtered range', async () => {
    const old = new Date();
    old.setDate(old.getDate() - 60);

    dashState.sessions = [makeSession('s1', 5)];
    dashState.trends = {
      HealthOld: [{ date: old.toISOString(), value: 5 }],
    };
    const wrapper = mount(DashboardView, { global: { plugins: [router] } });
    await wrapper.vm.$nextTick();
    const select = wrapper.find<HTMLSelectElement>('#range-select');
    await select.setValue('30d');
    await wrapper.vm.$nextTick();

    const vm = wrapper.vm as unknown as { trends: Record<string, any[]> };
    expect(Object.keys(vm.trends)).not.toContain('HealthOld');
  });

  it('categories are sorted alphabetically', async () => {
    const now = new Date().toISOString();
    dashState.sessions = [makeSession('s1', 1)];
    dashState.trends = {
      Wealth: [{ date: now, value: 6 }],
      Health: [{ date: now, value: 7 }],
      Focus: [{ date: now, value: 8 }],
    };
    const wrapper = mount(DashboardView, { global: { plugins: [router] } });
    await wrapper.vm.$nextTick();
    const vm = wrapper.vm as unknown as { categories: string[] };
    expect(vm.categories).toEqual(['Focus', 'Health', 'Wealth']);
  });

  it('export button triggers exportToCSV', async () => {
    dashState.sessions = [makeSession('s1', 3)];
    const wrapper = mount(DashboardView, { global: { plugins: [router] } });
    await wrapper.vm.$nextTick();
    await wrapper.find('.export-btn').trigger('click');
    await new Promise(r => setTimeout(r, 0));
    expect(exportMocks.exportToCSV).toHaveBeenCalled();
  });

  it('shows alert on export failure', async () => {
    const alertMock = vi.fn();
    vi.stubGlobal('alert', alertMock);
    exportMocks.exportToCSV.mockRejectedValueOnce(new Error('write failed'));
    dashState.sessions = [makeSession('s1', 3)];

    const wrapper = mount(DashboardView, { global: { plugins: [router] } });
    await wrapper.vm.$nextTick();
    await wrapper.find('.export-btn').trigger('click');
    await new Promise(r => setTimeout(r, 10));

    expect(alertMock).toHaveBeenCalledWith(expect.stringContaining('Export failed'));
  });
});
