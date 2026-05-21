# Shivam Kumar Mishra — Portfolio

Personal portfolio (React + Vite + Tailwind) showcasing AI/ML projects, experience, skills, and contact.

Live stack: cinematic UI, command palette, portfolio PDF export, and optional AI assistant via a local proxy.

## Setup

```bash
npm install
npm run dev
```

## Environment variables

**Do not commit API keys.** Use local env files only (already gitignored).

| File | Purpose |
|------|---------|
| `.env` | Frontend — copy from [`.env.example`](.env.example) (EmailJS, optional) |
| `server/.env` | Backend proxy — copy from [`server/.env.example`](server/.env.example) (OpenAI, optional) |

```bash
cp .env.example .env
cp server/.env.example server/.env
# Edit both files with your keys locally — never push .env to GitHub
```

Optional assistant proxy:

```bash
npm run start:server
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Vite dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run start:server` | Express assistant proxy (`/api/assistant`) |

## Security

- Secrets live only in `.env` / `server/.env` (gitignored).
- OpenAI calls go through `server/index.js` so keys are not exposed in the client bundle.
- Contact form uses EmailJS public key via `VITE_*` vars or falls back to `mailto:`.

## License

MIT
