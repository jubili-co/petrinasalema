import Image from "next/image";
import type { FC } from "react";

import { cn } from "@/lib/cn";

type Fade = "right" | "left" | "up" | "down" | "in" | "diag";

type Props = {
  src: string;
  fade: Fade;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  "data-id"?: string;
};

/**
 * Archival drawing in the ghost register: a crop window onto line art,
 * faded into the layout. Callers own placement, rotation, and scale.
 * Content that must stay above it needs `relative` (paint order).
 */
export const SketchArtifact: FC<Props> = ({
  src,
  fade,
  className,
  imageClassName,
  sizes = "50vw",
  "data-id": dataId = "sketch-artifact",
}) => {
  const maskClassName = FADE_MASK[fade];

  return (
    <div
      data-id={dataId}
      aria-hidden
      className={cn(
        "pointer-events-none absolute overflow-hidden select-none",
        maskClassName,
        className,
      )}
    >
      <Image
        src={src}
        alt=""
        fill
        sizes={sizes}
        data-id="sketch-artifact-image"
        className={cn("object-cover opacity-15", imageClassName)}
      />
    </div>
  );
};

const FADE_MASK: Record<Fade, string> = {
  right: cn(
    "[mask-image:linear-gradient(to_right,transparent_0%,rgb(0_0_0_/_0.08)_18%,rgb(0_0_0_/_0.4)_42%,rgb(0_0_0_/_0.85)_72%,#000_100%)]",
    "[-webkit-mask-image:linear-gradient(to_right,transparent_0%,rgb(0_0_0_/_0.08)_18%,rgb(0_0_0_/_0.4)_42%,rgb(0_0_0_/_0.85)_72%,#000_100%)]",
  ),
  left: cn(
    "[mask-image:linear-gradient(to_left,transparent_0%,rgb(0_0_0_/_0.08)_18%,rgb(0_0_0_/_0.4)_42%,rgb(0_0_0_/_0.85)_72%,#000_100%)]",
    "[-webkit-mask-image:linear-gradient(to_left,transparent_0%,rgb(0_0_0_/_0.08)_18%,rgb(0_0_0_/_0.4)_42%,rgb(0_0_0_/_0.85)_72%,#000_100%)]",
  ),
  up: cn(
    "[mask-image:linear-gradient(to_top,transparent_0%,rgb(0_0_0_/_0.08)_18%,rgb(0_0_0_/_0.4)_42%,rgb(0_0_0_/_0.85)_72%,#000_100%)]",
    "[-webkit-mask-image:linear-gradient(to_top,transparent_0%,rgb(0_0_0_/_0.08)_18%,rgb(0_0_0_/_0.4)_42%,rgb(0_0_0_/_0.85)_72%,#000_100%)]",
  ),
  down: cn(
    "[mask-image:linear-gradient(to_bottom,transparent_0%,rgb(0_0_0_/_0.08)_18%,rgb(0_0_0_/_0.4)_42%,rgb(0_0_0_/_0.85)_72%,#000_100%)]",
    "[-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,rgb(0_0_0_/_0.08)_18%,rgb(0_0_0_/_0.4)_42%,rgb(0_0_0_/_0.85)_72%,#000_100%)]",
  ),
  in: cn(
    "[mask-image:radial-gradient(ellipse_at_center,#000_0%,rgb(0_0_0_/_0.85)_32%,rgb(0_0_0_/_0.4)_58%,rgb(0_0_0_/_0.08)_78%,transparent_100%)]",
    "[-webkit-mask-image:radial-gradient(ellipse_at_center,#000_0%,rgb(0_0_0_/_0.85)_32%,rgb(0_0_0_/_0.4)_58%,rgb(0_0_0_/_0.08)_78%,transparent_100%)]",
  ),
  diag: cn(
    "[mask-image:linear-gradient(to_bottom_right,transparent_0%,rgb(0_0_0_/_0.08)_18%,rgb(0_0_0_/_0.4)_42%,rgb(0_0_0_/_0.85)_72%,#000_100%)]",
    "[-webkit-mask-image:linear-gradient(to_bottom_right,transparent_0%,rgb(0_0_0_/_0.08)_18%,rgb(0_0_0_/_0.4)_42%,rgb(0_0_0_/_0.85)_72%,#000_100%)]",
  ),
};
