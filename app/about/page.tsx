import type { Metadata } from "next";
import type { FC, ReactNode } from "react";

import { DsMarkdown } from "@/app/components/ds/DsMarkdown";
import AboutJubiliCopy from "@/content/about-jubili.mdx";
import AboutMaterialityCopy from "@/content/about-materiality.mdx";
import AboutPetrinaCopy from "@/content/about-petrina.mdx";
import about from "@/lib/data/about.json";

import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import {
  AboutProjectList,
  type ProjectListSection,
} from "./AboutProjectList";
import {
  AboutTextImage,
  type AboutMdxKey,
  type TextImageSection,
} from "./AboutTextImage";

export const metadata: Metadata = {
  title: about.seoTitle,
  description: about.seoDescription,
};

const aboutMarkdownClassName = "w-full max-w-[568px] md:w-[70%]";

const AboutPage: FC = () => {
  const mdxBodyByKey: Record<AboutMdxKey, ReactNode> = {
    petrina: (
      <DsMarkdown className={aboutMarkdownClassName}>
        <AboutPetrinaCopy />
      </DsMarkdown>
    ),
    jubili: (
      <DsMarkdown className={aboutMarkdownClassName}>
        <AboutJubiliCopy />
      </DsMarkdown>
    ),
    materiality: (
      <DsMarkdown className={aboutMarkdownClassName}>
        <AboutMaterialityCopy />
      </DsMarkdown>
    ),
  };

  return (
    <main data-id="about-page" className="min-h-dvh bg-dotto-cream">
      <SiteHeader />
      <div data-id="about-sections" className="pt-[78px]">
        {about.sections.map((section, index) => (
          <AboutPageSection
            key={`${section.type}-${index}`}
            section={section}
            mdxBodyByKey={mdxBodyByKey}
          />
        ))}
      </div>
      <SiteFooter />
    </main>
  );
};

export default AboutPage;

type AboutSection = (typeof about.sections)[number];

type AboutPageSectionProps = {
  section: AboutSection;
  mdxBodyByKey: Record<AboutMdxKey, ReactNode>;
};

const AboutPageSection: FC<AboutPageSectionProps> = ({
  section,
  mdxBodyByKey,
}) => {
  const projectListSection = toProjectListSection(section);
  if (projectListSection) {
    return <AboutProjectList section={projectListSection} />;
  }

  const textImageSection = toTextImageSection(section);
  if (!textImageSection) {
    return null;
  }

  const { mdx } = textImageSection;
  const body = mdx && mdxBodyByKey[mdx];

  return <AboutTextImage section={textImageSection} body={body} />;
};

function toProjectListSection(
  section: AboutSection,
): ProjectListSection | null {
  if (section.type !== "projectList") {
    return null;
  }

  const { title, color, items = [], cta } = section;

  return {
    type: "projectList",
    title,
    color,
    items: items.map((item) => ({
      name: item.name,
      role: item.role,
    })),
    cta: cta
      ? {
          name: cta.name,
          role: cta.role,
          href: cta.href,
        }
      : null,
  };
}

function toTextImageSection(section: AboutSection): TextImageSection | null {
  if (section.type !== "textImage") {
    return null;
  }

  const {
    imagePosition,
    dynamicHeight,
    title,
    textPosition,
    color,
    image,
    imageColor,
    imageBorder,
    mdx,
  } = section;
  const cta = "cta" in section ? section.cta : null;

  return {
    type: "textImage",
    imagePosition: imagePosition ?? "right",
    dynamicHeight,
    title,
    subtitle: "subtitle" in section ? (section.subtitle ?? null) : null,
    mdx: isAboutMdxKey(mdx) ? mdx : null,
    textPosition,
    color,
    image: image ?? null,
    imageColor,
    imageBorder,
    cta: cta
      ? {
          name: cta.name,
          role: cta.role,
          href: cta.href,
        }
      : null,
  };
}

function isAboutMdxKey(value: string | undefined): value is AboutMdxKey {
  return value === "petrina" || value === "jubili" || value === "materiality";
}
