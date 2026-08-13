import type { FC } from "react";

import { cn } from "@/lib/cn";

type Props = {
  className?: string;
};

export const LogoPetina: FC<Props> = ({ className }) => (
  <div
    data-id="logo-petrina"
    className={cn(
      "block whitespace-nowrap",
      "font-[family-name:var(--font-playfair)] font-normal text-[20px] leading-none tracking-tight uppercase md:text-[22px]",
      className,
    )}
  >
    Petrina Salema
  </div>
);
