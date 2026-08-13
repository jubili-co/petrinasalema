import type { Metadata } from "next";
import type { FC } from "react";

import { cn } from "@/lib/cn";
import privacy from "@/lib/data/privacy.json";

import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = {
  title: privacy.seoTitle,
  description: privacy.seoDescription,
};

type PrivacyBlock =
  { type: "heading"; text: string } | { type: "paragraph"; text: string };

const blocks = privacy.blocks as PrivacyBlock[];

const PrivacyPage: FC = () => (
  <main data-id="privacy-page" className="mt-[100px] min-h-dvh bg-dotto-cream">
    <SiteHeader />
    <section
      data-id="privacy-textarea"
      className={cn(
        "my-[38px] w-full max-w-full px-6",
        "min-[900px]:my-[138px] min-[900px]:px-12",
      )}
    >
      <div
        data-id="privacy-textarea-inner"
        className="flex w-full justify-start min-[900px]:justify-center"
      >
        <div
          data-id="privacy-textarea-content"
          className={cn(
            "w-4/5 max-w-[960px] text-left text-dotto-brown",
            "font-[family-name:var(--font-playfair)] text-[13px] leading-[18px] font-[350]",
          )}
        >
          {blocks.map((block, index) => (
            <PrivacyBlockView key={`${block.type}-${index}`} block={block} />
          ))}
        </div>
      </div>
    </section>
    <SiteFooter />
  </main>
);

export default PrivacyPage;

type PrivacyBlockViewProps = {
  block: PrivacyBlock;
};

const PrivacyBlockView: FC<PrivacyBlockViewProps> = ({ block }) => {
  if (block.type === "heading") {
    return (
      <h1
        data-id="privacy-heading"
        className={cn(
          "m-0 mb-[10px] font-[family-name:var(--font-matter)]",
          "text-[13px] leading-[18px] font-normal tracking-[0.15em] text-dotto-brown uppercase",
        )}
      >
        {block.text}
      </h1>
    );
  }

  return (
    <p
      data-id="privacy-paragraph"
      className={cn(
        "m-0 mb-[30px] whitespace-pre-line",
        "font-[family-name:var(--font-playfair)] text-[13px] leading-[18px] font-[350] text-dotto-brown",
        "last:mb-0",
      )}
    >
      {block.text}
    </p>
  );
};
