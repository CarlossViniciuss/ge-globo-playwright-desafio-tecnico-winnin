# language: pt
@home @noticias
Funcionalidade: Página inicial do GE

  Como usuário do site ge.globo.com
  Quero visualizar as últimas notícias esportivas
  Para me manter informado sobre os principais acontecimentos do esporte

  Contexto:
    Dado que o usuário acessa a página inicial

  @noticias-minimas
  Cenário: Página inicial exibe no mínimo 10 notícias
    Então ele deve visualizar pelo menos 10 notícias

  @estrutura-noticia
  Cenário: Cada notícia exibe título, imagem e resumo
    Então cada notícia deve conter um título, imagem e resumo

  @redirecionamento
  Cenário: O usuário clica em uma notícia e é redirecionado
    Quando ele clicar na primeira notícia
    Então deve ser redirecionado para a página da matéria completa
