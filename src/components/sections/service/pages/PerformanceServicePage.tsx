"use client";

import type { Service } from "@/data/services";
import { ServiceHero } from "../shared/ServiceHero";
import { ServiceProof } from "../shared/ServiceProof";
import { ServiceRelated } from "../shared/ServiceRelated";
import { ServiceCta } from "../shared/ServiceCta";
import { PerformanceFunnel } from "../visuals/PerformanceFunnel";

export function PerformanceServicePage({ service }: { service: Service }) {
  return (
    <article>
      <ServiceHero
        label="Performance Marketing"
        layout="background"
        image={service.image}
        imageAlt={service.title}
        title={
          <>
            Every Dollar Should{" "}
            <span className="text-orange">Have a Job.</span>
          </>
        }
        description="Clicks are easy to buy. Profitable customers are harder. We optimize for the second one."
        trust={[
          { label: "Spend" },
          { label: "Campaigns" },
          { label: "Leads / Purchases" },
          { label: "ROAS" },
        ]}
      />

      <section className="px-4 pt-8 sm:px-6 lg:px-8 xl:px-16">
        <div className="container-custom">
          <PerformanceFunnel />
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 md:py-24 lg:px-8 xl:px-16">
        <div className="container-custom">
          <h2 className="max-w-2xl font-heading text-4xl font-bold leading-tight text-offwhite md:text-5xl">
            We don&apos;t optimize for clicks. We optimize for business.
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {["If we cannot measure the sale, we will not scale the spend.", "Creative, offer, and page get judged together.", "Losers lose budget. Sentiment does not get a vote."].map(
              (line) => (
                <p key={line} className="border-t border-orange/40 pt-5 text-offwhite/55">
                  {line}
                </p>
              )
            )}
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-8 xl:px-16">
        <div className="container-custom space-y-10">
          {service.process.map((step, i) => (
            <div
              key={step.title}
              className="flex flex-col gap-2 border-b border-white/10 pb-8 md:flex-row md:items-baseline md:gap-10"
            >
              <span className="font-heading text-5xl font-bold text-white/10">
                0{i + 1}
              </span>
              <div>
                <h3 className="font-heading text-2xl font-bold text-offwhite">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-lg text-offwhite/50">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <ServiceProof
        heading="Paid work, measured like a business"
        projectIds={["primefit-ads", "swiftpay-growth"]}
      />
      <ServiceRelated service={service} />
      <ServiceCta
        title={
          <>
            Ready to make ad spend{" "}
            <span className="text-orange">work harder?</span>
          </>
        }
      />
    </article>
  );
}
