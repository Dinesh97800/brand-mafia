"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { pricingPlans } from "@/data/site";
import { FadeUp } from "@/components/ui/SectionHeading";
import { BlurRevealText } from "@/components/ui/BlurRevealText";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function PricingSection() {
  const [billing, setBilling] = useState<"monthly" | "quarterly">("monthly");

  return (
    <section id="packages" className="section-padding relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-hero-glow opacity-10" />
      <div className="container-custom relative">
        <div className="mb-10 text-center md:mb-12">
          <span className="mb-4 inline-block font-heading text-xs font-semibold uppercase tracking-[0.3em] text-orange">
            Our Packages
          </span>
          <BlurRevealText
            as="h2"
            trigger="inView"
            className="font-heading text-3xl font-bold tracking-tight text-offwhite sm:text-4xl md:text-5xl"
          >
            Simple. Transparent.{" "}
            <span className="text-orange">Results Driven.</span>
          </BlurRevealText>
        </div>

        <div className="mb-10 flex justify-center md:mb-12">
          <div
            className="inline-flex rounded-full border border-white/10 bg-white/[0.04] p-1"
            role="tablist"
            aria-label="Billing period"
          >
            <button
              type="button"
              role="tab"
              aria-selected={billing === "monthly"}
              onClick={() => setBilling("monthly")}
              className={cn(
                "rounded-full px-5 py-2 font-heading text-sm font-semibold transition-colors",
                billing === "monthly"
                  ? "bg-orange text-black"
                  : "text-offwhite/55 hover:text-offwhite"
              )}
            >
              Monthly
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={billing === "quarterly"}
              onClick={() => setBilling("quarterly")}
              className={cn(
                "rounded-full px-5 py-2 font-heading text-sm font-semibold transition-colors",
                billing === "quarterly"
                  ? "bg-orange text-black"
                  : "text-offwhite/55 hover:text-offwhite"
              )}
            >
              Quarterly{" "}
              <span
                className={
                  billing === "quarterly" ? "text-black/70" : "text-orange"
                }
              >
                (Save 15%)
              </span>
            </button>
          </div>
        </div>

        <div className="grid items-stretch gap-6 lg:grid-cols-3 lg:gap-8">
          {pricingPlans.map((plan, i) => (
            <FadeUp key={plan.id} delay={i * 0.1} className="h-full">
              <motion.div
                className={cn(
                  "relative flex h-full flex-col rounded-2xl border p-8 transition-all duration-500",
                  plan.highlighted
                    ? "border-orange bg-black shadow-[0_0_60px_rgba(240,87,7,0.18)]"
                    : "border-white/10 bg-white/[0.03] hover:border-orange/30"
                )}
                whileHover={{ y: -6 }}
              >
                {plan.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-orange px-4 py-1 font-heading text-[11px] font-semibold uppercase tracking-wider text-black">
                    Most Popular
                  </span>
                )}

                <h3 className="font-heading text-xl font-bold text-offwhite">
                  {plan.name}
                </h3>

                <div className="mt-5 flex flex-wrap items-baseline gap-x-2">
                  <span className="font-heading text-4xl font-bold text-offwhite">
                    {billing === "quarterly"
                      ? plan.quarterlyPrice
                      : plan.price}
                  </span>
                  <span className="text-sm text-offwhite/45">/mo</span>
                </div>
                <p className="mt-1 text-xs text-offwhite/40">
                  {plan.period.replace("/month ", "")}
                  {billing === "quarterly" ? " · billed quarterly" : ""}
                </p>

                <p className="mt-4 text-sm leading-relaxed text-offwhite/50">
                  {plan.description}
                </p>

                <ul className="mt-8 flex-1 space-y-3">
                  {plan.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange text-black">
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                      <span className="text-sm text-offwhite/75">{item}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  href={plan.ctaHref}
                  external={plan.ctaHref.startsWith("http")}
                  variant={plan.highlighted ? "primary" : "secondary"}
                  className="mt-8 w-full"
                  magnetic
                >
                  {plan.cta}
                </Button>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
