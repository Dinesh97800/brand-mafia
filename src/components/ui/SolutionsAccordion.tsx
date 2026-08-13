"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type SolutionItem = {
  id: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  image: string;
};

type SolutionsAccordionProps = {
  items: SolutionItem[];
  className?: string;
};

function preloadImage(src: string) {
  const img = new window.Image();
  img.src = src;
}

export function SolutionsAccordion({ items, className }: SolutionsAccordionProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  const handleSelect = useCallback(
    (id: string) => {
      if (id !== activeId) setActiveId(id);
    },
    [activeId]
  );

  useEffect(() => {
    items.forEach((item) => preloadImage(item.image));
  }, [items]);

  useEffect(() => {
    const active = items.find((item) => item.id === activeId);
    if (!active) return;
    const nextIndex = items.findIndex((item) => item.id === activeId) + 1;
    if (nextIndex < items.length) preloadImage(items[nextIndex].image);
  }, [activeId, items]);

  if (!items.length) return null;

  const activeItem = items.find((item) => item.id === activeId) ?? items[0];

  return (
    <div
      className={cn(
        "flex flex-col gap-8 lg:grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start lg:gap-10 xl:gap-14",
        className
      )}
    >
      {/* Image first on mobile for visual hook */}
      <div className="order-1 lg:order-2 lg:sticky lg:top-28">
        <div className="relative aspect-[16/11] overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] sm:aspect-[4/3] lg:aspect-[4/5]">
          {items.map((item) => {
            const isActive = item.id === activeId;
            return (
              <motion.div
                key={item.id}
                className="absolute inset-0"
                animate={{
                  opacity: isActive ? 1 : 0,
                  scale: isActive ? 1 : 1.02,
                }}
                transition={{ duration: 0.38, ease: "easeInOut" }}
                style={{ zIndex: isActive ? 2 : 1 }}
                aria-hidden={!isActive}
              >
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                  priority={item.id === items[0].id}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              </motion.div>
            );
          })}

          <div className="absolute bottom-0 left-0 right-0 z-10 p-5 md:p-6">
            <p className="font-heading text-xs font-semibold uppercase tracking-[0.25em] text-orange">
              Solution
            </p>
            <p className="mt-1 font-heading text-lg font-bold text-offwhite md:text-xl">
              {activeItem.title}
            </p>
          </div>
        </div>
      </div>

      {/* Accordion list */}
      <div className="order-2 flex flex-col gap-3 lg:order-1">
        {items.map((item) => {
          const isOpen = item.id === activeId;

          return (
            <div
              key={item.id}
              className={cn(
                "overflow-hidden rounded-xl border transition-[border-color,background-color,box-shadow] duration-200",
                isOpen
                  ? "border-orange/35 bg-white/[0.04] shadow-[0_0_40px_rgba(240,87,7,0.06)]"
                  : "border-white/[0.08] bg-transparent hover:border-white/[0.14]"
              )}
            >
              <button
                type="button"
                id={`solution-trigger-${item.id}`}
                className="flex w-full items-center px-5 py-5 text-left md:px-6 md:py-6"
                onClick={() => handleSelect(item.id)}
                aria-expanded={isOpen}
                aria-controls={`solution-panel-${item.id}`}
              >
                <span
                  className={cn(
                    "font-heading text-base font-semibold transition-colors duration-200 md:text-lg",
                    isOpen ? "text-orange" : "text-offwhite/65"
                  )}
                >
                  {item.title}
                </span>
              </button>

              <motion.div
                id={`solution-panel-${item.id}`}
                role="region"
                aria-labelledby={`solution-trigger-${item.id}`}
                initial={false}
                animate={{
                  height: isOpen ? "auto" : 0,
                }}
                transition={{ duration: 0.38, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="px-5 pb-5 md:px-6 md:pb-6">
                  <motion.div
                    initial={false}
                    animate={{
                      opacity: isOpen ? 1 : 0,
                      y: isOpen ? 0 : 6,
                    }}
                    transition={{
                      duration: 0.32,
                      delay: isOpen ? 0.08 : 0,
                      ease: "easeOut",
                    }}
                  >
                    <p className="text-sm leading-relaxed text-offwhite/60 md:text-base">
                      {item.description}
                    </p>

                    <motion.div
                      initial={false}
                      animate={{
                        opacity: isOpen ? 1 : 0,
                        y: isOpen ? 0 : 8,
                      }}
                      transition={{
                        duration: 0.32,
                        delay: isOpen ? 0.12 : 0,
                        ease: "easeOut",
                      }}
                      className="mt-5"
                    >
                      <Link
                        href={item.ctaHref}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange px-5 py-3.5 font-heading text-sm font-semibold text-black transition-all duration-300 hover:bg-orange/90 hover:shadow-[0_0_30px_rgba(240,87,7,0.35)]"
                        {...(item.ctaHref.startsWith("http")
                          ? {
                              target: "_blank",
                              rel: "noopener noreferrer",
                            }
                          : {})}
                      >
                        {item.ctaLabel}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
