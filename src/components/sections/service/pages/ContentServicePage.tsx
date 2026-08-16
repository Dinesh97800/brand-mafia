"use client";

import type { Service } from "@/data/services";
import { LocalImage } from "@/components/ui/LocalImage";
import { ServiceHero } from "../shared/ServiceHero";
import { ServiceRelated } from "../shared/ServiceRelated";
import { ServiceCta } from "../shared/ServiceCta";
import { ContentEcosystem } from "../visuals/ContentEcosystem";

export function ContentServicePage({ service }: { service: Service }) {
  return (
    <article>
      <ServiceHero
        label="Content Marketing"
        image={service.image}
        imageAlt={service.title}
        layout="editorial"
        title={
          <>
            Create Content{" "}
            <span className="text-orange">People Remember.</span>
          </>
        }
        description="Volume is easy. A library that still works six months later is harder. We write and film for authority — then cut it into the channels that need it."
        visual={
          <p className="max-w-sm text-sm leading-relaxed text-offwhite/40 lg:pt-8">
            Research → Story → Distribution → Search → Authority
          </p>
        }
      />

      <section className="px-4 py-8 sm:px-6 lg:px-8 xl:px-16">
        <div className="container-custom">
          <ContentEcosystem />
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 md:py-24 lg:px-8 xl:px-16">
        <div className="container-custom">
          <h2 className="font-heading text-4xl font-bold text-offwhite md:text-5xl">
            Content should compound
          </h2>
          <p className="mt-6 max-w-xl text-lg text-offwhite/55">
            One idea becomes an article, a film, a sequence of posts, an email,
            and a page that can rank. That is how a team stops starting from
            zero every Monday.
          </p>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-8 xl:px-16">
        <div className="container-custom grid items-stretch gap-12 lg:grid-cols-[0.7fr_1.3fr]">
          <div className="relative min-h-[280px] overflow-hidden rounded-2xl border border-white/10 lg:min-h-0">
            <LocalImage
              src="/images/services/content-compound.webp"
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />
            <h3 className="relative z-10 p-6 font-heading text-sm uppercase tracking-[0.28em] text-orange">
              How we write
            </h3>
          </div>
          <div className="space-y-10">
            {service.pillars.map((pillar) => (
              <div key={pillar.title} className="max-w-xl">
                <h4 className="font-heading text-2xl font-bold text-offwhite">
                  {pillar.title}
                </h4>
                <p className="mt-2 text-offwhite/50">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 lg:px-8 xl:px-16">
        <div className="container-custom">
          <blockquote className="max-w-3xl font-heading text-3xl font-semibold leading-tight text-offwhite md:text-4xl">
            {service.quote}
          </blockquote>
        </div>
      </section>

      <ServiceRelated service={service} />
      <ServiceCta
        title={
          <>
            Ready to create something{" "}
            <span className="text-orange">worth remembering?</span>
          </>
        }
      />
    </article>
  );
}
