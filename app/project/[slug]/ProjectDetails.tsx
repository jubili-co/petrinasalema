import Link from "next/link";
import type { FC } from "react";

import { cn } from "@/lib/cn";
import type { Project, ProjectProduct } from "@/lib/projects";
import { storeProductHref } from "@/lib/projects";

type Props = {
  project: Project;
  nextSlug: string;
};

export const ProjectDetails: FC<Props> = ({ project, nextSlug }) => {
  const { title, body, photographer, photographerLink, stylist, stylistLink } =
    project;
  const products = project.products.filter(
    (product): product is ProjectProduct & { name: string } =>
      Boolean(product.name),
  );
  const hasCredits = Boolean(photographer) || Boolean(stylist);
  const hasProducts = products.length > 0;

  return (
    <section
      data-id="project-details"
      className="bg-brown px-6 py-[30px] pb-10 text-cream md:px-12"
    >
      <div
        data-id="project-details-inner"
        className={cn(
          "flex flex-col gap-12",
          "md:flex-row md:flex-nowrap md:items-start md:gap-0",
        )}
      >
        <div data-id="project-details-main" className="w-full md:w-1/2">
          <div
            data-id="project-details-copy"
            className="mb-[54px] max-w-full md:mb-[70px] md:max-w-[70%]"
          >
            <h2
              data-id="project-details-title"
              className={cn(
                "m-0 mb-[18px] font-[family-name:var(--font-matter)]",
                "text-[13px] leading-[18px] tracking-[0.15em] uppercase",
              )}
            >
              {title}
            </h2>
            {body.map((paragraph) => (
              <p
                key={paragraph}
                data-id="project-details-body"
                className={cn(
                  "m-0 font-[family-name:var(--font-antiqua)]",
                  "text-[13px] leading-[18px] font-[350]",
                )}
              >
                {paragraph}
              </p>
            ))}
          </div>

          {hasCredits && (
            <div data-id="project-details-credits">
              {photographer && (
                <div data-id="project-details-photographer" className="mb-5">
                  <h3
                    className={cn(
                      "m-0 font-[family-name:var(--font-matter)]",
                      "text-[13px] leading-[18px] tracking-[0.15em] uppercase",
                    )}
                  >
                    Photographer
                  </h3>
                  <CreditLink href={photographerLink} label={photographer} />
                </div>
              )}
              {stylist && (
                <div data-id="project-details-stylist" className="mb-5">
                  <h3
                    className={cn(
                      "m-0 font-[family-name:var(--font-matter)]",
                      "text-[13px] leading-[18px] tracking-[0.15em] uppercase",
                    )}
                  >
                    Stylist
                  </h3>
                  <CreditLink href={stylistLink} label={stylist} />
                </div>
              )}
            </div>
          )}
        </div>

        <div data-id="project-details-furniture" className="w-full md:w-[35%]">
          <div className="mb-[18px] flex items-start justify-between gap-4 md:block">
            {hasProducts && (
              <h3
                data-id="project-details-furniture-title"
                className={cn(
                  "m-0 font-[family-name:var(--font-matter)]",
                  "text-[13px] leading-[18px] tracking-[0.15em] uppercase",
                )}
              >
                Furniture
              </h3>
            )}
            <Link
              href={`/project/${nextSlug}`}
              data-id="project-details-next-mobile"
              className={cn(
                "font-[family-name:var(--font-matter)] text-[13px] leading-[18px]",
                "tracking-[0.15em] uppercase md:hidden",
                "transition-opacity duration-200 hover:opacity-50",
              )}
            >
              Next Project
            </Link>
          </div>

          {hasProducts && (
            <ul
              data-id="project-details-product-list"
              className="m-0 list-none p-0"
            >
              {products.map((product) => (
                <li
                  key={product.name}
                  data-id="project-details-product"
                  className="mb-5"
                >
                  <ProductEntry product={product} />
                </li>
              ))}
            </ul>
          )}
        </div>

        <div
          data-id="project-details-next"
          className="hidden w-[15%] justify-end md:flex"
        >
          <Link
            href={`/project/${nextSlug}`}
            data-id="project-details-next-link"
            className={cn(
              "font-[family-name:var(--font-matter)]",
              "text-[13px] leading-[18px] tracking-[0.15em] uppercase",
              "transition-opacity duration-200 hover:opacity-50",
            )}
          >
            Next Project
          </Link>
        </div>
      </div>
    </section>
  );
};

type CreditLinkProps = {
  href: string | null;
  label: string;
};

const CreditLink: FC<CreditLinkProps> = ({ href, label }) => {
  const className = cn(
    "font-[family-name:var(--font-antiqua)] text-[13px] leading-[18px] font-[350]",
    "text-cream no-underline transition-opacity duration-200 hover:opacity-50",
  );

  if (!href) {
    return (
      <p data-id="project-details-credit-text" className={className}>
        {label}
      </p>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-id="project-details-credit-link"
      className={className}
    >
      {label}
    </a>
  );
};

type NamedProduct = ProjectProduct & { name: string };

type ProductEntryProps = {
  product: NamedProduct;
};

const ProductEntry: FC<ProductEntryProps> = ({ product }) => {
  const label = (
    <>
      <h4
        className={cn(
          "m-0 font-[family-name:var(--font-antiqua)]",
          "text-[13px] leading-[18px] font-[350] text-cream",
        )}
      >
        {product.name}
      </h4>
      {product.designer && (
        <p
          className={cn(
            "m-0 font-[family-name:var(--font-antiqua)]",
            "text-[13px] leading-[18px] font-[350] text-cream",
          )}
        >
          {product.designer}
        </p>
      )}
    </>
  );

  if (!product.href) {
    return label;
  }

  return (
    <a
      href={storeProductHref(product.href)}
      target="_blank"
      rel="noopener noreferrer"
      data-id="project-details-product-link"
      className="no-underline transition-opacity duration-200 hover:opacity-50"
    >
      {label}
    </a>
  );
};
