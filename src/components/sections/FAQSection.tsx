"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { faqs } from "@/data/site";
import { SectionHeading, FadeUp } from "@/components/ui/SectionHeading";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="section-padding relative">
      <div className="container-custom max-w-3xl">
        <SectionHeading
          label="FAQ"
          title="Questions? We've Got Answers."
          align="center"
        />

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <FadeUp key={faq.question} delay={i * 0.05}>
                <div className="glass rounded-xl overflow-hidden">
                  <button
                    className="flex w-full items-center justify-between p-5 md:p-6 text-left"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                  >
                    <span className="font-heading text-sm md:text-base font-medium text-offwhite pr-4">
                      {faq.question}
                    </span>
                    <span className="shrink-0 text-orange">
                      {isOpen ? (
                        <Minus className="h-4 w-4" />
                      ) : (
                        <Plus className="h-4 w-4" />
                      )}
                    </span>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="px-5 md:px-6 pb-5 md:pb-6 text-sm text-offwhite/60 leading-relaxed">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
