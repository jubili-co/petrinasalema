export const SITE = {
  name: "Petrina Salema",
} as const;

export const NAV_LINKS = [
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/sister", label: "Store" },
] as const;

export const FOOTER_LINKS = [
  { href: "/contact", label: "Contact" },
  {
    href: "https://jubili.co",
    label: "Jubili",
    external: true,
  },
  { href: "/careers", label: "Careers" },
  { href: "/newsletter", label: "Newsletter" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/impressum", label: "Impressum" },
] as const;
