# Frontend - Translator Server

Aplicacao React para operacao de traducao: dashboard, cadastro de estrutura e edicao de termos.

## Stack
- React 19
- TypeScript
- Vite
- React Router
- Tailwind
- next-themes
- Sonner

## Requisitos
- Node.js 20+
- npm 10+

## Como rodar
1. Instale dependencias
```bash
npm install
```

2. Configure ambiente
Crie/ajuste `.env` com:
```env
VITE_API_URL=http://localhost:3000/
```

3. Inicie em desenvolvimento
```bash
npm run dev
```

## Scripts
- `npm run dev`: sobe app local com Vite
- `npm run build`: typecheck + build
- `npm run lint`: lint + fix
- `npm run format`: prettier
- `npm run orval`: regenera clientes de API

## Configuracoes relevantes
- `src/envConfig.ts`
  - `devEnvironment`: ambiente considerado de edicao/publicacao no front.

Regras atuais de UI seguem esse valor para habilitar ou bloquear acoes como:
- criar/excluir idioma e namespace
- promote/demote de idioma base
- criar/excluir chave
- salvar traducoes

## Estrutura de paginas
- `src/app/Dashboard`: visao consolidada e publicacoes.
- `src/app/Cadastro`: cadastro navegavel de sistema/ambiente/idioma/namespace.
- `src/app/Traducoes`: edicao de traducoes com filtro, ordenacao e paginacao.
- `src/app/CadastroDeChaves`: cadastro em massa por texto (`chave` e `chave;valor`).

## Padrao interno de componentes
Padrao usado nas telas principais:
- `index.tsx`: camada visual
- `*.styles.ts`: estilos/classes
- `useNomeComponente.ts`: logica (estado, handlers, chamadas de API)

Subcomponentes devem ficar em pasta `components/` dentro da feature que os usa.
