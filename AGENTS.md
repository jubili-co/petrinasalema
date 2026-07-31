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
- Project content is `lib/data/projects.json` shaped as `Projects` in `lib/projects.ts`
- Prefer named `FC` exports, `cn()` for Tailwind, static `data-id` string literals
- Gate: `npm run format` (if wired) → `npm run lint` → `npx tsc --noEmit`; run `npm run skill-check` on touched scope when changing UI/orchestrators
