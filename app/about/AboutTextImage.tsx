import Image from "next/image";
import type { FC, ReactNode } from "react";

import { resolveCssColor } from "@/lib/colors";
import { cn } from "@/lib/cn";

import { AboutBody, type TextParagraph } from "./AboutBody";
import { AboutTitle } from "./AboutTitle";

export type AboutMdxKey = "petrina" | "jubili" | "materiality";

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
  } = section;
  const isImageLeft = imagePosition === "left";
  const isTextTop = textPosition !== "bottom";
  const background = resolveCssColor(color, "dotto-brown");
  const mediaBackground = resolveCssColor(imageColor, "dotto-sand");
  const sectionParagraphs = paragraphs ?? [];
  const hasParagraphs = sectionParagraphs.length > 0;

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
        className="flex w-full text-dotto-cream md:w-1/2 md:min-h-[100dvh]"
        style={{ backgroundColor: background }}
      >
        <div
          data-id="about-text-image-content"
          className={cn("flex w-full flex-col p-9 md:p-12", {
            "justify-start": isTextTop,
            "justify-end": !isTextTop,
          })}
        >
          <div data-id="about-text-image-inner" className="w-full">
            <AboutTitle title={title} subtitle={subtitle} />
            {body}
            {hasParagraphs && <AboutBody paragraphs={sectionParagraphs} />}
          </div>
        </div>
      </div>

      <div
        data-id="about-text-image-media"
        className="relative flex min-h-[100vw] w-full items-center justify-center md:min-h-[100dvh] md:w-1/2"
        style={{ backgroundColor: mediaBackground }}
      >
        {image && (
          <AboutMediaImage
            image={image}
            alt={title || "Petrina Salema"}
            hasBorder={Boolean(imageBorder)}
          />
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
  if (hasBorder) {
    return (
      <div
        data-id="about-text-image-border"
        className="flex h-full w-full items-center justify-center px-[20%] py-[10%]"
      >
        <Image
          src={image}
          alt={alt}
          width={1440}
          height={1860}
          sizes="(min-width: 768px) 30vw, 60vw"
          data-id="about-text-image-photo"
          className="h-auto w-full object-cover"
        />
      </div>
    );
  }

  return (
    <Image
      src={image}
      alt={alt}
      fill
      sizes="(min-width: 768px) 50vw, 100vw"
      data-id="about-text-image-photo"
      className="object-cover"
    />
  );
};
