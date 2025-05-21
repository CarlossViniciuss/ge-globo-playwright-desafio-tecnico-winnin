import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import { Browser, Page, chromium, BrowserContext } from 'playwright';

export class CustomWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;
  newPage?: Page;
  noticiaUrl?: string;

  constructor(options: IWorldOptions) {
    super(options);
  }

  async openBrowser() {
    this.browser = await chromium.launch({ headless: false }); // troque pra true se for CI
    this.context = await this.browser.newContext();
    this.page = await this.browser.newPage();
  }

  async closeBrowser() {
    if (this.page) await this.page.close();
    if (this.browser) await this.browser.close();
  }
}

setWorldConstructor(CustomWorld);
