import workData from "@/lib/data/work.json";
import { resolveProjectImageSrc } from "@/lib/googleDrive";

export type WorkChapter = "homes" | "prior";

export type WorkRole = {
  name: string;
  role: string;
};

export type WorkImage = {
  src: string;
  alt: string;
  caption: string;
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
    id: "homes",
    label: "Homes & hospitality",
    note: "Rooms designed for how people live, and for guests who pay to stay.",
  },
  {
    id: "prior",
    label: "Prior architecture",
    note: "A decade inside architecture practices, before the homes.",
  },
];

export const WORK_DATA = workData as Work;
export const WORK = WORK_DATA.work.map(withResolvedImageSrcs);

function withResolvedImageSrcs(item: WorkItem): WorkItem {
  const { images } = item;

  return {
    ...item,
    images: images.map((image) => {
      const { src, alt, caption } = image;

      return {
        src: resolveProjectImageSrc(src),
        alt,
        caption,
      };
    }),
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

export type MoreWorkLink = {
  name: string;
  slug: string;
};

/** Leading portfolio peers for the current piece. Prefers the same chapter. */
export function getMoreWork(slug: string, limit = 4): MoreWorkLink[] {
  const current = getWork(slug);
  if (!current) {
    return [];
  }

  const { chapter } = current;
  const peers = WORK.filter((item) => item.slug !== slug);
  const sameChapter = peers.filter((item) => item.chapter === chapter);
  const otherChapter = peers.filter((item) => item.chapter !== chapter);
  const ordered = [...sameChapter, ...otherChapter];

  return ordered.slice(0, limit).map(({ name, slug: workSlug }) => ({
    name,
    slug: workSlug,
  }));
}

export type WorkChapterGroup = {
  id: WorkChapter;
  label: string;
  note: string;
  items: WorkItem[];
};

/** Work grid groups in sell/show order: homes first, prior architecture after. */
export function workChapterGroups(items: WorkItem[] = WORK): WorkChapterGroup[] {
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
  const { src, alt } = cover;

  return {
    title: name,
    slug,
    image: src,
    alt: alt || name,
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
