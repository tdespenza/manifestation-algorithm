import { test as base } from '@playwright/test';
export { expect } from '@playwright/test';
import { TAURI_MOCK_SCRIPT } from './tauri-mock';
import { AppPage } from '../pages/app.page';
import { HomePage } from '../pages/home.page';
import { DashboardPage } from '../pages/dashboard.page';
import { SettingsPage } from '../pages/settings.page';
import { QuestionnairePage } from '../pages/questionnaire.page';

/**
 * DB seed data type for pre-populating the in-memory Tauri mock
 */
export interface DBSeed {
  questionnaire_responses?: Array<{ session_id: string; question_number: string; answer_value: number }>;
  settings?: Array<{ key: string; value: string }>;
  historical_sessions?: Array<{ id: string; score: number; completed_at: string; answers_snapshot?: string }>;
  historical_responses?: Array<{ session_id: string; question_number: string; answer_value: number; recorded_at: string }>;
}

/**
 * Extended test fixtures: exposes page object models and DB helpers.
 */
export type E2EFixtures = {
  appPage: AppPage;
  homePage: HomePage;
  dashboardPage: DashboardPage;
  settingsPage: SettingsPage;
  questionnairePage: QuestionnairePage;
  /** Reset the in-memory Tauri DB */
  resetDB: () => Promise<void>;
  /** Seed the in-memory Tauri DB before navigation */
  seedDB: (data: DBSeed) => Promise<void>;
  /** Read the current in-memory DB state */
  getDB: () => Promise<Record<string, unknown[]>>;
};

/**
 * Base fixture that injects the Tauri mock script on every page load.
 */
export const test = base.extend<E2EFixtures>({
  // Auto-install Tauri mock on every new page
  page: async ({ page }, use) => {
    await page.addInitScript(TAURI_MOCK_SCRIPT);
    await use(page);
  },

  appPage: async ({ page }, use) => {
    await use(new AppPage(page));
  },

  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },

  settingsPage: async ({ page }, use) => {
    await use(new SettingsPage(page));
  },

  questionnairePage: async ({ page }, use) => {
    await use(new QuestionnairePage(page));
  },

  resetDB: async ({ page }, use) => {
    await use(async () => {
      await page.evaluate(() => (globalThis as unknown as { __tauriResetDB: () => void }).__tauriResetDB());
    });
  },

  seedDB: async ({ page }, use) => {
    await use(async (data: DBSeed) => {
      await page.evaluate(
        (seedData) => (globalThis as unknown as { __tauriSeedDB: (d: unknown) => void }).__tauriSeedDB(seedData),
        data
      );
    });
  },

  getDB: async ({ page }, use) => {
    await use(async () => {
      return page.evaluate(
        () => (globalThis as unknown as { __tauriGetDB: () => Record<string, unknown[]> }).__tauriGetDB()
      );
    });
  },
});
