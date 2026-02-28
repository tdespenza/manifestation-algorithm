import { test, expect } from '../fixtures/base';

test.describe('Accessibility – keyboard journeys', () => {
  test('questionnaire step mode can be activated and navigated by keyboard', async ({ page }) => {
    await page.goto('/');
    await page.locator('.questionnaire').waitFor({ timeout: 10_000 });

    const stepModeBtn = page.getByRole('button', { name: 'Step by Step' });
    await stepModeBtn.focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('.step-mode')).toBeVisible();

    const nextBtn = page.getByRole('button', { name: 'Next →' });
    await nextBtn.focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('.step-counter')).toContainText('Question 2 of');
  });

  test('dashboard empty-state CTA is keyboard operable', async ({ page }) => {
    await page.goto('/dashboard');
    await page.locator('.dashboard-view').waitFor({ timeout: 10_000 });

    const cta = page.getByRole('link', { name: 'Start First Assessment' });
    await cta.focus();
    await page.keyboard.press('Enter');

    await page.waitForURL('/');
    await expect(page.locator('.questionnaire')).toBeVisible();
  });

  test('settings toggle is keyboard operable', async ({ page }) => {
    await page.goto('/settings');
    await page.locator('.settings-view').waitFor({ timeout: 10_000 });

    const toggle = page.locator('.btn-toggle[aria-label="Toggle save last session"]');
    await toggle.focus();

    const before = await toggle.locator('.toggle-text-val').innerText();
    await page.keyboard.press('Enter');
    await expect(toggle.locator('.toggle-text-val')).not.toHaveText(before);
  });
});
