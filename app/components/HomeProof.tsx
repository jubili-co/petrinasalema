import type { FC } from "react";

import { cn } from "@/lib/cn";

import { SketchArtifact } from "./SketchArtifact";

export type HomeProofResult = {
  value: string;
  label: string;
};

export type HomeProofQuote = {
  text: string;
  attribution: string;
};

type Props = {
  lede: string;
  quote: HomeProofQuote;
  results: HomeProofResult[];
};

export const HomeProof: FC<Props> = ({ lede, quote, results }) => {
  const { text, attribution } = quote;

  return (
    <section
      data-id="home-proof"
      className={cn(
        "relative flex w-full justify-center bg-dotto-cream",
        "px-6 py-16 md:px-12 md:py-24",
      )}
    >
      <SketchArtifact
        src="/papers/hofansicht--haus-line.webp"
        fade="inset"
        sizes="(min-width: 768px) 28vw, 42vw"
        data-id="home-proof-sketch"
        className="top-0 left-0 h-full w-[42%] md:w-[28%]"
        imageClassName="-rotate-[12deg] scale-[1.4] object-bottom"
      />
      <div
        data-id="home-proof-inner"
        className="relative flex w-full max-w-[560px] flex-col items-center gap-10 text-center"
      >
        <p
          data-id="home-proof-lede"
          className={cn(
            "m-0 font-[family-name:var(--font-playfair)]",
            "text-[17px] leading-[1.55] font-[350] text-balance text-dotto-brown",
            "md:text-[19px]",
          )}
        >
          {lede}
        </p>
        <blockquote data-id="home-proof-quote" className="m-0 max-w-[40ch]">
          <p
            data-id="home-proof-quote-text"
            className={cn(
              "m-0 font-[family-name:var(--font-playfair)]",
              "text-[15px] leading-[22px] font-[350] text-balance text-dotto-brown",
            )}
          >
            {`“${text}”`}
          </p>
          <cite
            data-id="home-proof-quote-attribution"
            className={cn(
              "mt-3 block font-[family-name:var(--font-playfair)] not-italic",
              "text-[13px] leading-[18px] font-[350] text-dotto-brown/70",
            )}
          >
            {attribution}
          </cite>
        </blockquote>
        <ul
          data-id="home-proof-results"
          className="m-0 flex w-full list-none flex-col gap-6 p-0 sm:flex-row sm:justify-between sm:gap-4"
        >
          {results.map((result) => (
            <HomeProofMetric
              key={`${result.value}-${result.label}`}
              result={result}
            />
          ))}
        </ul>
      </div>
    </section>
  );
};

type HomeProofMetricProps = {
  result: HomeProofResult;
};

const HomeProofMetric: FC<HomeProofMetricProps> = ({ result }) => {
  const { value, label } = result;

  return (
    <li data-id="home-proof-metric" className="min-w-0 flex-1">
      <p
        data-id="home-proof-metric-value"
        className={cn(
          "m-0 font-[family-name:var(--font-matter)]",
          "text-[13px] leading-[18px] tracking-[0.08em] text-dotto-brown uppercase",
        )}
      >
        {value}
      </p>
      <p
        data-id="home-proof-metric-label"
        className={cn(
          "m-0 mt-2 font-[family-name:var(--font-playfair)]",
          "text-[13px] leading-[18px] font-[350] text-dotto-brown/70",
        )}
      >
        {label}
      </p>
    </li>
  );
};
