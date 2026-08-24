import type { FC, ReactNode } from "react";

import { FadeImage } from "@/app/components/FadeImage";
import { LogoJubiliMark } from "@/app/components/LogoJubiliMark";
import { PaperWord } from "@/app/components/PaperWord";
import { SketchArtifact } from "@/app/components/SketchArtifact";
import { resolveCssColor } from "@/lib/colors";
import { cn } from "@/lib/cn";
import { PAPERS } from "@/lib/papers";
import { placeholderSrc } from "@/lib/placeholderSrc";

import { AboutBody, type TextParagraph } from "./AboutBody";
import {
  AboutInviteCtaLink,
  type AboutInviteCta,
} from "./AboutInviteCta";
import { AboutTitle } from "./AboutTitle";

export type AboutMdxKey = "petrina" | "jubili";

export type TextImageSection = {
  type: "textImage";
  imagePosition: string;
  title?: string | null;
  subtitle?: string | null;
  /** Stable key for MDX body — independent of optional display title. */
  mdx?: AboutMdxKey | null;
  paragraphs?: TextParagraph[];
  color?: string | null;
  image?: string | null;
  imageBorder?: boolean;
  imageColor?: string | null;
  textPosition?: string;
  dynamicHeight?: boolean;
  cta?: AboutInviteCta | null;
};

type Props = {
  section: TextImageSection;
  body?: ReactNode;
};

export const AboutTextImage: FC<Props> = ({ section, body }) => {
  const {
    title,
    subtitle,
    paragraphs,
    color,
    image,
    imageBorder,
    imageColor,
    imagePosition,
    textPosition,
    mdx,
    cta,
  } = section;
  const isImageLeft = imagePosition === "left";
  const isTextTop = textPosition !== "bottom";
  const background = resolveCssColor(color, "dotto-brown");
  const mediaBackground = resolveCssColor(imageColor, "dotto-sand");
  const sectionParagraphs = paragraphs ?? [];
  const hasParagraphs = sectionParagraphs.length > 0;
  const shouldShowJubiliMark = mdx === "jubili";
  const sketchSrc = `${PAPERS}/neu-erdgeschoss--plan-line.webp`;

  return (
    <section
      data-id="about-text-image"
      className={cn(
        "flex min-h-[100dvh] w-full flex-col md:flex-row md:flex-nowrap",
        {
          "md:flex-row-reverse": isImageLeft,
        },
      )}
    >
      <div
        data-id="about-text-image-copy"
        className="relative flex w-full overflow-hidden text-dotto-cream md:w-1/2 md:min-h-[100dvh]"
        style={{ backgroundColor: background }}
      >
        {imageBorder && (
          <PaperWord
            word="erdgeschossAlt"
            tone="chalk"
            data-id="about-text-image-word"
            className="-right-8 top-12 w-32 rotate-[14deg] md:w-40"
          />
        )}
        <div
          data-id="about-text-image-content"
          className={cn("relative flex w-full flex-col p-9 md:p-12", {
            "justify-start": isTextTop,
            "justify-end": !isTextTop,
          })}
        >
          <div data-id="about-text-image-inner" className="w-full">
            <AboutTitle title={title} subtitle={subtitle} />
            {body}
            {hasParagraphs && <AboutBody paragraphs={sectionParagraphs} />}
            {cta && <AboutInviteCtaLink cta={cta} />}
          </div>
        </div>
      </div>

      <div
        data-id="about-text-image-media"
        className="relative flex min-h-[100vw] w-full items-center justify-center overflow-hidden md:min-h-[100dvh] md:w-1/2"
        style={{ backgroundColor: mediaBackground }}
      >
        {imageBorder && (
          <SketchArtifact
            src={sketchSrc}
            fade="in"
            sizes="(min-width: 768px) 50vw, 100vw"
            data-id="about-portrait-sketch"
            className="-top-[18%] -left-[22%] h-[130%] w-[140%]"
            imageClassName="-rotate-[9deg] scale-[1.4] object-[30%_60%]"
          />
        )}
        {image && (
          <AboutMediaImage
            image={image}
            alt={title || "Petrina Salema"}
            hasBorder={Boolean(imageBorder)}
          />
        )}
        {shouldShowJubiliMark && (
          <div
            data-id="about-text-image-jubili-mark"
            className={cn(
              "pointer-events-none absolute inset-0 z-[1]",
              "flex items-center justify-center",
            )}
          >
            <LogoJubiliMark
              className={cn("h-[52px] md:h-[72px]", "text-dotto-cream")}
            />
          </div>
        )}
      </div>
    </section>
  );
};

type AboutMediaImageProps = {
  image: string;
  alt: string;
  hasBorder: boolean;
};

const AboutMediaImage: FC<AboutMediaImageProps> = ({
  image,
  alt,
  hasBorder,
}) => {
  const placeholder = placeholderSrc(image);

  if (hasBorder) {
    return (
      <div
        data-id="about-text-image-border"
        className="relative flex h-full w-full items-center justify-center px-[20%] py-[10%]"
      >
        <FadeImage
          src={image}
          alt={alt}
          placeholder={placeholder}
          width={1023}
          height={1537}
          sizes="(min-width: 768px) 30vw, 60vw"
          data-id="about-text-image-photo"
          className="h-auto w-full object-cover"
        />
      </div>
    );
  }

  return (
    <FadeImage
      src={image}
      alt={alt}
      placeholder={placeholder}
      fill
      sizes="(min-width: 768px) 50vw, 100vw"
      data-id="about-text-image-photo"
      className="object-cover"
    />
  );
};
