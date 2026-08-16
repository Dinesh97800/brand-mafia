"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { BlurRevealText } from "@/components/ui/BlurRevealText";
import { LocalImage } from "@/components/ui/LocalImage";

export function ServicesHero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-8 md:pt-36 md:pb-12 lg:pt-40">
      <div className="pointer-events-none absolute inset-0 bg-hero-glow opacity-40" />
      <div className="pointer-events-none absolute -left-24 top-24 h-[420px] w-[420px] rounded-full bg-orange/10 blur-[140px]" />
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-20" />

      <div className="container-custom relative px-4 sm:px-6 lg:px-8 xl:px-16">
        <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-6">
          <div className="max-w-xl">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="mb-5 inline-block font-heading text-xs font-semibold uppercase tracking-[0.35em] text-orange"
            >
              Our Services
            </motion.span>

            <BlurRevealText
              as="h1"
              trigger="mount"
              className="font-heading text-4xl font-bold leading-[1.1] tracking-tight text-offwhite sm:text-5xl lg:text-[3.4rem]"
            >
              Services Built to{" "}
              <span className="text-orange">Scale</span> With You
            </BlurRevealText>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 max-w-md text-base leading-relaxed text-offwhite/55 md:text-lg"
            >
              Every service engineered for growth and market dominance — so your
              brand is easier to discover, easier to trust, and easier to choose.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Button href={siteConfig.calendly} external magnetic>
                Free Strategy Call
                <ArrowUpRight className="h-4 w-4" />
              </Button>
              <Button href="/case-studies" variant="secondary">
                Explore Our Work
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <span className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 font-heading text-[11px] font-semibold uppercase tracking-[0.16em] text-offwhite/70">
                Google Partner
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 font-heading text-[11px] font-semibold uppercase tracking-[0.16em] text-offwhite/70">
                Meta Business Partner
              </span>
              <span className="text-sm text-offwhite/40">
                100+ brands trust us
              </span>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.76, 0, 0.24, 1] }}
            className="relative"
          >
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange/15 blur-[90px]" />
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            >
              <LocalImage
                src="/images/service.png"
                alt="Brand Mafia services — SEO, ads, web, and growth operating as one system"
                width={1200}
                height={900}
                className="relative z-10 h-auto w-full select-none"
                priority
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
