"use client";

import type { Service } from "@/data/services";
import { ServiceHero } from "../shared/ServiceHero";
import { ServiceRelated } from "../shared/ServiceRelated";
import { ServiceCta } from "../shared/ServiceCta";
import { VideoTimeline } from "../visuals/VideoTimeline";

export function VideoServicePage({ service }: { service: Service }) {
  return (
    <article>
      <ServiceHero
        label="Video Production"
        layout="background"
        image={service.image}
        imageAlt={service.title}
        title={
          <>
            Stories Designed to{" "}
            <span className="text-orange">Stop the Scroll.</span>
          </>
        }
        description="Great video earns the next three seconds. Then it has to do a job in the campaign — hunger, trust, a booking, a memory."
      />

      <section className="px-4 pt-8 sm:px-6 lg:px-8 xl:px-16">
        <div className="container-custom">
          <VideoTimeline />
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 md:py-24 lg:px-8 xl:px-16">
        <div className="container-custom grid gap-12 lg:grid-cols-2">
          <h2 className="font-heading text-4xl font-bold text-offwhite md:text-5xl">
            From idea to final frame
          </h2>
          <p className="self-end text-lg text-offwhite/55">
            Brief. Concept. Pre-production. Shoot. Edit. Delivery. The hero
            piece and the cutdowns are planned together so the campaign does
            not inherit leftovers.
          </p>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-8 xl:px-16">
        <div className="container-custom">
          {service.pillars.map((pillar, i) => (
            <div
              key={pillar.title}
              className="grid gap-3 border-t border-white/10 py-8 md:grid-cols-[40px_1fr]"
            >
              <span className="font-heading text-orange">0{i + 1}</span>
              <div>
                <h3 className="font-heading text-2xl font-bold text-offwhite">
                  {pillar.title}
                </h3>
                <p className="mt-2 max-w-xl text-offwhite/50">
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 lg:px-8 xl:px-16">
        <div className="container-custom">
          <p className="max-w-2xl font-heading text-3xl font-semibold text-offwhite">
            {service.quote}
          </p>
        </div>
      </section>

      <ServiceRelated service={service} />
      <ServiceCta
        variant="frame"
        title={
          <>
            Ready to put your brand{" "}
            <span className="text-orange">in motion?</span>
          </>
        }
      />
    </article>
  );
}
