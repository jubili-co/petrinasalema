export const SITE = {
  name: "Petrina Salema",
  url: "https://www.petrinasalema.com",
  email: "contact@petrinasalema.com",
  ogImage: "/og.jpg",
  ogImageAlt: "Living room at Tegelweg, Vienna",
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
 * Book and Studio hard CTAs open Cal: intro (free) and consultation (€290).
 * Cal event title/slug is Intro (`/intro`). Site buttons stay initiation
 * language. Do not put "Intro Call" on the site.
 * Paid Cal event is Consultation (`/consult`).
 */
export const FIT_CALL_PATH = "/book" as const;
export const INTRO_CAL_HREF = "https://cal.com/jubili/intro" as const;
export const CONSULT_CAL_HREF = "https://cal.com/jubili/consult" as const;
export const FIT_CALL_SOFT_LABEL = "See if it's a fit" as const;
export const PAID_HOUR_LABEL = "Consultation" as const;
export const FIT_CALL_DOOR =
  "If one of your rooms is next, let's see if this is a fit." as const;
