import Link from "next/link";
import type { FC } from "react";

import { cn } from "@/lib/cn";

type Props = {
  href: string;
  name: string;
};

export const WorkNextLink: FC<Props> = ({ href, name }) => (
  <Link
    href={href}
    data-id="work-details-next"
    className={cn(
      "group/next relative z-10 mt-[54px] inline-block max-w-full text-chalk no-underline",
      "outline-none focus-visible:opacity-70",
    )}
  >
    <span
      data-id="work-details-next-label"
      className={cn(
        "font-[family-name:var(--font-matter)]",
        "text-[length:var(--text-copy)] leading-[var(--leading-copy)] tracking-[0.15em] uppercase",
      )}
    >
      Next:
      <span
        data-id="work-details-next-arrow"
        aria-hidden
        className={cn(
          "ml-[0.35em] inline-block opacity-0",
          "transition-opacity duration-200 ease-[var(--ease-out-soft)]",
          "group-hover/next:opacity-100 group-focus-visible/next:opacity-100",
          "motion-reduce:transition-none",
        )}
      >
        →
      </span>
    </span>
    <span
      data-id="work-details-next-name"
      className={cn(
        "mt-[10px] block font-[family-name:var(--font-playfair)]",
        "text-[length:var(--text-copy)] leading-[var(--leading-copy)] font-[350] tracking-normal normal-case",
      )}
    >
      {name}
    </span>
  </Link>
);
