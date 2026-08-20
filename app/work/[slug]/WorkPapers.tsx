import Image from "next/image";
import type { FC } from "react";

import { cn } from "@/lib/cn";
import type { WorkPapers as Papers } from "@/lib/work";
import { withGalleryDimensions, type GalleryImage } from "@/lib/workGallery";

import { SketchArtifact } from "../../components/SketchArtifact";

type Props = {
  papers: Papers;
};

/** Archival drawings block: lead figure, paired sheets, and a ghosted drawing. */
export const WorkPapers: FC<Props> = async ({ papers }) => {
  const { heading, lede, figures, ghost } = papers;
  const framed = await withGalleryDimensions(figures);
  const [lead, ...rest] = framed;
  const pairs = chunkPairs(rest);

  return (
    <section
      data-id="work-papers"
      className={cn(
        "relative overflow-hidden bg-dotto-cream",
        "border-t-[length:var(--border-hairline)] border-dotto-brown/20",
        "px-6 pt-14 pb-16 md:px-12 md:pt-20 md:pb-24",
      )}
    >
      {ghost && (
        <SketchArtifact
          src={ghost}
          fade="right"
          sizes="(min-width: 768px) 60vw, 80vw"
          data-id="work-papers-sketch"
          className="-bottom-8 -left-[12%] h-[72%] w-[80%] md:w-[58%]"
          imageClassName="rotate-[11deg] scale-[1.2] object-left"
        />
      )}
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
            "m-0 font-[family-name:var(--font-playfair)]",
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
            "mt-3 font-[family-name:var(--font-playfair)]",
            "text-[13px] leading-[18px] font-[350] text-dotto-brown/80",
          )}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

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
