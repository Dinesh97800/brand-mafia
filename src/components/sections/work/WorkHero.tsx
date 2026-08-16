"use client";

import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { BlurRevealText } from "@/components/ui/BlurRevealText";
import { LocalImage } from "@/components/ui/LocalImage";

const anchors = [
  { n: "01", label: "Featured", href: "#featured", active: true },
  { n: "02", label: "Selected", href: "#selected", active: false },
  { n: "03", label: "Contact", href: "#empire", active: false },
];

export function WorkHero() {
  return (
    <section className="relative flex min-h-[88vh] flex-col justify-end overflow-hidden pt-28 pb-10 md:min-h-[92vh] md:pt-36 md:pb-14">
      <LocalImage
        src="/images/work/work-hero.webp"
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-[78%_center] select-none"
        priority
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/15" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
      <div className="pointer-events-none absolute inset-0 bg-hero-glow opacity-20" />

      <div className="container-custom relative z-10 flex flex-1 flex-col px-4 sm:px-6 lg:px-8 xl:px-16">
        <div className="flex max-w-xl flex-1 flex-col justify-center py-10">
          <nav aria-label="On this page" className="mb-8 flex flex-col gap-2">
            {anchors.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`font-heading text-[11px] uppercase tracking-[0.22em] transition-colors ${
                  item.active
                    ? "text-orange"
                    : "text-offwhite/35 hover:text-orange"
                }`}
              >
                <span className={item.active ? "text-orange" : "text-orange/70"}>
                  {item.n}
                </span>{" "}
                {item.label}
              </a>
            ))}
          </nav>

          <BlurRevealText
            as="h1"
            trigger="mount"
            className="font-heading text-5xl font-bold leading-[0.95] tracking-tight text-offwhite sm:text-6xl lg:text-7xl"
          >
            Our Work<span className="text-orange">.</span>
          </BlurRevealText>

          <p className="mt-6 max-w-md text-base leading-relaxed text-offwhite/55 md:text-lg">
            Work we can stand behind — traffic, revenue, and recognition, not a
            gallery of pretty slides.
          </p>

          <Button href="#selected" variant="secondary" className="mt-8 w-fit">
            View All Projects
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        </div>

        <a
          href="#featured"
          className="ml-auto hidden w-fit items-center gap-2 font-heading text-[11px] uppercase tracking-[0.22em] text-offwhite/40 transition-colors hover:text-orange lg:flex"
        >
          Scroll to Explore
          <ArrowDown className="h-3.5 w-3.5" />
        </a>
      </div>
    </section>
  );
}
