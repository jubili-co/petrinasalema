import { imageSize } from "image-size";

export type ImageDimensions = {
  width: number;
  height: number;
};

/** Probe remote image dimensions (uses a small Drive thumbnail when possible). */
export async function probeRemoteImageSize(
  src: string,
): Promise<ImageDimensions | null> {
  const probeSrc = thumbnailProbeSrc(src);

  try {
    const response = await fetch(probeSrc);
    if (!response.ok) {
      return null;
    }

    const buffer = Buffer.from(await response.arrayBuffer());
    const { width, height } = imageSize(buffer);
    if (!width || !height) {
      return null;
    }

    return { width, height };
  } catch {
    return null;
  }
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
