import { Before, After, BeforeAll, AfterAll } from '@cucumber/cucumber';
import { CustomWorld } from './world';
import { Route } from '@playwright/test';  // ✅ Importa Route para tipagem
import { logger } from '../../utils/logger';

BeforeAll(async function() {
  logger.info('🚀 Iniciando execução dos testes');
});

Before(async function (this: CustomWorld) {
  logger.step('Abrindo navegador e configurando ambiente');
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
      logger.debug(`Bloqueando requisição de anúncio: ${url}`);
      route.abort();
    } else {
      route.continue();
    }
  });
});

After(async function (this: CustomWorld) {
  logger.step('Fechando navegador');
  await this.closeBrowser();
});

AfterAll(async function() {
  logger.info('✨ Execução dos testes finalizada');
});
