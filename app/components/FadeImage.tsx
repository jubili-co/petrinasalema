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
    afterPaint(() => {
      setIsLoaded(true);
    });
  };

  return (
    <div
      data-id={dataId}
      className={cn("isolate overflow-hidden", {
        "absolute inset-0": fill,
        "relative block w-full": !fill,
      })}
    >
      {placeholder && (
        <div
          data-id="fade-image-placeholder-clip"
          aria-hidden
          className="absolute inset-0 overflow-hidden"
        >
          {/* Tiny stand-in — skip next/image so it paints without the optimizer hop. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={placeholder}
            alt=""
            decoding="async"
            data-id="fade-image-placeholder"
            className={cn(
              "size-full object-cover",
              "scale-110 blur-sm",
            )}
          />
        </div>
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
          "z-[1] transition-opacity duration-300 ease-[var(--ease-out-soft)] motion-reduce:transition-none",
          {
            relative: !fill,
            "opacity-0": !isLoaded,
            "opacity-100": isLoaded,
          },
        )}
      />
    </div>
  );
};

function afterPaint(callback: () => void): void {
  requestAnimationFrame(() => {
    requestAnimationFrame(callback);
  });
}
