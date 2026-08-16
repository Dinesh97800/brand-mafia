"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NODES = [
  "Subscriber",
  "Welcome",
  "Education",
  "Purchase",
  "Retention",
  "Re-engagement",
];

export function EmailLifecycle() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      const nodes = gsap.utils.toArray<HTMLElement>("[data-mail-node]");
      const lines = gsap.utils.toArray<HTMLElement>("[data-mail-line]");
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(nodes, { opacity: 1 });
        gsap.set(lines, { scaleX: 1 });
      });
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(nodes, { opacity: 0.25 });
        gsap.set(lines, { scaleX: 0, transformOrigin: "left" });
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "top 70%",
            end: "bottom 50%",
            scrub: 0.6,
          },
        });
        nodes.forEach((node, i) => {
          tl.to(node, { opacity: 1, duration: 0.12, ease: "none" });
          if (lines[i]) tl.to(lines[i], { scaleX: 1, duration: 0.1, ease: "none" }, ">-0.02");
        });
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="flex flex-col gap-0 md:flex-row md:items-center md:flex-wrap">
      {NODES.map((node, i) => (
        <div key={node} className="flex items-center">
          <div
            data-mail-node
            className="border border-white/15 bg-black px-4 py-3 font-heading text-sm text-offwhite"
          >
            {node}
          </div>
          {i < NODES.length - 1 && (
            <div
              data-mail-line
              className="mx-1 hidden h-px w-8 bg-orange md:block"
            />
          )}
        </div>
      ))}
    </div>
  );
}
