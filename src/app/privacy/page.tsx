import { generateSEO } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageTransition";

export const metadata = generateSEO({
  title: "Privacy Policy",
  description: "Brand Mafia privacy policy — how we collect, use, and protect your data.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHero title="Privacy Policy" />
      <section className="section-padding">
        <div className="container-custom max-w-3xl prose prose-invert">
          <p className="text-offwhite/60 leading-relaxed mb-4">
            Last updated: August 2026
          </p>
          <h2 className="font-heading text-xl font-bold text-offwhite mt-8 mb-4">
            Information We Collect
          </h2>
          <p className="text-offwhite/60 leading-relaxed mb-4">
            We collect information you provide directly, such as your name, email
            address, phone number, and any messages you send through our contact
            forms.
          </p>
          <h2 className="font-heading text-xl font-bold text-offwhite mt-8 mb-4">
            How We Use Your Information
          </h2>
          <p className="text-offwhite/60 leading-relaxed mb-4">
            We use the information we collect to respond to your inquiries,
            provide our services, send marketing communications (with your
            consent), and improve our website and services.
          </p>
          <h2 className="font-heading text-xl font-bold text-offwhite mt-8 mb-4">
            Contact Us
          </h2>
          <p className="text-offwhite/60 leading-relaxed">
            If you have questions about this Privacy Policy, please contact us at
            info@brandmafia.co.
          </p>
        </div>
      </section>
    </>
  );
}
