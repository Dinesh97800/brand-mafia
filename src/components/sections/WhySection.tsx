"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { BlurRevealText } from "@/components/ui/BlurRevealText";
import { Sparkles, ArrowRight } from "lucide-react";
import { whyStats } from "@/data/site";

function AnimatedCounter({
  value,
  suffix,
  display,
  inView,
}: {
  value: number;
  suffix: string;
  display?: string;
  inView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const increment = value / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, value]);

  if (display) {
    return (
      <span className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-offwhite tracking-tight">
        {display}
      </span>
    );
  }

  const formatted =
    suffix === "M+"
      ? `${count}M+`
      : suffix === "Cr"
        ? `${count}+ Cr`
        : `${count}${suffix}`;

  return (
    <span className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-offwhite tracking-tight">
      {formatted}
    </span>
  );
}

export function WhySection() {
  const statsRef = useRef(null);
  const inView = useInView(statsRef, { once: true, margin: "-80px" });

  return (
    <section className="section-padding relative overflow-hidden pb-0">
      {/* Gradient orb */}
      <div className="absolute -top-20 right-0 w-[500px] h-[500px] rounded-full bg-orange/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-orange/[0.03] blur-[100px] pointer-events-none" />

      <div className="container-custom relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-orange/20 bg-orange/5 px-4 py-2 mb-8"
          >
            <Sparkles className="h-3.5 w-3.5 text-orange" />
            <span className="text-xs font-heading font-semibold uppercase tracking-[0.2em] text-orange">
              Built for Impact
            </span>
          </motion.div>

          {/* Headline */}
          <BlurRevealText
            as="h2"
            trigger="inView"
            className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold leading-[1.15] tracking-tight text-offwhite mb-8"
          >
            Branding, Performance, Strategy — every{" "}
            <span className="bg-gradient-to-r from-orange via-[#ff8c42] to-orange bg-clip-text text-transparent">
              click
            </span>
            , every{" "}
            <span className="bg-gradient-to-r from-orange via-[#ff8c42] to-orange bg-clip-text text-transparent">
              lead
            </span>
            , every{" "}
            <span className="bg-gradient-to-r from-orange via-[#ff8c42] to-orange bg-clip-text text-transparent">
              sale, mastered
            </span>
          </BlurRevealText>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-lg text-offwhite/50 leading-relaxed max-w-2xl mx-auto mb-16"
          >
            We don&apos;t just run campaigns — we engineer growth. From SEO and
            paid media to brand identity and AI automation, Brand Mafia delivers
            end-to-end digital dominance for businesses ready to lead their market.
          </motion.p>

          {/* Stats row */}
          <div
            ref={statsRef}
            className="grid grid-cols-1 sm:grid-cols-3 gap-10 md:gap-16 mb-14"
          >
            {whyStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                className="text-center"
              >
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  display={stat.display}
                  inView={inView}
                />
                <p className="mt-3 text-sm md:text-base text-offwhite/40 font-body">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Link
              href="/about"
              className="group inline-flex items-center gap-3 rounded-full border border-orange/40 px-8 py-3.5 font-heading text-sm font-semibold text-orange transition-all duration-300 hover:border-orange hover:bg-orange/5 hover:gap-4"
            >
              Know More
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
