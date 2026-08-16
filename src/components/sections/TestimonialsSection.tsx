"use client";

import Image from "next/image";
import { Quote } from "lucide-react";
import { testimonials } from "@/data/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

type Testimonial = (typeof testimonials)[number];

const ROW_DURATIONS = [38, 48, 42];
const ROW_DELAYS = ["-6s", "-22s", "-14s"];

function splitIntoRows(items: Testimonial[], rowCount: number) {
  const rows: Testimonial[][] = Array.from({ length: rowCount }, () => []);
  items.forEach((item, index) => {
    rows[index % rowCount].push(item);
  });
  return rows;
}

function padRow(items: Testimonial[], min = 8) {
  const padded = [...items];
  while (padded.length < min) {
    padded.push(...items);
  }
  return padded;
}

function TestimonialCard({
  testimonial,
  className,
}: {
  testimonial: Testimonial;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "w-[260px] sm:w-[280px] md:w-[300px] shrink-0 overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0c1018]",
        className
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={testimonial.image}
          alt=""
          fill
          sizes="300px"
          className="object-cover"
        />
        <Quote
          className="absolute right-3 top-3 h-5 w-5 fill-white/90 text-white/90 drop-shadow-md"
          aria-hidden="true"
        />
      </div>
      <div className="px-5 pb-5 pt-4">
        <p className="font-heading text-[15px] font-semibold text-offwhite">
          {testimonial.name}
        </p>
        <p className="mt-0.5 text-sm text-offwhite/45">{testimonial.role}</p>
        <p className="mt-3 line-clamp-3 text-[13px] leading-relaxed text-offwhite/65">
          {testimonial.text}
        </p>
      </div>
    </article>
  );
}

function MarqueeSequence({ items }: { items: Testimonial[] }) {
  return (
    <div className="flex shrink-0 flex-nowrap gap-5 pr-5">
      {items.map((testimonial, index) => (
        <TestimonialCard
          key={`${testimonial.id}-${index}`}
          testimonial={testimonial}
        />
      ))}
    </div>
  );
}

function MarqueeRow({
  items,
  reverse,
  duration,
  delay,
}: {
  items: Testimonial[];
  reverse?: boolean;
  duration: number;
  delay: string;
}) {
  const sequence = padRow(items);

  return (
    <div className="flex w-full overflow-hidden">
      <div
        className={cn(
          "flex w-max flex-nowrap hover:[animation-play-state:paused]",
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        )}
        style={{
          animationDuration: `${duration}s`,
          animationDelay: delay,
        }}
      >
        <MarqueeSequence key="a" items={sequence} />
        <MarqueeSequence key="b" items={sequence} />
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  const rows = splitIntoRows(testimonials, 3);

  return (
    <section className="relative overflow-hidden py-20 md:py-28 lg:py-32">
      <div className="absolute inset-0 bg-hero-glow opacity-15 pointer-events-none" />

      <div className="container-custom relative px-4 sm:px-6 lg:px-8 xl:px-16 2xl:px-24">
        <SectionHeading
          title="Testimonials"
          description="What happens when strategy, craft, and obsession actually sit in the same room. Here's what our clients have to say."
          align="center"
        />
      </div>

      <div className="sr-only">
        <ul>
          {testimonials.map((testimonial) => (
            <li key={testimonial.id}>
              {testimonial.name}, {testimonial.role}: {testimonial.text}
            </li>
          ))}
        </ul>
      </div>

      <div className="relative w-full" aria-hidden="true">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-black to-transparent sm:w-28 md:w-40" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-black to-transparent sm:w-28 md:w-40" />

        <div className="flex w-full flex-col gap-5">
          {rows.map((row, index) => (
            <MarqueeRow
              key={index}
              items={row}
              reverse={index % 2 === 1}
              duration={ROW_DURATIONS[index]}
              delay={ROW_DELAYS[index]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
