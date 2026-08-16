"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const RESULTS = [
  { name: "A nearby competitor", meta: "generic listing" },
  { name: "Directory site", meta: "thin page" },
  { name: "Your brand", meta: "the one worth choosing", featured: true },
  { name: "Another local option", meta: "paid placement" },
  { name: "A review aggregator", meta: "mixed signals" },
];

const GAP = 8;

export function SEORankingVisual() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      const list = el.querySelector<HTMLElement>("[data-rank-list]");
      const rows = gsap.utils.toArray<HTMLElement>("[data-rank-row]");
      const featured = el.querySelector<HTMLElement>("[data-featured]");
      const line = el.querySelector<HTMLElement>("[data-rank-line]");
      const ranks = gsap.utils.toArray<HTMLElement>("[data-rank-num]");

      const measure = () => {
        const heights = rows.map((row) => row.offsetHeight);
        const startTops: number[] = [];
        let cursor = 0;
        heights.forEach((height) => {
          startTops.push(cursor);
          cursor += height + GAP;
        });

        const featuredIndex = rows.findIndex((row) => row === featured);
        const endOrder = [
          featuredIndex,
          ...rows.map((_, i) => i).filter((i) => i !== featuredIndex),
        ];
        const endTops = new Array(rows.length).fill(0);
        cursor = 0;
        endOrder.forEach((i) => {
          endTops[i] = cursor;
          cursor += heights[i] + GAP;
        });

        return { heights, startTops, endTops, total: cursor - GAP };
      };

      mm.add("(prefers-reduced-motion: reduce)", () => {
        if (!list || !featured) return;
        const { endTops, total } = measure();
        list.style.height = `${total}px`;
        rows.forEach((row, i) => {
          gsap.set(row, { position: "absolute", top: 0, y: endTops[i], left: 0, right: 0 });
        });
        ranks.forEach((rank, i) => {
          rank.textContent = String(i === rows.indexOf(featured) ? 1 : i + 1).padStart(2, "0");
        });
        gsap.set(line, { scaleY: 1, transformOrigin: "top" });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        if (!list || !featured) return;

        const apply = (progress: number) => {
          const { startTops, endTops, total } = measure();
          list.style.height = `${total}px`;
          rows.forEach((row, i) => {
            const y = gsap.utils.interpolate(startTops[i], endTops[i], progress);
            gsap.set(row, {
              position: "absolute",
              top: 0,
              y,
              left: 0,
              right: 0,
            });
          });

          const featuredIndex = rows.indexOf(featured);
          ranks.forEach((rank, i) => {
            const startRank = i + 1;
            const endRank = i === featuredIndex ? 1 : i < featuredIndex ? i + 2 : i + 1;
            const current = Math.round(
              gsap.utils.interpolate(startRank, endRank, progress)
            );
            rank.textContent = String(current).padStart(2, "0");
          });
        };

        apply(0);
        gsap.set(line, { scaleY: 0.2, transformOrigin: "top" });

        gsap.to(line, {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 75%",
            end: "bottom 50%",
            scrub: 0.7,
          },
        });

        ScrollTrigger.create({
          trigger: el,
          start: "top 75%",
          end: "bottom 50%",
          scrub: 0.7,
          onUpdate: (self) => apply(self.progress),
        });

        gsap.from(rows, {
          opacity: 0,
          x: 16,
          stagger: 0.06,
          duration: 0.45,
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="relative">
      <div
        className="absolute left-0 top-0 hidden h-full w-px origin-top bg-orange/40 lg:block"
        data-rank-line
      />
      <p className="mb-4 font-heading text-[11px] uppercase tracking-[0.28em] text-offwhite/35">
        Search ecosystem
      </p>
      <div data-rank-list className="relative">
        {RESULTS.map((result, i) => (
          <div
            key={result.name}
            data-rank-row
            data-featured={result.featured ? "" : undefined}
            className={
              result.featured
                ? "border border-orange/50 bg-orange/[0.08] px-4 py-3"
                : "border border-white/10 bg-white/[0.02] px-4 py-3"
            }
          >
            <div className="flex items-baseline justify-between gap-3">
              <span className="font-heading text-sm font-semibold text-offwhite">
                {result.name}
              </span>
              <span
                data-rank-num
                className="font-heading text-[11px] tracking-[0.2em] text-offwhite/30"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <p className="mt-1 text-xs text-offwhite/45">{result.meta}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 max-w-xs text-xs leading-relaxed text-offwhite/40">
        Technical SEO → Content → Authority → Rankings → Qualified traffic
      </p>
    </div>
  );
}
