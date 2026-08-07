import type { FC } from "react";

import type { HomeWorkBlock } from "@/lib/work";

import { HomeWorkCard } from "./HomeWorkCard";

type Props = {
  blocks: HomeWorkBlock[];
};

export const HomeWork: FC<Props> = ({ blocks }) => (
  <section data-id="home-work" className="w-full">
    {blocks.map((block) => {
      if (block.type === "portrait") {
        return (
          <div
            key={block.items.map((item) => item.slug).join("-")}
            data-id="home-work-portrait-row"
            className="flex w-full flex-col overflow-hidden md:flex-row"
          >
            {block.items.map((item) => (
              <HomeWorkCard
                key={item.slug}
                item={item}
                className="w-full md:mr-px md:w-1/2 md:last:mr-0"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            ))}
          </div>
        );
      }

      return (
        <div
          key={block.slug}
          data-id="home-work-landscape-row"
          className="relative w-full"
        >
          <HomeWorkCard
            item={block}
            className="w-full"
            sizes="100vw"
            isLandscape
          />
        </div>
      );
    })}
  </section>
);
