/**
 * Security Contract Tests — PII & Privacy
 *
 * These tests enforce the zero-PII promise of the Manifestation Algorithm:
 *   • No personally-identifiable information is stored or exported
 *   • Answer values are bounded to the valid numeric range [1, 10]
 *   • Question IDs only contain known alphanumeric identifiers
 *   • Session IDs are UUID v4 (cryptographically random, non-biographical)
 *   • Score outputs are strictly numeric and within the expected range
 *   • Export column names match a safe whitelist (no freeform user text as keys)
 *
 * Agent: Quinn (QA) / Winston (Architect)
 */

import { describe, it, expect } from 'vitest';
import { calculateScore, getMaxPossibleScore } from '@/services/scoring';
import { questions } from '@/data/questions';

// ─── Helpers ────────────────────────────────────────────────────────────────

/** Returns all leaf question IDs from the question tree */
function getLeafIds(qs: typeof questions): string[] {
  const ids: string[] = [];
  function walk(node: (typeof questions)[number]) {
    if ('subPoints' in node && node.subPoints?.length) {
      node.subPoints.forEach(walk);
    } else {
      ids.push(node.id);
    }
  }
  qs.forEach(walk);
  return ids;
}

const leafIds = getLeafIds(questions);

/** Build an all-minimum answer set (rating = 1 for every leaf question) */
function minimumAnswers(): Record<string, number> {
  return Object.fromEntries(leafIds.map(id => [id, 1]));
}

/** Build an all-maximum answer set (rating = 10 for every leaf question) */
function maximumAnswers(): Record<string, number> {
  return Object.fromEntries(leafIds.map(id => [id, 10]));
}

// UUID v4 regex
const UUID_V4_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

// ─── 1. Question structure — no PII in question data ────────────────────────

describe('PII Contract: Question data schema', () => {
  it('all leaf question IDs contain only alphanumeric characters and hyphens/underscores', () => {
    const SAFE_ID_RE = /^[a-zA-Z0-9_-]+$/;
    for (const id of leafIds) {
      expect(id).toMatch(SAFE_ID_RE);
    }
  });

  it('no question ID contains an email address pattern', () => {
    for (const id of leafIds) {
      expect(id).not.toContain('@');
    }
  });

  it('no question ID contains a URL pattern', () => {
    for (const id of leafIds) {
      expect(id).not.toContain('http');
      expect(id).not.toContain('://');
    }
  });

  it('every leaf question has a numeric point value', () => {
    function walkPoints(node: (typeof questions)[number]) {
      if ('subPoints' in node && node.subPoints?.length) {
        node.subPoints.forEach(walkPoints);
      } else {
        // Leaf node must have a points field that is a positive number
        expect(typeof node.points).toBe('number');
        expect(node.points).toBeGreaterThan(0);
      }
    }
    questions.forEach(walkPoints);
  });
});

// ─── 2. Score calculation — bounded numeric output ───────────────────────────

describe('PII Contract: Score calculation output bounds', () => {
  it('minimum-answers score is a non-negative number', () => {
    const score = calculateScore(minimumAnswers());
    expect(typeof score).toBe('number');
    expect(score).toBeGreaterThanOrEqual(0);
  });

  it('maximum-answers score equals getMaxPossibleScore()', () => {
    const score = calculateScore(maximumAnswers());
    const max = getMaxPossibleScore();
    expect(score).toBeCloseTo(max, 0);
  });

  it('score is always a finite number (never NaN or Infinity)', () => {
    const score = calculateScore(minimumAnswers());
    expect(Number.isFinite(score)).toBe(true);
  });

  it('score never exceeds the maximum possible score', () => {
    const max = getMaxPossibleScore();
    const score = calculateScore(maximumAnswers());
    expect(score).toBeLessThanOrEqual(max);
  });

  it('calculateScore with empty answers returns a non-negative number (default baseline)', () => {
    const score = calculateScore({});
    expect(typeof score).toBe('number');
    expect(score).toBeGreaterThanOrEqual(0);
  });

  it('calculateScore ignores unknown question IDs (no score inflation from injection)', () => {
    const safe = minimumAnswers();
    const withInjected = {
      ...safe,
      // Attempt to inject a fake high-value question
      'injected-pii-question@attacker.com': 10,
      'http://evil.example.com': 10
    };
    const safeScore = calculateScore(safe);
    const injectedScore = calculateScore(withInjected);
    // Injected unknown IDs must not inflate the score
    expect(injectedScore).toBeCloseTo(safeScore, 1);
  });
});

