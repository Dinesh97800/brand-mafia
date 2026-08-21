import { generateSEO, generateBreadcrumbSchema } from "@/lib/seo";
import { PricingPageContent } from "@/components/sections/pricing/PricingPageContent";

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
      <PricingPageContent />
    </>
  );
}
