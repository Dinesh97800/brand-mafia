"use client";

import type { Service } from "@/data/services";
import { ServiceHero } from "../shared/ServiceHero";
import { ServiceProof } from "../shared/ServiceProof";
import { ServiceRelated } from "../shared/ServiceRelated";
import { ServiceCta } from "../shared/ServiceCta";
import { EcommerceJourney } from "../visuals/EcommerceJourney";

export function EcommerceSeoServicePage({ service }: { service: Service }) {
  return (
    <article>
      <ServiceHero
        label="E-commerce SEO"
        layout="background"
        image={service.image}
        imageAlt={service.title}
        title={
          <>
            Turn Product Searches{" "}
            <span className="text-orange">Into Sales.</span>
          </>
        }
        description="Category rankings. Product visibility. A store Google can crawl and a customer can actually check out of."
      />

      <section className="px-4 pt-8 sm:px-6 lg:px-8 xl:px-16">
        <div className="container-custom">
          <EcommerceJourney />
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 md:py-24 lg:px-8 xl:px-16">
        <div className="container-custom max-w-3xl">
          <h2 className="font-heading text-4xl font-bold text-offwhite md:text-5xl">
            Your catalogue is a search asset
          </h2>
          <p className="mt-6 text-lg text-offwhite/55">
            Most stores treat collections like folders. We treat them like
            landing pages — the ones that sit between a search and a cart.
          </p>
          <p className="mt-4 text-offwhite/45">
            Faceted navigation, duplicate SKUs, and thin tag pages eat crawl
            budget. We clean the map so money pages can rank.
          </p>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-8 xl:px-16">
        <div className="container-custom grid gap-12 md:grid-cols-[200px_1fr]">
          <p className="font-heading text-xs uppercase tracking-[0.28em] text-orange">
            Store work
          </p>
          <div className="space-y-8">
            {service.pillars.map((pillar) => (
              <div key={pillar.title}>
                <h3 className="font-heading text-2xl font-bold text-offwhite">
                  {pillar.title}
                </h3>
                <p className="mt-2 max-w-xl text-offwhite/50">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 lg:px-8 xl:px-16">
        <div className="container-custom grid gap-10 lg:grid-cols-2">
          <ul className="space-y-3 text-offwhite/60">
            {service.includes.map((item) => (
              <li key={item} className="border-b border-white/10 pb-3">
                {item}
              </li>
            ))}
          </ul>
          <p className="self-end font-heading text-2xl leading-snug text-offwhite md:text-3xl">
            {service.quote}
          </p>
        </div>
      </section>

      <ServiceProof heading="Stores that sell from search" projectIds={["novalabs-web", "luxora-rebrand"]} />
      <ServiceRelated service={service} />
      <ServiceCta
        title={
          <>
            Ready to turn search into{" "}
            <span className="text-orange">sales?</span>
          </>
        }
      />
    </article>
  );
}
