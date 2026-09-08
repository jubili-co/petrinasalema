import type { Metadata } from "next";

import { ogLocale, type SiteLocale } from "@/lib/locale";
import {
  offerNodeId,
  offerPageUrl,
  PRACTICE_OFFERS,
  type OfferId,
} from "@/lib/offers";
import {
  CITATIONS,
  PRACTICE_GEO,
  PRACTICE_PHONE,
  SITE,
} from "@/lib/site";

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

export type LanguageAlternates = {
  en: string;
  "de-AT": string;
};

export type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: PageImage;
  robots?: Metadata["robots"];
  canonical?: boolean;
  locale?: SiteLocale;
  languages?: LanguageAlternates;
};

export type WorkPageLd = {
  name: string;
  description: string;
  slug: string;
  location: string;
  imageUrl?: string;
  imageUrls?: string[];
  streetAddress?: string;
};

export type BookFaqItem = {
  question: string;
  answer: string;
};

type JsonLdNode = Record<string, unknown>;

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
const PERSON_IMAGE = "/images/about/2026-08-07_Petrina-1.webp";

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
  locale = "en",
  languages,
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const canonicalUrl = canonical ? url : undefined;
  const ogImage = openGraphImage(image);
  const alternates = pageAlternates(canonicalUrl, languages);

  return {
    title,
    description,
    robots,
    alternates,
    openGraph: {
      type: "website",
      locale: ogLocale(locale),
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
  const sameAs = citationUrls();
  const person: JsonLdNode = {
    "@type": "Person",
    "@id": PERSON_ID,
    name: SITE.name,
    url: SITE.url,
    email: SITE.email,
    image: absoluteUrl(PERSON_IMAGE),
    jobTitle: "Designer / furnishing concepts",
    sameAs,
  };
  const personWithPhone = withTelephone(person);
  const practice: JsonLdNode = {
    "@type": "ProfessionalService",
    "@id": PRACTICE_ID,
    name: SITE.name,
    url: SITE.url,
    email: SITE.email,
    image: absoluteUrl(SITE.ogImage),
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
    geo: {
      "@type": "GeoCoordinates",
      latitude: PRACTICE_GEO.latitude,
      longitude: PRACTICE_GEO.longitude,
    },
    areaServed: [
      { "@type": "City", name: PRACTICE_CITY },
      { "@type": "Country", name: "Austria" },
      "Remote",
    ],
    sameAs,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Booking",
      itemListElement: PRACTICE_OFFERS.map(offerNode),
    },
    potentialAction: PRACTICE_OFFERS.map(scheduleAction),
  };
  const practiceWithPhone = withTelephone(practice);
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
    "@graph": [website, personWithPhone, practiceWithPhone],
  };
}

export function bookJsonLd({
  description,
  faq,
  inLanguage = "en",
  path = "/book",
}: {
  description: string;
  faq: BookFaqItem[];
  inLanguage?: string;
  path?: string;
}): JsonLdNode {
  const pageUrl = absoluteUrl(path);
  const webPage: JsonLdNode = {
    "@type": "WebPage",
    "@id": `${pageUrl}#page`,
    url: pageUrl,
    name: "Book",
    description,
    inLanguage,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": PRACTICE_ID },
    mainEntity: {
      "@type": "OfferCatalog",
      name: "Booking",
      itemListElement: PRACTICE_OFFERS.map(offerNode),
    },
    potentialAction: PRACTICE_OFFERS.map(scheduleAction),
  };
  const faqPage = faqPageNode(faq, pageUrl);

  return {
    "@context": "https://schema.org",
    "@graph": [webPage, faqPage],
  };
}