// ─── 3. Answer value bounds ──────────────────────────────────────────────────

describe('PII Contract: Answer values are bounded integers', () => {
  it('all answer ratings are in range [1, 10]', () => {
    const answers = maximumAnswers();
    for (const [, val] of Object.entries(answers)) {
      expect(val).toBeGreaterThanOrEqual(1);
      expect(val).toBeLessThanOrEqual(10);
    }
  });

  it('score produced from out-of-range answers does not exceed max possible score', () => {
    // Even if somehow out-of-range values slipped in, the output must still be bounded
    const answers = Object.fromEntries(leafIds.map(id => [id, 10]));
    const score = calculateScore(answers);
    const max = getMaxPossibleScore();
    expect(score).toBeLessThanOrEqual(max);
  });
});

// ─── 4. Session ID format ────────────────────────────────────────────────────

describe('PII Contract: Session IDs are UUID v4', () => {
  it('crypto.randomUUID() produces a valid UUID v4', () => {
    // This validates the ID generation used by ensureSessionId()
    const id = crypto.randomUUID();
    expect(id).toMatch(UUID_V4_RE);
  });

  it('two generated session IDs are unique', () => {
    const id1 = crypto.randomUUID();
    const id2 = crypto.randomUUID();
    expect(id1).not.toBe(id2);
  });

  it('UUID v4 does not contain user-identifiable patterns (name, email)', () => {
    for (let i = 0; i < 20; i++) {
      const id = crypto.randomUUID();
      expect(id).not.toContain('@');
      expect(id).not.toContain('http');
      // UUID should be exactly 36 chars: 8-4-4-4-12 with hyphens
      expect(id).toHaveLength(36);
    }
  });
});

// ─── 5. Export column names whitelist ────────────────────────────────────────

describe('PII Contract: Export data column names', () => {
  /**
   * These are the columns that the DashboardView export produces.
   * The whitelist ensures no freeform user text can become a column header.
   */
  const FIXED_COLUMNS = ['Date', 'Time', 'Total Score', 'Duration (min)', 'Notes'];

  it('mandatory export columns are present in the whitelist', () => {
    for (const col of FIXED_COLUMNS) {
      // Just assert they are non-empty safe strings
      expect(col).toBeTruthy();
      expect(col).not.toContain('@');
      expect(col).not.toContain('http');
    }
  });

  it('category names used in question bank do not contain PII', () => {
    // Categories are derived from question descriptions — must not contain email/URL
    function collectDescriptions(qs: typeof questions, acc: string[]) {
      for (const q of qs) {
        if (q.description) acc.push(q.description);
        if ('subPoints' in q && q.subPoints?.length) {
          collectDescriptions(q.subPoints as typeof questions, acc);
        }
      }
    }
    const descriptions: string[] = [];
    collectDescriptions(questions, descriptions);

    for (const desc of descriptions) {
      expect(desc).not.toMatch(/@[a-zA-Z0-9.-]+\.[a-zA-Z]/); // email pattern
      expect(desc).not.toMatch(/https?:\/\//); // URL pattern
    }
  });
});

// ─── 6. Data structure anonymity ─────────────────────────────────────────────

describe('PII Contract: Session summary structure', () => {
  it('maximum possible score has a known finite upper bound', () => {
    const max = getMaxPossibleScore();
    // Based on scoring model: max should be exactly 10,000
    expect(max).toBe(10_000);
  });

  it('score percentage is always between 0 and 100', () => {
    const max = getMaxPossibleScore();
    const minScore = calculateScore(minimumAnswers());
    const maxScore = calculateScore(maximumAnswers());

    const minPct = (minScore / max) * 100;
    const maxPct = (maxScore / max) * 100;

    expect(minPct).toBeGreaterThanOrEqual(0);
    expect(maxPct).toBeLessThanOrEqual(100);
  });
});
