import type { Metadata } from "next";
import Image from "next/image";
import type { FC } from "react";

import { cn } from "@/lib/cn";
import contact from "@/lib/data/contact.json";

import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = {
  title: contact.seoTitle,
  description: contact.seoDescription,
};

const EMAIL_ROWS = [
  { label: "General Enquiries", value: contact.emails.general },
  { label: "New Business Enquiries", value: contact.emails.newBusiness },
  { label: "Sister", value: contact.emails.sister },
  { label: "Press Enquiries", value: contact.emails.press },
  { label: "Careers", value: contact.emails.careers },
  { label: "United in Design", value: contact.emails.unitedInDesign },
] as const;

const ContactPage: FC = () => {
  const addressLines = contact.address
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  return (
    <main data-id="contact-page" className="min-h-dvh bg-dotto-cream">
      <SiteHeader />
      <section
        data-id="contact-section"
        className="flex min-h-dvh flex-col-reverse pt-[78px] md:flex-row"
      >
        <div
          data-id="contact-details"
          className={cn(
            "flex w-full flex-col justify-end",
            "px-6 py-16 md:w-1/2 md:px-[30px] md:py-20 lg:px-12",
          )}
        >
          <div data-id="contact-details-inner" className="max-w-[420px]">
            <div data-id="contact-details-address" className="mb-[30px]">
              <h2
                data-id="contact-details-heading"
                className="mb-3 font-[family-name:var(--font-matter)] text-[13px] tracking-[0.15em] uppercase"
              >
                Address
              </h2>
              <div className="font-[family-name:var(--font-antiqua)] text-[17px] leading-[1.5]">
                {addressLines.map((line) => (
                  <p key={line} data-id="contact-details-address-line">
                    {line}
                  </p>
                ))}
              </div>
            </div>

            <div data-id="contact-details-telephone" className="mb-[30px]">
              <h2
                data-id="contact-details-heading"
                className="mb-3 font-[family-name:var(--font-matter)] text-[13px] tracking-[0.15em] uppercase"
              >
                Telephone
              </h2>
              <a
                href={`tel:${contact.telephone.replace(/\s/g, "")}`}
                data-id="contact-details-phone"
                className="font-[family-name:var(--font-antiqua)] text-[17px] transition-opacity duration-200 hover:opacity-60"
              >
                {contact.telephone}
              </a>
            </div>

            {EMAIL_ROWS.map(({ label, value }) => (
              <div
                key={label}
                data-id="contact-details-email-block"
                className="mb-[30px]"
              >
                <h2
                  data-id="contact-details-heading"
                  className="mb-3 font-[family-name:var(--font-matter)] text-[13px] tracking-[0.15em] uppercase"
                >
                  {label}
                </h2>
                <a
                  href={`mailto:${value}`}
                  data-id="contact-details-email"
                  className="font-[family-name:var(--font-antiqua)] text-[17px] transition-opacity duration-200 hover:opacity-60"
                >
                  {value}
                </a>
              </div>
            ))}
          </div>
        </div>

        <div
          data-id="contact-image"
          className="relative min-h-[70vw] w-full md:min-h-[calc(100dvh-78px)] md:w-1/2"
        >
          <Image
            src={contact.image}
            alt="Dotto contact"
            fill
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
