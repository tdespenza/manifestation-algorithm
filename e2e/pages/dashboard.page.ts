import type { Page, Locator } from '@playwright/test';

/**
 * DashboardPage – selectors and actions for the History/Dashboard view.
 */
export class DashboardPage {
  readonly page: Page;

  readonly heading: Locator;
  readonly emptyState: Locator;
  readonly loadingSpinner: Locator;

  /* Controls */
  readonly rangeSelector: Locator;
  readonly exportBtn: Locator;

  /* Content */
  readonly statsPanel: Locator;
  readonly categoryCards: Locator;
  readonly networkRanking: Locator;
  readonly progressChart: Locator;

  /* Selection / delete */
  readonly selectModeBtn: Locator;
  readonly cancelSelectBtn: Locator;
  readonly deleteSelectedBtn: Locator;
  readonly sessionCards: Locator;
  readonly sessionCheckBadges: Locator;
  readonly inlineDeleteBtns: Locator;

  /* Confirm dialog */
  readonly confirmDialog: Locator;
  readonly confirmDialogTitle: Locator;
  readonly confirmDialogMessage: Locator;
  readonly confirmDialogConfirmBtn: Locator;
  readonly confirmDialogCancelBtn: Locator;

  constructor(page: Page) {
    this.page = page;

    this.heading = page.locator('.dashboard-view h1');
    this.emptyState = page.locator('.empty-state');
    this.loadingSpinner = page.locator('.loading-spinner, [class*="loading"]').first();

    this.rangeSelector = page.locator('#range-select');
    this.exportBtn = page.locator('button:has-text("Export")');

    this.statsPanel = page.locator('.stats-panel');
    this.categoryCards = page.locator('.category-card');
    this.networkRanking = page.locator('.network-ranking');
    this.progressChart = page.locator('canvas').first();

    this.selectModeBtn = page.locator('button.select-mode-btn');
    this.cancelSelectBtn = page.locator('button.cancel-select-btn');
    this.deleteSelectedBtn = page.locator('button.delete-selected-btn-sm');
    this.sessionCards = page.locator('.session-card');
    this.sessionCheckBadges = page.locator('.session-check');
    this.inlineDeleteBtns = page.locator('.delete-btn-inline');

    this.confirmDialog = page.locator('.confirm-dialog');
    this.confirmDialogTitle = page.locator('.confirm-title');
    this.confirmDialogMessage = page.locator('.confirm-message');
    this.confirmDialogConfirmBtn = page.locator('.btn-confirm');
    this.confirmDialogCancelBtn = page.locator('.btn-cancel');
  }

  async goto() {
    await this.page.goto('/dashboard');
    await this.page.locator('.dashboard-view').waitFor({ timeout: 10_000 });
  }

  async waitForContent() {
    await this.page.locator('.dashboard-view').waitFor();
    // Wait for loading to finish
    await this.page.waitForFunction(() => {
      const spinner = document.querySelector('.loading-spinner');
      return !spinner || (spinner as HTMLElement).style.display === 'none';
    }, { timeout: 10_000 }).catch(() => {});
  }

  async selectRange(value: '7d' | '30d' | '90d' | '1y' | 'all') {
    await this.rangeSelector.selectOption(value);
  }

  async clickCategoryCard(index = 0) {
    const cards = await this.categoryCards.all();
    if (cards.length > index) {
      await cards[index].click();
    }
  }

  async getCategoryCount(): Promise<number> {
    return this.categoryCards.count();
  }

  /** Enter selection mode by clicking the Select button. */
  async enterSelectionMode() {
    await this.selectModeBtn.click();
  }

  /** Cancel selection mode. */
  async exitSelectionMode() {
    await this.cancelSelectBtn.click();
  }

  /** Click a session card by 0-based index to toggle selection. */
  async clickSessionCard(index: number) {
    await this.sessionCards.nth(index).click();
  }

  /** Click the "Delete N" button in selection mode. */
  async deleteSelected() {
    await this.deleteSelectedBtn.click();
  }

  /** Click the inline hover-delete button for a session card by index. */
  async clickInlineDelete(index: number) {
    await this.inlineDeleteBtns.nth(index).click();
  }

  /** Confirm the delete confirmation dialog. */
  async confirmDelete() {
    await this.confirmDialogConfirmBtn.waitFor({ timeout: 3_000 });
    await this.confirmDialogConfirmBtn.click();
  }

  /** Cancel the delete confirmation dialog. */
  async cancelDelete() {
    await this.confirmDialogCancelBtn.waitFor({ timeout: 3_000 });
    await this.confirmDialogCancelBtn.click();
  }
}
