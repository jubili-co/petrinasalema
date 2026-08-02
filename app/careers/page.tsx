import type { Metadata } from "next";
import type { FC } from "react";

import careers from "@/lib/data/careers.json";

import { AboutTextImage, type TextImageSection } from "../about/AboutTextImage";
import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = {
  title: careers.seoTitle,
  description: careers.seoDescription,
};

const CareersPage: FC = () => (
  <main data-id="careers-page" className="min-h-dvh bg-dotto-cream">
    <SiteHeader variant="home" />
    <AboutTextImage
      section={careers.section as TextImageSection}
      isFirst
      hasCareersOffset
    />
  </main>
);

export default CareersPage;
