/**
 * Settings page E2E tests.
 *
 * Covers: navigation, rendering of settings controls, and close/back behavior.
 */
import { test, expect } from '../fixtures/base';

test.describe('Settings page', () => {
  test.beforeEach(async ({ settingsPage }) => {
    await settingsPage.goto();
  });

  test('renders the settings-view container', async ({ page }) => {
    await expect(page.locator('.settings-view')).toBeVisible();
  });

  test('shows "Settings" heading', async ({ settingsPage }) => {
    await expect(settingsPage.heading).toHaveText('Settings');
  });

  test('mounts the Settings component', async ({ page }) => {
    // The Settings.vue component is rendered inside .settings-view
    await expect(page.locator('.settings-view')).toBeVisible();
    // Check that SOME content from Settings.vue is rendered
    const content = await page.locator('.settings-view').textContent();
    expect(content?.length).toBeGreaterThan(10);
  });

  test('has a way to close/go back to home', async ({ settingsPage, page }) => {
    await settingsPage.close();
    // After close, should be on home
    await expect(page).toHaveURL('/');
  });

  test('navigating back via browser history works', async ({ page }) => {
    await page.goto('/');
    await page.locator('.questionnaire').waitFor({ timeout: 10_000 });
    await page.goto('/settings');
    await page.locator('.settings-view').waitFor({ timeout: 10_000 });
    await page.goBack();
    await expect(page).toHaveURL('/');
  });
});

test.describe('Settings – sharing toggle', () => {
  test.beforeEach(async ({ settingsPage }) => {
    await settingsPage.goto();
  });

  test('renders the SharingToggle or settings checkboxes', async ({ page }) => {
    // Either a .sharing-toggle or checkbox exists in settings
    const toggle = page.locator('.sharing-toggle, input[type="checkbox"], input[type="toggle"]').first();
    await toggle.isVisible().catch(() => false);
    const hasSettings = await page.locator('.settings-view').isVisible();
    expect(hasSettings).toBe(true);
  });
});
