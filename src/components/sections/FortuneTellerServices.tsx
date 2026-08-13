"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { fortuneTellerPhases } from "@/data/fortuneTellerServices";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import styles from "./FortuneTellerServices.module.css";

type FoldAxis = "x" | "y";

type FortuneState = {
  phase: 1 | 2 | 3;
  fold: number;
  foldAxis: FoldAxis;
  labelOpacity: number;
  showCta: boolean;
  tellerRotateZ: number;
  tellerExpand: number;
  isTransitioning: boolean;
};

type PetalCorner = "tl" | "tr" | "bl" | "br";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function deriveFortuneState(progress: number): FortuneState {
  const p = clamp(progress, 0, 1);

  if (p < 0.26) {
    return {
      phase: 1,
      fold: 0,
      foldAxis: "x",
      labelOpacity: 1,
      showCta: false,
      tellerRotateZ: -32,
      tellerExpand: 1,
      isTransitioning: false,
    };
  }

  if (p < 0.36) {
    const t = easeInOutCubic((p - 0.26) / 0.1);
    return {
      phase: 1,
      fold: t,
      foldAxis: "x",
      labelOpacity: 1 - t,
      showCta: false,
      tellerRotateZ: -32,
      tellerExpand: 1 - t * 0.04,
      isTransitioning: true,
    };
  }

  if (p < 0.4) {
    return {
      phase: 2,
      fold: 1,
      foldAxis: "x",
      labelOpacity: 0,
      showCta: false,
      tellerRotateZ: -32,
      tellerExpand: 0.94,
      isTransitioning: true,
    };
  }

  if (p < 0.5) {
    const t = easeInOutCubic((p - 0.4) / 0.1);
    return {
      phase: 2,
      fold: 1 - t,
      foldAxis: "y",
      labelOpacity: t,
      showCta: false,
      tellerRotateZ: -32 + t * 64,
      tellerExpand: 0.94 + t * 0.06,
      isTransitioning: true,
    };
  }

  if (p < 0.66) {
    return {
      phase: 2,
      fold: 0,
      foldAxis: "y",
      labelOpacity: 1,
      showCta: false,
      tellerRotateZ: 32,
      tellerExpand: 1,
      isTransitioning: false,
    };
  }

  if (p < 0.76) {
    const t = easeInOutCubic((p - 0.66) / 0.1);
    return {
      phase: 2,
      fold: t,
      foldAxis: "y",
      labelOpacity: 1 - t,
      showCta: false,
      tellerRotateZ: 32,
      tellerExpand: 1 - t * 0.05,
      isTransitioning: true,
    };
  }

  if (p < 0.8) {
    return {
      phase: 3,
      fold: 1,
      foldAxis: "y",
      labelOpacity: 0,
      showCta: false,
      tellerRotateZ: 32,
      tellerExpand: 0.93,
      isTransitioning: true,
    };
  }

  if (p < 0.9) {
    const t = easeInOutCubic((p - 0.8) / 0.1);
    return {
      phase: 3,
      fold: 1 - t,
      foldAxis: "x",
      labelOpacity: t,
      showCta: t > 0.55,
      tellerRotateZ: 32 - t * 64,
      tellerExpand: 0.93 + t * 0.15,
      isTransitioning: true,
    };
  }

  return {
    phase: 3,
    fold: 0,
    foldAxis: "x",
    labelOpacity: 1,
    showCta: true,
    tellerRotateZ: -38,
    tellerExpand: 1.08,
    isTransitioning: false,
  };
}

const ORIGINS: Record<PetalCorner, string> = {
  tl: "100% 100%",
  tr: "0% 100%",
  bl: "100% 0%",
  br: "0% 0%",
};

/** Open rest pose per phase — distinct peaked orientations */
const OPEN_POSE: Record<
  1 | 2 | 3,
  Record<PetalCorner, { rx: number; ry: number; rz: number; tz: number }>
