import { Given, When, Then } from '@cucumber/cucumber';
import { setDefaultTimeout } from '@cucumber/cucumber';

setDefaultTimeout(30 * 1000);

Given(/^que o usuário acessa a página inicial$/, async function () {
  await this.homePage.acessar();
});

Then(/^ele deve visualizar pelo menos (\d+) notícias$/, async function (quantidadeEsperada: number) {
  await this.homePage.contarNoticiasMinimas(quantidadeEsperada);
});

Then(/^cada notícia deve conter um título, imagem e resumo$/, async function () {
  await this.homePage.validarEstruturaNoticias();
});

When(/^ele clicar na primeira notícia$/, async function () {
  this.noticiaUrl = await this.homePage.clicarPrimeiraNoticia();
});

Then(/^deve ser redirecionado para a página da matéria completa$/, async function () {
  await this.noticiaPage.validarRedirecionamento(this.noticiaUrl);
});
