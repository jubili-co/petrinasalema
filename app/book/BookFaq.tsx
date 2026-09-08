import type { FC } from "react";

import { cn } from "@/lib/cn";
import type { BookFaqItem } from "@/lib/seo";

type Props = {
  items: BookFaqItem[];
  heading: string;
};

export const BookFaq: FC<Props> = ({ items, heading }) => (
  <div data-id="book-faq" className="mt-16 border-t border-ink/20 pt-10">
    <h2
      data-id="book-faq-heading"
      className={cn(
        "m-0 mb-8 font-[family-name:var(--font-matter)]",
        "text-[length:var(--text-copy)] leading-[var(--leading-copy)] tracking-[0.15em] text-ink uppercase",
      )}
    >
      {heading}
    </h2>
    <div data-id="book-faq-list" className="flex flex-col gap-8">
      {items.map((item) => (
        <FaqItem key={item.question} item={item} />
      ))}
    </div>
  </div>
);

type FaqItemProps = {
  item: BookFaqItem;
};

const FaqItem: FC<FaqItemProps> = ({ item }) => {
  const { question, answer } = item;

  return (
    <div data-id="book-faq-item">
      <h3
        data-id="book-faq-question"
        className={cn(
          "m-0 mb-2 font-[family-name:var(--font-playfair)]",
          "text-[length:var(--text-copy)] leading-[var(--leading-copy)] font-[350] text-ink",
        )}
      >
        {question}
      </h3>
      <p
        data-id="book-faq-answer"
        className={cn(
          "m-0 font-[family-name:var(--font-playfair)]",
          "text-[length:var(--text-copy)] leading-[var(--leading-copy)] font-[350] text-ink/85",
        )}
      >
        {answer}
      </p>
    </div>
  );
};
