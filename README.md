# Frontend Authentication

- Não foi o foco da aplicação desenvolver válidações de formulário, estilização organizada.

Aplicação foi contruída com o objetivo de construir as seguintes etapas:

- Os fluxo de cadastro e login do usuário.
- Gerenciar o acesso do usuário às páginas internas do sistema.
- Adicionar interceptadores nas requisição para adicionar access token para as requisições.
- Renovar o access token, realizando uma requisição ao backend, caso esteja inválido.
- Salvar no localstorage o access token e o refresh token para conservar os dados caso recarregue a aplicação.
- Utilizando novas features da nova versão 18 do Angular.

|                                                                              |                                                         |
| ---------------------------------------------------------------------------- | ------------------------------------------------------- |
| ![Página de registro do usuário](/src/assets/image.png)                      | ![Página de acesso do usuário](/src/assets/image-1.png) |
| ![Página interna quando o usuário acessa o sistema](/src/assets/image-2.png) |                                                         |

Este projeto é necessário rodar com o backend projetado para essa aplicação front-end. [Back-end NodeJS](https://github.com/BernardoSemiOficial/backend-nodejs-access-token-authentication)

Este projeto foi gerado com [Angular CLI](https://github.com/angular/angular-cli) versão 18.0.2.

## Servidor de desenvolvimento

Execute `ng serve` para iniciar um servidor de desenvolvimento. Acesse `http://localhost:4200/` no navegador. A aplicação será recarregada automaticamente se você modificar algum dos arquivos de origem.

## Scaffolding de código

Execute `ng generate component nome-do-componente` para gerar um novo componente. Você também pode usar `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Execute `ng build` para construir o projeto. Os artefatos de construção serão armazenados no diretório `dist/`.

## Executando testes unitários

Execute `ng test` para executar os testes unitários via [Karma](https://karma-runner.github.io).

## Executando testes end-to-end

Execute `ng e2e` para executar os testes end-to-end em uma plataforma de sua escolha. Para usar este comando, você precisa primeiro adicionar um pacote que implemente as capacidades de teste end-to-end.

## Ajuda adicional

Para obter mais ajuda sobre o Angular CLI, use `ng help` ou consulte a página [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli).
