"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Award,
  Calendar,
  Flag,
  Heart,
  Leaf,
  Lightbulb,
  MapPin,
  Megaphone,
  Monitor,
  Shield,
  ShoppingBag,
  Star,
  ThumbsUp,
  TrendingUp,
  Users,
  UtensilsCrossed,
} from "lucide-react";
import { lalasPizzaCaseStudy as data } from "@/data/case-studies/lalas-pizza";
import { siteConfig } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { BlurRevealText } from "@/components/ui/BlurRevealText";
import { LocalImage } from "@/components/ui/LocalImage";

gsap.registerPlugin(ScrollTrigger);

const tagIcons = {
  map: MapPin,
  calendar: Calendar,
  utensils: UtensilsCrossed,
};

const metricIcons = {
  users: Users,
  bag: ShoppingBag,
  heart: Heart,
  monitor: Monitor,
  star: Star,
};

const builtIcons = {
  monitor: Monitor,
  thumbs: ThumbsUp,
  megaphone: Megaphone,
  map: MapPin,
};

const journeyIcons = {
  flag: Flag,
  bulb: Lightbulb,
  trend: TrendingUp,
};

const impactIcons = {
  shield: Shield,
  trend: TrendingUp,
  users: Users,
  badge: Award,
  leaf: Leaf,
};

function LalaLogo({ className }: { className?: string }) {
  return (
    <LocalImage
      src={data.logo}
      alt="Lala's Pizza"
      className={className ?? "h-12 w-auto object-contain"}
    />
  );
}

