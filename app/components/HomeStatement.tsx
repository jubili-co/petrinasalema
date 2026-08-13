import Image from "next/image";
import type { FC } from "react";

import { cn } from "@/lib/cn";

type Props = {
  hook: string;
  support: string;
};

const PLAN_SRC = "/papers/alt-erdgeschoss--plan-line.webp";
const PLAN_ALT =
  "Hand-drawn ground floor plan of the house before the 1976 addition";

export const HomeStatement: FC<Props> = ({ hook, support }) => (
  <section
    data-id="home-statement"
    className={cn(
      "relative flex w-full justify-center bg-dotto-cream",
      "px-6 pt-[130px] pb-16 md:px-12 md:pt-[170px] md:pb-24",
    )}
  >
    <div
      data-id="home-statement-plan"
      className={cn(
        "absolute top-0 right-0 h-full w-1/2 overflow-hidden",
        "[mask-image:linear-gradient(to_right,transparent_0%,rgb(0_0_0_/_0.08)_18%,rgb(0_0_0_/_0.4)_42%,rgb(0_0_0_/_0.85)_72%,#000_100%)]",
        "[-webkit-mask-image:linear-gradient(to_right,transparent_0%,rgb(0_0_0_/_0.08)_18%,rgb(0_0_0_/_0.4)_42%,rgb(0_0_0_/_0.85)_72%,#000_100%)]",
      )}
    >
      <Image
        src={PLAN_SRC}
        alt={PLAN_ALT}
        fill
        sizes="300px"
        data-id="home-statement-plan-image"
        className="object-cover rotate-30 scale-150 opacity-15"
      />
    </div>
    <div
      data-id="home-statement-inner"
      className="relative flex w-full max-w-[640px] flex-col items-center gap-7 text-center"
    >
      <h1
        data-id="home-statement-hook"
        className={cn(
          "m-0 font-[family-name:var(--font-playfair)]",
          "text-[24px] leading-[1.4] font-[350] text-balance text-dotto-brown",
          "md:text-[28px] md:leading-[1.38]",
        )}
      >
        {hook}
      </h1>
      <p
        data-id="home-statement-support"
        className={cn(
          "m-0 max-w-[46ch] font-[family-name:var(--font-playfair)]",
          "text-[14px] leading-[21px] font-[350] text-balance text-dotto-brown/90",
        )}
      >
        {support}
      </p>
    </div>
  </section>
);
