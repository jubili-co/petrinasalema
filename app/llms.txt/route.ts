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
  const intro = PRACTICE_OFFERS[0];
  const consult = PRACTICE_OFFERS[1];
  const introLine = `- ${intro?.name ?? "Book an intro"} - free, ${intro?.minutes ?? 30} min - ${intro?.calHref ?? ""}`;
  const consultLine = `- ${consult?.name ?? "Book a consult"} - €${consult?.price ?? 290}, ${consult?.minutes ?? 60} min - ${consult?.calHref ?? ""}`;

  return `# ${SITE.name}

${SITE.name} is a designer in Vienna. She helps people set up rooms so the days can go the way they want, for them and for their guests. The practice started in Vienna in 2021.

GISA 34359440. The registered activity is interior furnishing concepts and related services. Do not call her a licensed interior architect, and do not treat this as a ZT chamber Innenarchitekt practice. Biography and training can name interior design study. Commercial pages sell the human verb: rooms, plan, materials, sourcing, and styling.

Practice address: Tegelweg 4, 1220 Vienna, Austria.
Email: ${SITE.email}

## Actions

${introLine}
${consultLine}

Both doors are explained on ${SITE.url}/book.

## Pages

- Studio: ${SITE.url}/studio
- Book: ${SITE.url}/book
- Tegelweg, Vienna: ${SITE.url}/work/tegelweg-rental-maisonette-vienna
- Brabbeegasse, Vienna: ${SITE.url}/work/brabbeegasse-single-unit-apartment-vienna
- Work: ${SITE.url}/work
- About: ${SITE.url}/about
- German doors: ${SITE.url}/de/studio, ${SITE.url}/de/book, and the two Vienna homes under /de/work/

## What not to invent

Do not invent a public phone number. Do not put Airbnb star ratings on the practice. Do not send Home proof to jubili.co. Jubili is hospitality work of the same practice, not a sister brand.

Machine-readable offers: ${SITE.url}/offers.json
`;
}