> = {
  1: {
    tl: { rx: -30, ry: -14, rz: 0, tz: 10 },
    tr: { rx: -30, ry: 14, rz: 0, tz: 10 },
    bl: { rx: 20, ry: -14, rz: 0, tz: 6 },
    br: { rx: 20, ry: 14, rz: 0, tz: 6 },
  },
  2: {
    tl: { rx: -18, ry: -28, rz: 4, tz: 12 },
    tr: { rx: -18, ry: 28, rz: -4, tz: 12 },
    bl: { rx: 18, ry: -28, rz: -4, tz: 8 },
    br: { rx: 18, ry: 28, rz: 4, tz: 8 },
  },
  3: {
    tl: { rx: -16, ry: -8, rz: 0, tz: 18 },
    tr: { rx: -16, ry: 8, rz: 0, tz: 18 },
    bl: { rx: 12, ry: -8, rz: 0, tz: 14 },
    br: { rx: 12, ry: 8, rz: 0, tz: 14 },
  },
};

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function getClosedPose(
  corner: PetalCorner,
  axis: FoldAxis
): { rx: number; ry: number; rz: number; tz: number } {
  const sign = corner === "tl" || corner === "tr" ? -1 : 1;
  const side = corner === "tl" || corner === "bl" ? -1 : 1;

  if (axis === "x") {
    return {
      rx: sign * -108,
      ry: side * -6,
      rz: 0,
      tz: 26,
    };
  }

  return {
    rx: sign * -12,
    ry: side * -102,
    rz: 0,
    tz: 26,
  };
}

function getPetalTransform(
  corner: PetalCorner,
  fold: number,
  axis: FoldAxis,
  phase: 1 | 2 | 3,
  expand: number,
  isMobile: boolean
): { transform: string; origin: string; shadow: string } {
  const open = OPEN_POSE[phase][corner];
  const closed = getClosedPose(corner, axis);
  const t = isMobile ? fold * 0.94 : fold;
  const phaseScale = phase === 3 ? expand * 1.03 : expand;

  const rx = lerp(open.rx, closed.rx, t);
  const ry = lerp(open.ry, closed.ry, t);
  const rz = lerp(open.rz, closed.rz, t);
  const tz = lerp(open.tz, closed.tz, t);
  const scale = lerp(phaseScale, 0.86, t * 0.35);

  const shadowBlur = lerp(14, 6, t);
  const shadowY = lerp(8, 2, t);

  return {
    transform: `rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg) translateZ(${tz}px) scale(${scale})`,
    origin: ORIGINS[corner],
    shadow: `${shadowY}px ${shadowBlur}px ${shadowBlur * 1.6}px rgba(0,0,0,${lerp(0.22, 0.38, t)})`,
  };
}

function PaperPetal({
  corner,
  label,
  index,
  fold,
  axis,
  phase,
  labelOpacity,
  expand,
  isMobile,
}: {
  corner: PetalCorner;
  label: string;
  index: number;
  fold: number;
  axis: FoldAxis;
  phase: 1 | 2 | 3;
  labelOpacity: number;
  expand: number;
  isMobile: boolean;
}) {
  const { transform, origin, shadow } = getPetalTransform(
    corner,
    fold,
    axis,
    phase,
    expand,
    isMobile
  );
  const cornerClass = {
    tl: styles.petalTl,
    tr: styles.petalTr,
    bl: styles.petalBl,
    br: styles.petalBr,
  }[corner];

  return (
    <div
      className={cn(styles.petal, cornerClass)}
      style={{
        transform,
        transformOrigin: origin,
      }}
    >
      <div
        className={styles.petalFace}
        style={{ filter: `drop-shadow(${shadow})` }}
      >
        <div className={styles.petalCrease} aria-hidden="true" />
        <div className={styles.petalContent}>
          <span className={styles.petalIndex}>{index}</span>
          <span className={styles.petalLabel} style={{ opacity: labelOpacity }}>
            {label}
          </span>
        </div>
      </div>
    </div>
  );
}

