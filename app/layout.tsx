import type { Metadata, Viewport } from "next";
import { Playfair_Display } from "next/font/google";
import type { FC, ReactNode } from "react";

import { COLOR_HEX, themeRootCss } from "@/lib/colors";
import { SITE } from "@/lib/site";

import { CookieBanner } from "./components/CookieBanner";
import { VercelAnalytics } from "./components/VercelAnalytics";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-playfair-face",
  style: ["normal", "italic"],
});

const metadataBase = new URL(SITE.url);

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: "Petrina Salema",
    template: "%s",
  },
  description:
    "Your space is shaping how you live. I help people design spaces to redefine living for them and their guests, in Vienna and remotely abroad.",
  applicationName: SITE.name,
  openGraph: {
    type: "website",
    locale: "en_AT",
    url: SITE.url,
    siteName: SITE.name,
    title: "Petrina Salema",
    description:
      "Your space is shaping how you live. I help people design spaces to redefine living for them and their guests.",
    images: [
      {
        url: SITE.ogImage,
        width: 1200,
        height: 630,
        alt: SITE.ogImageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Petrina Salema",
    description:
      "Your space is shaping how you live. Homes and hospitality spaces, in Vienna and remotely abroad.",
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
  themeColor: COLOR_HEX.inverse,
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

const themeRoot = themeRootCss();

const RootLayout: FC<Props> = ({ children }) => (
  <html lang="en" className={`${playfair.variable} h-full antialiased`}>
    <style
      href="theme-root"
      precedence="default"
      dangerouslySetInnerHTML={{ __html: themeRoot }}
    />
    <body
      data-id="app-body"
      className="flex min-h-full flex-col bg-canvas text-ink"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      {children}
      <CookieBanner />
      <VercelAnalytics />
    </body>
  </html>
);

export default RootLayout;
