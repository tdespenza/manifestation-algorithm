# Dev Story: First-Run Onboarding Screen

**Epic:** UX / Onboarding  
**Priority:** P1  
**Agent:** Amelia (Dev) · Reviewed by Sally (UX)  
**Status:** Ready for Development  
**Estimate:** M (4–6 hours)

---

## User Story

> As a **first-time user**, I want to see a brief onboarding screen when I first open the app  
> so that I understand what the questionnaire measures and how the score is calculated  
> before I start answering questions.

---

## Acceptance Criteria

| # | Criterion |
|---|---|
| AC-1 | The onboarding screen is shown **once** — on first launch only. After dismissal it is never shown again. |
| AC-2 | The screen explains the scoring model in plain language (40 categories, 1–10 scale, max 10,000 points). |
| AC-3 | The screen names the three score tiers: Excellent (> 7,000), Good (4,000–7,000), Needs Work (< 4,000). |
| AC-4 | The screen explains that **unanswered questions default to 1** on submit. |
| AC-5 | A **"Get Started"** button dismisses the screen and navigates to the questionnaire. |
| AC-6 | A **"Skip"** or close (×) option is available for returning users who see it accidentally. |
| AC-7 | The "shown" flag is persisted via `setSetting('onboarding_complete', 'true')` in the DB. |
| AC-8 | The screen is keyboard accessible (Tab-navigable, Enter to confirm, Escape to dismiss). |
| AC-9 | The screen passes the existing contrast and ARIA checks in the E2E suite. |

---

## Technical Notes

### Showing Logic

In `App.vue` `onMounted()`:

```typescript
import { getSetting, setSetting } from './services/db';

const showOnboarding = ref(false);

onMounted(async () => {
  const done = await getSetting('onboarding_complete');
  if (!done) showOnboarding.value = true;
  // existing loadSharingState() call unchanged
  loadSharingState().catch(console.error);
});

async function completeOnboarding() {
  await setSetting('onboarding_complete', 'true');
  showOnboarding.value = false;
}
```

### Component: `OnboardingModal.vue`

- New file: `src/components/ui/OnboardingModal.vue`
- Emits: `@complete` — parent calls `completeOnboarding()`
- Slot content: 3–4 step slides or a single-page summary

### Suggested Slides (single-page layout is fine for v1.0)

1. **What is this?** — "Track your alignment across 40 life categories with a structured self-assessment."
2. **How scoring works** — "Rate each category 1–10 · Max score: 10,000 · Unanswered → defaults to 1"
3. **Score tiers** — Visual tier bar: Needs Work · Good · Excellent
4. **Your privacy** — "All data stays on your device. No cloud, no account."

---

## Files to Create / Modify

| File | Action |
|---|---|
| `src/components/ui/OnboardingModal.vue` | **Create** |
| `src/App.vue` | **Modify** — add show logic and `<OnboardingModal>` |
| `tests/unit/components/OnboardingModal.test.ts` | **Create** — unit tests |
| `e2e/tests/onboarding.spec.ts` | **Create** — E2E: shown on first launch, not shown on second |

---

## Unit Test Coverage

```typescript
// OnboardingModal.test.ts
describe('OnboardingModal', () => {
  it('renders the Get Started button');
  it('emits @complete when Get Started is clicked');
  it('emits @complete when Escape key is pressed');
  it('renders all four content sections');
});
```

---

## E2E Test Coverage

```typescript
// onboarding.spec.ts
test('onboarding modal shown on first visit');
test('onboarding modal disappears after Get Started click');
test('onboarding modal not shown on second visit');
test('onboarding modal is keyboard accessible');
```

---

## Related

- ADR-006: Scoring defaults for unanswered questions
- `docs/product-brief.md` Section 5 (Core Feature Set)
- `docs/scoring-formula.md`
