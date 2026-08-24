import type { Metadata, Viewport } from "next";
import { Playfair_Display } from "next/font/google";
import type { FC, ReactNode } from "react";

import { COLOR_HEX } from "@/lib/colors";
import { SITE } from "@/lib/site";

import { CookieBanner } from "./components/CookieBanner";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-playfair-face",
  style: ["normal", "italic"],
});

const metadataBase = new URL(SITE.origin);

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: "Petrina Salema | Spaces & Interiors",
    template: "%s",
  },
  description:
    "Your space shapes how you live. Petrina Salema helps people transform spaces to redefine the living experience, for themselves or their guests, in Vienna and remotely abroad.",
  applicationName: SITE.name,
  openGraph: {
    type: "website",
    locale: "en_AT",
    url: SITE.origin,
    siteName: SITE.name,
    title: "Petrina Salema | Spaces & Interiors",
    description:
      "Your space shapes how you live. Petrina Salema helps people transform spaces to redefine the living experience, for themselves or their guests.",
    images: [
      {
        url: SITE.ogImage,
        width: 1200,
        height: 630,
        alt: "Petrina Salema",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Petrina Salema | Spaces & Interiors",
    description:
      "Your space shapes how you live. Homes and hospitality spaces, in Vienna and remotely abroad.",
    images: [SITE.ogImage],
  },
  alternates: {
    canonical: "/",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: COLOR_HEX["dotto-brown"],
};

type Props = {
  children: ReactNode;
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Petrina Salema",
  url: SITE.url,
  email: SITE.email,
  jobTitle: "Designer",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Vienna",
    addressCountry: "AT",
  },
  sameAs: ["https://jubili.co", "https://www.linkedin.com/in/petrinasalema"],
};

const RootLayout: FC<Props> = ({ children }) => (
  <html lang="en" className={`${playfair.variable} h-full antialiased`}>
    <body
      data-id="app-body"
      className="flex min-h-full flex-col bg-dotto-cream text-dotto-brown"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      {children}
      <CookieBanner />
    </body>
  </html>
);

export default RootLayout;
