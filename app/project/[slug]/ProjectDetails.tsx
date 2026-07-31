import Link from "next/link";
import type { FC } from "react";

import { cn } from "@/lib/cn";
import type { ProjectsItem, ProjectsLink, ProjectsRole } from "@/lib/projects";

type Props = {
  project: ProjectsItem;
  nextSlug: string;
};

export const ProjectDetails: FC<Props> = ({ project, nextSlug }) => {
  const { name, subtitle, location, description, roles, scope, tags, links } =
    project;
  const hasRoles = roles.length > 0;
  const hasScope = scope.length > 0;
  const hasTags = tags.length > 0;
  const hasLinks = links.length > 0;

  return (
    <section
      data-id="project-details"
      className="bg-brown px-6 py-[30px] pb-10 text-cream md:px-12"
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
              {location}
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

          {hasRoles && (
            <div data-id="project-details-roles" className="mb-[30px]">
              <h3
                data-id="project-details-roles-title"
                className={cn(
                  "m-0 mb-[10px] font-[family-name:var(--font-matter)]",
                  "text-[13px] leading-[18px] tracking-[0.15em] uppercase",
                )}
              >
                Roles
              </h3>
              <ul
                data-id="project-details-roles-list"
                className="m-0 list-none p-0"
              >
                {roles.map((entry) => (
                  <RoleEntry key={`${entry.name}-${entry.role}`} role={entry} />
                ))}
              </ul>
            </div>
          )}
        </div>

        <div data-id="project-details-meta" className="w-full md:w-[35%]">
          <div className="mb-[18px] flex items-start justify-between gap-4 md:block">
            {hasScope && (
              <h3
                data-id="project-details-scope-title"
                className={cn(
                  "m-0 font-[family-name:var(--font-matter)]",
                  "text-[13px] leading-[18px] tracking-[0.15em] uppercase",
                )}
              >
                Scope
              </h3>
            )}
            <Link
              href={`/project/${nextSlug}`}
              data-id="project-details-next-mobile"
              className={cn(
                "font-[family-name:var(--font-matter)] text-[13px] leading-[18px]",
                "tracking-[0.15em] uppercase md:hidden",
                "transition-opacity duration-200 hover:opacity-50",
              )}
            >
              Next Project
            </Link>
          </div>

          {hasScope && (
            <ul
              data-id="project-details-scope-list"
              className="m-0 mb-[30px] list-none p-0"
            >
              {scope.map((item) => (
                <li
                  key={item}
                  data-id="project-details-scope-item"
                  className={cn(
                    "mb-[10px] font-[family-name:var(--font-antiqua)]",
                    "text-[13px] leading-[18px] font-[350] last:mb-0",
                  )}
                >
                  {item}
                </li>
              ))}
            </ul>
          )}

          {hasTags && (
            <div data-id="project-details-tags" className="mb-[30px]">
              <h3
                data-id="project-details-tags-title"
                className={cn(
                  "m-0 mb-[10px] font-[family-name:var(--font-matter)]",
                  "text-[13px] leading-[18px] tracking-[0.15em] uppercase",
                )}
              >
                Tags
              </h3>
              <p
                data-id="project-details-tags-list"
                className={cn(
                  "m-0 font-[family-name:var(--font-antiqua)]",
                  "text-[13px] leading-[18px] font-[350]",
                )}
              >
                {tags.join(" · ")}
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
                Links
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

type RoleEntryProps = {
  role: ProjectsRole;
};

const RoleEntry: FC<RoleEntryProps> = ({ role }) => {
  const { name, role: title } = role;

  return (
    <li data-id="project-details-role" className="mb-5 last:mb-0">
      <h4
        className={cn(
          "m-0 font-[family-name:var(--font-antiqua)]",
          "text-[13px] leading-[18px] font-[350]",
        )}
      >
        {name}
      </h4>
      <p
        className={cn(
          "m-0 font-[family-name:var(--font-antiqua)]",
          "text-[13px] leading-[18px] font-[350]",
        )}
      >
        {title}
      </p>
    </li>
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
