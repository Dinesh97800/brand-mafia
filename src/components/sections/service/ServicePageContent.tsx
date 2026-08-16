"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Quote,
  Search,
} from "lucide-react";
import { siteConfig } from "@/data/site";
import { getRelatedServices, type Service } from "@/data/services";
import { serviceIconMap } from "@/lib/service-icons";
import { BlurRevealText } from "@/components/ui/BlurRevealText";
import { Button } from "@/components/ui/Button";
import { FadeUp } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

export function ServicePageContent({ service }: { service: Service }) {
  const Icon = serviceIconMap[service.icon] || Search;
  const related = getRelatedServices(service);
  const heroAsBackground = service.id === "ai";

  return (
    <article>
      <section
        className={cn(
          "relative overflow-hidden pt-28 pb-16 md:pt-32 md:pb-20",
          heroAsBackground &&
            "flex min-h-[78vh] flex-col justify-end md:min-h-[88vh]"
        )}
      >
        {heroAsBackground ? (
          <>
            <Image
              src={service.image}
              alt=""
              fill
              className="object-cover object-[78%_center]"
              priority
              sizes="100vw"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/20" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/45" />
          </>
        ) : (
          <>
            <div className="pointer-events-none absolute inset-0 bg-hero-glow opacity-30" />
            <div className="pointer-events-none absolute inset-0 grid-bg opacity-20" />
          </>
        )}

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8 xl:px-16">
          <Link
            href="/services"
            className="mb-8 inline-flex items-center gap-2 text-sm text-offwhite/60 transition-colors hover:text-orange"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Services
          </Link>

          <div
            className={cn(
              !heroAsBackground &&
                "grid items-end gap-12 lg:grid-cols-[1.15fr_0.85fr]"
            )}
          >
            <div className="max-w-3xl">
              <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-orange/20 bg-orange/5 px-4 py-2 font-heading text-xs font-semibold uppercase tracking-[0.25em] text-orange">
                <Icon className="h-3.5 w-3.5" />
                {service.title}
              </span>
              <BlurRevealText
                as="h1"
                trigger="mount"
                text={service.headline}
                className="font-heading text-4xl font-bold leading-tight text-offwhite md:text-5xl lg:text-6xl"
              />
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-offwhite/60">
                {service.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href={siteConfig.calendly} external magnetic>
                  Book a Strategy Call
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
                <Button href="/contact" variant="secondary">
                  Talk to Us
                </Button>
              </div>
            </div>

            {!heroAsBackground && (
              <>
                <FadeUp className="relative mt-10 aspect-[16/10] overflow-hidden rounded-3xl border border-white/10 lg:hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                    priority
                    sizes="100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                </FadeUp>

                <FadeUp className="relative hidden aspect-[4/5] overflow-hidden rounded-3xl border border-white/10 lg:block">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                    priority
                    sizes="(min-width: 1024px) 40vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                </FadeUp>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="container-custom grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <div>
            {service.intro.map((paragraph) => (
              <p
                key={paragraph}
                className="mb-5 text-base leading-relaxed text-offwhite/70 md:text-lg"
              >
                {paragraph}
              </p>
            ))}
            <p className="mt-6 text-sm leading-relaxed text-offwhite/45">
              <span className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-orange/80">
                Who it&apos;s for
              </span>
              <span className="mt-2 block">{service.forWho}</span>
            </p>
          </div>

          <FadeUp>
            <blockquote className="relative overflow-hidden rounded-2xl border border-orange/20 bg-orange/[0.06] p-8">
              <Quote className="mb-4 h-6 w-6 text-orange/70" />
              <p className="font-heading text-xl font-semibold leading-relaxed text-offwhite md:text-2xl">
                {service.quote}
              </p>
            </blockquote>
          </FadeUp>
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="container-custom">
          <FadeUp>
            <span className="mb-3 inline-block font-heading text-xs font-semibold uppercase tracking-[0.3em] text-orange">
              How We Think
            </span>
            <h2 className="mb-12 max-w-2xl font-heading text-3xl font-bold text-offwhite md:text-4xl">
              The Brand Mafia approach to {service.title}
            </h2>
          </FadeUp>

          <div className="grid gap-5 sm:grid-cols-2">
            {service.pillars.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="glass rounded-2xl p-6 md:p-8"
              >
                <span className="font-heading text-xs font-semibold tracking-[0.3em] text-orange/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-heading text-xl font-bold text-offwhite">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-offwhite/55">
                  {pillar.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="container-custom grid gap-10 lg:grid-cols-2">
          <FadeUp>
            <div className="glass h-full rounded-2xl p-8 md:p-10">
              <h2 className="font-heading text-2xl font-bold text-offwhite md:text-3xl">
                What&apos;s included
              </h2>
              <ul className="mt-8 space-y-4">
                {service.includes.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-orange/20 bg-orange/10">
                      <Check className="h-3.5 w-3.5 text-orange" />
                    </span>
                    <span className="text-sm leading-relaxed text-offwhite/70">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="glass h-full rounded-2xl p-8 md:p-10">
              <h2 className="font-heading text-2xl font-bold text-offwhite md:text-3xl">
                What you get
              </h2>
              <ul className="mt-8 space-y-4">
                {service.outcomes.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-orange/20 bg-orange/10">
                      <Check className="h-3.5 w-3.5 text-orange" />
                    </span>
                    <span className="text-sm leading-relaxed text-offwhite/70">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeUp>
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="container-custom">
          <div className="relative overflow-hidden rounded-3xl border border-orange/20 bg-gradient-to-br from-orange/[0.08] via-black to-black px-6 py-12 md:px-10 md:py-14">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-orange/10 blur-3xl" />
            <span className="relative mb-4 inline-block font-heading text-xs font-semibold uppercase tracking-[0.35em] text-orange">
              How We Work
            </span>
            <h2 className="relative font-heading text-3xl font-bold text-offwhite md:text-4xl">
              From brief to growth
            </h2>

            <div className="relative mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {service.process.map((step, i) => (
                <div key={step.title} className="relative">
                  <p className="font-heading text-xs font-semibold tracking-[0.3em] text-orange/70">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 font-heading text-lg font-bold text-offwhite">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-offwhite/50">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="container-custom">
          <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="mb-3 inline-block font-heading text-xs font-semibold uppercase tracking-[0.3em] text-orange">
                Keep Exploring
              </span>
              <h2 className="font-heading text-3xl font-bold text-offwhite">
                Related services
              </h2>
            </div>
            <Link
              href={`/blog/${service.blogSlug}`}
              className="text-sm text-offwhite/50 transition-colors hover:text-orange"
            >
              Read the {service.title} playbook →
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {related.map((item) => {
              const RelatedIcon = serviceIconMap[item.icon] || Search;
              return (
                <Link
                  key={item.id}
                  href={`/services/${item.id}`}
                  className="glass group rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-orange/30"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-offwhite/70 transition-colors group-hover:border-orange/40 group-hover:text-orange">
                    <RelatedIcon className="h-4 w-4" />
                  </span>
                  <h3 className="mt-5 font-heading text-lg font-bold text-offwhite">
                    {item.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-offwhite/50">
                    {item.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="container-custom">
          <div className="glass-strong rounded-3xl px-8 py-12 text-center md:px-16 md:py-16">
            <h2 className="font-heading text-3xl font-bold text-offwhite md:text-4xl">
              Ready to put {service.title} to work?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-offwhite/55">
              We&apos;ll look at how customers find you, where trust breaks, and
              what would actually move the business — then build from there.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button href={siteConfig.calendly} external magnetic>
                Get a Free Strategy Call
                <ArrowUpRight className="h-4 w-4" />
              </Button>
              <Button href={`/blog/${service.blogSlug}`} variant="ghost">
                Read related insights
              </Button>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
