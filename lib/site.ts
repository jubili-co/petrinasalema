export const SITE = {
  name: "Studio Ashby",
  cream: "#F9F3F0",
  brown: "#633B2F",
  landingSister: "#B19E18",
  studioOrange: "#E87308",
  sisterBlue: "#45519F",
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
    href: "https://www.instagram.com/studioashby",
    label: "Instagram",
    external: true,
  },
  { href: "/careers", label: "Careers" },
  { href: "/newsletter", label: "Newsletter" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/impressum", label: "Impressum" },
] as const;
