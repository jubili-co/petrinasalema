import { SITE, calHref } from "@/lib/site";

export type OfferId = "intro" | "consult";

export type PracticeOffer = {
  id: OfferId;
  name: string;
  description: string;
  price: number;
  currency: "EUR";
  minutes: number;
  pagePath: "/book";
  calHref: string;
};

export const PRACTICE_OFFERS: PracticeOffer[] = [
  {
    id: "intro",
    name: "Book an intro",
    description:
      "A free 30-minute first conversation. Bring the floor plan if you have one. In that half hour it should be clear whether a full project or a paid hour is the right next step.",
    price: 0,
    currency: "EUR",
    minutes: 30,
    pagePath: "/book",
    calHref: calHref("intro"),
  },
  {
    id: "consult",
    name: "Book a consult",
    description:
      "A paid hour with a clear point of view on the change that would matter most, adapting the rooms into a space that shapes the way you want to live.",
    price: 290,
    currency: "EUR",
    minutes: 60,
    pagePath: "/book",
    calHref: calHref("consult"),
  },
];

export function offerPageUrl(): string {
  return `${SITE.url}/book`;
}

export function offerNodeId(id: OfferId): string {
  return `${SITE.url}/#offer-${id}`;
}
