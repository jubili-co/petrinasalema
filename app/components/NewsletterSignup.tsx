"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FC, type FormEvent } from "react";

import { cn } from "@/lib/cn";

type Props = {
  image: string;
  title?: string;
  description?: string | null;
  imageAlt?: string;
  contentAlign?: "center" | "end";
  hasSectionId?: boolean;
};

export const NewsletterSignup: FC<Props> = ({
  image,
  title = "Sign up to my newsletter",
  description = null,
  imageAlt = "Petrina newsletter",
  contentAlign = "center",
  hasSectionId = true,
}) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const sectionId = hasSectionId ? "newsletter" : undefined;

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <section
      id={sectionId}
      data-id="newsletter-signup"
      className="flex min-h-[100dvh] w-full flex-col bg-brown md:flex-row"
    >
      <div
        data-id="newsletter-signup-image"
        className="relative order-2 min-h-[50vw] w-full overflow-hidden md:order-1 md:min-h-[100dvh] md:w-1/2"
      >
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </div>

      <div
        data-id="newsletter-signup-form-col"
        className={cn("order-1 flex w-full p-9 md:order-2 md:w-1/2", {
          "items-center justify-center": contentAlign === "center",
          "items-end": contentAlign === "end",
        })}
      >
        <div
          data-id="newsletter-signup-form-inner"
          className="flex w-full max-w-[408px] flex-col gap-[18px] text-cream"
        >
          <h2
            data-id="newsletter-signup-title"
            className={cn(
              "m-0 font-[family-name:var(--font-matter)]",
              "text-[13px] leading-[18px] tracking-[0.15em] uppercase",
            )}
          >
            {title}
          </h2>

          {description && (
            <p
              data-id="newsletter-signup-description"
              className={cn(
                "m-0 font-[family-name:var(--font-antiqua)]",
                "text-[13px] leading-[18px] font-[350]",
              )}
            >
              {description}
            </p>
          )}

          <NewsletterForm isSubmitted={isSubmitted} onSubmit={onSubmit} />
        </div>
      </div>
    </section>
  );
};

type NewsletterFormProps = {
  isSubmitted: boolean;
  onSubmit(event: FormEvent<HTMLFormElement>): void;
};

const NewsletterForm: FC<NewsletterFormProps> = ({ isSubmitted, onSubmit }) => {
  if (isSubmitted) {
    return (
      <p
        data-id="newsletter-signup-success"
        className={cn(
          "m-0 font-[family-name:var(--font-antiqua)]",
          "text-[13px] leading-[18px] font-[350]",
        )}
      >
        Thank you — you&apos;re on the list.
      </p>
    );
  }

  return (
    <form
      data-id="newsletter-signup-form"
      onSubmit={onSubmit}
      className="w-full"
    >
      <input
        data-id="newsletter-signup-email"
        type="email"
        name="email"
        required
        placeholder="Your Email"
        className={cn(
          "mb-0 w-full border-0 border-b border-cream bg-transparent",
          "py-2 font-[family-name:var(--font-antiqua)]",
          "text-[13px] leading-[18px] font-[350] text-cream outline-none",
          "placeholder:text-cream/50",
        )}
      />

      <label
        data-id="newsletter-signup-consent"
        className={cn(
          "my-5 flex items-start gap-[9px]",
          "font-[family-name:var(--font-matter)] text-[13px] leading-[18px]",
          "tracking-[0.15em] text-cream uppercase",
        )}
      >
        <input
          type="checkbox"
          name="consent"
          required
          className={cn(
            "mt-0.5 size-3 shrink-0 appearance-none border border-solid border-cream bg-transparent",
            "checked:bg-cream",
          )}
        />
        <span>
          I consent to the{" "}
          <Link
            href="/privacy-policy"
            data-id="newsletter-signup-privacy-link"
            className="underline"
          >
            terms and conditions
          </Link>
        </span>
      </label>

      <button
        type="submit"
        data-id="newsletter-signup-submit"
        className={cn(
          "mb-[18px] inline-block !border !border-solid border-cream bg-transparent",
          "px-[18px] py-2",
          "font-[family-name:var(--font-matter)] text-[13px] leading-[18px]",
          "tracking-[0.15em] text-cream uppercase",
          "transition-colors duration-200 ease-out",
          "hover:bg-cream hover:text-brown active:scale-[0.97]",
        )}
      >
        Subscribe
      </button>
    </form>
  );
};
