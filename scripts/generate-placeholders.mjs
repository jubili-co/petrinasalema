import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC_DIR = path.join(ROOT, "public");
const DATA_DIR = path.join(ROOT, "lib/data");
const WIDTH_PX = 24;
const QUALITY = 40;

async function main() {
  const srcs = await collectSrcs();
  const local = [...new Set(srcs)].filter((src) => src.startsWith("/"));
  let written = 0;

  for (const src of local) {
    const didWrite = await writePlaceholder(src);
    if (didWrite) {
      written += 1;
    }
  }

  console.log(`wrote ${written} placeholders`);
}

async function collectSrcs() {
  const work = await readJson("work.json");
  const about = await readJson("about.json");
  const studio = await readJson("studio.json");
  const book = await readJson("book.json");
  const landing = await readJson("landing.json");
  const srcs = [];

  for (const item of work.work ?? []) {
    for (const image of item.images ?? []) {
      srcs.push(image.src);
    }
    for (const figure of item.papers?.figures ?? []) {
      srcs.push(figure.src);
    }
  }

  for (const section of about.sections ?? []) {
    if (section.image) {
      srcs.push(section.image);
    }
  }

  srcs.push(...(studio.images ?? []));

  if (book.image) {
    srcs.push(book.image);
  }

  if (landing.jubiliImage) {
    srcs.push(landing.jubiliImage);
  }

  if (landing.newsletterImage) {
    srcs.push(landing.newsletterImage);
  }

  return srcs;
}

async function readJson(name) {
  const filePath = path.join(DATA_DIR, name);
  const text = await readFile(filePath, "utf8");
  return JSON.parse(text);
}

async function writePlaceholder(src) {
  const relative = decodeURI(src).replace(/^\//, "");
  const input = path.join(PUBLIC_DIR, relative);
  const webpPath = relative.replace(/\.[^.]+$/, ".webp");
  const output = path.join(PUBLIC_DIR, "placeholders", webpPath);

  try {
    await mkdir(path.dirname(output), { recursive: true });
    await sharp(input, { failOn: "none" })
      .resize({ width: WIDTH_PX })
      .webp({ quality: QUALITY })
      .toFile(output);
    console.log(path.relative(PUBLIC_DIR, output));
    return true;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn(`skip ${src}: ${message}`);
    return false;
  }
}

await main();
