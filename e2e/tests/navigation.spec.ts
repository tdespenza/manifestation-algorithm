/**
 * Navigation E2E tests.
 *
 * Verifies that all top-level routes are reachable and the navbar renders
 * correctly on every page.
 */
import { test, expect } from '../fixtures/base';

test.describe('App navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.locator('.questionnaire').waitFor({ timeout: 10_000 });
  });

  test('renders the navigation bar on the home page', async ({ appPage }) => {
    await expect(appPage.nav).toBeVisible();
  });

  test('renders the Manifestation Algorithm logo link', async ({ appPage }) => {
    await expect(appPage.navLogo).toBeVisible();
    await expect(appPage.navLogo).toHaveAttribute('aria-label', 'Manifestation Algorithm');
  });

  test('renders Questionnaire and History nav links', async ({ appPage }) => {
    await expect(appPage.navQuestionnaire).toBeVisible();
    await expect(appPage.navHistory).toBeVisible();
  });

  test('renders the settings gear link', async ({ appPage }) => {
    await expect(appPage.navSettings).toBeVisible();
  });

  test('navigates to Dashboard (History) via nav link', async ({ appPage, dashboardPage }) => {
    await appPage.goDashboard();
    await expect(dashboardPage.heading).toBeVisible();
    await expect(dashboardPage.heading).toHaveText('Manifestation History');
  });

  test('navigates back to Home from Dashboard', async ({ appPage, homePage }) => {
    await appPage.goDashboard();
    await appPage.goHome();
    await expect(homePage.heading).toBeVisible();
  });

  test('navigates to Settings via gear icon', async ({ appPage, settingsPage }) => {
    await appPage.goSettings();
    await expect(settingsPage.heading).toBeVisible();
    await expect(settingsPage.heading).toHaveText('Settings');
  });

  test('logo click navigates back to home from any page', async ({ appPage }) => {
    await appPage.goDashboard();
    await appPage.goLogoHome();
    await expect(appPage.page).toHaveURL('/');
  });

  test('Settings → Home via questionnaire nav link', async ({ appPage, homePage }) => {
    await appPage.goSettings();
    await appPage.goHome();
    await expect(homePage.heading).toHaveText('Manifestation Algorithm');
  });

  test('active link is marked active on home', async ({ page }) => {
    await page.goto('/');
    const questLink = page.locator('.nav-links a[href="/"]');
    await expect(questLink).toHaveClass(/active/);
  });

  test('active link is marked active on dashboard', async ({ page }) => {
    await page.goto('/dashboard');
    await page.locator('.dashboard-view').waitFor();
    const dashLink = page.locator('.nav-links a[href="/dashboard"]');
    await expect(dashLink).toHaveClass(/active/);
  });

  test('direct URL navigation to /dashboard works', async ({ page, dashboardPage }) => {
    await page.goto('/dashboard');
    await expect(dashboardPage.heading).toBeVisible();
  });

  test('direct URL navigation to /settings works', async ({ page, settingsPage }) => {
    await page.goto('/settings');
    await expect(settingsPage.heading).toBeVisible();
  });
});
