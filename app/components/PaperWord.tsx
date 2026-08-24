import Image from "next/image";
import type { FC } from "react";

import { cn } from "@/lib/cn";

type Word = keyof typeof WORDS;

type Tone = "ink" | "chalk";

type Props = {
  word: Word;
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
            "opacity-80 mix-blend-multiply": !isChalk,
            "brightness-0 invert opacity-[0.58]": isChalk,
          },
          imageClassName,
        )}
      />
    </div>
  );
};

const WORDS = {
  dachfenster: {
    src: "/papers/words/dachfenster-line.webp",
    width: 380,
    height: 105,
  },
  erdgeschoss: {
    src: "/papers/words/erdgeschoss-line.webp",
    width: 455,
    height: 80,
  },
  erdgeschossAlt: {
    src: "/papers/words/erdgeschoss-alt-line.webp",
    width: 455,
    height: 75,
  },
  ersterStock: {
    src: "/papers/words/erster-stock-line.webp",
    width: 350,
    height: 90,
  },
  fassadeDolomit: {
    src: "/papers/words/fassade-dolomit-line.webp",
    width: 875,
    height: 120,
  },
  hofansicht: {
    src: "/papers/words/hofansicht-line.webp",
    width: 465,
    height: 90,
  },
  keller: {
    src: "/papers/words/keller-line.webp",
    width: 280,
    height: 75,
  },
  kellerAlt: {
    src: "/papers/words/keller-alt-line.webp",
    width: 240,
    height: 80,
  },
  mansarde: {
    src: "/papers/words/mansarde-line.webp",
    width: 455,
    height: 110,
  },
  obergeschoss: {
    src: "/papers/words/obergeschoss-line.webp",
    width: 520,
    height: 87,
  },
  schnittAb: {
    src: "/papers/words/schnitt-a-b-line.webp",
    width: 485,
    height: 110,
  },
  schnittCd: {
    src: "/papers/words/schnitt-c-d-line.webp",
    width: 480,
    height: 100,
  },
  strassenansicht: {
    src: "/papers/words/strassenansicht-line.webp",
    width: 660,
    height: 115,
  },
  zentralBeheizt: {
    src: "/papers/words/zentral-beheizt-line.webp",
    width: 515,
    height: 65,
  },
  zentralBeheiztAlt: {
    src: "/papers/words/zentral-beheizt-alt-line.webp",
    width: 460,
    height: 70,
  },
} as const;
