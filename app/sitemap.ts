import type { MetadataRoute } from "next";

import { SITE } from "@/lib/site";
import { WORK } from "@/lib/work";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/work",
    "/studio",
    "/book",
    "/about",
    "/newsletter",
    "/privacy",
    "/impressum",
  ].map((path) => ({
    url: `${SITE.url}${path}`,
  }));

  const workRoutes = WORK.map(({ slug }) => ({
    url: `${SITE.url}/work/${slug}`,
  }));

  return [...staticRoutes, ...workRoutes];
}
