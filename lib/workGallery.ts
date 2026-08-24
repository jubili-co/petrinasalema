import type { WorkImage } from "@/lib/work";

import { probeRemoteImageSize } from "./imageSize";

export type GalleryImage = WorkImage & {
  width: number;
  height: number;
};

export type GalleryRow = GalleryImage[];

const FALLBACK_LANDSCAPE = { width: 1600, height: 900 };

export async function withGalleryDimensions(
  images: WorkImage[],
): Promise<GalleryImage[]> {
  return Promise.all(images.map(frameImage));
}

/** Marked process shots pair; landscape alone; consecutive portrait/square pair. */
export function packGalleryRows(images: GalleryImage[]): GalleryRow[] {
  if (images.length === 0) {
    return [];
  }

  const [head, ...tail] = images;
  if (!head) {
    return [];
  }

  if (isPairLayout(head)) {
    return packMarkedPair(head, tail);
  }

  if (isLandscape(head)) {
    return [[head], ...packGalleryRows(tail)];
  }

  return packPortraitRow(head, tail);
}

export function isLandscape(
  image: Pick<GalleryImage, "width" | "height">,
): boolean {
  return image.width > image.height;
}

function packMarkedPair(
  head: GalleryImage,
  tail: GalleryImage[],
): GalleryRow[] {
  const [next, ...rest] = tail;
  if (next && isPairLayout(next)) {
    return [[head, next], ...packGalleryRows(rest)];
  }

  return [[head], ...packGalleryRows(tail)];
}

function packPortraitRow(
  head: GalleryImage,
  tail: GalleryImage[],
): GalleryRow[] {
  const [next, ...rest] = tail;
  if (!next) {
    return [[head], ...packGalleryRows(tail)];
  }

  const shouldShareRow = !isLandscape(next) && !isPairLayout(next);
  if (shouldShareRow) {
    return [[head, next], ...packGalleryRows(rest)];
  }

  return [[head], ...packGalleryRows(tail)];
}

function isPairLayout(image: Pick<GalleryImage, "layout">): boolean {
  return image.layout === "pair";
}

async function frameImage(image: WorkImage): Promise<GalleryImage> {
  const size = await probeRemoteImageSize(image.src);
  const { width, height } = size ?? FALLBACK_LANDSCAPE;

  return { ...image, width, height };
}
