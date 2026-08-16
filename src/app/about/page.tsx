import { generateSEO, generateBreadcrumbSchema } from "@/lib/seo";
import { AboutHero } from "@/components/sections/about/AboutHero";
import { AboutJourney } from "@/components/sections/about/AboutJourney";
import { AboutApproach } from "@/components/sections/about/AboutApproach";
import { AboutWhyWorkWithUs } from "@/components/sections/about/AboutWhyWorkWithUs";

export const metadata = generateSEO({
  title: "About Us",
  description:
    "Brand Mafia is a team of creators and entrepreneurs who've built real businesses from the ground up — and we build your brand the same way.",
  path: "/about",
});

export default function AboutPage() {
  const breadcrumb = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "About", url: "/about" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <AboutHero />
      <AboutJourney />
      <AboutApproach />
      <AboutWhyWorkWithUs />
    </>
  );
}
