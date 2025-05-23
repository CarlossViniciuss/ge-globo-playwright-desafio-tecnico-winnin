import { Given, When, Then } from '@cucumber/cucumber';
import { setDefaultTimeout } from '@cucumber/cucumber';
import { logger } from '../../utils/logger';

setDefaultTimeout(30 * 1000);

Given(/^que o usuário acessa a página inicial$/, async function () {
  logger.step('Acessando página inicial do GE');
  await this.homePage.access();
  logger.success('Página inicial carregada com sucesso');
});

Then(/^ele deve visualizar pelo menos (\d+) notícias$/, async function (quantityExpected: number) {
  logger.step(`Verificando se existem pelo menos ${quantityExpected} notícias`);
  await this.homePage.tellMinimalNews(quantityExpected);
  logger.success(`✅ Encontradas pelo menos ${quantityExpected} notícias`);
});

Then(/^cada notícia deve conter um título, imagem e resumo$/, async function () {
  logger.step('Validando estrutura das notícias');
  await this.homePage.validateStructureNews();
  logger.success('✅ Estrutura das notícias validada com sucesso');
});

When(/^ele clicar na primeira notícia$/, async function () {
  logger.step('Clicando na primeira notícia disponível');
  this.newsUrl = await this.homePage.clickFirstNews();
  logger.success(`✅ Notícia selecionada: ${this.newsUrl}`);
});

Then(/^deve ser redirecionado para a página da matéria completa$/, async function () {
  logger.step('Validando redirecionamento para a página da notícia');
  await this.newsPage.validateRedirection(this.newsUrl);
  logger.success('✅ Redirecionamento realizado com sucesso');
});
