import type { Metadata } from "next";
import type { FC } from "react";

import studio from "@/lib/data/studio.json";

import { SiteHeader } from "../components/SiteHeader";
import { StudioMedia } from "./StudioMedia";
import { StudioPanel, type StudioContent } from "./StudioPanel";

export const metadata: Metadata = {
  title: studio.seoTitle,
  description: studio.seoDescription,
};

const StudioPage: FC = () => {
  const content = studio as StudioContent;

  return (
    <main data-id="studio-page" className="min-h-dvh bg-dotto-cream">
      <SiteHeader />
      <section
        data-id="studio-section"
        className="flex min-h-dvh flex-col pt-[78px] md:flex-row"
      >
        <StudioMedia images={studio.images} />
        <StudioPanel studio={content} />
      </section>
    </main>
  );
};

export default StudioPage;
