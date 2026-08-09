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
- `lib/data/` — JSON content (`work.json`, about, careers, …)
- `lib/work.ts` — `Work` types and portfolio helpers
- `.cursor/skills/petro-code-*` — agent coding standards (see `AGENTS.md`)
- `.cursor/skills/draper` — positioning / marketing logic for visitor copy
- `.cursor/skills/human-register` — human voice for visitor copy (not brand-deck / AI tone)

## Stack

Next.js 16 · React 19 · TypeScript · Tailwind CSS 4
