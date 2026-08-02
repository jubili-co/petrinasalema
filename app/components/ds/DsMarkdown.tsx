import type { MDXComponents } from "mdx/types";
import type { FC, ReactNode } from "react";

import { DsText } from "@/app/components/ds/DsText";

type Props = {
  children: ReactNode;
  className?: string;
};

/** Shell for MDX copy. Element styles come from `dsMdxComponents` / `mdx-components`. */
export const DsMarkdown: FC<Props> = ({ children, className }) => (
  <div data-id="ds-markdown" className={className}>
    {children}
  </div>
);

export const dsMdxComponents = {
  h1: ({ children }) => (
    <DsText data-id="ds-markdown-h1" variant="h1">
      {children}
    </DsText>
  ),
  h2: ({ children }) => (
    <DsText data-id="ds-markdown-h2" variant="h2">
      {children}
    </DsText>
  ),
  h3: ({ children }) => (
    <DsText data-id="ds-markdown-h3" variant="h3">
      {children}
    </DsText>
  ),
  h4: ({ children }) => (
    <DsText data-id="ds-markdown-h4" variant="h4">
      {children}
    </DsText>
  ),
  h5: ({ children }) => (
    <DsText data-id="ds-markdown-h5" variant="h5">
      {children}
    </DsText>
  ),
  h6: ({ children }) => (
    <DsText data-id="ds-markdown-h6" variant="h6">
      {children}
    </DsText>
  ),
  p: ({ children }) => (
    <DsText
      as="p"
      data-id="ds-markdown-p"
      variant="body"
      className="m-0 mb-[18px] last:mb-0"
    >
      {children}
    </DsText>
  ),
  strong: ({ children }) => (
    <strong data-id="ds-markdown-strong" className="font-semibold">
      {children}
    </strong>
  ),
  em: ({ children }) => (
    <em data-id="ds-markdown-em" className="italic">
      {children}
    </em>
  ),
  a: ({ href, children }) => <MarkdownLink href={href}>{children}</MarkdownLink>,
  ul: ({ children }) => (
    <ul
      data-id="ds-markdown-ul"
      className="m-0 mb-[18px] list-disc pl-5 last:mb-0"
    >
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol
      data-id="ds-markdown-ol"
      className="m-0 mb-[18px] list-decimal pl-5 last:mb-0"
    >
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li data-id="ds-markdown-li" className="mb-1 last:mb-0">
      <DsText as="span" variant="body">
        {children}
      </DsText>
    </li>
  ),
} satisfies MDXComponents;

type MarkdownLinkProps = {
  href?: string;
  children: ReactNode;
};

const MarkdownLink: FC<MarkdownLinkProps> = ({ href = "#", children }) => {
  const isExternal = href.startsWith("http");
  const target = isExternal ? "_blank" : undefined;
  const rel = isExternal ? "noopener noreferrer" : undefined;

  return (
    <a
      href={href}
      data-id="ds-markdown-a"
      className="text-inherit underline-offset-2 !underline"
      target={target}
      rel={rel}
    >
      {children}
    </a>
  );
};
