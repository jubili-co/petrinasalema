import type { FC } from "react";

import { cn } from "@/lib/cn";
import type { MoreWorkLink } from "@/lib/work";
import {
  isWide,
  shouldShareMobile,
  type GalleryRow,
} from "@/lib/workGallery";

import { GalleryFigure } from "./GalleryFigure";
import { GalleryMoreWork } from "./GalleryMoreWork";

type Props = {
  row: GalleryRow;
  name: string;
  moreWork: MoreWorkLink[];
};

export const GalleryRowView: FC<Props> = ({ row, name, moreWork }) => {
  const count = row.length;
  const shouldShowMore = shouldFillWithMoreWork(row, moreWork);
  const shouldShare = shouldShareMobile(row);
  const shouldRowOnDesktop = count > 1 || shouldShowMore;
  const widthClass = getWidthClass(count, shouldShare, shouldShowMore);
  const sizes = getSizes(count, shouldShare, shouldShowMore);

  return (
    <div
      data-id="work-gallery-row"
      className={cn("flex w-full gap-0.5", {
        "flex-row flex-nowrap items-stretch": shouldShare,
        "flex-col": !shouldShare,
        "md:flex-row md:items-stretch": !shouldShare && shouldRowOnDesktop,
      })}
    >
      {row.map((image) => (
        <GalleryFigure
          key={`${image.src}-${image.alt}`}
          image={image}
          name={name}
          widthClass={widthClass}
          sizes={sizes}
        />
      ))}
      {shouldShowMore && <GalleryMoreWork items={moreWork} />}
    </div>
  );
};

function shouldFillWithMoreWork(
  row: GalleryRow,
  moreWork: MoreWorkLink[],
): boolean {
  if (moreWork.length === 0) {
    return false;
  }
  if (row.length !== 1) {
    return false;
  }

  const [sole] = row;
  if (!sole) {
    return false;
  }

  return !isWide(sole);
}

function getWidthClass(
  count: number,
  shouldShare: boolean,
  shouldShowMore: boolean,
): string | undefined {
  if (count >= 3) {
    return shouldShare ? "w-1/3" : "md:w-1/3";
  }

  if (count === 2 || shouldShowMore) {
    return shouldShare ? "w-1/2" : "md:w-1/2";
  }

  return undefined;
}

function getSizes(
  count: number,
  shouldShare: boolean,
  shouldShowMore: boolean,
): string {
  if (count >= 3) {
    return shouldShare ? "33vw" : "(min-width: 768px) 33vw, 100vw";
  }

  if (count === 2 || shouldShowMore) {
    return shouldShare ? "50vw" : "(min-width: 768px) 50vw, 100vw";
  }

  return "100vw";
}
