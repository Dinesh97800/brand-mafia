"use client";

import Image from "next/image";
import {
  Heart,
  Layers,
  Lightbulb,
  Rocket,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { aboutWhyWorkWithUs } from "@/data/site";
import { FadeUp } from "@/components/ui/SectionHeading";

const whyIconMap: Record<string, LucideIcon> = {
  Lightbulb,
  Layers,
  ShieldCheck,
  Rocket,
};

export function AboutWhyWorkWithUs() {
  const quoteParts = aboutWhyWorkWithUs.quote.split(
    aboutWhyWorkWithUs.quoteHighlight
  );

  return (
    <section className="section-padding pt-0">
      <div className="container-custom">
        <FadeUp>
          <span className="mb-4 inline-block font-heading text-xs font-semibold uppercase tracking-[0.35em] text-orange">
            {aboutWhyWorkWithUs.label}
          </span>
          <h2 className="max-w-3xl font-heading text-2xl font-bold text-offwhite sm:text-3xl md:text-4xl lg:text-5xl">
            {aboutWhyWorkWithUs.title}{" "}
            <span className="text-orange">
              {aboutWhyWorkWithUs.titleHighlight}
            </span>
          </h2>
        </FadeUp>

        <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-12 lg:items-start lg:gap-8">
          <div className="space-y-6 sm:space-y-8 lg:col-span-5">
            {aboutWhyWorkWithUs.items.map((item, i) => {
              const Icon = whyIconMap[item.icon] ?? Lightbulb;

              return (
                <FadeUp key={item.title} delay={i * 0.08}>
                  <div className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-orange/10 text-orange">
                      <Icon className="h-5 w-5" strokeWidth={1.8} />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-heading text-base font-bold text-offwhite">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-offwhite/50">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </FadeUp>
              );
            })}
          </div>

          <FadeUp delay={0.15} className="hidden md:block lg:col-span-3">
            <div className="relative mx-auto flex max-w-xs flex-col gap-4 lg:max-w-none">
              {aboutWhyWorkWithUs.images.map((src, i) => (
                <div
                  key={src}
                  className={`relative overflow-hidden rounded-2xl border border-white/10 ${
                    i === 1 ? "lg:ml-6" : i === 2 ? "lg:mr-6" : ""
                  }`}
                >
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={src}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 280px, 320px"
                    />
                  </div>
                </div>
              ))}
            </div>
          </FadeUp>

          <FadeUp delay={0.2} className="lg:col-span-4">
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 sm:p-8 md:p-10">
              <Heart className="h-6 w-6 text-orange/80" />
              <blockquote className="mt-5 font-heading text-xl font-bold leading-snug text-offwhite sm:mt-6 sm:text-2xl md:text-3xl">
                {quoteParts[0]}
                <span className="text-orange">
                  {aboutWhyWorkWithUs.quoteHighlight}
                </span>
                {quoteParts[1] ?? ""}
              </blockquote>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
