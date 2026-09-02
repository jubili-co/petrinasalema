import type { FC } from "react";

import { cn } from "@/lib/cn";
import { PAPERS } from "@/lib/papers";

import { CtaLink } from "./CtaLink";
import { PaperWord } from "./PaperWord";
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
  href: string;
  linkLabel: string;
};

const SKETCH_SRC = `${PAPERS}/hofansicht--haus-line.webp`;

export const HomeProof: FC<Props> = ({
  lede,
  quote,
  results,
  href,
  linkLabel,
}) => (
  <section
    data-id="home-proof"
    className={cn(
      "relative overflow-hidden",
      "flex w-full justify-center bg-canvas",
      "px-6 py-20 md:px-12 md:py-28",
    )}
  >
    <SketchArtifact
      src={SKETCH_SRC}
      fade="inset"
      sizes="(min-width: 768px) 28vw, 42vw"
      data-id="home-proof-sketch"
      className="top-0 left-0 h-full w-[42%] md:w-[28%]"
      imageClassName="-rotate-[12deg] scale-[1.4] object-bottom"
    />
    <PaperWord
      word="keller"
      data-id="home-proof-word"
      className="top-7 -right-3 w-[4.75rem] rotate-[9deg] md:top-10 md:w-24"
    />
    <div
      data-id="home-proof-inner"
      className="relative flex w-full max-w-[640px] flex-col items-center gap-12 text-center"
    >
      <p
        data-id="home-proof-lede"
        className={cn(
          "m-0 font-[family-name:var(--font-playfair)]",
          "text-[17px] leading-[1.55] font-[350] text-balance text-ink",
          "md:text-[19px]",
        )}
      >
        {lede}
      </p>
      <HomeProofQuote quote={quote} />
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
      <CtaLink href={href} variant="secondary" data-id="home-proof-link">
        {linkLabel}
      </CtaLink>
    </div>
  </section>
);

type HomeProofQuoteProps = {
  quote: HomeProofQuote;
};

const HomeProofQuote: FC<HomeProofQuoteProps> = ({ quote }) => {
  const { text, attribution } = quote;

  return (
    <blockquote
      data-id="home-proof-quote"
      className="m-0 flex flex-col items-center"
    >
      <p
        data-id="home-proof-quote-text"
        className={cn(
          "m-0 max-w-[16ch] font-[family-name:var(--font-playfair)] italic",
          "text-[28px] leading-[1.22] font-[350] text-ink",
          "md:text-[40px] md:leading-[1.16]",
        )}
      >
        {`“${text}”`}
      </p>
      <cite
        data-id="home-proof-quote-attribution"
        className={cn(
          "mt-6 block font-[family-name:var(--font-matter)] not-italic",
          "text-[12px] leading-4 tracking-[0.14em] text-ink/70 uppercase",
        )}
      >
        {attribution}
      </cite>
    </blockquote>
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
          "text-[length:var(--text-copy)] leading-[var(--leading-copy)] tracking-[0.08em] text-ink uppercase",
        )}
      >
        {value}
      </p>
      <p
        data-id="home-proof-metric-label"
        className={cn(
          "m-0 mt-2 font-[family-name:var(--font-playfair)]",
          "text-[length:var(--text-copy)] leading-[var(--leading-copy)] font-[350] text-ink/70",
        )}
      >
        {label}
      </p>
    </li>
  );
};
