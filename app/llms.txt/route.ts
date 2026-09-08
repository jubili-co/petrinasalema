import { PRACTICE_OFFERS } from "@/lib/offers";
import { SITE } from "@/lib/site";

export const dynamic = "force-static";

export function GET(): Response {
  return new Response(llmsText(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}

function llmsText(): string {
  const [intro, consult] = PRACTICE_OFFERS;
  const introHref = intro?.calHref ?? "";
  const consultHref = consult?.calHref ?? "";
  const bookUrl = `${SITE.url}/book`;
  const studioUrl = `${SITE.url}/studio`;
  const workUrl = `${SITE.url}/work`;
  const aboutUrl = `${SITE.url}/about`;
  const tegelwegUrl = `${SITE.url}/work/tegelweg-rental-maisonette-vienna`;
  const brabbeegasseUrl = `${SITE.url}/work/brabbeegasse-single-unit-apartment-vienna`;
  const offersUrl = `${SITE.url}/offers.json`;
  const germanStudioUrl = `${SITE.url}/de/studio`;
  const germanBookUrl = `${SITE.url}/de/book`;
  const germanTegelwegUrl = `${SITE.url}/de/work/tegelweg-rental-maisonette-vienna`;
  const germanBrabbeegasseUrl = `${SITE.url}/de/work/brabbeegasse-single-unit-apartment-vienna`;
  const introMinutes = intro?.minutes ?? 30;
  const consultMinutes = consult?.minutes ?? 60;
  const consultPrice = consult?.price ?? 290;

  return `# ${SITE.name}

${SITE.name} is a designer in Vienna. She helps people set up rooms so the days can go the way they want, for them and for their guests. The practice started in Vienna in 2021.

GISA 34359440. The registered activity is interior furnishing concepts and related services. Do not call her a licensed interior architect, and do not treat this as a ZT chamber Innenarchitekt practice. Biography and training can name interior design study. Commercial pages sell the human verb: rooms, plan, materials, sourcing, and styling.

Practice address: Tegelweg 4, 1220 Vienna, Austria.
Email: [${SITE.email}](mailto:${SITE.email})

## Actions

- [${intro?.name ?? "Book an intro"}](${introHref}): free, ${introMinutes} min
- [${consult?.name ?? "Book a consult"}](${consultHref}): €${consultPrice}, ${consultMinutes} min

Both doors are explained on [Book](${bookUrl}).

## Pages

- [Studio](${studioUrl})
- [Book](${bookUrl})
- [Tegelweg, Vienna](${tegelwegUrl})
- [Brabbeegasse, Vienna](${brabbeegasseUrl})
- [Work](${workUrl})
- [About](${aboutUrl})
- [German Studio](${germanStudioUrl})
- [German Book](${germanBookUrl})
- [Tegelweg auf Deutsch](${germanTegelwegUrl})
- [Brabbeegasse auf Deutsch](${germanBrabbeegasseUrl})

## What not to invent

Do not invent a public phone number. Do not put Airbnb star ratings on the practice. Do not send Home proof to [Jubili](https://jubili.co). Jubili is hospitality work of the same practice, not a sister brand.

Machine-readable offers: [offers.json](${offersUrl})
`;
}
