import { Page, Locator } from '@playwright/test';

/**
 * Base class for all Page Objects.
 * Provides common navigation and wait utilities.
 */
export abstract class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(path: string): Promise<void> {
    await this.page.goto(path, { waitUntil: 'domcontentloaded' });
  }

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
  }

  protected locator(selector: string): Locator {
    return this.page.locator(selector);
  }
}
