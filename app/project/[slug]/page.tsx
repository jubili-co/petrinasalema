import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { FC } from "react";

import {
  packGalleryRows,
  withGalleryDimensions,
} from "@/lib/projectGallery";
import { getNextProject, getProject, PROJECTS } from "@/lib/projects";

import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";
import { ProjectDetails } from "./ProjectDetails";
import { ProjectGallery } from "./ProjectGallery";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return PROJECTS.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return { title: "Project | Petrina Salema" };
  }

  const { name, subtitle, description } = project;

  return {
    title: `${name} | Petrina Salema`,
    description: description || `${subtitle} — ${name}`,
  };
}

const ProjectPage: FC<Props> = async ({ params }) => {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  const nextProject = getNextProject(slug);
  const { name, images } = project;
  const framed = await withGalleryDimensions(images);
  const rows = packGalleryRows(framed);

  return (
    <main data-id="project-page" className="min-h-dvh bg-dotto-cream">
      <SiteHeader />
      <ProjectGallery name={name} rows={rows} />
      <ProjectDetails project={project} nextSlug={nextProject.slug} />
      <SiteFooter />
    </main>
  );
};

export default ProjectPage;
