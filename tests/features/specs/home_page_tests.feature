# language: en
@home @news
Feature: Página inicial do GE

  Como usuário do site ge.globo.com
  Quero visualizar as últimas notícias esportivas
  Para me manter informado sobre os principais acontecimentos do esporte

  Background:
    Given que o usuário acessa a página inicial

  @minimum-news
  Scenario: Página inicial exibe no mínimo 10 notícias
    Then ele deve visualizar pelo menos 10 notícias

  @news-structure
  Scenario: Cada notícia exibe título, imagem e resumo
    Then cada notícia deve conter um título, imagem e resumo

  @redirection
  Scenario: O usuário clica em uma notícia e é redirecionado
    When ele clicar na primeira notícia
    Then deve ser redirecionado para a página da matéria completa
