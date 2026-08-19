"use client";

import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { BlurRevealText } from "@/components/ui/BlurRevealText";
import { LocalImage } from "@/components/ui/LocalImage";
import { cn } from "@/lib/utils";
import { ServiceBreadcrumb } from "./ServiceBreadcrumb";

type TrustItem = { label: string };

interface ServiceHeroProps {
  label: string;
  title: ReactNode;
  description: string;
  visual?: ReactNode;
  image?: string;
  imageAlt?: string;
  layout?: "split" | "wide" | "editorial" | "background";
  secondaryHref?: string;
  secondaryLabel?: string;
  trust?: TrustItem[];
}

export function ServiceHero({
  label,
  title,
  description,
  visual,
  image,
  imageAlt,
  layout = "split",
  secondaryHref = "/case-studies",
  secondaryLabel = "View Case Studies",
  trust,
}: ServiceHeroProps) {
  const isEditorial = layout === "editorial";
  const isWide = layout === "wide";
  const isBackground = layout === "background";

  return (
    <section
      className={cn(
        "relative overflow-hidden pt-32 pb-12 md:pt-40 md:pb-16",
        isBackground &&
          "flex min-h-[78vh] flex-col justify-end md:min-h-[88vh]"
      )}
    >
      {isBackground && image ? (
        <>
          <LocalImage
            src={image}
            alt=""
            className="pointer-events-none absolute inset-0 h-full w-full object-cover object-[78%_center] select-none"
            priority
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/20" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/45" />
        </>
      ) : (
        <div className="pointer-events-none absolute inset-0 bg-hero-glow opacity-25" />
      )}

      <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8 xl:px-16">
        <ServiceBreadcrumb current={label} />

        <div
          className={cn(
            "grid items-end gap-10",
            (isWide || isBackground) && "lg:grid-cols-1",
            isEditorial && "lg:grid-cols-[1.2fr_0.8fr] lg:items-start",
            !isWide && !isEditorial && !isBackground && "lg:grid-cols-[1.1fr_0.9fr]"
          )}
        >
          <div className={cn((isWide || isBackground) && "max-w-3xl")}>
            <span className="mb-5 inline-block font-heading text-xs font-semibold uppercase tracking-[0.3em] text-orange">
              {label}
            </span>
            <BlurRevealText
              as="h1"
              trigger="mount"
              className={cn(
                "font-heading font-bold leading-[1.08] tracking-tight text-offwhite",
                isBackground
                  ? "text-4xl sm:text-5xl lg:text-6xl"
                  : isEditorial
                    ? "text-4xl sm:text-5xl lg:text-6xl xl:text-7xl"
                    : "text-4xl sm:text-5xl lg:text-[3.4rem]"
              )}
            >
              {title}
            </BlurRevealText>
            <p
              className={cn(
                "mt-6 max-w-xl text-base leading-relaxed text-offwhite/55 md:text-lg",
                isEditorial && "lg:mt-10"
              )}
            >
              {description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={siteConfig.calendly} external magnetic>
                Book a Strategy Call
                <ArrowUpRight className="h-4 w-4" />
              </Button>
              <Button href={secondaryHref} variant="secondary">
                {secondaryLabel}
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {image && !isWide && !isBackground && (
            <div
              className={cn(
                "relative overflow-hidden rounded-2xl border border-white/10",
                isEditorial ? "aspect-[4/5] lg:pt-0" : "aspect-[4/5]"
              )}
            >
              <LocalImage
                src={image}
                alt={imageAlt ?? label}
                className="h-full w-full object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
            </div>
          )}

          {!image && visual && !isWide && !isBackground && (
            <div className={cn(isEditorial && "lg:pt-16")}>{visual}</div>
          )}
        </div>

        {image && isWide && (
          <div className="relative mt-10 aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 md:mt-14 md:aspect-[21/9]">
            <LocalImage
              src={image}
              alt={imageAlt ?? label}
              className="h-full w-full object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>
        )}

        {visual && (isWide || image) && !isBackground && (
          <div className="mt-12 md:mt-16">{visual}</div>
        )}

        {trust && trust.length > 0 && (
          <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/10 pt-6 md:mt-16">
            {trust.map((item) => (
              <li
                key={item.label}
                className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-offwhite/50"
              >
                <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-orange align-middle" />
                {item.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
