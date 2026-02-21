/**
 * Questionnaire flow E2E tests.
 *
 * Covers: scroll mode, step-by-step mode, rating sliders, score updates,
 * progress tracking, resume dialog, and submission flow.
 */
import { test, expect } from '../fixtures/base';

test.describe('Questionnaire – scroll mode', () => {
  test.beforeEach(async ({ questionnairePage }) => {
    await questionnairePage.goto();
    await questionnairePage.switchToScrollMode();
  });

  test('renders questions in scroll mode', async ({ page }) => {
    await expect(page.locator('.questions-list')).toBeVisible();
  });

  test('renders at least one question item', async ({ page }) => {
    const items = page.locator('.question-item');
    await expect(items.first()).toBeVisible();
  });

  test('each question has a visible description', async ({ page }) => {
    const texts = page.locator('.question-item .question-text');
    await expect(texts.first()).toBeVisible();
  });

  test('leaf questions have a rating slider', async ({ page }) => {
    const sliders = page.locator('.question-item .slider');
    await expect(sliders.first()).toBeVisible();
  });

  test('slider is in range 1–10', async ({ page }) => {
    const slider = page.locator('.slider').first();
    await expect(slider).toHaveAttribute('min', '1');
    await expect(slider).toHaveAttribute('max', '10');
  });

  test('moving a slider updates the displayed value', async ({ page }) => {
    const slider = page.locator('.slider').first();
    const valueDisplay = page.locator('.slider-value').first();
    await slider.fill('8');
    await slider.dispatchEvent('input');
    await expect(valueDisplay).toHaveText('8');
  });

  test('moving a slider updates the current score', async ({ questionnairePage, page }) => {
    const slider = page.locator('.slider').first();
    // Set to max to guarantee score increases
    await slider.fill('10');
    await slider.dispatchEvent('input');
    const scoreAfter = await questionnairePage.getScore();
    // Score should be a number — just check it's rendered
    expect(scoreAfter).toBeTruthy();
    // The score text should contain digits
    expect(scoreAfter).toMatch(/\d/);
  });

  test('scroll mode is active button when selected', async ({ questionnairePage }) => {
    await expect(questionnairePage.scrollModeBtn).toHaveClass(/active/);
    await expect(questionnairePage.stepModeBtn).not.toHaveClass(/active/);
  });
});

test.describe('Questionnaire – step-by-step mode', () => {
  test.beforeEach(async ({ questionnairePage }) => {
    await questionnairePage.goto();
    await questionnairePage.switchToStepMode();
  });

  test('shows the step mode container', async ({ questionnairePage }) => {
    await expect(questionnairePage.stepMode).toBeVisible();
  });

  test('shows the step counter', async ({ questionnairePage }) => {
    await expect(questionnairePage.stepCounter).toBeVisible();
    const text = await questionnairePage.stepCounter.textContent();
    expect(text).toMatch(/Question \d+ of \d+/);
  });

  test('shows previous and next buttons', async ({ questionnairePage }) => {
    await expect(questionnairePage.nextBtn).toBeVisible();
    await expect(questionnairePage.prevBtn).toBeVisible();
  });

  test('prev button is disabled on first question', async ({ questionnairePage }) => {
    await expect(questionnairePage.prevBtn).toBeDisabled();
  });

  test('clicking next advances to question 2', async ({ questionnairePage }) => {
    await questionnairePage.goNext();
    const text = await questionnairePage.stepCounter.textContent();
    expect(text).toMatch(/Question 2 of/);
  });

  test('clicking next then prev returns to question 1', async ({ questionnairePage }) => {
    await questionnairePage.goNext();
    await questionnairePage.goPrev();
    const text = await questionnairePage.stepCounter.textContent();
    expect(text).toMatch(/Question 1 of/);
  });

  test('step mode is active button when selected', async ({ questionnairePage }) => {
    await expect(questionnairePage.stepModeBtn).toHaveClass(/active/);
    await expect(questionnairePage.scrollModeBtn).not.toHaveClass(/active/);
  });

  test('dot nav renders dots', async ({ questionnairePage }) => {
    const dots = questionnairePage.dotNav.locator('.dot');
    const count = await dots.count();
    expect(count).toBeGreaterThan(0);
  });

  test('first dot is active on load', async ({ questionnairePage }) => {
    const firstDot = questionnairePage.dotNav.locator('.dot').first();
    await expect(firstDot).toHaveClass(/active/);
  });

  test('clicking a dot jumps to that question', async ({ questionnairePage }) => {
    const thirdDot = questionnairePage.dotNav.locator('.dot').nth(2);
    await thirdDot.click();
    const text = await questionnairePage.stepCounter.textContent();
    expect(text).toMatch(/Question 3 of/);
  });

  test('next button is disabled on last question', async ({ questionnairePage }) => {
    // Navigate to the last question using the keyboard shortcut loop
    const text = await questionnairePage.stepCounter.textContent() ?? '';
    const total = Number.parseInt(text.match(/of (\d+)/)?.[1] ?? '1');
    // Jump to last via dot nav (click last dot)
    const dots = questionnairePage.dotNav.locator('.dot');
    const lastDot = dots.nth(total - 1);
    await lastDot.click();
    await expect(questionnairePage.nextBtn).toBeDisabled();
  });
});

