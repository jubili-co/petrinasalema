import type { Metadata } from "next";

import { SITE } from "@/lib/site";

export const PERSON_ID = `${SITE.url}/#person`;
export const PRACTICE_ID = `${SITE.url}/#practice`;
export const WEBSITE_ID = `${SITE.url}/#website`;

export const NO_INDEX = {
  index: false,
  follow: false,
} as const;

export type PageImage = {
  url: string;
  alt: string;
  width?: number;
  height?: number;
};

export type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: PageImage;
  robots?: Metadata["robots"];
  canonical?: boolean;
};

export type WorkPageLd = {
  name: string;
  description: string;
  slug: string;
  location: string;
  imageUrl?: string;
};

type JsonLdNode = Record<string, unknown>;

const OG_LOCALE = "en_AT";
const META_DESCRIPTION_MAX = 160;
const DEFAULT_OG_IMAGE: PageImage = {
  url: SITE.ogImage,
  alt: SITE.ogImageAlt,
  width: 1200,
  height: 630,
};

const PRACTICE_STREET = "Tegelweg 4";
const PRACTICE_POSTAL = "1220";
const PRACTICE_CITY = "Vienna";
const PRACTICE_COUNTRY = "AT";
const PRACTICE_TAX_ID = "ATU77713468";
const PRACTICE_GISA = "34359440";
const LINKEDIN_URL = "https://www.linkedin.com/in/petrinasalema";
const JUBILI_URL = "https://jubili.co";

export function absoluteUrl(path: string): string {
  if (path === "" || path === "/") {
    return SITE.url;
  }

  const suffix = path.startsWith("/") ? path : `/${path}`;
  return `${SITE.url}${suffix}`;
}

export function metaDescription(text: string): string {
  const first = firstSentence(text.trim());
  return clipAtWord(first, META_DESCRIPTION_MAX);
}

export function pageMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  robots,
  canonical = true,
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const canonicalUrl = canonical ? url : undefined;
  const ogImage = openGraphImage(image);
  const alternates = canonicalAlternates(canonicalUrl);

  return {
    title,
    description,
    robots,
    alternates,
    openGraph: {
      type: "website",
      locale: OG_LOCALE,
      url: canonicalUrl,
      siteName: SITE.name,
      title,
      description,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image.url],
    },
  };
}

export function siteJsonLd(description: string): JsonLdNode {
  const person: JsonLdNode = {
    "@type": "Person",
    "@id": PERSON_ID,
    name: SITE.name,
    url: SITE.url,
    email: SITE.email,
    jobTitle: "Designer",
    sameAs: [JUBILI_URL, LINKEDIN_URL],
  };

  const practice: JsonLdNode = {
    "@type": "ProfessionalService",
    "@id": PRACTICE_ID,
    name: SITE.name,
    url: SITE.url,
    email: SITE.email,
    description,
    founder: { "@id": PERSON_ID },
    taxID: PRACTICE_TAX_ID,
    identifier: {
      "@type": "PropertyValue",
      name: "GISA",
      value: PRACTICE_GISA,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: PRACTICE_STREET,
      postalCode: PRACTICE_POSTAL,
      addressLocality: PRACTICE_CITY,
      addressCountry: PRACTICE_COUNTRY,
    },
    areaServed: [
      { "@type": "City", name: PRACTICE_CITY },
      { "@type": "Country", name: "Austria" },
      "Remote",
    ],
  };

  const website: JsonLdNode = {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE.name,
    url: SITE.url,
    inLanguage: "en",
    publisher: { "@id": PRACTICE_ID },
  };

  return {
    "@context": "https://schema.org",
    "@graph": [website, person, practice],
  };
}

export function workJsonLd({
  name,
  description,
  slug,
  location,
  imageUrl,
}: WorkPageLd): JsonLdNode {
  const url = absoluteUrl(`/work/${slug}`);
  const summary = metaDescription(description);
  const creativeWork = creativeWorkNode({
    name,
    summary,
    url,
    location,
    imageUrl,
  });
  const breadcrumb: JsonLdNode = {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Work",
        item: absoluteUrl("/work"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name,
        item: url,
      },
    ],
  };

  return {
    "@context": "https://schema.org",
    "@graph": [breadcrumb, creativeWork],
  };
}

function canonicalAlternates(url: string | undefined) {
  if (!url) {
    return undefined;
  }

  return { canonical: url };
}

function creativeWorkNode({
  name,
  summary,
  url,
  location,
  imageUrl,
}: {
  name: string;
  summary: string;
  url: string;
  location: string;
  imageUrl?: string;
}): JsonLdNode {
  const node: JsonLdNode = {
    "@type": "CreativeWork",
    name,
    description: summary,
    url,
    creator: { "@id": PERSON_ID },
    contentLocation: location,
  };

  return imageUrl ? { ...node, image: imageUrl } : node;
}

function openGraphImage({ url, alt, width, height }: PageImage) {
  if (width === undefined || height === undefined) {
    return { url, alt };
  }

  return { url, alt, width, height };
}

function firstSentence(text: string): string {
  const match = text.match(/^.+?[.!?](?:\s|$)/);
  if (!match) {
    return text;
  }

  return match[0].trim();
}

function clipAtWord(text: string, max: number): string {
  if (text.length <= max) {
    return text;
  }

  const budget = max - 3;
  const sliced = text.slice(0, budget);
  const lastSpace = sliced.lastIndexOf(" ");
  const clipped = lastSpace > 0 ? sliced.slice(0, lastSpace) : sliced;
  return `${clipped.replace(/[.,;:]$/, "")}...`;
}
