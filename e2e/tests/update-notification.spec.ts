/**
 * E2E tests for the UpdateNotification component.
 *
 * The composable (useUpdateService) mounts in App.vue via UpdateNotification,
 * waits 3 seconds after startup, then calls check() from
 * @tauri-apps/plugin-updater.  When an update is found it immediately begins
 * downloading and installing it — no user click required.  The Tauri mock
 * (tauri-mock.ts) handles both `plugin:updater|check` and
 * `plugin:updater|download_and_install`, simulating instant downloads.
 *
 * Fixture: `presetMockUpdate(data)` registers an addInitScript that calls
 * window.__setMockUpdate() so the update is present from the very first check.
 */
import { test, expect } from '../fixtures/base';

// The check fires 3 s after mount; give a generous timeout so the banner has
// time to appear (or be confirmed absent) in CI.
const BANNER_WAIT = 10_000;
const AFTER_CHECK_WAIT = 4_000; // > 3 s delay in composable

test.describe('UpdateNotification', () => {
  // ─── No update available ────────────────────────────────────────────────

  test('no update banner is shown when check returns null', async ({ page }) => {
    await page.goto('/');

    // Wait for the 3-second startup delay to elapse and the check to complete.
    await page.waitForFunction(
      () => !!(window as unknown as Record<string, unknown>).__updateCheckDone,
      { timeout: BANNER_WAIT }
    );

    // The banner element should not be rendered at all.
    await expect(page.locator('.update-banner')).toHaveCount(0);
  });

  // ─── Auto-download and ready state ─────────────────────────────────────

  test('update banner reaches ready state automatically when an update is available', async ({
    page,
    presetMockUpdate,
  }) => {
    await presetMockUpdate({ version: '2.99.0', body: 'Bug fixes and improvements' });

    await page.goto('/');

    // Auto-download fires immediately after check; expect the ready banner.
    const banner = page.locator('.update-banner.ready');
    await expect(banner).toBeVisible({ timeout: BANNER_WAIT });
  });

  test('banner displays the correct version number', async ({
    page,
    presetMockUpdate,
  }) => {
    await presetMockUpdate({ version: '3.1.0' });

    await page.goto('/');

    await expect(page.locator('.update-banner.ready')).toBeVisible({ timeout: BANNER_WAIT });
    await expect(page.locator('.update-banner')).toContainText('3.1.0');
  });

  test('banner shows release notes when body is provided', async ({
    page,
    presetMockUpdate,
  }) => {
    await presetMockUpdate({ version: '3.2.0', body: 'Performance improvements and critical security fix' });

    await page.goto('/');

    await expect(page.locator('.update-banner.ready')).toBeVisible({ timeout: BANNER_WAIT });
    await expect(page.locator('.update-notes')).toContainText('Performance improvements');
  });

  test('"Restart Now" button is visible when update is ready', async ({
    page,
    presetMockUpdate,
  }) => {
    await presetMockUpdate({ version: '4.0.0' });

    await page.goto('/');

    await expect(page.locator('.update-banner.ready')).toBeVisible({ timeout: BANNER_WAIT });
    await expect(page.locator('.update-banner .btn-primary')).toHaveText('Restart Now');
  });

  test('"Update Now" button is not rendered (update downloads automatically)', async ({
    page,
    presetMockUpdate,
  }) => {
    await presetMockUpdate({ version: '4.1.0' });

    await page.goto('/');

    await expect(page.locator('.update-banner.ready')).toBeVisible({ timeout: BANNER_WAIT });
    await expect(page.locator('text=Update Now')).toHaveCount(0);
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

    // Navigate away and back – the dismissed state is in composable memory so
    // it persists for the lifetime of the App component.  Banner must stay hidden.
    await page.getByRole('link', { name: 'History' }).click();
    await page.waitForURL('/dashboard');
    await page.getByRole('link', { name: 'Questionnaire' }).click();

    // The 3-second re-check guard means the banner cannot reappear immediately.
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
    await expect(page.locator('.update-banner.ready')).toBeVisible({ timeout: BANNER_WAIT });

    // App is a SPA; the component stays mounted during navigation.
    await page.getByRole('link', { name: 'History' }).click();
    await page.waitForURL('/dashboard');

    await expect(page.locator('.update-banner.ready')).toBeVisible({ timeout: 3_000 });
  });

  test('update banner is visible on the settings page', async ({
    page,
    presetMockUpdate,
    appPage,
  }) => {
    await presetMockUpdate({ version: '6.1.0' });

    await page.goto('/');
    await expect(page.locator('.update-banner.ready')).toBeVisible({ timeout: BANNER_WAIT });

    await appPage.goSettings();
    await page.waitForURL('/settings');

    await expect(page.locator('.update-banner.ready')).toBeVisible({ timeout: 3_000 });
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

test.describe('UpdateNotification – comprehensive', () => {
  // ─── No update available ────────────────────────────────────────────────

  test('no update banner is shown when check returns null', async ({ page }) => {
    await page.goto('/');

    // Wait for the 3-second startup delay to elapse and the check to complete.
    await page.waitForFunction(
      () => !!(window as unknown as Record<string, unknown>).__updateCheckDone,
      { timeout: BANNER_WAIT }
    );

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

    // The mock auto-downloads instantly, so the banner reaches 'ready' state.
    // Wait for the banner to appear (check fires after 3 s).
    const banner = page.locator('.update-banner.ready');
    await expect(banner).toBeVisible({ timeout: BANNER_WAIT });
  });

  test('banner displays the correct version number', async ({
    page,
    presetMockUpdate,
  }) => {
    await presetMockUpdate({ version: '3.1.0' });

    await page.goto('/');

    // Mock auto-downloads instantly → banner reaches 'ready' state.
    await expect(page.locator('.update-banner.ready')).toBeVisible({ timeout: BANNER_WAIT });
    await expect(page.locator('.update-banner')).toContainText('v3.1.0');
  });

  test('banner shows release notes when body is provided', async ({
    page,
    presetMockUpdate,
  }) => {
    await presetMockUpdate({ version: '3.2.0', body: 'Performance improvements and critical security fix' });

    await page.goto('/');

    // Mock auto-downloads instantly → banner reaches 'ready' state.
    await expect(page.locator('.update-banner.ready')).toBeVisible({ timeout: BANNER_WAIT });
    await expect(page.locator('.update-notes')).toContainText('Performance improvements');
  });

  test('"Restart Now" button is visible when update is ready', async ({
    page,
    presetMockUpdate,
  }) => {
    await presetMockUpdate({ version: '4.0.0' });

    await page.goto('/');

    // Mock auto-downloads instantly → banner shows 'Restart Now' in ready state.
    await expect(page.locator('.update-banner.ready')).toBeVisible({ timeout: BANNER_WAIT });
    await expect(page.locator('.update-banner .btn-primary')).toHaveText('Restart Now');
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

    // The 3-second re-check guard means the banner cannot reappear immediately.
    await expect(page.locator('.update-banner')).toHaveCount(0);
  });

  // ─── Cross-page persistence ─────────────────────────────────────────────

  test('update banner is visible on the dashboard page too', async ({
    page,
    presetMockUpdate,
  }) => {
    await presetMockUpdate({ version: '6.0.0' });

    // Start on home, wait for banner (ready state since mock auto-downloads), then navigate to dashboard.
    await page.goto('/');
    await expect(page.locator('.update-banner.ready')).toBeVisible({ timeout: BANNER_WAIT });

    // App is a SPA; the component stays mounted during navigation.
    await page.getByRole('link', { name: 'History' }).click();
    await page.waitForURL('/dashboard');

    await expect(page.locator('.update-banner.ready')).toBeVisible({ timeout: 3_000 });
  });

  test('update banner is visible on the settings page', async ({
    page,
    presetMockUpdate,
    appPage,
  }) => {
    await presetMockUpdate({ version: '6.1.0' });

    await page.goto('/');
    // Mock auto-downloads instantly → banner reaches 'ready' state.
    await expect(page.locator('.update-banner.ready')).toBeVisible({ timeout: BANNER_WAIT });

    await appPage.goSettings();
    await page.waitForURL('/settings');

    await expect(page.locator('.update-banner.ready')).toBeVisible({ timeout: 3_000 });
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