export function LalasPizzaCaseStudyPage() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-metric]", {
          y: 28,
          opacity: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "[data-metrics]",
            start: "top 82%",
          },
        });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <article ref={root} className="overflow-hidden">
      <section className="relative px-4 pt-28 pb-8 sm:px-6 md:pt-32 lg:px-8 xl:px-16">
        <div className="pointer-events-none absolute inset-0 bg-hero-glow opacity-20" />
        <div className="container-custom relative">
          <Link
            href="/case-studies"
            className="mb-8 inline-flex items-center gap-2 text-sm text-offwhite/55 transition-colors hover:text-orange"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Case Studies
          </Link>

          <div className="overflow-hidden rounded-3xl border border-white/10 bg-black">
            <div className="grid items-center lg:grid-cols-[1fr_1.05fr]">
              <div className="px-6 py-10 sm:px-10 md:px-12 md:py-14">
                <LalaLogo className="mb-6 h-14 w-auto object-contain sm:h-16" />
                <span className="font-heading text-xs font-semibold uppercase tracking-[0.32em] text-orange">
                  {data.eyebrow}
                </span>
                <BlurRevealText
                  as="h1"
                  trigger="mount"
                  className="mt-4 font-heading text-5xl font-bold uppercase leading-[0.92] tracking-tight text-offwhite sm:text-6xl lg:text-7xl"
                >
                  {data.title}
                </BlurRevealText>
                <p className="mt-4 text-lg text-offwhite/70 md:text-xl">
                  {data.headline}
                </p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {data.tags.map((tag) => {
                    const Icon = tagIcons[tag.icon];
                    return (
                      <li
                        key={tag.label}
                        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-offwhite/70"
                      >
                        <Icon className="h-3.5 w-3.5 text-orange" />
                        {tag.label}
                      </li>
                    );
                  })}
                </ul>
                <p className="mt-6 max-w-md text-sm leading-relaxed text-offwhite/55 md:text-base">
                  {data.summary}
                </p>
              </div>
              <div className="relative min-h-[260px] sm:min-h-[380px] lg:min-h-[460px]">
                <LocalImage
                  src={data.heroImage}
                  alt="Lala's Pizza"
                  className="absolute inset-0 h-full w-full object-cover object-right"
                  priority
                />
                <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-6 sm:px-6 lg:px-8 xl:px-16">
        <div className="container-custom">
          <div
            data-metrics
            className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5"
          >
            {data.metrics.map((metric) => {
              const Icon = metricIcons[metric.icon];
              return (
                <div
                  key={metric.label}
                  data-metric
                  className="rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-6 text-center"
                >
                  <Icon className="mx-auto mb-3 h-5 w-5 text-orange" />
                  <p className="font-heading text-2xl font-bold text-offwhite md:text-3xl">
                    {metric.value}
                    {metric.icon === "star" && (
                      <Star className="ml-1 inline h-5 w-5 fill-orange text-orange" />
                    )}
                  </p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-offwhite/45">
                    {metric.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:px-8 xl:px-16">
        <div className="container-custom">
          <h2 className="text-center font-heading text-xs font-semibold uppercase tracking-[0.32em] text-orange">
            What We Built
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-sm text-offwhite/50">
            {data.builtIntro}
          </p>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {data.built.map((item) => {
              const Icon = builtIcons[item.icon];
              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] px-6 py-8 text-center"
                >
                  <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-orange/30 bg-orange/10 text-orange">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-heading text-lg font-bold text-offwhite">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-offwhite/50">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 py-6 sm:px-6 lg:px-8 xl:px-16">
        <div className="container-custom">
          <h2 className="text-center font-heading text-xs font-semibold uppercase tracking-[0.32em] text-orange">
            The Journey
          </h2>
          <div className="mt-10 grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center">
            {data.journey.map((step, i) => {
              const Icon = journeyIcons[step.icon];
              return (
                <div key={step.title} className="contents">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.02] px-6 py-8 text-center">
                    <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-orange/30 bg-orange/10 text-orange">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="font-heading text-lg font-bold uppercase tracking-wide text-offwhite">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm text-offwhite/50">
                      {step.description}
                    </p>
                  </div>
                  {i < data.journey.length - 1 && (
                    <ArrowRight className="mx-auto hidden h-6 w-6 text-orange md:block" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:px-8 xl:px-16">
        <div className="container-custom">
          <div className="grid items-center gap-4 lg:grid-cols-[1.35fr_0.75fr_0.85fr]">
            <LocalImage
              src={data.laptopImage}
              alt="Lala's Pizza website on laptop"
              className="w-full rounded-2xl object-contain"
            />
            <LocalImage
              src={data.phoneImage}
              alt="Lala's Pizza Instagram on mobile"
              className="mx-auto max-h-[640px] w-full rounded-2xl object-contain"
            />
            <LocalImage
              src={data.adsImage}
              alt="Lala's Pizza campaign creatives"
              className="w-full rounded-2xl object-contain"
            />
          </div>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 lg:px-8 xl:px-16">
        <div className="container-custom">
          <h2 className="text-center font-heading text-xs font-semibold uppercase tracking-[0.32em] text-orange">
            The Impact
          </h2>
          <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
            {data.impact.map((item) => {
              const Icon = impactIcons[item.icon];
              return (
                <div key={item.title} className="text-center">
                  <Icon className="mx-auto mb-3 h-6 w-6 text-orange" />
                  <p className="font-heading text-sm font-semibold text-offwhite">
                    {item.title}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 pt-4 sm:px-6 lg:px-8 xl:px-16">
        <div className="container-custom">
          <div className="relative overflow-hidden rounded-3xl border border-white/10">
            <LocalImage
              src={data.ctaImage}
              alt=""
              className="absolute inset-0 h-full w-full object-cover object-right"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/35" />
            <div className="relative z-10 px-6 py-12 sm:px-10 md:max-w-2xl md:py-16">
              <p className="font-heading text-xs font-semibold uppercase tracking-[0.28em] text-orange">
                Let&apos;s build something iconic
              </p>
              <h2 className="mt-4 font-heading text-3xl font-bold uppercase leading-tight text-offwhite md:text-5xl">
                Ready to build your brand from day one?
              </h2>
              <p className="mt-4 text-sm text-offwhite/60 md:text-base">
                From launch to loyalty, we make it happen.
              </p>
              <Button href={siteConfig.calendly} external magnetic className="mt-8">
                Let&apos;s Grow Together
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
