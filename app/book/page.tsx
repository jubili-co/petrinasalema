import type { Metadata } from "next";
import Image from "next/image";
import type { FC } from "react";

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
        </div>
        <BookPanel book={content} />
      </section>
    </main>
  );
};

export default BookPage;
