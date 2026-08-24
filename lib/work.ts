import workData from "@/lib/data/work.json";
import { resolveProjectImageSrc } from "@/lib/googleDrive";
import { placeholderSrc } from "@/lib/placeholderSrc";

export type WorkChapter = "homes" | "prior";

export type WorkRole = {
  name: string;
  role: string;
};

export type WorkImage = {
  src: string;
  alt: string;
  caption: string;
  placeholder?: string;
  /** Consecutive `pair` images share a half-width row. */
  layout?: "pair";
};

export type WorkLink = {
  href: string;
  text: string;
};

export type WorkResult = {
  value: string;
  label: string;
};

export type WorkCaseStudy = {
  problem: string;
  decisions: string;
  result: string;
  results: WorkResult[];
};

/** Archival drawings that belong to this project (line art on cream). */
export type WorkPapers = {
  heading: string;
  lede: string;
  figures: WorkImage[];
  ghost?: string;
};

export type WorkItem = {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  location: string;
  chapter: WorkChapter;
  roles: WorkRole[];
  scope: string[];
  description: string;
  caseStudy?: WorkCaseStudy;
  papers?: WorkPapers;
  tags: string[];
  images: WorkImage[];
  links: WorkLink[];
  featured?: boolean;
};

export type Work = {
  work: WorkItem[];
};

export const WORK_CHAPTERS: {
  id: WorkChapter;
  label: string;
  note: string;
}[] = [
  {
    id: "prior",
    label: "Architectural Projects",
    note: "Hospitals, schools, corporate and residential buildings from a decade inside architecture practices before setting up my own studio.",
  },
  {
    id: "homes",
    label: "Homes & Hospitality",
    note: "Keen focus on Vienna homes and guest stays first. Solving layout, materials, and how people actually use the space.",
  },
];

export const WORK_DATA = workData as Work;
export const WORK = WORK_DATA.work.map(withResolvedImageSrcs);

function withResolvedImageSrcs(item: WorkItem): WorkItem {
  const { images, papers } = item;

  return {
    ...item,
    images: images.map(resolveImage),
    papers: papers && resolvePapers(papers),
  };
}

function resolveImage({ src, alt, caption, layout }: WorkImage): WorkImage {
  return {
    src: resolveProjectImageSrc(src),
    placeholder: placeholderSrc(src),
    alt,
    caption,
    layout,
  };
}

function resolvePapers(papers: WorkPapers): WorkPapers {
  const { heading, lede, figures, ghost } = papers;

  return {
    heading,
    lede,
    figures: figures.map(resolveImage),
    ghost,
  };
}

export function getWork(slug: string): WorkItem | undefined {
  return WORK.find((entry) => entry.slug === slug);
}

/** City (or place) only — strips trailing country from "Place, Country". */
export function workPlace(location: string): string {
  const [place] = location.split(",");
  return place?.trim() || location;
}

export function workOffersDoor(item: WorkItem): boolean {
  return item.chapter === "homes";
}

export function getNextWork(slug: string): WorkItem {
  const index = WORK.findIndex((entry) => entry.slug === slug);
  const next = WORK[(index + 1) % WORK.length];
  return next ?? WORK[0]!;
}

export type WorkChapterGroup = {
  id: WorkChapter;
  label: string;
  note: string;
  items: WorkItem[];
};

/** Work grid groups in spreadsheet Rank order, then Vienna homes. */
export function workChapterGroups(
  items: WorkItem[] = WORK,
): WorkChapterGroup[] {
  return WORK_CHAPTERS.flatMap((chapter) => {
    const chapterItems = items.filter((item) => item.chapter === chapter.id);
    if (chapterItems.length === 0) {
      return [];
    }

    return [
      {
        id: chapter.id,
        label: chapter.label,
        note: chapter.note,
        items: chapterItems,
      },
    ];
  });
}

export type HomeWorkCardItem = {
  title: string;
  slug: string;
  image: string;
  alt: string;
  placeholder?: string;
};

export type HomeWorkBlock =
  | { type: "portrait"; items: HomeWorkCardItem[] }
  | ({ type: "landscape" } & HomeWorkCardItem);

/** Homepage rhythm: portrait pair → landscape → repeat. Featured work with a cover only. */
export function homeWorkBlocks(items: WorkItem[] = WORK): HomeWorkBlock[] {
  const cards = items.flatMap((item) => {
    if (!item.featured) {
      return [];
    }

    const card = toHomeCard(item);
    return card ? [card] : [];
  });

  return packHomeBlocks(cards);
}

function toHomeCard(item: WorkItem): HomeWorkCardItem | undefined {
  const [cover] = item.images;
  if (!cover) {
    return undefined;
  }

  const { slug, name } = item;
  const { src, alt, placeholder } = cover;

  return {
    title: name,
    slug,
    image: src,
    alt: alt || name,
    placeholder,
  };
}

function packHomeBlocks(cards: HomeWorkCardItem[]): HomeWorkBlock[] {
  if (cards.length === 0) {
    return [];
  }

  if (cards.length === 1) {
    const [only] = cards;
    if (!only) {
      return [];
    }

    return [{ type: "landscape", ...only }];
  }

  const [first, second, ...rest] = cards;
  if (!first || !second) {
    return [];
  }

  const portrait: HomeWorkBlock = {
    type: "portrait",
    items: [first, second],
  };

  if (rest.length === 0) {
    return [portrait];
  }

  const [landscapeCard, ...afterLandscape] = rest;
  if (!landscapeCard) {
    return [portrait];
  }

  const landscape: HomeWorkBlock = {
    type: "landscape",
    ...landscapeCard,
  };

  return [portrait, landscape, ...packHomeBlocks(afterLandscape)];
}
