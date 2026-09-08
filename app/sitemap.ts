import type { MetadataRoute } from "next";

import { localizedPath, VIENNA_HOME_SLUGS } from "@/lib/locale";
import { SITE } from "@/lib/site";
import { WORK } from "@/lib/work";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
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
    lastModified,
  }));
  const germanRoutes = ["/studio", "/book", ...viennaHomePaths()].map(
    (path) => ({
      url: `${SITE.url}${localizedPath(path, "de-AT")}`,
      lastModified,
    }),
  );
  const workRoutes = WORK.map(({ slug }) => ({
    url: `${SITE.url}/work/${slug}`,
    lastModified,
  }));

  return [...staticRoutes, ...germanRoutes, ...workRoutes];
}

function viennaHomePaths(): string[] {
  return VIENNA_HOME_SLUGS.map((slug) => `/work/${slug}`);
}
