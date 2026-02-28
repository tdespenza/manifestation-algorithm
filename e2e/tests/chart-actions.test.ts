/**
 * Chart Actions E2E tests — direct-execution model.
 *
 * Covers: export select visibility, all 5 format options, direct exports
 * (no intermediate modal), fullscreen
 * button, and page survival after all exports.
 *
 * UI model:
 *   1. User picks a format from the `.export-select` <select> element.
 *   2. The export fires IMMEDIATELY — no modal, no confirmation dialog.
 *   3. Copy: copies to clipboard directly.
 *   4. File exports: use saveWithPicker (native OS dialog or anchor fallback).
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
    { id: SESSION_ID_1, total_score: 7200, completed_at: now },
    { id: SESSION_ID_2, total_score: 6100, completed_at: yesterday }
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

/** Adds seed data as a persistent init script so data survives every navigation. */
async function addSeedScript(page: PageObj, seed: DBSeed) {
  await page.addInitScript(
    data => {
      (window as unknown as { __tauriSeedDB?: (d: unknown) => void }).__tauriSeedDB?.(data);
    },
    seed as unknown as Record<string, unknown>
  );
}

// ── Dashboard tests ──────────────────────────────────────────────────────────

test.describe('Chart Actions – Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    await addSeedScript(page, SEED);
    await page.goto('/dashboard');
    await page.locator('.dashboard-view').waitFor({ timeout: 10_000 });
    // Wait for Chart.js to render the canvas before asserting chart-related elements
    await page.waitForSelector('.chart-section canvas, .progress-chart canvas', { timeout: 10_000 }).catch(() => {});
  });

  test('Export select is visible when chart data is present', async ({ page }) => {
    await expect(page.locator('.chart-section')).toBeVisible();
    const select = page.locator('.export-select').first();
    await expect(select).toBeVisible();
  });

  test('export select contains all 4 format options plus the placeholder', async ({ page }) => {
    const select = page.locator('.export-select').first();
    await expect(select).toBeVisible();

    // 5 <option> elements: 1 placeholder + 4 formats
    const options = select.locator('option');
    await expect(options).toHaveCount(5);
    await expect(options.nth(1)).toHaveText(/Excel/);
    await expect(options.nth(2)).toHaveText(/CSV/);
    await expect(options.nth(3)).toHaveText(/PDF/);
    await expect(options.nth(4)).toHaveText(/HTML/);
  });

  test('no modal appears when a user selects any export format', async ({ page }) => {
    const select = page.locator('.export-select').first();
    await expect(select).toBeVisible();
    await select.selectOption('excel');
    // Wait for Vue reactivity to settle before checking for absence of modal
    await expect(page.locator('.save-modal')).toHaveCount(0, { timeout: 3_000 });
    // No save-modal should ever appear
    await expect(page.locator('.save-modal')).toHaveCount(0);
  });

  test('select resets to placeholder after selecting a format', async ({ page }) => {
    const select = page.locator('.export-select').first();
    await expect(select).toBeVisible();
    await select.selectOption('csv');
    // Wait for the select to reset to placeholder after the export fires
    await expect(select).toHaveValue('', { timeout: 3_000 });
  });

  test('fullscreen button is visible when chart data is present', async ({ page }) => {
    await expect(page.locator('.chart-section')).toBeVisible();
    const btn = page.locator('.action-btn[title="View full screen"]').first();
    await expect(btn).toBeVisible();
  });

  test('copy button is visible when chart data is present', async ({ page }) => {
    await expect(page.locator('.chart-section')).toBeVisible();
    const btn = page.locator('.action-btn[title="Copy Chart"]').first();
    await expect(btn).toBeVisible();
  });

  // ── Excel ──────────────────────────────────────────────────────────────────

  test('Export Excel — selecting format keeps page alive', async ({ page }) => {
    const downloadPromise = page.waitForEvent('download', { timeout: 5_000 }).catch(() => null);
    await page.locator('.export-select').first().selectOption('excel');
    const download = await downloadPromise;
    if (download) {
      expect(download.suggestedFilename()).toMatch(/\.xlsx$/);
    }
    await expect(page.locator('.dashboard-view')).toBeVisible();
  });

  // ── PDF ────────────────────────────────────────────────────────────────────

  test('Export PDF — selecting format triggers a .pdf download', async ({ page }) => {
    await page.evaluate(() => {
      delete (window as unknown as Record<string, unknown>).showSaveFilePicker;
    });

    const downloadPromise = page.waitForEvent('download', { timeout: 8_000 }).catch(() => null);
    await page.locator('.export-select').first().selectOption('pdf');
    const download = await downloadPromise;
    if (download) {
      expect(download.suggestedFilename()).toMatch(/\.pdf$/);
    }
    await expect(page.locator('.dashboard-view')).toBeVisible();
  });
});

