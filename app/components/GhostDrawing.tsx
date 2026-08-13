import Image from "next/image";
import type { FC } from "react";

import { cn } from "@/lib/cn";
import { probeRemoteImageSize } from "@/lib/imageSize";

type Props = {
  src: string;
  className?: string;
  sizes?: string;
  "data-id"?: string;
};

/**
 * Archival drawing in the ghost register: decorative, low opacity, behind
 * content, cropped by its positioned ancestor. Callers own placement and
 * sizing via className; content that must stay legible above it needs
 * `relative` (paint order), not a z-index.
 */
export const GhostDrawing: FC<Props> = async ({
  src,
  className,
  sizes,
  "data-id": dataId = "ghost-drawing",
}) => {
  const size = await probeRemoteImageSize(src);
  if (!size) {
    return null;
  }

  const { width, height } = size;

  return (
    <Image
      src={src}
      alt=""
      width={width}
      height={height}
      sizes={sizes}
      aria-hidden
      data-id={dataId}
      className={cn(
        "absolute",
        "opacity-[0.14]",
        "pointer-events-none",
        className,
      )}
    />
  );
};
