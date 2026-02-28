import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import FocusAreas from '@/components/dashboard/FocusAreas.vue';
import { computeFocusAreas } from '@/data/recommendations';
import type { CategoryTrends } from '@/services/dbTrends';

// ── computeFocusAreas unit tests ─────────────────────────────────────────────
describe('computeFocusAreas()', () => {
  it('returns empty array for empty trends', () => {
    expect(computeFocusAreas({})).toEqual([]);
  });

  it('returns at most topN areas', () => {
    const trends: CategoryTrends = {
      A: [{ date: '2024-01-01', value: 3 }],
      B: [{ date: '2024-01-01', value: 5 }],
      C: [{ date: '2024-01-01', value: 7 }],
      D: [{ date: '2024-01-01', value: 2 }]
    };
    expect(computeFocusAreas(trends, 3)).toHaveLength(3);
  });

  it('sorts by ascending average score (weakest first)', () => {
    const trends: CategoryTrends = {
      Good: [{ date: '2024-01-01', value: 8 }],
      Weak: [{ date: '2024-01-01', value: 2 }],
      Mid: [{ date: '2024-01-01', value: 5 }]
    };
    const areas = computeFocusAreas(trends, 3);
    expect(areas[0].category).toBe('Weak');
    expect(areas[1].category).toBe('Mid');
    expect(areas[2].category).toBe('Good');
  });

  it('detects upward trend', () => {
    const trends: CategoryTrends = {
      Rising: [
        { date: '2024-01-01', value: 3 },
        { date: '2024-01-02', value: 6 }
      ]
    };
    expect(computeFocusAreas(trends, 1)[0].trend).toBe('up');
  });

  it('detects downward trend', () => {
    const trends: CategoryTrends = {
      Falling: [
        { date: '2024-01-01', value: 7 },
        { date: '2024-01-02', value: 3 }
      ]
    };
    expect(computeFocusAreas(trends, 1)[0].trend).toBe('down');
  });

  it('detects flat trend with single data point', () => {
    const trends: CategoryTrends = {
      Static: [{ date: '2024-01-01', value: 5 }]
    };
    expect(computeFocusAreas(trends, 1)[0].trend).toBe('flat');
  });

  it('returns a tip string for each area', () => {
    const trends: CategoryTrends = {
      Test: [{ date: '2024-01-01', value: 3 }]
    };
    const areas = computeFocusAreas(trends, 1);
    expect(typeof areas[0].tip).toBe('string');
    expect(areas[0].tip.length).toBeGreaterThan(0);
  });

  it('matches specific tip for "Make a Decision"', () => {
    const trends: CategoryTrends = {
      'Make a Decision': [{ date: '2024-01-01', value: 2 }]
    };
    const tip = computeFocusAreas(trends, 1)[0].tip;
    expect(tip).toContain('Commit');
  });

  it('handles fewer categories than topN gracefully', () => {
    const trends: CategoryTrends = {
      Only: [{ date: '2024-01-01', value: 4 }]
    };
    expect(computeFocusAreas(trends, 3)).toHaveLength(1);
  });
});

// ── FocusAreas.vue component tests ───────────────────────────────────────────
describe('FocusAreas.vue', () => {
  const TRENDS: CategoryTrends = {
    'Make a Decision': [
      { date: '2024-01-01', value: 2 },
      { date: '2024-01-02', value: 2.5 }
    ],
    'Define what you want': [
      { date: '2024-01-01', value: 8 },
      { date: '2024-01-02', value: 7 }
    ],
    'Plug into System': [
      { date: '2024-01-01', value: 4 },
      { date: '2024-01-02', value: 5 }
    ]
  };

  it('renders focus area section with heading', () => {
    const wrapper = mount(FocusAreas, { props: { trends: TRENDS } });
    expect(wrapper.find('#focus-areas-heading').text()).toContain('Focus Areas');
    wrapper.unmount();
  });

  it('renders 3 cards for 3 categories', () => {
    const wrapper = mount(FocusAreas, { props: { trends: TRENDS } });
    expect(wrapper.findAll('.focus-card')).toHaveLength(3);
    wrapper.unmount();
  });

  it('shows the weakest category first', () => {
    const wrapper = mount(FocusAreas, { props: { trends: TRENDS } });
    const firstCard = wrapper.findAll('.focus-card')[0];
    expect(firstCard.find('.category-name').text()).toContain('Make a Decision');
    wrapper.unmount();
  });

  it('renders empty state when no trends are passed', () => {
    const wrapper = mount(FocusAreas, { props: { trends: {} } });
    expect(wrapper.find('.focus-empty').exists()).toBe(true);
    expect(wrapper.findAll('.focus-card')).toHaveLength(0);
    wrapper.unmount();
  });

  it('shows trend icon on each card', () => {
    const wrapper = mount(FocusAreas, { props: { trends: TRENDS } });
    const badges = wrapper.findAll('.trend-badge');
    expect(badges.length).toBeGreaterThan(0);
    badges.forEach(b => expect(['↑', '↓', '→']).toContain(b.text()));
    wrapper.unmount();
  });

  it('down-trending card shows trend-down class', () => {
    const wrapper = mount(FocusAreas, { props: { trends: TRENDS } });
    // Define what you want goes 8→7 (down), check it gets trend-down
    const cards = wrapper.findAll('.focus-card');
    const downCard = cards.find(c => c.find('.trend-down').exists());
    expect(downCard).toBeTruthy();
    wrapper.unmount();
  });

  it('has aria-labelledby on section', () => {
    const wrapper = mount(FocusAreas, { props: { trends: TRENDS } });
    const section = wrapper.find('section');
    expect(section.attributes('aria-labelledby')).toBe('focus-areas-heading');
    wrapper.unmount();
  });
});
