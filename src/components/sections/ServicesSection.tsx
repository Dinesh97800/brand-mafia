"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Target,
  Share2,
  Code2,
  Palette,
  Users,
  FileText,
  Bot,
  MapPin,
  Building2,
  Mail,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { services } from "@/data/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LocalImage } from "@/components/ui/LocalImage";

const iconMap: Record<string, LucideIcon> = {
  Search,
  Target,
  Share2,
  Code2,
  Palette,
  Users,
  FileText,
  Bot,
  MapPin,
  Building2,
  Mail,
  TrendingUp,
};

interface CarouselConfig {
  cardWidth: number;
  cardHeight: number;
  cylinderRadius: number;
  visibleRange: number;
  perspective: number;
  zScale: number;
}

const DESKTOP_CONFIG: CarouselConfig = {
  cardWidth: 205,
  cardHeight: 480,
  cylinderRadius: 680,
  visibleRange: 3,
  perspective: 1650,
  zScale: 1,
};

const TABLET_CONFIG: CarouselConfig = {
  cardWidth: 178,
  cardHeight: 420,
  cylinderRadius: 560,
  visibleRange: 2,
  perspective: 1400,
  zScale: 0.88,
};

const MOBILE_CONFIG: CarouselConfig = {
  cardWidth: 155,
  cardHeight: 380,
  cylinderRadius: 440,
  visibleRange: 1,
  perspective: 1200,
  zScale: 0.72,
};

/** Horizontal arc step — smaller = tighter card spacing */
const ARC_STEP_DEG = 16;

/** Concave curved-monitor slots — rotateY is the primary curve driver */
const MONITOR_SLOTS = [
  { rotateY: 0, translateZ: 110, scale: 1, opacity: 1, brightness: 1.22, saturate: 1.1 },
  { rotateY: 24, translateZ: -15, scale: 0.93, opacity: 0.88, brightness: 0.88, saturate: 0.95 },
  { rotateY: 34, translateZ: -75, scale: 0.84, opacity: 0.68, brightness: 0.68, saturate: 0.85 },
  { rotateY: 44, translateZ: -155, scale: 0.74, opacity: 0.48, brightness: 0.52, saturate: 0.72 },
] as const;

function useCarouselConfig(): CarouselConfig {
  const [config, setConfig] = useState(DESKTOP_CONFIG);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) setConfig(MOBILE_CONFIG);
      else if (w < 1024) setConfig(TABLET_CONFIG);
      else setConfig(DESKTOP_CONFIG);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return config;
}

function getRelativePosition(index: number, active: number, total: number) {
  let rel = index - active;
  if (rel > total / 2) rel -= total;
  if (rel < -total / 2) rel += total;
  return rel;
}

function getCurvedMonitorTransform(rel: number, config: CarouselConfig) {
  const abs = Math.min(Math.abs(rel), 3);
  const slot = MONITOR_SLOTS[abs];
  const sign = rel === 0 ? 0 : rel > 0 ? -1 : 1;

  const rotateY = sign * slot.rotateY;
  const angleRad = (rel * ARC_STEP_DEG * Math.PI) / 180;
  const x = config.cylinderRadius * Math.sin(angleRad);

  return {
    x,
    y: 0,
    z: slot.translateZ * config.zScale,
    rotateY,
    scale: slot.scale,
    opacity: slot.opacity,
    brightness: slot.brightness,
    saturate: slot.saturate,
    zIndex: 130 - abs * 18,
  };
}

function shortenDescription(text: string, max = 85) {
  if (text.length <= max) return text;
  return `${text.slice(0, max).trim()}…`;
}

const LAMP_TOP = 12;
const CARD_GAP = 22;
/** ViewBox y=97 — bottom of bulb / start of beam */
const LAMP_FIXTURE_RATIO = 97 / 420;
const LAMP_WIDTH = "min(340px, 58vw)";
const LAMP_ASPECT = 420 / 300;

