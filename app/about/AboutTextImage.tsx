import Image from "next/image";
import type { FC } from "react";

import { cn } from "@/lib/cn";

import { AboutBody, type TextParagraph } from "./AboutBody";
import { AboutTitle } from "./AboutTitle";

export type TextImageSection = {
  type: "textImage";
  imagePosition: string;
  title: string | null;
  subtitle?: string | null;
  paragraphs: TextParagraph[];
  color?: string | null;
  image?: string | null;
  imageBorder?: boolean;
  imageColor?: string | null;
  textPosition?: string;
  dynamicHeight?: boolean;
};

type Props = {
  section: TextImageSection;
  isFirst?: boolean;
  hasCareersOffset?: boolean;
};

export const AboutTextImage: FC<Props> = ({
  section,
  isFirst = false,
  hasCareersOffset = false,
}) => {
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
  const background = color || "#633B2F";
  const mediaBackground = imageColor || "#EEE9E2";

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
        className="flex w-full text-cream md:w-1/2 md:min-h-[100dvh]"
        style={{ backgroundColor: background }}
      >
        <div
          data-id="about-text-image-content"
          className={cn("flex w-full flex-col px-6 py-9 md:px-12 md:py-9", {
            "justify-start": isTextTop,
            "justify-end": !isTextTop,
          })}
        >
          <div
            data-id="about-text-image-inner"
            className={cn("w-full", {
              "pt-[100px] md:pt-20": isFirst && !hasCareersOffset,
              "mt-[50px] pt-20": hasCareersOffset,
            })}
          >
            <AboutTitle title={title} subtitle={subtitle} />
            <AboutBody paragraphs={paragraphs} />
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
            alt={title || "Dotto"}
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
