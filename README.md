# TranslatorServer

Monorepo para gerenciamento de traducoes por `sistema -> ambiente -> idioma -> namespace`.

## Estrutura
- `backend/`: API NestJS + Fastify, banco SQLite via Knex, publicacao para CDN.
- `frontend/`: app React + Vite para dashboard, cadastro e edicao de traducoes.
- `auxiliar/`: utilitario para gerar massa de dados de chaves/traducoes.

## Requisitos
- Node.js 20+
- npm 10+

## Setup rapido
1. Backend
```bash
cd backend
npm install
cp ".env copy" .env
npm run dev
```

2. Frontend (em outro terminal)
```bash
cd frontend
npm install
npm run dev
```

3. Acesso local
- API: `http://localhost:3000/api`
- Docs API: `http://localhost:3000/api/docs`
- Frontend: URL exibida pelo Vite (normalmente `http://localhost:5173`)

## Fluxo funcional
1. Cadastre `sistemas`, `ambientes`, `idiomas` e `namespaces`.
2. Edite traducoes no ambiente de desenvolvimento (`devEnvironment`, configurado no front).
3. Publique namespaces/ambientes para outros ambientes.
4. Opcionalmente publique no CDN via endpoint dedicado.

## Documentacao por modulo
- Backend: `backend/README.md`
- Frontend: `frontend/README.md`
