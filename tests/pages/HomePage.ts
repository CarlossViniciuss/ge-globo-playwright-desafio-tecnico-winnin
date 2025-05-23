import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly noticiasLocator: Locator;
  readonly blocosNoticias: Locator;

  constructor(page: Page) {
    this.page = page;
    this.noticiasLocator = page.locator('._evt h2 a p');
    this.blocosNoticias = page.locator('.bastian-feed-item[data-type="materia"]');
  }

  async access() {
    await this.page.goto('https://ge.globo.com');
  }

  async tellMinimalNews(qtd: number) {
    let tentativas = 0;
    const maxTentativas = 10;

    while (tentativas < maxTentativas) {
      const count = await this.noticiasLocator.count();
      if (count >= qtd) break;

      await this.page.evaluate(() => {
        window.scrollBy(0, window.innerHeight);
      });
      await this.page.waitForTimeout(1000);
      tentativas++;
    }

    const quantidadeFinal = await this.noticiasLocator.count();
    expect(quantidadeFinal).toBeGreaterThanOrEqual(qtd);
  }

  async validateStructureNews() {
    const total = await this.noticiasLocator.count();

    for (let i = 0; i < total; i++) {
      const titulo = this.noticiasLocator.nth(i);
      const textoTitulo = await titulo.innerText();

      await expect(titulo).toHaveText(/.+/);

      const bloco = titulo.locator('xpath=ancestor::*[contains(@class, "_evt")]');
      const imagem = bloco.locator('img');

      const existeImg = await imagem.count();

      if (existeImg > 0) {
        await expect(imagem.first()).toHaveAttribute('src', /.+/);
      }

      expect(textoTitulo.length).toBeGreaterThan(15);
    }
  }

  async clickFirstNews(): Promise<string> {
    const totalBlocos = await this.blocosNoticias.count();

    for (let i = 0; i < totalBlocos; i++) {
      const bloco = this.blocosNoticias.nth(i);
      const feedPostBody = bloco.locator('.feed-post-body');
      const existeBody = await feedPostBody.count();

      if (existeBody === 0) continue;

      const link = bloco.locator('h2 > a.feed-post-link');
      const existeLink = await link.count();

      if (existeLink === 0) continue;

      const url = await link.getAttribute('href');

      if (url && url.startsWith('https://ge.globo.com') && url.includes('/noticia/')) {
        const elementHandle = await link.elementHandle();
        if (elementHandle) {
          await this.page.evaluate((el: Element) => el.removeAttribute('target'), elementHandle);
        }

        await Promise.all([
          this.page.waitForNavigation({ waitUntil: 'load', timeout: 10000 }),
          link.click({ force: true }),
        ]);

        return url;
      }
    }

    throw new Error('❌ Nenhuma notícia válida encontrada!');
  }
}
