"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Search } from "lucide-react";
import { services } from "@/data/services";
import { serviceIconMap } from "@/lib/service-icons";
import { LocalImage } from "@/components/ui/LocalImage";

export function ServicesGrid() {
  return (
    <section id="services" className="section-padding relative overflow-hidden pt-8 md:pt-12">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-orange/[0.06] blur-[130px]" />

      <div className="container-custom relative">
        <div className="mb-10 flex flex-col gap-3 md:mb-14 md:flex-row md:items-end md:justify-between">
          <h2 className="font-heading text-3xl font-bold text-offwhite md:text-4xl lg:text-5xl">
            End-to-End Services for Growth
          </h2>
          <p className="max-w-sm text-sm leading-relaxed text-offwhite/45 md:text-right">
            Search, creative, product, and performance — one outcome: a brand
            people find, trust, and choose.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {services.map((service, i) => {
            const Icon = serviceIconMap[service.icon] || Search;
            const number = String(i + 1).padStart(2, "0");

            return (
              <motion.article
                key={service.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.04,
                  ease: [0.76, 0, 0.24, 1],
                }}
              >
                <Link
                  href={`/services/${service.id}`}
                  className="glass group relative flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-500 hover:-translate-y-1 hover:border-orange/40 hover:shadow-[0_0_40px_rgba(240,87,7,0.14)]"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    {service.image.startsWith("/images/") ? (
                      <LocalImage
                        src={service.image}
                        alt={service.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>

                  <div className="relative flex flex-1 flex-col p-6 md:p-8">
                  <div className="relative mb-8 flex items-start justify-between">
                    <span className="font-heading text-sm font-semibold tracking-[0.28em] text-offwhite/30">
                      {number}
                    </span>
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-orange/20 bg-orange/10 text-orange transition-all duration-300 group-hover:border-orange/50 group-hover:bg-orange/20">
                      <Icon className="h-5 w-5" strokeWidth={1.8} />
                    </span>
                  </div>

                  <h3 className="relative font-heading text-xl font-bold text-offwhite md:text-2xl">
                    {service.title}
                  </h3>
                  <p className="relative mt-3 flex-1 text-sm leading-relaxed text-offwhite/55">
                    {service.description}
                  </p>

                  <span className="relative mt-8 inline-flex items-center gap-2 font-heading text-sm font-semibold text-orange transition-all duration-300 group-hover:gap-3">
                    Explore service
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                  </div>
                </Link>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