function FortuneTellerPaper({
  state,
  isMobile,
  isIdle,
}: {
  state: FortuneState;
  isMobile: boolean;
  isIdle: boolean;
}) {
  const phaseData = fortuneTellerPhases[state.phase - 1];
  const [tl, tr, bl, br] = phaseData.services;

  return (
    <motion.div
      className={styles.stage}
      animate={
        isIdle && !state.isTransitioning && state.fold < 0.04
          ? { y: [0, -8, 0] }
          : { y: 0 }
      }
      transition={
        isIdle && !state.isTransitioning
          ? { duration: 5.5, repeat: Infinity, ease: "easeInOut" }
          : { duration: 0.45, ease: [0.45, 0, 0.2, 1] }
      }
    >
      <div className={styles.glowOrb} aria-hidden="true" />
      <div className={styles.rimLight} aria-hidden="true" />

      <motion.div
        className={styles.teller}
        animate={{
          rotateX: isMobile ? 16 : 22,
          rotateZ: state.tellerRotateZ,
          scale: state.tellerExpand,
        }}
        transition={{ duration: 0.55, ease: [0.45, 0, 0.2, 1] }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className={styles.tellerShell}>
          <div className={styles.paperBacking} aria-hidden="true" />

          <PaperPetal
            corner="tl"
            label={tl.title}
            index={1}
            fold={state.fold}
            axis={state.foldAxis}
            phase={state.phase}
            labelOpacity={state.labelOpacity}
            expand={state.tellerExpand}
            isMobile={isMobile}
          />
          <PaperPetal
            corner="tr"
            label={tr.title}
            index={2}
            fold={state.fold}
            axis={state.foldAxis}
            phase={state.phase}
            labelOpacity={state.labelOpacity}
            expand={state.tellerExpand}
            isMobile={isMobile}
          />
          <PaperPetal
            corner="bl"
            label={bl.title}
            index={3}
            fold={state.fold}
            axis={state.foldAxis}
            phase={state.phase}
            labelOpacity={state.labelOpacity}
            expand={state.tellerExpand}
            isMobile={isMobile}
          />
          <PaperPetal
            corner="br"
            label={br.title}
            index={4}
            fold={state.fold}
            axis={state.foldAxis}
            phase={state.phase}
            labelOpacity={state.labelOpacity}
            expand={state.tellerExpand}
            isMobile={isMobile}
          />

          <div className={styles.centerSeam} aria-hidden="true" />
          <div className={styles.centerPivot} aria-hidden="true" />
        </div>
      </motion.div>
    </motion.div>
  );
}

function ReducedMotionView({ phase }: { phase: 1 | 2 | 3 }) {
  const phaseData = fortuneTellerPhases[phase - 1];
  const corners: PetalCorner[] = ["tl", "tr", "bl", "br"];
  const cornerClass = {
    tl: styles.reducedPetalTl,
    tr: styles.reducedPetalTr,
    bl: styles.reducedPetalBl,
    br: styles.reducedPetalBr,
  };

  return (
    <motion.div
      key={phase}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={styles.reducedOrigami}
    >
      <div className={styles.reducedBacking} aria-hidden="true" />
      {phaseData.services.map((service, i) => (
        <div
          key={service.id}
          className={cn(styles.reducedPetal, cornerClass[corners[i]])}
        >
          <span className={styles.petalIndex}>{i + 1}</span>
          <span className={styles.petalLabel}>{service.title}</span>
        </div>
      ))}
      <div className={styles.centerSeam} aria-hidden="true" />
      <div className={styles.centerPivot} aria-hidden="true" />
    </motion.div>
  );
}

export function FortuneTellerServices() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [state, setState] = useState<FortuneState>(() => deriveFortuneState(0));
  const [isIdle, setIsIdle] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const lastScrollAt = useRef(Date.now());

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  useMotionValueEvent(smoothProgress, "change", (progress) => {
    setState(deriveFortuneState(progress));
    lastScrollAt.current = Date.now();
    setIsIdle(false);
  });

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      if (Date.now() - lastScrollAt.current > 450) {
        setIsIdle(true);
      }
    }, 180);
    return () => window.clearInterval(timer);
  }, []);

  const activePhase = useMemo(
    () => fortuneTellerPhases[state.phase - 1],
    [state.phase]
  );

  return (
    <section
      ref={sectionRef}
      className="relative h-[300vh] bg-black"
      aria-label="Services fortune teller showcase"
    >
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-20" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-orange/10 blur-[120px]" />

      <div className="sticky top-0 flex h-svh min-h-[640px] items-center overflow-hidden">
        <div className="container-custom relative w-full px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:gap-10 xl:gap-14">
            {/* Left copy */}
            <div className="order-2 text-center lg:order-1 lg:text-left">
              <span className="mb-3 inline-block font-heading text-xs font-semibold uppercase tracking-[0.3em] text-orange">
                Our Services
              </span>
              <h2 className="font-heading text-3xl font-bold tracking-tight text-offwhite sm:text-4xl lg:text-5xl">
                Pick a fold.
                <span className="block text-offwhite/80">Reveal what we do.</span>
              </h2>
              <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-offwhite/55 lg:mx-0 md:text-base">
                Scroll to unfold twelve core capabilities across brand, build, and
                growth — each set revealed through a crafted paper transition.
              </p>

              <div className="mt-6 hidden lg:block">
                <p className="font-heading text-xs font-semibold uppercase tracking-[0.25em] text-orange/80">
                  Phase {state.phase} of 3
                </p>
                <p className="mt-1 font-heading text-xl font-bold text-offwhite">
                  {activePhase.label}
                </p>
                <p className="mt-1 text-sm text-offwhite/50">
                  {activePhase.subtitle}
                </p>
              </div>
            </div>

            {/* Paper stage */}
            <div className="order-1 flex justify-center lg:order-2">
              {prefersReducedMotion ? (
                <ReducedMotionView phase={state.phase} />
              ) : (
                <FortuneTellerPaper
                  state={state}
                  isMobile={isMobile}
                  isIdle={isIdle}
                />
              )}
            </div>

            {/* Right meta + CTA */}
            <div className="order-3 text-center lg:text-left">
              <div className="lg:hidden">
                <p className="font-heading text-xs font-semibold uppercase tracking-[0.25em] text-orange/80">
                  Phase {state.phase} of 3
                </p>
                <p className="mt-1 font-heading text-lg font-bold text-offwhite">
                  {activePhase.label}
                </p>
                <p className="mt-1 text-sm text-offwhite/50">
                  {activePhase.subtitle}
                </p>
              </div>

              <motion.ul
                key={state.phase}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: state.labelOpacity, y: 0 }}
                transition={{ duration: 0.35, delay: 0.06, ease: [0.45, 0, 0.2, 1] }}
                className="mx-auto mt-6 max-w-xs space-y-2 lg:mx-0"
              >
                {activePhase.services.map((service, index) => (
                  <motion.li
                    key={service.id}
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: 0.08 + index * 0.05,
                      ease: "easeOut",
                    }}
                    className="flex items-center gap-3 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2.5 text-left"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-orange/15 font-heading text-[10px] font-bold text-orange">
                      {String(index + 1 + (state.phase - 1) * 4).padStart(2, "0")}
                    </span>
                    <span className="font-heading text-sm font-medium text-offwhite/85">
                      {service.title}
                    </span>
                  </motion.li>
                ))}
              </motion.ul>

              <motion.div
                initial={false}
                animate={{
                  opacity: state.showCta ? 1 : 0,
                  y: state.showCta ? 0 : 12,
                }}
                transition={{ duration: 0.4, ease: [0.45, 0, 0.2, 1] }}
                className={cn(
                  "mt-8 flex flex-col items-center gap-3 sm:flex-row lg:items-start",
                  !state.showCta && "pointer-events-none"
                )}
              >
                <Button href="/services" size="lg" className="w-full sm:w-auto">
                  Explore all services
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Link
                  href="/contact"
                  className="font-heading text-sm font-medium text-offwhite/50 transition-colors hover:text-orange"
                >
                  Or book a strategy call →
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Scroll hint */}
          <motion.p
            className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 font-heading text-[10px] uppercase tracking-[0.35em] text-offwhite/30 md:block"
            animate={{ opacity: state.phase === 3 && state.showCta ? 0 : 0.7 }}
          >
            Scroll to unfold
          </motion.p>
        </div>
      </div>
    </section>
  );
}