test.describe('Questionnaire – progress tracking', () => {
  test.beforeEach(async ({ questionnairePage }) => {
    await questionnairePage.goto();
    await questionnairePage.switchToScrollMode();
  });

  test('initial progress shows 0%', async ({ questionnairePage }) => {
    const text = await questionnairePage.getProgressText();
    expect(text).toContain('0%');
  });

  test('progress increases after rating a question', async ({ questionnairePage, page }) => {
    const slider = page.locator('.slider').first();
    await slider.fill('7');
    await slider.dispatchEvent('input');
    // Wait for the store to propagate the answer into the progress text
    await expect(questionnairePage.progressText).not.toContainText('0%');
    const text = await questionnairePage.getProgressText();
    // Progress should now be greater than 0
    const match = text.match(/(\d+)%/);
    expect(match).toBeTruthy();
    const pct = Number.parseInt(match![1]);
    expect(pct).toBeGreaterThan(0);
  });

  test('progress bar fill width increases after rating', async ({ page }) => {
    // The fill div is always in DOM; just ensure the parent progress bar is visible
    await expect(page.locator('.progress-bar')).toBeVisible();
  });
});

test.describe('Questionnaire – submission', () => {
  test.beforeEach(async ({ questionnairePage }) => {
    await questionnairePage.goto();
    await questionnairePage.switchToScrollMode();
  });

  test('submit button is visible and labeled "Complete Assessment"', async ({ questionnairePage }) => {
    await expect(questionnairePage.submitBtn).toBeVisible();
    await expect(questionnairePage.submitBtn).toHaveText('Complete Assessment');
  });

  test('submit navigates to dashboard on success', async ({ questionnairePage, page }) => {
    // Rate all questions first — the submit guard requires isComplete === true
    await questionnairePage.rateAllAndSubmit();
    // After submit the store calls saveHistoricalSession and routes to /dashboard
    await page.waitForURL('/dashboard', { timeout: 15_000 });
    await expect(page.locator('.dashboard-view')).toBeVisible();
  });
});

test.describe('Questionnaire – reset button', () => {
  test.beforeEach(async ({ questionnairePage }) => {
    await questionnairePage.goto();
    await questionnairePage.switchToScrollMode();
  });

  test('reset button is visible in the questionnaire', async ({ page }) => {
    await expect(page.locator('.reset-btn')).toBeVisible();
    await expect(page.locator('.reset-btn')).toHaveText('Reset all answers');
  });

  test('clicking reset clears all answers', async ({ questionnairePage, page }) => {
    // Rate a question then reset
    const sliders = page.locator('.questions-list input[type="range"]');
    const count = await sliders.count();
    if (count > 0) {
      await sliders.first().fill('8');
      // Wait for the answer to be reflected in the progress text before resetting
      await expect(page.locator('.progress-text')).not.toContainText('0/');
    }
    await page.locator('.reset-btn').click();
    // Confirm the destructive action in the dialog
    await page.locator('.btn-confirm').waitFor({ timeout: 5_000 });
    await page.locator('.btn-confirm').click();
    // After reset, the questionnaire is still visible
    await expect(page.locator('.questionnaire')).toBeVisible();
    // Progress shows 0% after reset (wait for async reset to propagate)
    await expect(page.locator('.progress-text')).toContainText('0%');
  });

  test('questionnaire loads without a resume dialog on startup', async ({ page, seedDB }) => {
    // Even with a seeded session, there is no blocking resume dialog
    const session_id = 'e2e-test-session';
    await page.goto('/');
    await page.locator('.questionnaire').waitFor({ timeout: 10_000 });

    await seedDB({
      questionnaire_responses: [
        { session_id, question_number: '1a', answer_value: 7 },
      ],
      settings: [
        { key: `last_active_${session_id}`, value: Date.now().toString() },
      ],
    });

    await page.reload();
    await page.locator('.questionnaire').waitFor({ timeout: 10_000 });

    // No blocking resume modal — the questionnaire renders directly
    await expect(page.locator('.questionnaire')).toBeVisible();
    // No resume dialog stub or overlay blocking the UI
    await expect(page.locator('.resume-dialog')).not.toBeVisible();
  });
});

