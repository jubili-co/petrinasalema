import { googleDriveThumbnailUrl } from "@/lib/googleDrive";

const PLACEHOLDER_WIDTH_PX = 24;
const GDRIVE_SRC_PREFIX = "gdrive:";
const GDRIVE_HOST = "lh3.googleusercontent.com/d/";
const SANITY_HOST = "cdn.sanity.io/";

/** Tiny stand-in URL for a photo src, or undefined when none can be derived. */
export function placeholderSrc(src: string): string | undefined {
  if (src.startsWith(GDRIVE_SRC_PREFIX)) {
    return drivePlaceholder(src);
  }

  if (src.includes(GDRIVE_HOST)) {
    return driveWidth(src);
  }

  if (src.includes(SANITY_HOST)) {
    return sanityWidth(src);
  }

  if (src.startsWith("/")) {
    return localPlaceholder(src);
  }

  return undefined;
}

function drivePlaceholder(src: string): string | undefined {
  const fileId = src.slice(GDRIVE_SRC_PREFIX.length).trim();
  if (fileId.length === 0) {
    return undefined;
  }

  return googleDriveThumbnailUrl(fileId, PLACEHOLDER_WIDTH_PX);
}

function driveWidth(src: string): string {
  if (/=w\d+$/.test(src)) {
    return src.replace(/=w\d+$/, `=w${PLACEHOLDER_WIDTH_PX}`);
  }

  return `${src}=w${PLACEHOLDER_WIDTH_PX}`;
}

function sanityWidth(src: string): string {
  const url = new URL(src);
  url.searchParams.set("w", String(PLACEHOLDER_WIDTH_PX));
  url.searchParams.delete("h");
  return url.toString();
}

function localPlaceholder(src: string): string {
  const decoded = decodeURI(src);
  const relative = decoded.replace(/^\//, "");
  const webpPath = relative.replace(/\.[^.]+$/, ".webp");
  return encodeURI(`/placeholders/${webpPath}`);
}
