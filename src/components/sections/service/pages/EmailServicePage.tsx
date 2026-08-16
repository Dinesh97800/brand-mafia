"use client";

import type { Service } from "@/data/services";
import { ServiceHero } from "../shared/ServiceHero";
import { ServiceRelated } from "../shared/ServiceRelated";
import { ServiceCta } from "../shared/ServiceCta";
import { EmailLifecycle } from "../visuals/EmailLifecycle";

export function EmailServicePage({ service }: { service: Service }) {
  return (
    <article>
      <ServiceHero
        label="Email Marketing"
        image={service.image}
        imageAlt={service.title}
        layout="wide"
        title={
          <>
            Turn Your Inbox Into a{" "}
            <span className="text-orange">Revenue Channel.</span>
          </>
        }
        description="Welcome sequences. Lifecycle. Abandoned carts. Retention. The conversation after the first sale — not another blast."
        visual={<EmailLifecycle />}
      />

      <section className="px-4 py-16 sm:px-6 md:py-24 lg:px-8 xl:px-16">
        <div className="container-custom grid gap-12 lg:grid-cols-2">
          <h2 className="font-heading text-4xl font-bold leading-tight text-offwhite md:text-5xl">
            The customer journey doesn&apos;t end at the first sale
          </h2>
          <div className="lg:pt-8">
            <p className="text-lg text-offwhite/55">
              You already paid to meet these people. Email is how you stay in
              the relationship without buying them again.
            </p>
            <p className="mt-4 text-offwhite/45">
              We write like a host, not a megaphone. Useful first. Commercial
              when it has earned the right.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-8 xl:px-16">
        <div className="container-custom">
          <ol className="space-y-8">
            {service.process.map((step, i) => (
              <li
                key={step.title}
                className="grid gap-2 border-l-2 border-orange/50 pl-5 md:grid-cols-[180px_1fr]"
              >
                <span className="font-heading text-orange">0{i + 1} {step.title}</span>
                <p className="text-offwhite/55">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 lg:px-8 xl:px-16">
        <div className="container-custom grid gap-8 md:grid-cols-2">
          <ul className="space-y-2 text-sm text-offwhite/55">
            {service.includes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <ul className="space-y-4 font-heading text-xl text-offwhite">
            {service.outcomes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <ServiceRelated service={service} />
      <ServiceCta
        variant="plane"
        title={
          <>
            Ready to turn subscribers into{" "}
            <span className="text-orange">customers?</span>
          </>
        }
      />
    </article>
  );
}
