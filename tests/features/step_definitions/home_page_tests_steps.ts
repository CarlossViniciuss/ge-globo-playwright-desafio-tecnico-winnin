import { Given, When, Then } from '@cucumber/cucumber';
import { setDefaultTimeout } from '@cucumber/cucumber';
import { logger } from '../../utils/logger';

setDefaultTimeout(30 * 1000);

Given(/^que o usuário acessa a página inicial$/, async function () {
  logger.step('Acessando página inicial do GE');
  await this.homePage.acessar();
  logger.success('Página inicial carregada com sucesso');
});

Then(/^ele deve visualizar pelo menos (\d+) notícias$/, async function (quantidadeEsperada: number) {
  logger.step(`Verificando se existem pelo menos ${quantidadeEsperada} notícias`);
  await this.homePage.contarNoticiasMinimas(quantidadeEsperada);
  logger.success(`✅ Encontradas pelo menos ${quantidadeEsperada} notícias`);
});

Then(/^cada notícia deve conter um título, imagem e resumo$/, async function () {
  logger.step('Validando estrutura das notícias');
  await this.homePage.validarEstruturaNoticias();
  logger.success('✅ Estrutura das notícias validada com sucesso');
});

When(/^ele clicar na primeira notícia$/, async function () {
  logger.step('Clicando na primeira notícia disponível');
  this.noticiaUrl = await this.homePage.clicarPrimeiraNoticia();
  logger.success(`✅ Notícia selecionada: ${this.noticiaUrl}`);
});

Then(/^deve ser redirecionado para a página da matéria completa$/, async function () {
  logger.step('Validando redirecionamento para a página da notícia');
  await this.noticiaPage.validarRedirecionamento(this.noticiaUrl);
  logger.success('✅ Redirecionamento realizado com sucesso');
});
