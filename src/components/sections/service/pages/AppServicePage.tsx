"use client";

import type { Service } from "@/data/services";
import { ServiceHero } from "../shared/ServiceHero";
import { ServiceRelated } from "../shared/ServiceRelated";
import { ServiceCta } from "../shared/ServiceCta";
import { AppProductFlow } from "../visuals/AppProductFlow";

export function AppServicePage({ service }: { service: Service }) {
  return (
    <article>
      <ServiceHero
        label="App Development"
        layout="background"
        image={service.image}
        imageAlt={service.title}
        title={
          <>
            Ideas Engineered Into Products{" "}
            <span className="text-orange">People Use.</span>
          </>
        }
        description="We start with the job the product has to do in someone's week. Then we design the few screens that matter and leave the rest off the backlog."
      />

      <section className="px-4 pt-8 sm:px-6 lg:px-8 xl:px-16">
        <div className="container-custom">
          <AppProductFlow />
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 md:py-24 lg:px-8 xl:px-16">
        <div className="container-custom max-w-2xl">
          <h2 className="font-heading text-4xl font-bold text-offwhite md:text-5xl">
            Build the right product before building more product
          </h2>
          <p className="mt-6 text-lg text-offwhite/55">
            Feature lists feel productive. They also sink first versions. We
            lock the use case, ship the path, and plan the next honest release
            after real people have used it.
          </p>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-8 xl:px-16">
        <div className="container-custom">
          {service.process.map((step, i) => (
            <div
              key={step.title}
              className="grid gap-3 border-t border-white/10 py-8 md:grid-cols-[80px_200px_1fr]"
            >
              <span className="font-heading text-offwhite/30">0{i + 1}</span>
              <h3 className="font-heading text-xl font-bold text-offwhite">
                {step.title}
              </h3>
              <p className="text-offwhite/50">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      <ServiceRelated service={service} />
      <ServiceCta
        title={
          <>
            Ready to turn the idea into a{" "}
            <span className="text-orange">product?</span>
          </>
        }
      />
    </article>
  );
}
