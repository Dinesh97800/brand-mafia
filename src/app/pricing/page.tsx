import { generateSEO, generateBreadcrumbSchema } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageTransition";
import { PricingSection } from "@/components/sections/PricingSection";
import { SolutionsSection } from "@/components/sections/SolutionsSection";
import { ContactSection } from "@/components/sections/ContactSection";

export const metadata = generateSEO({
  title: "Pricing",
  description:
    "Transparent pricing for premium digital marketing services. Starter, Growth, and Enterprise plans to fit every stage of your business.",
  path: "/pricing",
});

export default function PricingPage() {
  const breadcrumb = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Pricing", url: "/pricing" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <PageHero
        title="Invest in Growth"
        subtitle="Choose the plan that matches your ambition. No hidden fees."
      />
      <PricingSection />
      <SolutionsSection />
      <ContactSection />
    </>
  );
}
