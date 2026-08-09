export const SITE = {
  name: "Petrina Salema",
  url: "https://www.petrinasalema.com",
  email: "contact@petrinasalema.com",
  ogImage:
    "https://cdn.sanity.io/images/4jb8q7bc/production/7df063485634b97e723236ec1538bbfd9d62df74-1440x1860.jpg?w=1200&h=630&fit=crop&auto=format",
} as const;

export const NAV_LINKS = [
  { href: "/work", label: "Work" },
  { href: "/studio", label: "Studio" },
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
