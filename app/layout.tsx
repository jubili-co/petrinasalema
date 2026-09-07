import type { Metadata, Viewport } from "next";
import { Playfair_Display } from "next/font/google";
import type { FC, ReactNode } from "react";

import { JsonLd } from "@/app/components/JsonLd";
import { COLOR_HEX, themeRootCss } from "@/lib/colors";
import home from "@/lib/data/home.json";
import { siteJsonLd } from "@/lib/seo";
import { SITE } from "@/lib/site";

import { CookieBanner } from "./components/CookieBanner";
import { PostHogAnalytics } from "./components/PostHogAnalytics";
import { VercelAnalytics } from "./components/VercelAnalytics";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-playfair-face",
  style: ["normal", "italic"],
});

const metadataBase = new URL(SITE.url);
const { seoDescription } = home;
const siteGraph = siteJsonLd(seoDescription);

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: SITE.name,
    template: "%s",
  },
  description: seoDescription,
  applicationName: SITE.name,
  openGraph: {
    type: "website",
    locale: "en_AT",
    siteName: SITE.name,
    title: SITE.name,
    description: seoDescription,
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
    title: SITE.name,
    description: seoDescription,
    images: [SITE.ogImage],
  },
  appleWebApp: {
    capable: true,
    title: SITE.name,
    statusBarStyle: "default",
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
      <JsonLd data={siteGraph} />
      {children}
      <CookieBanner />
      <VercelAnalytics />
      <PostHogAnalytics />
    </body>
  </html>
);

export default RootLayout;
