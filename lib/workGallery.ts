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

/** Landscape alone; consecutive portrait/square images pair on desktop. */
export function packGalleryRows(images: GalleryImage[]): GalleryRow[] {
  if (images.length === 0) {
    return [];
  }

  const [head, ...tail] = images;
  if (!head) {
    return [];
  }

  if (isLandscape(head)) {
    return [[head], ...packGalleryRows(tail)];
  }

  const [next, ...rest] = tail;
  if (next && !isLandscape(next)) {
    return [[head, next], ...packGalleryRows(rest)];
  }

  return [[head], ...packGalleryRows(tail)];
}

export function isLandscape(image: Pick<GalleryImage, "width" | "height">): boolean {
  return image.width > image.height;
}

async function frameImage(image: WorkImage): Promise<GalleryImage> {
  const size = await probeRemoteImageSize(image.src);
  const { width, height } = size ?? FALLBACK_LANDSCAPE;

  return { ...image, width, height };
}
