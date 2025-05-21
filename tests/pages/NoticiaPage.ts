import { Page, expect } from '@playwright/test';

export class NoticiaPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async validarRedirecionamento(urlEsperada: string) {
    const urlAtual = this.page.url();
    expect(urlAtual).toContain(urlEsperada);
  }
}
