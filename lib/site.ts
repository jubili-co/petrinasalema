export const SITE = {
  name: "Petrina Salema",
} as const;

export const NAV_LINKS = [
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/book", label: "Book" },
  { href: "/materiality", label: "Store" },
] as const;

/** Primary close — conversion and brand extensions. */
export const FOOTER_PRIMARY_LINKS = [
  { href: "/book", label: "Book" },
  { href: "/newsletter", label: "Studio Notes" },
  {
    href: "https://jubili.co",
    label: "Jubili",
    external: true,
  },
] as const;

/** Compliance — quieter weight than the primary close. */
export const FOOTER_LEGAL_LINKS = [
  { href: "/privacy", label: "Privacy" },
  { href: "/impressum", label: "Impressum" },
] as const;
