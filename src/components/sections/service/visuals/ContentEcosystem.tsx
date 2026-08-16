"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BRANCHES = ["Article", "Video", "Social", "Email", "Search"];

export function ContentEcosystem() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      const idea = el.querySelector("[data-idea]");
      const branches = gsap.utils.toArray<HTMLElement>("[data-branch]");
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set([idea, ...branches], { opacity: 1, y: 0 });
      });
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(branches, { opacity: 0, y: 20 });
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "top 70%",
            end: "bottom 50%",
            scrub: 0.7,
          },
        });
        tl.fromTo(idea, { scale: 0.92, opacity: 0.5 }, { scale: 1, opacity: 1, ease: "none" });
        tl.to(branches, { opacity: 1, y: 0, stagger: 0.08, ease: "none" }, 0.2);
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="text-center">
      <div
        data-idea
        className="mx-auto max-w-xs border border-orange/40 bg-orange/[0.07] px-6 py-5"
      >
        <p className="font-heading text-xs uppercase tracking-[0.25em] text-orange">
          One idea
        </p>
        <p className="mt-2 font-heading text-xl font-bold text-offwhite">
          A story worth keeping
        </p>
      </div>
      <div className="mx-auto my-4 h-10 w-px bg-orange/40" />
      <div className="grid gap-3 sm:grid-cols-5">
        {BRANCHES.map((branch) => (
          <div
            key={branch}
            data-branch
            className="border border-white/10 px-3 py-4 font-heading text-sm text-offwhite"
          >
            {branch}
          </div>
        ))}
      </div>
    </div>
  );
}
