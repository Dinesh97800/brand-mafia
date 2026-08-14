"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { whyChooseUs } from "@/data/site";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function WhyChooseSection() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute -top-24 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-orange/[0.06] blur-[130px] pointer-events-none" />

      <div className="container-custom relative">
        <SectionHeading
          label="Why Us"
          title="Why Choose Branding Mafia?"
          description="Every package is built around one goal — measurable growth for your business."
          align="center"
        />

        <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2">
          {whyChooseUs.map((reason, i) => (
            <motion.div
              key={reason}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="glass group flex items-center gap-4 rounded-xl px-5 py-4 transition-colors duration-300 hover:border-orange/30"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-orange/20 bg-orange/10 transition-colors duration-300 group-hover:bg-orange/20">
                <Check className="h-4 w-4 text-orange" />
              </span>
              <span className="font-heading text-sm font-semibold text-offwhite/85">
                {reason}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
