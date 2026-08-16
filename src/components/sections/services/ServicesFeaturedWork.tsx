"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/site";

const featured = projects.slice(0, 3);

export function ServicesFeaturedWork() {
  return (
    <section className="relative overflow-hidden px-4 py-16 sm:px-6 md:py-20 lg:px-8 xl:px-16">
      <div className="container-custom relative">
        <div className="mb-10 flex flex-col gap-3 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="font-heading text-3xl font-bold text-offwhite md:text-4xl lg:text-5xl">
            Real Results. Real Impact.
          </h2>
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 font-heading text-sm font-semibold text-orange transition-all hover:gap-3"
          >
            View All Case Studies
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {featured.map((project, i) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Link
                href={`/case-studies/${project.id}`}
                className="group relative block aspect-[3/4] overflow-hidden rounded-2xl"
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <span className="font-heading text-xs uppercase tracking-[0.2em] text-orange">
                    {project.category}
                  </span>
                  <h3 className="mt-2 font-heading text-xl font-bold text-offwhite">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-offwhite/70">
                    {project.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 font-heading text-sm font-semibold text-orange transition-all group-hover:gap-3">
                    View Case Study
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
