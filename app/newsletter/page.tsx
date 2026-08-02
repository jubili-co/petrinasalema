import type { Metadata } from "next";
import type { FC } from "react";

import newsletter from "@/lib/data/newsletter.json";

import { NewsletterSignup } from "../components/NewsletterSignup";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = {
  title: newsletter.seoTitle,
  description: newsletter.seoDescription,
};

const NewsletterPage: FC = () => (
  <main data-id="newsletter-page" className="min-h-dvh bg-dotto-cream">
    <SiteHeader variant="home" />
    <NewsletterSignup
      image={newsletter.image}
      title={newsletter.title}
      description={newsletter.description}
      imageAlt={newsletter.imageAlt}
      contentAlign="end"
      hasSectionId={false}
    />
    <SiteFooter />
  </main>
);

export default NewsletterPage;
