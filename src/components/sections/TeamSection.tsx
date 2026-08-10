"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Linkedin, Twitter } from "lucide-react";
import { team } from "@/data/site";
import { SectionHeading, FadeUp } from "@/components/ui/SectionHeading";

export function TeamSection() {
  return (
    <section className="section-padding relative">
      <div className="container-custom">
        <SectionHeading
          label="Our Team"
          title="The Minds Behind the Magic"
          description="A collective of strategists, creatives, and growth hackers obsessed with results."
          align="center"
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {team.map((member, i) => (
            <FadeUp key={member.name} delay={i * 0.1}>
              <motion.div
                className="group text-center"
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative mx-auto mb-4 h-32 w-32 md:h-40 md:w-40 overflow-hidden rounded-full border-2 border-white/10 group-hover:border-orange/50 transition-colors duration-500">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="160px"
                  />
                  <div className="absolute inset-0 bg-orange/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                    <a
                      href={member.social.linkedin}
                      aria-label={`${member.name} LinkedIn`}
                      className="h-8 w-8 rounded-full bg-black/50 flex items-center justify-center text-offwhite hover:text-orange"
                    >
                      <Linkedin className="h-3.5 w-3.5" />
                    </a>
                    <a
                      href={member.social.twitter}
                      aria-label={`${member.name} Twitter`}
                      className="h-8 w-8 rounded-full bg-black/50 flex items-center justify-center text-offwhite hover:text-orange"
                    >
                      <Twitter className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
                <h3 className="font-heading text-base md:text-lg font-semibold text-offwhite">
                  {member.name}
                </h3>
                <p className="text-xs md:text-sm text-offwhite/50">
                  {member.role}
                </p>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
