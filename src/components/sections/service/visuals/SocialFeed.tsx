"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CARDS = [
  { stage: "Strategy", title: "A point of view", tone: "bg-white/[0.04]" },
  { stage: "Creative", title: "Work that stops the thumb", tone: "bg-orange/[0.08]" },
  { stage: "Conversation", title: "Replies that sound like you", tone: "bg-white/[0.04]" },
  { stage: "Community", title: "People who come back", tone: "bg-white/[0.06]" },
  { stage: "Growth", title: "Presence that compounds", tone: "bg-orange/[0.12]" },
];

export function SocialFeed() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      const cards = gsap.utils.toArray<HTMLElement>("[data-feed-card]");
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(cards, { x: 0, opacity: 1 });
      });
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          cards,
          { x: 40, opacity: 0.4 },
          {
            x: 0,
            opacity: 1,
            stagger: 0.1,
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
    <div
      ref={root}
      className="flex gap-3 overflow-x-auto pb-2 md:grid md:grid-cols-5 md:overflow-visible"
    >
      {CARDS.map((card) => (
        <article
          key={card.stage}
          data-feed-card
          className={`min-w-[200px] flex-1 border border-white/10 p-4 md:min-w-0 ${card.tone}`}
        >
          <p className="font-heading text-[10px] uppercase tracking-[0.2em] text-orange">
            {card.stage}
          </p>
          <h3 className="mt-8 font-heading text-lg font-bold leading-snug text-offwhite">
            {card.title}
          </h3>
        </article>
      ))}
    </div>
  );
}
