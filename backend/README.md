# Backend - Translator Server

API para gerenciamento de catalogos de traducao por sistema, ambiente, idioma e namespace.

## O que este backend faz
- Expoe API HTTP (NestJS + Fastify) para CRUD de sistemas, ambientes, idiomas, namespaces e traducoes.
- Entrega traducoes com ou sem fallback para idioma base.
- Publica namespaces entre ambientes (ex.: `dev` -> `prod`).
- Faz autenticacao por provider (`mock` ou `redmine`) e controle de sessao via cookie.
- Publica arquivos JSON de traducao em CDN (provider atual: Bunny Storage).
- Gera documentacao de API via Scalar/Swagger.

## Stack e tecnologias
- Node.js + TypeScript
- NestJS 11
- Fastify
- Knex
- SQLite3
- class-validator / class-transformer
- Swagger + Scalar API Reference
- Throttling (`@nestjs/throttler`)
- Bunny Storage SDK

## Como executar localmente
1. Entre na pasta:
```bash
cd backend
```
2. Instale dependencias:
```bash
npm install
```
3. Crie o `.env` a partir de `backend/.env copy`.
4. Execute migracoes:
```bash
npm run migrate:all
```
5. Rode em desenvolvimento:
```bash
npm run dev
```

Servidor padrao: `http://localhost:3000`

## Variaveis de ambiente
Principais variaveis usadas no projeto:

- `NODE_ENV` (`development` | `production` | `test`)
- `PORT` (opcional, default `3000`)
- `AUTH_PROVIDER` (`mock` | `redmine`)
- `SESSION_TTL` (segundos, default `604800`)
- `COOKIE_SECRET` (obrigatorio em producao)
- `REDMINE_URL` (quando `AUTH_PROVIDER=redmine`)
- `ALLOWED_ORIGINS` (lista separada por virgula em producao)
- `TRANSLATIONS_PROVIDER` (atual: `database`)
- `TRANSLATIONS_CACHE_TTL` (segundos)
- `CND_PROVIDER` (atual: `bunny`)
- `BUNNY_KEY`
- `BUNNY_STORAGE_NAME`
- `BUNNY_TRANSLATIONS_PATH`
- `SQLITE_DB_PATH` (opcional; se nao informar usa o `app.db` local do modulo sqlite)

## Scripts disponiveis
- `npm run dev` - sobe em watch mode
- `npm run debug` - sobe em watch + debug
- `npm run build` - build de producao
- `npm run prod` - executa `dist/main`
- `npm run lint` - lint com autofix
- `npm run format` - formatacao com Prettier
- `npm run migrate:c` - cria migration
- `npm run migrate:all` - aplica migrations pendentes

## Prefixo e documentacao da API
- Prefixo global: `/api`
- Health check: `GET /api`
- Docs interativas (Scalar): `/api/docs`
- OpenAPI JSON: `/swagger/json`
- OpenAPI YAML: `/swagger/yaml`

## Modulos principais
- `auth` - login/logout, guard de sessao e providers de autenticacao.
- `session` - criacao, refresh e invalidacao de sessao.
- `core-translations` - dominio principal de traducao.
- `cdn-publisher` - upload das traducoes para CDN.
- `infra` - cache e banco (Knex + SQLite).
- `throttler` - rate limit global.

## Rotas de alto nivel
- `auth/*`
- `system/*`
- `environment/*`
- `languages/*`
- `namespaces/*`
- `translations/*`
- `publisher/*`
- `cdn-publisher/*`

## Links uteis
- NestJS: https://docs.nestjs.com/
- Fastify: https://fastify.dev/docs/latest/
- Knex: https://knexjs.org/
- SQLite: https://www.sqlite.org/docs.html
- Class Validator: https://github.com/typestack/class-validator
- Swagger (Nest): https://docs.nestjs.com/openapi/introduction
- Scalar API Reference: https://guides.scalar.com/scalar/scalar-api-references/integrations/nestjs
- Bunny Storage API: https://docs.bunny.net/docs/storage-zone-api-overview
- Redmine REST API: https://www.redmine.org/projects/redmine/wiki/Rest_api

## Observacoes
- Em producao, `AUTH_PROVIDER=mock` e bloqueado pelo backend.
- Em producao, configure `COOKIE_SECRET`.
- O fluxo de edicao de catalogo e centrado em `dev`, com publicacao para outros ambientes.
