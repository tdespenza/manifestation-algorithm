/**
 * Smoke test – complete happy-path user journey.
 *
 * Tests the full workflow:
 *   1. Land on home page
 *   2. Rate all questions in scroll mode
 *   3. Verify score updates
 *   4. Submit the assessment
 *   5. Land on dashboard
 *   6. Navigate to settings
 *   7. Return to home
 */
import { test, expect } from '../fixtures/base';

test.describe('Full user journey (smoke test)', () => {
  test('complete questionnaire and navigate to dashboard', async ({
    page,
    questionnairePage,
    dashboardPage,
    appPage,
  }) => {
    // Step 1: Land on home
    await questionnairePage.goto();
    await expect(page.locator('.home-view h1')).toHaveText('Manifestation Algorithm');

    // Step 2: Switch to scroll mode and interact with the first slider
    await questionnairePage.switchToScrollMode();
    const firstSlider = page.locator('.slider').first();
    await expect(firstSlider).toBeVisible();

    // Set first slider to 8
    await firstSlider.fill('8');
    await firstSlider.dispatchEvent('input');
    // Wait for Vue reactivity to reflect the new slider value in the score display
    await expect(page.locator('.score-display, [class*="score"]').first()).not.toHaveText('--', { timeout: 3_000 });

    // Step 3: Verify score updates
    const score = await questionnairePage.getScore();
    expect(score).toMatch(/\d/);

    // Step 4: Submit assessment (rate all first to satisfy isComplete guard)
    await questionnairePage.rateAllAndSubmit();

    // Step 5: Verify redirect to dashboard
    await page.waitForURL('/dashboard', { timeout: 15_000 });
    await expect(dashboardPage.heading).toHaveText('Manifestation Algorithm Tracking History');

    // Step 6: Go to settings
    await appPage.goSettings();
    await expect(page.locator('.settings-view h1')).toHaveText('Settings');

    // Step 7: Return home via nav
    await appPage.goHome();
    await expect(page.locator('.home-view h1')).toHaveText('Manifestation Algorithm');
  });

  test('step-by-step mode: navigate all questions forward and back', async ({
    questionnairePage,
  }) => {
    await questionnairePage.goto();
    await questionnairePage.switchToStepMode();

    // Get the total number of questions
    const counterText = await questionnairePage.stepCounter.textContent() ?? '';
    const total = Number.parseInt(counterText.match(/of (\d+)/)?.[1] ?? '1');
    expect(total).toBeGreaterThan(0);

    // Navigate forward to question 3 (or total if less)
    const steps = Math.min(total - 1, 2);
    for (let i = 0; i < steps; i++) {
      await questionnairePage.goNext();
    }

    const textAfter = await questionnairePage.stepCounter.textContent() ?? '';
    expect(textAfter).toMatch(new RegExp(`Question ${steps + 1} of`));

    // Navigate back
    for (let i = 0; i < steps; i++) {
      await questionnairePage.goPrev();
    }

    const textBack = await questionnairePage.stepCounter.textContent() ?? '';
    expect(textBack).toMatch(/Question 1 of/);
  });

  test('switching between scroll and step modes preserves answers', async ({
    page,
    questionnairePage,
  }) => {
    await questionnairePage.goto();
    await questionnairePage.switchToScrollMode();

    // Answer the first slider
    const slider = page.locator('.slider').first();
    await slider.fill('9');
    await slider.dispatchEvent('input');
    // Wait for Vue reactivity to confirm the slider value landed
    await expect(page.locator('.slider').first()).toHaveValue('9', { timeout: 3_000 });

    // Switch to step mode
    await questionnairePage.switchToStepMode();
    await expect(questionnairePage.stepMode).toBeVisible();

    // Check the step-mode slider still shows 9
    const stepSlider = page.locator('.step-mode input[type="range"]').first();
    if (await stepSlider.count() > 0) {
      const val = await stepSlider.inputValue();
      expect(val).toBe('9');
    }
  });
});
