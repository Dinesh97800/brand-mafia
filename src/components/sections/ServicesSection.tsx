"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Target,
  Share2,
  Code2,
  Palette,
  Users,
  FileText,
  Bot,
  MapPin,
  Building2,
  Mail,
  TrendingUp,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { services } from "@/data/site";
import { SectionHeading, FadeUp } from "@/components/ui/SectionHeading";

const iconMap: Record<string, LucideIcon> = {
  Search,
  Target,
  Share2,
  Code2,
  Palette,
  Users,
  FileText,
  Bot,
  MapPin,
  Building2,
  Mail,
  TrendingUp,
};

export function ServicesSection() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section id="services" className="section-padding relative">
      <div className="absolute inset-0 bg-hero-glow opacity-20 pointer-events-none" />
      <div className="container-custom relative">
        <SectionHeading
          label="What We Do"
          title="Services That Scale"
          description="Premium digital marketing solutions engineered for explosive growth."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] || Search;
            const isHovered = hovered === service.id;

            return (
              <FadeUp key={service.id} delay={i * 0.05}>
                <motion.div
                  id={service.id}
                  className="group relative h-full cursor-pointer"
                  onMouseEnter={() => setHovered(service.id)}
                  onMouseLeave={() => setHovered(null)}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className={`relative h-full rounded-2xl p-6 transition-all duration-500 ${
                      isHovered
                        ? "glass-strong shadow-[0_0_40px_rgba(240,87,7,0.1)]"
                        : "glass"
                    }`}
                  >
                    {isHovered && (
                      <motion.div
                        layoutId="service-glow"
                        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange/10 to-transparent"
                        transition={{ duration: 0.3 }}
                      />
                    )}

                    <div className="relative">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-orange/10 text-orange transition-transform group-hover:scale-110">
                        <Icon className="h-5 w-5" />
                      </div>

                      <h3 className="font-heading text-lg font-semibold text-offwhite mb-2">
                        {service.title}
                      </h3>

                      <motion.p
                        className="text-sm text-offwhite/50 leading-relaxed"
                        animate={{ height: isHovered ? "auto" : "3rem" }}
                        style={{ overflow: "hidden" }}
                      >
                        {service.description}
                      </motion.p>

                      <motion.div
                        className="mt-4 flex items-center gap-1 text-orange text-sm font-medium"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isHovered ? 1 : 0 }}
                      >
                        Learn more
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
