"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BARS = [
  { label: "Spend", h: 38 },
  { label: "Campaigns", h: 52 },
  { label: "Leads", h: 70 },
  { label: "Purchases", h: 84 },
  { label: "ROAS", h: 100 },
];

export function PerformanceFunnel() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      const fills = gsap.utils.toArray<HTMLElement>("[data-bar-fill]");
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(fills, { scaleY: 1 });
      });
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          fills,
          { scaleY: 0.15 },
          {
            scaleY: 1,
            stagger: 0.08,
            ease: "none",
            transformOrigin: "bottom",
            scrollTrigger: {
              trigger: el,
              start: "top 70%",
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
    <div ref={root} className="flex h-64 items-end gap-3 md:h-80">
      {BARS.map((bar) => (
        <div key={bar.label} className="flex flex-1 flex-col items-center gap-3">
          <div className="relative w-full flex-1 overflow-hidden">
            <div
              data-bar-fill
              className="absolute inset-x-0 bottom-0 bg-orange/80"
              style={{ height: `${bar.h}%` }}
            />
          </div>
          <span className="font-heading text-[10px] uppercase tracking-[0.16em] text-offwhite/45">
            {bar.label}
          </span>
        </div>
      ))}
    </div>
  );
}
