"use client";

import type { Service } from "@/data/services";
import { ServiceHero } from "../shared/ServiceHero";
import { ServiceProof } from "../shared/ServiceProof";
import { ServiceRelated } from "../shared/ServiceRelated";
import { ServiceCta } from "../shared/ServiceCta";
import { BrandIdentitySystem } from "../visuals/BrandIdentitySystem";

export function BrandServicePage({ service }: { service: Service }) {
  return (
    <article>
      <ServiceHero
        label="Brand Identity"
        image={service.image}
        imageAlt={service.title}
        layout="background"
        title={
          <>
            Build a Brand People Recognize{" "}
            <span className="text-orange">Before They Read the Name.</span>
          </>
        }
        description="A logo can't fix weak positioning. Identity is type, color, voice, and the way the brand shows up on a menu, a box, a site, and a story."
      />

      <section className="px-4 pb-8 sm:px-6 lg:px-8 xl:px-16">
        <div className="container-custom">
          <BrandIdentitySystem />
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 md:py-24 lg:px-8 xl:px-16">
        <div className="container-custom grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <h2 className="font-heading text-4xl font-bold leading-tight text-offwhite md:text-6xl">
            A logo is only one piece
          </h2>
          <p className="text-offwhite/55">
            Positioning. Identity. Typography. Color. Voice. Applications. If
            those do not hold together, the mark is just decoration.
          </p>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-8 xl:px-16">
        <div className="container-custom space-y-12">
          {service.pillars.map((pillar) => (
            <div key={pillar.title} className="max-w-xl">
              <h3 className="font-heading text-2xl font-bold text-offwhite">
                {pillar.title}
              </h3>
              <p className="mt-2 text-offwhite/50">{pillar.description}</p>
            </div>
          ))}
        </div>
      </section>

      <ServiceProof heading="Identity that holds in the wild" projectIds={["luxora-rebrand", "auraskin-social"]} />
      <ServiceRelated service={service} />
      <ServiceCta
        title={
          <>
            Ready to build a brand people{" "}
            <span className="text-orange">remember?</span>
          </>
        }
      />
    </article>
  );
}
