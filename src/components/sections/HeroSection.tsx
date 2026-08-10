"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { heroServices, siteConfig } from "@/data/site";
import { Button } from "@/components/ui/Button";

function FloatingShape({
  className,
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -30, 0],
        rotate: [0, 180, 360],
      }}
      transition={{
        duration: 8,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const parallaxX = useTransform(mouseX, [-500, 500], [-20, 20]);
  const parallaxY = useTransform(mouseY, [-500, 500], [-20, 20]);
  const orbX = useTransform(parallaxX, (v) => -v * 0.5);
  const orbY = useTransform(parallaxY, (v) => -v * 0.5);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left - rect.width / 2);
      mouseY.set(e.clientY - rect.top - rect.height / 2);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.play().catch(() => {
      // Autoplay may be blocked until user interaction
    });
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label="Hero"
    >
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover scale-105"
          aria-hidden="true"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        {/* Lighter overlay — keeps text readable while showing the video */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/65" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/50" />
        <div className="absolute inset-0 grid-bg opacity-15" />
      </div>

      {/* Gradient Orbs */}
      <motion.div
        style={{ x: parallaxX, y: parallaxY }}
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-orange/8 blur-[120px] pointer-events-none z-[1]"
      />
      <motion.div
        style={{ x: orbX, y: orbY }}
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-orange/5 blur-[100px] pointer-events-none z-[1]"
      />

      {/* Floating Shapes */}
      <FloatingShape
        className="absolute top-[20%] right-[15%] w-16 h-16 border border-orange/20 rotate-45 hidden md:block"
        delay={0}
      />
      <FloatingShape
        className="absolute bottom-[30%] left-[10%] w-8 h-8 bg-orange/10 rounded-full hidden md:block"
        delay={2}
      />
      <FloatingShape
        className="absolute top-[40%] left-[20%] w-12 h-12 border border-orange/10 rounded-full hidden lg:block"
        delay={1}
      />

      <div className="relative z-10 container-custom section-padding pt-32 pb-20 w-full">
        {/* Localized scrim behind text only — keeps video visible on the right */}
        <div className="absolute top-24 left-4 sm:left-6 lg:left-8 xl:left-16 w-full max-w-3xl h-[70%] bg-gradient-to-r from-black/60 via-black/30 to-transparent rounded-3xl pointer-events-none -z-10" />

        <div className="max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 2.4 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-orange/20 bg-orange/5 px-4 py-1.5 text-xs font-heading uppercase tracking-[0.2em] text-orange mb-8">
              <span className="h-1.5 w-1.5 rounded-full bg-orange animate-pulse" />
              {siteConfig.tagline}
            </span>
          </motion.div>

          <motion.h1
            className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.95] tracking-tight text-offwhite mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.5 }}
          >
            We Don&apos;t Market Brands.
            <br />
            <span className="text-orange">We Build Empires.</span>
          </motion.h1>

          <motion.div
            className="mb-10 max-w-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 2.7 }}
          >
            <p className="text-offwhite/60 text-base md:text-lg mb-4">
              Helping businesses grow using:
            </p>
            <div className="flex flex-wrap gap-2">
              {heroServices.map((service, i) => (
                <motion.span
                  key={service}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-offwhite/70 backdrop-blur-sm"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 2.8 + i * 0.08 }}
                >
                  {service}
                </motion.span>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 3 }}
          >
            <Button href={siteConfig.calendly} external magnetic size="lg">
              Get Free Strategy Call
              <ArrowUpRight className="h-5 w-5 shrink-0" />
            </Button>
            <Button href="/portfolio" variant="secondary" size="lg" magnetic>
              View Our Work
            </Button>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5 }}
        >
          <span className="text-xs text-offwhite/30 uppercase tracking-widest">
            Scroll
          </span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <ChevronDown className="h-4 w-4 text-orange/50" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