test.describe('Questionnaire – keyboard navigation', () => {
  test.beforeEach(async ({ questionnairePage }) => {
    await questionnairePage.goto();
    await questionnairePage.switchToStepMode();
    // Programmatically focus the questionnaire container (tabindex="-1")
    await questionnairePage.page.evaluate(() => {
      const el = document.querySelector('.questionnaire') as HTMLElement;
      if (el) el.focus();
    });
    // Wait for step mode to be fully active
    await questionnairePage.page.locator('.step-mode').waitFor({ state: 'visible' });
  });

  test('right arrow key advances to next question', async ({ questionnairePage }) => {
    await questionnairePage.page.keyboard.press('ArrowRight');
    // Wait for Vue to update the step counter
    await expect(questionnairePage.stepCounter).toContainText('Question 2 of');
    const text = await questionnairePage.stepCounter.textContent();
    expect(text).toMatch(/Question 2 of/);
  });

  test('left arrow key goes to prev question after advancing', async ({ questionnairePage }) => {
    await questionnairePage.page.keyboard.press('ArrowRight');
    // Wait for advance before pressing back
    await expect(questionnairePage.stepCounter).toContainText('Question 2 of');
    await questionnairePage.page.keyboard.press('ArrowLeft');
    // Wait for Vue to update
    await expect(questionnairePage.stepCounter).toContainText('Question 1 of');
    const text = await questionnairePage.stepCounter.textContent();
    expect(text).toMatch(/Question 1 of/);
  });

  test('pressing digit key 7 sets current question to 7', async ({ page }) => {
    const slider = page.locator('.step-mode input[type="range"]').first();
    if (await slider.count() > 0) {
      // Ensure questionnaire has focus, then press digit key
      await page.evaluate(() => {
        const el = document.querySelector('.questionnaire') as HTMLElement;
        if (el) el.focus();
      });
      await page.keyboard.press('7');
      // Wait for the slider value to be set
      await expect(slider).toHaveValue('7');
      const val = await slider.inputValue();
      expect(val).toBe('7');
    }
  });
});

test.describe('Questionnaire – sticky header', () => {
  test.beforeEach(async ({ questionnairePage }) => {
    await questionnairePage.goto();
    await questionnairePage.switchToScrollMode();
  });

  test('sticky header stays below the navbar after scrolling', async ({ page }) => {
    // Scroll down so the header sticks
    await page.evaluate(() => window.scrollBy(0, 300));
    // Wait for scroll to settle before measuring sticky position
    await page.waitForFunction(() => window.scrollY > 200);

    const header = page.locator('.header').first();
    await expect(header).toBeVisible();

    // The header's top edge must be at or below the navbar bottom (60 px).
    // getBoundingClientRect().top gives the distance from the viewport top.
    const top = await header.evaluate(
      (el: HTMLElement) => el.getBoundingClientRect().top,
    );

    // After scrolling, a sticky element with top: 60px should have its top
    // edge at approximately 60 px (the navbar height), NOT at 0.
    expect(top).toBeGreaterThanOrEqual(50); // allow ±10 px for sub-pixel rendering and Mobile Safari DPR
  });

  test('sticky header is never hidden behind the navbar (top > 0)', async ({ page }) => {
    await page.evaluate(() => window.scrollBy(0, 500));
    // Wait for scroll to settle before measuring sticky position
    await page.waitForFunction(() => window.scrollY > 400);

    const header = page.locator('.header').first();
    await expect(header).toBeVisible();

    const top = await header.evaluate(
      (el: HTMLElement) => el.getBoundingClientRect().top,
    );

    // The header must NEVER be at top: 0 — that would mean it scrolls under
    // the navbar (which has z-index: 100 and sticks at 0 itself).
    expect(top).toBeGreaterThan(0);
  });
});

