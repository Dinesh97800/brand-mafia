"use client";

import { clientLogos } from "@/data/site";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ClientsSection() {
  const logos = [...clientLogos, ...clientLogos];

  return (
    <section className="section-padding py-16 md:py-20 overflow-hidden border-y border-white/[0.04]">
      <div className="container-custom mb-10">
        <SectionHeading
          label="Trusted By"
          title="Growing Businesses"
          align="center"
        />
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />

        <div className="flex animate-marquee">
          {logos.map((logo, i) => (
            <div
              key={`${logo}-${i}`}
              className="flex shrink-0 items-center justify-center px-12 md:px-16"
            >
              <span className="font-heading text-xl md:text-2xl font-bold text-offwhite/20 whitespace-nowrap transition-colors hover:text-offwhite/40">
                {logo}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
