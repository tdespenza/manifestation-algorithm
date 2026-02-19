import type { Page, Locator } from '@playwright/test';

/**
 * SettingsPage – wraps the Settings view.
 */
export class SettingsPage {
  readonly page: Page;

  readonly heading: Locator;
  readonly settingsComponent: Locator;

  /* Common settings controls (adjust if Settings component uses different selectors) */
  readonly sharingToggle: Locator;
  readonly closeBtn: Locator;

  constructor(page: Page) {
    this.page = page;

    this.heading = page.locator('.settings-view h1');
    this.settingsComponent = page.locator('.settings-view .settings, .settings-view [class*="settings"]').first();

    this.sharingToggle = page.locator('.sharing-toggle, input[type="checkbox"]').first();
    // The Settings.vue component has a close button with text 'X' inside .panel-header
    this.closeBtn = page.locator('.panel-header button, button:has-text("X"), .close-btn').first();
  }

  async goto() {
    await this.page.goto('/settings');
    await this.page.locator('.settings-view').waitFor({ timeout: 10_000 });
  }

  async close() {
    // Click the X close button in the Settings component (emits 'close' which routes to '/')
    const btn = this.page.locator('.panel-header button').first();
    if (await btn.isVisible()) {
      await btn.click();
      await this.page.waitForURL('/', { timeout: 5_000 });
    }
  }
}
