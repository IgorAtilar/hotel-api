# ![Logo do Projeto](https://user-images.githubusercontent.com/73081443/182045950-f5f23ee8-6470-4e94-b0e9-0a195986b5bb.png) Api do Hotel App

## Sobre

Essa é a API do projeto Hotel App que foi desenvolvido em um trabalho da matéria de banco de dados do curso de Sistemas de Informação da PUC Minas. O objetivo do projeto é facilitar o cotidiano de um hotel facilitando o cadastro de clientes e suas reservas, além de unificar todas as informações em um só lugar. Ele foi dividido em duas partes:

-   Front-end que consome uma API e permite realizar as operações de Create (Criar), Read (Ler), Update (Atualizar) e Delete (Deletar) de forma simplificada.

-   Back-end que é responsável por se comunicar com o banco de dados PostgreSQL.

## Ferramentas utilizadas

-   [Node.js](https://nodejs.org/en/)
-   [Express](https://expressjs.com/pt-br/)

## Funcionalidades

-   Autenticação utilizando JWT, que permite apenas usuários autenticados utilizarem os seus recursos.
-   Senhas dos administradores são salvas encriptadas no banco de dados.
-   Permite realizar as operações de Create (Criar), Read (Ler), Update (Atualizar) e Delete (Deletar) nas tabelas atráves das suas rotas.

## Rotas

-   `/` - Única rota pública com as operações de cadastro e login.
-   `/clients` - Rota privada com as operações de CRUD dos dados dos clientes.
-   `/telephones` - Rota privada com as operações de CRUD dos dados dos números dos clientes.
-   `/room-status` - Rota privada com as operações de CRUD dos dados dos status dos quartos.
-   `/room-types` - Rota privada com as operações de CRUD dos dados dos tipos de quartos.
-   `/rooms` - Rota privada com as operações de CRUD dos dados dos quartos.
-   `/bookings` - Rota privada com as operaçoes de CRUD dos dados das reservas.
-   `/admins` - Rota privada com as operações de CRUD dos dados dos administradores.

## Estrutura

```
src
│
├─ api
│  └─ v1
│     └─ constants
│     └─ controllers
│     └─ helpers
│     └─ middlewares
│     └─ models
│     └─ routes
│     └─ types
├─ config
├─ scripts
└─ index.ts
```

## Instalação

Antes de seguir os passos de instalação é importante ter instalado e configurado o [Node.js](https://nodejs.org/en/), [Git](https://git-scm.com/), [PostgreSQL](https://www.postgresql.org/) e algum gerenciador de pacote como [npm](https://www.npmjs.com/), [yarn](https://yarnpkg.com/) ou [pnpm](https://pnpm.io/pt/) na sua máquina.

Utilize o comando **git clone** na pasta escolhida:

```
$ git clone https://github.com/IgorAtilar/hotel-app
```

Depois acesse o diretório e instale as dependências executando o comando conforme o gerenciador de pacotes utilizado:

```
$ yarn install
```

```
$ npm install
```

Crie um arquivo .env na raiz do projeto com as informações necessárias utilizando como base o arquivo .env.example.

```
PORT=3030 -> Porta onde a API irá rodar.

PG_HOST=localhost -> Host do PostgreSQL
PG_PORT=5432 -> Porta do PostgreSQL (o default é 5432)
PG_USER=postgres -> O usuário do PostgreSQL
PG_PASSWORD=senha -> A senha desse usuário
PG_DATABASE=hotel -> O nome do banco de dados que você criou no PostgreSQL

JWT_SECRET=segredo -> Uma palavra ou texto para ser utilizada na encriptação do JWT

BCRYPT_SALT=10 -> Um número que representa a força da encriptação. Quanto maior o número mais demorado e "forte" serão as operações com criptografia
```

# Execução e Uso

Para utilizar basta inicializar o projeto:

```
$ yarn dev
```

```
$ npm run dev
```

Após isso no seu terminal aparecerá o endereço para consumir a API.

## :construction_worker:Créditos

<table align="center">
  <tr>
    <td align="center"><a href="https://github.com/IgorAtilar"><img src="https://github.com/IgorAtilar.png" width="140px;" alt="Foto do GitHub do Igor Atilar"/></a><br /><sub><b>Igor Atilar</b></sub><br /><br /><a href="https://www.linkedin.com/in/igor-atilar"><img src="https://img.shields.io/badge/LinkedIn-0A66C2?logo=linkedin&logoColor=fff&style=for-the-badge"
    /></a>
     <td align="center"><a href="https://github.com/HenriqueFon"><img src="https://github.com/HenriqueFon.png" width="140px;" alt="Foto do GitHub do Henrique Fonseca"/></a><br /><sub><b>Henrique Fonseca</b></sub><br /><br /><a href="https://www.linkedin.com/in/henrique-fonseca-ara%C3%BAjo-931766192/"><img src="https://img.shields.io/badge/LinkedIn-0A66C2?logo=linkedin&logoColor=fff&style=for-the-badge"
    /></a>
     <td align="center"><a href="https://github.com/DHT980"><img src="https://github.com/DHT980.png" width="140px;" alt="Foto do GitHub do DiegoToledo"/></a><br /><sub><b>Diego Toledo</b></sub><br /><br /><a href="https://www.linkedin.com/in/diego-toledo-b00b59181/"><img src="https://img.shields.io/badge/LinkedIn-0A66C2?logo=linkedin&logoColor=fff&style=for-the-badge"
    /></a>
  </tr>
