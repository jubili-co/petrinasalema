# Homepage performance backlog

Captured from PageSpeed Insights on 8 Sep 2026. Mobile (Moto G Power, Slow 4G, Lighthouse 13.4.1) against `https://www.petrinasalema.com/`.

| Score | Value |
| --- | --- |
| Performance | 86 |
| Accessibility | 96 |
| Best Practices | 100 |
| SEO | 100 |
| Agentic Browsing | 2/2 |

This is lab data, not Search Console field data. Do not treat it as an indexing problem. Search Console still needs the Pages report and indexing requests for `/`, `/work`, `/studio`, `/book`, and Tegelweg.

Do not add `/llms.txt` or `/llms-full.txt` for this score. Agentic Browsing already passed 2/2.

## Do first — LCP 4.2s

Everything else on the report is small next to this. FCP 0.9s, TBT 20ms, and CLS 0 are already fine.

Lighthouse named the LCP element as `main > section.relative > div.pointer-events-none > img.object-cover` with `loading="lazy"`. That is the decorative plan in `HomeStatement` (`SketchArtifact`, `alt-erdgeschoss--plan-line.webp`). `SketchArtifact` never sets `priority`, so `next/image` lazy-loads it.

Also in the image-delivery list (137 KiB claimed):

| Asset | Where | Size / claimed save | Note |
| --- | --- | --- | --- |
| `alt-obergeschoss--plan-line.webp` | `HomeInvite` sketch | 82.4 KiB / 54.9 KiB | Below the fold. Leave lazy. Compress the source if touching papers. |
| Tegelweg balcony photo | first `HomeWorkCard` | 81.0 KiB / 34.9 KiB | Served 581×750, shown ~532×532. No `priority` on home cards. `FadeImage` keeps the photo at `opacity-0` until `onLoad`. |
| `alt-erdgeschoss--plan-line.webp` | `HomeStatement` sketch | 36.8 KiB / 29.8 KiB | LCP candidate. Needs `priority` (or stop using it as the LCP element). |
| `hofansicht--haus-line.webp` | `HomeProof` sketch | 19.2 KiB / 17.2 KiB | Below the fold. Leave lazy. |

When this work happens:

1. Decide whether the statement plan should be the LCP element. If yes, pass `priority` from `HomeStatement` through `SketchArtifact` and keep it visible without a fade-in. If no, do not let a lazy decorative image win LCP over the headline.
2. Mark the first homepage work photo `priority` in `HomeWork` / `HomeWorkCard` if that image is in the first viewport on mobile.
3. Tighten `sizes` on the Tegelweg card so the optimizer is not asked for 581×750 when the box is ~532px.
4. Re-export the four paper WebPs with a higher compression factor only if the line art still reads at the current opacity.

Re-run mobile PageSpeed on `/` after. Target LCP under 2.5s on this same lab setup.

## Later — only if LCP is already green

These will not move Core Web Vitals much:

- **Render-blocking CSS (~130ms)** — `globals.css` chunk (~12.6 KiB) sits on the critical path.
- **Font chain (1.47s)** — HTML → CSS → `/fonts/Matter.woff2`. Matter is `@font-face` in `app/globals.css` with `font-display: swap`, not `ReactDOM.preload`. Playfair already goes through `next/font`. Preload Matter per petro-code-design-engineering if the header still waits on it.
- **Unused JS (~107 KiB)** and **legacy polyfills (~22 KiB)** (`Array.prototype.at` / `flat` / `flatMap`, `Object.fromEntries` / `hasOwn`, string trim helpers). Next/SWC baseline. Chase only if a real field INP problem shows up.
- **Accessibility 96** — contrast fail, likely cookie banner or light type on a photo. Fix when polishing, not for ranking.

## Out of scope for this backlog

- Resubmitting the sitemap (already Success, 23 URLs).
- `/agents.txt` (already shipping).
- `/llms.txt` / `/llms-full.txt`.
