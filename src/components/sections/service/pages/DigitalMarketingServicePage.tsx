"use client";

import type { Service } from "@/data/services";
import { ServiceHero } from "../shared/ServiceHero";
import { ServiceProof } from "../shared/ServiceProof";
import { ServiceRelated } from "../shared/ServiceRelated";
import { ServiceCta } from "../shared/ServiceCta";
import { DigitalMarketingEngine } from "../visuals/DigitalMarketingEngine";

export function DigitalMarketingServicePage({
  service,
}: {
  service: Service;
}) {
  return (
    <article>
      <ServiceHero
        label="Digital Marketing"
        image={service.image}
        imageAlt={service.title}
        layout="wide"
        title={
          <>
            One Strategy.{" "}
            <span className="text-orange">Every Growth Channel.</span>
          </>
        }
        description="This is the umbrella. Search, content, social, paid, email, and conversion — planned as one system so they stop competing for the same budget."
        visual={<DigitalMarketingEngine />}
      />

      <section className="px-4 py-16 sm:px-6 md:py-24 lg:px-8 xl:px-16">
        <div className="container-custom">
          <h2 className="max-w-3xl font-heading text-3xl font-bold leading-tight text-offwhite md:text-5xl">
            Channels shouldn&apos;t work in silos
          </h2>
          <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-16">
            <p className="text-lg leading-relaxed text-offwhite/55">
              An SEO page that does not match the ad. A social calendar that
              ignores the offer. An email list that never sees the campaign.
              That is how brands pay twice for the same customer.
            </p>
            <p className="text-offwhite/50">
              We start with the decision you need someone to make. Then we
              assign each channel a job: create demand, capture it, recover it,
              or keep the relationship alive.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 lg:px-8 xl:px-16">
        <div className="container-custom">
          <p className="font-heading text-xs uppercase tracking-[0.3em] text-orange">
            The mix
          </p>
          <div className="mt-8 divide-y divide-white/10">
            {[
              ["SEO", "Be findable when intent is already there."],
              ["Content", "Give people a reason to trust you before they buy."],
              ["Social", "Stay present between purchases."],
              ["Paid media", "Buy attention only where it can convert."],
              ["Email", "Talk to people you already earned."],
              ["Conversion", "Make the next step obvious on every surface."],
            ].map(([title, copy], i) => (
              <div
                key={title}
                className="grid gap-2 py-6 md:grid-cols-[80px_200px_1fr] md:items-baseline"
              >
                <span className="font-heading text-xs text-offwhite/30">
                  0{i + 1}
                </span>
                <h3 className="font-heading text-xl font-bold text-offwhite">
                  {title}
                </h3>
                <p className="text-offwhite/50">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 lg:px-8 xl:px-16">
        <div className="container-custom lg:flex lg:items-start lg:gap-20">
          <h2 className="mb-10 max-w-xs font-heading text-3xl font-bold text-offwhite lg:sticky lg:top-28 lg:mb-0">
            How the work actually runs
          </h2>
          <ol className="flex-1 space-y-12">
            {service.process.map((step) => (
              <li key={step.title}>
                <h3 className="font-heading text-2xl font-bold text-orange">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-md text-offwhite/55">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8 xl:px-16">
        <div className="container-custom grid gap-12 md:grid-cols-2">
          <ul className="space-y-3 text-offwhite/60">
            <li className="font-heading text-sm uppercase tracking-[0.2em] text-orange">
              Included
            </li>
            {service.includes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <blockquote className="self-end border-l-2 border-orange pl-6">
            <p className="font-heading text-2xl font-semibold leading-snug text-offwhite md:text-3xl">
              {service.quote}
            </p>
          </blockquote>
        </div>
      </section>

      <ServiceProof
        heading="When the channels share a plan"
        projectIds={["primefit-ads", "swiftpay-growth", "auraskin-social"]}
      />
      <ServiceRelated service={service} />
      <ServiceCta
        variant="plane"
        title={
          <>
            Ready to run one plan —{" "}
            <span className="text-orange">not six vendors?</span>
          </>
        }
      />
    </article>
  );
}
