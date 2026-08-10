import { generateSEO, generateBreadcrumbSchema } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageTransition";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ContactSection } from "@/components/sections/ContactSection";

export const metadata = generateSEO({
  title: "Portfolio",
  description:
    "View Brand Mafia's portfolio of premium digital marketing projects — web design, branding, SEO, paid ads, and social media campaigns.",
  path: "/portfolio",
});

export default function PortfolioPage() {
  const breadcrumb = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Portfolio", url: "/portfolio" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <PageHero
        title="Our Work"
        subtitle="Case studies and projects from brands we've helped dominate."
      />
      <ProjectsSection />
      <ContactSection />
    </>
  );
}
