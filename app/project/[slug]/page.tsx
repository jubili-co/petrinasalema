import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { FC } from "react";

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
    return { title: "Project | Dotto" };
  }

  const { name, subtitle, description } = project;

  return {
    title: `${name} | Dotto`,
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

  return (
    <main data-id="project-page" className="min-h-dvh bg-cream">
      <SiteHeader />
      <ProjectGallery name={name} images={images} />
      <ProjectDetails project={project} nextSlug={nextProject.slug} />
      <SiteFooter />
    </main>
  );
};

export default ProjectPage;
