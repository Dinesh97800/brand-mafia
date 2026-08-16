"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NODES = [
  { label: "Brand", x: 18, y: 28 },
  { label: "Offers", x: 22, y: 72 },
  { label: "Proof", x: 50, y: 18 },
  { label: "Pages", x: 78, y: 30 },
  { label: "Entities", x: 70, y: 70 },
  { label: "Discovery", x: 50, y: 86 },
];

export function AIKnowledgeGraph() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      const dots = gsap.utils.toArray<HTMLElement>("[data-graph-node]");
      const lines = gsap.utils.toArray<SVGLineElement>("[data-graph-line]");
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(dots, { opacity: 1, scale: 1 });
        gsap.set(lines, { strokeDashoffset: 0 });
      });
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        lines.forEach((line) => {
          const len = line.getTotalLength();
          gsap.set(line, { strokeDasharray: len, strokeDashoffset: len });
        });
        gsap.set(dots, { opacity: 0, scale: 0.7 });
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "top 70%",
            end: "bottom 50%",
            scrub: 0.7,
          },
        });
        tl.to(dots, { opacity: 1, scale: 1, stagger: 0.08, ease: "none" });
        tl.to(lines, { strokeDashoffset: 0, stagger: 0.06, ease: "none" }, 0.15);
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={root}
      className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/10 bg-[#080808]"
    >
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden>
        <line data-graph-line x1="18" y1="28" x2="50" y2="50" stroke="#F05707" strokeOpacity="0.4" strokeWidth="0.35" />
        <line data-graph-line x1="22" y1="72" x2="50" y2="50" stroke="#F05707" strokeOpacity="0.4" strokeWidth="0.35" />
        <line data-graph-line x1="50" y1="18" x2="50" y2="50" stroke="#F05707" strokeOpacity="0.4" strokeWidth="0.35" />
        <line data-graph-line x1="78" y1="30" x2="50" y2="50" stroke="#F05707" strokeOpacity="0.4" strokeWidth="0.35" />
        <line data-graph-line x1="70" y1="70" x2="50" y2="50" stroke="#F05707" strokeOpacity="0.4" strokeWidth="0.35" />
        <line data-graph-line x1="50" y1="86" x2="50" y2="50" stroke="#F05707" strokeOpacity="0.4" strokeWidth="0.35" />
        <circle cx="50" cy="50" r="5" fill="#020202" stroke="#F05707" strokeWidth="0.5" />
      </svg>
      <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 font-heading text-[10px] uppercase tracking-[0.2em] text-orange">
        Knowledge
      </div>
      {NODES.map((node) => (
        <div
          key={node.label}
          data-graph-node
          className="absolute -translate-x-1/2 -translate-y-1/2 border border-white/15 bg-black/80 px-2 py-1 font-heading text-[10px] uppercase tracking-[0.14em] text-offwhite/80"
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
        >
          {node.label}
        </div>
      ))}
    </div>
  );
}
