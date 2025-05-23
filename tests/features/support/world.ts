import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import { Browser, Page, chromium, BrowserContext } from 'playwright';
import { HomePage } from '../../pages/HomePage';
import { NewsPage } from '../../pages/NoticiaPage';

export class CustomWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;
  newPage?: Page;
  newsUrl?: string;

  homePage!: HomePage;
  newsPage!: NewsPage;

  constructor(options: IWorldOptions) {
    super(options);
  }

  async openBrowser() {
    this.browser = await chromium.launch({ headless: process.env.CI ? true : false })
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();

    this.homePage = new HomePage(this.page);
    this.newsPage = new NewsPage(this.page);
  }

  async closeBrowser() {
    if (this.page) await this.page.close();
    if (this.browser) await this.browser.close();
  }
}

setWorldConstructor(CustomWorld);
