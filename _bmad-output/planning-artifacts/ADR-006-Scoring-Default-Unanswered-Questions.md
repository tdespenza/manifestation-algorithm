# ADR-006: Scoring Default for Unanswered Questions

**Date**: 2026-02-22  
**Status**: Accepted  
**Context**: Score calculation when the questionnaire is submitted with unanswered questions  
**Deciders**: Architecture Team  

---

## Problem Statement

The Manifestation Algorithm questionnaire has variable completion: users may submit before
answering every question. The scoring engine must decide how to handle missing answers.

Options considered:

1. **Omit unanswered questions** — only score answered questions, scale the result proportionally.
2. **Default to minimum (1)** — treat each unanswered question as if the user rated it 1/10.
3. **Default to mid-point (5)** — treat unanswered questions as neutral.
4. **Block submission** — require 100 % completion before scoring.

---

## Decision

**Default unanswered questions to the minimum value (1 / 10) when scoring.**

Implementation: `submitSession()` in `src/stores/questionnaire.ts` builds a complete
answer map for every leaf question before passing it to `calculateScore()`:

```typescript
const completeAnswers: Record<string, number> = {};
allQuestions.forEach(q => {
  completeAnswers[q.id] = answers.value[q.id] ?? 1;
});
```

---

## Rationale

### Why default to 1 (not omit, not 5)

| Option | Pros | Cons |
|---|---|---|
| Omit & scale | Rewards partial completion equally | Misleading — a 6/6 partial completion should not equal a 6/6 full completion |
| Default to 5 | "Charitable" neutral assumption | Inflates scores; a 0 % completion should not produce a ~50 % score |
| Default to 1 | Honest penalty for unanswered areas | May feel harsh — mitigated by the UI making defaults visible |
| Block submission | Guarantees completeness | Poor UX; forces the user to answer every question |

Defaulting to 1 means the final score *honestly reflects* only the areas where the user
has consciously engaged. It creates a natural incentive to answer all questions without
blocking the user entirely.

### Score Display Safeguard

`Questionnaire.vue` shows `'--'` (not a number) for `formattedScore` when
`answeredCount === 0`. This prevents the confusing "non-zero score before any answers"
perception while the user is still getting started.

---

## Consequences

- **Positive**: Scores are strictly earned — no points awarded for unanswered sections.
- **Positive**: Consistent behavior across partial and full submissions.
- **Negative**: A first-time user who submits immediately will receive a near-floor score;
  onboarding UI should explain the scoring model before submission.
- **Mitigation**: Add a first-run onboarding screen (see product backlog item: "First-Run
  Onboarding") that explains the scoring intent before the user attempts to submit.

---

## Alternatives Rejected

| Alternative | Reason Rejected |
|---|---|
| Proportional scaling | Hidden complexity; 10/10 partial ≠ 10/10 full |
| Default to 5 | Inflates score; contradicts the "honest self-assessment" product principle |
| Block submission at < 100 % | Violates progressive disclosure UX principle |
