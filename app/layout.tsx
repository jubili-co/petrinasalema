import type { Metadata, Viewport } from "next";
import type { FC, ReactNode } from "react";

import { COLOR_HEX } from "@/lib/colors";

import { CookieBanner } from "./components/CookieBanner";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dotto | Interior Design, Architecture & Creative Direction",
  description:
    "Dotto crafts spaces of authenticity and elegance—layering art, antiques, and craftsmanship into interiors with lasting character and soul.",
  applicationName: "Dotto",
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

const RootLayout: FC<Props> = ({ children }) => (
  <html lang="en" className="h-full antialiased">
    <body
      data-id="app-body"
      className="flex min-h-full flex-col bg-dotto-cream text-dotto-brown"
    >
      {children}
      <CookieBanner />
    </body>
  </html>
);

export default RootLayout;
