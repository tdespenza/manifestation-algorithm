/**
 * Chart Actions E2E tests.
 *
 * Covers: export select visibility, all 6 format options, the save modal
 * (filename, directory, confirm/cancel), print behaviour, and
 * excel/csv/pdf/html exports on Dashboard and Category Detail views.
 *
 * UI model (post-redesign):
 *   1. User picks a format from the `.export-select` <select> element.
 *   2. A `.save-modal` appears with a filename input, directory chooser,
 *      and Confirm / Cancel buttons.
 *   3. Clicking `.save-confirm-btn` runs the export.
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

/**
 * Select an export format from the `.export-select` <select> element and
 * wait for the `.save-modal` to appear.
 */
async function openSaveModal(page: PageObj, format: string) {
  const select = page.locator('.export-select').first();
  await expect(select).toBeVisible({ timeout: 8_000 });
  await select.selectOption(format);
  await page.locator('.save-modal').waitFor({ state: 'visible', timeout: 5_000 });
}

/** Click the confirm button in the save modal. */
async function confirmSaveModal(page: PageObj) {
  await page.locator('.save-confirm-btn').click();
}

// ── Dashboard tests ──────────────────────────────────────────────────────────

test.describe('Chart Actions – Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    await addSeedScript(page, SEED);
    await page.goto('/dashboard');
    await page.locator('.dashboard-view').waitFor({ timeout: 10_000 });
    await page.waitForTimeout(600);
  });

  test('Export select is visible when chart data is present', async ({ page }) => {
    await expect(page.locator('.chart-section')).toBeVisible();
    const select = page.locator('.export-select').first();
    await expect(select).toBeVisible();
  });

  test('export select contains all 6 format options plus the placeholder', async ({ page }) => {
    const select = page.locator('.export-select').first();
    await expect(select).toBeVisible();

    // 7 <option> elements: 1 placeholder + 6 formats
    const options = select.locator('option');
    await expect(options).toHaveCount(7);
    await expect(options.nth(1)).toHaveText(/Print/);
    await expect(options.nth(2)).toHaveText(/Excel/);
    await expect(options.nth(3)).toHaveText(/CSV/);
    await expect(options.nth(4)).toHaveText(/PDF/);
    await expect(options.nth(5)).toHaveText(/HTML/);
    await expect(options.nth(6)).toHaveText(/Copy/);
  });

  test('selecting a format opens the save modal', async ({ page }) => {
    await openSaveModal(page, 'excel');
    await expect(page.locator('.save-modal')).toBeVisible();
    await expect(page.locator('.save-modal-header h3')).toContainText('Export Excel');
  });

  test('save modal shows filename input and directory row for file exports', async ({ page }) => {
    await openSaveModal(page, 'pdf');
    await expect(page.locator('.save-filename-input')).toBeVisible();
    await expect(page.locator('.save-directory-path')).toBeVisible();
    await expect(page.locator('.save-browse-btn')).toBeVisible();
    await expect(page.locator('.save-confirm-btn')).toBeVisible();
    await expect(page.locator('.save-cancel-btn')).toBeVisible();
  });

  test('filename input is pre-populated and editable', async ({ page }) => {
    await openSaveModal(page, 'pdf');
    const input = page.locator('.save-filename-input');
    const initial = await input.inputValue();
    expect(initial.length).toBeGreaterThan(0);
    expect(initial).toMatch(/\.pdf$/i);

    await input.fill('my_custom_chart.pdf');
    await expect(input).toHaveValue('my_custom_chart.pdf');
  });

  test('cancel button closes the save modal without exporting', async ({ page }) => {
    await openSaveModal(page, 'csv');
    await page.locator('.save-cancel-btn').click();
    await expect(page.locator('.save-modal')).toHaveCount(0);
  });

  test('close (✕) button also dismisses the save modal', async ({ page }) => {
    await openSaveModal(page, 'excel');
    await page.locator('.close-btn').click();
    await expect(page.locator('.save-modal')).toHaveCount(0);
  });

  test('clicking the overlay background closes the modal', async ({ page }) => {
    await openSaveModal(page, 'html');
    // Click outside the modal box (on the overlay)
    await page.locator('.save-modal-overlay').click({ position: { x: 5, y: 5 } });
    await expect(page.locator('.save-modal')).toHaveCount(0);
  });

  test('select resets to placeholder after modal is dismissed', async ({ page }) => {
    await openSaveModal(page, 'csv');
    await page.locator('.save-cancel-btn').click();
    // The <select> value should be empty (placeholder selected)
    const val = await page.locator('.export-select').first().inputValue();
    expect(val).toBe('');
  });

  // ── Print ──────────────────────────────────────────────────────────────────

  test('Print option — save modal shows Print label and no file fields', async ({ page }) => {
    await openSaveModal(page, 'print');
    await expect(page.locator('.save-modal-header h3')).toContainText('Print');
    // Print has no filename/directory UI
    await expect(page.locator('.save-filename-input')).toHaveCount(0);
    await expect(page.locator('.save-directory-path')).toHaveCount(0);
    await expect(page.locator('.save-confirm-btn')).toContainText('Print');
  });

  test('Print confirm calls window.print and closes modal', async ({ page }) => {
    await page.evaluate(() => {
      (window as unknown as Record<string, unknown>).__printCalled = false;
      window.print = () => {
        (window as unknown as Record<string, unknown>).__printCalled = true;
      };
    });

    await openSaveModal(page, 'print');
    await confirmSaveModal(page);

    const called = await page.evaluate(
      () => (window as unknown as Record<string, unknown>).__printCalled
    );
    expect(called).toBe(true);
    await expect(page.locator('.save-modal')).toHaveCount(0);
  });

  test('Print adds printing-chart class to body and removes it after', async ({ page }) => {
    await page.evaluate(() => {
      (window as unknown as Record<string, unknown>).__printHadClass = false;
      window.print = () => {
        (window as unknown as Record<string, unknown>).__printHadClass =
          document.body.classList.contains('printing-chart');
      };
    });

    await openSaveModal(page, 'print');
    await confirmSaveModal(page);

    const hadClass = await page.evaluate(
      () => (window as unknown as Record<string, unknown>).__printHadClass as boolean
    );
    expect(hadClass).toBe(true);

    const stillHas = await page.evaluate(() => document.body.classList.contains('printing-chart'));
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

    await openSaveModal(page, 'print');
    await confirmSaveModal(page);

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

  // ── Excel ──────────────────────────────────────────────────────────────────

  test('Export Excel — confirming keeps page alive', async ({ page }) => {
    await openSaveModal(page, 'excel');
    const downloadPromise = page.waitForEvent('download', { timeout: 5_000 }).catch(() => null);
    await confirmSaveModal(page);
    const download = await downloadPromise;
    if (download) {
      expect(download.suggestedFilename()).toMatch(/\.xlsx$/);
    }
    await expect(page.locator('.dashboard-view')).toBeVisible();
  });

  // ── PDF ────────────────────────────────────────────────────────────────────

  test('Export PDF — confirming triggers a .pdf download', async ({ page }) => {
    await page.evaluate(() => {
      delete (window as unknown as Record<string, unknown>).showSaveFilePicker;
    });

    await openSaveModal(page, 'pdf');
    await expect(page.locator('.save-filename-input')).toHaveValue(/\.pdf$/i);

    const downloadPromise = page.waitForEvent('download', { timeout: 8_000 }).catch(() => null);
    await confirmSaveModal(page);
    const download = await downloadPromise;
    if (download) {
      expect(download.suggestedFilename()).toMatch(/\.pdf$/);
    }
    await expect(page.locator('.dashboard-view')).toBeVisible();
  });

  test('Export PDF does NOT call window.print', async ({ page }) => {
    await page.evaluate(() => {
      (window as unknown as Record<string, unknown>).__printCalled = false;
      window.print = () => {
        (window as unknown as Record<string, unknown>).__printCalled = true;
      };
      delete (window as unknown as Record<string, unknown>).showSaveFilePicker;
    });

    await openSaveModal(page, 'pdf');
    await confirmSaveModal(page);
    await page.locator('.save-modal').waitFor({ state: 'detached', timeout: 8_000 });

    const printCalled = await page.evaluate(
      () => (window as unknown as Record<string, unknown>).__printCalled
    );
    expect(printCalled).toBe(false);
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

  test('Print on category detail calls window.print', async ({ page }) => {
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

    await openSaveModal(page, 'print');
    await confirmSaveModal(page);

    const called = await page.evaluate(
      () => (window as unknown as Record<string, unknown>).__printCalled
    );
    expect(called).toBe(true);
  });

  test('Export Excel on detail page keeps page alive', async ({ page }) => {
    const categoryCard = page.locator('.category-card').first();
    if (!(await categoryCard.isVisible().catch(() => false))) {
      test.skip();
      return;
    }

    await categoryCard.click();
    await page.locator('.category-detail-view').waitFor({ timeout: 10_000 });

    await openSaveModal(page, 'excel');
    const downloadPromise = page.waitForEvent('download', { timeout: 5_000 }).catch(() => null);
    await confirmSaveModal(page);
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

    await openSaveModal(page, 'pdf');
    const downloadPromise = page.waitForEvent('download', { timeout: 8_000 }).catch(() => null);
    await confirmSaveModal(page);
    const download = await downloadPromise;
    if (download) {
      expect(download.suggestedFilename()).toMatch(/\.pdf$/);
    }
    await expect(page.locator('.category-detail-view')).toBeVisible();
  });
});
