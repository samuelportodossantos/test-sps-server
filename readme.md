
# test-sps-server

## Requisitos

- Node.js >= 18
- npm ou yarn

## Instalação

1. Clone o repositório:
	```sh
	git clone <url-do-repositorio>
	cd test-sps-server
	```

2. Instale as dependências:
	```sh
	npm install
	```
	ou
	```sh
	yarn install
	```

3. Configure o arquivo `.env` (já existe um exemplo no projeto):
	```
	NODE_ENV=development
	API_PORT=3000
	JWT_SECRET_KEY=6f8e2c1a7b9d4e3f5a6c8b2d1e0f4a3c
	JWT_TTL=1h
	DEFAULT_USER=admin@sps.com
	DEFAULT_PASSWORD=admin123
	```

## Rodando em modo desenvolvimento

```sh
npm run dev
```
ou
```sh
yarn dev
```

O servidor será iniciado na porta definida em `API_PORT` (padrão: 3000).

## Rodando os testes

```sh
npm test
```
ou
```sh
npx jest
```

## Estrutura do projeto

- `src/` - Código fonte
- `src/modules/api/` - API, rotas, controllers, middlewares
- `src/core/services/` - Serviços de negócio
- `src/modules/db/` - Banco de dados em memória
- `src/tests/` - Testes unitários

## Observações

- O projeto utiliza TypeScript.
- Para hot reload, é usado o `nodemon` com `ts-node`.
