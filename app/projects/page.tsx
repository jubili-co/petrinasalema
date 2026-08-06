import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";

import { cn } from "@/lib/cn";
import { PROJECTS } from "@/lib/projects";

import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "Projects | Petrina Salema",
  description:
    "Selected architecture, interiors and project-management work by Petrina Salema.",
};

const ProjectsPage: FC = () => (
  <main data-id="projects-page" className="min-h-dvh bg-dotto-cream">
    <SiteHeader />
    <section
      data-id="projects-grid"
      className="mt-[74px] grid grid-cols-1 gap-px md:mt-[79px] md:grid-cols-2 lg:grid-cols-3"
    >
      {PROJECTS.map((project) => {
        const { id, slug, name, subtitle, location, images } = project;
        const cover = images[0];

        return (
          <Link
            key={id}
            href={`/project/${slug}`}
            data-id="projects-grid-card"
            className="group relative aspect-[1440/1860] overflow-hidden bg-dotto-brown"
          >
            {cover && (
              <Image
                src={cover.src}
                alt={cover.alt || name}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              />
            )}
            <div
              data-id="projects-grid-card-overlay"
              className={cn(
                "absolute inset-0 flex flex-col justify-end",
                "bg-gradient-to-t from-black/50 via-transparent to-transparent",
                "p-6",
              )}
            >
              <h2
                data-id="projects-grid-card-title"
                className="m-0 font-[family-name:var(--font-matter)] text-[13px] tracking-[0.15em] text-dotto-cream uppercase"
              >
                {name}
              </h2>
              <p
                data-id="projects-grid-card-subtitle"
                className="m-0 mt-2 font-[family-name:var(--font-antiqua)] text-[13px] leading-[18px] font-[350] text-dotto-cream"
              >
                {subtitle}
              </p>
              <p
                data-id="projects-grid-card-location"
                className="m-0 mt-1 font-[family-name:var(--font-antiqua)] text-[13px] leading-[18px] font-[350] text-dotto-cream/80"
              >
                {location}
              </p>
            </div>
          </Link>
        );
      })}
    </section>
    <SiteFooter />
  </main>
);

export default ProjectsPage;
