export const SITE = {
  name: "Petrina Salema",
  url: "https://www.petrinasalema.com",
  origin: "https://petrinasalema.vercel.app",
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

/** Primary close — conversion and one downstream brand. */
export const FOOTER_PRIMARY_LINKS = [
  { href: "/book", label: "Book" },
  { href: "/about", label: "About" },
  {
    href: "https://jubili.co",
    label: "Jubili",
    external: true,
  },
] as const;

/** Compliance — sits apart from the primary close; same type scale. */
export const FOOTER_LEGAL_LINKS = [
  { href: "/privacy", label: "Privacy" },
  { href: "/impressum", label: "Impressum" },
] as const;

/** Soft CTAs across the site land on /book. Hard booking CTAs on Book/Studio open Cal. */
export const FIT_CALL_PATH = "/book" as const;
export const FIT_CALL_CAL_HREF = "https://cal.com/jubili/fit-call" as const;
export const JUMPSTART_CAL_HREF = "https://cal.com/jubili/jump-start" as const;
