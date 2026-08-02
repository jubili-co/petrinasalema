import type { FC } from "react";

import { cn } from "@/lib/cn";

type Props = {
  className?: string;
};

export const LogoPetina: FC<Props> = ({ className }) => (
  <div
    data-id="logo-petrina"
    className={cn(
      "block font-[family-name:var(--font-beaux)]",
      "font-semibold text-base leading-none tracking-[0.12em] uppercase",
      className,
    )}
  >
    <div aria-label="Petrina">Petrina</div>
    <div aria-label="Salema">Salema</div>
  </div>
);
