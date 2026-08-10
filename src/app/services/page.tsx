import { generateSEO, generateBreadcrumbSchema } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageTransition";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ContactSection } from "@/components/sections/ContactSection";

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
      <PageHero
        title="Services That Scale"
        subtitle="Every service engineered for one outcome — market dominance."
      />
      <ServicesSection />
      <ContactSection />
    </>
  );
}
