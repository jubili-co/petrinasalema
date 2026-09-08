import type { Metadata } from "next";
import type { FC } from "react";

import { JsonLd } from "@/app/components/JsonLd";
import { SiteFooter } from "@/app/components/SiteFooter";
import { SiteHeader } from "@/app/components/SiteHeader";
import { StudioMedia } from "@/app/studio/StudioMedia";
import { StudioPanel, type StudioContent } from "@/app/studio/StudioPanel";
import { withTrackedCtas } from "@/lib/booking";
import studio from "@/lib/data/de/studio.json";
import { localizedPath } from "@/lib/locale";
import { absoluteUrl, localeWebPageLd, pageMetadata } from "@/lib/seo";

const path = localizedPath("/studio", "de-AT");

export const metadata: Metadata = pageMetadata({
  title: studio.seoTitle,
  description: studio.seoDescription,
  path,
  locale: "de-AT",
  languages: {
    en: absoluteUrl("/studio"),
    "de-AT": absoluteUrl(path),
  },
});

const DeStudioPage: FC = () => {
  const content = withTrackedCtas(studio as StudioContent);
  const pageLd = localeWebPageLd({
    path,
    name: studio.seoTitle,
    description: studio.seoDescription,
    inLanguage: "de-AT",
  });

  return (
    <main data-id="studio-page" className="min-h-dvh bg-canvas">
      <JsonLd data={pageLd} />
      <SiteHeader />
      <section
        data-id="studio-section"
        className="flex min-h-dvh flex-col pt-[78px] md:flex-row"
      >
        <StudioMedia images={studio.images} />
        <StudioPanel studio={content} />
      </section>
      <SiteFooter />
    </main>
  );
};

export default DeStudioPage;
