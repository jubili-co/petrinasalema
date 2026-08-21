import type { FC } from "react";

import { cn } from "@/lib/cn";
import type { MoreWorkLink } from "@/lib/work";
import type { GalleryRow } from "@/lib/workGallery";

import { GalleryRowView } from "./GalleryRowView";

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

function rowKey(row: GalleryRow): string {
  return row.map((image) => image.src).join("|");
}
