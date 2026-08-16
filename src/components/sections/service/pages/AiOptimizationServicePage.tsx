"use client";

import type { Service } from "@/data/services";
import { ServiceHero } from "../shared/ServiceHero";
import { ServiceRelated } from "../shared/ServiceRelated";
import { ServiceCta } from "../shared/ServiceCta";
import { AIKnowledgeGraph } from "../visuals/AIKnowledgeGraph";

export function AiOptimizationServicePage({ service }: { service: Service }) {
  return (
    <article>
      <ServiceHero
        label="AI Optimization"
        image={service.image}
        imageAlt={service.title}
        title={
          <>
            Be Visible in the Age of{" "}
            <span className="text-orange">AI Search.</span>
          </>
        }
        description="We do not sell guaranteed placement in AI answers. We make your brand easier to understand, cite, and trust as search becomes answer-first."
        visual={<AIKnowledgeGraph />}
      />

      <section className="px-4 py-16 sm:px-6 md:py-24 lg:px-8 xl:px-16">
        <div className="container-custom">
          <h2 className="max-w-2xl font-heading text-4xl font-bold text-offwhite md:text-5xl">
            Search is becoming answer-first
          </h2>
          <p className="mt-6 max-w-xl text-lg text-offwhite/55">
            People still look things up. They often get a summary before a list
            of links. The brands that show up in those answers are the ones
            with a clear public record — not the ones that bought a gimmick.
          </p>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-8 xl:px-16">
        <div className="container-custom grid gap-10 md:grid-cols-2">
          {service.pillars.map((pillar) => (
            <div key={pillar.title} className="border-t border-white/10 pt-6">
              <h3 className="font-heading text-xl font-bold text-offwhite">
                {pillar.title}
              </h3>
              <p className="mt-2 text-offwhite/50">{pillar.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 lg:px-8 xl:px-16">
        <div className="container-custom">
          <p className="max-w-2xl font-heading text-2xl leading-snug text-offwhite md:text-3xl">
            {service.quote}
          </p>
          <ul className="mt-10 max-w-lg space-y-3 text-offwhite/50">
            {service.includes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <ServiceRelated service={service} />
      <ServiceCta
        title={
          <>
            Ready to prepare your brand for{" "}
            <span className="text-orange">AI search?</span>
          </>
        }
        description="No placement guarantees. A clearer, more citable brand — yes."
      />
    </article>
  );
}
