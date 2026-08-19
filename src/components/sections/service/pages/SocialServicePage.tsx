"use client";

import type { Service } from "@/data/services";
import { ServiceHero } from "../shared/ServiceHero";
import { ServiceProof } from "../shared/ServiceProof";
import { ServiceRelated } from "../shared/ServiceRelated";
import { ServiceCta } from "../shared/ServiceCta";
import { SocialFeed } from "../visuals/SocialFeed";

export function SocialServicePage({ service }: { service: Service }) {
  return (
    <article>
      <ServiceHero
        label="Social Media Marketing"
        layout="background"
        image={service.image}
        imageAlt={service.title}
        title={
          <>
            Turn Attention Into{" "}
            <span className="text-orange">Community.</span>
          </>
        }
        description="Posting every day isn't a strategy. A point of view, a cadence, and creative that sounds like the brand — that is."
      />

      <section className="px-4 pt-8 sm:px-6 lg:px-8 xl:px-16">
        <div className="container-custom">
          <SocialFeed />
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 md:py-24 lg:px-8 xl:px-16">
        <div className="container-custom grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <h2 className="font-heading text-4xl font-bold text-offwhite md:text-6xl">
            Posting isn&apos;t a strategy
          </h2>
          <div>
            <p className="text-lg text-offwhite/55">
              The feed is a room people walk through. We decide what the brand
              is known for in that room — appetite, craft, personality, proof —
              then we show up on a rhythm they can feel.
            </p>
            <p className="mt-4 text-offwhite/45">
              Virality is a bonus. Presence is the job.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-8 xl:px-16">
        <div className="container-custom">
          {service.pillars.map((pillar, i) => (
            <div
              key={pillar.title}
              className={`py-8 md:py-10 ${i === 0 ? "border-t border-white/10" : ""} border-b border-white/10`}
            >
              <h3 className="font-heading text-2xl font-bold text-offwhite">
                {pillar.title}
              </h3>
              <p className="mt-2 max-w-2xl text-offwhite/50">{pillar.description}</p>
            </div>
          ))}
        </div>
      </section>

      <ServiceProof heading="Feeds that feel like the brand" projectIds={["auraskin-social", "luxora-rebrand"]} />
      <ServiceRelated service={service} />
      <ServiceCta
        title={
          <>
            Ready to build a brand people{" "}
            <span className="text-orange">want to follow?</span>
          </>
        }
      />
    </article>
  );
}
