import type { Metadata, Viewport } from "next";
import type { FC, ReactNode } from "react";

import { COLOR_HEX } from "@/lib/colors";

import { CookieBanner } from "./components/CookieBanner";
import "./globals.css";

export const metadata: Metadata = {
  title: "Petrina Salema | Interior Design & Architecture",
  description:
    "Petrina Salema is an architect and interior designer based in Vienna — spaces that feel considered rather than styled, grounded in material and built to hold up in use.",
  applicationName: "Petrina Salema",
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
