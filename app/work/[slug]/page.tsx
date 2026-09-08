import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { FC } from "react";

import { JsonLd } from "@/app/components/JsonLd";
import {
  packGalleryRows,
  withGalleryDimensions,
} from "@/lib/workGallery";
import { metaDescription, pageMetadata, workJsonLd } from "@/lib/seo";
import { getNextWork, getWork, WORK, type WorkItem } from "@/lib/work";

import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";
import { WorkDetails } from "./WorkDetails";
import { WorkGallery } from "./WorkGallery";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return WORK.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getWork(slug);
  return workItemMetadata(item);
}

const WorkItemPage: FC<Props> = async ({ params }) => {
  const { slug } = await params;
  const item = getWork(slug);

  if (!item) {
    notFound();
  }

  const { slug: nextSlug, name: nextName } = getNextWork(slug);
  const nextHref = `/work/${nextSlug}`;
  const { name, images, description, location } = item;
  const framed = await withGalleryDimensions(images);
  const rows = packGalleryRows(framed);
  const cover = images[0];
  const pageLd = workJsonLd({
    name,
    description,
    slug,
    location,
    imageUrl: cover?.src,
  });

  return (
    <main data-id="work-item-page" className="min-h-dvh bg-canvas">
      <JsonLd data={pageLd} />
      <SiteHeader />
      <WorkGallery name={name} rows={rows} />
      <WorkDetails item={item} nextHref={nextHref} nextName={nextName} />
      <SiteFooter />
    </main>
  );
};

export default WorkItemPage;

function workItemMetadata(item: WorkItem | undefined): Metadata {
  if (!item) {
    return pageMetadata({
      title: "Work | Petrina Salema",
      description:
        "Homes and hospitality spaces by Petrina Salema, with architectural projects from a decade in practice. Vienna, and projects abroad.",
      path: "/work",
    });
  }

  const { name, subtitle, description, slug, images } = item;
  const cover = images[0];
  const image = cover && { url: cover.src, alt: cover.alt };
  const summary = description || `${subtitle} · ${name}`;

  return pageMetadata({
    title: `${name} | Petrina Salema`,
    description: metaDescription(summary),
    path: `/work/${slug}`,
    image,
  });
}
