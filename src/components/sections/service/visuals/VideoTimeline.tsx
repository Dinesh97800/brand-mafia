"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FRAMES = ["Brief", "Concept", "Pre-pro", "Shoot", "Edit", "Delivery"];

export function VideoTimeline() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      const frames = gsap.utils.toArray<HTMLElement>("[data-frame]");
      const playhead = el.querySelector("[data-playhead]");
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(frames, { opacity: 1 });
        gsap.set(playhead, { scaleX: 1 });
      });
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(frames, { opacity: 0.25 });
        gsap.set(playhead, { scaleX: 0, transformOrigin: "left" });
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "top 70%",
            end: "bottom 45%",
            scrub: 0.75,
          },
        });
        tl.to(playhead, { scaleX: 1, ease: "none" }, 0);
        tl.to(frames, { opacity: 1, stagger: 0.08, ease: "none" }, 0);
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root}>
      <div className="relative mb-6 h-px bg-white/10">
        <div data-playhead className="absolute inset-y-0 left-0 w-full bg-orange" />
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
        {FRAMES.map((frame, i) => (
          <div
            key={frame}
            data-frame
            className="aspect-[4/5] border border-white/10 bg-black p-3"
          >
            <span className="font-heading text-[10px] text-orange">0{i + 1}</span>
            <p className="mt-8 font-heading text-sm font-bold text-offwhite">
              {frame}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
