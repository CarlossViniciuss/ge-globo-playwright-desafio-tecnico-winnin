![CI](https://github.com/CarlossViniciuss/ge-globo-playwright-desafio-tecnico-winnin/actions/workflows/test.yml/badge.svg)
# 📊 ge-globo-playwright-desafio-tecnico-winnin

Automação de testes end-to-end para o site [ge.globo.com](https://ge.globo.com), utilizando **Playwright**, **Cucumber** e **TypeScript**, com aplicação de **Page Object Model (POM)** e execução automatizada via **GitHub Actions**, para o desafio técnico da Winnin.

---

## 🚀 Tecnologias utilizadas

- ✅ [Playwright](https://playwright.dev/) — automação de browsers.
- ✅ [Cucumber.js](https://github.com/cucumber/cucumber-js) — testes BDD.
- ✅ TypeScript — tipagem forte.
- ✅ GitHub Actions — CI/CD.

---

## ✅ Estrutura do projeto

```
├── .github/workflows/ → Pipeline de CI (GitHub Actions)
├── tests/
│ ├── features/
│ │ ├── specs/ → Arquivos .feature (cenários BDD)
│ │ ├── step_definitions/ → Implementação dos steps
│ │ └── support/ → Hooks e World customizado
│ ├── pages/ → Page Objects (HomePage, NoticiaPage, etc.)
├── package.json
├── tsconfig.json
├── cucumber.js
└── README.md
```

---

## 📝 Cenários implementados

- ✅ Validação de que a página inicial exibe **pelo menos 10 notícias**.
- ✅ Validação de que **cada notícia** possui:
    - Título
    - Imagem destacada
    - Resumo
- ✅ Redirecionamento ao clicar na **primeira notícia**.
- ✅ Validação da URL após redirecionamento.

---

---

## ⚠️ Observação sobre a Série A (e substituição por Série B)

O desafio técnico solicitava que, ao selecionar um time da **Série A do Campeonato Brasileiro**, o usuário fosse redirecionado para a página do clube com notícias relacionadas.

No entanto, durante a análise do site atual ([ge.globo.com](https://ge.globo.com)), foi identificado que:

- ❌ A página inicial **não exibe escudos ou links de times da Série A**.
- ✅ Em contrapartida, há uma tabela visível da **Série B**, com um link funcional para a classificação completa.

---

### ✅ Cenário implementado como alternativa

Para cobrir esse fluxo de forma funcional e realista, foi implementado o seguinte cenário:

#### 🧪 Feature:

```gherkin
@serieB
Cenário: O usuário clica na tabela da Série B e é redirecionado corretamente
Quando o usuário clica na tabela da Série B
Então ele deve ser redirecionado para a página da tabela da Série B
E deve visualizar o título "Série B" na página
```
🧪 Step Definitions:
```typescript
When(/^o usuário clica na tabela da Série B$/, async function () {
  const links = this.page.locator('a[title="Veja a tabela completa."]');
  const total = await links.count();

  for (let i = 0; i < total; i++) {
    const link = links.nth(i);
    const href = await link.getAttribute('href');
    const texto = await link.innerText();

    if (href && href.includes('/brasileirao-serie-b/')) {
      this.tabelaUrl = href;

      await Promise.all([
        this.page.waitForNavigation({ waitUntil: 'load', timeout: 10000 }),
        link.click({ force: true }),
      ]);
      return;
    }
  }

  throw new Error('❌ Link da tabela da Série B não encontrado!');
});

Then(/^ele deve ser redirecionado para a página da tabela da Série B$/, async function () {
  const urlAtual = this.page.url();
  expect(urlAtual).toContain(this.tabelaUrl);
});

Then(/^deve visualizar o título "Série B" na página$/, async function () {
  const titulo = this.page.locator('a.header-editoria--link.ellip-line').first();
  const tituloTexto = await titulo.textContent();
  expect(tituloTexto?.trim().toLowerCase()).toMatch(/brasileirão série b/i);
});

```

Só não implementei pois ele não estava listado explicitamente entre os critérios obrigatórios do desafio. Mas foi desenvolvido e executado localmente e funcionou.

---

# Logs

Foi implementado um sistema de logs mais informativos e ajudarão tanto no desenvolvimento local quanto na análise de falhas no CI. Você verá:
* 🚀 Início e fim da execução dos testes
* 🔹 Cada step sendo executado
* ✅ Resultados de sucesso
* ❌ Erros (quando ocorrerem)
* 🔍 Informações de debug (quando habilitado)

---

## 🛠️ Como executar os testes localmente

### ✅ Pré-requisitos:
- Node.js >= 18
- NPM

### ✅ Passos:

```bash
# Clone o repositório
git clone https://github.com/CarlossViniciuss/ge-globo-playwright-desafio-tecnico-winnin.git
cd ge-globo-playwright-desafio-tecnico-winnin

# Instale as dependências
npm install

# Instale os browsers do Playwright
npx playwright install --with-deps

# Execute os testes
npx cucumber-js

# Executar os testes em modo debug
DEBUG=true npx cucumber-js
```

## 🤖 Execução automatizada (CI)
Este projeto está configurado para executar automaticamente no GitHub Actions a cada push ou pull request na branch main ou feature/*.

✅ Workflow: .github/workflows/test.yml

✅ Executa npx cucumber-js em ambiente headless.

# 🏗️ Padrões e boas práticas aplicadas
✅ Page Object Model (POM) — para modularizar e facilitar manutenção.

✅ CustomWorld — para injeção de dependências e compartilhamento de estado.

✅ Headless mode — para execução em pipelines.

✅ Integração contínua — via GitHub Actions.

✅ Boas práticas de commits — utilizando semântica clara.

## 👨‍💻 Autor
Carlos Vinicius
