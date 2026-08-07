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

## Copywriting

Applies to UI copy, JSON content, MDX, metadata, and any visitor-facing strings agents write or edit.

- **No em dashes (`—`).** Do not use them in product copy. Prefer a period, comma, or a shorter rewrite.
- Avoid en dashes (`–`) as rhetorical separators in sentences for the same reason.
- **Go easy on colons (`:`).** Prefer a new sentence or a comma when a colon is only acting as a dramatic pause.
- Solo studio voice: avoid corporate “we” when the speaker is Petrina / the practice unless plural is clearly true.
- Prefer concrete verbs and short sentences over brochure filler.

### Tone of voice (hard)

Write like a person who runs a small practice, not like a brand deck or an AI summary. Sound human. Do not abstract into “positioning.”

First person is allowed, sparingly. One “I” in a short block can make it personal. A page where every sentence starts with “I” sounds like a LinkedIn bio, not a person talking.

**Reject (brochure / AI):**

> Independent practice in Vienna since 2021. Formed by architectural training and years inside design studios. Today: a few homes and hospitality spaces a year, in Vienna and remote.

Why it fails: noun-stack opener, passive origin myth (“Formed by…”), colon beat (“Today:”).

**Reject (first-person spam):**

> I care more about how a room works than how it photographs. I design for how you actually use the room. I keep the list short so I can go deep.

Why it fails: every line opens with “I.” Human voice varies subject and rhythm.

**Reject (slogan / manifesto slop):**

> Guest flow, daily habits, and what still works when the photographer leaves. The list stays short so the work can go deep. Same bar whether you live there or guests do.

Why it fails: consulting-speak, clever oppositions, three titled “principles.” Brand toolkit, not speech.

**Reject (fake-concrete slop):**

> A room should still feel right on a Tuesday, not only in the photos. Where the coats go… If that isn't right, the rest is decoration.

Why it fails: AI faking warmth with Tuesday / coats / photographer. Still essay voice.

**Reject (clipped / cold):**

> Layout, materials, sourcing, and styling. Most take one to three months. Only a few each year. Vienna, and remote.

Why it fails: telegram voice. Accurate, but withholding. Reads like the writer is annoyed, not clear. Cutting slogans must not strip warmth.

**Prefer (anchor):**

> I started this practice in Vienna in 2021, after years studying interior design and working in architecture studios. A few homes and hospitality spaces a year, in Vienna, abroad, and remotely.

Why it works: one “I,” full sentences, calm. Training as background, not a service claim. Geography is Vienna, abroad, and remote (not Vienna-only with remote as an afterthought).

**Also prefer (supporting copy, same temperature, keep the POV):**

> Spaces that feel considered rather than styled. Clear in plan, grounded in material, built to hold up once you live in them.

> There is only room for a few at a time. That pace is how the work stays careful, and how each project gets the attention it needs.

> Whether you live there or guests do, the aim is the same: rooms for rest, gathering, and thinking.

Why it works: the original Studio angle (considered, material, use, few projects, home and hospitality) in warm full sentences, not clipped stubs and not consulting slogans.

**Balance.** Avoid brochure posture, “I” spam, slogan triads, fake props, *and* curt stub lines. Warm + plain beats clever *and* beats clipped.

**Checklist before shipping copy**

- Can you hear someone say it out loud without wincing?
- Does it sound glad to explain, not bored or punitive?
- On a page or section, do fewer than half the sentences start with “I”?
- Would you say this to a friend, or only put it on a website?
- Full sentences where a list would feel cold?
- Did you avoid “Formed by / Built on / Rooted in / Dedicated to / Today: / go deep / same bar / Tuesday / coats / photographer leaves”?
- Credentials = background and competence. Do not sell “architecture” or “interior design” as licensed services on commercial pages (Studio, Book, Home SEO). Biography/About may state training and past roles plainly.
