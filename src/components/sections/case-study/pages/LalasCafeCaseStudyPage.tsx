"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowLeft,
  ArrowUpRight,
  Award,
  Calendar,
  Check,
  Heart,
  Lightbulb,
  MapPin,
  Monitor,
  Quote,
  Search,
  ShoppingBag,
  Star,
  Target,
  ThumbsUp,
  Users,
  UtensilsCrossed,
  Video,
} from "lucide-react";
import { lalasCafeCaseStudy as data } from "@/data/case-studies/lalas-cafe";
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

const workIcons = {
  monitor: Monitor,
  video: Video,
  thumbs: ThumbsUp,
  search: Search,
};

const metricIcons = {
  users: Users,
  bag: ShoppingBag,
  star: Star,
  award: Award,
};

const serviceIcons = {
  monitor: Monitor,
  video: Video,
  thumbs: ThumbsUp,
  search: Search,
  target: Target,
  heart: Heart,
};

function CafeLogo({ className }: { className?: string }) {
  return (
    <LocalImage
      src={data.logo}
      alt="Lala's Cafe"
      className={className ?? "h-12 w-auto object-contain"}
    />
  );
}

export function LalasCafeCaseStudyPage() {
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

        gsap.from("[data-home-primary]", {
          y: 30,
          opacity: 0,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "[data-digital-home]",
            start: "top 78%",
          },
        });

        gsap.from("[data-home-secondary]", {
          y: 40,
          opacity: 0,
          duration: 0.85,
          delay: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "[data-digital-home]",
            start: "top 78%",
          },
        });

        gsap.from("[data-home-benefit]", {
          x: 15,
          opacity: 0,
          duration: 0.55,
          stagger: 0.08,
          delay: 0.18,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "[data-digital-home]",
            start: "top 78%",
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
                <CafeLogo className="mb-8 h-14 w-auto object-contain sm:h-16" />
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
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button href={data.website} external size="sm">
                    Visit Website
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                  <p className="self-center text-xs text-offwhite/40">
                    {data.websiteLabel}
                  </p>
                </div>
              </div>

              <div className="relative min-h-[280px] sm:min-h-[400px] lg:min-h-[540px]">
                <LocalImage
                  src={data.heroImage}
                  alt="Lala's Cafe interior"
                  className="absolute inset-0 h-full w-full object-cover object-center"
                  priority
                />
                <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black to-transparent lg:w-24" />
                <div className="absolute bottom-6 right-6 rounded-2xl border border-white/10 bg-black/55 px-4 py-3 backdrop-blur-md sm:bottom-8 sm:right-8">
                  <p className="font-heading text-[10px] uppercase tracking-[0.22em] text-orange">
                    {data.tagline}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-6 border-t border-white/10 px-6 py-6 sm:grid-cols-2 sm:px-10 md:grid-cols-4 md:px-12">
              <div className="flex items-center">
                <CafeLogo />
              </div>
              {data.snapshot.map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-orange/30 bg-orange/10 text-orange">
                    {item.label === "Home City" ? (
                      <MapPin className="h-4 w-4" />
                    ) : item.label === "Launch" ? (
                      <Calendar className="h-4 w-4" />
                    ) : (
                      <UtensilsCrossed className="h-4 w-4" />
                    )}
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
              ))}
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
            <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
              {data.metrics.map((metric) => {
                const Icon = metricIcons[metric.icon];
                return (
                  <div key={metric.label} data-metric className="text-center">
                    <Icon className="mx-auto mb-3 h-5 w-5 text-orange" />
                    <p className="font-heading text-3xl font-bold text-offwhite">
                      {metric.value}
                    </p>
                    <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-offwhite/45">
                      {metric.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 lg:px-8 xl:px-16">
        <div className="container-custom grid gap-4 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-7 md:p-10">
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-orange/30 bg-orange/10 text-orange">
                <Target className="h-4 w-4" />
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
        <div className="container-custom grid gap-4 overflow-hidden rounded-3xl border border-white/10 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="p-7 md:p-10">
            <h2 className="font-heading text-xs font-semibold uppercase tracking-[0.28em] text-orange">
              What We Did
            </h2>
            <p className="mt-3 font-heading text-3xl font-bold text-offwhite md:text-4xl">
              A full digital launch, built to feel like the cafe.
            </p>
            <div className="mt-8 space-y-6">
              {data.work.map((item) => {
                const Icon = workIcons[item.icon];
                return (
                  <div key={item.num} className="flex gap-4 border-t border-white/10 pt-5">
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-orange/30 bg-orange/10 text-orange">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="font-heading text-[11px] uppercase tracking-[0.2em] text-orange">
                        {item.num}
                      </p>
                      <h3 className="mt-1 font-heading text-lg font-bold text-offwhite">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-offwhite/50">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex items-center bg-black p-6 sm:p-8 lg:p-10">
            <LocalImage
              src={data.laptopImage}
              alt="Lala's Cafe website on laptop"
              className="w-full rounded-2xl object-contain"
            />
          </div>
        </div>
      </section>

      <section
        data-digital-home
        className="overflow-x-hidden px-4 py-16 sm:px-5 md:px-6 md:py-20 lg:px-8 lg:py-24 xl:px-16"
      >
        <div className="container-custom">
          <p className="mb-16 text-center font-heading text-[12px] font-semibold uppercase tracking-[0.34em] text-orange md:mb-[72px]">
            The New Digital Home
          </p>

          <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:gap-x-10 md:gap-y-8 lg:grid-cols-[minmax(340px,1.35fr)_minmax(220px,0.85fr)_minmax(300px,1.15fr)] lg:items-center lg:gap-x-10">
            <div data-home-primary className="md:row-span-2 lg:row-span-1 lg:self-start">
              <LocalImage
                src={data.phoneImage}
                alt="Lala's Cafe website on mobile"
                className="aspect-[4/5] w-full rounded-[16px] object-cover object-[center_20%] md:max-w-none lg:max-w-[460px]"
              />
            </div>

            <div
              data-home-secondary
              className="md:col-start-2 md:row-start-1 lg:relative lg:top-8 lg:col-start-2 lg:row-start-1 lg:self-center"
            >
              <LocalImage
                src={data.pastaImage}
                alt="Lala's Cafe pasta"
                className="aspect-[1.1/1] w-full max-w-[320px] rounded-[14px] object-cover md:max-w-[280px] lg:h-[250px] lg:w-[290px] lg:max-w-none"
              />
            </div>

            <ul className="space-y-[22px] md:col-start-2 md:row-start-2 md:max-w-[340px] lg:relative lg:top-10 lg:col-start-3 lg:row-start-1 lg:self-center lg:max-w-[360px]">
              {data.digitalHome.map((point) => (
                <li
                  key={point}
                  data-home-benefit
                  className="flex items-start gap-3.5"
                >
                  <span className="mt-0.5 flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-full bg-[#B33A08] text-offwhite">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  <p className="text-[15px] leading-[1.5] text-offwhite md:text-[16px]">
                    {point}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 lg:px-8 xl:px-16">
        <div className="container-custom">
          <h2 className="font-heading text-xs font-semibold uppercase tracking-[0.32em] text-orange">
            Bringing Lala&apos;s Cafe to Life
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-6 md:grid-rows-2">
            <div className="relative col-span-2 overflow-hidden rounded-2xl border border-white/10 md:col-span-3 md:row-span-2">
              <LocalImage
                src={data.gallery.featured.src}
                alt={data.gallery.featured.alt}
                className="h-full min-h-[220px] w-full object-cover md:min-h-[420px]"
              />
            </div>
            {data.gallery.items.slice(0, 2).map((item) => (
              <div
                key={item.src}
                className="overflow-hidden rounded-2xl border border-white/10 md:col-span-3"
              >
                <LocalImage
                  src={item.src}
                  alt={item.alt}
                  className="aspect-[16/10] h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
          <div className="mt-3 grid grid-cols-3 gap-3">
            {data.gallery.items.slice(2).map((item) => (
              <div
                key={item.src}
                className="overflow-hidden rounded-2xl border border-white/10"
              >
                <LocalImage
                  src={item.src}
                  alt={item.alt}
                  className="aspect-square h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 lg:px-8 xl:px-16">
        <div className="container-custom">
          <div className="grid overflow-hidden rounded-3xl border border-white/10 lg:grid-cols-[1.25fr_0.75fr]">
            <blockquote className="p-7 md:p-10">
              <h2 className="mb-6 font-heading text-xs font-semibold uppercase tracking-[0.32em] text-orange">
                What Our Customers Say
              </h2>
              <Quote className="mb-4 h-6 w-6 text-orange" />
              <p className="max-w-2xl font-heading text-xl font-semibold leading-relaxed text-offwhite md:text-2xl">
                &ldquo;{data.testimonial.text}&rdquo;
              </p>
              <footer className="mt-8 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-orange font-heading text-sm font-bold text-black">
                  S
                </span>
                <cite className="not-italic font-heading text-sm text-offwhite/70">
                  {data.testimonial.name}
                </cite>
              </footer>
            </blockquote>
            <div className="relative min-h-[220px]">
              <LocalImage
                src={data.gallery.items[0].src}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
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
          <div className="flex flex-col items-start justify-between gap-6 overflow-hidden rounded-3xl bg-orange px-6 py-8 sm:px-10 md:flex-row md:items-center md:py-12">
            <div className="max-w-2xl">
              <h2 className="font-heading text-2xl font-bold leading-tight text-black md:text-4xl">
                Ready to build your brand from day one?
              </h2>
              <p className="mt-3 max-w-lg text-sm text-black/70 md:text-base">
                Let Brand Mafia build a digital foundation that turns your
                launch into long-term success.
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
