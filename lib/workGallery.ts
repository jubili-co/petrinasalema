import type { WorkImage, WorkImageRow } from "@/lib/work";

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

/**
 * Explicit `row` on the first image wins. Otherwise landscape (or
 * `frame: "landscape"`) stands alone; consecutive square/portrait images pair
 * on desktop.
 */
export function packGalleryRows(images: GalleryImage[]): GalleryRow[] {
  if (images.length === 0) {
    return [];
  }

  const [head, ...tail] = images;
  if (!head) {
    return [];
  }

  const taken = takeRow(head, tail);
  const rest = images.slice(taken.length);
  return [taken, ...packGalleryRows(rest)];
}

export function isWide(image: GalleryImage): boolean {
  const { frame } = image;
  if (frame === "landscape") {
    return true;
  }
  if (frame === "square" || frame === "portrait") {
    return false;
  }
  return isLandscape(image);
}

export function shouldShareMobile(row: GalleryRow): boolean {
  const [head] = row;
  if (!head) {
    return false;
  }
  if (row.length < 2) {
    return false;
  }
  return isSharedRow(head.row);
}

function takeRow(head: GalleryImage, tail: GalleryImage[]): GalleryRow {
  const explicit = takeExplicit(head, tail);
  if (explicit) {
    return explicit;
  }

  return takeAuto(head, tail);
}

function takeExplicit(
  head: GalleryImage,
  tail: GalleryImage[],
): GalleryRow | undefined {
  const { row } = head;
  if (!isExplicitRow(row)) {
    return undefined;
  }

  return [head, ...tail.slice(0, row - 1)];
}

function takeAuto(head: GalleryImage, tail: GalleryImage[]): GalleryRow {
  if (isWide(head)) {
    return [head];
  }

  const [next] = tail;
  if (!next) {
    return [head];
  }
  if (canAutoPair(next)) {
    return [head, next];
  }

  return [head];
}

function canAutoPair(image: GalleryImage): boolean {
  if (isExplicitRow(image.row)) {
    return false;
  }
  return !isWide(image);
}

function isExplicitRow(row: WorkImageRow | undefined): row is WorkImageRow {
  return row === 1 || row === 2 || row === 3;
}

function isSharedRow(row: WorkImageRow | undefined): boolean {
  return row === 2 || row === 3;
}

function isLandscape(image: Pick<GalleryImage, "width" | "height">): boolean {
  return image.width > image.height;
}

async function frameImage(image: WorkImage): Promise<GalleryImage> {
  const size = await probeRemoteImageSize(image.src);
  const { width, height } = size ?? FALLBACK_LANDSCAPE;

  return { ...image, width, height };
}
