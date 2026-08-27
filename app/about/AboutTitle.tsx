import type { FC } from "react";

import { DsText } from "@/app/components/ds/DsText";
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
    <DsText data-id="about-title" variant="h2">
      {title}
      {subtitle && ","}
      {subtitle && (
        <span
          data-id="about-title-subtitle"
          className={cn(
            "ml-[10px] inline-block font-[family-name:var(--font-playfair)]",
            "text-[length:var(--text-copy)] leading-[var(--leading-copy)] font-[350] tracking-normal normal-case",
          )}
        >
          {subtitle}
        </span>
      )}
    </DsText>
  );
};
