import type { Metadata, Viewport } from "next";
import type { FC, ReactNode } from "react";

import { CookieBanner } from "./components/CookieBanner";
import "./globals.css";

export const metadata: Metadata = {
  title: "Studio Ashby | Interior Design, Architecture & Creative Direction",
  description:
    "Studio Ashby crafts spaces of authenticity and elegance—layering art, antiques, and craftsmanship into interiors with lasting character and soul.",
  applicationName: "Studio Ashby",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#633B2F",
};

type Props = {
  children: ReactNode;
};

const RootLayout: FC<Props> = ({ children }) => (
  <html lang="en" className="h-full antialiased">
    <body
      data-id="app-body"
      className="flex min-h-full flex-col bg-cream text-brown"
    >
      {children}
      <CookieBanner />
    </body>
  </html>
);

export default RootLayout;
