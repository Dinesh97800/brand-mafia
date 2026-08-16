"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PIECES = [
  { label: "Positioning", className: "md:col-span-2 md:row-span-2 text-3xl md:text-5xl" },
  { label: "Type", className: "font-heading italic" },
  { label: "Color", className: "bg-orange text-black" },
  { label: "Voice", className: "" },
  { label: "Mark", className: "" },
  { label: "Applications", className: "md:col-span-2" },
];

export function BrandIdentitySystem() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      const cells = gsap.utils.toArray<HTMLElement>("[data-brand-cell]");
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(cells, { opacity: 1, y: 0 });
      });
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          cells,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top 75%",
              end: "bottom 50%",
              scrub: 0.7,
            },
          }
        );
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="grid grid-cols-2 gap-2 md:grid-cols-4">
      {PIECES.map((piece) => (
        <div
          key={piece.label}
          data-brand-cell
          className={`flex min-h-[110px] items-end border border-white/10 p-4 font-heading font-bold text-offwhite ${piece.className}`}
        >
          {piece.label}
        </div>
      ))}
    </div>
  );
}
