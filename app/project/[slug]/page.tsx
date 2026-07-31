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
    return { title: "Project | Studio Ashby" };
  }

  const title = project.seoTitle ?? `${project.title} | Studio Ashby`;
  const description =
    project.seoDescription ??
    project.body[0] ??
    `Interior design project: ${project.title} by Studio Ashby.`;

  return { title, description };
}

const ProjectPage: FC<Props> = async ({ params }) => {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) {
    notFound();
  }

  const nextProject = getNextProject(slug);

  return (
    <main data-id="project-page" className="min-h-dvh bg-cream">
      <SiteHeader variant="home" />
      <ProjectGallery title={project.title} gallery={project.gallery} />
      <ProjectDetails project={project} nextSlug={nextProject.slug} />
      <SiteFooter />
    </main>
  );
};

export default ProjectPage;
