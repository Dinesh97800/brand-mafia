"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check } from "lucide-react";
import { processSteps } from "@/data/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LocalImage } from "@/components/ui/LocalImage";
import { LENIS_READY_EVENT, isLenisReady } from "@/components/providers/SmoothScroll";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

type Point = { x: number; y: number };

const MOBILE_BREAKPOINT = 768;
const TOTAL_STEPS = processSteps.length;
const IDLE_BOB_AMPLITUDE = 3.2;
const IDLE_BOB_PERIOD_MS = 2100;
const CONTRAIL_LENGTH = 86;
const BASE_LIFT_PX = 14;
const PLANE_WIDTH_PX = 88;
const PLANE_HEIGHT_PX = 88;
/** paper-plane.png nose points up-right; offset so the nose follows the path. */
const PNG_NOSE_DEG = -40;
const PLANE_SCRUB = 1.35;
const ANGLE_LERP = 0.16;

function perpUp(rad: number) {
  return { x: Math.sin(rad), y: -Math.cos(rad) };
}

function buildCurvedPath(points: Point[]): string {
  if (points.length < 2) return "";

  let d = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;

  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const midY = (prev.y + curr.y) / 2;
    d += ` C ${prev.x.toFixed(1)} ${midY.toFixed(1)}, ${curr.x.toFixed(1)} ${midY.toFixed(1)}, ${curr.x.toFixed(1)} ${curr.y.toFixed(1)}`;
  }

  return d;
}

function buildVerticalPath(points: Point[]): string {
  if (points.length < 2) return "";

  let d = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;
  for (let i = 1; i < points.length; i++) {
    d += ` L ${points[i].x.toFixed(1)} ${points[i].y.toFixed(1)}`;
  }
  return d;
}

function getSegmentAltitude(globalT: number, segmentCount: number): number {
  const clamped = Math.max(0, Math.min(1, globalT));
  const scaled = clamped * segmentCount;
  const segmentProgress = scaled - Math.floor(Math.min(segmentCount - 1, scaled));
  return Math.sin(segmentProgress * Math.PI);
}

function getPathGeometry(path: SVGPathElement, t: number) {
  const len = path.getTotalLength();
  const at = Math.max(0, Math.min(1, t)) * len;
  const pt = path.getPointAtLength(at);
  const sample = 3;
  const ptBefore = path.getPointAtLength(Math.max(0, at - sample));
  const ptAfter = path.getPointAtLength(Math.min(len, at + sample));
  const angle =
    (Math.atan2(ptAfter.y - ptBefore.y, ptAfter.x - ptBefore.x) * 180) / Math.PI;
  const angleBefore = Math.atan2(pt.y - ptBefore.y, pt.x - ptBefore.x);
  const angleAfter = Math.atan2(ptAfter.y - pt.y, ptAfter.x - pt.x);
  const curvature = angleAfter - angleBefore;
  const bank = Math.max(-18, Math.min(18, ((curvature * 180) / Math.PI) * 4.2));

  return { x: pt.x, y: pt.y, angle, bank };
}

function lerpAngle(current: number, target: number, t: number) {
  let diff = target - current;
  while (diff > 180) diff -= 360;
  while (diff < -180) diff += 360;
  return current + diff * t;
}

