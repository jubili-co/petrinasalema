import projectsData from "@/lib/data/projects.json";
import { resolveProjectImageSrc } from "@/lib/googleDrive";

export type ProjectsRole = {
  name: string;
  role: string;
};

export type ProjectsImage = {
  src: string;
  alt: string;
  caption: string;
};

export type ProjectsLink = {
  href: string;
  text: string;
};

export type ProjectsItem = {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  location: string;
  roles: ProjectsRole[];
  scope: string[];
  description: string;
  tags: string[];
  images: ProjectsImage[];
  links: ProjectsLink[];
  featured?: boolean;
};

export type Projects = {
  projects: ProjectsItem[];
};

export const PROJECTS_DATA = projectsData as Projects;
export const PROJECTS = PROJECTS_DATA.projects.map(withResolvedImageSrcs);

function withResolvedImageSrcs(project: ProjectsItem): ProjectsItem {
  const { images } = project;

  return {
    ...project,
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

export function getProject(slug: string): ProjectsItem | undefined {
  return PROJECTS.find((entry) => entry.slug === slug);
}

/** City (or place) only — strips trailing country from "Place, Country". */
export function projectPlace(location: string): string {
  const [place] = location.split(",");
  return place?.trim() || location;
}

export function getNextProject(slug: string): ProjectsItem {
  const index = PROJECTS.findIndex((entry) => entry.slug === slug);
  const next = PROJECTS[(index + 1) % PROJECTS.length];
  return next ?? PROJECTS[0]!;
}

export type HomeProjectCardItem = {
  title: string;
  slug: string;
  image: string;
  alt: string;
};

export type HomeProjectBlock =
  | { type: "portrait"; items: HomeProjectCardItem[] }
  | ({ type: "landscape" } & HomeProjectCardItem);

/** Homepage rhythm: portrait pair → landscape → repeat. Featured projects with a cover only. */
export function homeProjectBlocks(
  projects: ProjectsItem[] = PROJECTS,
): HomeProjectBlock[] {
  const cards = projects.flatMap((project) => {
    if (!project.featured) {
      return [];
    }

    const card = toHomeCard(project);
    return card ? [card] : [];
  });

  return packHomeBlocks(cards);
}

function toHomeCard(project: ProjectsItem): HomeProjectCardItem | undefined {
  const [cover] = project.images;
  if (!cover) {
    return undefined;
  }

  const { slug, name } = project;
  const { src, alt } = cover;

  return {
    title: name,
    slug,
    image: src,
    alt: alt || name,
  };
}

function packHomeBlocks(cards: HomeProjectCardItem[]): HomeProjectBlock[] {
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

  const portrait: HomeProjectBlock = {
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

  const landscape: HomeProjectBlock = {
    type: "landscape",
    ...landscapeCard,
  };

  return [portrait, landscape, ...packHomeBlocks(afterLandscape)];
}
