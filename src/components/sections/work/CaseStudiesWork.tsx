"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Briefcase, Heart, Layers, TrendingUp } from "lucide-react";
import { projects, stats } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const categories = [
  "All Work",
  "Web Design",
  "Branding",
  "SEO",
  "Paid Ads",
  "Social Media",
];

const FEATURED_ID = "lalaji-the-barbershop";

const resultIcons = [Briefcase, Heart, TrendingUp, Layers];

export function CaseStudiesWork() {
  const [active, setActive] = useState("All Work");

  const filtered = useMemo(() => {
    if (active === "All Work") return projects;
    return projects.filter((project) => project.category === active);
  }, [active]);

  const featured =
    filtered.find((project) => project.id === FEATURED_ID) ?? filtered[0];
  const rest = filtered.filter((project) => project.id !== featured?.id);
  const [lead, ...others] = rest;

  if (!featured) return null;

  return (
    <>
      <section id="featured" className="px-4 pb-8 sm:px-6 lg:px-8 xl:px-16">
        <div className="container-custom">
          <div className="mb-10 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActive(cat)}
                className={cn(
                  "rounded-full px-4 py-1.5 font-heading text-xs uppercase tracking-wider transition-all",
                  active === cat
                    ? "bg-orange text-black"
                    : "border border-white/10 text-offwhite/50 hover:border-orange/30 hover:text-offwhite"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          <article className="grid overflow-hidden rounded-2xl border border-white/10 lg:grid-cols-[1.15fr_0.85fr]">
            <Link
              href={`/case-studies/${featured.id}`}
              className="group relative min-h-[280px] lg:min-h-[460px]"
            >
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 55vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-5 left-5 rounded-lg border border-white/10 bg-black/70 px-3 py-2 backdrop-blur-sm">
                <p className="font-heading text-[10px] uppercase tracking-[0.2em] text-offwhite/40">
                  Client
                </p>
                <p className="font-heading text-sm font-semibold text-offwhite">
                  {featured.client}
                </p>
              </div>
            </Link>

            <div className="flex flex-col justify-center px-6 py-8 md:px-10 md:py-12">
              <p className="font-heading text-xs uppercase tracking-[0.22em] text-orange">
                {featured.category}
              </p>
              <h2 className="mt-3 font-heading text-3xl font-bold text-offwhite md:text-4xl">
                {featured.title}
              </h2>
              <p className="mt-4 max-w-md text-offwhite/55">
                {featured.description}
              </p>
              <div className="mt-8 grid grid-cols-2 gap-6">
                {featured.metrics.map((metric) => (
                  <div key={metric.label}>
                    <p className="font-heading text-3xl font-bold text-orange">
                      {metric.value}
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-[0.16em] text-offwhite/45">
                      {metric.label}
                    </p>
                  </div>
                ))}
              </div>
              <Button
                href={`/case-studies/${featured.id}`}
                variant="secondary"
                className="mt-8 w-fit"
              >
                View Case Study
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </div>
          </article>
        </div>
      </section>

      {lead && (
        <section
          id="selected"
          className="px-4 py-16 sm:px-6 md:py-24 lg:px-8 xl:px-16"
        >
          <div className="container-custom">
            <div className="mb-8 flex items-end justify-between gap-4">
              <h2 className="font-heading text-xs uppercase tracking-[0.28em] text-offwhite/40">
                More Selected Work
              </h2>
              <Link
                href="#selected"
                className="inline-flex items-center gap-1 text-sm text-offwhite/45 transition-colors hover:text-orange"
              >
                View All Projects
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <WorkCard project={lead} large />
              <div className="grid gap-4 sm:grid-cols-2">
                {others.map((project) => (
                  <WorkCard key={project.id} project={project} />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="border-y border-white/10 px-4 py-14 sm:px-6 lg:px-8 xl:px-16">
        <div className="container-custom grid gap-10 md:grid-cols-[0.7fr_1.3fr] md:items-center">
          <h2 className="font-heading text-3xl font-bold text-offwhite md:text-4xl">
            Results that drive growth
            <span className="text-orange">.</span>
          </h2>
          <ul className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((stat, i) => {
              const Icon = resultIcons[i] ?? Briefcase;
              return (
                <li key={stat.label}>
                  <Icon className="mb-3 h-5 w-5 text-orange" strokeWidth={1.6} />
                    <p className="font-heading text-2xl font-bold text-offwhite md:text-3xl">
                    {`${stat.value}${stat.suffix}`}
                  </p>
                  <p className="mt-1 text-xs text-offwhite/45">{stat.label}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}

function WorkCard({
  project,
  large = false,
}: {
  project: (typeof projects)[number];
  large?: boolean;
}) {
  return (
    <Link
      href={`/case-studies/${project.id}`}
      className={cn(
        "group relative overflow-hidden rounded-2xl",
        large ? "h-full min-h-[420px]" : "min-h-[220px]"
      )}
    >
      <Image
        src={project.image}
        alt={project.title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes={large ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 1024px) 50vw, 25vw"}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5">
        <p className="font-heading text-[11px] uppercase tracking-[0.2em] text-orange">
          {project.category}
        </p>
        <h3 className="mt-1 font-heading text-xl font-bold text-offwhite md:text-2xl">
          {project.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-offwhite/55">
          {project.description}
        </p>
      </div>
      <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-orange text-black opacity-0 transition-opacity group-hover:opacity-100">
        <ArrowUpRight className="h-4 w-4" />
      </span>
    </Link>
  );
}
