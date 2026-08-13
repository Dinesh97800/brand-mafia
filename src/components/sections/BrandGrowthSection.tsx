"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Compass,
  Palette,
  TrendingUp,
  Bot,
  Flame,
  type LucideIcon,
} from "lucide-react";
import { brandGrowthLayers } from "@/data/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, LucideIcon> = {
  Compass,
  Palette,
  TrendingUp,
  Bot,
};

const LAYER_OFFSETS = [
  { x: -155, y: -125 },
  { x: 155, y: -125 },
  { x: -155, y: 125 },
  { x: 155, y: 125 },
];

function BrandGrowthGraphic({
  coreRef,
  layerRefs,
  glowRefs,
  activeIndex,
}: {
  coreRef: React.RefObject<HTMLDivElement | null>;
  layerRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
  glowRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
  activeIndex: number;
}) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[460px] overflow-visible">
      <div className="absolute inset-[8%] rounded-full bg-orange/15 blur-[80px]" />

      {brandGrowthLayers.map((layer, i) => {
        const Icon = iconMap[layer.icon] ?? Compass;
        const isActive = activeIndex === i;
        const isPeeled = activeIndex > i;

        return (
          <div
            key={layer.id}
            ref={(el) => {
              layerRefs.current[i] = el;
            }}
            className="absolute left-1/2 top-1/2 z-10 will-change-transform"
            style={{ opacity: 0 }}
          >
            <div
              ref={(el) => {
                glowRefs.current[i] = el;
              }}
              className="absolute inset-0 rounded-2xl bg-orange/30 blur-xl"
              style={{ opacity: 0 }}
            />
            <div
              className={cn(
                "relative flex h-[80px] w-[80px] flex-col items-center justify-center rounded-2xl border bg-black/90 backdrop-blur-md transition-shadow duration-500 sm:h-[88px] sm:w-[88px]",
                isActive
                  ? "border-orange/50 shadow-[0_0_30px_rgba(240,87,7,0.35)]"
                  : isPeeled
                    ? "border-orange/25"
                    : "border-orange/20"
              )}
            >
              <div className="mb-1 flex h-8 w-8 items-center justify-center rounded-lg bg-orange/10 sm:h-9 sm:w-9">
                <Icon className="h-4 w-4 text-orange" strokeWidth={1.75} />
              </div>
              <span className="font-heading text-[8px] font-semibold uppercase tracking-wider text-orange/90 sm:text-[9px]">
                {layer.title}
              </span>
            </div>
          </div>
        );
      })}

      <div
        ref={coreRef}
        className="absolute left-1/2 top-1/2 z-20 w-[210px] will-change-transform sm:w-[230px]"
        style={{ opacity: 1 }}
      >
        <div className="gradient-border overflow-hidden rounded-2xl shadow-[0_0_60px_rgba(240,87,7,0.15)]">
          <div className="relative bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#0a0a0a] p-5">
            <div className="absolute right-0 top-0 h-full w-8 bg-gradient-to-b from-orange/20 via-orange/5 to-orange/20 opacity-60" />

            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Flame className="h-4 w-4 text-orange" />
                <span className="font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-orange">
                  Growth Engine
                </span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-1.5 w-1.5 rounded-full bg-orange animate-pulse" />
                <span className="font-mono text-[8px] text-orange/80">LIVE</span>
              </div>
            </div>

            <div className="mb-4 flex gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-orange/30 bg-orange/10">
                <span className="font-heading text-sm font-bold text-orange">BM</span>
              </div>
              <div className="flex flex-1 flex-col justify-end pb-0.5">
                <div className="flex h-8 items-end gap-1">
                  {[40, 55, 45, 70, 60, 85, 75, 100].map((h, n) => (
                    <div
                      key={n}
                      className="flex-1 rounded-sm bg-gradient-to-t from-orange/20 to-orange/60"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-2 border-t border-white/5 pt-3">
              <div className="flex justify-between">
                <span className="font-mono text-[7px] uppercase tracking-wider text-white/30">
                  Reach
                </span>
                <span className="font-mono text-[7px] text-orange/70">+247%</span>
              </div>
              <div className="flex justify-between">
                <span className="font-mono text-[7px] uppercase tracking-wider text-white/30">
                  ROAS
                </span>
                <span className="font-mono text-[7px] text-green-400/80">5.2×</span>
              </div>
              <div className="flex justify-between">
                <span className="font-mono text-[7px] uppercase tracking-wider text-white/30">
                  Leads
                </span>
                <span className="font-mono text-[7px] text-offwhite/60">↑ Scaling</span>
              </div>
            </div>

            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
              <div className="absolute inset-x-0 h-px animate-[scan_3s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-orange/40 to-transparent" />
            </div>
          </div>
        </div>
      </div>

      <svg
        className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-visible"
        viewBox="0 0 420 420"
        fill="none"
        aria-hidden="true"
      >
        <circle
          cx="210"
          cy="210"
          r="160"
          stroke="rgba(240,87,7,0.08)"
          strokeWidth="1"
          strokeDasharray="4 8"
        />
        <circle
          cx="210"
          cy="210"
          r="120"
          stroke="rgba(240,87,7,0.05)"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}

function TextBlock({
  layer,
  index,
  blockRef,
  activeIndex,
}: {
  layer: (typeof brandGrowthLayers)[0];
  index: number;
  blockRef: (el: HTMLDivElement | null) => void;
  activeIndex: number;
}) {
  const Icon = iconMap[layer.icon] ?? Compass;
  const isActive = activeIndex === index;

  return (
    <div
      ref={blockRef}
      className="flex min-h-[80vh] flex-col justify-center py-12 lg:min-h-screen lg:py-0"
    >
      <div
        className={cn(
          "max-w-lg transition-[opacity,transform] duration-500",
          isActive ? "opacity-100 translate-y-0" : "opacity-35 lg:translate-y-3"
        )}
      >
        <div className="mb-5 flex items-center gap-3">
          <div
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-xl border transition-colors duration-500",
              isActive
                ? "border-orange/40 bg-orange/10"
                : "border-white/10 bg-white/[0.03]"
            )}
          >
            <Icon
              className={cn(
                "h-5 w-5 transition-colors duration-500",
                isActive ? "text-orange" : "text-offwhite/40"
              )}
              strokeWidth={1.75}
            />
          </div>
          <span className="font-heading text-xs font-semibold uppercase tracking-[0.25em] text-orange/70">
            Pillar {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <h3 className="font-heading text-2xl font-bold tracking-tight text-offwhite sm:text-3xl md:text-4xl">
          {layer.title}
        </h3>
        <p className="mt-2 font-heading text-sm font-medium text-orange/80">
          {layer.subtitle}
        </p>
        <p className="mt-4 text-base leading-relaxed text-offwhite/50 md:text-lg">
          {layer.description}
        </p>
      </div>

      <div className="mt-8 lg:hidden">
        <div className="flex items-center gap-4 rounded-2xl border border-orange/20 bg-orange/5 p-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-orange/30 bg-black/60">
            <Icon className="h-6 w-6 text-orange" />
          </div>
          <div>
            <p className="font-heading text-sm font-semibold text-offwhite">
              {layer.title}
            </p>
            <p className="text-xs text-offwhite/40">Growth pillar active</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function BrandGrowthSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const glowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const scrollArea = scrollRef.current;
    const pin = pinRef.current;
    const core = coreRef.current;
    if (!scrollArea || !pin || !core) return;

    let ctx: gsap.Context | undefined;

    const setup = () => {
      ctx?.revert();

      const layers = layerRefs.current.filter(Boolean) as HTMLDivElement[];
      const glows = glowRefs.current.filter(Boolean) as HTMLDivElement[];
      const blocks = blockRefs.current.filter(Boolean) as HTMLDivElement[];

      if (layers.length === 0) return;

      ctx = gsap.context(() => {
        const mm = gsap.matchMedia();

        mm.add("(min-width: 1024px)", () => {
          gsap.set([core, ...layers], {
            xPercent: -50,
            yPercent: -50,
            force3D: true,
          });

          gsap.set(layers, { x: 0, y: 0, scale: 0.55, opacity: 0 });
          gsap.set(glows, { opacity: 0, scale: 0.8 });
          gsap.set(core, { x: 0, y: 0, scale: 1, opacity: 1 });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: scrollArea,
              start: "top 72px",
              end: "bottom bottom",
              scrub: 1,
              pin: pin,
              pinSpacing: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                const idx = Math.min(
                  brandGrowthLayers.length - 1,
                  Math.floor(self.progress * brandGrowthLayers.length)
                );
                if (idx !== activeIndexRef.current) {
                  activeIndexRef.current = idx;
                  setActiveIndex(idx);
                }
              },
            },
          });

          brandGrowthLayers.forEach((_, i) => {
            const offset = LAYER_OFFSETS[i];
            const start = i;

            tl.to(
              layers[i],
              { opacity: 0.95, scale: 0.8, duration: 0.12, ease: "power2.out" },
              start
            );

            tl.to(
              layers[i],
              {
                x: offset.x,
                y: offset.y,
                scale: 1,
                duration: 0.88,
                ease: "power2.out",
              },
              start + 0.12
            );

            tl.to(
              glows[i],
              {
                opacity: 0.75,
                scale: 1.35,
                duration: 0.5,
                ease: "power2.out",
              },
              start + 0.35
            );

            tl.to(
              core,
              {
                scale: 1 - (i + 1) * 0.035,
                duration: 0.88,
                ease: "power2.inOut",
              },
              start + 0.12
            );

            if (blocks[i]) {
              tl.fromTo(
                blocks[i],
                { opacity: 0.35, y: 20 },
                { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" },
                start
              );

              if (i < brandGrowthLayers.length - 1) {
                tl.to(
                  blocks[i],
                  { opacity: 0.35, y: -12, duration: 0.35, ease: "power2.in" },
                  start + 0.55
                );
              }
            }
          });

          return () => {
            tl.scrollTrigger?.kill();
            tl.kill();
          };
        });

        mm.add("(max-width: 1023px)", () => {
          gsap.set(layers, { clearProps: "all" });
          gsap.set(glows, { clearProps: "all" });
          gsap.set(core, { clearProps: "all" });

          blocks.forEach((block, i) => {
            ScrollTrigger.create({
              trigger: block,
              start: "top 75%",
              end: "bottom 25%",
              onEnter: () => {
                activeIndexRef.current = i;
                setActiveIndex(i);
              },
              onEnterBack: () => {
                activeIndexRef.current = i;
                setActiveIndex(i);
              },
            });
          });
        });
      }, scrollRef);
    };

    const scheduleSetup = () => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setup();
          ScrollTrigger.refresh();
        });
      });
    };

    scheduleSetup();

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(scheduleSetup, 150);
    };

    window.addEventListener("resize", onResize);

    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      ctx?.revert();
    };
  }, []);

  return (
    <section className="relative overflow-hidden" aria-label="Brand growth pillars">
      <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />
      <div className="absolute -left-40 top-1/4 h-[500px] w-[500px] rounded-full bg-orange/5 blur-[120px] pointer-events-none" />

      <div className="container-custom relative section-padding pb-0">
        <SectionHeading
          label="How We Grow Brands"
          title="Four Layers of Growth"
          description="Scroll to unlock each pillar of our full-stack growth engine — from strategy and creative to performance and automation."
          align="center"
        />
      </div>

      <div ref={scrollRef} className="container-custom relative">
        <div className="flex flex-col lg:flex-row lg:gap-12 xl:gap-16">
          <div className="lg:w-1/2">
            {brandGrowthLayers.map((layer, i) => (
              <TextBlock
                key={layer.id}
                layer={layer}
                index={i}
                activeIndex={activeIndex}
                blockRef={(el) => {
                  blockRefs.current[i] = el;
                }}
              />
            ))}
          </div>

          <div className="hidden lg:block lg:w-1/2">
            <div
              ref={pinRef}
              className="flex h-[calc(100svh-4.5rem)] items-center justify-center overflow-visible pt-4"
            >
              <BrandGrowthGraphic
                coreRef={coreRef}
                layerRefs={layerRefs}
                glowRefs={glowRefs}
                activeIndex={activeIndex}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
