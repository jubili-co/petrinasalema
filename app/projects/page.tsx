import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";

import { cn } from "@/lib/cn";
import projects from "@/lib/data/projects.json";

import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "Projects | Dotto",
  description:
    "A selection of residential and hospitality interiors by Dotto.",
};

const ProjectsPage: FC = () => (
  <main data-id="projects-page" className="min-h-dvh bg-cream">
    <SiteHeader />
    <section
      data-id="projects-grid"
      className="mt-[74px] grid grid-cols-1 gap-px md:mt-[79px] md:grid-cols-2 lg:grid-cols-3"
    >
      {projects.map((project) => (
        <Link
          key={project.slug}
          href={`/project/${project.slug}`}
          data-id="projects-grid-card"
          className="group relative aspect-[1440/1860] overflow-hidden"
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
          />
          <div
            data-id="projects-grid-card-overlay"
            className={cn(
              "absolute inset-0 flex items-end",
              "bg-gradient-to-t from-black/40 via-transparent to-transparent",
              "opacity-100 transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100",
            )}
          >
            <h2
              data-id="projects-grid-card-title"
              className="p-6 font-[family-name:var(--font-matter)] text-[13px] tracking-[0.15em] text-cream uppercase"
            >
              {project.title}
            </h2>
          </div>
        </Link>
      ))}
    </section>
    <SiteFooter />
  </main>
);

export default ProjectsPage;
