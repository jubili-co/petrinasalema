const GDRIVE_SRC_PREFIX = "gdrive:";

/** Public Google Drive image thumbnail (lh3). File must be shared to anyone with the link. */
export function googleDriveThumbnailUrl(
  fileId: string,
  widthPx = 1600,
): string {
  return `https://lh3.googleusercontent.com/d/${fileId}=w${widthPx}`;
}

/** `gdrive:<fileId>` → thumbnail URL; local `/public` paths are encodeURI'd for the browser. */
export function resolveProjectImageSrc(src: string): string {
  const resolved = resolveGdriveSrc(src);
  return encodeLocalPublicSrc(resolved);
}

function resolveGdriveSrc(src: string): string {
  if (!src.startsWith(GDRIVE_SRC_PREFIX)) {
    return src;
  }

  const fileId = src.slice(GDRIVE_SRC_PREFIX.length).trim();
  if (fileId.length === 0) {
    return src;
  }

  return googleDriveThumbnailUrl(fileId);
}

function encodeLocalPublicSrc(src: string): string {
  if (!src.startsWith("/")) {
    return src;
  }

  if (src.startsWith("//")) {
    return src;
  }

  return encodeURI(src);
}
