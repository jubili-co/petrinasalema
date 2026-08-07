import Image from "next/image";
import type { FC } from "react";

import { cn } from "@/lib/cn";
import {
  isLandscape,
  type GalleryImage,
  type GalleryRow,
} from "@/lib/projectGallery";
import type { MoreProjectLink } from "@/lib/projects";

import { GalleryMoreProjects } from "./GalleryMoreProjects";

type Props = {
  name: string;
  rows: GalleryRow[];
  moreProjects: MoreProjectLink[];
};

export const ProjectGallery: FC<Props> = ({ name, rows, moreProjects }) => {
  if (rows.length === 0) {
    return (
      <section
        data-id="project-gallery"
        className="flex min-h-[50dvh] items-end bg-dotto-cream px-6 pt-[100px] pb-9 md:px-12 md:pt-[120px]"
      >
        <h1
          data-id="project-gallery-title"
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
      data-id="project-gallery"
      className="flex w-full flex-col gap-0.5 bg-dotto-cream pt-[74px] md:pt-[79px]"
    >
      {rows.map((row) => (
        <GalleryRowView
          key={rowKey(row)}
          row={row}
          name={name}
          moreProjects={moreProjects}
        />
      ))}
    </section>
  );
};

type GalleryRowViewProps = {
  row: GalleryRow;
  name: string;
  moreProjects: MoreProjectLink[];
};

const GalleryRowView: FC<GalleryRowViewProps> = ({
  row,
  name,
  moreProjects,
}) => {
  const shouldPair = row.length > 1;
  const shouldShowMore = shouldFillWithMoreProjects(row, moreProjects);

  return (
    <div
      data-id="project-gallery-row"
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
      {shouldShowMore && <GalleryMoreProjects projects={moreProjects} />}
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
      data-id="project-gallery-figure"
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
        data-id="project-gallery-image"
        className="h-auto w-full"
      />
      {caption.length > 0 && (
        <figcaption
          data-id="project-gallery-caption"
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

function shouldFillWithMoreProjects(
  row: GalleryRow,
  moreProjects: MoreProjectLink[],
): boolean {
  if (moreProjects.length === 0) {
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
