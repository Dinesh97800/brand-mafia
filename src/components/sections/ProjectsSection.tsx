"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/site";
import { SectionHeading, FadeUp } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

const categories = [
  "All",
  "Web Design",
  "Branding",
  "SEO",
  "Paid Ads",
  "Social Media",
];

export function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section className="section-padding relative">
      <div className="container-custom">
        <div className="flex flex-col items-start lg:flex-row lg:items-end lg:justify-between gap-6 lg:gap-8 mb-12">
          <SectionHeading
            label="Portfolio"
            title="Featured Projects"
            description="Case studies from brands we've helped dominate their markets."
            className="mb-0"
          />
          <Button href="/portfolio" variant="secondary" size="sm" className="shrink-0">
            View All Projects
            <ArrowUpRight className="h-4 w-4 shrink-0" />
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-4 py-1.5 text-xs font-heading uppercase tracking-wider transition-all ${
                activeCategory === cat
                  ? "bg-orange text-black"
                  : "border border-white/10 text-offwhite/50 hover:border-orange/30 hover:text-offwhite"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <FadeUp key={project.id} delay={i * 0.05}>
                <Link href={`/case-studies/${project.id}`}>
                  <motion.article
                    layout
                    className="group relative overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                    <div className="absolute inset-0 p-6 flex flex-col justify-end">
                      <span className="text-xs font-heading uppercase tracking-wider text-orange mb-2">
                        {project.category}
                      </span>
                      <h3 className="font-heading text-xl font-bold text-offwhite mb-1">
                        {project.title}
                      </h3>
                      <p className="text-sm text-offwhite/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {project.description}
                      </p>

                      <div className="absolute top-6 right-6 h-10 w-10 rounded-full bg-orange flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
                        <ArrowUpRight className="h-4 w-4 text-black" />
                      </div>
                    </div>
                  </motion.article>
                </Link>
              </FadeUp>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
