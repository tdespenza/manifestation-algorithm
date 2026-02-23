# ADR-006: Unanswered Questions Default to Rating 1

**Date**: 2025-02-23  
**Status**: Accepted  
**Authors**: Tyshawn Despenza (reviewed by Winston, Amelia)

---

## Context

The Manifestation Algorithm scoring formula evaluates 40 weighted categories. Each category is rated on a 1–10 scale. A user may submit an assessment without answering every question — either because a category is not applicable to their situation, or because they navigated away from an incomplete questionnaire.

A design decision must be made for the default value assigned to unanswered questions.

---

## Decision Drivers

1. **Mathematical safety** — The formula must never divide by zero or produce `NaN`.
2. **Honesty** — An unanswered category should not artificially inflate a score.
3. **Usability** — A score of `0` for the *total* would be confusing when the user answered most questions and expects meaningful output.
4. **Consistency** — The default should be the same whether the user answers 0, 1, or 39 questions.

---

## Considered Options

### Option A — Default to 0

An unanswered category scores 0.

- **Pro**: Clear penalty for skipping.
- **Con**: Produces a total score of exactly `0` even when one question is skipped, which is misleading.
- **Con**: Formula uses `rating` as a multiplier; `0` drives the weighted product to zero, collapsing the entire score to 0 even for highly-rated users.

### Option B — Default to 5 (midpoint)

An unanswered category scores 5 (neutral midpoint of the 1–10 scale).

- **Pro**: Neutral; doesn't penalize or reward unanswered questions.
- **Con**: Implicitly assumes the user is "average" in categories they chose not to evaluate — potentially misleading.

### Option C — Default to 1 (minimum) ✅ CHOSEN

An unanswered category scores 1 (the floor of the valid range).

- **Pro**: Produces a non-zero baseline score (~1,000 when all 40 categories are unanswered) that is recognizably *minimal*, not meaningful.
- **Pro**: The resulting score of ~1,000 clearly signals "you haven't started" without being `0` or deceptively high.
- **Pro**: 1 is always a valid rating; the formula behaves correctly at this boundary.
- **Con**: Slight semantic mismatch — the user isn't actively claiming to be at level 1, they simply haven't answered.

---

## Decision

**Unanswered questions default to `rating = 1`.**

This is implemented in `src/services/scoring.ts` via the `getAnswer` helper:

```typescript
// score an answered question, or fall back to rating=1 for unanswered ones
function getAnswer(answers: Record<string, number>, questionId: string): number {
  return answers[questionId] ?? 1;
}
```

The resulting baseline score (all 40 questions at rating 1) is approximately **1,000 points** — the lowest possible score value — visually distinct from a meaningful result.

---

## Consequences

- The dashboard score display shows `'--'` when `answeredCount === 0` (no questions touched at all), shielding the user from the misleading 1,000-point baseline until they begin entering answers. *(See `Questionnaire.vue` → `formattedScore`)*
- Once the user answers at least one question, the true computed score is shown (which now includes the baseline contribution from unanswered categories).
- Integration and unit tests covering edge cases must be written against `rating = 1` (not `0`) defaults.

---

## References

- `docs/scoring-formula.md` — full formula derivation
- `src/services/scoring.ts` — implementation
- `src/components/ui/Questionnaire.vue` — `formattedScore` display guard
