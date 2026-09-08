# Search Console backlog

Captured from Search Console screenshots on 8 Sep 2026. Domain property: `petrinasalema.com`.

This is discovery and indexing, not Lighthouse. Homepage mobile LCP lives in [`PERFORMANCE.md`](./PERFORMANCE.md).

## Already done

| Check | Result |
| --- | --- |
| Sitemap | `https://www.petrinasalema.com/sitemap.xml` — Success, 23 pages. Do not resubmit. |
| Homepage (apex) | `https://petrinasalema.com/` — **URL is on Google**, page is indexed, HTTPS ok. |

Apex inner-page inspections (`/work`, `/studio`, `/book` without www) looked “unknown” because those URLs are 308s. Ignore them.

## www inspections (8 Sep 2026)

All five money pages are **Discovered — currently not indexed**. Google found them in the sitemap and has not crawled them yet. Crawl and canonical fields are N/A. That is the normal lag after a new sitemap, not a block.

| URL | Discovery | Referring pages |
| --- | --- | --- |
| `https://www.petrinasalema.com/work` | sitemap.xml | None |
| `https://www.petrinasalema.com/studio` | sitemap.xml | None |
| `https://www.petrinasalema.com/book` | sitemap.xml | None |
| `https://www.petrinasalema.com/about` | sitemap.xml | `/learningcentre/` (404), apex `/`, www `/` |
| `https://www.petrinasalema.com/work/tegelweg-rental-maisonette-vienna` | sitemap.xml | None |

## Do next (in Search Console)

On each of those five www inspections, click **Request indexing**. Then stop. Check **Indexing → Pages** after about a week.

Do not request indexing on apex inner pages. Do not resubmit the sitemap.

## Later, optional

`/learningcentre/` 404s and still shows as a referring page for `/about`. Add a permanent redirect to `/studio` or `/about` only if old links still matter. Not required for these five pages to index.

## Out of scope

- Another sitemap submit.
- `/llms.txt` / `/llms-full.txt`.
- Treating “no referring sitemaps” on an apex URL as a sitemap failure.
