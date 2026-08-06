import projectsData from "@/lib/data/projects.json";

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
};

export type Projects = {
  projects: ProjectsItem[];
};

export const PROJECTS_DATA = projectsData as Projects;
export const PROJECTS = PROJECTS_DATA.projects;

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
