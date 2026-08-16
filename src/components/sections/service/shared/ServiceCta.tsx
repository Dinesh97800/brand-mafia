"use client";

import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { LocalImage } from "@/components/ui/LocalImage";
import { cn } from "@/lib/utils";

interface ServiceCtaProps {
  title: ReactNode;
  description?: string;
  variant?: "minimal" | "plane" | "frame";
}

export function ServiceCta({
  title,
  description,
  variant = "minimal",
}: ServiceCtaProps) {
  if (variant === "plane") {
    return (
      <section className="px-4 pb-20 sm:px-6 lg:px-8 xl:px-16">
        <div className="container-custom">
          <div className="relative overflow-hidden rounded-2xl border border-white/10">
            <LocalImage
              src="/images/service-plane.png"
              alt=""
              className="pointer-events-none absolute inset-0 h-full w-full object-cover object-[15%_center] opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/55 to-black/80" />
            <div className="relative z-10 flex min-h-[220px] flex-col justify-center px-6 py-12 sm:px-10 md:min-h-[260px] md:items-end md:text-right">
              <h2 className="max-w-lg font-heading text-3xl font-bold text-offwhite md:text-4xl">
                {title}
              </h2>
              {description && (
                <p className="mt-3 max-w-md text-sm text-offwhite/55">
                  {description}
                </p>
              )}
              <Button
                href={siteConfig.calendly}
                external
                magnetic
                className="mt-6"
              >
                Book a Strategy Call
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 pb-20 sm:px-6 lg:px-8 xl:px-16">
      <div className="container-custom">
        <div
          className={cn(
            "relative overflow-hidden border-y border-white/10 py-14 md:py-20",
            variant === "frame" && "border border-white/10 px-6 md:px-12"
          )}
        >
          <h2 className="max-w-3xl font-heading text-3xl font-bold leading-tight text-offwhite md:text-5xl">
            {title}
          </h2>
          {description && (
            <p className="mt-5 max-w-lg text-offwhite/50">{description}</p>
          )}
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={siteConfig.calendly} external magnetic>
              Book a Strategy Call
              <ArrowUpRight className="h-4 w-4" />
            </Button>
            <Button href="/contact" variant="ghost">
              Talk to an Expert
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
