import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { FC } from "react";

import {
  packGalleryRows,
  withGalleryDimensions,
} from "@/lib/workGallery";
import {
  getMoreWork,
  getNextWork,
  getWork,
  WORK,
} from "@/lib/work";

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

  if (!item) {
    return { title: "Work | Petrina Salema" };
  }

  const { name, subtitle, description } = item;

  return {
    title: `${name} | Petrina Salema`,
    description: description || `${subtitle} · ${name}`,
  };
}

const WorkItemPage: FC<Props> = async ({ params }) => {
  const { slug } = await params;
  const item = getWork(slug);

  if (!item) {
    notFound();
  }

  const nextItem = getNextWork(slug);
  const moreWork = getMoreWork(slug);
  const { name, images } = item;
  const framed = await withGalleryDimensions(images);
  const rows = packGalleryRows(framed);

  return (
    <main data-id="work-item-page" className="min-h-dvh bg-dotto-cream">
      <SiteHeader />
      <WorkGallery name={name} rows={rows} moreWork={moreWork} />
      <WorkDetails item={item} nextSlug={nextItem.slug} />
      <SiteFooter />
    </main>
  );
};

export default WorkItemPage;
