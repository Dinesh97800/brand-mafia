"use client";

import { motion } from "framer-motion";
import { Check, Plus, Target } from "lucide-react";
import { pricingPlans } from "@/data/site";
import { SectionHeading, FadeUp } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export function PricingSection() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-hero-glow opacity-10 pointer-events-none" />
      <div className="container-custom relative">
        <SectionHeading
          label="Packages"
          title="Digital Marketing Packages"
          description="Helping businesses generate more leads, increase sales, and dominate their market through strategic branding, content creation, social media management, and paid advertising."
          align="center"
        />

        <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
          {pricingPlans.map((plan, i) => (
            <FadeUp key={plan.id} delay={i * 0.1} className="h-full">
              <motion.div
                className={`relative flex h-full flex-col rounded-2xl p-8 transition-all duration-500 ${
                  plan.highlighted
                    ? "gradient-border bg-black shadow-[0_0_60px_rgba(240,87,7,0.15)] z-10"
                    : "glass hover:shadow-[0_0_40px_rgba(240,87,7,0.08)]"
                }`}
                whileHover={{ y: -6 }}
              >
                {plan.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-orange px-4 py-1 text-xs font-heading font-semibold text-black uppercase tracking-wider">
                    Most Popular
                  </span>
                )}

                <h3 className="font-heading text-xl font-bold text-offwhite">
                  {plan.name} Package
                </h3>

                <div className="mt-4 flex flex-wrap items-baseline gap-x-2">
                  <span className="font-heading text-4xl font-bold text-offwhite">
                    {plan.price}
                  </span>
                  <span className="text-sm text-offwhite/50">
                    {plan.period}
                  </span>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-offwhite/50">
                  {plan.description}
                </p>

                <Button
                  href={plan.ctaHref}
                  external={plan.ctaHref.startsWith("http")}
                  variant={plan.highlighted ? "primary" : "secondary"}
                  className="mt-6 w-full"
                  magnetic
                >
                  {plan.cta}
                </Button>

                {plan.inherits ? (
                  <p className="mt-8 flex items-center gap-2 rounded-full border border-orange/20 bg-orange/5 px-4 py-2 font-heading text-xs font-semibold uppercase tracking-[0.15em] text-orange">
                    <Plus className="h-3.5 w-3.5 shrink-0" />
                    Everything in {plan.inherits}
                  </p>
                ) : (
                  <p className="mt-8 font-heading text-xs font-semibold uppercase tracking-[0.15em] text-orange">
                    Included Services
                  </p>
                )}

                <div className="mt-6 flex-1 space-y-6">
                  {plan.featureGroups.map((group) => (
                    <div key={group.title}>
                      <h4 className="font-heading text-sm font-semibold text-offwhite">
                        {group.title}
                      </h4>
                      <ul className="mt-3 space-y-2.5">
                        {group.items.map((item) => (
                          <li key={item} className="flex items-start gap-3">
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-orange" />
                            <span className="text-sm text-offwhite/70">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="mt-8 rounded-xl border border-white/5 bg-white/[0.02] p-5">
                  <p className="flex items-center gap-2 font-heading text-xs font-semibold uppercase tracking-[0.15em] text-orange">
                    <Target className="h-3.5 w-3.5 shrink-0" />
                    Best For
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-offwhite/60">
                    {plan.bestFor}
                  </p>
                </div>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
