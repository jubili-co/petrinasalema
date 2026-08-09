import type { Metadata, Viewport } from "next";
import type { FC, ReactNode } from "react";

import { COLOR_HEX } from "@/lib/colors";
import { SITE } from "@/lib/site";

import { CookieBanner } from "./components/CookieBanner";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Petrina Salema | Spaces & Interiors",
    template: "%s",
  },
  description:
    "Your rooms are already deciding how you live. Petrina Salema helps change what they decide, for homes and guest stays in Vienna, abroad, and remotely.",
  applicationName: SITE.name,
  openGraph: {
    type: "website",
    locale: "en_AT",
    url: SITE.url,
    siteName: SITE.name,
    title: "Petrina Salema | Spaces & Interiors",
    description:
      "Your rooms are already deciding how you live. Petrina Salema helps change what they decide, for homes and guest stays.",
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
      "Your rooms are already deciding how you live. Homes and hospitality spaces, Vienna and remote.",
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
  <html lang="en" className="h-full antialiased">
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
