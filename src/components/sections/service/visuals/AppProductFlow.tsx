"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SCREENS = ["Discover", "Decide", "Act", "Return"];

export function AppProductFlow() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      const screens = gsap.utils.toArray<HTMLElement>("[data-app-screen]");
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(screens, { y: 0, opacity: 1 });
      });
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          screens,
          { y: 48, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.12,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top 75%",
              end: "bottom 50%",
              scrub: 0.65,
            },
          }
        );
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="flex items-end justify-center gap-3 overflow-x-auto pb-2">
      {SCREENS.map((screen, i) => (
        <div
          key={screen}
          data-app-screen
          className="w-[120px] shrink-0 rounded-[1.6rem] border border-white/15 bg-[#111] p-2 sm:w-[140px]"
          style={{ height: `${220 + i * 12}px` }}
        >
          <div className="h-full rounded-[1.2rem] border border-white/10 p-3">
            <div className="mx-auto mb-4 h-1 w-8 rounded-full bg-white/20" />
            <p className="font-heading text-[10px] uppercase tracking-[0.2em] text-orange">
              0{i + 1}
            </p>
            <p className="mt-3 font-heading text-sm font-bold text-offwhite">
              {screen}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
