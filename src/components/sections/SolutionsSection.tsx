"use client";

import { solutions } from "@/data/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SolutionsAccordion } from "@/components/ui/SolutionsAccordion";

export function SolutionsSection() {
  return (
    <section className="section-padding relative">
      <div className="container-custom">
        <SectionHeading
          title="Solutions"
          description="Straight answers to the questions brands ask us most — and where to go next."
          align="left"
          className="max-w-2xl"
        />

        <SolutionsAccordion items={solutions} className="mt-4 md:mt-6" />
      </div>
    </section>
  );
}
