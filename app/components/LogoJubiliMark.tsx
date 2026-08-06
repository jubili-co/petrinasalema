import type { FC } from "react";

import { cn } from "@/lib/cn";

type Props = {
  className?: string;
};

/** SVG mark as a CSS mask so fill follows `currentColor` / `bg-current`. */
export const LogoJubiliMark: FC<Props> = ({ className }) => (
  <span
    role="img"
    aria-label="Jubili"
    data-id="logo-jubili-mark"
    className={cn(
      "inline-block h-[36px] aspect-square bg-current",
      "[mask-image:url('/images/logo-mark-jubili.svg')]",
      "[mask-size:contain] [mask-repeat:no-repeat] [mask-position:center]",
      "[-webkit-mask-image:url('/images/logo-mark-jubili.svg')]",
      "[-webkit-mask-size:contain] [-webkit-mask-repeat:no-repeat] [-webkit-mask-position:center]",
      className,
    )}
  />
);
