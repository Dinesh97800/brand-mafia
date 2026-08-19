"use client";

import type { Service } from "@/data/services";
import { ServiceHero } from "../shared/ServiceHero";
import { ServiceProof } from "../shared/ServiceProof";
import { ServiceRelated } from "../shared/ServiceRelated";
import { ServiceCta } from "../shared/ServiceCta";
import { WebsiteBuildVisual } from "../visuals/WebsiteBuildVisual";

export function WebsiteServicePage({ service }: { service: Service }) {
  return (
    <article>
      <ServiceHero
        label="Website Development"
        layout="background"
        image={service.image}
        imageAlt={service.title}
        title={
          <>
            Websites Built to Convert,{" "}
            <span className="text-orange">Not Just Exist.</span>
          </>
        }
        description="Your website has one job: make the next step obvious. We design and build for that — speed, clarity, and a path people can finish on their phone."
      />

      <section className="px-4 py-16 sm:px-6 md:py-24 lg:px-8 xl:px-16">
        <div className="container-custom grid items-center gap-12 
        ">
          {/* // lg:grid-cols-[0.9fr_1.1fr] */}
          <div>
            <h2 className="font-heading text-4xl font-bold text-offwhite md:text-5xl">
              From wireframe to working product
            </h2>
            <ol className="mt-12 grid gap-8 sm:grid-cols-5">
              {["Strategy", "Wireframe", "UI", "Development", "Launch"].map(
                (step, i) => (
                  <li key={step}>
                    <span className="font-heading text-xs text-orange">
                      0{i + 1}
                    </span>
                    <p className="mt-2 font-heading text-xl font-bold text-offwhite">
                      {step}
                    </p>
                  </li>
                )
              )}
            </ol>
          </div>
          {/* <WebsiteBuildVisual /> */}
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-8 xl:px-16">
        <div className="container-custom grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:items-start">
          <div className="space-y-8">
            {service.pillars.map((pillar) => (
              <div key={pillar.title}>
                <h3 className="font-heading text-2xl font-bold text-offwhite">
                  {pillar.title}
                </h3>
                <p className="mt-2 max-w-md text-offwhite/50">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
          <blockquote className="border-l-2 border-orange pl-5 font-heading text-2xl text-offwhite">
            {service.quote}
          </blockquote>
        </div>
      </section>

      <ServiceProof heading="Interfaces built to do a job" projectIds={["novalabs-web", "techvault-seo"]} />
      <ServiceRelated service={service} />
      <ServiceCta
        variant="frame"
        title={
          <>
            Ready to build a website that{" "}
            <span className="text-orange">works harder?</span>
          </>
        }
      />
    </article>
  );
}
