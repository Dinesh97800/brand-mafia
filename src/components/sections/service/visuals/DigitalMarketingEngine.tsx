"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CHANNELS = [
  { id: "seo", label: "SEO", x: 12, y: 18 },
  { id: "content", label: "Content", x: 78, y: 12 },
  { id: "social", label: "Social", x: 88, y: 48 },
  { id: "paid", label: "Paid Media", x: 72, y: 82 },
  { id: "email", label: "Email", x: 18, y: 84 },
  { id: "conversion", label: "Conversion", x: 8, y: 50 },
];

export function DigitalMarketingEngine() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      const lines = gsap.utils.toArray<SVGLineElement>("[data-engine-line]");
      const nodes = gsap.utils.toArray<HTMLElement>("[data-engine-node]");
      const hub = el.querySelector("[data-engine-hub]");

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(lines, { strokeDashoffset: 0 });
        gsap.set(nodes, { opacity: 1, scale: 1 });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        lines.forEach((line) => {
          const length = line.getTotalLength();
          gsap.set(line, {
            strokeDasharray: length,
            strokeDashoffset: length,
          });
        });
        gsap.set(nodes, { opacity: 0, scale: 0.85 });
        gsap.set(hub, { opacity: 0, scale: 0.9 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "top 70%",
            end: "bottom 55%",
            scrub: 0.7,
          },
        });

        tl.to(hub, { opacity: 1, scale: 1, duration: 0.2, ease: "none" });
        lines.forEach((line, i) => {
          tl.to(
            line,
            { strokeDashoffset: 0, duration: 0.18, ease: "none" },
            0.15 + i * 0.08
          );
          tl.to(
            nodes[i],
            { opacity: 1, scale: 1, duration: 0.12, ease: "none" },
            0.22 + i * 0.08
          );
        });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={root}
      className="relative mx-auto aspect-[16/10] w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a]"
    >
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        {CHANNELS.map((channel) => (
          <line
            key={channel.id}
            data-engine-line
            x1="50"
            y1="50"
            x2={channel.x}
            y2={channel.y}
            stroke="#F05707"
            strokeOpacity="0.45"
            strokeWidth="0.4"
          />
        ))}
      </svg>

      <div
        data-engine-hub
        className="absolute left-1/2 top-1/2 z-10 w-[38%] max-w-[180px] -translate-x-1/2 -translate-y-1/2 border border-orange/40 bg-black/80 px-3 py-4 text-center backdrop-blur-sm md:px-4 md:py-5"
      >
        <p className="font-heading text-[10px] uppercase tracking-[0.25em] text-orange">
          Brand Growth
        </p>
        <p className="mt-1 font-heading text-sm font-bold text-offwhite md:text-base">
          Engine
        </p>
      </div>

      {CHANNELS.map((channel) => (
        <div
          key={channel.id}
          data-engine-node
          className="absolute z-10 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap border border-white/15 bg-black/70 px-2 py-1 font-heading text-[10px] uppercase tracking-[0.16em] text-offwhite/80 md:text-[11px]"
          style={{ left: `${channel.x}%`, top: `${channel.y}%` }}
        >
          {channel.label}
        </div>
      ))}
    </div>
  );
}
