import type { Page, Locator } from '@playwright/test';

/**
 * AppPage – shared navigation helpers available on every page.
 */
export class AppPage {
  readonly page: Page;

  /** Navigation bar */
  readonly nav: Locator;
  readonly navLogo: Locator;
  readonly navQuestionnaire: Locator;
  readonly navHistory: Locator;
  readonly navSettings: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nav = page.locator('.main-nav');
    this.navLogo = page.locator('a.nav-logo');
    this.navQuestionnaire = page.locator('.nav-links a[href="/"]');
    this.navHistory = page.locator('.nav-links a[href="/dashboard"]');
    this.navSettings = page.locator('.settings-link');
  }

  async goto(path = '/') {
    await this.page.goto(path);
  }

  async goHome() {
    await this.navQuestionnaire.click();
    await this.page.waitForURL('/', { timeout: 5_000 });
  }

  async goDashboard() {
    await this.navHistory.click();
    await this.page.waitForURL('/dashboard', { timeout: 5_000 });
  }

  async goSettings() {
    await this.navSettings.click();
    await this.page.waitForURL('/settings', { timeout: 5_000 });
  }

  async goLogoHome() {
    await this.navLogo.click();
    await this.page.waitForURL('/', { timeout: 5_000 });
  }
}
