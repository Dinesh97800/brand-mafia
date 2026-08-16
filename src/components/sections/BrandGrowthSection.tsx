"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
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
import { LENIS_READY_EVENT, isLenisReady } from "@/components/providers/SmoothScroll";
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

const STEP_COUNT = brandGrowthLayers.length;
const SCROLLER =
  typeof document !== "undefined" ? document.documentElement : undefined;

function GrowthEngineCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "gradient-border overflow-hidden rounded-2xl shadow-[0_0_60px_rgba(240,87,7,0.15)]",
        className
      )}
    >
      <div className="relative bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#0a0a0a] p-5 sm:p-6">
        <div className="absolute right-0 top-0 h-full w-8 bg-gradient-to-b from-orange/20 via-orange/5 to-orange/20 opacity-60" />

        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="h-4 w-4 text-orange" />
            <span className="font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-orange sm:text-xs">
              Growth Engine
            </span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-orange" />
            <span className="font-mono text-[8px] text-orange/80 sm:text-[9px]">
              LIVE
            </span>
          </div>
        </div>

        <div className="mb-4 flex gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-orange/30 bg-orange/10 sm:h-12 sm:w-12">
            <span className="font-heading text-sm font-bold text-orange sm:text-base">
              BM
            </span>
          </div>
          <div className="flex flex-1 flex-col justify-end pb-0.5">
            <div className="flex h-8 items-end gap-1 sm:h-10">
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
            <span className="font-mono text-[7px] uppercase tracking-wider text-white/30 sm:text-[8px]">
              Reach
            </span>
            <span className="font-mono text-[7px] text-orange/70 sm:text-[8px]">
              +247%
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-mono text-[7px] uppercase tracking-wider text-white/30 sm:text-[8px]">
              ROAS
            </span>
            <span className="font-mono text-[7px] text-green-400/80 sm:text-[8px]">
              5.2×
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-mono text-[7px] uppercase tracking-wider text-white/30 sm:text-[8px]">
              Leads
            </span>
            <span className="font-mono text-[7px] text-offwhite/60 sm:text-[8px]">
              ↑ Scaling
            </span>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
          <div className="absolute inset-x-0 h-px animate-[scan_3s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-orange/40 to-transparent" />
        </div>
      </div>
    </div>
  );
}

