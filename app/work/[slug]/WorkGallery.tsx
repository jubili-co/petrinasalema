import type { FC } from "react";

import { FadeImage } from "@/app/components/FadeImage";
import { cn } from "@/lib/cn";
import type { GalleryImage, GalleryRow } from "@/lib/workGallery";

type Props = {
  name: string;
  rows: GalleryRow[];
};

export const WorkGallery: FC<Props> = ({ name, rows }) => {
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
        <GalleryRowView key={rowKey(row)} row={row} name={name} />
      ))}
    </section>
  );
};

type GalleryRowViewProps = {
  row: GalleryRow;
  name: string;
};

const GalleryRowView: FC<GalleryRowViewProps> = ({ row, name }) => {
  const shouldPair = row.length > 1;

  return (
    <div
      data-id="work-gallery-row"
      className={cn("flex w-full flex-col gap-0.5", {
        "md:flex-row md:items-stretch": shouldPair,
      })}
    >
      {row.map((image) => (
        <GalleryFigure
          key={`${image.src}-${image.alt}`}
          image={image}
          name={name}
          isHalfWidth={shouldPair}
        />
      ))}
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
  const { src, alt, caption, width, height, placeholder } = image;
  const sizes = isHalfWidth ? "(min-width: 768px) 50vw, 100vw" : "100vw";

  return (
    <figure
      data-id="work-gallery-figure"
      className={cn("relative m-0 w-full", {
        "md:w-1/2": isHalfWidth,
      })}
    >
      <FadeImage
        src={src}
        alt={alt || name}
        placeholder={placeholder}
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
            "px-6 py-3 font-[family-name:var(--font-playfair)]",
            "text-[13px] leading-[18px] font-[350] text-dotto-brown md:px-12",
          )}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

function rowKey(row: GalleryRow): string {
  return row.map((image) => image.src).join("|");
}
