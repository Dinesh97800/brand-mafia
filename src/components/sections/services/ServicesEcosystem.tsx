"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BarChart3,
  PenTool,
  Rocket,
  Settings,
  Target,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { BlurRevealText } from "@/components/ui/BlurRevealText";

const satellites: {
  title: string;
  description: string;
  icon: LucideIcon;
  side: "left" | "right";
}[] = [
  {
    title: "Strategy",
    description: "Deep research. Clear roadmap. Measurable goals.",
    icon: Target,
    side: "left",
  },
  {
    title: "Performance",
    description: "Paid, organic, CRO — driving results that scale.",
    icon: BarChart3,
    side: "right",
  },
  {
    title: "Creative & Content",
    description: "Compelling stories. Scroll-stopping creative.",
    icon: PenTool,
    side: "left",
  },
  {
    title: "Automation",
    description: "Smarter systems. Better efficiency. More output.",
    icon: Settings,
    side: "right",
  },
];

function SatelliteCard({
  title,
  description,
  icon: Icon,
  side,
  delay,
}: {
  title: string;
  description: string;
  icon: LucideIcon;
  side: "left" | "right";
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay }}
      className="relative"
    >
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute top-1/2 hidden h-[2px] w-8 -translate-y-1/2 bg-orange shadow-[0_0_10px_rgba(240,87,7,0.85)] lg:block",
          side === "left" ? "left-full" : "right-full"
        )}
      />
      <div className="glass rounded-xl px-4 py-4">
        <Icon className="h-4 w-4 text-orange" strokeWidth={1.8} />
        <h3 className="mt-3 font-heading text-sm font-bold text-offwhite">
          {title}
        </h3>
        <p className="mt-1.5 text-[12px] leading-relaxed text-offwhite/50">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

export function ServicesEcosystem() {
  return (
    <section className="relative overflow-hidden px-4 py-16 sm:px-6 md:py-20 lg:px-8 xl:px-16">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-15" />
      <div className="pointer-events-none absolute right-[12%] top-1/2 h-[360px] w-[360px] -translate-y-1/2 rounded-full bg-orange/[0.08] blur-[120px]" />

      <div className="container-custom relative grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10 xl:gap-16">
        <div className="max-w-md">
          <span className="mb-4 inline-block font-heading text-xs font-semibold uppercase tracking-[0.35em] text-orange">
            How It Works
          </span>
          <BlurRevealText
            as="h2"
            trigger="inView"
            className="font-heading text-3xl font-bold leading-[1.15] text-offwhite md:text-4xl lg:text-[2.75rem]"
          >
            Our Services. Working as{" "}
            <span className="text-orange">One.</span>
          </BlurRevealText>
          <p className="mt-4 text-sm leading-relaxed text-offwhite/50 md:text-base">
            We combine strategy, creativity, performance, and automation into a
            unified growth engine built around your business goals.
          </p>
          <Link
            href="/#process"
            className="group mt-7 inline-flex items-center gap-2 rounded-full border border-orange px-6 py-2.5 font-heading text-sm font-semibold text-offwhite transition-all duration-300 hover:bg-orange/10 hover:gap-3"
          >
            See Our Process
            <ArrowUpRight className="h-4 w-4 text-orange" />
          </Link>
        </div>

        <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_auto_1fr] lg:grid-rows-2 lg:gap-x-8 lg:gap-y-5">
            <SatelliteCard {...satellites[0]} delay={0.05} />

            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="order-first sm:col-span-2 lg:order-none lg:col-span-1 lg:row-span-2 lg:flex lg:items-center"
            >
              <div className="mx-auto w-full max-w-[220px] rounded-2xl border border-orange bg-black px-5 py-7 text-center shadow-[0_0_40px_rgba(240,87,7,0.28),inset_0_0_24px_rgba(240,87,7,0.06)] lg:max-w-[200px] xl:max-w-[220px]">
                <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-orange/30 bg-orange/10">
                  <Rocket className="h-5 w-5 text-orange" strokeWidth={1.8} />
                </span>
                <h3 className="mt-4 font-heading text-base font-bold text-offwhite">
                  Growth Engine
                </h3>
                <p className="mt-2 text-[11px] leading-relaxed text-offwhite/50">
                  Data. Strategy. Execution. Continuous Optimization.
                </p>
              </div>
            </motion.div>

            <SatelliteCard {...satellites[1]} delay={0.1} />
            <SatelliteCard {...satellites[2]} delay={0.15} />
            <SatelliteCard {...satellites[3]} delay={0.2} />
          </div>
        </div>
      </div>
    </section>
  );
}
