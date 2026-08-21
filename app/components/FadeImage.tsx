"use client";

import Image from "next/image";
import { useState, type FC } from "react";

import { cn } from "@/lib/cn";

type Props = {
  src: string;
  alt: string;
  placeholder?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  className?: string;
  "data-id"?: string;
};

export const FadeImage: FC<Props> = ({
  src,
  alt,
  placeholder,
  fill = false,
  width,
  height,
  sizes,
  priority,
  className,
  "data-id": dataId = "fade-image",
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const markLoaded = (): void => {
    setIsLoaded(true);
  };

  return (
    <div
      data-id={dataId}
      className={cn("overflow-hidden", {
        "absolute inset-0": fill,
        "relative block w-full": !fill,
      })}
    >
      {placeholder && (
        // Tiny local/CDN stand-in — skip next/image so it paints without the optimizer hop.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={placeholder}
          alt=""
          aria-hidden
          decoding="async"
          data-id="fade-image-placeholder"
          className={cn(
            "absolute inset-0 h-full w-full",
            "scale-110 object-cover blur-md",
          )}
        />
      )}
      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={width}
        height={height}
        sizes={sizes}
        priority={priority}
        onLoad={markLoaded}
        data-id="fade-image-photo"
        className={cn(
          className,
          "transition-opacity duration-200 ease-[var(--ease-out-soft)] motion-reduce:transition-none",
          {
            "relative z-[1]": !fill,
            "opacity-0": !isLoaded,
            "opacity-100": isLoaded,
          },
        )}
      />
    </div>
  );
};
