import { readFile } from "node:fs/promises";
import path from "node:path";

import { imageSize } from "image-size";

export type ImageDimensions = {
  width: number;
  height: number;
};

const REMOTE_PROBE_TIMEOUT_MS = 5_000;

/** Probe image dimensions from a local `/public` path or a remote URL. */
export async function probeRemoteImageSize(
  src: string,
): Promise<ImageDimensions | null> {
  if (src.startsWith("/")) {
    return probeLocalPublicImage(src);
  }

  return probeHttpImage(src);
}

async function probeLocalPublicImage(
  src: string,
): Promise<ImageDimensions | null> {
  try {
    const decoded = decodeURI(src);
    const relativePath = decoded.replace(/^\//, "");
    const filePath = path.join(process.cwd(), "public", relativePath);
    const buffer = await readFile(filePath);
    return dimensionsFromBuffer(buffer);
  } catch {
    return null;
  }
}

async function probeHttpImage(src: string): Promise<ImageDimensions | null> {
  const probeSrc = thumbnailProbeSrc(src);

  try {
    const response = await fetch(probeSrc, {
      signal: AbortSignal.timeout(REMOTE_PROBE_TIMEOUT_MS),
    });
    if (!response.ok) {
      return null;
    }

    const buffer = Buffer.from(await response.arrayBuffer());
    return dimensionsFromBuffer(buffer);
  } catch {
    return null;
  }
}

function dimensionsFromBuffer(buffer: Buffer): ImageDimensions | null {
  const { width, height } = imageSize(buffer);
  if (!width || !height) {
    return null;
  }

  return { width, height };
}

function thumbnailProbeSrc(src: string): string {
  if (!src.includes("lh3.googleusercontent.com/d/")) {
    return src;
  }

  if (/=w\d+$/.test(src)) {
    return src.replace(/=w\d+$/, "=w240");
  }

  return `${src}=w240`;
}
