"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STEPS = ["Search", "Category", "Product", "Cart", "Revenue"];

export function EcommerceJourney() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      const tiles = gsap.utils.toArray<HTMLElement>("[data-ecom-tile]");
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(tiles, { x: 0, opacity: 1 });
      });
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          tiles,
          { x: -24, opacity: 0.35 },
          {
            x: 0,
            opacity: 1,
            stagger: 0.12,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top 75%",
              end: "bottom 55%",
              scrub: 0.6,
            },
          }
        );
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="grid grid-cols-2 gap-2 sm:grid-cols-5">
      {STEPS.map((step, i) => (
        <div
          key={step}
          data-ecom-tile
          className="aspect-[4/5] border border-white/10 bg-white/[0.03] p-3 sm:aspect-auto sm:min-h-[180px]"
        >
          <span className="font-heading text-[10px] text-orange">0{i + 1}</span>
          <p className="mt-auto pt-10 font-heading text-sm font-bold text-offwhite sm:pt-16">
            {step}
          </p>
        </div>
      ))}
    </div>
  );
}
