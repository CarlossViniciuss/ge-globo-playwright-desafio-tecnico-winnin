import { Page, expect } from '@playwright/test';

export class NewsPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async validateRedirection(urlExpected: string) {
    const currenturl = this.page.url();
    expect(currenturl).toContain(urlExpected);
  }
}
