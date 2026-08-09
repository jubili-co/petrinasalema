import Link from "next/link";
import type { FC } from "react";

import { cn } from "@/lib/cn";
import {
  workOffersDoor,
  workPlace,
  type WorkCaseStudy,
  type WorkItem,
  type WorkLink,
  type WorkResult,
} from "@/lib/work";

type Props = {
  item: WorkItem;
  nextSlug: string;
};

export const WorkDetails: FC<Props> = ({ item, nextSlug }) => {
  const { name, subtitle, location, description, scope, links, caseStudy } =
    item;
  const hasScope = scope.length > 0;
  const hasLinks = links.length > 0;
  const linksHeading = links.length === 1 ? "Link" : "Links";
  const showDoor = workOffersDoor(item);

  return (
    <section
      data-id="work-details"
      className="bg-dotto-brown px-6 py-[30px] pb-10 text-dotto-cream md:px-12"
    >
      <div
        data-id="work-details-inner"
        className={cn(
          "flex flex-col gap-12",
          "md:flex-row md:flex-nowrap md:items-start md:gap-0",
        )}
      >
        <div data-id="work-details-main" className="w-full md:w-1/2">
          <div
            data-id="work-details-copy"
            className="mb-[54px] max-w-full md:mb-[70px] md:max-w-[70%]"
          >
            <h2
              data-id="work-details-title"
              className={cn(
                "m-0 mb-[10px] font-[family-name:var(--font-matter)]",
                "text-[13px] leading-[18px] tracking-[0.15em] uppercase",
              )}
            >
              {name}
            </h2>
            <p
              data-id="work-details-subtitle"
              className={cn(
                "m-0 mb-[10px] font-[family-name:var(--font-antiqua)]",
                "text-[13px] leading-[18px] font-[350]",
              )}
            >
              {subtitle}
            </p>
            <p
              data-id="work-details-location"
              className={cn(
                "m-0 mb-[18px] font-[family-name:var(--font-antiqua)]",
                "text-[13px] leading-[18px] font-[350]",
              )}
            >
              {workPlace(location)}
            </p>
            <p
              data-id="work-details-body"
              className={cn(
                "m-0 font-[family-name:var(--font-antiqua)]",
                "text-[13px] leading-[18px] font-[350]",
              )}
            >
              {description}
            </p>
            {caseStudy && <WorkCaseStudyBlock caseStudy={caseStudy} />}
            {showDoor && (
              <Link
                href="/book"
                data-id="work-details-door"
                className={cn(
                  "mt-[18px] inline-block font-[family-name:var(--font-antiqua)]",
                  "text-[13px] leading-[18px] font-[350] text-dotto-cream",
                  "underline underline-offset-4 transition-opacity duration-200 hover:opacity-70",
                )}
              >
                If a home like this is next, start with a fit call.
              </Link>
            )}
          </div>
        </div>

        <div data-id="work-details-meta" className="w-full md:w-[35%]">
          <div className="mb-[18px] flex justify-end md:hidden">
            <Link
              href={`/work/${nextSlug}`}
              data-id="work-details-next-mobile"
              className={cn(
                "font-[family-name:var(--font-matter)] text-[13px] leading-[18px]",
                "tracking-[0.15em] uppercase",
                "transition-opacity duration-200 hover:opacity-50",
              )}
            >
              Next
            </Link>
          </div>

          {hasScope && (
            <div data-id="work-details-scope" className="mb-[30px]">
              <h3
                data-id="work-details-scope-title"
                className={cn(
                  "m-0 mb-[10px] font-[family-name:var(--font-matter)]",
                  "text-[13px] leading-[18px] tracking-[0.15em] uppercase",
                )}
              >
                Scope
              </h3>
              <p
                data-id="work-details-scope-list"
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
            <div data-id="work-details-links">
              <h3
                data-id="work-details-links-title"
                className={cn(
                  "m-0 mb-[10px] font-[family-name:var(--font-matter)]",
                  "text-[13px] leading-[18px] tracking-[0.15em] uppercase",
                )}
              >
                {linksHeading}
              </h3>
              <ul
                data-id="work-details-links-list"
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
          data-id="work-details-next"
          className="hidden w-[15%] justify-end md:flex"
        >
          <Link
            href={`/work/${nextSlug}`}
            data-id="work-details-next-link"
            className={cn(
              "font-[family-name:var(--font-matter)]",
              "text-[13px] leading-[18px] tracking-[0.15em] uppercase",
              "transition-opacity duration-200 hover:opacity-50",
            )}
          >
            Next
          </Link>
        </div>
      </div>
    </section>
  );
};

type WorkCaseStudyBlockProps = {
  caseStudy: WorkCaseStudy;
};

const WorkCaseStudyBlock: FC<WorkCaseStudyBlockProps> = ({ caseStudy }) => {
  const { problem, decisions, result, results } = caseStudy;
  const bodyClassName = cn(
    "m-0 font-[family-name:var(--font-antiqua)]",
    "text-[13px] leading-[18px] font-[350]",
  );
  const labelClassName = cn(
    "m-0 mb-2 font-[family-name:var(--font-matter)]",
    "text-[11px] leading-[15px] tracking-[0.15em] uppercase text-dotto-cream/70",
  );

  return (
    <div data-id="work-case-study" className="mt-8 flex flex-col gap-6">
      <div data-id="work-case-study-problem">
        <p className={labelClassName}>The brief</p>
        <p data-id="work-case-study-problem-body" className={bodyClassName}>
          {problem}
        </p>
      </div>
      <div data-id="work-case-study-decisions">
        <p className={labelClassName}>What changed</p>
        <p data-id="work-case-study-decisions-body" className={bodyClassName}>
          {decisions}
        </p>
      </div>
      <div data-id="work-case-study-result">
        <p className={labelClassName}>What held</p>
        <p data-id="work-case-study-result-body" className={bodyClassName}>
          {result}
        </p>
      </div>
      {results.length > 0 && <WorkResultsList results={results} />}
    </div>
  );
};

type WorkResultsListProps = {
  results: WorkResult[];
};

const WorkResultsList: FC<WorkResultsListProps> = ({ results }) => (
  <ul
    data-id="work-case-study-results"
    className="m-0 flex list-none flex-col gap-4 border-t border-dotto-cream/25 p-0 pt-6"
  >
    {results.map((entry) => (
      <WorkResultRow key={`${entry.value}-${entry.label}`} result={entry} />
    ))}
  </ul>
);

type WorkResultRowProps = {
  result: WorkResult;
};

const WorkResultRow: FC<WorkResultRowProps> = ({ result }) => {
  const { value, label } = result;

  return (
    <li data-id="work-case-study-result-row">
      <p
        data-id="work-case-study-result-value"
        className={cn(
          "m-0 font-[family-name:var(--font-matter)]",
          "text-[13px] leading-[18px] tracking-[0.08em] uppercase",
        )}
      >
        {value}
      </p>
      <p
        data-id="work-case-study-result-label"
        className={cn(
          "m-0 mt-1 font-[family-name:var(--font-antiqua)]",
          "text-[13px] leading-[18px] font-[350] text-dotto-cream/85",
        )}
      >
        {label}
      </p>
    </li>
  );
};

type ExternalLinkItemProps = {
  link: WorkLink;
};

const ExternalLinkItem: FC<ExternalLinkItemProps> = ({ link }) => {
  const { href, text } = link;

  return (
    <li data-id="work-details-link" className="mb-[10px] last:mb-0">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        data-id="work-details-link-anchor"
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
