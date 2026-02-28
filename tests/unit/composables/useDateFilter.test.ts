import { describe, it, expect } from 'vitest';
import { ref } from 'vue';
import { useDateFilter, DATE_RANGES } from '../../../src/composables/useDateFilter';
import type { SessionSummary } from '../../../src/services/db';
import type { CategoryTrends } from '../../../src/services/dbTrends';

function makeSession(daysAgo: number, score = 1000): SessionSummary {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return {
    id: `s-${daysAgo}`,
    completed_at: d.toISOString(),
    total_score: score,
    duration_seconds: 60
  };
}

function makeTrend(daysAgo: number): { date: string; value: number } {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return { date: d.toISOString().slice(0, 10), value: 100 };
}

describe('useDateFilter', () => {
  describe('DATE_RANGES', () => {
    it('has 6 preset ranges', () => {
      expect(DATE_RANGES).toHaveLength(6);
    });

    it('matches the expected preset labels and values in order', () => {
      expect(DATE_RANGES).toEqual([
        { label: '7d', value: '7d' },
        { label: '30d', value: '30d' },
        { label: '90d', value: '90d' },
        { label: '1yr', value: '1y' },
        { label: 'All', value: 'all' },
        { label: 'Custom', value: 'custom' }
      ]);
    });

    it('includes custom range', () => {
      expect(DATE_RANGES.find(r => r.value === 'custom')).toBeDefined();
    });

    it('exposes the same ranges list from composable return value', () => {
      const rawSessions = ref<SessionSummary[]>([]);
      const rawTrends = ref<CategoryTrends>({});
      const { ranges } = useDateFilter(rawSessions, rawTrends);
      expect(ranges).toEqual(DATE_RANGES);
    });
  });

  describe('default state', () => {
    it('selectedRange defaults to 30d', () => {
      const rawSessions = ref<SessionSummary[]>([]);
      const rawTrends = ref<CategoryTrends>({});
      const { selectedRange } = useDateFilter(rawSessions, rawTrends);
      expect(selectedRange.value).toBe('30d');
    });

    it('customStart and customEnd default to empty strings', () => {
      const rawSessions = ref<SessionSummary[]>([]);
      const rawTrends = ref<CategoryTrends>({});
      const { customStart, customEnd } = useDateFilter(rawSessions, rawTrends);
      expect(customStart.value).toBe('');
      expect(customEnd.value).toBe('');
    });

    it('todayStr is a valid YYYY-MM-DD', () => {
      const rawSessions = ref<SessionSummary[]>([]);
      const rawTrends = ref<CategoryTrends>({});
      const { todayStr } = useDateFilter(rawSessions, rawTrends);
      expect(todayStr).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });
  });

  describe('selectPreset', () => {
    it('updates selectedRange', () => {
      const rawSessions = ref<SessionSummary[]>([]);
      const rawTrends = ref<CategoryTrends>({});
      const { selectedRange, selectPreset } = useDateFilter(rawSessions, rawTrends);
      selectPreset('7d');
      expect(selectedRange.value).toBe('7d');
    });

    it('clears customStart/customEnd when selecting non-custom range', () => {
      const rawSessions = ref<SessionSummary[]>([]);
      const rawTrends = ref<CategoryTrends>({});
      const { customStart, customEnd, selectPreset } = useDateFilter(rawSessions, rawTrends);
      customStart.value = '2024-01-01';
      customEnd.value = '2024-01-31';
      selectPreset('30d');
      expect(customStart.value).toBe('');
      expect(customEnd.value).toBe('');
    });

    it('preserves customStart/customEnd when selecting custom range', () => {
      const rawSessions = ref<SessionSummary[]>([]);
      const rawTrends = ref<CategoryTrends>({});
      const { customStart, customEnd, selectPreset } = useDateFilter(rawSessions, rawTrends);
      customStart.value = '2024-01-01';
      customEnd.value = '2024-01-31';
      selectPreset('custom');
      expect(customStart.value).toBe('2024-01-01');
      expect(customEnd.value).toBe('2024-01-31');
    });
  });

  describe('sessions filtering', () => {
    it('returns sessions within 7d window', () => {
      const rawSessions = ref<SessionSummary[]>([
        makeSession(3), // 3 days ago — within 7d
        makeSession(10) // 10 days ago — outside 7d
      ]);
      const rawTrends = ref<CategoryTrends>({});
      const { selectPreset, sessions } = useDateFilter(rawSessions, rawTrends);
      selectPreset('7d');
      expect(sessions.value.map(s => s.id)).toEqual(['s-3']);
    });

    it('returns all sessions for "all" range', () => {
      const rawSessions = ref<SessionSummary[]>([makeSession(1), makeSession(365)]);
      const rawTrends = ref<CategoryTrends>({});
      const { selectPreset, sessions } = useDateFilter(rawSessions, rawTrends);
      selectPreset('all');
      expect(sessions.value).toHaveLength(2);
    });

    it('filters by custom date range', () => {
      // session 50 days ago should be excluded from a 2-day custom window
      const old = makeSession(50);
      const recent = makeSession(1);
      const rawSessions = ref<SessionSummary[]>([old, recent]);
      const rawTrends = ref<CategoryTrends>({});
      const { customStart, customEnd, selectPreset, sessions } = useDateFilter(
        rawSessions,
        rawTrends
      );
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 2);
      selectPreset('custom');
      customStart.value = yesterday.toISOString().slice(0, 10);
      customEnd.value = today.toISOString().slice(0, 10);
      expect(sessions.value.map(s => s.id)).toContain(recent.id);
      expect(sessions.value.map(s => s.id)).not.toContain(old.id);
    });

    it('includes sessions exactly on custom start and end boundaries', () => {
      const startIso = '2024-01-10T00:00:00';
      const endIso = '2024-01-12T23:59:59';
      const beforeIso = '2024-01-09T23:59:59';
      const afterIso = '2024-01-13T00:00:00';

      const rawSessions = ref<SessionSummary[]>([
        { id: 'start', completed_at: startIso, total_score: 1, duration_seconds: 1 },
        { id: 'end', completed_at: endIso, total_score: 1, duration_seconds: 1 },
        { id: 'before', completed_at: beforeIso, total_score: 1, duration_seconds: 1 },
        { id: 'after', completed_at: afterIso, total_score: 1, duration_seconds: 1 }
      ]);
      const rawTrends = ref<CategoryTrends>({});
      const { customStart, customEnd, selectPreset, sessions } = useDateFilter(
        rawSessions,
        rawTrends
      );

      selectPreset('custom');
      customStart.value = '2024-01-10';
      customEnd.value = '2024-01-12';

      expect(sessions.value.map(s => s.id)).toEqual(['start', 'end']);
    });
  });

  describe('trends filtering', () => {
    it('passes through all trends for "all" range', () => {
      const rawTrends = ref<CategoryTrends>({
        Gratitude: [makeTrend(200), makeTrend(10)]
      });
      const rawSessions = ref<SessionSummary[]>([]);
      const { selectPreset, trends } = useDateFilter(rawSessions, rawTrends);
      selectPreset('all');
      expect(trends.value['Gratitude']).toHaveLength(2);
      expect(trends.value).toBe(rawTrends.value);
    });

    it('filters trends to 30d window', () => {
      const rawTrends = ref<CategoryTrends>({
        Gratitude: [makeTrend(60), makeTrend(5)]
      });
      const rawSessions = ref<SessionSummary[]>([]);
      const { selectPreset, trends } = useDateFilter(rawSessions, rawTrends);
      selectPreset('30d');
      expect(trends.value['Gratitude']).toHaveLength(1);
      expect(trends.value['Gratitude'][0]).toEqual(rawTrends.value['Gratitude'][1]);
    });

    it('excludes category when all points are outside range', () => {
      const rawTrends = ref<CategoryTrends>({
        Gratitude: [makeTrend(100)]
      });
      const rawSessions = ref<SessionSummary[]>([]);
      const { selectPreset, trends } = useDateFilter(rawSessions, rawTrends);
      selectPreset('7d');
      expect(trends.value['Gratitude']).toBeUndefined();
    });

    it('filters trends by custom date range with both start and end (end filter branch)', () => {
      // 5-day-old trend should be excluded when end is 10 days ago
      const recent = makeTrend(5);
      const older = makeTrend(15);
      const rawTrends = ref<CategoryTrends>({ Gratitude: [recent, older] });
      const rawSessions = ref<SessionSummary[]>([]);
      const { customStart, customEnd, selectPreset, trends } = useDateFilter(
        rawSessions,
        rawTrends
      );
      const tenDaysAgo = new Date();
      tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);
      const twentyDaysAgo = new Date();
      twentyDaysAgo.setDate(twentyDaysAgo.getDate() - 20);
      selectPreset('custom');
      customStart.value = twentyDaysAgo.toISOString().slice(0, 10);
      customEnd.value = tenDaysAgo.toISOString().slice(0, 10);
      // 5-day-old trend is AFTER the end date → excluded
      expect(trends.value['Gratitude']).toBeDefined();
      expect(trends.value['Gratitude']).toHaveLength(1);
      expect(trends.value['Gratitude'][0]).toEqual(older);
    });

    it('includes trend points exactly on custom start and end boundaries', () => {
      const rawTrends = ref<CategoryTrends>({
        Gratitude: [
          { date: '2024-01-10T00:00:00', value: 1 },
          { date: '2024-01-12T23:59:59', value: 2 },
          { date: '2024-01-09T23:59:59', value: 3 },
          { date: '2024-01-13T00:00:00', value: 4 }
        ]
      });
      const rawSessions = ref<SessionSummary[]>([]);
      const { customStart, customEnd, selectPreset, trends } = useDateFilter(
        rawSessions,
        rawTrends
      );

      selectPreset('custom');
      customStart.value = '2024-01-10';
      customEnd.value = '2024-01-12';

      expect(trends.value['Gratitude']).toEqual([
        { date: '2024-01-10T00:00:00', value: 1 },
        { date: '2024-01-12T23:59:59', value: 2 }
      ]);
    });
  });

  describe('1y preset', () => {
    it('returns sessions within 1y window', () => {
      const rawSessions = ref<SessionSummary[]>([
        makeSession(300), // 300 days ago — within 1y
        makeSession(400) // 400 days ago — outside 1y
      ]);
      const rawTrends = ref<CategoryTrends>({});
      const { selectPreset, sessions } = useDateFilter(rawSessions, rawTrends);
      selectPreset('1y');
      expect(sessions.value.map(s => s.id)).toContain('s-300');
      expect(sessions.value.map(s => s.id)).not.toContain('s-400');
    });
  });

  describe('unknown/unrecognized preset (implicit else fallthrough)', () => {
    it('falls through all else-if branches when preset is unrecognized', () => {
      const rawSessions = ref<SessionSummary[]>([makeSession(300)]);
      const rawTrends = ref<CategoryTrends>({});
      const { selectPreset, dateRange } = useDateFilter(rawSessions, rawTrends);
      // Use a preset that doesn't match any known value — hits the implicit else
      selectPreset('unknown-preset');
      // start is set to new Date() (no adjustment), end is null
      expect(dateRange.value.start).toBeDefined();
      expect(dateRange.value.end).toBeNull();
    });
    it('unknown preset does not apply 1y offset', () => {
      const rawSessions = ref<SessionSummary[]>([]);
      const rawTrends = ref<CategoryTrends>({});
      const { selectPreset, dateRange } = useDateFilter(rawSessions, rawTrends);

      selectPreset('unknown-range');
      const start = dateRange.value.start;
      expect(start).toBeInstanceOf(Date);
      expect(dateRange.value.end).toBeNull();

      const now = Date.now();
      const diffMs = Math.abs(now - start!.getTime());
      expect(diffMs).toBeLessThan(24 * 60 * 60 * 1000);
    });
  });

  describe('custom range null branches', () => {
    it('handles custom range with only customStart set (end is null)', () => {
      const rawSessions = ref<SessionSummary[]>([makeSession(3), makeSession(50)]);
      const rawTrends = ref<CategoryTrends>({});
      const { customStart, selectPreset, sessions } = useDateFilter(rawSessions, rawTrends);
      const tenDaysAgo = new Date();
      tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);
      selectPreset('custom');
      customStart.value = tenDaysAgo.toISOString().slice(0, 10);
      // customEnd is '' so end = null
      expect(sessions.value.map(s => s.id)).toContain('s-3');
      expect(sessions.value.map(s => s.id)).not.toContain('s-50');
    });

    it('handles custom range with only customEnd set (start is null)', () => {
      const rawSessions = ref<SessionSummary[]>([makeSession(5), makeSession(50)]);
      const rawTrends = ref<CategoryTrends>({});
      const { customEnd, selectPreset, sessions } = useDateFilter(rawSessions, rawTrends);
      const twentyDaysAgo = new Date();
      twentyDaysAgo.setDate(twentyDaysAgo.getDate() - 20);
      selectPreset('custom');
      customEnd.value = twentyDaysAgo.toISOString().slice(0, 10);
      // customStart is '' so start = null; only sessions before end are included
      expect(sessions.value.map(s => s.id)).toContain('s-50');
      expect(sessions.value.map(s => s.id)).not.toContain('s-5');
    });
    it('all range keeps sessions with invalid completed_at values', () => {
      const rawSessions = ref<SessionSummary[]>([
        {
          id: 'valid',
          completed_at: new Date().toISOString(),
          total_score: 1,
          duration_seconds: 1
        },
        { id: 'invalid', completed_at: 'not-a-date', total_score: 1, duration_seconds: 1 }
      ]);
      const rawTrends = ref<CategoryTrends>({});
      const { selectPreset, sessions } = useDateFilter(rawSessions, rawTrends);

      selectPreset('all');

      expect(sessions.value.map(s => s.id)).toEqual(['valid', 'invalid']);
    });

    it('dateRange all preset returns explicit null bounds', () => {
      const rawSessions = ref<SessionSummary[]>([]);
      const rawTrends = ref<CategoryTrends>({});
      const { selectPreset, dateRange } = useDateFilter(rawSessions, rawTrends);
      selectPreset('all');
      expect(dateRange.value).toEqual({ start: null, end: null });
    });

    it('dateRange custom preset appends day start/end times', () => {
      const rawSessions = ref<SessionSummary[]>([]);
      const rawTrends = ref<CategoryTrends>({});
      const { customStart, customEnd, selectPreset, dateRange } = useDateFilter(
        rawSessions,
        rawTrends
      );

      selectPreset('custom');
      customStart.value = '2024-02-01';
      customEnd.value = '2024-02-03';

      expect(dateRange.value.start?.getFullYear()).toBe(2024);
      expect(dateRange.value.start?.getMonth()).toBe(1);
      expect(dateRange.value.start?.getDate()).toBe(1);
      expect(dateRange.value.start?.getHours()).toBe(0);
      expect(dateRange.value.start?.getMinutes()).toBe(0);
      expect(dateRange.value.start?.getSeconds()).toBe(0);

      expect(dateRange.value.end?.getFullYear()).toBe(2024);
      expect(dateRange.value.end?.getMonth()).toBe(1);
      expect(dateRange.value.end?.getDate()).toBe(3);
      expect(dateRange.value.end?.getHours()).toBe(23);
      expect(dateRange.value.end?.getMinutes()).toBe(59);
      expect(dateRange.value.end?.getSeconds()).toBe(59);
    });
  });
});
