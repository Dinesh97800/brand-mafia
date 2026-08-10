"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { processSteps } from "@/data/site";
import { SectionHeading } from "@/components/ui/SectionHeading";

gsap.registerPlugin(ScrollTrigger);

export function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!lineRef.current || !containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            end: "bottom 60%",
            scrub: 1,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
      <div className="container-custom relative">
        <SectionHeading
          label="Our Process"
          title="From Discovery to Dominance"
          description="A proven framework that transforms brands into market leaders."
          align="center"
        />

        <div ref={containerRef} className="relative mt-16">
          {/* Desktop horizontal timeline */}
          <div className="hidden lg:block relative">
            <div className="absolute top-8 left-0 right-0 h-[2px] bg-white/10">
              <div
                ref={lineRef}
                className="h-full bg-orange origin-left"
                style={{ transform: "scaleX(0)" }}
              />
            </div>

            <div className="grid grid-cols-5 gap-4">
              {processSteps.map((step, i) => (
                <motion.div
                  key={step.step}
                  className="text-center"
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.15, duration: 0.6 }}
                >
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border-2 border-orange bg-black relative z-10">
                    <span className="font-heading text-sm font-bold text-orange">
                      {step.step}
                    </span>
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-offwhite mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-offwhite/50 leading-relaxed px-2">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile vertical timeline */}
          <div className="lg:hidden space-y-8">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.step}
                className="flex gap-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="flex flex-col items-center">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-orange bg-black">
                    <span className="font-heading text-xs font-bold text-orange">
                      {step.step}
                    </span>
                  </div>
                  {i < processSteps.length - 1 && (
                    <div className="w-[2px] flex-1 bg-orange/30 mt-2" />
                  )}
                </div>
                <div className="pb-4">
                  <h3 className="font-heading text-lg font-semibold text-offwhite mb-1">
                    {step.title}
                  </h3>
                  <p className="text-sm text-offwhite/50">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
