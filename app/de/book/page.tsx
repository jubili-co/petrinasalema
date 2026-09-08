import type { Metadata } from "next";
import type { FC } from "react";

import { BookPanel, type BookContent } from "@/app/book/BookPanel";
import { FadeImage } from "@/app/components/FadeImage";
import { JsonLd } from "@/app/components/JsonLd";
import { SiteFooter } from "@/app/components/SiteFooter";
import { SiteHeader } from "@/app/components/SiteHeader";
import { withTrackedCtas } from "@/lib/booking";
import book from "@/lib/data/de/book.json";
import { resolveProjectImageSrc } from "@/lib/googleDrive";
import { localizedPath } from "@/lib/locale";
import { placeholderSrc } from "@/lib/placeholderSrc";
import { absoluteUrl, bookJsonLd, pageMetadata } from "@/lib/seo";

const path = localizedPath("/book", "de-AT");

export const metadata: Metadata = pageMetadata({
  title: book.seoTitle,
  description: book.seoDescription,
  path,
  locale: "de-AT",
  languages: {
    en: absoluteUrl("/book"),
    "de-AT": absoluteUrl(path),
  },
});

const DeBookPage: FC = () => {
  const content = withTrackedCtas({
    ...(book as BookContent),
    faqHeading: "Bevor du buchst",
  });
  const imageSrc = resolveProjectImageSrc(book.image);
  const placeholder = placeholderSrc(book.image);
  const pageLd = bookJsonLd({
    description: book.seoDescription,
    faq: book.faq,
    inLanguage: "de-AT",
    path,
  });

  return (
    <main data-id="book-page" className="min-h-dvh bg-canvas">
      <JsonLd data={pageLd} />
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
            alt="Studio von Petrina Salema"
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
      <SiteFooter />
    </main>
  );
};

export default DeBookPage;
