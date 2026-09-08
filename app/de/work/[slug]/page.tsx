import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { FC } from "react";

import { JsonLd } from "@/app/components/JsonLd";
import { SiteFooter } from "@/app/components/SiteFooter";
import { SiteHeader } from "@/app/components/SiteHeader";
import {
  WORK_DETAILS_LABELS_EN,
  WorkDetails,
  type WorkDetailsLabels,
} from "@/app/work/[slug]/WorkDetails";
import { WorkGallery } from "@/app/work/[slug]/WorkGallery";
import {
  isViennaHomeSlug,
  localizedPath,
  VIENNA_HOME_SLUGS,
} from "@/lib/locale";
import {
  absoluteUrl,
  localeWebPageLd,
  metaDescription,
  pageMetadata,
  workJsonLd,
} from "@/lib/seo";
import {
  packGalleryRows,
  withGalleryDimensions,
} from "@/lib/workGallery";
import { localizeWork } from "@/lib/workLocale";
import {
  getNextViennaHome,
  getWork,
  workStreetAddress,
  type WorkItem,
} from "@/lib/work";

type Props = {
  params: Promise<{ slug: string }>;
};

const DE_LABELS: WorkDetailsLabels = {
  ...WORK_DETAILS_LABELS_EN,
  scope: "Leistung",
  brief: "Die Aufgabe",
  changed: "Was sich geändert hat",
  held: "Was gehalten hat",
  door: "Wenn als Nächstes eines deiner Zimmer ansteht, schauen wir, ob das passt.",
  doorHref: localizedPath("/book", "de-AT"),
};

export function generateStaticParams() {
  return VIENNA_HOME_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = viennaHome(slug);
  return deWorkMetadata(item, slug);
}

const DeWorkItemPage: FC<Props> = async ({ params }) => {
  const { slug } = await params;
  const item = viennaHome(slug);

  if (!item) {
    notFound();
  }

  const localized = localizeWork(item, "de-AT");
  const next = localizeWork(getNextViennaHome(slug), "de-AT");
  const nextHref = localizedPath(`/work/${next.slug}`, "de-AT");
  const { name, images, description, location } = localized;
  const framed = await withGalleryDimensions(images);
  const rows = packGalleryRows(framed);
  const cover = images[0];
  const imageUrls = images.map(({ src }) => src);
  const workLd = workJsonLd({
    name,
    description,
    slug,
    location,
    imageUrl: cover?.src,
    imageUrls,
    streetAddress: workStreetAddress(slug),
  });
  const pageLd = localeWebPageLd({
    path: localizedPath(`/work/${slug}`, "de-AT"),
    name,
    description: metaDescription(description),
    inLanguage: "de-AT",
  });

  return (
    <main data-id="work-item-page" className="min-h-dvh bg-canvas">
      <JsonLd data={workLd} />
      <JsonLd data={pageLd} />
      <SiteHeader />
      <WorkGallery name={name} rows={rows} />
      <WorkDetails
        item={localized}
        nextHref={nextHref}
        nextName={next.name}
        labels={DE_LABELS}
      />
      <SiteFooter />
    </main>
  );
};

export default DeWorkItemPage;

function viennaHome(slug: string): WorkItem | undefined {
  if (!isViennaHomeSlug(slug)) {
    return undefined;
  }

  return getWork(slug);
}

function deWorkMetadata(
  item: WorkItem | undefined,
  slug: string,
): Metadata {
  const path = localizedPath(`/work/${slug}`, "de-AT");
  if (!item) {
    return pageMetadata({
      title: "Arbeit | Petrina Salema",
      description:
        "Wohnungen und Gastlichkeit von Petrina Salema in Wien.",
      path,
      locale: "de-AT",
    });
  }

  const localized = localizeWork(item, "de-AT");
  const { name, subtitle, description, images } = localized;
  const cover = images[0];
  const image = cover && { url: cover.src, alt: cover.alt };
  const summary = description || `${subtitle} · ${name}`;

  return pageMetadata({
    title: `${name} | Petrina Salema`,
    description: metaDescription(summary),
    path,
    image,
    locale: "de-AT",
    languages: {
      en: absoluteUrl(`/work/${slug}`),
      "de-AT": absoluteUrl(path),
    },
  });
}
