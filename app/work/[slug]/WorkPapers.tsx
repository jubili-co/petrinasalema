import Image from "next/image";
import type { FC } from "react";

import { cn } from "@/lib/cn";
import { probeRemoteImageSize } from "@/lib/imageSize";
import type { WorkPapers as Papers } from "@/lib/work";
import { withGalleryDimensions, type GalleryImage } from "@/lib/workGallery";

type Props = {
  papers: Papers;
};

/** Archival drawings block: lead figure, paired sheets, and a ghosted drawing. */
export const WorkPapers: FC<Props> = async ({ papers }) => {
  const { heading, lede, figures, ghost: ghostSrc } = papers;
  const framed = await withGalleryDimensions(figures);
  const [lead, ...rest] = framed;
  const pairs = chunkPairs(rest);
  const ghost = ghostSrc && (await frameGhost(ghostSrc));

  return (
    <section
      data-id="work-papers"
      className={cn(
        "relative overflow-hidden bg-dotto-cream",
        "border-t-[length:var(--border-hairline)] border-dotto-brown/20",
        "px-6 pt-14 pb-16 md:px-12 md:pt-20 md:pb-24",
      )}
    >
      {ghost && <PapersGhost image={ghost} />}
      <header data-id="work-papers-header" className="relative max-w-[520px]">
        <h2
          data-id="work-papers-heading"
          className={cn(
            "m-0 mb-[10px] font-[family-name:var(--font-matter)]",
            "text-[13px] leading-[18px] tracking-[0.15em] text-dotto-brown uppercase",
          )}
        >
          {heading}
        </h2>
        <p
          data-id="work-papers-lede"
          className={cn(
            "m-0 font-[family-name:var(--font-antiqua)]",
            "text-[14px] leading-[21px] font-[350] text-dotto-brown",
          )}
        >
          {lede}
        </p>
      </header>
      <div
        data-id="work-papers-figures"
        className="relative mt-12 flex max-w-[960px] flex-col gap-12 md:mt-16 md:gap-14"
      >
        {lead && <PapersFigure figure={lead} isPaired={false} />}
        {pairs.map((pair) => (
          <div
            key={pairKey(pair)}
            data-id="work-papers-pair"
            className="flex flex-col gap-12 md:flex-row md:items-start md:gap-6"
          >
            {pair.map((figure) => (
              <PapersFigure key={figure.src} figure={figure} isPaired />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

type FigureProps = {
  figure: GalleryImage;
  isPaired: boolean;
};

const PapersFigure: FC<FigureProps> = ({ figure, isPaired }) => {
  const { src, alt, caption, width, height } = figure;
  const sizes = isPaired ? "(min-width: 768px) 45vw, 100vw" : "100vw";

  return (
    <figure
      data-id="work-papers-figure"
      className={cn("m-0 w-full", { "md:w-1/2": isPaired })}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        data-id="work-papers-image"
        className="h-auto w-full"
      />
      {caption.length > 0 && (
        <figcaption
          data-id="work-papers-caption"
          className={cn(
            "mt-3 font-[family-name:var(--font-antiqua)]",
            "text-[13px] leading-[18px] font-[350] text-dotto-brown/80",
          )}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

type Ghost = {
  src: string;
  width: number;
  height: number;
};

type GhostProps = {
  image: Ghost;
};

/** Background × chrome register: decorative, low opacity, cropped by the section. */
const PapersGhost: FC<GhostProps> = ({ image }) => {
  const { src, width, height } = image;

  return (
    <Image
      src={src}
      alt=""
      width={width}
      height={height}
      sizes="(min-width: 768px) 44vw, 0px"
      aria-hidden
      data-id="work-papers-ghost"
      className={cn(
        "absolute -top-6 right-[-6%]",
        "hidden w-[44vw] max-w-[720px] md:block",
        "opacity-[0.13]",
        "pointer-events-none",
      )}
    />
  );
};

async function frameGhost(src: string): Promise<Ghost | null> {
  const size = await probeRemoteImageSize(src);
  return size && { src, ...size };
}

function chunkPairs(figures: GalleryImage[]): GalleryImage[][] {
  if (figures.length === 0) {
    return [];
  }

  const pair = figures.slice(0, 2);
  const rest = figures.slice(2);

  return [pair, ...chunkPairs(rest)];
}

function pairKey(pair: GalleryImage[]): string {
  return pair.map((figure) => figure.src).join("|");
}
