"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { BlurRevealText } from "@/components/ui/BlurRevealText";
import { ArrowRight } from "lucide-react";
import { showcasePillars } from "@/data/site";

const pillarHeights = [
  "h-56 md:h-64",
  "h-56 md:h-80",
  "h-56 md:h-96",
  "h-56 md:h-80",
  "h-56 md:h-64",
];

export function ShowcaseSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="section-padding relative overflow-hidden bg-black">
      <div className="container-custom">
        {/* Heading */}
        <BlurRevealText
          as="h2"
          trigger="inView"
          text="Full-service digital marketing agency"
          className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-offwhite text-center mb-12 md:mb-16 max-w-4xl mx-auto leading-tight"
        />

        {/* Peaked image gallery */}
        <div
          ref={ref}
          className="mb-10 grid grid-cols-1 gap-8 md:mb-14 md:flex md:items-end md:justify-center md:gap-4 lg:gap-5"
        >
          {showcasePillars.map((pillar, i) => (
            <motion.div
              key={pillar.label}
              initial={{ opacity: 0, y: 60 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: i * 0.1,
                ease: [0.76, 0, 0.24, 1],
              }}
              className="group flex w-full flex-col items-center md:min-w-0 md:w-auto md:max-w-[220px] md:flex-1"
            >
              <div
                className={`relative w-full overflow-hidden rounded-lg md:rounded-xl ${pillarHeights[i]} transition-transform duration-500 group-hover:scale-[1.03]`}
              >
                <Image
                  src={pillar.image}
                  alt={pillar.label}
                  fill
                  className="object-cover transition-all duration-700 group-hover:brightness-110"
                  sizes="(max-width: 768px) 100vw, 200px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <span className="mt-3 md:mt-4 font-heading text-xs sm:text-sm md:text-base font-bold uppercase tracking-[0.15em] text-offwhite">
                {pillar.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Description + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-2xl mx-auto text-center"
        >
          <p className="text-base md:text-lg text-offwhite/60 leading-relaxed mb-8">
            We are a full-service digital marketing agency built for brands that
            refuse to blend in. From discovery and strategy to content,
            commerce, and paid media — we handle every layer of your growth
            engine under one roof.
          </p>

          <Link
            href="/services"
            className="group inline-flex items-center gap-2 font-heading text-sm font-semibold uppercase tracking-[0.2em] text-orange border-b border-orange pb-1 transition-all hover:gap-3"
          >
            See Services
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
