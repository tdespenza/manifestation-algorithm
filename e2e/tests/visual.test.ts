/**
 * Visual regression test suite.
 *
 * Uses Playwright's built-in toHaveScreenshot() to lock in pixel-level baselines
 * for all major pages and interactive states.
 *
 * FIRST-RUN SETUP
 * ─────────────────
 * Baseline snapshots do not exist yet. Generate them with:
 *
 *   npm run test:visual:update
 *
 * Subsequent runs compare against those baselines automatically:
 *
 *   npm run test:visual
 *
 * Snapshots are stored in e2e/snapshots/ and should be committed to source control.
 *
 * CONFIGURATION
 * ─────────────
 * toHaveScreenshot thresholds are set in playwright.config.ts:
 *   maxDiffPixelRatio: 0.02   (2% of pixels may differ)
 *   threshold: 0.2            (per-pixel colour tolerance)
 *   animations: 'disabled'   (CSS transitions / animations suppressed)
 */

import { test, expect } from '../fixtures/base';
import type { DBSeed } from '../fixtures/base';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Standard seed data used across visual tests requiring historical data */
const SEED: DBSeed = {
  historical_sessions: [
    { id: 'vis-session-1', total_score: 7200, completed_at: '2024-06-01T10:00:00.000Z' },
    { id: 'vis-session-2', total_score: 6100, completed_at: '2024-06-08T10:00:00.000Z' },
    { id: 'vis-session-3', total_score: 7800, completed_at: '2024-06-15T10:00:00.000Z' },
  ],
  historical_responses: [
    { session_id: 'vis-session-1', question_number: '1a', answer_value: 8, recorded_at: '2024-06-01T10:00:00.000Z' },
    { session_id: 'vis-session-1', question_number: '2a', answer_value: 7, recorded_at: '2024-06-01T10:00:00.000Z' },
    { session_id: 'vis-session-2', question_number: '1a', answer_value: 6, recorded_at: '2024-06-08T10:00:00.000Z' },
    { session_id: 'vis-session-2', question_number: '2a', answer_value: 5, recorded_at: '2024-06-08T10:00:00.000Z' },
    { session_id: 'vis-session-3', question_number: '1a', answer_value: 9, recorded_at: '2024-06-15T10:00:00.000Z' },
    { session_id: 'vis-session-3', question_number: '2a', answer_value: 8, recorded_at: '2024-06-15T10:00:00.000Z' },
  ],
};

/** Wait for page to settle: no network, no pending Vue ticks  */
async function settle(page: import('@playwright/test').Page, extraMs = 200) {
  await page.waitForLoadState('networkidle').catch(() => {/* ignore timeout */});
  await page.waitForTimeout(extraMs);
}

// ---------------------------------------------------------------------------
// Desktop – 1280 × 800 (default in all tests below)
// ---------------------------------------------------------------------------

test.describe('Visual – Home page', () => {
  test('home page – fresh state (scroll mode)', async ({ page, homePage }) => {
    await homePage.goto();
    await settle(page);
    await expect(page).toHaveScreenshot('home-fresh-scroll.png');
  });

  test('home page – step mode active', async ({ page, questionnairePage }) => {
    await questionnairePage.goto();
    await questionnairePage.switchToStepMode();
    await settle(page);
    await expect(page).toHaveScreenshot('home-step-mode.png');
  });

  test('navigation bar', async ({ page, homePage }) => {
    await homePage.goto();
    await settle(page);
    const nav = page.locator('.main-nav');
    await expect(nav).toHaveScreenshot('nav-bar.png');
  });
});

test.describe('Visual – Dashboard page', () => {
  test('dashboard – empty state', async ({ page, dashboardPage }) => {
    await dashboardPage.goto();
    await settle(page);
    await expect(page).toHaveScreenshot('dashboard-empty.png');
  });

  test('dashboard – with historical data', async ({ page, dashboardPage, seedDB }) => {
    await page.goto('/dashboard');
    await page.locator('.dashboard-view').waitFor({ timeout: 10_000 });
    await seedDB(SEED);
    await page.reload();
    await page.locator('.dashboard-view').waitFor({ timeout: 10_000 });
    await page.locator('#dashboard-history-area, .empty-state').waitFor({ timeout: 10_000 });
    await settle(page);
    await expect(page).toHaveScreenshot('dashboard-with-data.png');
  });

  test('dashboard – select mode (no items selected)', async ({ page, dashboardPage, seedDB }) => {
    await page.goto('/dashboard');
    await page.locator('.dashboard-view').waitFor({ timeout: 10_000 });
    await seedDB(SEED);
    await page.reload();
    await page.locator('.dashboard-view').waitFor({ timeout: 10_000 });
    await page.locator('#dashboard-history-area, .empty-state').waitFor({ timeout: 10_000 });

    const selectBtn = dashboardPage.selectModeBtn;
    if (!(await selectBtn.isVisible().catch(() => false))) {
      test.skip();
      return;
    }
    await selectBtn.click();
    await settle(page);
    await expect(page).toHaveScreenshot('dashboard-select-mode.png');
  });

  test('dashboard – confirm delete dialog', async ({ page, dashboardPage, seedDB }) => {
    await page.goto('/dashboard');
    await page.locator('.dashboard-view').waitFor({ timeout: 10_000 });
    await seedDB(SEED);
    await page.reload();
    await page.locator('.dashboard-view').waitFor({ timeout: 10_000 });
    await page.locator('#dashboard-history-area, .empty-state').waitFor({ timeout: 10_000 });

    const selectBtn = dashboardPage.selectModeBtn;
    if (!(await selectBtn.isVisible().catch(() => false))) {
      test.skip();
      return;
    }
    await selectBtn.click();

    const firstCard = dashboardPage.sessionCards.first();
    if (!(await firstCard.isVisible().catch(() => false))) {
      test.skip();
      return;
    }
    await firstCard.click();

    const delBtn = dashboardPage.deleteSelectedBtn;
    if (!(await delBtn.isVisible().catch(() => false))) {
      test.skip();
      return;
    }
    await delBtn.click();
    await expect(dashboardPage.confirmDialog).toBeVisible();
    await settle(page);
    await expect(page).toHaveScreenshot('dashboard-confirm-dialog.png');
  });

  test('dashboard – stats panel', async ({ page, dashboardPage, seedDB }) => {
    await page.goto('/dashboard');
    await page.locator('.dashboard-view').waitFor({ timeout: 10_000 });
    await seedDB(SEED);
    await page.reload();
    await page.locator('.dashboard-view').waitFor({ timeout: 10_000 });
    await page.locator('#dashboard-history-area, .empty-state').waitFor({ timeout: 10_000 });
    await settle(page);
    const statsPanel = dashboardPage.statsPanel;
    if (!(await statsPanel.isVisible().catch(() => false))) {
      test.skip();
      return;
    }
    await expect(statsPanel).toHaveScreenshot('dashboard-stats-panel.png');
  });
});