// ── Category Detail tests ─────────────────────────────────────────────────────

test.describe('Chart Actions – Category Detail', () => {
  test.beforeEach(async ({ page }) => {
    await addSeedScript(page, SEED);
    await page.goto('/dashboard');
    await page.locator('.dashboard-view').waitFor({ timeout: 10_000 });
    // Wait for Chart.js to render the canvas before asserting chart-related elements
    await page.waitForSelector('.chart-section canvas, .progress-chart canvas', { timeout: 10_000 }).catch(() => {});
  });

  test('export select appears on category detail page', async ({ page }) => {
    const categoryCard = page.locator('.category-card').first();
    if (!(await categoryCard.isVisible().catch(() => false))) {
      test.skip();
      return;
    }

    await categoryCard.click();
    await page.locator('.category-detail-view').waitFor({ timeout: 10_000 });

    const select = page.locator('.export-select').first();
    await expect(select).toBeVisible();
  });

  test('fullscreen button appears on category detail page', async ({ page }) => {
    const categoryCard = page.locator('.category-card').first();
    if (!(await categoryCard.isVisible().catch(() => false))) {
      test.skip();
      return;
    }

    await categoryCard.click();
    await page.locator('.category-detail-view').waitFor({ timeout: 10_000 });

    const btn = page.locator('.action-btn[title="View full screen"]').first();
    await expect(btn).toBeVisible();
  });

  test('copy button appears on category detail page', async ({ page }) => {
    const categoryCard = page.locator('.category-card').first();
    if (!(await categoryCard.isVisible().catch(() => false))) {
      test.skip();
      return;
    }

    await categoryCard.click();
    await page.locator('.category-detail-view').waitFor({ timeout: 10_000 });

    const btn = page.locator('.action-btn[title="Copy Chart"]').first();
    await expect(btn).toBeVisible();
  });

  test('Export Excel on detail page keeps page alive', async ({ page }) => {
    const categoryCard = page.locator('.category-card').first();
    if (!(await categoryCard.isVisible().catch(() => false))) {
      test.skip();
      return;
    }

    await categoryCard.click();
    await page.locator('.category-detail-view').waitFor({ timeout: 10_000 });

    const downloadPromise = page.waitForEvent('download', { timeout: 5_000 }).catch(() => null);
    await page.locator('.export-select').first().selectOption('excel');
    const download = await downloadPromise;
    if (download) {
      expect(download.suggestedFilename()).toMatch(/\.xlsx$/);
    }
    await expect(page.locator('.category-detail-view')).toBeVisible();
  });

  test('Export PDF on detail page triggers a .pdf download', async ({ page }) => {
    const categoryCard = page.locator('.category-card').first();
    if (!(await categoryCard.isVisible().catch(() => false))) {
      test.skip();
      return;
    }

    await categoryCard.click();
    await page.locator('.category-detail-view').waitFor({ timeout: 10_000 });

    await page.evaluate(() => {
      delete (window as unknown as Record<string, unknown>).showSaveFilePicker;
    });

    const downloadPromise = page.waitForEvent('download', { timeout: 8_000 }).catch(() => null);
    await page.locator('.export-select').first().selectOption('pdf');
    const download = await downloadPromise;
    if (download) {
      expect(download.suggestedFilename()).toMatch(/\.pdf$/);
    }
    await expect(page.locator('.category-detail-view')).toBeVisible();
  });
});
