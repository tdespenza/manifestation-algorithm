import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import StatsPanel from '@/components/dashboard/StatsPanel.vue';
import type { SessionSummary } from '@/services/db';

function makeSession(overrides: Partial<SessionSummary> = {}): SessionSummary {
  return {
    id: 'sid',
    completed_at: '2024-01-01T00:00:00.000Z',
    total_score: 5000,
    duration_seconds: 120,
    ...overrides
  };
}

describe('StatsPanel.vue', () => {
  it('shows zeros when sessions array is empty', () => {
    const wrapper = mount(StatsPanel, { props: { sessions: [] } });
    expect(wrapper.text()).toContain('0'); // mean, median, max all 0
    expect(wrapper.text()).toContain('0'); // count 0
  });

  it('computes correct mean, max and count for single session', () => {
    const wrapper = mount(StatsPanel, {
      props: { sessions: [makeSession({ total_score: 4000 })] }
    });
    expect(wrapper.text()).toContain('4,000'); // mean ≈ max
    expect(wrapper.text()).toContain('1'); // count
  });

  it('computes correct median for even count (two sessions)', () => {
    const wrapper = mount(StatsPanel, {
      props: {
        sessions: [makeSession({ total_score: 3000 }), makeSession({ total_score: 5000 })]
      }
    });
    // median = (3000 + 5000) / 2 = 4000
    expect(wrapper.text()).toContain('4,000');
  });

  it('computes correct median for odd count (three sessions)', () => {
    const wrapper = mount(StatsPanel, {
      props: {
        sessions: [
          makeSession({ total_score: 1000 }),
          makeSession({ total_score: 3000 }),
          makeSession({ total_score: 5000 })
        ]
      }
    });
    // sorted: [1000, 3000, 5000], median = 3000
    expect(wrapper.text()).toContain('3,000');
  });

  it('shows correct highest score (max)', () => {
    const wrapper = mount(StatsPanel, {
      props: {
        sessions: [
          makeSession({ total_score: 2000 }),
          makeSession({ total_score: 8000 }),
          makeSession({ total_score: 4000 })
        ]
      }
    });
    expect(wrapper.text()).toContain('8,000');
  });

  it('renders four stat items', () => {
    const wrapper = mount(StatsPanel, {
      props: { sessions: [makeSession()] }
    });
    expect(wrapper.findAll('.stat-item')).toHaveLength(4);
  });
});
