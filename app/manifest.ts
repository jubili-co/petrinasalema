import type { MetadataRoute } from "next";

import { COLOR_HEX } from "@/lib/colors";
import home from "@/lib/data/home.json";
import { SITE } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: "Petrina",
    description: home.seoDescription,
    start_url: "/",
    display: "standalone",
    background_color: COLOR_HEX.canvas,
    theme_color: COLOR_HEX.inverse,
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
