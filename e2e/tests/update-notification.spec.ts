/**
 * E2E tests for the UpdateNotification component.
 *
 * The component mounts in App.vue, waits 3 seconds after startup, then calls
 * check() from @tauri-apps/plugin-updater.  The Tauri mock (tauri-mock.ts)
 * handles `plugin:updater|check` and returns whatever is stored in
 * memDB._mockUpdate (null by default).
 *
 * Fixture: `presetMockUpdate(data)` registers an addInitScript that calls
 * window.__setMockUpdate() so the update is present from the very first check.
 */
import { test, expect } from '../fixtures/base';

// The check fires 3 s after mount; give a generous timeout so the banner has
// time to appear (or be confirmed absent) in CI.
const BANNER_WAIT = 10_000;
const AFTER_CHECK_WAIT = 4_000; // > 3 s delay in component

test.describe('UpdateNotification', () => {
  // ─── No update available ────────────────────────────────────────────────

  test('no update banner is shown when check returns null', async ({ page }) => {
    await page.goto('/');

    // Wait long enough for the 3-second startup delay to elapse.
    await page.waitForTimeout(AFTER_CHECK_WAIT);

    // The banner element should not be rendered at all.
    await expect(page.locator('.update-banner')).toHaveCount(0);
  });

  // ─── Update available ───────────────────────────────────────────────────

  test('update banner appears when an update is available', async ({
    page,
    presetMockUpdate,
  }) => {
    await presetMockUpdate({ version: '2.99.0', body: 'Bug fixes and improvements' });

    await page.goto('/');

    // Wait for the banner to appear (check fires after 3 s).
    const banner = page.locator('.update-banner.available');
    await expect(banner).toBeVisible({ timeout: BANNER_WAIT });
  });

  test('banner displays the correct version number', async ({
    page,
    presetMockUpdate,
  }) => {
    await presetMockUpdate({ version: '3.1.0' });

    await page.goto('/');

    await expect(page.locator('.update-banner.available')).toBeVisible({ timeout: BANNER_WAIT });
    await expect(page.locator('.update-banner')).toContainText('v3.1.0');
  });

  test('banner shows release notes when body is provided', async ({
    page,
    presetMockUpdate,
  }) => {
    await presetMockUpdate({ version: '3.2.0', body: 'Performance improvements and critical security fix' });

    await page.goto('/');

    await expect(page.locator('.update-banner.available')).toBeVisible({ timeout: BANNER_WAIT });
    await expect(page.locator('.update-notes')).toContainText('Performance improvements');
  });

  test('"Update Now" button is visible when update is available', async ({
    page,
    presetMockUpdate,
  }) => {
    await presetMockUpdate({ version: '4.0.0' });

    await page.goto('/');

    await expect(page.locator('.update-banner.available')).toBeVisible({ timeout: BANNER_WAIT });
    await expect(page.locator('.update-banner .btn-primary')).toHaveText('Update Now');
  });

  // ─── Dismiss ────────────────────────────────────────────────────────────

  test('dismiss button hides the update banner', async ({
    page,
    presetMockUpdate,
  }) => {
    await presetMockUpdate({ version: '5.0.0' });

    await page.goto('/');

    const banner = page.locator('.update-banner');
    await expect(banner).toBeVisible({ timeout: BANNER_WAIT });

    await page.locator('.btn-dismiss').click();

    await expect(banner).toHaveCount(0);
  });

  test('banner is still absent after navigating back when dismissed', async ({
    page,
    presetMockUpdate,
  }) => {
    await presetMockUpdate({ version: '5.1.0' });

    await page.goto('/');

    await expect(page.locator('.update-banner')).toBeVisible({ timeout: BANNER_WAIT });
    await page.locator('.btn-dismiss').click();
    await expect(page.locator('.update-banner')).toHaveCount(0);

    // Navigate away and back – the dismissed state is in component memory so
    // it resets, but the update check does NOT re-fire immediately (3 s guard).
    // Within the same app session the check only ran once; banner should
    // remain absent immediately after navigating back.
    await page.getByRole('link', { name: 'History' }).click();
    await page.waitForURL('/dashboard');
    await page.getByRole('link', { name: 'Questionnaire' }).click();

    // After a short wait well under 3 s the banner must not be visible.
    await page.waitForTimeout(500);
    await expect(page.locator('.update-banner')).toHaveCount(0);
  });

  // ─── Cross-page persistence ─────────────────────────────────────────────

  test('update banner is visible on the dashboard page too', async ({
    page,
    presetMockUpdate,
  }) => {
    await presetMockUpdate({ version: '6.0.0' });

    // Start on home, wait for banner, then navigate to dashboard.
    await page.goto('/');
    await expect(page.locator('.update-banner.available')).toBeVisible({ timeout: BANNER_WAIT });

    // App is a SPA; the component stays mounted during navigation.
    await page.getByRole('link', { name: 'History' }).click();
    await page.waitForURL('/dashboard');

    await expect(page.locator('.update-banner.available')).toBeVisible({ timeout: 3_000 });
  });

  test('update banner is visible on the settings page', async ({
    page,
    presetMockUpdate,
    appPage,
  }) => {
    await presetMockUpdate({ version: '6.1.0' });

    await page.goto('/');
    await expect(page.locator('.update-banner.available')).toBeVisible({ timeout: BANNER_WAIT });

    await appPage.goSettings();
    await page.waitForURL('/settings');

    await expect(page.locator('.update-banner.available')).toBeVisible({ timeout: 3_000 });
  });

  // ─── Accessibility ───────────────────────────────────────────────────────

  test('update banner has correct ARIA role and live region', async ({
    page,
    presetMockUpdate,
  }) => {
    await presetMockUpdate({ version: '7.0.0' });

    await page.goto('/');

    const banner = page.locator('.update-banner');
    await expect(banner).toBeVisible({ timeout: BANNER_WAIT });

    await expect(banner).toHaveAttribute('role', 'status');
    await expect(banner).toHaveAttribute('aria-live', 'polite');
  });

  test('dismiss button has accessible label', async ({
    page,
    presetMockUpdate,
  }) => {
    await presetMockUpdate({ version: '7.1.0' });

    await page.goto('/');
    await expect(page.locator('.update-banner')).toBeVisible({ timeout: BANNER_WAIT });

    const dismissBtn = page.locator('.btn-dismiss');
    await expect(dismissBtn).toHaveAttribute('aria-label', 'Dismiss');
  });
});
