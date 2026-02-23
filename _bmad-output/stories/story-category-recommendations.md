# Dev Story: Category Improvement Recommendations

**Epic:** Insights / Dashboard  
**Priority:** P1  
**Agent:** Amelia (Dev) · Reviewed by John (PM) · Sally (UX)  
**Status:** Ready for Development  
**Estimate:** M (4–6 hours)

---

## User Story

> As a **user who has just submitted an assessment**, I want to see which categories  
> are my lowest-scoring areas and get a simple action prompt for each,  
> so that I know *where to focus* between assessments.

---

## Acceptance Criteria

| # | Criterion |
|---|---|
| AC-1 | After each submission, the Dashboard shows a **"Focus Areas"** section listing the 3 lowest-scoring categories. |
| AC-2 | Each focus area card displays: category name, current score (1–10), and a one-line improvement prompt. |
| AC-3 | If all categories are rated ≥ 8, display a "Great alignment across all areas!" message instead. |
| AC-4 | The section is based on the **most recent session** only (not historical average). |
| AC-5 | The section is hidden when there are **zero sessions** (empty state). |
| AC-6 | Improvement prompts are static copy keyed by category name (no AI required for v1.0). |
| AC-7 | The section is responsive and works on all three tested browsers (Chromium, Firefox, Mobile Safari). |

---

## Technical Notes

### Data Source

Use the most recent session's category scores from the `trends` computed object already
available in `DashboardView.vue`. The category breakdown is keyed by category name (string).

```typescript
// In dashboard composable or DashboardView.vue
const focusAreas = computed(() => {
  if (sessions.value.length === 0) return [];

  // Get latest session's per-category score from trends
  const latest = Object.entries(trends.value)
    .map(([cat, data]) => ({
      category: cat,
      score: data[data.length - 1]?.value ?? 0
    }))
    .sort((a, b) => a.score - b.score)
    .slice(0, 3);

  return latest.filter(item => item.score < 8); // Only show if below threshold
});
```

### Improvement Prompts

Create a lookup table in `src/data/recommendations.ts`:

```typescript
export const recommendations: Record<string, string> = {
  'Mindset':       'Spend 10 minutes journaling your intentions each morning.',
  'Health':        'Schedule one active movement session this week.',
  'Relationships': 'Reach out to someone you value but haven\'t spoken to recently.',
  // ... one entry per category
};
```

### Component: `FocusAreas.vue`

- New file: `src/components/dashboard/FocusAreas.vue`
- Props: `areas: Array<{ category: string; score: number }>`
- Renders zero, one, two, or three cards based on prop length
- Uses existing `CategoryCard` styling tokens

---

## Files to Create / Modify

| File | Action |
|---|---|
| `src/data/recommendations.ts` | **Create** — static prompt lookup |
| `src/components/dashboard/FocusAreas.vue` | **Create** — recommendations panel |
| `src/views/DashboardView.vue` | **Modify** — add `focusAreas` computed + `<FocusAreas>` |
| `tests/unit/components/FocusAreas.test.ts` | **Create** |
| `e2e/tests/dashboard.spec.ts` | **Modify** — add focus areas assertions |

---

## Unit Test Coverage

```typescript
// FocusAreas.test.ts
describe('FocusAreas', () => {
  it('renders nothing when areas prop is empty');
  it('renders up to 3 focus area cards');
  it('shows the "Great alignment" message when no low-scoring categories');
  it('displays the category name and score for each area');
  it('renders the correct improvement prompt for each category');
});
```

---

## E2E Test Coverage

```typescript
// In dashboard.spec.ts
test('focus areas section visible after session with low scores');
test('focus areas shows at most 3 categories');
test('focus areas hidden when no sessions exist');
```

---

## Related

- `docs/scoring-formula.md`
- `src/data/questions.ts` (category names)
- `story-first-run-onboarding.md` (companion UX story)
