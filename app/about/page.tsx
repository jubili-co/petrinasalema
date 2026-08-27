import type { Metadata } from "next";
import type { FC, ReactNode } from "react";

import { DsMarkdown } from "@/app/components/ds/DsMarkdown";
import AboutJubiliCopy from "@/content/about-jubili.mdx";
import AboutPetrinaCopy from "@/content/about-petrina.mdx";
import about from "@/lib/data/about.json";
import { resolveProjectImageSrc } from "@/lib/googleDrive";

import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import {
  AboutWorkList,
  type WorkListItem,
  type WorkListSection,
} from "./AboutWorkList";
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
  };

  return (
    <main data-id="about-page" className="min-h-dvh bg-canvas">
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
  const workListSection = toWorkListSection(section);
  if (workListSection) {
    return <AboutWorkList section={workListSection} />;
  }

  const textImageSection = toTextImageSection(section);
  if (!textImageSection) {
    return null;
  }

  const { mdx } = textImageSection;
  const body = mdx && mdxBodyByKey[mdx];

  return <AboutTextImage section={textImageSection} body={body} />;
};

function toWorkListSection(section: AboutSection): WorkListSection | null {
  if (section.type !== "workList") {
    return null;
  }

  const { title, color, items = [], cta } = section;

  return {
    type: "workList",
    title,
    color,
    items: items.map(toWorkListItem),
    cta: cta
      ? {
          name: cta.name,
          role: cta.role,
          href: cta.href,
        }
      : null,
  };
}

type WorkListSource = {
  name: string;
  role: string;
  slug?: string;
};

function toWorkListItem({ name, role, slug }: WorkListSource): WorkListItem {
  const href = slug && workHref(slug);

  return { name, role, href };
}

function workHref(slug: string): string {
  return `/work/${slug}`;
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
  const resolvedImage = image ? resolveProjectImageSrc(image) : null;

  return {
    type: "textImage",
    imagePosition: imagePosition ?? "right",
    dynamicHeight,
    title,
    subtitle: "subtitle" in section ? (section.subtitle ?? null) : null,
    mdx: isAboutMdxKey(mdx) ? mdx : null,
    textPosition,
    color,
    image: resolvedImage,
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
  return value === "petrina" || value === "jubili";
}