export function workJsonLd({
  name,
  description,
  slug,
  location,
  imageUrl,
  imageUrls,
  streetAddress,
}: WorkPageLd): JsonLdNode {
  const url = absoluteUrl(`/work/${slug}`);
  const summary = metaDescription(description);
  const images = workImages(imageUrl, imageUrls);
  const creativeWork = creativeWorkNode({
    name,
    summary,
    url,
    location,
    images,
    streetAddress,
    about: description,
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

export function localeWebPageLd({
  path,
  name,
  description,
  inLanguage,
}: {
  path: string;
  name: string;
  description: string;
  inLanguage: string;
}): JsonLdNode {
  const url = absoluteUrl(path);
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    url,
    name,
    description,
    inLanguage,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": PRACTICE_ID },
  };
}

function citationUrls(): string[] {
  const { linkedin, jubili, herold, firmenAbc, gbp } = CITATIONS;
  const listed = [jubili, linkedin, herold, firmenAbc];
  return gbp ? [...listed, gbp] : listed;
}

function withTelephone(node: JsonLdNode): JsonLdNode {
  return PRACTICE_PHONE ? { ...node, telephone: PRACTICE_PHONE } : node;
}

function offerNode(offer: (typeof PRACTICE_OFFERS)[number]): JsonLdNode {
  const { id, name, description, price, currency, minutes } = offer;
  return {
    "@type": "Offer",
    "@id": offerNodeId(id),
    name,
    description,
    url: offerPageUrl(),
    price,
    priceCurrency: currency,
    availability: "https://schema.org/InStock",
    eligibleDuration: {
      "@type": "QuantitativeValue",
      value: minutes,
      unitCode: "MIN",
    },
  };
}

function scheduleAction(offer: (typeof PRACTICE_OFFERS)[number]): JsonLdNode {
  const { id, name, calHref, minutes } = offer;
  return {
    "@type": "ScheduleAction",
    name,
    target: {
      "@type": "EntryPoint",
      urlTemplate: calHref,
      inLanguage: "en",
      actionPlatform: [
        "https://schema.org/DesktopWebPlatform",
        "https://schema.org/MobileWebPlatform",
      ],
    },
    object: { "@id": offerNodeId(id as OfferId) },
    result: {
      "@type": "Reservation",
      name,
    },
    duration: `PT${minutes}M`,
  };
}

function faqPageNode(faq: BookFaqItem[], pageUrl: string): JsonLdNode {
  return {
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    mainEntity: faq.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    })),
  };
}

function pageAlternates(
  canonicalUrl: string | undefined,
  languages: LanguageAlternates | undefined,
) {
  if (!canonicalUrl) {
    return undefined;
  }

  if (!languages) {
    return { canonical: canonicalUrl };
  }

  return {
    canonical: canonicalUrl,
    languages: {
      en: languages.en,
      "de-AT": languages["de-AT"],
      "x-default": languages.en,
    },
  };
}

function workImages(
  imageUrl: string | undefined,
  imageUrls: string[] | undefined,
): string[] {
  if (imageUrls && imageUrls.length > 0) {
    return imageUrls;
  }

  return imageUrl ? [imageUrl] : [];
}

function creativeWorkNode({
  name,
  summary,
  url,
  location,
  images,
  streetAddress,
  about,
}: {
  name: string;
  summary: string;
  url: string;
  location: string;
  images: string[];
  streetAddress?: string;
  about: string;
}): JsonLdNode {
  const node: JsonLdNode = {
    "@type": "CreativeWork",
    name,
    description: summary,
    url,
    creator: { "@id": PERSON_ID },
    about,
    contentLocation: placeNode(location, streetAddress),
  };

  return images.length > 0 ? { ...node, image: images } : node;
}

function placeNode(location: string, streetAddress: string | undefined) {
  const [locality, country] = location.split(",").map((part) => part.trim());
  const address: JsonLdNode = {
    "@type": "PostalAddress",
    addressLocality: locality || location,
    addressCountry: country || undefined,
  };
  const addressed = streetAddress
    ? { ...address, streetAddress }
    : address;

  return {
    "@type": "Place",
    name: location,
    address: addressed,
  };
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
