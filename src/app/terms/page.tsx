import { generateSEO } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageTransition";

export const metadata = generateSEO({
  title: "Terms of Service",
  description: "Brand Mafia terms of service — the terms governing use of our website and services.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <PageHero title="Terms of Service" />
      <section className="section-padding">
        <div className="container-custom max-w-3xl prose prose-invert">
          <p className="text-offwhite/60 leading-relaxed mb-4">
            Last updated: August 2026
          </p>
          <h2 className="font-heading text-xl font-bold text-offwhite mt-8 mb-4">
            Acceptance of Terms
          </h2>
          <p className="text-offwhite/60 leading-relaxed mb-4">
            By accessing and using the Brand Mafia website and services, you agree
            to be bound by these Terms of Service.
          </p>
          <h2 className="font-heading text-xl font-bold text-offwhite mt-8 mb-4">
            Services
          </h2>
          <p className="text-offwhite/60 leading-relaxed mb-4">
            Brand Mafia provides digital marketing services including SEO, paid
            advertising, branding, web development, and related services. Specific
            terms for each engagement are outlined in individual service
            agreements.
          </p>
          <h2 className="font-heading text-xl font-bold text-offwhite mt-8 mb-4">
            Contact
          </h2>
          <p className="text-offwhite/60 leading-relaxed">
            For questions about these terms, contact us at info@brandmafia.co.
          </p>
        </div>
      </section>
    </>
  );
}
