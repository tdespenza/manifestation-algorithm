import type { Page, Locator } from '@playwright/test';

/**
 * QuestionnairePage – selectors and actions for the questionnaire UI.
 */
export class QuestionnairePage {
  readonly page: Page;

  /* Header area */
  readonly header: Locator;
  readonly progressText: Locator;
  readonly progressFill: Locator;
  readonly currentScore: Locator;
  readonly saveIndicator: Locator;

  /* Mode toggle */
  readonly scrollModeBtn: Locator;
  readonly stepModeBtn: Locator;

  /* Scroll mode */
  readonly questionsList: Locator;

  /* Step mode */
  readonly stepMode: Locator;
  readonly stepCounter: Locator;
  readonly prevBtn: Locator;
  readonly nextBtn: Locator;
  readonly dotNav: Locator;

  /* Submit */
  readonly submitBtn: Locator;

  /* Resume dialog */
  readonly resumeDialog: Locator;
  readonly resumeBtn: Locator;
  readonly freshBtn: Locator;

  constructor(page: Page) {
    this.page = page;

    this.header = page.locator('.questionnaire .header');
    this.progressText = page.locator('.progress-text');
    this.progressFill = page.locator('.progress-fill');
    this.currentScore = page.locator('.current-score');
    this.saveIndicator = page.locator('.save-indicator');

    this.scrollModeBtn = page.locator('.mode-toggle button:has-text("Scroll All")');
    this.stepModeBtn = page.locator('.mode-toggle button:has-text("Step by Step")');

    this.questionsList = page.locator('.questions-list');

    this.stepMode = page.locator('.step-mode');
    this.stepCounter = page.locator('.step-counter');
    this.prevBtn = page.locator('.prev-btn');
    this.nextBtn = page.locator('.next-btn');
    this.dotNav = page.locator('.dot-nav');

    this.submitBtn = page.locator('.submit-button');

    this.resumeDialog = page.locator('.resume-dialog, [class*="resume"]');
    this.resumeBtn = page.locator('button:has-text("Resume")');
    this.freshBtn = page.locator('button:has-text("Start Fresh")');
  }

  /** Navigate to and wait for questionnaire */
  async goto() {
    await this.page.goto('/');
    await this.page.locator('.questionnaire').waitFor({ timeout: 10_000 });
  }

  /** Switch to scroll (all) mode */
  async switchToScrollMode() {
    await this.scrollModeBtn.click();
    await this.questionsList.waitFor();
  }

  /** Switch to step-by-step mode */
  async switchToStepMode() {
    await this.stepModeBtn.click();
    await this.stepMode.waitFor();
  }

  /**
   * Answer the currently visible question item in scroll or step mode.
   * Finds all QuestionItem sliders/inputs and sets a value.
   */
  async setRating(questionId: string, value: number) {
    // Find the question item wrapper
    const item = this.page.locator(`[data-question-id="${questionId}"], .question-item`).first();
    const slider = item.locator('input[type="range"]');
    if (await slider.count() > 0) {
      await slider.fill(String(value));
      await slider.dispatchEvent('input');
      await slider.dispatchEvent('change');
    }
  }

  /** Click next button in step mode */
  async goNext() {
    await this.nextBtn.click();
  }

  /** Click prev button in step mode */
  async goPrev() {
    await this.prevBtn.click();
  }

  /**
   * Rate all visible sliders with a given value (convenience for filling the whole form).
   */
  async rateAllQuestions(value = 5) {
    const sliders = await this.page.locator('input[type="range"]').all();
    for (const slider of sliders) {
      await slider.fill(String(value));
      await slider.dispatchEvent('input');
    }
    // Allow the reactive store to process all answers before proceeding
    await this.page.waitForTimeout(100);
  }

  /** Submit the assessment (assumes all questions are already rated) */
  async submit() {
    await this.submitBtn.click();
  }

  /**
   * Rate every slider with `value` then click the submit button.
   * Use this in tests that need to exercise the full submit-and-navigate flow,
   * because the submit guard requires isComplete === true.
   */
  async rateAllAndSubmit(value = 5) {
    await this.rateAllQuestions(value);
    await this.waitForSaved();
    await this.submitBtn.click();
  }

  /** Wait until save indicator shows "Saved" */
  async waitForSaved() {
    await this.page.locator('.save-indicator.saved').waitFor({ timeout: 10_000 });
  }

  /** Get the current score text */
  async getScore(): Promise<string> {
    return (await this.currentScore.textContent()) ?? '';
  }

  /** Get the current progress percentage text */
  async getProgressText(): Promise<string> {
    return (await this.progressText.textContent()) ?? '';
  }
}
