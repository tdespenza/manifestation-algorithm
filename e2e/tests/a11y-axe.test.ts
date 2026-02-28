import AxeBuilder from '@axe-core/playwright';
import { test, expect } from '../fixtures/base';
import type { Page } from '@playwright/test';

async function expectNoA11yViolations(page: Page) {
  await page.waitForTimeout(350);
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'])
    .analyze();

  expect(results.violations, JSON.stringify(results.violations, null, 2)).toHaveLength(0);
}

test.describe('A11y Axe scans', () => {
  test('home page has no accessibility violations', async ({ page }) => {
    await page.goto('/');
    await page.locator('.questionnaire').waitFor({ timeout: 10_000 });
    await expectNoA11yViolations(page);
  });

  test('dashboard page has no accessibility violations', async ({ dashboardPage, page }) => {
    await dashboardPage.goto();
    await page.locator('.dashboard-view').waitFor({ timeout: 10_000 });
    await expectNoA11yViolations(page);
  });

  test('settings page has no accessibility violations', async ({ settingsPage, page }) => {
    await settingsPage.goto();
    await page.locator('.settings-view').waitFor({ timeout: 10_000 });
    await expectNoA11yViolations(page);
  });

  test('category detail route has no accessibility violations', async ({ page }) => {
    await page.goto('/category/1');
    await page.locator('.loading, .category-detail-view').first().waitFor({ timeout: 10_000 });
    await expectNoA11yViolations(page);
  });

  test('settings confirm dialog state has no accessibility violations', async ({ settingsPage, page }) => {
    await settingsPage.goto();
    await page.locator('.settings-view').waitFor({ timeout: 10_000 });
    await page.locator('#clear-answers-btn').click();
    await page.locator('.confirm-dialog').waitFor({ timeout: 3_000 });
    await expectNoA11yViolations(page);
  });

  test('update banner state has no accessibility violations', async ({ page, presetMockUpdate }) => {
    await presetMockUpdate({ version: '9.9.9', body: 'Accessibility scan state' });
    await page.goto('/');
    await page.locator('.update-banner').waitFor({ timeout: 12_000 });
    await expectNoA11yViolations(page);
  });
});
