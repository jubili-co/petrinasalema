export const SITE = {
  name: "Petrina Salema",
} as const;

export const NAV_LINKS = [
  { href: "/work", label: "Work" },
  { href: "/studio", label: "Studio" },
  { href: "/book", label: "Book" },
] as const;

/** Primary close — conversion and brand extensions. */
export const FOOTER_PRIMARY_LINKS = [
  { href: "/book", label: "Book" },
  { href: "/about", label: "About" },
  { href: "/newsletter", label: "Studio Notes" },
  { href: "/materiality", label: "Materiality" },
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
