import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";

import { cn } from "@/lib/cn";
import type { HomeWorkCardItem } from "@/lib/work";

type Props = {
  item: HomeWorkCardItem;
  className?: string;
  sizes: string;
  isLandscape?: boolean;
};

export const HomeWorkCard: FC<Props> = ({
  item,
  className,
  sizes,
  isLandscape = false,
}) => (
  <Link
    href={`/work/${item.slug}`}
    data-id="home-work-card"
    className={cn(
      "group relative block overflow-hidden",
      {
        "aspect-[1440/1860] md:aspect-auto md:h-[min(1240px,100dvh)]":
          !isLandscape,
        "aspect-[3600/2325] md:aspect-auto md:h-[100dvh]": isLandscape,
      },
      className,
    )}
  >
    <Image
      src={item.image}
      alt={item.alt}
      fill
      sizes={sizes}
      className="object-cover"
    />
    <div
      data-id="home-work-card-overlay"
      className={cn(
        "absolute inset-0 z-[1]",
        "bg-black/40",
        "opacity-0 transition-opacity duration-300 ease-out",
        "group-hover:opacity-100",
      )}
    />
    <h2
      data-id="home-work-card-title"
      className={cn(
        "absolute inset-0 z-[2] flex items-center justify-center p-12 text-center text-balance md:p-20",
        "font-semibold",
        "font-[family-name:var(--font-matter)] text-[13px] leading-[18px] tracking-[0.15em] uppercase",
        "text-dotto-cream opacity-0 transition-opacity duration-300 ease-out",
        "group-hover:opacity-100",
      )}
    >
      {item.title}
    </h2>
  </Link>
);