function ProcessCard({
  step,
  index,
  cardRef,
  activeIndex,
  isLeft,
}: {
  step: (typeof processSteps)[0];
  index: number;
  cardRef: (el: HTMLDivElement | null) => void;
  activeIndex: number;
  isLeft: boolean;
}) {
  const isActive = activeIndex === index;
  const isComplete = activeIndex > index;

  return (
    <div
      ref={cardRef}
      className={cn(
        "relative w-full pl-10 sm:pl-12 md:w-[58%] md:pl-0 lg:w-[50%]",
        isLeft ? "md:mr-auto" : "md:ml-auto"
      )}
    >
      <div
        className={cn(
          "group relative rounded-2xl transition-colors duration-300",
          isActive
            ? "bg-gradient-to-br from-orange via-amber-400/90 to-orange p-[1px] shadow-[0_0_48px_rgba(240,87,7,0.22)]"
            : "p-[1px] hover:bg-gradient-to-br hover:from-white/10 hover:to-white/[0.04]"
        )}
      >
        <div
          className={cn(
            "process-card-animate relative rounded-[15px] bg-[#080808]/95 backdrop-blur-sm",
            "p-4 sm:p-6 md:p-8",
            !isActive &&
              "border border-white/[0.08] group-hover:border-white/[0.14] group-hover:bg-white/[0.04]",
            isActive && "process-card-active",
            isComplete && !isActive && "border border-white/[0.06]"
          )}
        >
          <div
            className={cn(
              "mb-5 flex items-start gap-4 sm:mb-6",
              !isLeft && "md:flex-row-reverse md:text-right"
            )}
          >
            <div
              className={cn(
                "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 bg-black transition-all duration-500 sm:h-11 sm:w-11",
                isActive &&
                  "border-transparent bg-gradient-to-br from-orange to-amber-400 shadow-[0_0_20px_rgba(240,87,7,0.4)]",
                isComplete && !isActive && "border-amber-400/40 bg-amber-400/10",
                !isActive && !isComplete && "border-white/20 group-hover:border-white/30"
              )}
            >
              {isComplete ? (
                <Check className="h-4 w-4 text-amber-400" strokeWidth={2.5} aria-hidden="true" />
              ) : (
                <span
                  className={cn(
                    "font-heading text-[11px] font-bold sm:text-xs",
                    isActive ? "text-black" : "text-offwhite/60"
                  )}
                >
                  {step.step}
                </span>
              )}
            </div>

            {isActive && (
              <span
                className={cn(
                  "pt-1 font-heading text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-400/90 sm:text-xs",
                  !isLeft && "md:text-right"
                )}
              >
                Current step
              </span>
            )}
            {isComplete && !isActive && (
              <span
                className={cn(
                  "pt-1 font-heading text-[10px] font-semibold uppercase tracking-[0.2em] text-offwhite/45 sm:text-xs",
                  !isLeft && "md:text-right"
                )}
              >
                Complete
              </span>
            )}
          </div>

          <h3
            className={cn(
              "font-heading text-lg font-semibold leading-snug transition-colors duration-500 sm:text-xl md:text-2xl lg:text-3xl",
              !isLeft && "md:text-right",
              isActive ? "text-offwhite" : "text-offwhite/75"
            )}
          >
            {step.title}
          </h3>
          <p
            className={cn(
              "mt-4 max-w-lg text-sm leading-relaxed sm:mt-5 sm:text-base",
              !isLeft && "md:ml-auto md:text-right",
              isActive ? "text-offwhite/72" : "text-offwhite/62"
            )}
          >
            {step.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const planeRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const routeBgRef = useRef<SVGPathElement>(null);
  const routeProgressRef = useRef<SVGPathElement>(null);
  const contrailRef = useRef<SVGPathElement>(null);
  const destRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  const animRef = useRef({
    targetProgress: 0,
    currentProgress: 0,
    pathLength: 0,
    segmentCount: 1,
    isMobile: false,
    rafId: 0,
    startTime: 0,
    smoothedAngle: 0,
    angleReady: false,
  });

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const applyMotionPreference = () => setReducedMotion(motionQuery.matches);
    applyMotionPreference();
    motionQuery.addEventListener("change", applyMotionPreference);
    return () => motionQuery.removeEventListener("change", applyMotionPreference);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    let ctx: gsap.Context | undefined;
    let cancelRaf = false;

    const applyPlaneTransform = (
      progress: number,
      timeMs: number,
      options: {
        isMobile: boolean;
        reduced: boolean;
        enableBob: boolean;
      }
    ) => {
      const plane = planeRef.current;
      const shadow = shadowRef.current;
      const path = routeBgRef.current;
      const contrail = contrailRef.current;
      const routeProgress = routeProgressRef.current;
      const { pathLength, segmentCount } = animRef.current;

      if (!plane || !shadow || !path || !routeProgress || pathLength <= 0) return;

      const { x, y, angle, bank } = getPathGeometry(path, progress);
      const rad = (angle * Math.PI) / 180;
      const up = perpUp(rad);

      let altitude = getSegmentAltitude(progress, segmentCount);
      if (options.isMobile) altitude *= 0.35;

      const landing = Math.max(0, Math.min(1, (progress - 0.9) / 0.1));
      const liftAmount = options.reduced
        ? 8
        : (BASE_LIFT_PX + altitude * 9) * (1 - landing * 0.72);

      const bob =
        options.enableBob && !options.reduced
          ? Math.sin((timeMs / IDLE_BOB_PERIOD_MS) * Math.PI * 2) *
              IDLE_BOB_AMPLITUDE *
              (1 - landing) +
            Math.sin(timeMs / 160) * 1.15 * (1 - landing)
          : 0;

      const planeX = x + up.x * (liftAmount + bob);
      const planeY = y + up.y * (liftAmount + bob);

      const shadowDrift = options.reduced ? 0 : altitude * (options.isMobile ? 2 : 6);
      const shadowX = x + up.x * shadowDrift * 0.25;
      const shadowY = y + up.y * shadowDrift * 0.25;

      const shadowBlur = (options.isMobile ? 2.5 : 3.5) + altitude * (options.isMobile ? 2 : 4);
      const shadowOpacity = options.reduced
        ? 0.3
        : 0.4 - altitude * 0.16;
      const shadowW = PLANE_WIDTH_PX * 0.58 * (1.08 - altitude * 0.18);
      const shadowH = PLANE_HEIGHT_PX * 0.22 * (1.05 - altitude * 0.12);

      shadow.style.transform = `translate3d(${shadowX - shadowW / 2}px, ${shadowY - shadowH / 2}px, 0)`;
      shadow.style.width = `${shadowW}px`;
      shadow.style.height = `${shadowH}px`;
      shadow.style.opacity = String(Math.max(0.22, Math.min(0.42, shadowOpacity)));
      shadow.style.filter = `blur(${shadowBlur}px)`;

      const wobble = options.reduced
        ? 0
        : Math.sin(timeMs / 190) * 3.4 * (1 - landing) +
          Math.sin(timeMs / 310) * 1.8 * (1 - landing);
      const flare = landing * 8;
      const targetAngle = angle + bank + wobble + flare - PNG_NOSE_DEG;
      const state = animRef.current;
      if (!state.angleReady) {
        state.smoothedAngle = targetAngle;
        state.angleReady = true;
      } else {
        state.smoothedAngle = lerpAngle(
          state.smoothedAngle,
          targetAngle,
          options.reduced ? 1 : ANGLE_LERP
        );
      }

      const thrust =
        options.reduced || landing > 0.6
          ? 1
          : 1 + Math.sin(timeMs / 210) * 0.035 + altitude * 0.05;

      plane.style.transform = `translate3d(${planeX}px, ${planeY}px, 0) translate(-50%, -50%) rotate(${state.smoothedAngle}deg) scale(${thrust})`;

      if (contrail && !options.reduced) {
        const at = progress * pathLength;
        const start = Math.max(0, at - CONTRAIL_LENGTH * (0.7 + altitude * 0.5));
        const parts: string[] = [];
        for (let i = start; i <= at; i += 2) {
          const p = path.getPointAtLength(i);
          parts.push(`${parts.length === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`);
        }
        contrail.setAttribute("d", parts.length > 1 ? parts.join(" ") : "");
        contrail.style.opacity = String((0.22 + altitude * 0.18) * (1 - landing * 0.5));
      } else if (contrail) {
        contrail.setAttribute("d", "");
      }

      routeProgress.style.strokeDashoffset = String(pathLength * (1 - progress));
    };

    const tick = (now: number) => {
      if (cancelRaf) return;

      const state = animRef.current;
      if (!state.startTime) state.startTime = now;

      applyPlaneTransform(state.currentProgress, now - state.startTime, {
        isMobile: state.isMobile,
        reduced: reducedMotion,
        enableBob: true,
      });

      state.rafId = requestAnimationFrame(tick);
    };

    const cardProgress = (index: number, segmentCount: number) =>
      index >= TOTAL_STEPS - 1 ? 1 : Math.min(1, (index + 1) / segmentCount);

    const build = () => {
      ctx?.revert();
      cancelAnimationFrame(animRef.current.rafId);

      const plane = planeRef.current;
      const shadow = shadowRef.current;
      const routeBg = routeBgRef.current;
      const routeProgress = routeProgressRef.current;
      const dest = destRef.current;
      const steps = stepRefs.current.filter(Boolean) as HTMLDivElement[];

      if (!plane || !shadow || !routeBg || !routeProgress || !dest || steps.length === 0) {
        return;
      }

      ctx = gsap.context(() => {
        const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
        const containerRect = track.getBoundingClientRect();
        const offsetAbove = isMobile ? 28 : 48;
        const offsetBelow = isMobile ? 56 : 88;

        const xForSide = (rect: DOMRect, isLeft: boolean, mobileLeftRail: number) => {
          if (isMobile) return mobileLeftRail;
          const ratio = isLeft ? 0.2 : 0.8;
          return rect.left - containerRect.left + rect.width * ratio;
        };

        const mobileRailX = isMobile ? 20 : 0;

        const firstRect = steps[0].getBoundingClientRect();
        const lastRect = steps[steps.length - 1].getBoundingClientRect();

        const anchors: Point[] = [
          {
            x: xForSide(firstRect, true, mobileRailX),
            y: firstRect.top - containerRect.top - offsetAbove,
          },
          ...steps.map((step, i) => {
            const rect = step.getBoundingClientRect();
            return {
              x: xForSide(rect, i % 2 === 0, mobileRailX),
              y: rect.top - containerRect.top + rect.height / 2,
            };
          }),
          {
            x: xForSide(lastRect, (steps.length - 1) % 2 === 0, mobileRailX),
            y: lastRect.bottom - containerRect.top + offsetBelow,
          },
        ];

        const pathD = isMobile ? buildVerticalPath(anchors) : buildCurvedPath(anchors);
        routeBg.setAttribute("d", pathD);
        routeProgress.setAttribute("d", pathD);

        const pathLength = routeProgress.getTotalLength();
        const segmentCount = Math.max(1, anchors.length - 1);
        const lastCardT = steps.length / segmentCount;

        animRef.current.pathLength = pathLength;
        animRef.current.segmentCount = segmentCount;
        animRef.current.isMobile = isMobile;

        gsap.set(routeProgress, {
          strokeDasharray: pathLength,
          strokeDashoffset: reducedMotion ? 0 : pathLength,
        });

        const endAnchor = anchors[anchors.length - 1];
        gsap.set(dest, {
          left: endAnchor.x,
          top: endAnchor.y,
          xPercent: -50,
          yPercent: -50,
          opacity: 0.9,
        });

        animRef.current.angleReady = false;

        const snapToCard = (index: number) => {
          const p = cardProgress(index, segmentCount);
          animRef.current.targetProgress = p;
          animRef.current.currentProgress = p;
          applyPlaneTransform(p, 0, {
            isMobile,
            reduced: true,
            enableBob: false,
          });
        };

        if (reducedMotion) {
          snapToCard(activeIndexRef.current);

          steps.forEach((step, i) => {
            ScrollTrigger.create({
              trigger: step,
              start: "top 72%",
              end: "bottom 28%",
              onEnter: () => {
                setActiveIndex(i);
                snapToCard(i);
              },
              onEnterBack: () => {
                setActiveIndex(i);
                snapToCard(i);
              },
            });
          });
          return;
        }

        plane.style.opacity = "1";

        const proxy = { t: 0 };
        const lastStep = steps[steps.length - 1];
        const split = (steps.length - 1) / steps.length;

        gsap.to(proxy, {
          t: 1,
          ease: "none",
          scrollTrigger: {
            id: "process-plane",
            trigger: steps[0],
            endTrigger: lastStep,
            start: isMobile ? "top 78%" : "top 62%",
            end: isMobile ? "center 48%" : "center 42%",
            scrub: PLANE_SCRUB,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const p = self.progress;
              const mapped =
                p < split
                  ? (p / split) * lastCardT
                  : lastCardT + ((p - split) / (1 - split)) * (1 - lastCardT);

              animRef.current.currentProgress = mapped;

              const idx = Math.min(
                steps.length - 1,
                Math.floor(p * steps.length)
              );
              setActiveIndex((prev) => (prev === idx ? prev : idx));
            },
          },
        });

        animRef.current.startTime = 0;
        cancelRaf = false;
        animRef.current.rafId = requestAnimationFrame(tick);
      }, section);
    };

    const scheduleBuild = () => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          build();
          ScrollTrigger.refresh();
        });
      });
    };

    if (isLenisReady()) scheduleBuild();
    window.addEventListener(LENIS_READY_EVENT, scheduleBuild);
    const fallbackTimer = window.setTimeout(scheduleBuild, 480);

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(scheduleBuild, 160);
    };

    window.addEventListener("resize", onResize);

    return () => {
      cancelRaf = true;
      cancelAnimationFrame(animRef.current.rafId);
      window.clearTimeout(fallbackTimer);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      window.removeEventListener(LENIS_READY_EVENT, scheduleBuild);
      ctx?.revert();
    };
  }, [reducedMotion]);

  const stepLabel = `Step ${String(activeIndex + 1).padStart(2, "0")} of ${String(TOTAL_STEPS).padStart(2, "0")}`;

  return (
    <section
      id="process"
      ref={sectionRef}
      className="section-padding relative overflow-hidden pt-12 md:pt-16 lg:pt-20"
      aria-label="Our process journey"
    >
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
      <div className="absolute right-0 top-1/3 h-[400px] w-[400px] rounded-full bg-orange/5 blur-[120px] pointer-events-none" />

      <div className="container-custom relative">
        <SectionHeading
          label="Our Process"
          title="From Discovery to Dominance"
          description="A proven framework that transforms brands into market leaders."
          align="center"
        />

        <p
          className="mx-auto -mt-6 mb-2 max-w-md text-center font-heading text-xs font-semibold uppercase tracking-[0.25em] text-amber-400/80 sm:-mt-8 sm:text-sm"
          aria-live="polite"
          aria-atomic="true"
        >
          {stepLabel}
        </p>

        <div ref={trackRef} className="relative mx-auto mt-10 max-w-5xl sm:mt-14">
          {/* Layer 1: dim path (behind everything) */}
          <svg
            className="pointer-events-none absolute inset-0 z-[1] h-full w-full overflow-visible"
            aria-hidden="true"
          >
            <path
              ref={routeBgRef}
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth={2}
              strokeLinecap="round"
              className="md:stroke-[2.5]"
            />
          </svg>

          {/* Layer 2: ground shadow — on the path, under the glow line */}
          <div
            ref={shadowRef}
            className="process-journey-shadow pointer-events-none absolute left-0 top-0 z-[2] rounded-[50%]"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.22) 45%, rgba(0,0,0,0) 72%)",
              willChange: "transform, opacity, filter",
            }}
            aria-hidden="true"
          />

          {/* Layer 3: glowing progress path + contrail */}
          <svg
            className="pointer-events-none absolute inset-0 z-[3] h-full w-full overflow-visible"
            aria-hidden="true"
          >
            <defs>
              <linearGradient
                id="process-route-gradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#F05707" />
                <stop offset="55%" stopColor="#FB923C" />
                <stop offset="100%" stopColor="#FBBF24" />
              </linearGradient>
            </defs>
            <path
              ref={routeProgressRef}
              fill="none"
              stroke="url(#process-route-gradient)"
              strokeWidth={2.5}
              strokeLinecap="round"
              className="drop-shadow-[0_0_10px_rgba(240,87,7,0.45)] md:stroke-[3]"
            />
            <path
              ref={contrailRef}
              fill="none"
              stroke="rgba(251,191,36,0.55)"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeDasharray="3 7"
            />
          </svg>

          {/* Layer 4: paper plane — above the path */}
          <div
            ref={planeRef}
            className="process-journey-plane pointer-events-none absolute left-0 top-0 z-[4]"
            style={{ willChange: "transform" }}
            aria-hidden="true"
          >
            <LocalImage
              src="/images/paper-plane.png"
              alt=""
              width={88}
              height={88}
              className="h-[72px] w-[72px] object-contain drop-shadow-[0_4px_10px_rgba(240,87,7,0.35)] sm:h-[88px] sm:w-[88px]"
              priority
            />
          </div>

          <div
            ref={destRef}
            className="pointer-events-none absolute z-10 flex flex-col items-center gap-1"
            aria-hidden="true"
          >
            <div className="h-3 w-3 rounded-full border-2 border-amber-400 bg-orange/50 shadow-[0_0_14px_rgba(251,191,36,0.65)] sm:h-3.5 sm:w-3.5" />
            <span className="font-heading text-[8px] font-semibold uppercase tracking-wider text-amber-400/80 sm:text-[9px]">
              Destination
            </span>
          </div>

          <div className="relative z-10 flex flex-col gap-8 pb-24 pt-4 sm:gap-12 sm:pb-28 sm:pt-6 md:gap-20 lg:gap-24">
            {processSteps.map((step, i) => (
              <ProcessCard
                key={step.step}
                step={step}
                index={i}
                activeIndex={activeIndex}
                isLeft={i % 2 === 0}
                cardRef={(el) => {
                  stepRefs.current[i] = el;
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
