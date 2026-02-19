import type { Page, Locator } from '@playwright/test';

/**
 * HomePage – wraps the Home/Questionnaire view selectors.
 */
export class HomePage {
  readonly page: Page;

  readonly heading: Locator;
  readonly subtitle: Locator;
  readonly questionnaire: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.locator('.home-view h1');
    this.subtitle = page.locator('.home-view .subtitle');
    this.questionnaire = page.locator('.questionnaire');
  }

  async goto() {
    await this.page.goto('/');
    // Wait for questionnaire to render (store.init() resolves)
    await this.questionnaire.waitFor({ timeout: 10_000 });
  }

  async waitForReady() {
    await this.questionnaire.waitFor({ timeout: 10_000 });
  }
}
