import deHomes from "@/lib/data/de/homes.json";
import { isViennaHomeSlug, type SiteLocale } from "@/lib/locale";
import { type WorkCaseStudy, type WorkItem } from "@/lib/work";

type HomeOverlay = {
  name: string;
  subtitle: string;
  description: string;
  scope: string[];
  caseStudy: WorkCaseStudy;
};

const DE_HOMES = deHomes as Record<string, HomeOverlay>;

export function localizeWork(item: WorkItem, locale: SiteLocale): WorkItem {
  if (locale === "en") {
    return item;
  }

  const { slug } = item;
  if (!isViennaHomeSlug(slug)) {
    return item;
  }

  const overlay = DE_HOMES[slug];
  if (!overlay) {
    return item;
  }

  const { name, subtitle, description, scope, caseStudy } = overlay;
  return {
    ...item,
    name,
    subtitle,
    description,
    scope,
    caseStudy,
  };
}
