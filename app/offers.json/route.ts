import { PRACTICE_OFFERS, offerPageUrl } from "@/lib/offers";
import { SITE } from "@/lib/site";

/** TD-005 — Google Reserve / ChatGPT App after retrieval exists. */

export const dynamic = "force-static";

export function GET(): Response {
  return Response.json({
    name: SITE.name,
    url: SITE.url,
    city: "Vienna",
    country: "AT",
    activity: "interior furnishing concepts",
    licensedInteriorArchitect: false,
    booking: offerPageUrl(),
    offers: PRACTICE_OFFERS.map(
      ({ id, name, description, price, currency, minutes, calHref }) => ({
        id,
        name,
        description,
        price,
        currency,
        minutes,
        scheduleUrl: calHref,
      }),
    ),
  });
}
