import type { FC } from "react";

import { cn } from "@/lib/cn";

type Props = {
  hook: string;
  support: string;
};

export const HomeStatement: FC<Props> = ({ hook, support }) => (
  <section
    data-id="home-statement"
    className={cn(
      "flex w-full justify-center bg-dotto-cream",
      "px-6 pt-[130px] pb-16 md:px-12 md:pt-[170px] md:pb-24",
    )}
  >
    <div
      data-id="home-statement-inner"
      className="flex w-full max-w-[640px] flex-col items-center gap-7 text-center"
    >
      <h1
        data-id="home-statement-hook"
        className={cn(
          "m-0 font-[family-name:var(--font-antiqua)]",
          "text-[24px] leading-[1.4] font-[350] text-balance text-dotto-brown",
          "md:text-[28px] md:leading-[1.38]",
        )}
      >
        {hook}
      </h1>
      <p
        data-id="home-statement-support"
        className={cn(
          "m-0 max-w-[46ch] font-[family-name:var(--font-antiqua)]",
          "text-[14px] leading-[21px] font-[350] text-balance text-dotto-brown/90",
        )}
      >
        {support}
      </p>
    </div>
  </section>
);
