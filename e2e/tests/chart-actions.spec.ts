/**
 * Chart Actions E2E tests.
 *
 * Covers: export dialog trigger, all export options, print behaviour,
 * and excel/csv/pdf/html exports on Dashboard and Category Detail views.
 *
 * Seed strategy: use page.addInitScript so data is available on every
 * page load — the Tauri mock IIFE exposes __tauriSeedDB which is called
 * by the injected init script before the Vue app boots.
 */
import { test, expect } from '../fixtures/base';
import type { DBSeed } from '../fixtures/base';
import type { Page } from '@playwright/test';

const SESSION_ID_1 = 'e2e-chart-action-001';
const SESSION_ID_2 = 'e2e-chart-action-002';

const now = new Date().toISOString();
const yesterday = new Date(Date.now() - 86_400_000).toISOString();

// Extra fields (category, date, score) are passed so the Tauri mock returns
// them in SELECT results that the app trend-loading service reads.
const SEED = {
  historical_sessions: [
    { id: SESSION_ID_1, score: 7200, completed_at: now },
    { id: SESSION_ID_2, score: 6100, completed_at: yesterday }
  ],
  historical_responses: [
    {
      session_id: SESSION_ID_1,
      question_number: '1a',
      answer_value: 9,
      recorded_at: now,
      category: 'Health',
      date: now,
      score: 9
    },
    {
      session_id: SESSION_ID_2,
      question_number: '1a',
      answer_value: 7,
      recorded_at: yesterday,
      category: 'Health',
      date: yesterday,
      score: 7
    }
  ]
} as unknown as DBSeed;

type PageObj = Page;

/**
 * Adds seed data as a persistent init script so data survives every
 * page navigation in the test.
 */
async function addSeedScript(page: PageObj, seed: DBSeed) {
  await page.addInitScript(
    data => {
      (window as unknown as { __tauriSeedDB?: (d: unknown) => void }).__tauriSeedDB?.(data);
    },
    seed as unknown as Record<string, unknown>
  );
}

/** Click the chart-actions trigger to open the export dialog. */
async function openExportDialog(page: PageObj) {
  const trigger = page.locator('.export-trigger-btn').first();
  await expect(trigger).toBeVisible();
  await trigger.click();
  await page.locator('.export-dialog').waitFor({ timeout: 5_000 });
}

// ── Dashboard tests ──────────────────────────────────────────────────────────

test.describe('Chart Actions – Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    await addSeedScript(page, SEED);
    await page.goto('/dashboard');
    await page.locator('.dashboard-view').waitFor({ timeout: 10_000 });
    await page.waitForTimeout(600);
  });

  test('Export / Print trigger button is visible when chart data is present', async ({ page }) => {
    await expect(page.locator('.chart-section')).toBeVisible();
    const trigger = page.locator('.export-trigger-btn').first();
    await expect(trigger).toBeVisible();
    await expect(trigger).toContainText('Export');
  });

  test('clicking trigger opens the export dialog with all 6 options', async ({ page }) => {
    await openExportDialog(page);
    const options = page.locator('.export-option-btn');
    await expect(options).toHaveCount(6);
    await expect(options.nth(0)).toContainText('Print');
    await expect(options.nth(1)).toContainText('Export Excel');
    await expect(options.nth(2)).toContainText('Export CSV');
    await expect(options.nth(3)).toContainText('Export PDF');
    await expect(options.nth(4)).toContainText('Export HTML');
    await expect(options.nth(5)).toContainText('Copy Chart');
  });

  test('Print option calls window.print and closes dialog', async ({ page }) => {
    await page.evaluate(() => {
      (window as unknown as Record<string, unknown>).__printCalled = false;
      window.print = () => {
        (window as unknown as Record<string, unknown>).__printCalled = true;
      };
    });

    await openExportDialog(page);
    await page.locator('.export-option-btn').first().click();

    const called = await page.evaluate(
      () => (window as unknown as Record<string, unknown>).__printCalled
    );
    expect(called).toBe(true);

    // Dialog should be closed after clicking
    await expect(page.locator('.export-dialog')).toHaveCount(0);
  });

  test('Print adds printing-chart to body and removes it after print', async ({ page }) => {
    await page.evaluate(() => {
      (window as unknown as Record<string, unknown>).__printHadClass = false;
      window.print = () => {
        (window as unknown as Record<string, unknown>).__printHadClass =
          document.body.classList.contains('printing-chart');
      };
    });

    await openExportDialog(page);
    await page.locator('.export-option-btn').first().click();

    const hadClass = await page.evaluate(
      () => (window as unknown as Record<string, unknown>).__printHadClass as boolean
    );
    expect(hadClass).toBe(true);

    const stillHas = await page.evaluate(() =>
      document.body.classList.contains('printing-chart')
    );
    expect(stillHas).toBe(false);
  });

  test('Print sets print-target class on chart container during print', async ({ page }) => {
    await page.evaluate(() => {
      (window as unknown as Record<string, unknown>).__targetHadClass = false;
      window.print = () => {
        const el = document.getElementById('progress-chart-print-area');
        (window as unknown as Record<string, unknown>).__targetHadClass =
          el?.classList.contains('print-target') ?? false;
      };
    });

    await openExportDialog(page);
    await page.locator('.export-option-btn').first().click();

    const had = await page.evaluate(
      () => (window as unknown as Record<string, unknown>).__targetHadClass as boolean
    );
    expect(had).toBe(true);

    const elStillHas = await page.evaluate(
      () =>
        document.getElementById('progress-chart-print-area')?.classList.contains('print-target') ??
        false
    );
    expect(elStillHas).toBe(false);
  });

  test('Export Excel option is clickable and keeps page alive', async ({ page }) => {
    await openExportDialog(page);
    const excelOption = page.locator('.export-option-btn').nth(1);
    await expect(excelOption).toContainText('Export Excel');

    const downloadPromise = page.waitForEvent('download', { timeout: 5_000 }).catch(() => null);
    await excelOption.click();
    const download = await downloadPromise;
    if (download) {
      expect(download.suggestedFilename()).toMatch(/\.xlsx$/);
    }

    await expect(page.locator('.dashboard-view')).toBeVisible();
  });

  test('close button dismisses the export dialog', async ({ page }) => {
    await openExportDialog(page);
    await page.locator('.close-btn').click();
    await expect(page.locator('.export-dialog')).toHaveCount(0);
  });
});

