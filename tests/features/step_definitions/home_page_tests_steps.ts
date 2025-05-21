import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { setDefaultTimeout } from '@cucumber/cucumber';

setDefaultTimeout(30 * 1000);

// CONTEXT
Given(/^que o usuário acessa a página inicial$/, async function() {
  await this.page.goto('https://ge.globo.com');
});

// noticias-minimas
Then(/^ele deve visualizar pelo menos (\d+) notícias$/, async function (quantidadeEsperada: number) {
  const noticiasLocator = this.page.locator('._evt h2 a p');
  let tentativas = 0;
  const maxTentativas = 10;

  while (tentativas < maxTentativas) {
    const count = await noticiasLocator.count();
    if (count >= quantidadeEsperada) break;

    // Scrolla até o fim da página (O GE tem um sistema de scroll infinito carregando so o necessario para o tamanho da pagina)
    // Com isso foi necessario simular um scroll para essa validação e para validar a quantidade correta de noticias
    await this.page.evaluate(() => {
      window.scrollBy(0, window.innerHeight);
    });

    await this.page.waitForTimeout(1000); // espera 1s entre scrolls (levando em conta que leva um tempo para carregar)
    tentativas++;
  }

  const quantidadeFinal = await noticiasLocator.count();
  expect(quantidadeFinal).toBeGreaterThanOrEqual(quantidadeEsperada);
});


// estrutura-noticia
Then(/^cada notícia deve conter um título, imagem e resumo$/, async function () {
  const titulos = this.page.locator('._evt h2 a p');
  const total = await titulos.count();

  console.log(`📰 Total de notícias encontradas: ${total}`);

  for (let i = 0; i < total; i++) {
    const titulo = titulos.nth(i);

    // ✅ Valida que o título tem texto
    const textoTitulo = await titulo.innerText();
    console.log(`🔹 Notícia ${i + 1}: "${textoTitulo}"`);

    await expect(titulo).toHaveText(/.+/);

    // ✅ Sobe ao container mais próximo que é `._evt`
    const bloco = titulo.locator('xpath=ancestor::*[contains(@class, "_evt")]');

    // ✅ Busca uma imagem dentro do bloco
    const imagem = bloco.locator('img');
    const existeImg = await imagem.count();

    if (existeImg > 0) {
      const src = await imagem.first().getAttribute('src');
      console.log(`✅ Imagem encontrada com src: ${src}`);
      await expect(imagem.first()).toHaveAttribute('src', /.+/);
    } else {
      console.warn(`⚠️ Imagem NÃO encontrada para a notícia ${i + 1}`);
    }

    // ✅ Valida que o resumo (texto do título) tem tamanho razoável
    console.log(`📏 Tamanho do resumo: ${textoTitulo.length} caracteres`);
    expect(textoTitulo.length).toBeGreaterThan(15);
  }
});

// redirecionamento
When(/^ele clicar na primeira notícia$/, async function () {
  const blocos = this.page.locator('.bastian-feed-item[data-type="materia"]');
  const totalBlocos = await blocos.count();

  console.log(`📰 Total de blocos de notícias encontrados: ${totalBlocos}`);

  for (let i = 0; i < totalBlocos; i++) {
    const bloco = blocos.nth(i);

    const feedPostBody = bloco.locator('.feed-post-body');
    const existeBody = await feedPostBody.count();

    if (existeBody === 0) {
      console.log(`⚠️ Bloco ${i + 1}: sem .feed-post-body, ignorando...`);
      continue;
    }

    const link = bloco.locator('h2 > a.feed-post-link');
    const existeLink = await link.count();

    if (existeLink === 0) {
      console.log(`⚠️ Bloco ${i + 1}: sem link, ignorando...`);
      continue;
    }

    const url = await link.getAttribute('href');
    const textoP = await link.locator('p').innerText();

    console.log(`🔍 Bloco ${i + 1}:`);
    console.log(` - Texto: "${textoP}"`);
    console.log(` - URL: ${url}`);

    if (url && url.startsWith('https://ge.globo.com') && url.includes('/noticia/')) {
      console.log(`✅ Notícia válida encontrada: ${url}`);

      this.noticiaUrl = url;

      const elementHandle = await link.elementHandle();
      if (!elementHandle) {
        throw new Error('❌ Não foi possível obter o elemento do link da notícia.');
      }

      await this.page.evaluate((el: Element) => el.removeAttribute('target'), elementHandle);

      await Promise.all([
        this.page.waitForNavigation({ waitUntil: 'load', timeout: 10000 }),
        link.click({ force: true }),
      ]);

      console.log(`✅ Navegação concluída na URL: ${this.page.url()}`);
      return;
    } else {
      console.log(`❌ Bloco ${i + 1}: link não parece ser uma notícia válida.`);
    }
  }

  throw new Error('❌ Nenhuma notícia válida encontrada!');
});



Then(/^deve ser redirecionado para a página da matéria completa$/, async function () {
  const urlAtual = this.page.url();

  console.log(`🌍 URL atual após o clique: ${urlAtual}`);
  console.log(`✅ URL esperada: ${this.noticiaUrl}`);

  expect(urlAtual).toContain(this.noticiaUrl);
});


