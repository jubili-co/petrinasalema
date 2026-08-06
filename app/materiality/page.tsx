import type { Metadata } from "next";
import type { FC } from "react";

import { DsMarkdown } from "@/app/components/ds/DsMarkdown";
import AboutMaterialityCopy from "@/content/about-materiality.mdx";
import materiality from "@/lib/data/materiality.json";

import {
  AboutTextImage,
  type TextImageSection,
} from "../about/AboutTextImage";
import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = {
  title: materiality.seoTitle,
  description: materiality.seoDescription,
};

const materialityMarkdownClassName = "w-full max-w-[568px] md:w-[70%]";

const MaterialityPage: FC = () => (
  <main data-id="materiality-page" className="min-h-dvh bg-dotto-cream pt-[78px]">
    <SiteHeader />
    <AboutTextImage
      section={materiality.section as TextImageSection}
      body={
        <DsMarkdown className={materialityMarkdownClassName}>
          <AboutMaterialityCopy />
        </DsMarkdown>
      }
    />
  </main>
);

export default MaterialityPage;
