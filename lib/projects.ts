import projects from "@/lib/data/projects.json";

export type ProjectProduct = {
  name: string | null;
  designer: string | null;
  href: string | null;
};

export type ProjectGalleryLandscape = {
  type: "landscape";
  image: string;
  alt: string;
};

export type ProjectGalleryPortrait = {
  type: "portrait";
  image1: string;
  alt1: string;
  image2: string;
  alt2: string;
};

export type ProjectGalleryBlock =
  ProjectGalleryLandscape | ProjectGalleryPortrait;

export type Project = {
  title: string;
  slug: string;
  color: string;
  image: string;
  seoTitle: string | null;
  seoDescription: string | null;
  intro: string[];
  body: string[];
  photographer: string | null;
  photographerLink: string | null;
  stylist: string | null;
  stylistLink: string | null;
  products: ProjectProduct[];
  gallery: ProjectGalleryBlock[];
};

export const PROJECTS = projects as Project[];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((entry) => entry.slug === slug);
}

export function getNextProject(slug: string): Project {
  const index = PROJECTS.findIndex((entry) => entry.slug === slug);
  const next = PROJECTS[(index + 1) % PROJECTS.length];
  return next ?? PROJECTS[0]!;
}

export function storeProductHref(href: string): string {
  const path = href.replace(/^\/product\/?/, "").replace(/^\/+/, "");
  return `https://studioashby.com/product/${path}`;
}
