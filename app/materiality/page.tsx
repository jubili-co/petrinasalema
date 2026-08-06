import type { Metadata } from "next";
import type { FC } from "react";

import { DsMarkdown } from "@/app/components/ds/DsMarkdown";
import AboutMaterialityCopy from "@/content/about-materiality.mdx";
import materiality from "@/lib/data/materiality.json";
import { resolveProjectImageSrc } from "@/lib/googleDrive";

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

const MaterialityPage: FC = () => {
  const { section } = materiality;
  const {
    imagePosition,
    dynamicHeight,
    title,
    subtitle,
    textPosition,
    color,
    image,
    imageColor,
    imageBorder,
  } = section;
  const resolvedImage = image ? resolveProjectImageSrc(image) : null;
  const resolvedSection: TextImageSection = {
    type: "textImage",
    imagePosition,
    dynamicHeight,
    title,
    subtitle,
    textPosition,
    color,
    image: resolvedImage,
    imageColor,
    imageBorder,
  };

  return (
    <main data-id="materiality-page" className="min-h-dvh bg-dotto-cream pt-[78px]">
      <SiteHeader />
      <AboutTextImage
        section={resolvedSection}
        body={
          <DsMarkdown className={materialityMarkdownClassName}>
            <AboutMaterialityCopy />
          </DsMarkdown>
        }
      />
    </main>
  );
};

export default MaterialityPage;
