"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  Heart,
  Target,
  type LucideIcon,
} from "lucide-react";
import { aboutHero } from "@/data/site";
import { assetPath } from "@/lib/base-path";

const featureIconMap: Record<string, LucideIcon> = {
  Briefcase,
  Target,
  Heart,
};

export function AboutHero() {
  const [bgSrc, setBgSrc] = useState("");

  useEffect(() => {
    setBgSrc(assetPath("/images/about-bg.png"));
  }, []);

  return (
    <section className="relative min-h-[520px] overflow-hidden sm:min-h-[560px] lg:min-h-[620px]">
      <div className="absolute inset-0 z-0">
        {bgSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={bgSrc}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-[20%_center] sm:object-[30%_center] lg:object-right"
            aria-hidden
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/40 sm:from-black/95 sm:via-black/80 sm:to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/60" />
      </div>

      <div className="container-custom relative z-10 px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32 lg:px-8 lg:pb-24 lg:pt-36 xl:px-16">
        <div className="max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 inline-block font-heading text-xs font-semibold uppercase tracking-[0.35em] text-orange sm:mb-5"
          >
            {aboutHero.label}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading text-3xl font-bold leading-[1.12] tracking-tight text-offwhite sm:text-4xl md:text-5xl lg:text-[3.25rem]"
          >
            {aboutHero.title}{" "}
            <span className="bg-gradient-to-r from-orange via-[#ff8c42] to-orange bg-clip-text text-transparent">
              {aboutHero.titleHighlight}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-5 max-w-2xl text-sm leading-relaxed text-offwhite/60 sm:mt-6 sm:text-base md:text-lg"
          >
            {aboutHero.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 grid grid-cols-1 gap-5 sm:mt-10 sm:grid-cols-3 sm:gap-6"
          >
            {aboutHero.features.map((feature) => {
              const Icon = featureIconMap[feature.icon] ?? Briefcase;

              return (
                <div key={feature.title} className="flex gap-3 sm:flex-col sm:gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange/10 text-orange sm:h-11 sm:w-11">
                    <Icon className="h-4 w-4" strokeWidth={2} />
                  </div>
                  <div>
                    <p className="font-heading text-sm font-bold text-offwhite">
                      {feature.title}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-offwhite/45 sm:text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 inline-flex flex-col items-start rounded-full border border-orange/30 bg-black/60 px-5 py-3 backdrop-blur-sm sm:mt-10 sm:flex-row sm:items-center sm:gap-2 sm:px-6"
          >
            <span className="font-heading text-[10px] font-semibold uppercase tracking-wider text-offwhite/70 sm:text-xs">
              {aboutHero.badge.line1}
            </span>
            <span className="hidden text-orange/50 sm:inline" aria-hidden>
              •
            </span>
            <span className="font-heading text-[10px] font-semibold uppercase tracking-wider text-orange sm:text-xs">
              {aboutHero.badge.line2}
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
