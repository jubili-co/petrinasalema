"use client";

import Link from "next/link";
import { useState, type FC, type FormEvent } from "react";

import { FadeImage } from "@/app/components/FadeImage";
import { PaperWord } from "@/app/components/PaperWord";
import { cn } from "@/lib/cn";
import { placeholderSrc } from "@/lib/placeholderSrc";

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
  title = "Studio notes",
  description = null,
  imageAlt = "Petrina newsletter",
  contentAlign = "center",
  hasSectionId = true,
}) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const sectionId = hasSectionId ? "newsletter" : undefined;
  const placeholder = placeholderSrc(image);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <section
      id={sectionId}
      data-id="newsletter-signup"
      className="flex min-h-[100dvh] w-full flex-col bg-inverse md:flex-row"
    >
      <div
        data-id="newsletter-signup-image"
        className="relative order-2 min-h-[50vw] w-full overflow-hidden md:order-1 md:min-h-[100dvh] md:w-1/2"
      >
        <FadeImage
          src={image}
          alt={imageAlt}
          placeholder={placeholder}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
          data-id="newsletter-signup-photo"
        />
      </div>

      <div
        data-id="newsletter-signup-form-col"
        className={cn(
          "relative order-1 flex w-full overflow-hidden p-9 md:order-2 md:w-1/2",
          {
            "items-center justify-center": contentAlign === "center",
            "items-end": contentAlign === "end",
          },
        )}
      >
        <PaperWord
          word="zentralBeheiztAlt"
          tone="chalk"
          data-id="newsletter-signup-word"
          className="-right-8 top-10 w-36 -rotate-[12deg] md:w-44"
        />
        <div
          data-id="newsletter-signup-form-inner"
          className="relative flex w-full max-w-[408px] flex-col gap-[18px] text-chalk"
        >
          <h2
            data-id="newsletter-signup-title"
            className={cn(
              "m-0 font-[family-name:var(--font-matter)]",
              "text-[length:var(--text-copy)] leading-[var(--leading-copy)] tracking-[0.15em] uppercase",
            )}
          >
            {title}
          </h2>

          {description && (
            <p
              data-id="newsletter-signup-description"
              className={cn(
                "m-0 font-[family-name:var(--font-playfair)]",
                "text-[length:var(--text-copy)] leading-[var(--leading-copy)] font-[350]",
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
          "m-0 font-[family-name:var(--font-playfair)]",
          "text-[length:var(--text-copy)] leading-[var(--leading-copy)] font-[350]",
        )}
      >
        Thanks. Email contact@petrinasalema.com if you want the next note.
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
          "mb-0 w-full border-0 border-b border-chalk bg-transparent",
          "py-2 font-[family-name:var(--font-playfair)]",
          "text-[length:var(--text-copy)] leading-[var(--leading-copy)] font-[350] text-chalk outline-none",
          "placeholder:text-chalk/50",
        )}
      />

      <label
        data-id="newsletter-signup-consent"
        className={cn(
          "my-5 flex items-start gap-[9px]",
          "font-[family-name:var(--font-matter)] text-[length:var(--text-copy)] leading-[var(--leading-copy)]",
          "tracking-[0.15em] text-chalk uppercase",
        )}
      >
        <input
          type="checkbox"
          name="consent"
          required
          className={cn(
            "mt-0.5 size-3 shrink-0 appearance-none border border-solid border-chalk bg-transparent",
            "checked:bg-chalk",
          )}
        />
        <span>
          I consent to the{" "}
          <Link
            href="/privacy"
            data-id="newsletter-signup-privacy-link"
            className="underline"
          >
            privacy policy
          </Link>
        </span>
      </label>

      <button
        type="submit"
        data-id="newsletter-signup-submit"
        className={cn(
          "mb-[18px] inline-block !border !border-solid border-chalk bg-transparent",
          "px-[18px] py-2",
          "font-[family-name:var(--font-matter)] text-[length:var(--text-copy)] leading-[var(--leading-copy)]",
          "tracking-[0.15em] text-chalk uppercase",
          "transition-colors duration-200 ease-out",
          "hover:bg-chalk hover:text-ink active:scale-[0.97]",
        )}
      >
        Subscribe
      </button>
    </form>
  );
};
