import type { Metadata } from "next";
import type { FC } from "react";

import { FadeImage } from "@/app/components/FadeImage";
import book from "@/lib/data/book.json";
import { resolveProjectImageSrc } from "@/lib/googleDrive";
import { placeholderSrc } from "@/lib/placeholderSrc";

import { SiteHeader } from "../components/SiteHeader";
import { BookPanel, type BookContent } from "./BookPanel";

export const metadata: Metadata = {
  title: book.seoTitle,
  description: book.seoDescription,
};

const BookPage: FC = () => {
  const content = book as BookContent;
  const imageSrc = resolveProjectImageSrc(book.image);
  const placeholder = placeholderSrc(book.image);

  return (
    <main data-id="book-page" className="min-h-dvh bg-canvas">
      <SiteHeader />
      <section
        data-id="book-section"
        className="flex min-h-dvh flex-col pt-[78px] md:flex-row"
      >
        <div
          data-id="book-media"
          className="relative min-h-[70vw] w-full md:min-h-[calc(100dvh-78px)] md:w-1/2"
        >
          <FadeImage
            src={imageSrc}
            alt="Petrina Salema studio"
            placeholder={placeholder}
            fill
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
            data-id="book-media-image"
          />
        </div>
        <BookPanel book={content} />
      </section>
    </main>
  );
};

export default BookPage;
