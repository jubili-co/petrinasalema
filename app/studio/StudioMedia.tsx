import Image from "next/image";
import type { FC } from "react";

import { cn } from "@/lib/cn";
import { resolveProjectImageSrc } from "@/lib/googleDrive";

type Props = {
  images: string[];
};

export const StudioMedia: FC<Props> = ({ images }) => (
  <div
    data-id="studio-media"
    className={cn(
      "flex w-full flex-col gap-0.5 bg-dotto-cream",
      "md:sticky md:top-[78px] md:h-[calc(100dvh-78px)] md:w-1/2",
    )}
  >
    {images.map((image, index) => (
      <StudioMediaFrame
        key={image}
        src={resolveProjectImageSrc(image)}
        priority={index === 0}
      />
    ))}
  </div>
);

type StudioMediaFrameProps = {
  src: string;
  priority: boolean;
};

const StudioMediaFrame: FC<StudioMediaFrameProps> = ({ src, priority }) => (
  <div
    data-id="studio-media-frame"
    className={cn(
      "relative w-full",
      "min-h-[70vw] flex-1",
      "md:min-h-0",
    )}
  >
    <Image
      src={src}
      alt="Petrina Salema studio"
      fill
      priority={priority}
      sizes="(min-width: 768px) 50vw, 100vw"
      className="object-cover"
    />
  </div>
);
