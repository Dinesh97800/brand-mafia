"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { pricingPlans, siteConfig } from "@/data/site";
import { SectionHeading, FadeUp } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export function PricingSection() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-hero-glow opacity-10 pointer-events-none" />
      <div className="container-custom relative">
        <SectionHeading
          label="Pricing"
          title="Invest in Growth"
          description="Transparent pricing. No hidden fees. Cancel anytime."
          align="center"
        />

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {pricingPlans.map((plan, i) => (
            <FadeUp key={plan.name} delay={i * 0.1}>
              <motion.div
                className={`relative h-full rounded-2xl p-8 transition-all duration-500 ${
                  plan.highlighted
                    ? "gradient-border bg-black shadow-[0_0_60px_rgba(240,87,7,0.15)] scale-105 z-10"
                    : "glass hover:shadow-[0_0_40px_rgba(240,87,7,0.08)]"
                }`}
                whileHover={{ y: plan.highlighted ? 0 : -8 }}
              >
                {plan.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-orange px-4 py-1 text-xs font-heading font-semibold text-black uppercase tracking-wider">
                    Most Popular
                  </span>
                )}

                <h3 className="font-heading text-xl font-bold text-offwhite mb-2">
                  {plan.name}
                </h3>
                <p className="text-sm text-offwhite/50 mb-6">
                  {plan.description}
                </p>

                <div className="mb-8">
                  <span className="font-heading text-4xl font-bold text-offwhite">
                    {plan.price}
                  </span>
                  <span className="text-offwhite/50 text-sm">{plan.period}</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="h-4 w-4 text-orange shrink-0 mt-0.5" />
                      <span className="text-sm text-offwhite/70">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  href={
                    plan.name === "Enterprise"
                      ? "/contact"
                      : siteConfig.calendly
                  }
                  external={plan.name !== "Enterprise"}
                  variant={plan.highlighted ? "primary" : "secondary"}
                  className="w-full"
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
