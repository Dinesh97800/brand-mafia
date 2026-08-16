"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function WebsiteBuildVisual() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      const wire = el.querySelector("[data-wire]");
      const ui = el.querySelector("[data-ui]");
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(wire, { opacity: 0 });
        gsap.set(ui, { opacity: 1 });
      });
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(ui, { opacity: 0 });
        gsap.set(wire, { opacity: 1 });
        gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "top 70%",
            end: "bottom 45%",
            scrub: 0.8,
          },
        })
          .to(wire, { opacity: 0.15, ease: "none" })
          .to(ui, { opacity: 1, ease: "none" }, 0.25);
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={root}
      className="relative aspect-[16/11] overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c0c]"
    >
      <div data-wire className="absolute inset-4 grid grid-rows-[auto_1fr_auto] gap-3">
        <div className="h-8 border border-dashed border-white/25" />
        <div className="grid grid-cols-3 gap-3">
          <div className="border border-dashed border-white/20" />
          <div className="col-span-2 border border-dashed border-white/20" />
        </div>
        <div className="h-10 border border-dashed border-white/25" />
      </div>
      <div data-ui className="absolute inset-4 flex flex-col justify-between bg-black/40 p-5">
        <div>
          <p className="font-heading text-[10px] uppercase tracking-[0.25em] text-orange">
            Live interface
          </p>
          <p className="mt-3 font-heading text-2xl font-bold text-offwhite">
            Book the next step.
          </p>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-offwhite/40">Clear path. Fast load.</span>
          <span className="bg-orange px-3 py-1.5 font-heading text-xs font-semibold text-black">
            Start
          </span>
        </div>
      </div>
    </div>
  );
}
