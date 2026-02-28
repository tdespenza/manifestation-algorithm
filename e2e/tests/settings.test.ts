/**
 * Settings page E2E tests.
 *
 * Covers: navigation, rendering of settings controls, and close/back behavior.
 */
import { test, expect } from '../fixtures/base';
import type { DBSeed } from '../fixtures/base';

// Minimal seed so the dashboard renders sessions (required for NetworkRanking/SharingToggle)
const DASHBOARD_SEED: DBSeed = {
  historical_sessions: [
    {
      id: 'settings-e2e-session-001',
      total_score: 7500,
      completed_at: new Date().toISOString()
    }
  ],
  historical_responses: [
    {
      session_id: 'settings-e2e-session-001',
      question_number: '1a',
      answer_value: 9,
      recorded_at: new Date().toISOString()
    }
  ]
};

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
  test.beforeEach(async ({ page }) => {
    // Inject seed data as a persistent init script so it runs on every
    // page load (including /dashboard navigation below), ensuring sessions
    // exist and NetworkRanking / SharingToggle are rendered.
    await page.addInitScript(
      (data) => {
        const seed = data;
        const original = (window as Window & { __tauriSeedDB?: (d: unknown) => void }).__tauriSeedDB;
        if (original) {
          original(seed);
        } else {
          // Queue until mock is ready
          (window as Window & { __pendingSeed?: unknown }).__pendingSeed = seed;
          const interval = setInterval(() => {
            const fn = (window as Window & { __tauriSeedDB?: (d: unknown) => void }).__tauriSeedDB;
            if (fn) {
              clearInterval(interval);
              fn(seed);
            }
          }, 10);
        }
      },
      DASHBOARD_SEED
    );
  });

  test('sharing toggle renders and defaults to disabled', async ({ page }) => {
    // The SharingToggle lives in NetworkRanking on the dashboard
    await page.goto('/dashboard');
    await page.locator('.network-stats-panel, .sharing-toggle').first().waitFor({ timeout: 15_000 });
    // The checkbox input is visually hidden (display:none) behind a custom toggle switch
    const checkbox = page.locator('[data-testid="sharing-checkbox"]');
    await expect(checkbox).not.toBeChecked();
    const label = page.locator('.toggle-text');
    await expect(label).toContainText('Sharing disabled');
  });

  test('enabling the toggle updates the UI immediately', async ({ page }) => {
    await page.goto('/dashboard');
    await page.locator('.sharing-toggle').waitFor({ timeout: 15_000 });
    const checkbox = page.locator('[data-testid="sharing-checkbox"]');
    // Click the visible label to toggle (checkbox is display:none)
    await page.locator('label.toggle-label').click();
    await expect(checkbox).toBeChecked();
    await expect(page.locator('.toggle-text')).toContainText('Sharing enabled');
    await expect(page.locator('.sharing-active-badge')).toBeVisible();
  });

  test('disabling the toggle after enabling updates the UI', async ({ page }) => {
    await page.goto('/dashboard');
    await page.locator('.sharing-toggle').waitFor({ timeout: 15_000 });
    const checkbox = page.locator('[data-testid="sharing-checkbox"]');
    // Click the visible label to enable, then click again to disable
    await page.locator('label.toggle-label').click();
    await expect(checkbox).toBeChecked();
    await page.locator('label.toggle-label').click();
    await expect(checkbox).not.toBeChecked();
    await expect(page.locator('.toggle-text')).toContainText('Sharing disabled');
    await expect(page.locator('.sharing-off-note')).toBeVisible();
  });

  test('enabled state persists across page navigation', async ({ page }) => {
    // Enable sharing on dashboard
    await page.goto('/dashboard');
    await page.locator('.sharing-toggle').waitFor({ timeout: 15_000 });
    // Click the visible label to enable sharing (checkbox is display:none)
    await page.locator('label.toggle-label').click();
    await expect(page.locator('[data-testid="sharing-checkbox"]')).toBeChecked();

    // Use in-app router navigation (client-side) so the mock's in-memory
    // _sharingEnabled state is preserved (full page.goto() would reset the mock).
    await page.locator('a.settings-link').click();
    await page.locator('.settings-view').waitFor({ timeout: 10_000 });
    // Navigate back via the History nav link
    await page.locator('.nav-links a[href="/dashboard"]').click();
    await page.locator('.sharing-toggle').waitFor({ timeout: 15_000 });

    // SharingToggle loads state via get_network_sharing on mount
    const checkbox = page.locator('[data-testid="sharing-checkbox"]');
    await expect(checkbox).toBeChecked();
    await expect(page.locator('.toggle-text')).toContainText('Sharing enabled');
  });

  test('mock get_network_sharing returns true when previously enabled', async ({ page }) => {
    // Pre-seed sharing as enabled via addInitScript so it survives page reload
    await page.addInitScript(
      (data) => {
        (window as unknown as { __tauriSeedDB?: (d: unknown) => void }).__tauriSeedDB?.(data);
      },
      { _sharingEnabled: true } as unknown as Record<string, unknown>
    );
    await page.goto('/dashboard');
    await page.locator('.sharing-toggle').waitFor({ timeout: 15_000 });
    const checkbox = page.locator('[data-testid="sharing-checkbox"]');
    await expect(checkbox).toBeChecked();
  });

  test('enabling the toggle immediately publishes the last session to the network', async ({
    page,
    getDB,
  }) => {
    // Seed a completed session. Sharing starts OFF (default).
    await page.addInitScript(
      (data: unknown) => {
        (window as unknown as { __tauriSeedDB?: (d: unknown) => void }).__tauriSeedDB?.(data);
      },
      {
        historical_sessions: [
          { id: 'pub-e2e-001', total_score: 8250, completed_at: new Date().toISOString() }
        ],
        // Seed responses with question_id so publishLastSession picks them up
        historical_responses: [
          { session_id: 'pub-e2e-001', question_id: '1a', category: 'Master the Basics', answer_value: 9, recorded_at: new Date().toISOString() }
        ]
      }
    );

    await page.goto('/dashboard');
    await page.locator('.sharing-toggle').waitFor({ timeout: 15_000 });

    // Confirm no publish has happened yet
    let db = await getDB();
    expect((db._publishCalls as unknown[]).length).toBe(0);

    // Enable the toggle — this should immediately invoke publish_result
    await page.locator('label.toggle-label').click();
    await expect(page.locator('[data-testid="sharing-checkbox"]')).toBeChecked();

    // Wait for the async publish to complete by polling the mock DB state
    await page.waitForFunction(
      () => {
        const db = (globalThis as unknown as { __tauriGetDB?: () => { _publishCalls: unknown[] } }).__tauriGetDB?.();
        return (db?._publishCalls?.length ?? 0) >= 1;
      },
      { timeout: 5_000 }
    );

    db = await getDB();
    const publishCalls = db._publishCalls as Array<{ score: number; categoryScores: Record<string, number> }>;
    expect(publishCalls).toHaveLength(1);
    expect(publishCalls[0].score).toBe(8250);
  });
});

test.describe('Settings – save last session toggle', () => {
  test.beforeEach(async ({ settingsPage }) => {
    await settingsPage.goto();
  });

  test('Save Last Session toggle is visible', async ({ page }) => {
    await expect(page.locator('button.btn-toggle')).toBeVisible();
  });

  test('Save Last Session toggle shows "On" by default', async ({ page }) => {
    const toggle = page.locator('button.btn-toggle');
    await expect(toggle).toHaveText('On');
    await expect(toggle).toHaveClass(/active/);
  });

  test('clicking the Save Last Session toggle switches it Off', async ({ page }) => {
    const toggle = page.locator('button.btn-toggle');
    await toggle.click();
    await expect(toggle).toHaveText('Off', { timeout: 3_000 });
  });
});
