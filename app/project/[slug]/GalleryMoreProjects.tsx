import Link from "next/link";
import type { FC } from "react";

import { cn } from "@/lib/cn";
import type { MoreProjectLink } from "@/lib/projects";

type Props = {
  projects: MoreProjectLink[];
};

export const GalleryMoreProjects: FC<Props> = ({ projects }) => (
  <aside
    data-id="project-gallery-more"
    className={cn(
      "hidden md:flex md:w-1/2 md:self-stretch",
      "items-center justify-center bg-dotto-cream p-6 md:p-10",
    )}
  >
    <div
      data-id="project-gallery-more-inner"
      className={cn(
        "flex aspect-square w-full max-w-[22rem] flex-col justify-center gap-8",
        "border border-dotto-brown px-8 py-10",
      )}
    >
      <h2
        data-id="project-gallery-more-title"
        className={cn(
          "m-0 font-[family-name:var(--font-matter)]",
          "text-[13px] leading-[18px] tracking-[0.15em] text-dotto-brown uppercase",
        )}
      >
        More projects
      </h2>
      <ul data-id="project-gallery-more-list" className="m-0 list-none p-0">
        {projects.map((project) => (
          <MoreProjectItem key={project.slug} project={project} />
        ))}
      </ul>
      <Link
        href="/projects"
        data-id="project-gallery-more-all"
        className={cn(
          "group/cta inline-block font-[family-name:var(--font-matter)]",
          "text-[12px] tracking-[0.15em] text-dotto-brown uppercase",
          "transition-opacity duration-200 ease-out hover:opacity-70",
        )}
      >
        View all
        <span
          data-id="project-gallery-more-all-arrow"
          aria-hidden
          className="ml-[0.35em] inline-block transition-transform duration-200 ease-out group-hover/cta:translate-x-0.5"
        >
          →
        </span>
      </Link>
    </div>
  </aside>
);

type MoreProjectItemProps = {
  project: MoreProjectLink;
};

const MoreProjectItem: FC<MoreProjectItemProps> = ({ project }) => {
  const { name, slug } = project;

  return (
    <li data-id="project-gallery-more-item" className="mb-4 last:mb-0">
      <Link
        href={`/project/${slug}`}
        data-id="project-gallery-more-link"
        className={cn(
          "font-[family-name:var(--font-antiqua)] text-[15px] leading-[22px] font-[350] text-dotto-brown",
          "underline-offset-4 transition-opacity duration-200 hover:opacity-50 hover:underline",
        )}
      >
        {name}
      </Link>
    </li>
  );
};
