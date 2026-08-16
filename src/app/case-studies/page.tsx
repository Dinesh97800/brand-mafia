import { generateSEO, generateBreadcrumbSchema } from "@/lib/seo";
import { WorkHero } from "@/components/sections/work/WorkHero";
import { CaseStudiesWork } from "@/components/sections/work/CaseStudiesWork";
import { WorkEmpireCta } from "@/components/sections/work/WorkEmpireCta";

export const metadata = generateSEO({
  title: "Case Studies",
  description:
    "Work we can stand behind — case studies from brands Brand Mafia has helped grow through SEO, ads, branding, and product.",
  path: "/case-studies",
});

export default function CaseStudiesPage() {
  const breadcrumb = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Case Studies", url: "/case-studies" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <WorkHero />
      <CaseStudiesWork />
      <WorkEmpireCta />
    </>
  );
}
