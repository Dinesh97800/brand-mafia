import { generateSEO, generateBreadcrumbSchema } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageTransition";
import { PricingSection } from "@/components/sections/PricingSection";
import { WhyChooseSection } from "@/components/sections/WhyChooseSection";
import { SolutionsSection } from "@/components/sections/SolutionsSection";
import { ContactSection } from "@/components/sections/ContactSection";

export const metadata = generateSEO({
  title: "Digital Marketing Packages",
  description:
    "Transparent digital marketing packages built to generate leads and sales. Starter Growth, Business Growth, and Scale & Dominate plans for every stage of your business.",
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
        title="Built to Dominate"
        subtitle="Digital marketing packages that help businesses generate more leads, increase sales, and dominate their market. No hidden fees."
      />
      <WhyChooseSection />
      <PricingSection />
      <SolutionsSection />
      <ContactSection />
    </>
  );
}