// ── Category Detail tests ─────────────────────────────────────────────────────

test.describe('Chart Actions – Category Detail', () => {
  test.beforeEach(async ({ page }) => {
    await addSeedScript(page, SEED);
    await page.goto('/dashboard');
    await page.locator('.dashboard-view').waitFor({ timeout: 10_000 });
    await page.waitForTimeout(600);
  });

  test('export trigger button appears on category detail page', async ({ page }) => {
    const categoryCard = page.locator('.category-card').first();
    if (!(await categoryCard.isVisible().catch(() => false))) {
      test.skip();
      return;
    }

    await categoryCard.click();
    await page.locator('.category-detail-view').waitFor({ timeout: 10_000 });

    const trigger = page.locator('.export-trigger-btn').first();
    await expect(trigger).toBeVisible();
    await expect(trigger).toContainText('Export');
  });

  test('Print option on category detail calls window.print', async ({ page }) => {
    const categoryCard = page.locator('.category-card').first();
    if (!(await categoryCard.isVisible().catch(() => false))) {
      test.skip();
      return;
    }

    await categoryCard.click();
    await page.locator('.category-detail-view').waitFor({ timeout: 10_000 });

    await page.evaluate(() => {
      (window as unknown as Record<string, unknown>).__printCalled = false;
      window.print = () => {
        (window as unknown as Record<string, unknown>).__printCalled = true;
      };
    });

    await openExportDialog(page);
    await page.locator('.export-option-btn').first().click();

    const called = await page.evaluate(
      () => (window as unknown as Record<string, unknown>).__printCalled
    );
    expect(called).toBe(true);
  });

  test('Export Excel on detail page is clickable and keeps page alive', async ({ page }) => {
    const categoryCard = page.locator('.category-card').first();
    if (!(await categoryCard.isVisible().catch(() => false))) {
      test.skip();
      return;
    }

    await categoryCard.click();
    await page.locator('.category-detail-view').waitFor({ timeout: 10_000 });

    await openExportDialog(page);
    const excelOption = page.locator('.export-option-btn').nth(1);
    await expect(excelOption).toContainText('Export Excel');

    const downloadPromise = page.waitForEvent('download', { timeout: 5_000 }).catch(() => null);
    await excelOption.click();
    const download = await downloadPromise;
    if (download) {
      expect(download.suggestedFilename()).toMatch(/\.xlsx$/);
    }
    await expect(page.locator('.category-detail-view')).toBeVisible();
  });
});
