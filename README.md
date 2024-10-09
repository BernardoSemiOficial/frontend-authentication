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

### SSO (Single Sign-On)

Foi implementado o login via SSO do Google e Github. Onde esse tipo de login utiliza as contas existentes nessas plataformas para realizar login nesta aplicação. O provedor (provider) fornece os dados do usuário, caso o login seja bem sucessedido pelo usuário.

#### Github

O provedor do Github precisa que um aplicativo do tipo OAuth seja criado em uma conta [Github OAuth](https://github.com/settings/applications/new). Para criar o aplicativo, precisa de informações de qual url de retorno da sua aplicação, quando o usuário loga no github, e precisar retornar para esta aplicação. Ao finalizar a criação do aplcativo OAuth será gerar as chaves públicas e privadas para consultar as APIs do Github. No retorno é fornecido parâmetro na url (code=DADDAD) que será necessário para ser enviado para o backend e ele realizar a consulta de informações no nome daquele usuário, além disso, essa consulta no backend pode ser gerado um access_token e refresh_token para o usuário que realizou o login. O papel do front-end é criar um url para o usuário ao clicar para logar via Github, no qual, será dito quais os escopos quer acesso, a url de retorno depois do login e o chave pública do aplicativo OAuth criado [Criação da URL](https://docs.github.com/pt/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps#1-request-a-users-github-identity).

O Github tem disponível uma SDK para interagir com as APIs deles. Mas nesse exemplo, foi utilizado os endpoints brutos dos serviços deles.

#### Google

O provedor do Google precisa, por sua vez, de uma aplicativo no [Google Console](https://console.cloud.google.com/welcome/new) que exista ou seja criado do zero, depois da configuração da [Tela de Permissão OAuth](https://console.cloud.google.com/apis/credentials/consent) que terá como configuração informações: o escopos do usuário, email para contato e logo do aplicativo. Essa tela que o usuário verá quando realizar o login.

Além disso, é necessário criar uma credencial para aplicativo **IDs do Cliente OAuth 2.0** e do tipo **Aplicativo Web**. Na tela de criação, é necessário passar as origens JavaScript autorizadas para o seu aplicativos fazerem os redirecionamentos para o usuário realizar o login, além disso, é preciso adicionar as urls de redirecionamentos autorizados que são as url permitidas para serem redirecionadas pelo google. Depois da criação da credencial, vão ser fornecidas as credencias para serem salvas no projeto.

A biblioteca (SDK) utilizada para interagir com as APIs do Google é a [GoogleApis](https://www.npmjs.com/package/googleapis#oauth2-client)

### Back-end

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
