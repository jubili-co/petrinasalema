"use client";

import Image from "next/image";
import { useState, type FC, type FormEvent } from "react";

import { cn } from "@/lib/cn";

type Props = {
  image: string;
};

export const NewsletterSignup: FC<Props> = ({ image }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <section
      data-id="newsletter-signup"
      className="flex min-h-[100dvh] w-full flex-col bg-brown md:flex-row"
    >
      <div
        data-id="newsletter-signup-image"
        className="relative order-2 min-h-[50vw] w-full overflow-hidden md:order-1 md:min-h-[100dvh] md:w-1/2"
      >
        <Image
          src={image}
          alt="Studio Ashby newsletter"
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </div>

      <div
        data-id="newsletter-signup-form-col"
        className={cn(
          "order-1 flex w-full items-center justify-center",
          "px-6 py-16 md:order-2 md:w-1/2 md:px-12 md:py-20",
        )}
      >
        <form
          data-id="newsletter-signup-form"
          onSubmit={onSubmit}
          className="w-full max-w-[360px] text-cream"
        >
          <h3
            data-id="newsletter-signup-title"
            className="mb-5 font-[family-name:var(--font-matter)] text-[13px] tracking-[0.15em] uppercase"
          >
            Sign up to our Newsletters
          </h3>

          {isSubmitted && (
            <p
              data-id="newsletter-signup-success"
              className="font-[family-name:var(--font-antiqua)] text-base leading-relaxed"
            >
              Thank you — you&apos;re on the list.
            </p>
          )}

          {!isSubmitted && (
            <>
              <div
                data-id="newsletter-signup-checkboxes"
                className="mb-[30px] flex justify-between gap-4"
              >
                <label
                  data-id="newsletter-signup-checkbox"
                  className="flex items-center gap-2 text-[13px]"
                >
                  <input
                    type="checkbox"
                    name="studio-ashby-newsletter"
                    className="size-3.5 accent-cream"
                    defaultChecked
                  />
                  Studio Ashby
                </label>
                <label
                  data-id="newsletter-signup-checkbox"
                  className="flex items-center gap-2 text-[13px]"
                >
                  <input
                    type="checkbox"
                    name="sister-newsletter"
                    className="size-3.5 accent-cream"
                  />
                  Sister
                </label>
              </div>

              <input
                data-id="newsletter-signup-email"
                type="email"
                name="email"
                required
                placeholder="Your Email"
                className={cn(
                  "mb-6 w-full border-0 border-b border-cream/40 bg-transparent",
                  "py-3 text-base text-cream outline-none",
                  "placeholder:text-cream/50",
                )}
              />

              <label
                data-id="newsletter-signup-consent"
                className="mb-8 flex items-start gap-3 text-[12px] leading-relaxed"
              >
                <input
                  type="checkbox"
                  name="subscribe"
                  required
                  className="mt-1 size-3.5 shrink-0 accent-cream"
                />
                I consent to receiving marketing emails and agree to the privacy
                policy.
              </label>

              <button
                type="submit"
                data-id="newsletter-signup-submit"
                className={cn(
                  "min-h-11 border border-cream px-8 py-3",
                  "text-[12px] tracking-[0.15em] uppercase",
                  "transition-colors duration-200 ease-out",
                  "hover:bg-cream hover:text-brown active:scale-[0.97]",
                )}
              >
                Subscribe
              </button>
            </>
          )}
        </form>
      </div>
    </section>
  );
};
