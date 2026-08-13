import Link from "next/link";
import type { FC } from "react";

import { cn } from "@/lib/cn";

import { CtaLink } from "../components/CtaLink";

export type StudioPrinciple = {
  title: string;
  body: string;
};

export type StudioCta = {
  label: string;
  href: string;
  microcopy?: string;
};

export type StudioExtension = {
  label: string;
  href: string;
  note: string;
  external?: boolean;
};

export type StudioContent = {
  eyebrow: string;
  hook: string;
  body: string;
  principles: StudioPrinciple[];
  ctaLede?: string;
  primaryCta: StudioCta;
  secondaryCta: StudioCta;
  extensions: StudioExtension[];
};

type Props = {
  studio: StudioContent;
};

export const StudioPanel: FC<Props> = ({ studio }) => {
  const {
    eyebrow,
    hook,
    body,
    principles,
    ctaLede,
    primaryCta,
    secondaryCta,
    extensions,
  } = studio;
  const microcopyClassName = cn(
    "m-0 mt-3 font-[family-name:var(--font-antiqua)]",
    "text-[12px] leading-[16px] font-[350] text-dotto-brown/85",
  );

  return (
    <div
      data-id="studio-panel"
      className={cn(
        "flex w-full flex-col justify-start",
        "px-6 pt-10 pb-20 md:w-1/2 md:px-[30px] md:pt-12 md:pb-24 lg:px-12",
      )}
    >
      <div data-id="studio-panel-inner" className="mx-auto w-full max-w-[420px]">
        <p
          data-id="studio-eyebrow"
          className={cn(
            "m-0 mb-6 font-[family-name:var(--font-matter)]",
            "text-[13px] leading-[18px] tracking-[0.15em] text-dotto-brown uppercase",
          )}
        >
          {eyebrow}
        </p>

        <p
          data-id="studio-hook"
          className={cn(
            "m-0 font-[family-name:var(--font-antiqua)]",
            "text-[22px] leading-[1.45] font-[350] text-dotto-brown",
            "md:text-[24px] md:leading-[1.42]",
          )}
        >
          {hook}
        </p>

        <p
          data-id="studio-body"
          className={cn(
            "m-0 mt-8 font-[family-name:var(--font-antiqua)]",
            "text-[13px] leading-[18px] font-[350] text-dotto-brown",
          )}
        >
          {body}
        </p>

        <div data-id="studio-principles" className="mt-14 flex flex-col gap-10">
          {principles.map((principle) => (
            <PrincipleBlock key={principle.title} principle={principle} />
          ))}
        </div>

        <div data-id="studio-cta-block" className="mt-14">
          {ctaLede && (
            <p
              data-id="studio-cta-lede"
              className={cn(
                "m-0 mb-6 font-[family-name:var(--font-antiqua)]",
                "text-[13px] leading-[18px] font-[350] text-dotto-brown",
              )}
            >
              {ctaLede}
            </p>
          )}
          <div
            data-id="studio-ctas"
            className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-4"
          >
            <div data-id="studio-primary" className="min-w-0 flex-1">
              <CtaLink
                href={primaryCta.href}
                variant="primary"
                className="w-full"
                data-id="studio-action-link"
              >
                {primaryCta.label}
              </CtaLink>
              {primaryCta.microcopy && (
                <p
                  data-id="studio-primary-microcopy"
                  className={microcopyClassName}
                >
                  {primaryCta.microcopy}
                </p>
              )}
            </div>
            <div data-id="studio-secondary" className="min-w-0 flex-1">
              <CtaLink
                href={secondaryCta.href}
                variant="secondary"
                className="w-full"
                data-id="studio-action-link"
              >
                {secondaryCta.label}
              </CtaLink>
              {secondaryCta.microcopy && (
                <p
                  data-id="studio-secondary-microcopy"
                  className={microcopyClassName}
                >
                  {secondaryCta.microcopy}
                </p>
              )}
            </div>
          </div>
        </div>

        <div
          data-id="studio-extensions"
          className="mt-16 border-t border-dotto-brown/25 pt-8"
        >
          <ul className="m-0 flex list-none flex-col gap-5 p-0">
            {extensions.map((extension) => (
              <ExtensionRow key={extension.href} extension={extension} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

type PrincipleBlockProps = {
  principle: StudioPrinciple;
};

const PrincipleBlock: FC<PrincipleBlockProps> = ({ principle }) => {
  const { title, body } = principle;

  return (
    <div data-id="studio-principle">
      <h2
        data-id="studio-principle-title"
        className={cn(
          "m-0 mb-2 font-[family-name:var(--font-matter)]",
          "text-[13px] leading-[18px] tracking-[0.15em] text-dotto-brown uppercase",
        )}
      >
        {title}
      </h2>
      <p
        data-id="studio-principle-body"
        className={cn(
          "m-0 font-[family-name:var(--font-antiqua)]",
          "text-[13px] leading-[18px] font-[350] text-dotto-brown",
        )}
      >
        {body}
      </p>
    </div>
  );
};

type ExtensionRowProps = {
  extension: StudioExtension;
};

const ExtensionRow: FC<ExtensionRowProps> = ({ extension }) => {
  const { label, href, note, external } = extension;
  const className = cn(
    "group/ext flex flex-col gap-1",
    "transition-opacity duration-200 hover:opacity-70",
  );
  const labelNode = (
    <span
      data-id="studio-extension-label"
      className={cn(
        "font-[family-name:var(--font-matter)]",
        "text-[13px] tracking-[0.15em] text-dotto-brown uppercase",
      )}
    >
      {label}
      <span aria-hidden className="ml-[0.35em] inline-block transition-transform duration-200 group-hover/ext:translate-x-0.5">
        →
      </span>
    </span>
  );
  const noteNode = (
    <span
      data-id="studio-extension-note"
      className={cn(
        "font-[family-name:var(--font-antiqua)]",
        "text-[12px] leading-[16px] font-[350] text-dotto-brown/85",
      )}
    >
      {note}
    </span>
  );

  if (external) {
    return (
      <li data-id="studio-extension">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          data-id="studio-extension-link"
          className={className}
        >
          {labelNode}
          {noteNode}
        </a>
      </li>
    );
  }

  return (
    <li data-id="studio-extension">
      <Link href={href} data-id="studio-extension-link" className={className}>
        {labelNode}
        {noteNode}
      </Link>
    </li>
  );
};
