"use client";

import {
  Compass,
  Palette,
  Rocket,
  Search,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { processSteps } from "@/data/site";
import { FadeUp } from "@/components/ui/SectionHeading";

const stepIcons: LucideIcon[] = [Search, Compass, Palette, Rocket, TrendingUp];

export function AboutApproach() {
  return (
    <section className="section-padding pt-0 pb-10 md:pb-12">
      <div className="container-custom">
        <FadeUp>
          <div className="relative overflow-hidden rounded-3xl border border-orange/20 bg-gradient-to-br from-orange/[0.08] via-black to-black px-6 py-12 shadow-[0_0_80px_rgba(240,87,7,0.08)] md:px-10 md:py-14">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-orange/10 blur-3xl" />

            <span className="relative mb-4 inline-block font-heading text-xs font-semibold uppercase tracking-[0.35em] text-orange">
              Our Approach
            </span>
            <h2 className="relative font-heading text-3xl font-bold text-offwhite md:text-4xl">
              How We Build Brands That Last
            </h2>

            <div className="relative mt-10 grid gap-8 sm:mt-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:gap-6">
              {processSteps.map((step, i) => {
                const Icon = stepIcons[i] ?? Search;
                const isLast = i === processSteps.length - 1;

                return (
                  <div key={step.step} className="relative text-center">
                    {!isLast && (
                      <div
                        className="pointer-events-none absolute left-[calc(50%+2rem)] top-8 hidden h-px w-[calc(100%-4rem)] border-t border-dashed border-orange/25 lg:block"
                        aria-hidden
                      />
                    )}

                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-orange/30 bg-orange/10 shadow-[0_0_30px_rgba(240,87,7,0.2)]">
                      <Icon className="h-6 w-6 text-orange" strokeWidth={1.8} />
                    </div>

                    <p className="mt-5 font-heading text-sm font-bold text-offwhite">
                      {step.step}. {step.title}
                    </p>
                    <p className="mt-3 text-xs leading-relaxed text-offwhite/50">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
