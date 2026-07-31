import Image from "next/image";
import type { FC } from "react";

import { cn } from "@/lib/cn";

export type TextImageSection = {
  type: "textImage";
  imagePosition: string;
  title: string | null;
  paragraphs: string[];
  color?: string | null;
  image?: string | null;
  textPosition?: string;
};

type Props = {
  section: TextImageSection;
};

export const AboutTextImage: FC<Props> = ({ section }) => {
  const { title, paragraphs, color, image, imagePosition } = section;
  const isImageLeft = imagePosition === "left";
  const background = color || "#F9F3F0";
  const isDark = isDarkColor(background);

  return (
    <section
      data-id="about-text-image"
      className={cn("grid min-h-[80dvh] grid-cols-1 md:grid-cols-2", {
        "md:[direction:rtl]": isImageLeft,
      })}
    >
      <div
        data-id="about-text-image-copy"
        className={cn(
          "flex flex-col justify-end px-6 py-16 md:px-12 md:py-20",
          "md:[direction:ltr]",
          { "text-cream": isDark, "text-brown": !isDark },
        )}
        style={{ backgroundColor: background }}
      >
        {title && (
          <h2
            data-id="about-text-image-title"
            className="mb-8 font-[family-name:var(--font-matter)] text-[13px] tracking-[0.15em] uppercase"
          >
            {title}
          </h2>
        )}
        <div
          data-id="about-text-image-body"
          className="max-w-[420px] space-y-5"
        >
          {paragraphs.map((paragraph) => (
            <p
              key={paragraph.slice(0, 48)}
              data-id="about-text-image-paragraph"
              className="font-[family-name:var(--font-antiqua)] text-[17px] leading-[1.55]"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      <div
        data-id="about-text-image-media"
        className="relative min-h-[60vw] md:min-h-full md:[direction:ltr]"
      >
        {image && (
          <Image
            src={image}
            alt={title || "Studio Ashby"}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        )}
      </div>
    </section>
  );
};

function isDarkColor(hex: string): boolean {
  const value = hex.replace("#", "");
  if (value.length !== 6) {
    return false;
  }
  const red = Number.parseInt(value.slice(0, 2), 16);
  const green = Number.parseInt(value.slice(2, 4), 16);
  const blue = Number.parseInt(value.slice(4, 6), 16);
  const luminance = (0.299 * red + 0.587 * green + 0.114 * blue) / 255;
  return luminance < 0.55;
}
