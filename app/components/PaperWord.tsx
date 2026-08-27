import Image from "next/image";
import type { FC } from "react";

import { cn } from "@/lib/cn";
import { PAPERS } from "@/lib/papers";

export type PaperWordKey = keyof typeof WORDS;

type Tone = "ink" | "chalk";

type Props = {
  word: PaperWordKey;
  tone?: Tone;
  className?: string;
  imageClassName?: string;
  "data-id"?: string;
};

/**
 * Hand-lettered word from the house papers, used as chrome.
 * Callers own placement, rotation, and scale. Content that must stay
 * above it needs `relative` (paint order).
 */
export const PaperWord: FC<Props> = ({
  word,
  tone = "ink",
  className,
  imageClassName,
  "data-id": dataId = "paper-word",
}) => {
  const { src, width, height } = WORDS[word];
  const isChalk = tone === "chalk";

  return (
    <div
      data-id={dataId}
      aria-hidden
      className={cn("pointer-events-none absolute select-none", className)}
    >
      <Image
        src={src}
        alt=""
        width={width}
        height={height}
        sizes="240px"
        data-id="paper-word-image"
        className={cn(
          "h-auto w-full",
          {
            "opacity-20 mix-blend-multiply": !isChalk,
            "brightness-0 invert opacity-[0.12]": isChalk,
          },
          imageClassName,
        )}
      />
    </div>
  );
};

const WORDS = {
  dachfenster: {
    src: `${PAPERS}/words/dachfenster-line.webp`,
    width: 380,
    height: 105,
  },
  erdgeschoss: {
    src: `${PAPERS}/words/erdgeschoss-line.webp`,
    width: 455,
    height: 80,
  },
  erdgeschossAlt: {
    src: `${PAPERS}/words/erdgeschoss-alt-line.webp`,
    width: 455,
    height: 75,
  },
  ersterStock: {
    src: `${PAPERS}/words/erster-stock-line.webp`,
    width: 350,
    height: 90,
  },
  fassadeDolomit: {
    src: `${PAPERS}/words/fassade-dolomit-line.webp`,
    width: 875,
    height: 120,
  },
  hofansicht: {
    src: `${PAPERS}/words/hofansicht-line.webp`,
    width: 465,
    height: 90,
  },
  keller: {
    src: `${PAPERS}/words/keller-line.webp`,
    width: 280,
    height: 75,
  },
  kellerAlt: {
    src: `${PAPERS}/words/keller-alt-line.webp`,
    width: 240,
    height: 80,
  },
  mansarde: {
    src: `${PAPERS}/words/mansarde-line.webp`,
    width: 455,
    height: 110,
  },
  obergeschoss: {
    src: `${PAPERS}/words/obergeschoss-line.webp`,
    width: 520,
    height: 87,
  },
  schnittAb: {
    src: `${PAPERS}/words/schnitt-a-b-line.webp`,
    width: 485,
    height: 110,
  },
  schnittCd: {
    src: `${PAPERS}/words/schnitt-c-d-line.webp`,
    width: 480,
    height: 100,
  },
  strassenansicht: {
    src: `${PAPERS}/words/strassenansicht-line.webp`,
    width: 660,
    height: 115,
  },
  zentralBeheizt: {
    src: `${PAPERS}/words/zentral-beheizt-line.webp`,
    width: 515,
    height: 65,
  },
  zentralBeheiztAlt: {
    src: `${PAPERS}/words/zentral-beheizt-alt-line.webp`,
    width: 460,
    height: 70,
  },
} as const;
