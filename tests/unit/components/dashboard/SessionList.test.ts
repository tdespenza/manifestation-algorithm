import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import SessionList from '@/components/dashboard/SessionList.vue';
import type { SessionSummary } from '@/services/db';

function makeSession(id: string, daysAgo: number, score = 5000): SessionSummary {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return { id, completed_at: d.toISOString(), total_score: score, duration_seconds: 60 };
}

const defaultProps = {
  sessions: [makeSession('s1', 1, 5000)],
  isDeleting: false,
  selectionMode: false,
  selectedIds: new Set<string>(),
  allSelected: false,
  selectedCount: 0,
  hasMore: false,
  isLoadingMore: false,
  remaining: 0
};

describe('SessionList.vue', () => {
  // ── Normal mode ────────────────────────────────────────────────────────────

  it('renders session cards', () => {
    const wrapper = mount(SessionList, { props: defaultProps });
    expect(wrapper.findAll('.session-card')).toHaveLength(1);
  });

  it('shows inline delete button in normal mode', () => {
    const wrapper = mount(SessionList, { props: defaultProps });
    expect(wrapper.find('.delete-btn-inline').exists()).toBe(true);
  });

  it('emits delete-session when inline delete is clicked', async () => {
    const wrapper = mount(SessionList, { props: defaultProps });
    await wrapper.find('.delete-btn-inline').trigger('click');
    expect(wrapper.emitted('delete-session')).toBeTruthy();
    expect(wrapper.emitted('delete-session')![0]).toEqual(['s1']);
  });

  it('emits enter-selection when Select button is clicked', async () => {
    const wrapper = mount(SessionList, { props: defaultProps });
    await wrapper.find('.select-mode-btn').trigger('click');
    expect(wrapper.emitted('enter-selection')).toBeTruthy();
  });

  it('does not show select-all or cancel in normal mode', () => {
    const wrapper = mount(SessionList, { props: defaultProps });
    expect(wrapper.find('.select-all-pill').exists()).toBe(false);
    expect(wrapper.find('.cancel-select-btn').exists()).toBe(false);
  });

  // ── Selection mode ─────────────────────────────────────────────────────────

  it('shows selection controls in selection mode', () => {
    const wrapper = mount(SessionList, {
      props: { ...defaultProps, selectionMode: true }
    });
    expect(wrapper.find('.select-all-pill').exists()).toBe(true);
    expect(wrapper.find('.cancel-select-btn').exists()).toBe(true);
    expect(wrapper.find('.select-mode-btn').exists()).toBe(false);
  });

  it('shows "Select All" when allSelected is false', () => {
    const wrapper = mount(SessionList, {
      props: { ...defaultProps, selectionMode: true, allSelected: false }
    });
    expect(wrapper.find('.select-all-pill').text()).toBe('Select All');
  });

  it('shows "Deselect All" when allSelected is true', () => {
    const wrapper = mount(SessionList, {
      props: { ...defaultProps, selectionMode: true, allSelected: true }
    });
    expect(wrapper.find('.select-all-pill').text()).toBe('Deselect All');
  });

  it('emits toggle-select-all when Select All pill is clicked', async () => {
    const wrapper = mount(SessionList, {
      props: { ...defaultProps, selectionMode: true }
    });
    await wrapper.find('.select-all-pill').trigger('click');
    expect(wrapper.emitted('toggle-select-all')).toBeTruthy();
  });

  it('shows delete-selected button when selectedCount > 0', () => {
    const wrapper = mount(SessionList, {
      props: { ...defaultProps, selectionMode: true, selectedCount: 1 }
    });
    expect(wrapper.find('.delete-selected-btn-sm').exists()).toBe(true);
  });

  it('hides delete-selected button when selectedCount is 0', () => {
    const wrapper = mount(SessionList, {
      props: { ...defaultProps, selectionMode: true, selectedCount: 0 }
    });
    expect(wrapper.find('.delete-selected-btn-sm').exists()).toBe(false);
  });

  it('emits delete-selected when delete button is clicked', async () => {
    const wrapper = mount(SessionList, {
      props: { ...defaultProps, selectionMode: true, selectedCount: 1 }
    });
    await wrapper.find('.delete-selected-btn-sm').trigger('click');
    expect(wrapper.emitted('delete-selected')).toBeTruthy();
  });

  it('shows "Deleting…" on delete button when isDeleting', () => {
    const wrapper = mount(SessionList, {
      props: { ...defaultProps, selectionMode: true, selectedCount: 1, isDeleting: true }
    });
    expect(wrapper.find('.delete-selected-btn-sm').text()).toBe('Deleting…');
  });

  it('emits exit-selection when Cancel button is clicked', async () => {
    const wrapper = mount(SessionList, {
      props: { ...defaultProps, selectionMode: true }
    });
    await wrapper.find('.cancel-select-btn').trigger('click');
    expect(wrapper.emitted('exit-selection')).toBeTruthy();
  });

  it('emits toggle-select when session card is clicked in selection mode', async () => {
    const wrapper = mount(SessionList, {
      props: { ...defaultProps, selectionMode: true }
    });
    await wrapper.find('.session-card').trigger('click');
    expect(wrapper.emitted('toggle-select')).toBeTruthy();
    expect(wrapper.emitted('toggle-select')![0]).toEqual(['s1']);
  });

  it('shows check badge for selected session in selection mode', () => {
    const wrapper = mount(SessionList, {
      props: {
        ...defaultProps,
        selectionMode: true,
        selectedIds: new Set(['s1'])
      }
    });
    expect(wrapper.find('.check-symbol').exists()).toBe(true);
    expect(wrapper.find('.check-symbol').text()).toBe('✓');
  });

  // ── Load more ──────────────────────────────────────────────────────────────

  it('shows load-more button when hasMore is true', () => {
    const wrapper = mount(SessionList, {
      props: { ...defaultProps, hasMore: true, remaining: 5 }
    });
    expect(wrapper.find('.load-more-btn').exists()).toBe(true);
    expect(wrapper.find('.load-more-btn').text()).toContain('5 remaining');
  });

  it('hides load-more button when hasMore is false', () => {
    const wrapper = mount(SessionList, { props: defaultProps });
    expect(wrapper.find('.load-more-btn').exists()).toBe(false);
  });

  it('emits load-more when Load More button is clicked', async () => {
    const wrapper = mount(SessionList, {
      props: { ...defaultProps, hasMore: true, remaining: 5 }
    });
    await wrapper.find('.load-more-btn').trigger('click');
    expect(wrapper.emitted('load-more')).toBeTruthy();
  });

  it('shows "Loading…" on load-more button when isLoadingMore', () => {
    const wrapper = mount(SessionList, {
      props: { ...defaultProps, hasMore: true, remaining: 5, isLoadingMore: true }
    });
    expect(wrapper.find('.load-more-btn').text()).toBe('Loading…');
  });

  // ── Score labels ────────────────────────────────────────────────────────────

  it('shows Excellent label for score > 7000', () => {
    const wrapper = mount(SessionList, {
      props: { ...defaultProps, sessions: [makeSession('s1', 1, 8000)] }
    });
    expect(wrapper.find('.session-score-label').text()).toBe('Excellent');
    expect(wrapper.find('.session-score-label').classes()).toContain('label-high');
  });

  it('shows Good label for score in 4000-7000 range', () => {
    const wrapper = mount(SessionList, {
      props: { ...defaultProps, sessions: [makeSession('s1', 1, 5500)] }
    });
    expect(wrapper.find('.session-score-label').text()).toBe('Good');
    expect(wrapper.find('.session-score-label').classes()).toContain('label-mid');
  });

  it('shows Needs Work label for score < 4000', () => {
    const wrapper = mount(SessionList, {
      props: { ...defaultProps, sessions: [makeSession('s1', 1, 2000)] }
    });
    expect(wrapper.find('.session-score-label').text()).toBe('Needs Work');
    expect(wrapper.find('.session-score-label').classes()).toContain('label-low');
  });
});
