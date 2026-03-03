/**
 * Home page E2E tests.
 *
 * Verifies the home view's static content and that the Questionnaire component
 * mounts correctly.
 */
import { test, expect } from '../fixtures/base';
import en from '../../src/i18n/locales/en';

test.describe('Home page', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.goto();
  });

  test('renders home-view container', async ({ page }) => {
    await expect(page.locator('.home-view')).toBeVisible();
  });

  test('shows "Manifestation Algorithm" heading', async ({ homePage }) => {
    await expect(homePage.heading).toHaveText(en.app.name);
  });

  test('shows the instruction subtitle', async ({ homePage }) => {
    await expect(homePage.subtitle).toHaveText(en.home.subtitle);
  });

  test('mounts the Questionnaire component', async ({ homePage }) => {
    await expect(homePage.questionnaire).toBeVisible();
  });

  test('questionnaire shows the progress bar section', async ({ page }) => {
    await expect(page.locator('.progress-bar')).toBeVisible();
  });

  test('questionnaire shows the score summary', async ({ page }) => {
    await expect(page.locator('.score-summary')).toBeVisible();
  });

  test('questionnaire shows the mode toggle', async ({ page }) => {
    await expect(page.locator('.mode-toggle')).toBeVisible();
    await expect(page.getByRole('button', { name: en.questionnaire.scrollAll })).toBeVisible();
    await expect(page.getByRole('button', { name: en.questionnaire.stepByStep })).toBeVisible();
  });

  test('questionnaire shows the submit button', async ({ page }) => {
    await expect(page.locator('.submit-button')).toBeVisible();
  });

  test('questionnaire shows the max score info', async ({ page }) => {
    await expect(page.locator('.max-info')).toContainText('10,000');
  });
});