function getCarouselTop(cardHeight: number) {
  return `calc(${LAMP_TOP}px + ${LAMP_WIDTH} * ${LAMP_ASPECT} * ${LAMP_FIXTURE_RATIO} + ${CARD_GAP}px + ${cardHeight / 2}px)`;
}

/** Fit stage to lamp + cards + reflection — no extra empty gap */
function getStageMinHeight(cardHeight: number) {
  const reflection = cardHeight * 0.4 * 0.35;
  return `calc(${LAMP_TOP}px + ${LAMP_WIDTH} * ${LAMP_ASPECT} * ${LAMP_FIXTURE_RATIO} + ${CARD_GAP}px + ${cardHeight}px + ${reflection}px + 36px)`;
}

function HangingLamp({
  lightOn,
  onToggle,
}: {
  lightOn: boolean;
  onToggle: () => void;
}) {
  const fixtureHeight = `calc(${LAMP_WIDTH} * ${LAMP_ASPECT} * ${LAMP_FIXTURE_RATIO})`;
  const beamHeight = `calc(${LAMP_WIDTH} * ${LAMP_ASPECT} * ${1 - LAMP_FIXTURE_RATIO})`;

  return (
    <>
      {/* Light beam — behind cards */}
      <motion.div
        className="pointer-events-none absolute left-1/2 z-[8] -translate-x-1/2 overflow-hidden"
        style={{ top: `calc(${LAMP_TOP}px + ${fixtureHeight})`, width: LAMP_WIDTH, height: beamHeight }}
        initial={false}
        animate={{ opacity: lightOn ? 1 : 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        aria-hidden={!lightOn}
      >
        <div style={{ transform: `translateY(-${LAMP_FIXTURE_RATIO * 100}%)` }}>
          <LocalImage
            src="/images/website_lamp_glow.svg"
            alt=""
            width={340}
            height={560}
            className="block h-auto w-full max-w-none select-none"
            priority
          />
        </div>
      </motion.div>

      {/* Lamp fixture — always in front of cards */}
      <button
        type="button"
        onClick={onToggle}
        aria-label={lightOn ? "Turn spotlight off" : "Turn spotlight on"}
        aria-pressed={lightOn}
        className="absolute left-1/2 z-50 -translate-x-1/2 cursor-pointer overflow-hidden outline-none transition-transform hover:scale-[1.03] focus-visible:ring-2 focus-visible:ring-orange/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        style={{ top: LAMP_TOP, width: LAMP_WIDTH, height: fixtureHeight }}
      >
        {lightOn ? (
          <div
            style={{
              clipPath: `inset(0 0 ${(1 - LAMP_FIXTURE_RATIO) * 100}% 0)`,
            }}
          >
            <LocalImage
              src="/images/website_lamp_glow.svg"
              alt=""
              width={340}
              height={560}
              className="block h-auto w-full max-w-none select-none"
              priority
            />
          </div>
        ) : (
          <LocalImage
            src="/images/website_lamp_off.svg"
            alt=""
            width={88}
            height={120}
            className="mx-auto block h-full w-auto max-w-[92px] select-none object-contain object-top drop-shadow-[0_2px_12px_rgba(255,255,255,0.15)]"
          />
        )}
        <span className="sr-only">
          {lightOn
            ? "Spotlight on — click to turn off"
            : "Spotlight off — click to turn on"}
        </span>
      </button>
    </>
  );
}

export function ServicesSection() {
  const config = useCarouselConfig();
  const total = services.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [lightOn, setLightOn] = useState(true);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const touchStartX = useRef<number | null>(null);

  const goToIndex = useCallback((index: number) => {
    setActiveIndex(index);
    setPaused(true);
  }, []);

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const toggleLight = useCallback(() => {
    setLightOn((prev) => !prev);
  }, []);

  useEffect(() => {
    if (paused || !lightOn) return;
    const timer = setInterval(goNext, 3200);
    return () => clearInterval(timer);
  }, [paused, lightOn, goNext]);

  const visibleCards = useMemo(
    () =>
      services
        .map((service, index) => ({
          service,
          index,
          rel: getRelativePosition(index, activeIndex, total),
        }))
        .filter(({ rel }) => Math.abs(rel) <= config.visibleRange),
    [activeIndex, total, config.visibleRange]
  );

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 48) {
      if (delta < 0) goNext();
      else goPrev();
    }
    touchStartX.current = null;
  };

  return (
    <section
      id="services"
      className="section-padding relative overflow-hidden bg-black"
    >
      <div className="container-custom relative z-10">
        <SectionHeading
          label="What We Do"
          title="Services That Scale"
          description="Premium digital marketing solutions engineered for explosive growth."
          align="center"
        />
      </div>

      <div
        className="relative mx-auto mt-2 w-full max-w-[1500px]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => {
          setPaused(false);
          setHoveredId(null);
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        aria-label="Services cinematic showcase"
      >
        {/* Side navigation */}
        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous service"
          className="absolute left-2 top-[52%] z-40 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/60 text-offwhite/70 backdrop-blur-sm transition-all hover:border-orange/40 hover:text-orange sm:left-4 md:h-12 md:w-12"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={goNext}
          aria-label="Next service"
          className="absolute right-2 top-[52%] z-40 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/60 text-offwhite/70 backdrop-blur-sm transition-all hover:border-orange/40 hover:text-orange sm:right-4 md:h-12 md:w-12"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* ── Cinematic stage ── */}
        <div
          className="services-stage relative mx-auto overflow-hidden pt-1"
          style={{
            minHeight: getStageMinHeight(config.cardHeight),
            perspective: `${config.perspective}px`,
            perspectiveOrigin: "50% 38%",
          }}
        >
          <HangingLamp lightOn={lightOn} onToggle={toggleLight} />

          {/* Glossy reflective floor */}
          <div className="pointer-events-none absolute inset-x-[4%] bottom-0 z-[1] h-[32%] bg-[linear-gradient(to_bottom,rgba(217,0,0,0.08)_0%,rgba(0,0,0,0.4)_55%,#000_100%)]" />
          <motion.div
            className="pointer-events-none absolute inset-x-[8%] bottom-[4%] z-[2] h-[22%] rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(217,0,0,0.18)_0%,rgba(240,87,7,0.06)_40%,transparent_70%)] blur-[2px]"
            initial={false}
            animate={{ opacity: lightOn ? 1 : 0.35 }}
            transition={{ duration: 0.5 }}
          />
          <div className="pointer-events-none absolute inset-x-[12%] bottom-[6%] z-[2] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {/* 3D carousel — sits below lamp shade */}
          <div
            className="services-carousel absolute left-1/2 z-[10] h-0 w-0"
            style={{
              top: getCarouselTop(config.cardHeight),
              transformStyle: "preserve-3d",
            }}
          >
            {visibleCards.map(({ service, index, rel }) => {
              const Icon = iconMap[service.icon] || Search;
              const transform = getCurvedMonitorTransform(rel, config);
              const isCenter = rel === 0;
              const isHovered = hoveredId === service.id;
              const isLitCenter = isCenter && lightOn;
              const serviceNumber = String(index + 1).padStart(2, "0");
              const cardBrightness =
                transform.brightness * (isCenter && !lightOn ? 0.72 : 1);

              return (
                <motion.article
                  key={service.id}
                  id={service.id}
                  className="service-card absolute cursor-pointer select-none"
                  style={{
                    width: config.cardWidth,
                    height: config.cardHeight,
                    left: -config.cardWidth / 2,
                    top: -config.cardHeight / 2,
                    zIndex: transform.zIndex,
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden",
                  }}
                  animate={{
                    x: transform.x,
                    y: transform.y,
                    z: transform.z + (isHovered ? 20 : 0),
                    rotateY: transform.rotateY,
                    scale: transform.scale + (isHovered ? 0.02 : 0),
                    opacity: transform.opacity,
                    filter: `brightness(${cardBrightness}) saturate(${transform.saturate})`,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 72,
                    damping: 22,
                    mass: 1,
                  }}
                  onClick={() => {
                    if (!isCenter) goToIndex(index);
                  }}
                  onMouseEnter={() => setHoveredId(service.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  {/* Red vertical panel */}
                  <div
                    className="relative flex h-full w-full flex-col overflow-hidden rounded-md px-5 pb-6 pt-8 text-center"
                    style={{
                      background: isLitCenter
                        ? "linear-gradient(180deg, #E80000 0%, #D90000 45%, #B80000 100%)"
                        : "linear-gradient(180deg, #9a0000 0%, #720000 50%, #3a0000 100%)",
                      boxShadow: isLitCenter
                        ? "0 60px 120px rgba(0,0,0,0.75), inset 0 1px 0 rgba(255,180,120,0.3)"
                        : "0 35px 70px rgba(0,0,0,0.7)",
                    }}
                  >
                    {/* Spotlight wash on panel */}
                    <motion.div
                      className="pointer-events-none absolute inset-0"
                      initial={false}
                      animate={{ opacity: isLitCenter ? 1 : 0 }}
                      transition={{ duration: 0.45 }}
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(255,220,180,0.35) 0%, rgba(255,255,255,0.08) 18%, transparent 45%, rgba(0,0,0,0.2) 100%)",
                      }}
                    />
                    {!isLitCenter && (
                      <div
                        className="pointer-events-none absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, transparent 30%, rgba(0,0,0,0.35) 100%)",
                        }}
                      />
                    )}

                    <span className="relative font-heading text-[10px] font-semibold tracking-[0.45em] text-white/40">
                      {serviceNumber}
                    </span>

                    <h3 className="relative mt-5 font-heading text-base font-bold uppercase leading-tight tracking-[0.12em] text-white sm:text-lg">
                      {service.title}
                    </h3>

                    <p className="relative mx-auto mt-5 max-w-[90%] flex-1 text-[11px] leading-[1.75] text-white/75 sm:text-[12px]">
                      {shortenDescription(service.description, 95)}
                    </p>

                    {/* Icon + CTA at bottom — reference layout */}
                    <div className="relative mt-auto flex flex-col items-center gap-4 pt-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white">
                        <Icon className="h-5 w-5" strokeWidth={1.8} />
                      </div>

                      {isLitCenter && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="flex h-9 w-9 items-center justify-center rounded-full bg-orange text-black shadow-[0_0_20px_rgba(240,87,7,0.5)]"
                        >
                          <ArrowUpRight className="h-4 w-4" />
                        </motion.div>
                      )}
                    </div>
                  </div>

                  {/* Floor reflection */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute left-0 top-full mt-1 h-[40%] w-full origin-top overflow-hidden rounded-md"
                    style={{
                      opacity: isLitCenter ? 0.16 : 0.05,
                      transform: "rotateX(180deg) scaleY(0.35) translateY(4px)",
                      background: isLitCenter
                        ? "linear-gradient(180deg, #E80000 0%, #D90000 45%, #B80000 100%)"
                        : "linear-gradient(180deg, #720000 0%, #3a0000 100%)",
                      maskImage:
                        "linear-gradient(to bottom, rgba(0,0,0,0.55), transparent 90%)",
                      WebkitMaskImage:
                        "linear-gradient(to bottom, rgba(0,0,0,0.55), transparent 90%)",
                      filter: `brightness(${transform.brightness * 0.65})`,
                    }}
                  />
                </motion.article>
              );
            })}
          </div>
        </div>

        {/* Pagination */}
        <div className="relative z-20 mt-4 flex items-center justify-center gap-2">
          {services.map((service, i) => (
            <button
              key={service.id}
              type="button"
              aria-label={`Go to ${service.title}`}
              onClick={() => goToIndex(i)}
              className={`rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? "h-2 w-8 bg-orange"
                  : "h-2 w-2 bg-white/25 hover:bg-white/45"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
