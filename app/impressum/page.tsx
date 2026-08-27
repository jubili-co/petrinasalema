import type { Metadata } from "next";
import type { FC } from "react";

import { cn } from "@/lib/cn";
import impressum from "@/lib/data/impressum.json";

import { PaperWord } from "../components/PaperWord";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = {
  title: impressum.seoTitle,
  description: impressum.seoDescription,
};

type ImpressumBlock =
  { type: "heading"; text: string } | { type: "paragraph"; text: string };

const blocks = impressum.blocks as ImpressumBlock[];

const ImpressumPage: FC = () => (
  <main data-id="impressum-page" className="mt-[100px] min-h-dvh bg-canvas">
    <SiteHeader />
    <section
      data-id="impressum-textarea"
      className={cn(
        "relative overflow-hidden",
        "my-[38px] w-full max-w-full px-6",
        "min-[900px]:my-[138px] min-[900px]:px-12",
      )}
    >
      <PaperWord
        word="ersterStock"
        data-id="impressum-word"
        className="-right-8 top-0 w-28 rotate-[16deg] md:w-36"
      />
      <div
        data-id="impressum-textarea-inner"
        className="flex w-full justify-start min-[900px]:justify-center"
      >
        <div
          data-id="impressum-textarea-content"
          className={cn(
            "relative w-4/5 max-w-[960px] text-left text-ink",
            "font-[family-name:var(--font-playfair)] text-[length:var(--text-copy)] leading-[var(--leading-copy)] font-[350]",
          )}
        >
          {blocks.map((block, index) => (
            <ImpressumBlockView key={`${block.type}-${index}`} block={block} />
          ))}
        </div>
      </div>
    </section>
    <SiteFooter />
  </main>
);

export default ImpressumPage;

type ImpressumBlockViewProps = {
  block: ImpressumBlock;
};

const ImpressumBlockView: FC<ImpressumBlockViewProps> = ({ block }) => {
  if (block.type === "heading") {
    return (
      <h1
        data-id="impressum-heading"
        className={cn(
          "m-0 mb-[10px] font-[family-name:var(--font-matter)]",
          "text-[length:var(--text-copy)] leading-[var(--leading-copy)] font-normal tracking-[0.15em] text-ink uppercase",
        )}
      >
        {block.text}
      </h1>
    );
  }

  return (
    <p
      data-id="impressum-paragraph"
      className={cn(
        "m-0 mb-[30px] whitespace-pre-line",
        "font-[family-name:var(--font-playfair)] text-[length:var(--text-copy)] leading-[var(--leading-copy)] font-[350] text-ink",
        "last:mb-0",
      )}
    >
      {block.text}
    </p>
  );
};
