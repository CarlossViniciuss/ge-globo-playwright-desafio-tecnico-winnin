import { Before, After } from '@cucumber/cucumber';
import { CustomWorld } from './world';
import { Route } from '@playwright/test';  // ✅ Importa Route para tipagem

Before(async function (this: CustomWorld) {
  await this.openBrowser();

  await this.page.route('**/*', (route: Route) => {
    const url = route.request().url();

    const blockList = [
      'doubleclick.net',
      'googlesyndication.com',
      'adservice.google.com',
      'betnacional',
      'taboola',
      'adnxs.com',
      'adsafeprotected.com',
      'pubmatic.com',
      'moatads.com',
      'criteo.com',
      'outbrain.com',
    ];

    if (blockList.some(domain => url.includes(domain))) {
      console.log(`🚫 Bloqueando requisição: ${url}`);
      route.abort();
    } else {
      route.continue();
    }
  });
});

After(async function (this: CustomWorld) {
  await this.closeBrowser();
});
