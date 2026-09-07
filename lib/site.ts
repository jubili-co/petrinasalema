export const SITE = {
  name: "Petrina Salema",
  url: "https://www.petrinasalema.com",
  origin: "https://www.petrinasalema.com",
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
 * Soft invites ("Let's see if this is a fit") land on /book.
 * Book and Studio hard CTAs open Cal: fit call (free) and paid hour (€290).
 */
export const FIT_CALL_PATH = "/book" as const;
export const FIT_CALL_CAL_HREF = "https://cal.com/jubili/fit-call" as const;
export const JUMPSTART_CAL_HREF = "https://cal.com/jubili/jump-start" as const;
export const FIT_CALL_SOFT_LABEL = "Let's see if this is a fit" as const;
export const PAID_HOUR_LABEL = "A paid hour on the plan" as const;
export const FIT_CALL_DOOR =
  "If one of your rooms is next, let's see if this is a fit." as const;
