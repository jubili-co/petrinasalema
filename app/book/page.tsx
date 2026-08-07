import type { Metadata } from "next";
import Image from "next/image";
import type { FC } from "react";

import { cn } from "@/lib/cn";
import book from "@/lib/data/book.json";
import { resolveProjectImageSrc } from "@/lib/googleDrive";

import { SiteHeader } from "../components/SiteHeader";
import { BookPanel, type BookContent } from "./BookPanel";

export const metadata: Metadata = {
  title: book.seoTitle,
  description: book.seoDescription,
};

const BookPage: FC = () => {
  const content = book as BookContent;
  const imageSrc = resolveProjectImageSrc(book.image);
  const { imageCaption } = book;

  return (
    <main data-id="book-page" className="min-h-dvh bg-dotto-cream">
      <SiteHeader />
      <section
        data-id="book-section"
        className="flex min-h-dvh flex-col pt-[78px] md:flex-row"
      >
        <div
          data-id="book-media"
          className="relative min-h-[70vw] w-full md:min-h-[calc(100dvh-78px)] md:w-1/2"
        >
          <Image
            src={imageSrc}
            alt="Petrina Salema studio"
            fill
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
          <p
            data-id="book-media-caption"
            className={cn(
              "absolute inset-x-0 bottom-0 m-0 px-6 py-5",
              "bg-gradient-to-t from-black/45 to-transparent",
              "font-[family-name:var(--font-antiqua)] text-[13px] leading-[18px] font-[350] text-dotto-cream",
              "md:px-10",
            )}
          >
            {imageCaption}
          </p>
        </div>
        <BookPanel book={content} />
      </section>
    </main>
  );
};

export default BookPage;
