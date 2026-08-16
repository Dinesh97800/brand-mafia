"use client";

import type { Service } from "@/data/services";
import { ServiceHero } from "../shared/ServiceHero";
import { ServiceProof } from "../shared/ServiceProof";
import { ServiceRelated } from "../shared/ServiceRelated";
import { ServiceCta } from "../shared/ServiceCta";
import { SEORankingVisual } from "../visuals/SEORankingVisual";

export function SeoServicePage({ service }: { service: Service }) {
  return (
    <article>
      <ServiceHero
        label="SEO"
        image={service.image}
        imageAlt={service.title}
        title={
          <>
            Get Found. Get Chosen.{" "}
            <span className="text-orange">Grow Organically.</span>
          </>
        }
        description="Search is crowded. When customers look for what you sell, your brand should be one of the businesses worth clicking — and worth trusting after they do."
        visual={<SEORankingVisual />}
        trust={[
          { label: "Technical SEO" },
          { label: "Content" },
          { label: "Authority" },
          { label: "Qualified traffic" },
        ]}
      />

      <section className="px-4 py-16 sm:px-6 md:py-24 lg:px-8 xl:px-16">
        <div className="container-custom grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <p className="max-w-md text-base leading-relaxed text-offwhite/55">
            We do not chase every keyword in the category. We map how people
            actually search — near me, best, open now, the problem they typed at
            9pm — and build pages that can win that click.
          </p>
          <h2 className="font-heading text-4xl font-bold leading-[1.05] text-offwhite md:text-6xl">
            Ranking isn&apos;t
            <br />
            the end goal.
            <span className="mt-3 block text-orange">Revenue is.</span>
          </h2>
        </div>
      </section>

      <section className="px-4 pb-8 sm:px-6 lg:px-8 xl:px-16">
        <div className="container-custom border-t border-white/10 pt-14 md:pt-20">
          <p className="font-heading text-xs uppercase tracking-[0.3em] text-orange">
            How we think
          </p>
          <div className="mt-10 space-y-10 md:space-y-14">
            {service.pillars.map((pillar, i) => (
              <div
                key={pillar.title}
                className="grid gap-3 border-b border-white/10 pb-10 md:grid-cols-[140px_1fr_1.2fr] md:gap-8"
              >
                <span className="font-heading text-sm text-offwhite/30">
                  0{i + 1}
                </span>
                <h3 className="font-heading text-2xl font-bold text-offwhite">
                  {pillar.title}
                </h3>
                <p className="text-offwhite/55">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 md:py-28 lg:px-8 xl:px-16">
        <div className="container-custom grid items-start gap-12 lg:grid-cols-[1fr_0.85fr]">
          <div>
            <h2 className="font-heading text-3xl font-bold text-offwhite md:text-5xl">
              Ranking is only half the job
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-offwhite/55">
              Traffic that cannot convert is just a more expensive hobby. We
              pair visibility with pages that make the next step obvious —
              call, book, order, or inquire.
            </p>
            <p className="mt-4 max-w-lg text-offwhite/45">
              That is why SEO sits next to the website, the offer, and the
              proof on the page. A #1 result that confuses people is still a
              loss.
            </p>
          </div>
          <ol className="space-y-6 border-l border-orange/40 pl-6">
            {[
              "Technical SEO",
              "Content that answers the search",
              "Authority you can defend",
              "Rankings on terms that matter",
              "Traffic that can become a customer",
            ].map((step, i) => (
              <li key={step}>
                <span className="font-heading text-xs text-orange">
                  0{i + 1}
                </span>
                <p className="mt-1 font-heading text-xl text-offwhite">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 lg:px-8 xl:px-16">
        <div className="container-custom grid gap-16 lg:grid-cols-2">
          <div>
            <h2 className="font-heading text-2xl font-bold text-offwhite">
              What&apos;s included
            </h2>
            <ul className="mt-6 space-y-3 text-offwhite/60">
              {service.includes.map((item) => (
                <li key={item} className="border-b border-white/5 pb-3">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:pt-16">
            <h2 className="font-heading text-2xl font-bold text-offwhite">
              What you get
            </h2>
            <ul className="mt-6 space-y-6">
              {service.outcomes.map((item) => (
                <li
                  key={item}
                  className="font-heading text-xl leading-snug text-offwhite/80"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <ServiceProof
        heading="See organic work in the wild"
        projectIds={["techvault-seo", "novalabs-web"]}
      />
      <ServiceRelated service={service} />
      <ServiceCta
        title={
          <>
            Ready to get found by the{" "}
            <span className="text-orange">right customers?</span>
          </>
        }
        description="We'll look at how people search for you today — and which pages are actually ready to win the click."
      />
    </article>
  );
}
