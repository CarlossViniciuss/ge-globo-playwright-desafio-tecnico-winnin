import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import { Browser, Page, chromium, BrowserContext } from 'playwright';
import { HomePage } from '../../pages/HomePage';
import { NoticiaPage } from '../../pages/NoticiaPage';

export class CustomWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;
  newPage?: Page;
  noticiaUrl?: string;

  homePage!: HomePage;
  noticiaPage!: NoticiaPage;

  constructor(options: IWorldOptions) {
    super(options);
  }

  async openBrowser() {
    this.browser = await chromium.launch({ headless: true })
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();

    this.homePage = new HomePage(this.page);
    this.noticiaPage = new NoticiaPage(this.page);
  }

  async closeBrowser() {
    if (this.page) await this.page.close();
    if (this.browser) await this.browser.close();
  }
}

setWorldConstructor(CustomWorld);
