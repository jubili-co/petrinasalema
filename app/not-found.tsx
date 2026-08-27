import type { Metadata } from "next";
import type { FC } from "react";

import { cn } from "@/lib/cn";
import { PAPERS } from "@/lib/papers";

import { CtaLink } from "./components/CtaLink";
import { PaperWord } from "./components/PaperWord";
import { SketchArtifact } from "./components/SketchArtifact";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";

const ELEVATION_SRC = `${PAPERS}/hofansicht--haus-line.webp`;

export const metadata: Metadata = {
  title: "Not found | Petrina Salema",
};

const NotFoundPage: FC = () => (
  <main
    data-id="not-found-page"
    className="flex min-h-dvh flex-col bg-canvas"
  >
    <SiteHeader />
    <section
      data-id="not-found-hero"
      className={cn(
        "relative overflow-hidden",
        "flex flex-1 flex-col items-start justify-center",
        "px-6 pt-[110px] pb-20 md:px-12",
      )}
    >
      <SketchArtifact
        src={ELEVATION_SRC}
        fade="left"
        sizes="(min-width: 768px) 48vw, 70vw"
        data-id="not-found-sketch"
        className="-top-[15%] -right-[20%] h-[130%] w-[70%] md:w-[48%]"
        imageClassName="rotate-[22deg] scale-90 object-right"
      />
      <PaperWord
        word="dachfenster"
        data-id="not-found-word"
        className="-left-6 bottom-[22%] w-28 rotate-[18deg] md:w-36"
      />
      <h1
        data-id="not-found-line"
        className={cn(
          "relative m-0 max-w-[420px] font-[family-name:var(--font-playfair)]",
          "text-[24px] leading-[1.4] font-[350] text-ink",
          "md:text-[28px] md:leading-[1.38]",
        )}
      >
        This page is not on the plan.
      </h1>
      <CtaLink
        href="/work"
        variant="ghost"
        arrow="left"
        data-id="not-found-door"
        className="relative mt-6"
      >
        Back to the work
      </CtaLink>
    </section>
    <SiteFooter />
  </main>
);

export default NotFoundPage;
