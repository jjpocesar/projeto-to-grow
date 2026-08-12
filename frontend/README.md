# Projeto To Grow — Frontend

Front-end em React (Vite, JavaScript) do Projeto To Grow. Consome a API em `../` (ASP.NET Core).

Instruções completas de instalação e execução (backend + frontend) estão no [README na raiz do repositório](../README.md).

## Resumo rápido

```bash
cp .env.example .env   # ajuste VITE_API_URL se necessário
npm install
npm run dev
```

## Scripts disponíveis

- `npm run dev` — inicia o servidor de desenvolvimento (`http://localhost:5173`).
- `npm run build` — gera a build de produção em `dist/`.
- `npm run lint` — roda o oxlint.
- `npm run preview` — serve a build de produção localmente.
