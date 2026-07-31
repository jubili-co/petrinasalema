import type { FC } from "react";

import { cn } from "@/lib/cn";

type Props = {
  title?: string | null;
  subtitle?: string | null;
};

export const AboutTitle: FC<Props> = ({ title, subtitle }) => {
  if (!title) {
    return null;
  }

  return (
    <h2
      data-id="about-title"
      className={cn(
        "m-0 mb-[18px] font-[family-name:var(--font-matter)]",
        "text-[13px] leading-[18px] tracking-[0.15em] uppercase",
      )}
    >
      {title}
      {subtitle && (
        <span
          data-id="about-title-subtitle"
          className={cn(
            "ml-[10px] inline-block font-[family-name:var(--font-antiqua)]",
            "text-[13px] leading-[18px] font-[350] tracking-normal normal-case",
          )}
        >
          {subtitle}
        </span>
      )}
    </h2>
  );
};