function BrandGrowthGraphic({
  coreRef,
  layerRefs,
  glowRefs,
  activeIndex,
  scrollStep,
}: {
  coreRef: React.RefObject<HTMLDivElement | null>;
  layerRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
  glowRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
  activeIndex: number;
  scrollStep: number;
}) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[460px] overflow-visible">
      <div className="absolute inset-[8%] rounded-full bg-orange/15 blur-[80px]" />

      {brandGrowthLayers.map((layer, i) => {
        const Icon = iconMap[layer.icon] ?? Compass;
        const isActive =
          scrollStep < STEP_COUNT
            ? i === scrollStep
            : i === STEP_COUNT - 1;
        const isPeeled = i < scrollStep;

        return (
          <div
            key={layer.id}
            ref={(el) => {
              layerRefs.current[i] = el;
            }}
            className="brand-growth-layer absolute left-1/2 top-1/2 z-10 will-change-transform"
          >
            <div
              ref={(el) => {
                glowRefs.current[i] = el;
              }}
              className="brand-growth-glow absolute inset-0 rounded-2xl bg-orange/30 blur-xl opacity-0"
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
        className="brand-growth-core absolute left-1/2 top-1/2 z-20 w-[210px] will-change-transform sm:w-[230px]"
      >
        <GrowthEngineCard />
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

function PillarPill({
  layer,
  index,
  pillRef,
  isVisible,
  isActive,
}: {
  layer: (typeof brandGrowthLayers)[0];
  index: number;
  pillRef: (el: HTMLDivElement | null) => void;
  isVisible: boolean;
  isActive: boolean;
}) {
  const Icon = iconMap[layer.icon] ?? Compass;

  return (
    <div
      ref={pillRef}
      className={cn(
        "brand-growth-pill flex items-center gap-2.5 rounded-full border px-3 py-2 transition-colors duration-300 sm:px-4 sm:py-2.5",
        isActive
          ? "border-orange/45 bg-orange/10"
          : "border-white/10 bg-white/[0.03]",
        !isVisible && "pointer-events-none invisible opacity-0"
      )}
      aria-hidden={!isVisible}
    >
      <div
        className={cn(
          "flex h-7 w-7 items-center justify-center rounded-full border sm:h-8 sm:w-8",
          isActive
            ? "border-orange/40 bg-orange/15"
            : "border-white/10 bg-black/40"
        )}
      >
        <Icon className="h-3.5 w-3.5 text-orange" strokeWidth={1.75} />
      </div>
      <div className="min-w-0">
        <p className="font-mono text-[10px] uppercase tracking-wider text-orange/70">
          {String(index + 1).padStart(2, "0")}
        </p>
        <p className="truncate font-heading text-xs font-semibold text-offwhite sm:text-sm">
          {layer.title}
        </p>
      </div>
    </div>
  );
}

function PillarPanel({
  layer,
  index,
  panelRef,
}: {
  layer: (typeof brandGrowthLayers)[0];
  index: number;
  panelRef: (el: HTMLDivElement | null) => void;
}) {
  const Icon = iconMap[layer.icon] ?? Compass;

  return (
    <div
      ref={panelRef}
      className={cn(
        "brand-growth-panel absolute inset-0 flex flex-col justify-center",
        index > 0 && "invisible opacity-0"
      )}
      aria-label={`${layer.title} pillar`}
    >
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-orange/40 bg-orange/10">
          <Icon className="h-5 w-5 text-orange" strokeWidth={1.75} />
        </div>
        <span className="font-heading text-xs font-semibold uppercase tracking-[0.25em] text-orange/80">
          Pillar {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <h3 className="font-heading text-3xl font-bold tracking-tight text-offwhite sm:text-4xl md:text-[2.75rem] md:leading-tight">
        {layer.title}
      </h3>
      <p className="mt-2 font-heading text-base font-medium text-orange/90">
        {layer.subtitle}
      </p>
      <p className="mt-4 max-w-lg text-base leading-relaxed text-offwhite/60 md:text-lg">
        {layer.description}
      </p>
    </div>
  );
}

function MobilePillarBlock({
  layer,
  index,
}: {
  layer: (typeof brandGrowthLayers)[0];
  index: number;
}) {
  const Icon = iconMap[layer.icon] ?? Compass;

  return (
    <article className="border-b border-white/[0.06] py-10 last:border-b-0">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-orange/40 bg-orange/10">
          <Icon className="h-5 w-5 text-orange" strokeWidth={1.75} />
        </div>
        <span className="font-heading text-xs font-semibold uppercase tracking-[0.25em] text-orange/80">
          Pillar {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <h3 className="font-heading text-2xl font-bold tracking-tight text-offwhite sm:text-3xl">
        {layer.title}
      </h3>
      <p className="mt-2 font-heading text-sm font-medium text-orange/90">
        {layer.subtitle}
      </p>
      <p className="mt-3 text-base leading-relaxed text-offwhite/70">
        {layer.description}
      </p>
    </article>
  );
}

function buildStepTimeline(
  stageEl: HTMLElement,
  layers: HTMLDivElement[],
  glows: HTMLDivElement[],
  panels: HTMLDivElement[],
  pills: HTMLDivElement[],
  core: HTMLDivElement,
  onIndexChange: (index: number) => void,
  onStepChange: (step: number) => void
) {
  gsap.set([core, ...layers], {
    xPercent: -50,
    yPercent: -50,
    force3D: true,
  });

  gsap.set(layers, { x: 0, y: 0, scale: 0.72, opacity: 0 });
  gsap.set(layers[0], { opacity: 1, scale: 0.82 });
  gsap.set(glows, { opacity: 0, scale: 0.85 });
  gsap.set(glows[0], { opacity: 0.35, scale: 1 });
  gsap.set(core, { x: 0, y: 0, scale: 1, opacity: 1 });

  gsap.set(panels, { autoAlpha: 0, y: 24 });
  gsap.set(panels[0], { autoAlpha: 1, y: 0 });

  gsap.set(pills, { autoAlpha: 0, scale: 0.92, y: 8 });
  gsap.set(pills[0], { autoAlpha: 1, scale: 1, y: 0 });

  const tl = gsap.timeline({
    defaults: { ease: "power2.inOut" },
    scrollTrigger: {
      id: "brand-growth-layers",
      trigger: stageEl,
      start: "top top+=80",
      end: () => `+=${window.innerHeight * STEP_COUNT}`,
      pin: stageEl,
      pinSpacing: true,
      anticipatePin: 1,
      scrub: 0.45,
      scroller: SCROLLER,
      invalidateOnRefresh: true,
      snap: {
        snapTo: 1 / STEP_COUNT,
        duration: { min: 0.18, max: 0.42 },
        delay: 0.02,
        ease: "power2.inOut",
      },
      onUpdate: (self) => {
        const step = Math.min(
          STEP_COUNT,
          Math.floor(self.progress * STEP_COUNT + 0.001)
        );
        onStepChange(step);

        const idx = Math.min(
          STEP_COUNT - 1,
          Math.max(0, Math.ceil(self.progress * STEP_COUNT) - 1)
        );
        onIndexChange(idx);
      },
    },
  });

  brandGrowthLayers.forEach((_, i) => {
    const offset = LAYER_OFFSETS[i];
    const seg = i;

    tl.addLabel(`step-${i}`, seg);

    tl.to(
      layers[i],
      {
        x: offset.x,
        y: offset.y,
        scale: 1,
        opacity: 0.95,
        duration: 0.72,
        ease: "power2.out",
      },
      seg
    );

    tl.to(
      glows[i],
      { opacity: 0.75, scale: 1.25, duration: 0.4, ease: "power2.out" },
      seg + 0.12
    );

    tl.to(
      core,
      { scale: 1 - (i + 1) * 0.035, duration: 0.72 },
      seg
    );

    if (i === 0) {
      tl.to(
        panels[0],
        { autoAlpha: 0.45, y: -6, duration: 0.35 },
        seg + 0.18
      );
    } else {
      tl.to(
        panels[i - 1],
        { autoAlpha: 0, y: -18, duration: 0.3 },
        seg
      );
      tl.to(
        panels[i],
        { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" },
        seg + 0.12
      );
      tl.to(
        pills[i],
        { autoAlpha: 1, scale: 1, y: 0, duration: 0.4, ease: "power2.out" },
        seg + 0.06
      );
    }

    const next = i + 1;
    if (next < STEP_COUNT) {
      tl.fromTo(
        layers[next],
        { x: -130, y: 0, scale: 0.68, opacity: 0 },
        {
          x: 0,
          y: 0,
          scale: 0.82,
          opacity: 1,
          duration: 0.55,
          ease: "power2.out",
        },
        seg + 0.52
      );

      tl.to(
        glows[next],
        { opacity: 0.35, scale: 1, duration: 0.3 },
        seg + 0.62
      );
    }
  });

  tl.to({}, { duration: 0.01 }, STEP_COUNT);

  return tl;
}

export function BrandGrowthSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const glowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pillRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activeIndexRef = useRef(0);
  const scrollStepRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollStep, setScrollStep] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  const handleIndexChange = useCallback((index: number) => {
    if (index !== activeIndexRef.current) {
      activeIndexRef.current = index;
      setActiveIndex(index);
    }
  }, []);

  const handleStepChange = useCallback((step: number) => {
    if (step !== scrollStepRef.current) {
      scrollStepRef.current = step;
      setScrollStep(step);
    }
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useLayoutEffect(() => {
    if (!isDesktop) return;

    const stageEl = stageRef.current;
    const core = coreRef.current;
    if (!stageEl || !core) return;

    let ctx: gsap.Context | undefined;
    let mounted = true;

    const setup = () => {
      if (!mounted || !isLenisReady()) return;

      ctx?.revert();

      const layers = layerRefs.current.filter(Boolean) as HTMLDivElement[];
      const glows = glowRefs.current.filter(Boolean) as HTMLDivElement[];
      const panels = panelRefs.current.filter(Boolean) as HTMLDivElement[];
      const pills = pillRefs.current.filter(Boolean) as HTMLDivElement[];

      if (
        layers.length !== STEP_COUNT ||
        panels.length !== STEP_COUNT ||
        pills.length !== STEP_COUNT
      ) {
        return;
      }

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      ctx = gsap.context(() => {
        ScrollTrigger.getById("brand-growth-layers")?.kill();

        if (reduceMotion) {
          gsap.set([core, ...layers], {
            xPercent: -50,
            yPercent: -50,
            force3D: true,
          });

          layers.forEach((layer, i) => {
            const offset = LAYER_OFFSETS[i];
            gsap.set(layer, {
              x: offset.x,
              y: offset.y,
              scale: 0.9,
              opacity: 0.55,
            });
            gsap.set(glows[i], { opacity: 0.55, scale: 1.15 });
          });

          gsap.set(core, { x: 0, y: 0, scale: 0.89, opacity: 1 });
          gsap.set(panels, { autoAlpha: 1, y: 0 });
          gsap.set(pills, { autoAlpha: 1, scale: 1, y: 0 });
          handleIndexChange(STEP_COUNT - 1);
          handleStepChange(STEP_COUNT);
          return;
        }

        buildStepTimeline(
          stageEl,
          layers,
          glows,
          panels,
          pills,
          core,
          handleIndexChange,
          handleStepChange
        );
      }, sectionRef);

      ScrollTrigger.refresh();
    };

    const runSetup = () => {
      requestAnimationFrame(() => {
        requestAnimationFrame(setup);
      });
    };

    runSetup();
    window.addEventListener(LENIS_READY_EVENT, runSetup);

    const loadRefreshTimer = window.setTimeout(() => {
      if (mounted && isLenisReady()) {
        ScrollTrigger.refresh();
      }
    }, 2600);

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(runSetup, 200);
    };
    window.addEventListener("resize", onResize);

    return () => {
      mounted = false;
      window.clearTimeout(loadRefreshTimer);
      clearTimeout(resizeTimer);
      window.removeEventListener(LENIS_READY_EVENT, runSetup);
      window.removeEventListener("resize", onResize);
      ctx?.revert();
    };
  }, [handleIndexChange, handleStepChange, isDesktop]);

  return (
    <section
      ref={sectionRef}
      className="relative"
      aria-label="Brand growth pillars"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-15" />
        <div className="absolute -left-40 top-1/4 h-[500px] w-[500px] rounded-full bg-orange/5 blur-[120px]" />
      </div>

      <div className="container-custom relative section-padding pb-0">
        <SectionHeading
          label="How We Grow Brands"
          title="Four Layers of Growth"
          description="Four pillars power our full-stack growth engine — from strategy and creative to performance and automation."
          align="center"
        />
      </div>

      {/* Desktop — pinned step scroll */}
      <div
        ref={stageRef}
        className="relative hidden min-h-[calc(100svh-5rem)] lg:block"
      >
        <div className="container-custom flex h-[calc(100svh-5rem)] items-center gap-10 xl:gap-16">
          <div className="flex w-1/2 flex-col justify-center py-8">
            <div className="mb-6 flex items-center justify-between gap-4">
              <p className="font-heading text-xs font-semibold uppercase tracking-[0.25em] text-orange/80">
                Growth Pillars
              </p>
              <p className="font-mono text-xs text-offwhite/40">
                {String(activeIndex + 1).padStart(2, "0")} /{" "}
                {String(STEP_COUNT).padStart(2, "0")}
              </p>
            </div>

            <div className="mb-8 flex flex-col gap-2.5">
              {brandGrowthLayers.map((layer, i) => (
                <PillarPill
                  key={layer.id}
                  layer={layer}
                  index={i}
                  isVisible={i <= activeIndex}
                  isActive={i === activeIndex}
                  pillRef={(el) => {
                    pillRefs.current[i] = el;
                  }}
                />
              ))}
            </div>

            <div className="relative min-h-[320px] sm:min-h-[360px]">
              {brandGrowthLayers.map((layer, i) => (
                <PillarPanel
                  key={layer.id}
                  layer={layer}
                  index={i}
                  panelRef={(el) => {
                    panelRefs.current[i] = el;
                  }}
                />
              ))}
            </div>

            <p className="mt-8 font-mono text-[11px] uppercase tracking-wider text-offwhite/30">
              Scroll to attach each pillar to the engine
            </p>
          </div>

          <div className="flex w-1/2 items-center justify-center">
            <BrandGrowthGraphic
              coreRef={coreRef}
              layerRefs={layerRefs}
              glowRefs={glowRefs}
              activeIndex={activeIndex}
              scrollStep={scrollStep}
            />
          </div>
        </div>
      </div>

      {/* Mobile — static stack */}
      <div className="container-custom relative pb-12 lg:hidden">
        {brandGrowthLayers.map((layer, i) => (
          <MobilePillarBlock key={layer.id} layer={layer} index={i} />
        ))}

        <div className="mt-10">
          <p className="mb-4 text-center font-heading text-xs font-semibold uppercase tracking-[0.25em] text-orange/80">
            The Engine Behind It All
          </p>
          <GrowthEngineCard className="mx-auto max-w-md" />
        </div>
      </div>
    </section>
  );
}
