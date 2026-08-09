import type { FC } from "react";

import { cn } from "@/lib/cn";

type Props = {
  text: string;
  attribution: string;
};

export const HomeProof: FC<Props> = ({ text, attribution }) => (
  <section
    data-id="home-proof"
    className={cn(
      "flex w-full justify-center bg-dotto-cream",
      "px-6 py-16 md:px-12 md:py-24",
    )}
  >
    <blockquote
      data-id="home-proof-quote"
      className="m-0 w-full max-w-[560px] text-center"
    >
      <p
        data-id="home-proof-text"
        className={cn(
          "m-0 font-[family-name:var(--font-antiqua)]",
          "text-[17px] leading-[1.55] font-[350] text-balance text-dotto-brown",
          "md:text-[19px]",
        )}
      >
        “{text}”
      </p>
      <cite
        data-id="home-proof-attribution"
        className={cn(
          "mt-4 block font-[family-name:var(--font-antiqua)] not-italic",
          "text-[13px] leading-[18px] font-[350] text-dotto-brown/70",
        )}
      >
        {attribution}
      </cite>
    </blockquote>
  </section>
);
