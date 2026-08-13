import Image from "next/image";
import type { FC } from "react";

import { cn } from "@/lib/cn";
import { probeRemoteImageSize } from "@/lib/imageSize";

type Props = {
  src: string;
  alt: string;
  caption?: string;
  sizes?: string;
  className?: string;
};

/** Archival drawing in the proof register: in the page flow, optionally captioned. */
export const PaperFigure: FC<Props> = async ({
  src,
  alt,
  caption,
  sizes = "100vw",
  className,
}) => {
  const size = await probeRemoteImageSize(src);
  if (!size) {
    return null;
  }

  const { width, height } = size;

  return (
    <figure data-id="paper-figure" className={cn("m-0", className)}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        data-id="paper-figure-image"
        className="h-auto w-full"
      />
      {caption && (
        <figcaption
          data-id="paper-figure-caption"
          className={cn(
            "mt-3 font-[family-name:var(--font-playfair)]",
            "text-[13px] leading-[18px] font-[350] text-dotto-brown/80",
          )}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
};
