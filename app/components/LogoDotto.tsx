import type { FC } from "react";

import { cn } from "@/lib/cn";

type Props = {
  className?: string;
};

export const LogoDotto: FC<Props> = ({ className }) => (
  <span
    data-id="logo-dotto"
    className={cn(
      "block font-[family-name:var(--font-beaux)]",
      "text-[28px] leading-none tracking-[0.12em] uppercase md:text-[34px]",
      className,
    )}
    aria-label="Dotto"
  >
    Dotto
  </span>
);
