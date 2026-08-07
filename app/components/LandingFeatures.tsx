import Image from "next/image";
import Link from "next/link";
import type { FC, ReactNode } from "react";

import { cn } from "@/lib/cn";

import { LogoJubiliWordmark } from "./LogoJubiliWordmark";

type Props = {
  studioImage: string;
  jubiliImage: string;
};

const MATERIALITY_LETTERS = "materiality".split("");

export const LandingFeatures: FC<Props> = ({ studioImage, jubiliImage }) => (
  <section
    id="landing"
    data-id="landing-features"
    className="relative h-[100dvh] w-full overflow-hidden"
  >
    <div
      data-id="landing-features-inner"
      className="flex h-full w-full flex-col md:flex-row"
    >
      <Link
        href="/materiality"
        data-id="landing-features-studio"
        className={cn(
          "group relative block h-1/2 w-full overflow-hidden bg-dotto-blue",
          "md:h-full md:w-1/2",
        )}
      >
        <div
          data-id="landing-features-studio-inner"
          className={cn(
            "relative z-[2] flex h-full items-center justify-center",
            "p-[18px] md:px-[82px] md:py-[8.3%]",
          )}
        >
          <MaterialityMark />
        </div>
        <div
          data-id="landing-features-studio-image"
          className={cn(
            "absolute inset-0 z-[1] opacity-0",
            "group-hover:opacity-100",
          )}
        >
          <Image
            src={studioImage}
            alt="Materiality interior"
            fill
            sizes="50vw"
            className="object-cover"
          />
        </div>
      </Link>

      <Link
        href="/jubili"
        data-id="landing-features-jubili"
        className={cn(
          "group relative block h-1/2 w-full overflow-hidden bg-dotto-mustard",
          "md:h-full md:w-1/2",
        )}
      >
        <div
          data-id="landing-features-jubili-inner"
          className={cn(
            "relative z-[2] flex h-full items-center justify-center",
            "p-[18px] md:px-[54px] md:py-[10%]",
          )}
        >
          <div
            data-id="landing-features-jubili-mark"
            className="w-[200px] md:w-[280px]"
          >
            <LogoJubiliWordmark
              className="text-[#003a37] group-hover:text-white"
            />
          </div>
        </div>
        <div
          data-id="landing-features-jubili-image"
          className={cn(
            "absolute inset-0 z-[1] opacity-0",
            "group-hover:opacity-100",
          )}
        >
          <Image
            src={jubiliImage}
            alt="Jubili store"
            fill
            sizes="50vw"
            className="object-cover"
          />
        </div>
      </Link>
    </div>
  </section>
);

const MaterialityMark: FC = () => (
  <span
    data-id="landing-features-studio-mark"
    aria-label="Materiality"
    className={cn(
      "inline-flex items-center lowercase",
      "font-[family-name:var(--font-beaux)] font-black text-dotto-cream",
      "text-[clamp(26px,3.5vw,52px)] leading-none tracking-[-0.01em]",
      "transition-colors duration-200",
      "group-hover:text-white",
    )}
  >
    {materialityMarkNodes()}
  </span>
);

function materialityMarkNodes(): ReactNode[] {
  return MATERIALITY_LETTERS.flatMap((letter, index) => {
    const letterNode = (
      <span key={`letter-${letter}-${index}`} data-id="landing-features-letter">
        {letter}
      </span>
    );

    if (index >= MATERIALITY_LETTERS.length - 1) {
      return [letterNode];
    }

    return [
      letterNode,
      <span
        key={`diamond-${index}`}
        data-id="landing-features-letter-diamond"
        aria-hidden
        className="mx-[0.1em] inline-block size-[0.05em] shrink-0 rotate-45 bg-current"
      />,
    ];
  });
}
