import type { FC } from "react";

import { FadeImage } from "@/app/components/FadeImage";
import { cn } from "@/lib/cn";
import { resolveProjectImageSrc } from "@/lib/googleDrive";
import { placeholderSrc } from "@/lib/placeholderSrc";

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
        image={image}
        priority={index === 0}
      />
    ))}
  </div>
);

type StudioMediaFrameProps = {
  image: string;
  priority: boolean;
};

const StudioMediaFrame: FC<StudioMediaFrameProps> = ({ image, priority }) => {
  const src = resolveProjectImageSrc(image);
  const placeholder = placeholderSrc(image);

  return (
    <div
      data-id="studio-media-frame"
      className={cn(
        "relative w-full",
        "min-h-[70vw] flex-1",
        "md:min-h-0",
      )}
    >
      <FadeImage
        src={src}
        alt="Petrina Salema studio"
        placeholder={placeholder}
        fill
        priority={priority}
        sizes="(min-width: 768px) 50vw, 100vw"
        className="object-cover"
        data-id="studio-media-image"
      />
    </div>
  );
};
