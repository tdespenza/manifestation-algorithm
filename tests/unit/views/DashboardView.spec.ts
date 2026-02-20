import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import { createRouter, createWebHashHistory } from 'vue-router';

// ── Stub child components ─────────────────────────────────────────────────────
vi.mock('@/components/charts/ProgressChart.vue', () => ({
  default: { template: '<div class="progress-chart-stub" />' }
}));
vi.mock('@/components/dashboard/CategoryCard.vue', () => ({
  default: {
    template: '<div class="category-card-stub" />',
    props: ['category', 'trendData', 'dates', 'currentScore']
  }
}));
vi.mock('@/components/dashboard/StatsPanel.vue', () => ({
  default: { template: '<div class="stats-panel-stub" />', props: ['sessions'] }
}));
vi.mock('@/components/dashboard/NetworkRanking.vue', () => ({
  default: { template: '<div class="network-ranking-stub" />' }
}));

// ── Mock useToast ─────────────────────────────────────────────────────────────
const mockAddToast = vi.fn();
vi.mock('@/composables/useToast', () => ({
  useToast: () => ({ addToast: mockAddToast, toasts: { value: [] }, dismissToast: vi.fn() })
}));

// ── Mock export service ───────────────────────────────────────────────────────
const exportMocks = vi.hoisted(() => ({
  exportToCSV: vi.fn().mockResolvedValue(undefined)
}));
vi.mock('@/services/export', () => ({
  exportToCSV: (...args: unknown[]) => exportMocks.exportToCSV(...args)
}));

// ── Mock history store with plain state via vi.hoisted ────────────────────────
const dashState = vi.hoisted(() => ({
  isLoading: false,
  sessions: [] as any[],
  trends: {} as Record<string, any[]>
}));
const fetchHistoryMock = vi.hoisted(() => vi.fn().mockResolvedValue(undefined));
const deleteSessionMock = vi.hoisted(() => vi.fn().mockResolvedValue(undefined));
const deleteSessionsMock = vi.hoisted(() => vi.fn().mockResolvedValue(undefined));

vi.mock('@/stores/history', () => ({
  useHistoryStore: () => ({
    get isLoading() {
      return dashState.isLoading;
    },
    get sessions() {
      return dashState.sessions;
    },
    get trends() {
      return dashState.trends;
    },
    fetchHistory: fetchHistoryMock,
    deleteSession: deleteSessionMock,
    deleteSessions: deleteSessionsMock
  })
}));

