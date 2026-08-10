"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { testimonials } from "@/data/site";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const prev = () =>
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-hero-glow opacity-15 pointer-events-none" />
      <div className="container-custom relative">
        <SectionHeading
          label="Testimonials"
          title="What Our Clients Say"
          align="center"
        />

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="glass-strong rounded-3xl p-8 md:p-12 relative"
            >
              <Quote className="absolute top-8 right-8 h-10 w-10 text-orange/20" />

              <div className="flex gap-1 mb-6">
                {Array.from({ length: testimonials[current].rating }).map(
                  (_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-orange text-orange"
                    />
                  )
                )}
              </div>

              <blockquote className="text-lg md:text-xl text-offwhite/80 leading-relaxed mb-8">
                &ldquo;{testimonials[current].text}&rdquo;
              </blockquote>

              <div className="flex items-center gap-4">
                <div className="relative h-14 w-14 rounded-full overflow-hidden border-2 border-orange/30">
                  <Image
                    src={testimonials[current].image}
                    alt={testimonials[current].name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-heading font-semibold text-offwhite">
                    {testimonials[current].name}
                  </p>
                  <p className="text-sm text-offwhite/50">
                    {testimonials[current].role}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-offwhite/60 hover:border-orange hover:text-orange transition-all"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === current ? "w-8 bg-orange" : "w-2 bg-white/20"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-offwhite/60 hover:border-orange hover:text-orange transition-all"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
