import type { FC } from "react";

import { cn } from "@/lib/cn";

type Props = {
  className?: string;
};

export const LogoJubiliMark: FC<Props> = ({ className }) => (
  // eslint-disable-next-line @next/next/no-img-element -- brand SVG mark; next/image rasterizes SVG poorly
  <img
    data-id="logo-jubili-mark"
    src="/images/logo-mark-jubili.svg"
    alt="Jubili"
    width={499}
    height={401}
    className={cn("h-[36px] w-auto", className)}
  />
);
