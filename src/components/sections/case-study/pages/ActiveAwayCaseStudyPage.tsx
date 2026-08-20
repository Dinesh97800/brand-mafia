"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Code2,
  FileText,
  MapPin,
  PenLine,
  Rocket,
  Search,
  Trophy,
  TrendingUp,
  Users,
} from "lucide-react";
import { activeAwayCaseStudy as data } from "@/data/case-studies/active-away";
import { siteConfig } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { LocalImage } from "@/components/ui/LocalImage";

gsap.registerPlugin(ScrollTrigger);

const lime = "text-[#C6F000]";
const limeBg = "bg-[#C6F000]";
const limeBorder = "border-[#C6F000]/30";

const snapshotIcons = {
  trophy: Trophy,
  trending: TrendingUp,
  map: MapPin,
  users: Users,
};

const approachIcons = {
  search: Search,
  file: FileText,
  pen: PenLine,
  code: Code2,
  trending: TrendingUp,
};

function UkMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 110"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M42 6c3 4 8 6 10 12 3 8-1 12 2 18 2 4 8 6 8 12 0 5-4 7-3 12 1 4 6 6 5 11-1 6-8 8-10 14-1 4 2 8-2 12-4 4-8 2-12 6-3 3-2 8-7 9-6 1-8-6-12-8-5-3-10 1-14-3-3-3 0-8-2-12-2-5-8-6-8-12 0-5 5-7 6-12 1-6-4-9-2-14 2-5 8-5 10-10 2-4-1-8 2-12 4-5 11-3 14-8 2-3 1-7 5-9z"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ActiveAwayCaseStudyPage() {
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
        <div className="container-custom">
          <Link
            href="/case-studies"
            className="mb-6 inline-flex items-center gap-2 text-sm text-orange transition-colors hover:text-offwhite"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Case Studies
          </Link>

          <div className="overflow-hidden rounded-3xl border border-white/10">
            <h1 className="sr-only">
              Active Away — Ranking a UK tennis holiday brand on page one of
              Google
            </h1>
            <LocalImage
              src={data.heroImage}
              alt="Active Away case study: ranking a UK tennis holiday brand on page one of Google"
              className="h-auto w-full object-cover"
              priority
            />
          </div>
        </div>
      </section>

      <section className="px-4 pb-4 sm:px-6 lg:px-8 xl:px-16">
        <div className="container-custom">
          <div
            data-metrics
            className="grid grid-cols-2 gap-3 rounded-3xl border border-white/10 px-3 py-6 sm:px-6 lg:grid-cols-4"
          >
            {data.snapshot.map((item) => {
              const Icon = snapshotIcons[item.icon];
              return (
                <div key={item.value} data-metric className="px-2 py-3 text-center">
                  <Icon className={`mx-auto mb-3 h-6 w-6 ${lime}`} />
                  <p className="font-heading text-lg font-bold uppercase tracking-wide text-offwhite">
                    {item.value}
                  </p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-offwhite/45">
                    {item.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:px-8 xl:px-16">
        <div className="container-custom">
          <div className="rounded-3xl border border-white/10 px-4 py-8 sm:px-8">
            <h2 className="text-center font-heading text-xs font-semibold uppercase tracking-[0.32em] text-offwhite">
              Our SEO Approach
            </h2>
            <div className="mt-10 flex flex-wrap items-start justify-center gap-x-4 gap-y-8 lg:flex-nowrap lg:justify-between">
              {data.approach.map((step, i) => {
                const Icon = approachIcons[step.icon];
                return (
                  <div key={step.num} className="flex items-center gap-4">
                    <div className="w-[7.5rem] text-center">
                      <span
                        className={`relative mx-auto flex h-14 w-14 items-center justify-center rounded-full border ${limeBorder} ${lime}`}
                      >
                        <Icon className="h-5 w-5" />
                        <span
                          className={`absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full ${limeBg} font-heading text-[10px] font-bold text-black`}
                        >
                          {step.num}
                        </span>
                      </span>
                      <p className="mt-3 font-heading text-[11px] font-bold uppercase tracking-[0.14em] text-offwhite">
                        {step.title}
                      </p>
                    </div>
                    {i < data.approach.length - 1 && (
                      <ArrowRight
                        className={`hidden h-5 w-5 shrink-0 ${lime} lg:block`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-6 sm:px-6 lg:px-8 xl:px-16">
        <div className="container-custom">
          <h2 className="text-center font-heading text-xs font-semibold uppercase tracking-[0.32em] text-offwhite">
            The Results
          </h2>
          <div className="mt-8 grid items-center gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <ul className="space-y-3">
              {data.results.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-3 text-sm text-offwhite/75"
                >
                  <span
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${limeBg} text-black`}
                  >
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {point}
                </li>
              ))}
            </ul>

            <LocalImage
              src={data.resultsImage}
              alt="Active Away website on laptop and mobile"
              className="h-auto w-full rounded-2xl object-contain"
            />
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8 xl:px-16">
        <div className="container-custom">
          <div className="grid items-center gap-8 overflow-hidden rounded-3xl border border-white/10 p-6 md:p-8 lg:grid-cols-[1.1fr_0.5fr_0.9fr]">
            <div>
              <h2 className="font-heading text-xs font-semibold uppercase tracking-[0.28em] text-offwhite">
                Keywords We Rank For
              </h2>
              <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {data.keywords.map((keyword) => (
                  <p
                    key={keyword}
                    className="flex items-center gap-2 text-sm text-offwhite/70"
                  >
                    <Search className={`h-3.5 w-3.5 shrink-0 ${lime}`} />
                    {keyword}
                  </p>
                ))}
              </div>
            </div>
            <div className="flex justify-center">
              <UkMark className={`h-28 w-20 ${lime} opacity-80`} />
            </div>
            <blockquote>
              <p className={`mb-3 font-heading text-4xl leading-none ${lime}`}>
                “
              </p>
              <p className="font-heading text-base font-semibold leading-relaxed text-offwhite md:text-lg">
                {data.quote.text}
              </p>
              <footer className="mt-4 text-sm text-offwhite/45">
                — {data.quote.attribution}
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 lg:px-8 xl:px-16">
        <div className="container-custom">
          <div className="flex flex-col items-start justify-between gap-6 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] px-6 py-8 sm:px-10 md:flex-row md:items-center md:py-10">
            <div className="flex items-start gap-4">
              <Rocket className="mt-1 hidden h-7 w-7 shrink-0 text-orange md:block" />
              <div>
                <h2 className="font-heading text-2xl font-bold leading-tight text-offwhite md:text-4xl">
                  Have a Business That Deserves to Rank?
                </h2>
                <p className="mt-3 max-w-lg text-sm text-offwhite/55 md:text-base">
                  Your customers are already searching. Let&apos;s make sure
                  they find you.
                </p>
              </div>
            </div>
            <Button href={siteConfig.calendly} external magnetic className="shrink-0">
              Let&apos;s Grow Together
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </article>
  );
}
