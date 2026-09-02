<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Dotto

Interior / architecture portfolio template (Next.js App Router).

## Code standards (always apply)

Before any `.ts`, `.tsx`, `.mjs`, or `.css` change, read and apply these project skills in order:

1. `.cursor/skills/petro-code-standards/SKILL.md` — mandatory bar for all agent-written code
2. `.cursor/skills/petro-code-fractal-orchestration/SKILL.md` — module layering and binding sites
3. `.cursor/skills/petro-code-composition-oriented/SKILL.md` — UI composition and platonic naming
4. `.cursor/skills/petro-code-design-engineering/SKILL.md` — gradients, fonts, hairline borders, UI polish

Skills before local style. Complete the relevant stop checklist and gate from petro-code-standards before finishing.

## Project notes

- Brand / package name: **Dotto** (`package.json` `"name": "dotto"`)
- App UI lives under `app/**`; shared domain/data under `lib/**`
- Work content is `lib/data/work.json` shaped as `Work` in `lib/work.ts`
- Prefer named `FC` exports, `cn()` for Tailwind, static `data-id` string literals
- Gate: `npm run format` (if wired) → `npm run lint` → `npx tsc --noEmit`; run `npm run skill-check` on touched scope when changing UI/orchestrators

## Copywriting (always apply for visitor-facing strings)

Applies to UI copy, JSON content, MDX, metadata, and any visitor-facing strings agents write or edit.

Before writing or restructuring visitor-facing copy, offers, IA, or brand extensions, read and apply these skills in order:

1. `.cursor/skills/draper/SKILL.md` — positioning and idea (the wound, one door, initiation CTAs)
2. `.cursor/skills/human-register/SKILL.md` — voice (sound like a person, not a brand deck or AI summary)

Draper is what idea the copy serves. Human register is how it sounds. If they conflict, fix the idea first, then the voice.

Root pointer: [`DRAPER.md`](./DRAPER.md). Shipped visitor lines: [`COPY.md`](./COPY.md).

## Cursor Cloud specific instructions

Dotto is a single static, frontend-only Next.js 16 (App Router) app. There is no backend, database, auth, or `.env` config, so the app runs with zero configuration once dependencies are installed.

- Run the dev server with `npm run dev` (Turbopack, http://localhost:3000). It is the only service. Standard scripts live in `README.md` / `package.json`.
- Remote project images resolve to public Google Drive (`lh3.googleusercontent.com`) and Sanity CDN (`cdn.sanity.io`) URLs (see `next.config.ts` and `lib/googleDrive.ts`). Missing or slow remote images are non-blocking; pages still render, and local `public/images` work offline.
- No test runner is wired. `playwright` is a dependency but there are no specs, so treat lint plus typecheck plus `skill-check` as the effective gate (see the Gate note under Project notes). Do not add a test step to the startup/update script.
