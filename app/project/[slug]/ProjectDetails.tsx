import Link from "next/link";
import type { FC } from "react";

import { cn } from "@/lib/cn";
import {
  projectPlace,
  type ProjectsItem,
  type ProjectsLink,
} from "@/lib/projects";

type Props = {
  project: ProjectsItem;
  nextSlug: string;
};

export const ProjectDetails: FC<Props> = ({ project, nextSlug }) => {
  const { name, subtitle, location, description, scope, links } = project;
  const hasScope = scope.length > 0;
  const hasLinks = links.length > 0;
  const linksHeading = links.length === 1 ? "Link" : "Links";

  return (
    <section
      data-id="project-details"
      className="bg-dotto-brown px-6 py-[30px] pb-10 text-dotto-cream md:px-12"
    >
      <div
        data-id="project-details-inner"
        className={cn(
          "flex flex-col gap-12",
          "md:flex-row md:flex-nowrap md:items-start md:gap-0",
        )}
      >
        <div data-id="project-details-main" className="w-full md:w-1/2">
          <div
            data-id="project-details-copy"
            className="mb-[54px] max-w-full md:mb-[70px] md:max-w-[70%]"
          >
            <h2
              data-id="project-details-title"
              className={cn(
                "m-0 mb-[10px] font-[family-name:var(--font-matter)]",
                "text-[13px] leading-[18px] tracking-[0.15em] uppercase",
              )}
            >
              {name}
            </h2>
            <p
              data-id="project-details-subtitle"
              className={cn(
                "m-0 mb-[10px] font-[family-name:var(--font-antiqua)]",
                "text-[13px] leading-[18px] font-[350]",
              )}
            >
              {subtitle}
            </p>
            <p
              data-id="project-details-location"
              className={cn(
                "m-0 mb-[18px] font-[family-name:var(--font-antiqua)]",
                "text-[13px] leading-[18px] font-[350]",
              )}
            >
              {projectPlace(location)}
            </p>
            <p
              data-id="project-details-body"
              className={cn(
                "m-0 font-[family-name:var(--font-antiqua)]",
                "text-[13px] leading-[18px] font-[350]",
              )}
            >
              {description}
            </p>
          </div>
        </div>

        <div data-id="project-details-meta" className="w-full md:w-[35%]">
          <div className="mb-[18px] flex justify-end md:hidden">
            <Link
              href={`/project/${nextSlug}`}
              data-id="project-details-next-mobile"
              className={cn(
                "font-[family-name:var(--font-matter)] text-[13px] leading-[18px]",
                "tracking-[0.15em] uppercase",
                "transition-opacity duration-200 hover:opacity-50",
              )}
            >
              Next Project
            </Link>
          </div>

          {hasScope && (
            <div data-id="project-details-scope" className="mb-[30px]">
              <h3
                data-id="project-details-scope-title"
                className={cn(
                  "m-0 mb-[10px] font-[family-name:var(--font-matter)]",
                  "text-[13px] leading-[18px] tracking-[0.15em] uppercase",
                )}
              >
                Scope
              </h3>
              <p
                data-id="project-details-scope-list"
                className={cn(
                  "m-0 font-[family-name:var(--font-antiqua)]",
                  "text-[13px] leading-[18px] font-[350]",
                )}
              >
                {scope.join(" · ")}
              </p>
            </div>
          )}

          {hasLinks && (
            <div data-id="project-details-links">
              <h3
                data-id="project-details-links-title"
                className={cn(
                  "m-0 mb-[10px] font-[family-name:var(--font-matter)]",
                  "text-[13px] leading-[18px] tracking-[0.15em] uppercase",
                )}
              >
                {linksHeading}
              </h3>
              <ul
                data-id="project-details-links-list"
                className="m-0 list-none p-0"
              >
                {links.map((link) => (
                  <ExternalLinkItem key={link.href} link={link} />
                ))}
              </ul>
            </div>
          )}
        </div>

        <div
          data-id="project-details-next"
          className="hidden w-[15%] justify-end md:flex"
        >
          <Link
            href={`/project/${nextSlug}`}
            data-id="project-details-next-link"
            className={cn(
              "font-[family-name:var(--font-matter)]",
              "text-[13px] leading-[18px] tracking-[0.15em] uppercase",
              "transition-opacity duration-200 hover:opacity-50",
            )}
          >
            Next Project
          </Link>
        </div>
      </div>
    </section>
  );
};

type ExternalLinkItemProps = {
  link: ProjectsLink;
};

const ExternalLinkItem: FC<ExternalLinkItemProps> = ({ link }) => {
  const { href, text } = link;

  return (
    <li data-id="project-details-link" className="mb-[10px] last:mb-0">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        data-id="project-details-link-anchor"
        className={cn(
          "font-[family-name:var(--font-antiqua)] text-[13px] leading-[18px] font-[350]",
          "underline transition-opacity duration-200 hover:opacity-50",
        )}
      >
        {text}
      </a>
    </li>
  );
};
