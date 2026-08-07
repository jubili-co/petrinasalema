import Image from "next/image";
import type { FC } from "react";

import { cn } from "@/lib/cn";
import {
  isLandscape,
  type GalleryImage,
  type GalleryRow,
} from "@/lib/workGallery";
import type { MoreWorkLink } from "@/lib/work";

import { GalleryMoreWork } from "./GalleryMoreWork";

type Props = {
  name: string;
  rows: GalleryRow[];
  moreWork: MoreWorkLink[];
};

export const WorkGallery: FC<Props> = ({ name, rows, moreWork }) => {
  if (rows.length === 0) {
    return (
      <section
        data-id="work-gallery"
        className="flex min-h-[50dvh] items-end bg-dotto-cream px-6 pt-[100px] pb-9 md:px-12 md:pt-[120px]"
      >
        <h1
          data-id="work-gallery-title"
          className={cn(
            "m-0 font-[family-name:var(--font-matter)]",
            "text-[13px] leading-[18px] tracking-[0.15em] text-dotto-brown uppercase",
          )}
        >
          {name}
        </h1>
      </section>
    );
  }

  return (
    <section
      data-id="work-gallery"
      className="flex w-full flex-col gap-0.5 bg-dotto-cream pt-[74px] md:pt-[79px]"
    >
      {rows.map((row) => (
        <GalleryRowView
          key={rowKey(row)}
          row={row}
          name={name}
          moreWork={moreWork}
        />
      ))}
    </section>
  );
};

type GalleryRowViewProps = {
  row: GalleryRow;
  name: string;
  moreWork: MoreWorkLink[];
};

const GalleryRowView: FC<GalleryRowViewProps> = ({ row, name, moreWork }) => {
  const shouldPair = row.length > 1;
  const shouldShowMore = shouldFillWithMoreWork(row, moreWork);

  return (
    <div
      data-id="work-gallery-row"
      className={cn("flex w-full flex-col gap-0.5", {
        "md:flex-row md:items-stretch": shouldPair || shouldShowMore,
      })}
    >
      {row.map((image) => (
        <GalleryFigure
          key={`${image.src}-${image.alt}`}
          image={image}
          name={name}
          isHalfWidth={shouldPair || shouldShowMore}
        />
      ))}
      {shouldShowMore && <GalleryMoreWork items={moreWork} />}
    </div>
  );
};

type GalleryFigureProps = {
  image: GalleryImage;
  name: string;
  isHalfWidth: boolean;
};

const GalleryFigure: FC<GalleryFigureProps> = ({
  image,
  name,
  isHalfWidth,
}) => {
  const { src, alt, caption, width, height } = image;
  const sizes = isHalfWidth ? "(min-width: 768px) 50vw, 100vw" : "100vw";

  return (
    <figure
      data-id="work-gallery-figure"
      className={cn("relative m-0 w-full", {
        "md:w-1/2": isHalfWidth,
      })}
    >
      <Image
        src={src}
        alt={alt || name}
        width={width}
        height={height}
        sizes={sizes}
        data-id="work-gallery-image"
        className="h-auto w-full"
      />
      {caption.length > 0 && (
        <figcaption
          data-id="work-gallery-caption"
          className={cn(
            "px-6 py-3 font-[family-name:var(--font-antiqua)]",
            "text-[13px] leading-[18px] font-[350] text-dotto-brown md:px-12",
          )}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

function shouldFillWithMoreWork(
  row: GalleryRow,
  moreWork: MoreWorkLink[],
): boolean {
  if (moreWork.length === 0) {
    return false;
  }

  const [sole] = row;
  if (!sole || row.length !== 1) {
    return false;
  }

  return !isLandscape(sole);
}

function rowKey(row: GalleryRow): string {
  return row.map((image) => image.src).join("|");
}
