"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowLeft,
  ArrowUpRight,
  Calendar,
  Check,
  Clapperboard,
  DollarSign,
  MapPin,
  Megaphone,
  Monitor,
  Quote,
  Rocket,
  Sparkles,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import { blumeCaseStudy as data } from "@/data/case-studies/blume";
import { siteConfig } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { BlurRevealText } from "@/components/ui/BlurRevealText";
import { LocalImage } from "@/components/ui/LocalImage";

gsap.registerPlugin(ScrollTrigger);

const tagIcons = {
  map: MapPin,
  sparkles: Sparkles,
};

const metricIcons = {
  users: Users,
  calendar: Calendar,
  dollar: DollarSign,
  megaphone: Megaphone,
  trending: TrendingUp,
};

const strategyIcons = {
  monitor: Monitor,
  map: MapPin,
  clapperboard: Clapperboard,
};

const serviceIcons = {
  target: Target,
  map: MapPin,
  clapperboard: Clapperboard,
  megaphone: Megaphone,
  sparkles: Sparkles,
};

export function BlumeCaseStudyPage() {
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
            <div className="grid lg:grid-cols-[0.92fr_1.08fr]">
              <div className="flex flex-col justify-end px-6 py-10 sm:px-10 md:px-12 md:py-14">
                <span className="font-heading text-xs font-semibold uppercase tracking-[0.32em] text-orange">
                  {data.eyebrow}
                </span>
                <BlurRevealText
                  as="h1"
                  trigger="mount"
                  className="mt-4 max-w-lg font-heading text-4xl font-bold leading-[0.95] tracking-tight text-offwhite sm:text-5xl lg:text-[3.5rem]"
                >
                  Blume Salon & Spa
                </BlurRevealText>
                <p className="mt-5 max-w-md text-lg font-medium text-orange sm:text-xl">
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
                <p className="mt-8 max-w-md text-sm leading-relaxed text-offwhite/55 md:text-base">
                  {data.summary}
                </p>
                <p className="mt-6 font-heading text-[11px] uppercase tracking-[0.22em] text-offwhite/40">
                  Campaign Period: {data.campaignPeriod}
                </p>
              </div>

              <div className="relative min-h-[300px] sm:min-h-[420px] lg:min-h-[560px]">
                <LocalImage
                  src={data.heroImage}
                  alt="Blume Salon & Spa"
                  className="absolute inset-0 h-full w-full object-cover object-right"
                  priority
                />
                <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black to-transparent lg:w-20" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 sm:p-6">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="flex items-center justify-center rounded-2xl border border-white/10 bg-black/55 px-4 py-4 backdrop-blur-md">
                      <LocalImage
                        src={data.logo}
                        alt="Blume Salon & Spa"
                        className="h-12 w-auto object-contain sm:h-14"
                      />
                    </div>
                    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/55 px-4 py-4 backdrop-blur-md">
                      <Quote className="h-5 w-5 shrink-0 text-orange" />
                      <p className="font-heading text-sm leading-snug text-offwhite">
                        {data.tagline}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-6 sm:px-6 lg:px-8 xl:px-16">
        <div className="container-custom">
          <h2 className="text-center font-heading text-xs font-semibold uppercase tracking-[0.32em] text-orange">
            {data.metricsEyebrow}
          </h2>
          <div
            data-metrics
            className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-5"
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
                  </p>
                  <p className="mt-1 font-heading text-[11px] uppercase tracking-[0.14em] text-offwhite/70">
                    {metric.label}
                  </p>
                  <p className="mt-2 text-[11px] leading-relaxed text-offwhite/40">
                    {metric.detail}
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
            Our Strategy
          </h2>
          <div className="mt-8 grid gap-3 md:grid-cols-3">
            {data.strategy.map((item) => {
              const Icon = strategyIcons[item.icon];
              return (
                <div
                  key={item.num}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-7"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-heading text-sm font-semibold text-offwhite">
                      <span className="text-orange">{item.num}.</span> {item.title}
                    </p>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-orange/30 bg-orange/10 text-orange">
                      <Icon className="h-4 w-4" />
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-offwhite/50">
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
            Campaign Creatives That Convert
          </h2>
          <div className="mt-8 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2">
            {data.creatives.map((card) => (
              <article
                key={card.title}
                className="relative w-[220px] shrink-0 snap-start overflow-hidden rounded-2xl border border-white/10 sm:w-[240px]"
              >
                <LocalImage
                  src={card.src}
                  alt={card.title}
                  className="aspect-[3/4] h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/10" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="font-heading text-sm font-bold uppercase leading-snug tracking-wide text-offwhite">
                    {card.title}
                  </p>
                  <p className="mt-1 text-[11px] leading-relaxed text-offwhite/65">
                    {card.subtitle}
                  </p>
                  <LocalImage
                    src={data.logo}
                    alt=""
                    className="mt-3 h-6 w-auto object-contain"
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:px-8 xl:px-16">
        <div className="container-custom">
          <div className="grid overflow-hidden rounded-3xl border border-white/10 lg:grid-cols-[0.85fr_1.15fr_0.9fr]">
            <ul className="space-y-3 p-7 md:p-8">
              {data.results.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-3 text-sm text-offwhite/70"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange/15 text-orange">
                    <Check className="h-3 w-3" />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
            <blockquote className="border-t border-white/10 bg-white/[0.03] p-7 md:p-10 lg:border-l lg:border-t-0">
              <Quote className="mb-4 h-6 w-6 text-orange" />
              <p className="font-heading text-lg font-semibold leading-relaxed text-offwhite md:text-xl">
                &ldquo;{data.quote.text}&rdquo;
              </p>
              <footer className="mt-6 text-sm text-offwhite/45">
                — {data.quote.attribution}
              </footer>
            </blockquote>
            <div className="relative min-h-[240px]">
              <LocalImage
                src={data.quoteImage}
                alt="Japanese head spa at Blume"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-8 pt-2 sm:px-6 lg:px-8 xl:px-16">
        <div className="container-custom">
          <div className="flex flex-col items-start justify-between gap-6 overflow-hidden rounded-3xl bg-orange px-6 py-8 sm:px-10 md:flex-row md:items-center md:py-10">
            <div className="flex items-start gap-4">
              <Rocket className="mt-1 hidden h-7 w-7 shrink-0 text-black md:block" />
              <div className="max-w-2xl">
                <h2 className="font-heading text-2xl font-bold leading-tight text-black md:text-4xl">
                  Ready to Turn Clicks Into Clients?
                </h2>
                <p className="mt-3 max-w-lg text-sm text-black/70 md:text-base">
                  Let Brand Mafia create a digital strategy that brings real
                  results and real growth for your business.
                </p>
              </div>
            </div>
            <Button
              href={siteConfig.calendly}
              external
              variant="secondary"
              className="shrink-0 border-black/15 bg-black text-offwhite hover:bg-black/90"
            >
              Let&apos;s Grow Together
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 lg:px-8 xl:px-16">
        <div className="container-custom">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/10 pt-6">
            <span className="font-heading text-xs uppercase tracking-[0.2em] text-orange">
              Services Delivered
            </span>
            {data.services.map((service) => {
              const Icon = serviceIcons[service.icon];
              return (
                <span
                  key={service.label}
                  className="inline-flex items-center gap-2 text-xs text-offwhite/50"
                >
                  <Icon className="h-3.5 w-3.5 text-orange" />
                  {service.label}
                </span>
              );
            })}
          </div>
        </div>
      </section>
    </article>
  );
}
