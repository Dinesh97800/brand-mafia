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
  Heart,
  Lightbulb,
  MapPin,
  Megaphone,
  Monitor,
  Navigation,
  Phone,
  Quote,
  Scissors,
  ShieldAlert,
  Star,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import { lalajiCaseStudy as data } from "@/data/case-studies/lalaji";
import { siteConfig } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { BlurRevealText } from "@/components/ui/BlurRevealText";
import { LocalImage } from "@/components/ui/LocalImage";

gsap.registerPlugin(ScrollTrigger);

const metricIcons = {
  users: Users,
  trending: TrendingUp,
  heart: Heart,
  phone: Phone,
  navigation: Navigation,
  calendar: Calendar,
};

const serviceIcons = {
  megaphone: Megaphone,
  map: MapPin,
  monitor: Monitor,
  clapperboard: Clapperboard,
  target: Target,
  star: Star,
};

function LalajiMark({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const height =
    size === "lg" ? "h-16 sm:h-20" : size === "sm" ? "h-10" : "h-12";

  return (
    <LocalImage
      src={data.logo}
      alt="Lalaji The Barber Shop"
      className={`${height} w-auto object-contain`}
    />
  );
}

export function LalajiCaseStudyPage() {
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
                  className="mt-4 max-w-lg font-heading text-4xl font-bold leading-[1.05] tracking-tight text-offwhite sm:text-5xl lg:text-[3.4rem]"
                >
                  {data.title}
                </BlurRevealText>
                <p className="mt-4 max-w-md text-lg font-medium text-orange sm:text-xl">
                  {data.headline}
                </p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {data.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 font-heading text-[11px] uppercase tracking-[0.16em] text-offwhite/65"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
                <p className="mt-8 max-w-md text-sm leading-relaxed text-offwhite/55 md:text-base">
                  {data.summary}
                </p>
              </div>

              <div className="relative min-h-[280px] sm:min-h-[380px] lg:min-h-[520px]">
                <LocalImage
                  src={data.heroImage}
                  alt="Lalaji The Barbershop interior"
                  className="absolute inset-0 h-full w-full object-contain object-bottom"
                  priority
                />
                <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black to-transparent lg:hidden" />
                <div className="absolute bottom-6 right-6 rounded-2xl border border-white/10 bg-black/55 px-4 py-3 backdrop-blur-md sm:bottom-8 sm:right-8">
                  <LalajiMark size="sm" />
                  <p className="mt-2 max-w-[12rem] font-heading text-[10px] uppercase tracking-[0.22em] text-offwhite/70">
                    {data.tagline}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-6 border-t border-white/10 px-6 py-6 sm:grid-cols-2 sm:px-10 md:grid-cols-4 md:px-12">
              <div className="flex items-center">
                <LalajiMark />
              </div>
              {data.snapshot.map((item) => {
                const Icon =
                  item.label === "Locations"
                    ? MapPin
                    : item.label === "Team Members"
                      ? Users
                      : Scissors;
                return (
                  <div key={item.label} className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-orange/30 bg-orange/10 text-orange">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="font-heading text-lg font-bold text-offwhite">
                        {item.value}
                      </p>
                      <p className="text-xs uppercase tracking-[0.16em] text-offwhite/45">
                        {item.label}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-8 sm:px-6 lg:px-8 xl:px-16">
        <div className="container-custom">
          <div
            data-metrics
            className="rounded-3xl border border-white/10 bg-white/[0.02] px-4 py-8 sm:px-8"
          >
            <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
              {data.metrics.map((metric) => {
                const Icon = metricIcons[metric.icon];
                return (
                  <div key={metric.label} data-metric className="text-center">
                    <Icon className="mx-auto mb-3 h-5 w-5 text-orange" />
                    <p className="font-heading text-2xl font-bold text-offwhite md:text-3xl">
                      {metric.value}
                    </p>
                    <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-offwhite/45">
                      {metric.label}
                    </p>
                  </div>
                );
              })}
            </div>
            <p className="mt-6 text-center text-[11px] text-offwhite/35">
              *{data.metricsNote}
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 lg:px-8 xl:px-16">
        <div className="container-custom grid gap-4 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-7 md:p-10">
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-orange/30 bg-orange/10 text-orange">
                <ShieldAlert className="h-4 w-4" />
              </span>
              <h2 className="font-heading text-xs font-semibold uppercase tracking-[0.28em] text-orange">
                The Challenge
              </h2>
            </div>
            <p className="text-sm leading-relaxed text-offwhite/60 md:text-base">
              {data.challenge.intro}
            </p>
            <ul className="mt-6 space-y-3">
              {data.challenge.points.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-3 text-sm text-offwhite/70"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange" />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-7 md:p-10">
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-orange/30 bg-orange/10 text-orange">
                <Lightbulb className="h-4 w-4" />
              </span>
              <h2 className="font-heading text-xs font-semibold uppercase tracking-[0.28em] text-orange">
                Our Approach
              </h2>
            </div>
            <p className="text-sm leading-relaxed text-offwhite/60 md:text-base">
              {data.approach.intro}
            </p>
            <ul className="mt-6 space-y-3">
              {data.approach.points.map((point) => (
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
          </div>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 lg:px-8 xl:px-16">
        <div className="container-custom">
          <div className="grid gap-4 overflow-hidden rounded-3xl border border-white/10 lg:grid-cols-[1.35fr_0.65fr]">
            <div className="p-7 md:p-10">
              <h2 className="font-heading text-xs font-semibold uppercase tracking-[0.28em] text-orange">
                The Impact
              </h2>
              <p className="mt-3 font-heading text-3xl font-bold text-offwhite md:text-4xl">
                {data.impact.heading}
              </p>
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {data.impact.points.map((point) => (
                  <p
                    key={point}
                    className="border-t border-white/10 pt-4 text-sm leading-relaxed text-offwhite/65"
                  >
                    {point}
                  </p>
                ))}
              </div>
            </div>
            <blockquote className="flex flex-col justify-center border-t border-white/10 bg-white/[0.03] p-7 md:p-10 lg:border-l lg:border-t-0">
              <Quote className="mb-4 h-6 w-6 text-orange" />
              <p className="font-heading text-lg font-semibold leading-relaxed text-offwhite md:text-xl">
                {data.quote.text}
              </p>
              <footer className="mt-6 text-sm text-offwhite/45">
                — {data.quote.attribution}
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 lg:px-8 xl:px-16">
        <div className="container-custom grid gap-4 lg:grid-cols-[1.35fr_0.65fr]">
          <div className="rounded-3xl border border-white/10 p-6 md:p-8">
            <h2 className="font-heading text-xs font-semibold uppercase tracking-[0.28em] text-orange">
              Our Locations
            </h2>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {data.locations.map((location) => (
                <div
                  key={location.name}
                  className="overflow-hidden rounded-xl border border-white/10"
                >
                  <div className="relative aspect-[4/3]">
                    <LocalImage
                      src={location.image}
                      alt={`${location.name} location`}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
                    <p className="absolute inset-x-2 bottom-2 font-heading text-xs font-semibold text-offwhite">
                      {location.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-3xl border border-white/10 bg-white/[0.02] p-7 md:p-8">
            <div>
              <LalajiMark size="lg" />
              <p className="mt-6 text-sm leading-relaxed text-offwhite/55">
                {data.story}
              </p>
            </div>
            <div className="mt-8">
              <Button href={data.website} external className="w-full justify-center">
                Visit Website
                <ArrowUpRight className="h-4 w-4" />
              </Button>
              <p className="mt-3 text-center text-xs text-offwhite/40">
                {data.websiteLabel}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 lg:px-8 xl:px-16">
        <div className="container-custom">
          <h2 className="font-heading text-xs font-semibold uppercase tracking-[0.28em] text-orange">
            Services Delivered
          </h2>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {data.services.map((service) => {
              const Icon = serviceIcons[service.icon];
              return (
                <div
                  key={service.label}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-5 text-center"
                >
                  <Icon className="mx-auto mb-3 h-5 w-5 text-orange" />
                  <p className="font-heading text-xs font-semibold text-offwhite">
                    {service.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 pt-4 sm:px-6 lg:px-8 xl:px-16">
        <div className="container-custom">
          <div className="flex flex-col items-start justify-between gap-6 overflow-hidden rounded-3xl bg-orange px-6 py-8 sm:px-10 md:flex-row md:items-center md:py-10">
            <div className="max-w-2xl">
              <h2 className="font-heading text-2xl font-bold leading-tight text-black md:text-4xl">
                Ready to Grow Your Brand Like Lalaji The Barbershop?
              </h2>
              <p className="mt-3 max-w-lg text-sm text-black/70 md:text-base">
                Let Brand Mafia create a digital strategy that drives real
                results for your business.
              </p>
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
    </article>
  );
}
