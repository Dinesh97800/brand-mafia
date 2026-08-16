import { generateSEO, generateBreadcrumbSchema } from "@/lib/seo";
import { ServicesHero } from "@/components/sections/services/ServicesHero";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { ServicesEcosystem } from "@/components/sections/services/ServicesEcosystem";
import { ServicesStats } from "@/components/sections/services/ServicesStats";
import { ServicesFeaturedWork } from "@/components/sections/services/ServicesFeaturedWork";
import { ServicesCta } from "@/components/sections/services/ServicesCta";

export const metadata = generateSEO({
  title: "Services",
  description:
    "Explore Brand Mafia's premium digital marketing services — SEO, Google Ads, Meta Ads, branding, web development, and AI automation.",
  path: "/services",
});

export default function ServicesPage() {
  const breadcrumb = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <ServicesHero />
      <ServicesGrid />
      <ServicesEcosystem />
      <ServicesStats />
      <ServicesFeaturedWork />
      <ServicesCta />
    </>
  );
}
