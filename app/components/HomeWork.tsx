import type { FC } from "react";

import type { HomeWorkBlock, HomeWorkCardItem } from "@/lib/work";

import { HomeWorkCard } from "./HomeWorkCard";

type Props = {
  blocks: HomeWorkBlock[];
};

export const HomeWork: FC<Props> = ({ blocks }) => (
  <section data-id="home-work" className="w-full">
    {blocks.map((block, blockIndex) => {
      const isLead = blockIndex === 0;
      return (
        <HomeWorkRow
          key={homeWorkRowKey(block)}
          block={block}
          isLead={isLead}
        />
      );
    })}
  </section>
);

type HomeWorkRowProps = {
  block: HomeWorkBlock;
  isLead: boolean;
};

const HomeWorkRow: FC<HomeWorkRowProps> = ({ block, isLead }) => {
  if (block.type === "portrait") {
    return <HomeWorkPortraitRow items={block.items} isLead={isLead} />;
  }

  return <HomeWorkLandscapeRow item={block} isLead={isLead} />;
};

type HomeWorkPortraitRowProps = {
  items: HomeWorkCardItem[];
  isLead: boolean;
};

const HomeWorkPortraitRow: FC<HomeWorkPortraitRowProps> = ({
  items,
  isLead,
}) => (
  <div
    data-id="home-work-portrait-row"
    className="flex w-full flex-col overflow-hidden md:flex-row"
  >
    {items.map((item, itemIndex) => {
      const priority = isLead && itemIndex === 0;
      return (
        <HomeWorkCard
          key={item.slug}
          item={item}
          className="w-full md:mr-px md:w-1/2 md:last:mr-0"
          sizes="(min-width: 768px) 50vw, 100vw"
          priority={priority}
        />
      );
    })}
  </div>
);

type HomeWorkLandscapeRowProps = {
  item: HomeWorkCardItem;
  isLead: boolean;
};

const HomeWorkLandscapeRow: FC<HomeWorkLandscapeRowProps> = ({
  item,
  isLead,
}) => (
  <div data-id="home-work-landscape-row" className="relative w-full">
    <HomeWorkCard
      item={item}
      className="w-full"
      sizes="100vw"
      isLandscape
      priority={isLead}
    />
  </div>
);

function homeWorkRowKey(block: HomeWorkBlock): string {
  if (block.type === "portrait") {
    return block.items.map((item) => item.slug).join("-");
  }

  return block.slug;
}
