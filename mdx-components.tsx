import type { MDXComponents } from "mdx/types";

import { dsMdxComponents } from "@/app/components/ds/DsMarkdown";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...dsMdxComponents,
    ...components,
  };
}