import DashboardView from '@/views/DashboardView.vue';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/dashboard', component: DashboardView },
    { path: '/', component: { template: '<div />' } }
  ]
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
    deleteSessionMock.mockResolvedValue(undefined);
    deleteSessionsMock.mockResolvedValue(undefined);
    exportMocks.exportToCSV.mockResolvedValue(undefined);
    vi.stubGlobal('alert', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('shows loading indicator while isLoading', async () => {
    dashState.isLoading = true;
    const wrapper = mount(DashboardView, { global: { plugins: [router] } });
    expect(wrapper.find('.loading').text()).toContain('Loading');
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

  it('session score label shows correct label for each score range', async () => {
    dashState.sessions = [
      makeSession('high', 1, 8000), // > 7000 → Excellent
      makeSession('mid', 2, 5000), // 4000-7000 → Good
      makeSession('low', 3, 2000) // < 4000 → Needs Work
    ];
    const wrapper = mount(DashboardView, { global: { plugins: [router] } });
    await wrapper.vm.$nextTick();
    const labels = wrapper.findAll('.session-score-label');
    expect(labels.length).toBe(3);
    expect(labels[0].classes()).toContain('label-high');
    expect(labels[0].text()).toBe('Excellent');
    expect(labels[1].classes()).toContain('label-mid');
    expect(labels[1].text()).toBe('Good');
    expect(labels[2].classes()).toContain('label-low');
    expect(labels[2].text()).toBe('Needs Work');
    wrapper.unmount();
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
    dashState.sessions = [makeSession('recent', 3, 5000), makeSession('old', 10, 3000)];
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
    dashState.sessions = [makeSession('recent', 45, 5000), makeSession('old', 120, 3000)];
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
      makeSession('twoYearsAgo', 800, 3000)
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
        { date: recent.toISOString(), value: 7 }
      ]
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
      HealthOld: [{ date: old.toISOString(), value: 5 }]
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
      Focus: [{ date: now, value: 8 }]
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

  // ── Selection / delete ───────────────────────────────────────────────────────
  describe('selection mode', () => {
    beforeEach(() => {
      dashState.sessions = [makeSession('s1', 1), makeSession('s2', 2), makeSession('s3', 3)];
    });

    it('shows Select button in normal mode and hides it in selection mode', async () => {
      const wrapper = mount(DashboardView, { global: { plugins: [router] } });
      await wrapper.vm.$nextTick();
      expect(wrapper.find('.select-mode-btn').exists()).toBe(true);
      await wrapper.find('.select-mode-btn').trigger('click');
      await wrapper.vm.$nextTick();
      expect((wrapper.vm as any).selectionMode).toBe(true);
      expect(wrapper.find('.cancel-select-btn').exists()).toBe(true);
      wrapper.unmount();
    });

    it('Cancel button calls exitSelectionMode — clears selection and mode', async () => {
      const wrapper = mount(DashboardView, { global: { plugins: [router] } });
      await wrapper.vm.$nextTick();
      const vm = wrapper.vm as any;
      vm.selectionMode = true;
      vm.selectedIds = new Set(['s1']);
      await wrapper.vm.$nextTick();
      await wrapper.find('.cancel-select-btn').trigger('click');
      await wrapper.vm.$nextTick();
      expect(vm.selectionMode).toBe(false);
      expect(vm.selectedIds.size).toBe(0);
      wrapper.unmount();
    });

    it('toggleSelect adds id on first call and removes on second', async () => {
      const wrapper = mount(DashboardView, { global: { plugins: [router] } });
      await wrapper.vm.$nextTick();
      const vm = wrapper.vm as any;
      vm.toggleSelect('s1');
      expect(vm.selectedIds.has('s1')).toBe(true);
      vm.toggleSelect('s1');
      expect(vm.selectedIds.has('s1')).toBe(false);
      wrapper.unmount();
    });

    it('toggleSelectAll selects all then deselects all on second call', async () => {
      const wrapper = mount(DashboardView, { global: { plugins: [router] } });
      await wrapper.vm.$nextTick();
      const vm = wrapper.vm as any;
      vm.toggleSelectAll();
      expect(vm.selectedIds.size).toBe(3);
      vm.toggleSelectAll();
      expect(vm.selectedIds.size).toBe(0);
      wrapper.unmount();
    });

    it('allSelected computed returns true only when all sessions are selected', async () => {
      const wrapper = mount(DashboardView, { global: { plugins: [router] } });
      await wrapper.vm.$nextTick();
      const vm = wrapper.vm as any;
      expect(vm.allSelected).toBe(false);
      vm.selectedIds = new Set(['s1', 's2', 's3']);
      await wrapper.vm.$nextTick();
      expect(vm.allSelected).toBe(true);
      wrapper.unmount();
    });

    it('selectedCount computed returns size of selectedIds', async () => {
      const wrapper = mount(DashboardView, { global: { plugins: [router] } });
      const vm = wrapper.vm as any;
      vm.selectedIds = new Set(['s1', 's2']);
      await wrapper.vm.$nextTick();
      expect(vm.selectedCount).toBe(2);
      wrapper.unmount();
    });

    it('delete-selected-btn-sm is visible when selectedCount > 0 in selection mode', async () => {
      const wrapper = mount(DashboardView, { global: { plugins: [router] } });
      await wrapper.vm.$nextTick();
      const vm = wrapper.vm as any;
      vm.selectionMode = true;
      vm.selectedIds = new Set(['s1']);
      await wrapper.vm.$nextTick();
      expect(wrapper.find('.delete-selected-btn-sm').exists()).toBe(true);
      wrapper.unmount();
    });

    it('handleDeleteSession opens the confirm dialog (does NOT delete immediately)', async () => {
      const wrapper = mount(DashboardView, { global: { plugins: [router] } });
      await wrapper.vm.$nextTick();
      const vm = wrapper.vm as any;
      vm.handleDeleteSession('s1');
      await wrapper.vm.$nextTick();
      expect(vm.confirmVisible).toBe(true);
      expect(vm.confirmTitle).toBe('Delete Session');
      expect(deleteSessionMock).not.toHaveBeenCalled();
      wrapper.unmount();
    });

    it('doDeleteSession calls store.deleteSession and shows success toast', async () => {
      const wrapper = mount(DashboardView, { global: { plugins: [router] } });
      await wrapper.vm.$nextTick();
      await (wrapper.vm as any).doDeleteSession('s1');
      await flushPromises();
      expect(deleteSessionMock).toHaveBeenCalledWith('s1');
      expect(mockAddToast).toHaveBeenCalledWith('Session deleted', 'success');
      wrapper.unmount();
    });

    it('doDeleteSession shows error toast on store failure', async () => {
      deleteSessionMock.mockRejectedValueOnce(new Error('DB error'));
      const wrapper = mount(DashboardView, { global: { plugins: [router] } });
      await wrapper.vm.$nextTick();
      await (wrapper.vm as any).doDeleteSession('s1');
      await flushPromises();
      expect(mockAddToast).toHaveBeenCalledWith('Failed to delete session', 'error');
      wrapper.unmount();
    });

    it('handleDeleteSelected opens the confirm dialog (does NOT delete immediately)', async () => {
      const wrapper = mount(DashboardView, { global: { plugins: [router] } });
      await wrapper.vm.$nextTick();
      const vm = wrapper.vm as any;
      vm.selectedIds = new Set(['s1', 's2']);
      vm.handleDeleteSelected();
      await wrapper.vm.$nextTick();
      expect(vm.confirmVisible).toBe(true);
      expect(vm.confirmTitle).toContain('Delete');
      expect(deleteSessionsMock).not.toHaveBeenCalled();
      wrapper.unmount();
    });

    it('doDeleteSelected calls store.deleteSessions with selected ids', async () => {
      const wrapper = mount(DashboardView, { global: { plugins: [router] } });
      await wrapper.vm.$nextTick();
      await (wrapper.vm as any).doDeleteSelected(['s1', 's2']);
      await flushPromises();
      expect(deleteSessionsMock).toHaveBeenCalledWith(['s1', 's2']);
      expect(mockAddToast).toHaveBeenCalledWith('Deleted 2 sessions', 'success');
      wrapper.unmount();
    });

    it('doDeleteSelected shows singular message when deleting 1 session', async () => {
      const wrapper = mount(DashboardView, { global: { plugins: [router] } });
      await wrapper.vm.$nextTick();
      await (wrapper.vm as any).doDeleteSelected(['s1']);
      await flushPromises();
      expect(mockAddToast).toHaveBeenCalledWith('Deleted 1 session', 'success');
      wrapper.unmount();
    });

    it('handleDeleteSelected is a no-op when nothing selected', async () => {
      const wrapper = mount(DashboardView, { global: { plugins: [router] } });
      await wrapper.vm.$nextTick();
      const vm = wrapper.vm as any;
      vm.handleDeleteSelected();
      await wrapper.vm.$nextTick();
      expect(vm.confirmVisible).toBe(false);
      expect(deleteSessionsMock).not.toHaveBeenCalled();
      wrapper.unmount();
    });

    it('doDeleteSelected shows error toast on store failure', async () => {
      deleteSessionsMock.mockRejectedValueOnce(new Error('bulk fail'));
      const wrapper = mount(DashboardView, { global: { plugins: [router] } });
      await wrapper.vm.$nextTick();
      await (wrapper.vm as any).doDeleteSelected(['s1', 's2']);
      await flushPromises();
      expect(mockAddToast).toHaveBeenCalledWith('Failed to delete sessions', 'error');
      wrapper.unmount();
    });

    it('doDeleteSelected calls exitSelectionMode after success', async () => {
      const wrapper = mount(DashboardView, { global: { plugins: [router] } });
      await wrapper.vm.$nextTick();
      const vm = wrapper.vm as any;
      vm.selectionMode = true;
      vm.selectedIds = new Set(['s1']);
      await vm.doDeleteSelected(['s1']);
      await flushPromises();
      expect(vm.selectionMode).toBe(false);
      expect(vm.selectedIds.size).toBe(0);
      wrapper.unmount();
    });

    it('onConfirmed calls confirmAction and hides the dialog', async () => {
      const wrapper = mount(DashboardView, { global: { plugins: [router] } });
      await wrapper.vm.$nextTick();
      const vm = wrapper.vm as any;
      const action = vi.fn().mockResolvedValue(undefined);
      vm.confirmAction = action;
      vm.confirmVisible = true;
      await vm.onConfirmed();
      await flushPromises();
      expect(action).toHaveBeenCalled();
      expect(vm.confirmVisible).toBe(false);
      wrapper.unmount();
    });

    it('onCancelled hides the dialog without deleting', async () => {
      const wrapper = mount(DashboardView, { global: { plugins: [router] } });
      await wrapper.vm.$nextTick();
      const vm = wrapper.vm as any;
      vm.confirmVisible = true;
      vm.confirmAction = vi.fn();
      vm.onCancelled();
      await wrapper.vm.$nextTick();
      expect(vm.confirmVisible).toBe(false);
      expect(vm.confirmAction).toBeNull();
      expect(deleteSessionMock).not.toHaveBeenCalled();
      wrapper.unmount();
    });

    it('handleDeleteSession then onConfirmed executes the delete closure', async () => {
      const wrapper = mount(DashboardView, { global: { plugins: [router] } });
      await wrapper.vm.$nextTick();
      const vm = wrapper.vm as any;
      vm.handleDeleteSession('s1');
      await wrapper.vm.$nextTick();
      expect(vm.confirmVisible).toBe(true);
      await vm.onConfirmed();
      await flushPromises();
      expect(deleteSessionMock).toHaveBeenCalledWith('s1');
      wrapper.unmount();
    });

    it('onConfirmed when confirmAction is null does nothing gracefully', async () => {
      const wrapper = mount(DashboardView, { global: { plugins: [router] } });
      await wrapper.vm.$nextTick();
      const vm = wrapper.vm as any;
      vm.confirmVisible = true;
      vm.confirmAction = null;
      await vm.onConfirmed();
      await flushPromises();
      expect(vm.confirmVisible).toBe(false);
      expect(deleteSessionMock).not.toHaveBeenCalled();
      wrapper.unmount();
    });

    it('handleDeleteSelected builds singular title/message when 1 session selected', async () => {
      const wrapper = mount(DashboardView, { global: { plugins: [router] } });
      await wrapper.vm.$nextTick();
      const vm = wrapper.vm as any;
      vm.selectedIds = new Set(['s1']);
      vm.handleDeleteSelected();
      await wrapper.vm.$nextTick();
      expect(vm.confirmTitle).toBe('Delete 1 Session');
      expect(vm.confirmMessage).toContain('this session');
      wrapper.unmount();
    });

    it('handleDeleteSelected then onConfirmed executes the bulk delete closure', async () => {
      const wrapper = mount(DashboardView, { global: { plugins: [router] } });
      await wrapper.vm.$nextTick();
      const vm = wrapper.vm as any;
      vm.selectedIds = new Set(['s1', 's2']);
      vm.handleDeleteSelected();
      await wrapper.vm.$nextTick();
      expect(vm.confirmVisible).toBe(true);
      await vm.onConfirmed();
      await flushPromises();
      expect(deleteSessionsMock).toHaveBeenCalledWith(['s1', 's2']);
      wrapper.unmount();
    });

    it('clicking session card in selection mode calls toggleSelect', async () => {
      const wrapper = mount(DashboardView, { global: { plugins: [router] } });
      await wrapper.vm.$nextTick();
      const vm = wrapper.vm as any;
      vm.selectionMode = true;
      await wrapper.vm.$nextTick();
      const card = wrapper.find('.session-card');
      expect(card.exists()).toBe(true);
      await card.trigger('click');
      await wrapper.vm.$nextTick();
      expect(vm.selectedIds.has('s1')).toBe(true);
      wrapper.unmount();
    });

    it('clicking session card in normal mode does not call toggleSelect', async () => {
      const wrapper = mount(DashboardView, { global: { plugins: [router] } });
      await wrapper.vm.$nextTick();
      const vm = wrapper.vm as any;
      // selectionMode is false by default
      await wrapper.find('.session-card').trigger('click');
      await wrapper.vm.$nextTick();
      expect(vm.selectedIds.size).toBe(0);
      wrapper.unmount();
    });

    it('session-check badge is rendered when selectionMode is true', async () => {
      const wrapper = mount(DashboardView, { global: { plugins: [router] } });
      await wrapper.vm.$nextTick();
      const vm = wrapper.vm as any;
      vm.selectionMode = true;
      vm.selectedIds = new Set(['s1']);
      await wrapper.vm.$nextTick();
      const check = wrapper.find('.session-check.checked');
      expect(check.exists()).toBe(true);
      expect(check.find('.check-symbol').text()).toBe('✓');
      wrapper.unmount();
    });

    it('select-all-pill shows "Deselect All" text when allSelected is true', async () => {
      const wrapper = mount(DashboardView, { global: { plugins: [router] } });
      await wrapper.vm.$nextTick();
      const vm = wrapper.vm as any;
      vm.selectionMode = true;
      vm.selectedIds = new Set(['s1', 's2', 's3']); // all 3 sessions selected
      await wrapper.vm.$nextTick();
      expect(wrapper.find('.select-all-pill').text()).toBe('Deselect All');
      wrapper.unmount();
    });

    it('inline delete button opens the confirm dialog when clicked', async () => {
      const wrapper = mount(DashboardView, { global: { plugins: [router] } });
      await wrapper.vm.$nextTick();
      const vm = wrapper.vm as any;
      // selectionMode=false so delete-btn-inline is shown
      const deleteBtn = wrapper.find('.delete-btn-inline');
      expect(deleteBtn.exists()).toBe(true);
      await deleteBtn.trigger('click');
      await wrapper.vm.$nextTick();
      expect(vm.confirmVisible).toBe(true);
      expect(deleteSessionMock).not.toHaveBeenCalled();
      wrapper.unmount();
    });
  });
});
