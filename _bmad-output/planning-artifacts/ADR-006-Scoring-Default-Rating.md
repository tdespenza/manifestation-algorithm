# ADR-006: Default Unanswered Question Rating to 1

**Date:** 2026-02-21  
**Status:** Accepted  
**Deciders:** Tyshawn

---

## Context

The Manifestation Algorithm questionnaire has 42 leaf questions. Users may complete a session without answering every question (they can click "Complete Assessment" at any time). When submitting, the scoring function must produce a deterministic total score.

There are three viable approaches to unanswered questions:

| Approach | Description | Effect |
|---|---|---|
| **Default to 0** | Skip unanswered questions (score 0 contribution) | Score heavily penalised for incompleteness |
| **Default to 1** | Assign minimum possible rating (1/10 × points) | Baseline non-zero score, encourages completion |
| **Require 100%** | Block submission until all questions answered | Eliminates incompleteness but hurts UX |

## Decision

**Default unanswered questions to a rating of `1`** (the minimum valid rating, 1/10 × question points).

This applies only at **submission time** (`submitSession()` in `questionnaire.ts`). The live in-session score does NOT apply this default — it scores only the questions the user has actively rated. The display shows `--` (not a number) when zero answers have been given, to avoid misleading first-impression scores.

### Live Display vs. Final Score

| State | Live Score Display | Final Submitted Score |
|---|---|---|
| 0 answers | `--` (not a number) | Defaults all to 1 on submit |
| Some answers | Numeric (only answered qs) | Defaults unanswered to 1 on submit |
| All answers | Numeric (all qs) | Exact — no defaults applied |

## Consequences

**Positive:**
- Users see a starting baseline score after their first answer, which increases motivation
- Submission is never blocked — users can submit partial assessments
- Scoring remains deterministic: the same partial answer set always yields the same submitted score
- A rating of 1 is semantically meaningful ("minimal engagement") rather than "question does not exist"

**Negative:**
- A user who submits with zero answers sees a submitted score of ~1,045 (not 0). This could be surprising.
- The live score (computed from answered questions only) and the final submitted score can differ. The `--` display for 0 answers mitigates the worst case.
- The choice of `1` (not `0`) needs documentation to prevent future maintainers from treating it as a bug.

## Alternatives Considered

### Default to 0
Rejected because a score of ~0 for partial completion severely demoralises users. Most personal development apps use a "partial credit" model.

### Require 100% completion before submit
Rejected because the questionnaire is long (42 questions) and forcing completion before showing any result reduces engagement. The progressive submit pattern (submit at any time, with sensible defaults) is standard for survey apps.

## Code References

- `src/services/scoring.ts` — `calculateScore()` does NOT apply the default (used for live display)
- `src/stores/questionnaire.ts` — `submitSession()` builds `fullAnswers` with `answers[q.id] ?? 1` before scoring
- `src/components/ui/Questionnaire.vue` — `formattedScore` shows `--` when `answeredCount === 0`
