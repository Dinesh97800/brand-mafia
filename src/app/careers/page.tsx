import { generateSEO, generateBreadcrumbSchema } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageTransition";
import { FadeUp } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { careers } from "@/data/site";

export const metadata = generateSEO({
  title: "Careers",
  description:
    "Join Brand Mafia — work with a team of growth obsessives building brands that dominate. View open positions.",
  path: "/careers",
});

export default function CareersPage() {
  const breadcrumb = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Careers", url: "/careers" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <PageHero
        title="Join the Mafia"
        subtitle="We're always looking for exceptional talent who share our obsession with growth."
      />

      <section className="section-padding">
        <div className="container-custom max-w-3xl space-y-4">
          {careers.map((job, i) => (
            <FadeUp key={job.title} delay={i * 0.1}>
              <div className="glass rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:shadow-[0_0_30px_rgba(240,87,7,0.08)] transition-all">
                <div>
                  <h2 className="font-heading text-lg font-semibold text-offwhite mb-1">
                    {job.title}
                  </h2>
                  <div className="flex gap-4 text-sm text-offwhite/50">
                    <span>{job.location}</span>
                    <span>{job.type}</span>
                  </div>
                </div>
                <Button href="/contact" variant="secondary" size="sm">
                  Apply Now
                </Button>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>
    </>
  );
}
