import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';

// ── Stub Chart.js-dependent child ────────────────────────────────────────────
vi.mock('vue-chartjs', () => ({
  Line: { template: '<canvas class="line-chart-stub" />' }
}));

// ── Stub ChartActions ────────────────────────────────────────────────────────
vi.mock('@/components/charts/ChartActions.vue', () => ({
  default: { template: '<div class="chart-actions-stub" />' }
}));

import ProgressChart from '@/components/charts/ProgressChart.vue';
import type { SessionSummary } from '@/services/db';

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
        sessions: [makeSession('s1', '2024-01-01T00:00:00.000Z', 3000)]
      }
    });
    expect(wrapper.find('.line-chart-stub').exists()).toBe(true);
  });

  it('computes chartData with reversed sessions order', () => {
    const sessions = [
      makeSession('s1', '2024-01-03T00:00:00.000Z', 7000), // most recent first (DESC from DB)
      makeSession('s2', '2024-01-02T00:00:00.000Z', 5000),
      makeSession('s3', '2024-01-01T00:00:00.000Z', 3000)
    ];
    const wrapper = mount(ProgressChart, { props: { sessions } });
    const vm = wrapper.vm as unknown as {
      chartData: { datasets: Array<{ data: number[] }>; labels: string[] };
    };

    // reversed() converts DESC → ASC: s3, s2, s1
    expect(vm.chartData.datasets[0].data).toEqual([3000, 5000, 7000]);
  });

  it('chartData uses black color for single points', () => {
    const sessions = [makeSession('s1', '2024-01-01T00:00:00.000Z', 4000)];
    const wrapper = mount(ProgressChart, { props: { sessions } });
    const vm = wrapper.vm as unknown as {
      chartData: { datasets: Array<{ borderColor: string }> };
    };
    expect(vm.chartData.datasets[0].borderColor).toBe('#000000');
  });

  it('chartData uses black color for upward trend', () => {
    const sessions = [
      makeSession('s2', '2024-01-02T00:00:00.000Z', 5000), // Newer (Last)
      makeSession('s1', '2024-01-01T00:00:00.000Z', 3000) // Older (First)
    ]; // Sessions come DESC from parent
    const wrapper = mount(ProgressChart, { props: { sessions } });
    const vm = wrapper.vm as unknown as {
      chartData: { datasets: Array<{ borderColor: string }> };
    };
    // 3000 -> 5000 is UP
    expect(vm.chartData.datasets[0].borderColor).toBe('#000000');
  });

  it('chartData uses red color for downward trend', () => {
    const sessions = [
      makeSession('s2', '2024-01-02T00:00:00.000Z', 3000), // Newer (Last)
      makeSession('s1', '2024-01-01T00:00:00.000Z', 5000) // Older (First)
    ];
    const wrapper = mount(ProgressChart, { props: { sessions } });
    const vm = wrapper.vm as unknown as {
      chartData: { datasets: Array<{ borderColor: string }> };
    };
    // 5000 -> 3000 is DOWN
    expect(vm.chartData.datasets[0].borderColor).toBe('#d32f2f');
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

  it('exportData returns date/time/score rows in ascending order', () => {
    const sessions = [
      makeSession('s2', '2024-01-02T10:00:00.000Z', 7000),
      makeSession('s1', '2024-01-01T08:00:00.000Z', 5000)
    ];
    const wrapper = mount(ProgressChart, { props: { sessions } });
    const vm = wrapper.vm as unknown as {
      exportData: Array<{ Date: string; Time: string; 'Total Score': number }>;
    };
    // reversed: s1 first, s2 second
    expect(vm.exportData).toHaveLength(2);
    expect(vm.exportData[0]['Total Score']).toBe(5000);
    expect(vm.exportData[1]['Total Score']).toBe(7000);
    expect(typeof vm.exportData[0].Date).toBe('string');
    expect(typeof vm.exportData[0].Time).toBe('string');
  });

  it('segment borderColor callback returns black when p1.y >= p0.y', () => {
    const sessions = [
      makeSession('s2', '2024-01-02T00:00:00.000Z', 6000),
      makeSession('s1', '2024-01-01T00:00:00.000Z', 4000)
    ];
    const wrapper = mount(ProgressChart, { props: { sessions } });
    const vm = wrapper.vm as unknown as {
      chartData: {
        datasets: Array<{ segment: { borderColor: (ctx: unknown) => string } }>;
      };
    };
    const segmentFn = vm.chartData.datasets[0].segment.borderColor;
    // p1.y > p0.y → upward → black
    expect(segmentFn({ p1: { parsed: { y: 6 } }, p0: { parsed: { y: 4 } } })).toBe('#000000');
    // p1.y < p0.y → downward → red
    expect(segmentFn({ p1: { parsed: { y: 3 } }, p0: { parsed: { y: 8 } } })).toBe('#d32f2f');
    // p1.y === p0.y → equal → black
    expect(segmentFn({ p1: { parsed: { y: 5 } }, p0: { parsed: { y: 5 } } })).toBe('#000000');
    // y is null → defaults to 0 via ?? operator
    expect(segmentFn({ p1: { parsed: { y: null } }, p0: { parsed: { y: null } } })).toBe('#000000');
  });

  it('chartOptions.plugins.legend.labels.generateLabels returns Improving (black) and Declining (red)', () => {
    const sessions = [makeSession('s1', '2024-01-01T00:00:00.000Z', 5000)];
    const wrapper = mount(ProgressChart, { props: { sessions } });
    const vm = wrapper.vm as unknown as {
      chartOptions: {
        plugins: {
          legend: {
            labels: { generateLabels: () => Array<{ text: string; fillStyle: string }> };
          };
        };
      };
    };
    const labels = vm.chartOptions.plugins.legend.labels.generateLabels();
    expect(labels).toHaveLength(2);
    expect(labels[0].text).toBe('Improving');
    expect(labels[0].fillStyle).toBe('#000000');
    expect(labels[1].text).toBe('Declining');
    expect(labels[1].fillStyle).toBe('#d32f2f');
  });
});
