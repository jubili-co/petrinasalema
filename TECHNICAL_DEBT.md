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
- **Last checked:** never

## Closed

None yet. Move closed items here with **Closed:** YYYY-MM-DD. Do not reuse ids.
