# Dotto

Portfolio website template for architecture and interior design work.

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Local development |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint |
| `npm run skill-check` | Petro skill greps (binding sites, data-id, etc.) |

## Layout

- `app/` — routes and UI
- `lib/data/` — JSON content (`projects.json`, about, careers, …)
- `lib/projects.ts` — `Projects` types and project helpers
- `.cursor/skills/petro-code-*` — agent coding standards (see `AGENTS.md`)

## Stack

Next.js 16 · React 19 · TypeScript · Tailwind CSS 4
