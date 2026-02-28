import { ref, computed } from 'vue';
import type { ComputedRef, Ref } from 'vue';
import type { SessionSummary } from '../services/db';
import type { CategoryTrends } from '../services/dbTrends';

export interface DateRange {
  label: string;
  value: string;
}

export const DATE_RANGES: DateRange[] = [
  { label: '7d', value: '7d' },
  { label: '30d', value: '30d' },
  { label: '90d', value: '90d' },
  { label: '1yr', value: '1y' },
  { label: 'All', value: 'all' },
  { label: 'Custom', value: 'custom' }
];

export function useDateFilter(
  rawSessions: Ref<SessionSummary[]> | ComputedRef<SessionSummary[]>,
  rawTrends: Ref<CategoryTrends> | ComputedRef<CategoryTrends>
) {
  const selectedRange = ref('30d');
  const customStart = ref('');
  const customEnd = ref('');
  const todayStr = new Date().toISOString().slice(0, 10);

  function selectPreset(value: string) {
    selectedRange.value = value;
    if (value !== 'custom') {
      customStart.value = '';
      customEnd.value = '';
    }
  }

  const dateRange = computed<{ start: Date | null; end: Date | null }>(() => {
    if (selectedRange.value === 'custom') {
      const start = customStart.value ? new Date(customStart.value + 'T00:00:00') : null;
      const end = customEnd.value ? new Date(customEnd.value + 'T23:59:59') : null;
      return { start, end };
    }
    if (selectedRange.value === 'all') return { start: null, end: null };

    const start = new Date();
    if (selectedRange.value === '7d') start.setDate(start.getDate() - 7);
    else if (selectedRange.value === '30d') start.setDate(start.getDate() - 30);
    else if (selectedRange.value === '90d') start.setDate(start.getDate() - 90);
    /* istanbul ignore else */ else if (selectedRange.value === '1y')
      start.setFullYear(start.getFullYear() - 1);
    return { start, end: null };
  });

  const sessions = computed<SessionSummary[]>(() => {
    const { start, end } = dateRange.value;
    let list = rawSessions.value;
    if (start) list = list.filter(s => new Date(s.completed_at) >= start!);
    if (end) list = list.filter(s => new Date(s.completed_at) <= end!);
    return list;
  });

  const trends = computed<CategoryTrends>(() => {
    const { start, end } = dateRange.value;
    if (!start && !end) return rawTrends.value;
    const filtered: CategoryTrends = {};
    for (const [cat, points] of Object.entries(rawTrends.value)) {
      const p = points.filter(pt => {
        const d = new Date(pt.date);
        if (start && d < start) return false;
        if (end && d > end) return false;
        return true;
      });
      if (p.length > 0) filtered[cat] = p;
    }
    return filtered;
  });

  return {
    selectedRange,
    customStart,
    customEnd,
    todayStr,
    ranges: DATE_RANGES,
    selectPreset,
    dateRange,
    sessions,
    trends
  };
}
