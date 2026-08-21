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

## Work gallery

The `images` array order in `lib/data/work.json` is the page order. Leave `frame` and `row` off and the gallery still packs from the photo: landscape full-width, consecutive portraits side by side on desktop only.

Optional fields on any image:

```json
{
  "src": "/Website Images/…/photo.jpg",
  "alt": "Room name",
  "caption": "",
  "frame": "square",
  "row": 2
}
```

- `frame`: `"square"` | `"portrait"` | `"landscape"` — crop to that box. Omit to keep the file's own shape.
- `row`: `1` | `2` | `3` — how many images share this row, including on a phone. Set it on the **first** image of the group. `1` keeps a portrait full-width instead of pairing. Omit for the automatic packer.

Tegelweg has a few of these filled in as examples (hero landscape, blue-room pair, coral-room threes).

## Stack

Next.js 16 · React 19 · TypeScript · Tailwind CSS 4
