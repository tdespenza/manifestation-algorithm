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
  test.beforeEach(async ({ settingsPage, resetDB }) => {
    await resetDB();
    await settingsPage.goto();
  });

  test('sharing toggle renders and defaults to disabled', async ({ page }) => {
    // Navigate to dashboard where SharingToggle lives
    await page.goto('/');
    await page.locator('.network-stats-panel, .sharing-toggle').first().waitFor({ timeout: 10_000 });
    const checkbox = page.locator('[data-testid="sharing-checkbox"]');
    await expect(checkbox).toBeVisible();
    await expect(checkbox).not.toBeChecked();
    const label = page.locator('.toggle-text');
    await expect(label).toContainText('Sharing disabled');
  });

  test('enabling the toggle updates the UI immediately', async ({ page }) => {
    await page.goto('/');
    await page.locator('.sharing-toggle').waitFor({ timeout: 10_000 });
    const checkbox = page.locator('[data-testid="sharing-checkbox"]');
    await checkbox.check();
    await expect(checkbox).toBeChecked();
    await expect(page.locator('.toggle-text')).toContainText('Sharing enabled');
    await expect(page.locator('.sharing-active-badge')).toBeVisible();
  });

  test('disabling the toggle after enabling updates the UI', async ({ page }) => {
    await page.goto('/');
    await page.locator('.sharing-toggle').waitFor({ timeout: 10_000 });
    const checkbox = page.locator('[data-testid="sharing-checkbox"]');
    await checkbox.check();
    await expect(checkbox).toBeChecked();
    await checkbox.uncheck();
    await expect(checkbox).not.toBeChecked();
    await expect(page.locator('.toggle-text')).toContainText('Sharing disabled');
    await expect(page.locator('.sharing-off-note')).toBeVisible();
  });

  test('enabled state persists across page navigation', async ({ page }) => {
    // Enable sharing on dashboard
    await page.goto('/');
    await page.locator('.sharing-toggle').waitFor({ timeout: 10_000 });
    await page.locator('[data-testid="sharing-checkbox"]').check();

    // Navigate away then back — the mock persists _sharingEnabled in memory
    await page.goto('/settings');
    await page.locator('.settings-view').waitFor({ timeout: 10_000 });
    await page.goto('/');
    await page.locator('.sharing-toggle').waitFor({ timeout: 10_000 });

    // SharingToggle loads state via get_network_sharing on mount
    const checkbox = page.locator('[data-testid="sharing-checkbox"]');
    await expect(checkbox).toBeChecked();
    await expect(page.locator('.toggle-text')).toContainText('Sharing enabled');
  });

  test('mock get_network_sharing returns true when previously enabled', async ({ page }) => {
    // Pre-seed sharing as enabled via the mock
    await page.evaluate(() =>
      (globalThis as unknown as { __tauriSeedDB: (d: unknown) => void }).__tauriSeedDB({ _sharingEnabled: true })
    );
    await page.goto('/');
    await page.locator('.sharing-toggle').waitFor({ timeout: 10_000 });
    const checkbox = page.locator('[data-testid="sharing-checkbox"]');
    await expect(checkbox).toBeChecked();
  });
});
