# Search Console backlog

Captured from Search Console screenshots on 8 Sep 2026. Domain property: `petrinasalema.com`.

This is discovery and indexing, not Lighthouse. Homepage mobile LCP lives in [`PERFORMANCE.md`](./PERFORMANCE.md).

## Already done

| Check | Result |
| --- | --- |
| Sitemap | `https://www.petrinasalema.com/sitemap.xml` — Success, 23 pages. Do not resubmit. |
| Homepage (apex) | `https://petrinasalema.com/` — **URL is on Google**, page is indexed, HTTPS ok. |

## What the other inspections showed

These were run on **apex** URLs. The sitemap only lists **www**. Apex 308s to www, so Search Console is reporting on the redirect, not the page.

| Inspected | Result | Meaning |
| --- | --- | --- |
| `https://petrinasalema.com/work` | Not on Google. URL unknown. No referring sitemaps. | Expected. Sitemap has `https://www.petrinasalema.com/work`. |
| `https://petrinasalema.com/studio` | Same as `/work`. | Same. |
| `https://petrinasalema.com/book` | Live test: URL available to Google, page can be indexed. No enhancements. | Fetch works. Indexing not recorded yet on this URL. |

Do not request indexing on the apex inner pages.

## Do next (in Search Console)

Inspect the **www** URLs, then **Request indexing** if they are not on Google:

- `https://www.petrinasalema.com/work`
- `https://www.petrinasalema.com/studio`
- `https://www.petrinasalema.com/book`
- `https://www.petrinasalema.com/about`
- `https://www.petrinasalema.com/work/tegelweg-rental-maisonette-vienna`

Then wait. Check **Indexing → Pages** after about a week. Inner pages often lag the homepage.

## Out of scope

- Another sitemap submit.
- `/llms.txt` / `/llms-full.txt`.
- Treating “no referring sitemaps” on an apex URL as a sitemap failure.
