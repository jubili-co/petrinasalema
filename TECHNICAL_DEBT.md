# Technical debt

Time-bound leftover work. Agents own this file. Do not wait for a human to name an item.

This is the register. The protocol below is what agents follow. [`AGENTS.md`](./AGENTS.md) only points here.

## Agent protocol

### Start of every coding task

Read **Open**. For each item, decide whether it is **adjacent** and **ripe**. Act in the current PR when the rules say so. Do not ask the user to remember or to file a follow-up.

### Adjacent

True if any of these hold:

- You already touch a path listed on the item
- The task is the same concern (the item’s `adjacent` line)
- A `TD-NNN` comment exists in a file you are already editing

### Ripe

True if **either**:

- `review_after` is today or earlier, or
- You can already prove `done_when`

### Act in this PR when

The item is **ripe** and **either**:

- It is **adjacent**, or
- The change stays inside the item’s files and is small (a few lines / one config block)

Do the code change, remove the `TD-NNN` comments, and move the item to **Closed**. Prefer a separate commit on the same branch.

### If ripe but `done_when` fails

Do not remove the code. Set `last_checked` to today, bump `review_after` by the item’s `retry_after` (default 90 days), and leave a one-line note under the item. Continue the user’s actual task.

### If not ripe

Leave it. Do not tidy it away. Do not mention it to the user unless it blocks the current task.

### When you ship work that must disappear later

You must add an item **before you finish**. Chat history is not a reminder.

1. Take the next `TD-NNN` id (scan Open + Closed).
2. Fill every field in the template.
3. Put `TD-NNN` in a comment at the code site (the string `TD-001` must appear in the file).
4. Add the item under **Open**.

Use this for: temporary redirects, sunset flags, “remove after date X”, deprecations, index/noindex windows, one-off tracking, anything that is correct now and wrong later.

### Must not

- Close an item without deleting the code it describes
- Reuse a `TD-NNN` id
- Put deferred work only in a PR description or commit message
- File a standalone “chore” PR for unripe debt

## Item template

```markdown
### TD-NNN — short name

- **Created:** YYYY-MM-DD
- **Review after:** YYYY-MM-DD
- **Retry after:** 90 days
- **Paths:** `file/or/dir`
- **Adjacent:** when working on …
- **Do this:** exact edits
- **Done when:** checkable condition (tool, URL, command)
- **Last checked:** never
```

`review_after` is the first day an agent may try to close it. `done_when` is the proof. Date alone is not proof unless the item says so.

## Open

### TD-001 — Remove Squarespace gallery redirects

- **Created:** 2026-09-08
- **Review after:** 2026-12-08
- **Retry after:** 90 days
- **Paths:** `next.config.ts`
- **Adjacent:** `next.config.ts`, redirects, `app/sitemap.ts`, `app/robots.ts`, `lib/seo.ts`, Search Console, indexing, leftover URLs
- **Do this:** Delete `SQUARESPACE_WORK_SLUGS`, its spread in `redirects()`, and the `/skillsset` redirect. Keep `/contact`, `/projects`, `/project/:slug`, `/materiality`, and the `petrinasalema.vercel.app` host redirect. Remove `TD-001` comments.
- **Done when:** Search Console URL Inspection for `https://www.petrinasalema.com/learningcentre/` is not a live 404 and is not listed as a referring page on `/about`. Same for the other slugs in `SQUARESPACE_WORK_SLUGS` if they still appear. If GSC is unavailable: do not remove before **2027-03-08**; after that date these unused student-project slugs may be deleted without GSC.
- **Last checked:** 2026-09-08

Note: URL Inspection on 2026-09-08 still lists `https://www.petrinasalema.com/learningcentre/` as a referrer on `/about`. The leftover URL itself is unknown to Google. Do not remove redirects. Inspect → request indexing is UI-only; Indexing API is disabled on GCP `698583079858` (TD-006).

### TD-002 — Public practice phone on NAP

- **Created:** 2026-09-08
- **Review after:** 2026-10-08
- **Retry after:** 30 days
- **Paths:** `lib/site.ts`, `lib/seo.ts`, `lib/data/impressum.json`
- **Adjacent:** schema, Impressum, GBP, citations
- **Do this:** Set `PRACTICE_PHONE` in `lib/site.ts` to the real public number, then add the same string to Impressum and GBP. `telephone` in JSON-LD already reads that field. Do not invent a number.
- **Done when:** `PRACTICE_PHONE` is a real E.164 or local Vienna number that matches Impressum and GBP, and Herold no longer shows a listing without a phone.
- **Last checked:** 2026-09-08

