import type { FC } from "react";

import { cn } from "@/lib/cn";

import { PaperWord } from "./PaperWord";
import { SketchArtifact } from "./SketchArtifact";

type Props = {
  hook: string;
  support: string;
};

const PLAN_SRC = "/papers/alt-erdgeschoss--plan-line.webp";

export const HomeStatement: FC<Props> = ({ hook, support }) => (
  <section
    data-id="home-statement"
    className={cn(
      "relative overflow-hidden",
      "flex w-full justify-center bg-dotto-cream",
      "px-6 pt-[130px] pb-16 md:px-12 md:pt-[170px] md:pb-24",
    )}
  >
    <SketchArtifact
      src={PLAN_SRC}
      fade="right"
      sizes="50vw"
      data-id="home-statement-plan"
      className="top-0 right-0 h-full w-1/2"
      imageClassName="rotate-30 scale-150"
    />
    <PaperWord
      word="erdgeschoss"
      data-id="home-statement-word"
      className="-left-5 top-[5.75rem] w-[6.75rem] -rotate-[18deg] md:top-[22%] md:-left-8 md:w-40"
    />
    <PaperWord
      word="dachfenster"
      data-id="home-statement-word"
      className="bottom-3 left-[5%] w-[5.75rem] rotate-[16deg] md:right-[-1.25rem] md:bottom-[10%] md:left-auto md:w-32"
    />
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
