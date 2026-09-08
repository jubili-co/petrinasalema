export const SITE = {
  name: "Petrina Salema",
  url: "https://www.petrinasalema.com",
  email: "contact@petrinasalema.com",
  ogImage: "/og.jpg",
  ogImageAlt: "Living room at Tegelweg, Vienna",
} as const;

/** Public practice phone once a number exists. Omit from NAP until then. TD-002 */
export const PRACTICE_PHONE: string | undefined = undefined;

export const CITATIONS = {
  linkedin: "https://www.linkedin.com/in/petrinasalema",
  jubili: "https://jubili.co",
  herold:
    "https://www.herold.at/gelbe-seiten/wien/Nwx4W/salema-petrina-manase/",
  firmenAbc: "https://www.firmenabc.at/petrina-manase-salema_PVUz",
  /** TD-003 — add the Google Business Profile maps URL once the listing exists. */
  gbp: undefined as string | undefined,
} as const;

export const PRACTICE_GEO = {
  latitude: 48.2607158,
  longitude: 16.4456919,
} as const;

/** Primary path — proof, offer, person, initiation. */
export const NAV_LINKS = [
  { href: "/work", label: "Work" },
  { href: "/studio", label: "Studio" },
  { href: "/about", label: "About" },
  { href: "/book", label: "Book" },
] as const;

/** Primary close — proof, conversion, person, studio. */
export const FOOTER_PRIMARY_LINKS = [
  { href: "/work", label: "Work" },
  { href: "/book", label: "Book" },
  { href: "/about", label: "About" },
  { href: "/studio", label: "Studio" },
] as const;

/** Compliance — sits apart from the primary close; same type scale. */
export const FOOTER_LEGAL_LINKS = [
  { href: "/privacy", label: "Privacy" },
  { href: "/impressum", label: "Impressum" },
] as const;

/**
 * One spoken door, two sizes.
 * Soft invites ("See if it's a fit") land on /book.
 * Book hard CTAs name the calendar doors: "Book an intro" (free) and
 * "Book a consult" (€290). Studio paid label matches the Book consult door.
 * Cal event title/slug is Intro (`/intro`). Do not put "Intro Call" on
 * Home, Work, About, or Studio. Paid Cal event is Consultation (`/consult`).
 */
export const FIT_CALL_PATH = "/book" as const;
export const INTRO_CAL_HREF = "https://cal.com/jubili/intro" as const;
export const CONSULT_CAL_HREF = "https://cal.com/jubili/consult" as const;
export const FIT_CALL_SOFT_LABEL = "See if it's a fit" as const;
export const PAID_HOUR_LABEL = "Book a consult" as const;
export const FIT_CALL_DOOR =
  "If one of your rooms is next, let's see if this is a fit." as const;

export type CalOffer = "intro" | "consult";
export type CalSource = "site" | "gbp";

export function calHref(
  offer: CalOffer,
  source: CalSource = "site",
): string {
  const base = offer === "intro" ? INTRO_CAL_HREF : CONSULT_CAL_HREF;
  const url = new URL(base);
  url.searchParams.set("utm_source", source);
  url.searchParams.set("utm_medium", "cta");
  url.searchParams.set("utm_content", offer);
  return url.toString();
}

export function hrefPathname(href: string): string {
  if (href.startsWith("http://") || href.startsWith("https://")) {
    return new URL(href).pathname.replace(/\/$/, "");
  }

  const [path] = href.split("?");
  return (path ?? href).replace(/\/$/, "") || "/";
}

export function withCalUtm(href: string, source: CalSource = "site"): string {
  const pathname = hrefPathname(href);
  if (pathname === hrefPathname(INTRO_CAL_HREF)) {
    return calHref("intro", source);
  }

  if (pathname === hrefPathname(CONSULT_CAL_HREF)) {
    return calHref("consult", source);
  }

  return href;
}