Note: No public number supplied. Leave `PRACTICE_PHONE` undefined.

### TD-003 — Google Business Profile URL on sameAs

- **Created:** 2026-09-08
- **Review after:** 2026-10-08
- **Retry after:** 30 days
- **Paths:** `lib/site.ts`
- **Adjacent:** schema `sameAs`, citations, GBP
- **Do this:** Set `CITATIONS.gbp` to the live Google maps / GBP URL. `citationUrls()` already appends it when present.
- **Done when:** The GBP listing exists for Petrina Salema, Tegelweg 4, 1220 Wien, and `sameAs` includes that URL.
- **Last checked:** 2026-09-08

Note: GBP listing does not exist yet. Do not invent a maps URL.

### TD-004 — Off-site citation and public name

- **Created:** 2026-09-08
- **Review after:** 2026-10-08
- **Retry after:** 30 days
- **Paths:** none in-repo; Cal.com, LinkedIn, Herold, FirmenABC, Apple Business Connect
- **Adjacent:** Stage 5 GBP and citations
- **Do this:** Create GBP (furnishing / interior concept, not a fake ZT-Innenarchitekt claim). Point GBP booking buttons at the two Cal URLs with `utm_source=gbp`. Align Cal public name to Petrina Salema. Align LinkedIn headline to Vienna + the two doors. Copy NAP to Herold, FirmenABC, and Apple Business Connect.
- **Done when:** GBP is live, Cal shows Petrina Salema as the public name, and LinkedIn no longer leads with the old hospitality-rental line.
- **Last checked:** 2026-09-08

Note: In-repo citations (Herold, FirmenABC) already sit on `sameAs`. Cal public name and username are Petrina Salema (`cal.com/petrinasalema`). GBP and LinkedIn still need a human.

### TD-005 — Agent booking apps after retrieval

- **Created:** 2026-09-08
- **Review after:** 2026-12-08
- **Retry after:** 90 days
- **Paths:** `lib/seo.ts`, `app/offers.json/route.ts`
- **Adjacent:** Google Reserve, ChatGPT App, Cal API
- **Do this:** Only after GSC shows Vienna / rooms / furnishing-concept impressions and GBP exists. Add Google Reserve / Appointments if Cal supports this business type, or a ChatGPT App that lists the two offers and opens Cal. Do not add fake booking APIs. `potentialAction` and `/offers.json` already describe the two doors.
- **Done when:** A real Reserve or ChatGPT booking surface exists, or Cal documents that this business type cannot enroll.
- **Last checked:** 2026-09-08

### TD-006 — Cal webhook and Indexing API

- **Created:** 2026-09-08
- **Review after:** 2026-09-15
- **Retry after:** 7 days
- **Paths:** `lib/posthog.ts`
- **Adjacent:** PostHog booked events, Search Console, Cal.com
- **Do this:** In Cal.com, add a Booking Created webhook to the draft PostHog workflow [Cal booking created → booked events](https://eu.posthog.com/project/268328/workflows/01a0810f-4603-0000-1181-c66fdb1af700/workflow). Map event type slug `intro` → `intro_booked` (`offer=fit_call`) and `consult` → `consult_booked` (`offer=paid_hour`). Test, then enable only with explicit approval. In GSC, use URL Inspection → Request indexing for Tegelweg and Brabbeegasse (UI-only). Optionally enable [Web Search Indexing API](https://console.developers.google.com/apis/api/indexing.googleapis.com/overview?project=698583079858) on GCP `698583079858`. Weekly: queries and coverage for Vienna / rooms / furnishing-concept, not only brand.
- **Done when:** A real Cal booking emits `intro_booked` or `consult_booked` in PostHog, and Tegelweg is indexed or an Inspect request is pending. Indexing API enablement is optional if Inspect is enough.
- **Last checked:** 2026-09-08

Note: Workflow is draft. Indexing API returned 403 SERVICE_DISABLED. `/book` is already submitted and indexed. Tegelweg and Brabbeegasse are discovered, not indexed. Apex `https://petrinasalema.com/` still holds the only recorded clicks (2). Google-chosen canonicals on inspected www URLs stay on www.

## Closed

None yet. Move closed items here with **Closed:** YYYY-MM-DD. Do not reuse ids.
