import { generateSEO, generateBreadcrumbSchema } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageTransition";
import { FadeUp } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { stats, siteConfig } from "@/data/site";

export const metadata = generateSEO({
  title: "About Us",
  description:
    "Learn about Brand Mafia — a premium digital marketing agency building brands that dominate through SEO, paid ads, and creative strategy.",
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
      <PageHero
        title="We Are Brand Mafia"
        subtitle="A collective of growth obsessives, creative rebels, and data nerds on a mission to build brands that dominate."
      />

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeUp>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-offwhite mb-6">
                Not Your Average Agency
              </h2>
              <div className="space-y-4 text-offwhite/60 leading-relaxed">
                <p>
                  Brand Mafia was born from a simple belief: marketing should
                  drive measurable growth, not vanity metrics. We combine
                  performance marketing precision with award-winning creative to
                  deliver results that speak for themselves.
                </p>
                <p>
                  From scrappy startups to enterprise brands, we&apos;ve helped
                  over 200 businesses transform their digital presence and
                  dominate their markets.
                </p>
              </div>
              <Button href={siteConfig.calendly} external className="mt-8" magnetic>
                Work With Us
              </Button>
            </FadeUp>

            <FadeUp delay={0.2}>
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="glass rounded-2xl p-6 text-center">
                    <p className="font-heading text-3xl font-bold text-orange">
                      {stat.value}
                      {stat.suffix}
                    </p>
                    <p className="text-sm text-offwhite/50 mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>
    </>
  );
}
