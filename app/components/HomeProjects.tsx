import type { FC } from "react";

import { HomeProjectCard } from "./HomeProjectCard";

type ProjectItem = {
  title: string;
  slug: string;
  image: string;
  alt: string;
};

type PortraitBlock = {
  type: "portrait";
  items: ProjectItem[];
};

type LandscapeBlock = {
  type: "landscape";
  title: string;
  slug: string;
  image: string;
  alt: string;
};

export type HomeProjectBlock = PortraitBlock | LandscapeBlock;

type Props = {
  blocks: HomeProjectBlock[];
};

export const HomeProjects: FC<Props> = ({ blocks }) => (
  <section data-id="home-projects" className="w-full">
    {blocks.map((block) => {
      if (block.type === "portrait") {
        return (
          <div
            key={block.items.map((item) => item.slug).join("-")}
            data-id="home-projects-portrait-row"
            className="flex w-full flex-col overflow-hidden md:flex-row"
          >
            {block.items.map((item) => (
              <HomeProjectCard
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
          data-id="home-projects-landscape-row"
          className="relative w-full"
        >
          <HomeProjectCard
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
