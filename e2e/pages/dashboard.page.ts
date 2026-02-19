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
}
