import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";

import { cn } from "@/lib/cn";

type ProjectItem = {
  title: string;
  slug: string;
  image: string;
  alt: string;
};

type Props = {
  item: ProjectItem;
  className?: string;
  sizes: string;
  isLandscape?: boolean;
};

export const HomeProjectCard: FC<Props> = ({
  item,
  className,
  sizes,
  isLandscape = false,
}) => (
  <Link
    href={`/project/${item.slug}`}
    data-id="home-project-card"
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
      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
    />
    <div
      data-id="home-project-card-overlay"
      className={cn(
        "absolute inset-0 bg-black/0 transition-colors duration-300 ease-out",
        "group-hover:bg-black/15",
      )}
    />
    <h2
      data-id="home-project-card-title"
      className={cn(
        "absolute bottom-6 left-6 z-[1] md:bottom-8 md:left-8",
        "font-[family-name:var(--font-matter)] text-[13px] leading-[18px] tracking-[0.15em] uppercase",
        "text-cream",
      )}
    >
      {item.title}
    </h2>
  </Link>
);
