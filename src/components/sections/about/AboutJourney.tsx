"use client";

import { motion } from "framer-motion";
import {
  Briefcase,
  DollarSign,
  Heart,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { aboutJourney, aboutStats, siteConfig } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { FadeUp } from "@/components/ui/SectionHeading";

const statIconMap: Record<string, LucideIcon> = {
  Briefcase,
  Heart,
  DollarSign,
  TrendingUp,
};

export function AboutJourney() {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <FadeUp>
          <span className="mb-4 inline-block font-heading text-xs font-semibold uppercase tracking-[0.35em] text-orange">
            {aboutJourney.label}
          </span>
        </FadeUp>

        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <FadeUp>
            <h2 className="font-heading text-2xl font-bold text-offwhite sm:text-3xl md:text-4xl lg:text-5xl">
              {aboutJourney.title}
            </h2>

            <div className="mt-6 space-y-4 text-sm leading-relaxed text-offwhite/60 sm:mt-8 sm:space-y-5 sm:text-base">
              {aboutJourney.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>

            <Button
              href={siteConfig.calendly}
              external
              className="mt-8 w-full sm:mt-10 sm:w-auto"
              magnetic
            >
              Work With Us
            </Button>
          </FadeUp>

          <FadeUp delay={0.15}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {aboutStats.map((stat, i) => {
                const Icon = statIconMap[stat.icon] ?? Briefcase;
                const display = stat.display ?? `${stat.value}${stat.suffix}`;

                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 sm:p-6"
                  >
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-orange/10 text-orange sm:mb-4">
                      <Icon className="h-4 w-4" />
                    </div>
                    <p className="font-heading text-2xl font-bold text-orange sm:text-3xl">
                      {display}
                    </p>
                    <p className="mt-2 font-heading text-sm font-semibold text-offwhite">
                      {stat.label}
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-offwhite/45">
                      {stat.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
