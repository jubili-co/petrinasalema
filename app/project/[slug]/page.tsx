import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { FC } from "react";

import { cn } from "@/lib/cn";
import projects from "@/lib/data/projects.json";

import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((entry) => entry.slug === slug);
  if (!project) {
    return { title: "Project | Studio Ashby" };
  }
  return {
    title: `${project.title} | Studio Ashby`,
    description: `Interior design project: ${project.title} by Studio Ashby.`,
  };
}

const ProjectPage: FC<Props> = async ({ params }) => {
  const { slug } = await params;
  const index = projects.findIndex((entry) => entry.slug === slug);
  const project = projects[index];
  if (!project) {
    notFound();
  }

  const nextProject = projects[(index + 1) % projects.length] ?? projects[0];

  return (
    <main data-id="project-page" className="min-h-dvh bg-cream">
      <SiteHeader />
      <section
        data-id="project-hero"
        className="relative h-[100dvh] w-full overflow-hidden"
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          data-id="project-hero-scrim"
          className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/20"
        />
        <div
          data-id="project-hero-copy"
          className="absolute inset-x-0 bottom-0 z-[1] px-6 pb-12 md:px-12 md:pb-16"
        >
          <p
            data-id="project-hero-eyebrow"
            className="mb-3 font-[family-name:var(--font-matter)] text-[12px] tracking-[0.18em] text-cream/80 uppercase"
          >
            Project
          </p>
          <h1
            data-id="project-hero-title"
            className="max-w-[18ch] font-[family-name:var(--font-matter)] text-[13px] tracking-[0.15em] text-cream uppercase md:text-sm"
          >
            {project.title}
          </h1>
        </div>
      </section>

      <section
        data-id="project-next"
        className="flex items-center justify-between px-6 py-16 md:px-12"
      >
        <Link
          href="/projects"
          data-id="project-back-link"
          className="text-[13px] tracking-[0.15em] uppercase transition-opacity duration-200 hover:opacity-50"
        >
          All Projects
        </Link>
        <Link
          href={`/project/${nextProject.slug}`}
          data-id="project-next-link"
          className={cn(
            "text-right text-[13px] tracking-[0.15em] uppercase",
            "transition-opacity duration-200 hover:opacity-50",
          )}
        >
          Next: {nextProject.title}
        </Link>
      </section>
      <SiteFooter />
    </main>
  );
};

export default ProjectPage;
