import type { FC } from "react";

import { cn } from "@/lib/cn";

export type HomeProofResult = {
  value: string;
  label: string;
};

type Props = {
  lede: string;
  results: HomeProofResult[];
  href: string;
  linkLabel: string;
};

export const HomeProof: FC<Props> = ({ lede, results, href, linkLabel }) => (
  <section
    data-id="home-proof"
    className={cn(
      "flex w-full justify-center bg-dotto-cream",
      "px-6 py-16 md:px-12 md:py-24",
    )}
  >
    <div
      data-id="home-proof-inner"
      className="flex w-full max-w-[560px] flex-col items-center gap-10 text-center"
    >
      <p
        data-id="home-proof-lede"
        className={cn(
          "m-0 font-[family-name:var(--font-antiqua)]",
          "text-[17px] leading-[1.55] font-[350] text-balance text-dotto-brown",
          "md:text-[19px]",
        )}
      >
        {lede}
      </p>
      <ul
        data-id="home-proof-results"
        className="m-0 flex w-full list-none flex-col gap-6 p-0 sm:flex-row sm:justify-between sm:gap-4"
      >
        {results.map((result) => (
          <HomeProofMetric key={`${result.value}-${result.label}`} result={result} />
        ))}
      </ul>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        data-id="home-proof-link"
        className={cn(
          "font-[family-name:var(--font-antiqua)]",
          "text-[13px] leading-[18px] font-[350] text-dotto-brown",
          "underline underline-offset-4 transition-opacity duration-200 hover:opacity-70",
        )}
      >
        {linkLabel}
      </a>
    </div>
  </section>
);

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
          "m-0 mt-2 font-[family-name:var(--font-antiqua)]",
          "text-[13px] leading-[18px] font-[350] text-dotto-brown/70",
        )}
      >
        {label}
      </p>
    </li>
  );
};
