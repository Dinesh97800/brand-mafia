"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { processSteps } from "@/data/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

type Point = { x: number; y: number };

function buildFlightPath(points: Point[]): string {
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

function PaperPlane({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M21.5 2.5L2.5 10.5L9.5 13.5L11.5 21.5L14.5 15.5L21.5 2.5Z"
        fill="currentColor"
        fillOpacity="0.15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M9.5 13.5L21.5 2.5L14.5 15.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const planeRef = useRef<HTMLDivElement>(null);
  const routeBgRef = useRef<SVGPathElement>(null);
  const routeProgressRef = useRef<SVGPathElement>(null);
  const destRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    let ctx: gsap.Context | undefined;

    const build = () => {
      ctx?.revert();

      const plane = planeRef.current;
      const routeBg = routeBgRef.current;
      const routeProgress = routeProgressRef.current;
      const dest = destRef.current;
      const steps = stepRefs.current.filter(Boolean) as HTMLDivElement[];

      if (!plane || !routeBg || !routeProgress || !dest || steps.length === 0) {
        return;
      }

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      ctx = gsap.context(() => {
        const containerRect = track.getBoundingClientRect();
        const isMobile = window.innerWidth < 640;
        const offsetAbove = isMobile ? 36 : 52;
        const offsetBelow = isMobile ? 36 : 52;

        const xForSide = (rect: DOMRect, isLeft: boolean) => {
          const ratio = isMobile ? (isLeft ? 0.16 : 0.84) : isLeft ? 0.2 : 0.8;
          return rect.left - containerRect.left + rect.width * ratio;
        };

        const firstRect = steps[0].getBoundingClientRect();
        const lastRect = steps[steps.length - 1].getBoundingClientRect();

        const anchors: Point[] = [
          {
            x: xForSide(firstRect, true),
            y: firstRect.top - containerRect.top - offsetAbove,
          },
          ...steps.map((step, i) => {
            const rect = step.getBoundingClientRect();
            return {
              x: xForSide(rect, i % 2 === 0),
              y: rect.top - containerRect.top + rect.height / 2,
            };
          }),
          {
            x: xForSide(lastRect, true),
            y: lastRect.bottom - containerRect.top + offsetBelow,
          },
        ];

        const pathD = buildFlightPath(anchors);
        routeBg.setAttribute("d", pathD);
        routeProgress.setAttribute("d", pathD);

        const endAnchor = anchors[anchors.length - 1];
        gsap.set(dest, {
          left: endAnchor.x,
          top: endAnchor.y,
          xPercent: -50,
          yPercent: -50,
        });

        const pathLength = routeProgress.getTotalLength();
        gsap.set(routeProgress, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
        });

        gsap.set(plane, { xPercent: -50, yPercent: -50, force3D: true });

        if (prefersReducedMotion) {
          gsap.set(routeProgress, { strokeDashoffset: 0 });
          const endPoint = routeProgress.getPointAtLength(pathLength);
          gsap.set(plane, {
            x: endPoint.x,
            y: endPoint.y,
            xPercent: -50,
            yPercent: -50,
          });
          setActiveIndex(steps.length - 1);
          return;
        }

        const scrollTriggerBase = {
          trigger: track,
          start: "top 58%",
          end: "bottom 42%",
          scrub: 0.75,
          invalidateOnRefresh: true,
        };

        gsap.to(plane, {
          motionPath: {
            path: routeBg,
            align: routeBg,
            alignOrigin: [0.5, 0.5],
            autoRotate: true,
          },
          ease: "none",
          scrollTrigger: {
            ...scrollTriggerBase,
            onUpdate: (self: ScrollTrigger) => {
              const idx = Math.min(
                steps.length - 1,
                Math.max(0, Math.floor(self.progress * steps.length))
              );
              setActiveIndex((prev) => (prev === idx ? prev : idx));
            },
          },
        });

        gsap.to(routeProgress, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: scrollTriggerBase,
        });

        steps.forEach((step) => {
          gsap.fromTo(
            step,
            { opacity: 0.4, y: 24 },
            {
              opacity: 1,
              y: 0,
              ease: "none",
              scrollTrigger: {
                trigger: step,
                start: "top 85%",
                end: "top 55%",
                scrub: 0.5,
              },
            }
          );
        });
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

    scheduleBuild();

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(scheduleBuild, 160);
    };

    window.addEventListener("resize", onResize);

    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      ctx?.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
      aria-label="Our process"
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

        <div ref={trackRef} className="relative mx-auto mt-12 max-w-5xl sm:mt-16">
          <svg
            className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-visible"
            aria-hidden="true"
          >
            <path
              ref={routeBgRef}
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth={2.5}
              strokeLinecap="round"
            />
            <path
              ref={routeProgressRef}
              fill="none"
              stroke="#F05707"
              strokeWidth={3}
              strokeLinecap="round"
              className="drop-shadow-[0_0_8px_rgba(240,87,7,0.55)]"
            />
          </svg>

          <div
            ref={planeRef}
            className="absolute left-0 top-0 z-20 will-change-transform"
          >
            <div className="relative">
              <div className="absolute -inset-4 rounded-full bg-orange/25 blur-lg" />
              <div className="relative flex h-9 w-9 items-center justify-center rounded-full border-2 border-orange bg-black shadow-[0_0_20px_rgba(240,87,7,0.5)] sm:h-11 sm:w-11">
                <PaperPlane className="h-4 w-4 text-orange sm:h-5 sm:w-5" />
              </div>
            </div>
          </div>

          <div
            ref={destRef}
            className="pointer-events-none absolute z-10 flex flex-col items-center gap-1"
            aria-hidden="true"
          >
            <div className="h-3 w-3 rounded-full border-2 border-orange bg-orange/40 shadow-[0_0_14px_rgba(240,87,7,0.75)] sm:h-3.5 sm:w-3.5" />
            <span className="font-heading text-[8px] font-semibold uppercase tracking-wider text-orange/70 sm:text-[9px]">
              Destination
            </span>
          </div>

          <div className="relative z-10 flex flex-col gap-10 pb-12 pt-6 sm:gap-14 sm:pb-16 sm:pt-8 md:gap-20 lg:gap-24">
            {processSteps.map((step, i) => {
              const isLeft = i % 2 === 0;

              return (
                <div
                  key={step.step}
                  ref={(el) => {
                    stepRefs.current[i] = el;
                  }}
                  className={cn(
                    "relative w-[94%] sm:w-[84%] md:w-[58%] lg:w-[50%]",
                    isLeft ? "mr-auto" : "ml-auto"
                  )}
                >
                  <div
                    className={cn(
                      "glass rounded-2xl border p-5 transition-[border-color,box-shadow,background-color] duration-500 sm:p-6 md:p-8",
                      activeIndex === i
                        ? "border-orange/35 bg-orange/[0.06] shadow-[0_0_40px_rgba(240,87,7,0.12)]"
                        : "border-white/[0.08]"
                    )}
                  >
                    <div
                      className={cn(
                        "mb-4 flex items-center gap-3",
                        !isLeft && "md:flex-row-reverse"
                      )}
                    >
                      <div
                        className={cn(
                          "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 bg-black transition-colors duration-500 sm:h-12 sm:w-12",
                          activeIndex === i
                            ? "border-orange shadow-[0_0_16px_rgba(240,87,7,0.45)]"
                            : "border-white/15"
                        )}
                      >
                        <span
                          className={cn(
                            "font-heading text-xs font-bold sm:text-sm",
                            activeIndex === i ? "text-orange" : "text-offwhite/40"
                          )}
                        >
                          {step.step}
                        </span>
                      </div>
                      {activeIndex === i && (
                        <span
                          className={cn(
                            "font-heading text-[10px] font-semibold uppercase tracking-[0.2em] text-orange/80 sm:text-xs",
                            !isLeft && "md:text-right"
                          )}
                        >
                          Flying through
                        </span>
                      )}
                    </div>

                    <h3
                      className={cn(
                        "font-heading text-xl font-semibold transition-colors duration-500 sm:text-2xl md:text-3xl",
                        !isLeft && "md:text-right",
                        activeIndex === i ? "text-offwhite" : "text-offwhite/55"
                      )}
                    >
                      {step.title}
                    </h3>
                    <p
                      className={cn(
                        "mt-3 text-sm leading-relaxed text-offwhite/50 sm:text-base",
                        !isLeft && "md:text-right"
                      )}
                    >
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
