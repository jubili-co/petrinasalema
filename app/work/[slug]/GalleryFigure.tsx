import type { FC } from "react";

import { FadeImage } from "@/app/components/FadeImage";
import { cn } from "@/lib/cn";
import type { WorkImageFrame } from "@/lib/work";
import type { GalleryImage } from "@/lib/workGallery";

type Props = {
  image: GalleryImage;
  name: string;
  widthClass?: string;
  sizes: string;
};

export const GalleryFigure: FC<Props> = ({
  image,
  name,
  widthClass,
  sizes,
}) => {
  const { src, alt, caption, width, height, placeholder, frame } = image;
  const aspectClass = getAspectClass(frame);
  const hasFrame = Boolean(aspectClass);
  const photoAlt = alt || name;

  return (
    <figure
      data-id="work-gallery-figure"
      className={cn("relative m-0 w-full min-w-0", widthClass)}
    >
      {hasFrame && (
        <div
          data-id="work-gallery-crop"
          className={cn("relative w-full overflow-hidden", aspectClass)}
        >
          <FadeImage
            src={src}
            alt={photoAlt}
            placeholder={placeholder}
            fill
            sizes={sizes}
            data-id="work-gallery-image"
            className="object-cover"
          />
        </div>
      )}
      {!hasFrame && (
        <FadeImage
          src={src}
          alt={photoAlt}
          placeholder={placeholder}
          width={width}
          height={height}
          sizes={sizes}
          data-id="work-gallery-image"
          className="h-auto w-full"
        />
      )}
      {caption.length > 0 && (
        <figcaption
          data-id="work-gallery-caption"
          className={cn(
            "px-6 py-3 font-[family-name:var(--font-playfair)]",
            "text-[13px] leading-[18px] font-[350] text-dotto-brown md:px-12",
          )}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

function getAspectClass(
  frame: WorkImageFrame | undefined,
): string | undefined {
  return frame && FRAME_ASPECT_CLASS[frame];
}

const FRAME_ASPECT_CLASS: Record<WorkImageFrame, string> = {
  square: "aspect-square",
  portrait: "aspect-[4/5]",
  landscape: "aspect-[3/2]",
};