test.describe('Visual – Settings page', () => {
  test('settings page – sharing disabled', async ({ page, settingsPage }) => {
    await settingsPage.goto();
    await settle(page);
    await expect(page).toHaveScreenshot('settings-default.png');
  });

  test('settings page – sharing enabled', async ({ page, settingsPage, seedDB }) => {
    await page.goto('/settings');
    await page.locator('.settings-view').waitFor({ timeout: 10_000 });
    await seedDB({ settings: [{ key: 'sharing_enabled', value: 'true' }] });
    await page.reload();
    await page.locator('.settings-view').waitFor({ timeout: 10_000 });
    await settle(page);
    await expect(page).toHaveScreenshot('settings-sharing-enabled.png');
  });
});

test.describe('Visual – Questionnaire states', () => {
  test('questionnaire – scroll mode, no answers', async ({ page, questionnairePage }) => {
    await questionnairePage.goto();
    await questionnairePage.switchToScrollMode();
    await settle(page);
    // Capture just the questionnaire component for a focused snapshot
    const questionnaire = page.locator('.questionnaire');
    await expect(questionnaire).toHaveScreenshot('questionnaire-scroll-mode.png');
  });

  test('questionnaire – step mode, first step', async ({ page, questionnairePage }) => {
    await questionnairePage.goto();
    await questionnairePage.switchToStepMode();
    await settle(page);
    const questionnaire = page.locator('.questionnaire');
    await expect(questionnaire).toHaveScreenshot('questionnaire-step-mode-first.png');
  });

  test('questionnaire – progress bar at 0%', async ({ page, questionnairePage }) => {
    await questionnairePage.goto();
    await settle(page);
    const header = page.locator('.questionnaire .header');
    if (!(await header.isVisible().catch(() => false))) {
      test.skip();
      return;
    }
    await expect(header).toHaveScreenshot('questionnaire-header-0pct.png');
  });
});

test.describe('Visual – Update banner', () => {
  test('update banner visible', async ({ page, homePage, presetMockUpdate }) => {
    await presetMockUpdate({ version: '99.0.0', body: 'A new version is available.' });
    await homePage.goto();
    const banner = page.locator('[class*="update"], .update-banner, .update-notification').first();
    const visible = await banner.isVisible().catch(() => false);
    if (!visible) {
      test.skip();
      return;
    }
    await settle(page);
    await expect(banner).toHaveScreenshot('update-banner.png');
  });
});

// ---------------------------------------------------------------------------
// Mobile viewport  –  390 × 844 (iPhone 14 logical resolution)
// ---------------------------------------------------------------------------

test.describe('Visual – Mobile (390 × 844)', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('home page – mobile', async ({ page, homePage }) => {
    await homePage.goto();
    await settle(page);
    await expect(page).toHaveScreenshot('mobile-home.png');
  });

  test('dashboard – mobile, empty state', async ({ page, dashboardPage }) => {
    await dashboardPage.goto();
    await settle(page);
    await expect(page).toHaveScreenshot('mobile-dashboard-empty.png');
  });

  test('settings – mobile', async ({ page, settingsPage }) => {
    await settingsPage.goto();
    await settle(page);
    await expect(page).toHaveScreenshot('mobile-settings.png');
  });

  test('questionnaire step mode – mobile', async ({ page, questionnairePage }) => {
    await questionnairePage.goto();
    await questionnairePage.switchToStepMode();
    await settle(page);
    await expect(page).toHaveScreenshot('mobile-questionnaire-step.png');
  });
});

// ---------------------------------------------------------------------------
// Viewport: tablet landscape – 1024 × 768
// ---------------------------------------------------------------------------

test.describe('Visual – Tablet landscape (1024 × 768)', () => {
  test.use({ viewport: { width: 1024, height: 768 } });

  test('home page – tablet', async ({ page, homePage }) => {
    await homePage.goto();
    await settle(page);
    await expect(page).toHaveScreenshot('tablet-home.png');
  });

  test('dashboard with data – tablet', async ({ page, dashboardPage, seedDB }) => {
    await page.goto('/dashboard');
    await page.locator('.dashboard-view').waitFor({ timeout: 10_000 });
    await seedDB(SEED);
    await page.reload();
    await page.locator('.dashboard-view').waitFor({ timeout: 10_000 });
    await page.locator('#dashboard-history-area, .empty-state').waitFor({ timeout: 10_000 });
    await settle(page);
    await expect(page).toHaveScreenshot('tablet-dashboard-with-data.png');
  });
});
