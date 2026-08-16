"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Briefcase,
  Megaphone,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";
import { servicesStats } from "@/data/site";

const iconMap: Record<string, LucideIcon> = {
  Briefcase,
  Users,
  Megaphone,
  TrendingUp,
};

function AnimatedValue({
  value,
  suffix,
  display,
  inView,
}: {
  value: number;
  suffix: string;
  display?: string;
  inView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1600;
    const increment = value / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, value]);

  if (display) {
    return <span>{display}</span>;
  }

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export function ServicesStats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative overflow-hidden px-4 py-14 sm:px-6 md:py-16 lg:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(240,87,7,0.16)_0%,transparent_70%)]" />

      <div
        ref={ref}
        className="container-custom relative grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-6"
      >
        {servicesStats.map((stat, i) => {
          const Icon = iconMap[stat.icon] ?? TrendingUp;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="flex flex-col items-center text-center"
            >
              <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-full border border-orange/25 bg-orange/10 text-orange">
                <Icon className="h-5 w-5" strokeWidth={1.8} />
              </span>
              <p className="font-heading text-3xl font-bold tracking-tight text-offwhite md:text-4xl">
                <AnimatedValue
                  value={stat.value}
                  suffix={stat.suffix}
                  display={stat.display}
                  inView={inView}
                />
              </p>
              <p className="mt-2 text-sm text-offwhite/45">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
