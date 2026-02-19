import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';

// ── Stub Chart.js-dependent child ────────────────────────────────────────────
vi.mock('vue-chartjs', () => ({
  Line: { template: '<canvas class="line-chart-stub" />' },
}));

import ProgressChart from '../ProgressChart.vue';
import type { SessionSummary } from '../../../services/db';

function makeSession(id: string, completed_at: string, total_score: number): SessionSummary {
  return { id, completed_at, total_score, duration_seconds: 60 };
}

describe('ProgressChart.vue', () => {
  it('renders without errors with empty sessions', () => {
    const wrapper = mount(ProgressChart, { props: { sessions: [] } });
    expect(wrapper.find('.chart-container').exists()).toBe(true);
  });

  it('renders the chart stub element', () => {
    const wrapper = mount(ProgressChart, {
      props: {
        sessions: [makeSession('s1', '2024-01-01T00:00:00.000Z', 3000)],
      },
    });
    expect(wrapper.find('.line-chart-stub').exists()).toBe(true);
  });

  it('computes chartData with reversed sessions order', () => {
    const sessions = [
      makeSession('s1', '2024-01-03T00:00:00.000Z', 7000), // most recent first (DESC from DB)
      makeSession('s2', '2024-01-02T00:00:00.000Z', 5000),
      makeSession('s3', '2024-01-01T00:00:00.000Z', 3000),
    ];
    const wrapper = mount(ProgressChart, { props: { sessions } });
    const vm = wrapper.vm as unknown as {
      chartData: { datasets: Array<{ data: number[] }>; labels: string[] };
    };

    // reversed() converts DESC → ASC: s3, s2, s1
    expect(vm.chartData.datasets[0].data).toEqual([3000, 5000, 7000]);
  });

  it('chartData uses blue color', () => {
    const sessions = [makeSession('s1', '2024-01-01T00:00:00.000Z', 4000)];
    const wrapper = mount(ProgressChart, { props: { sessions } });
    const vm = wrapper.vm as unknown as {
      chartData: { datasets: Array<{ borderColor: string }> };
    };
    expect(vm.chartData.datasets[0].borderColor).toBe('#0047AB');
  });

  it('generates localeDateString labels', () => {
    const sessions = [makeSession('s1', '2024-06-15T12:00:00.000Z', 5000)];
    const wrapper = mount(ProgressChart, { props: { sessions } });
    const vm = wrapper.vm as unknown as {
      chartData: { labels: string[] };
    };
    expect(vm.chartData.labels).toHaveLength(1);
    expect(typeof vm.chartData.labels[0]).toBe('string');
  });
});
