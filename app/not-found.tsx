import type { Metadata } from "next";
import type { FC } from "react";

import { cn } from "@/lib/cn";

import { CtaLink } from "./components/CtaLink";
import { GhostDrawing } from "./components/GhostDrawing";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";

const PLAN_SRC = "/papers/ground-floor-1976.webp";

export const metadata: Metadata = {
  title: "Not found | Petrina Salema",
};

const NotFoundPage: FC = () => (
  <main
    data-id="not-found-page"
    className="flex min-h-dvh flex-col bg-dotto-cream"
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
      <GhostDrawing
        src={PLAN_SRC}
        sizes="(min-width: 768px) 40vw, 82vw"
        data-id="not-found-ghost"
        className={cn(
          "top-1/2 right-[-14%] -translate-y-1/2 md:right-[4%]",
          "w-[82vw] max-w-[640px] md:w-[40vw]",
        )}
      />
      <h1
        data-id="not-found-line"
        className={cn(
          "relative m-0 max-w-[420px] font-[family-name:var(--font-playfair)]",
          "text-[24px] leading-[1.4] font-[350] text-dotto-brown",
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
