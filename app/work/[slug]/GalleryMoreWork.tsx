import Link from "next/link";
import type { FC } from "react";

import { cn } from "@/lib/cn";
import type { MoreWorkLink } from "@/lib/work";

type Props = {
  items: MoreWorkLink[];
};

export const GalleryMoreWork: FC<Props> = ({ items }) => (
  <aside
    data-id="work-gallery-more"
    className={cn(
      "hidden md:flex md:w-1/2 md:self-stretch",
      "items-center justify-center bg-dotto-cream p-6 md:p-10",
    )}
  >
    <div
      data-id="work-gallery-more-inner"
      className={cn(
        "flex aspect-square w-full max-w-[22rem] flex-col justify-center gap-8",
        "border border-dotto-brown px-8 py-10",
      )}
    >
      <h2
        data-id="work-gallery-more-title"
        className={cn(
          "m-0 font-[family-name:var(--font-matter)]",
          "text-[13px] leading-[18px] tracking-[0.15em] text-dotto-brown uppercase",
        )}
      >
        More work
      </h2>
      <ul data-id="work-gallery-more-list" className="m-0 list-none p-0">
        {items.map((item) => (
          <MoreWorkItem key={item.slug} item={item} />
        ))}
      </ul>
      <Link
        href="/work"
        data-id="work-gallery-more-all"
        className={cn(
          "group/cta inline-block font-[family-name:var(--font-matter)]",
          "text-[12px] tracking-[0.15em] text-dotto-brown uppercase",
          "transition-opacity duration-200 ease-out hover:opacity-70",
        )}
      >
        View all
        <span
          data-id="work-gallery-more-all-arrow"
          aria-hidden
          className="ml-[0.35em] inline-block transition-transform duration-200 ease-out group-hover/cta:translate-x-0.5"
        >
          →
        </span>
      </Link>
    </div>
  </aside>
);

type MoreWorkItemProps = {
  item: MoreWorkLink;
};

const MoreWorkItem: FC<MoreWorkItemProps> = ({ item }) => {
  const { name, slug } = item;

  return (
    <li data-id="work-gallery-more-item" className="mb-4 last:mb-0">
      <Link
        href={`/work/${slug}`}
        data-id="work-gallery-more-link"
        className={cn(
          "font-[family-name:var(--font-playfair)] text-[15px] leading-[22px] font-[350] text-dotto-brown",
          "underline-offset-4 transition-opacity duration-200 hover:opacity-50 hover:underline",
        )}
      >
        {name}
      </Link>
    </li>
  );
};
