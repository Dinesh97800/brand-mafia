import { generateSEO, generateBreadcrumbSchema } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageTransition";
import { FadeUp } from "@/components/ui/SectionHeading";
import { BlurRevealText } from "@/components/ui/BlurRevealText";
import { Button } from "@/components/ui/Button";
import { stats, siteConfig } from "@/data/site";

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
      <PageHero
        title="About Us"
        subtitle="Creators and entrepreneurs who've built real businesses — and build yours the same way."
      />

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeUp>
              <BlurRevealText
                as="h2"
                trigger="inView"
                text="We've Already Done It"
                className="font-heading text-3xl md:text-4xl font-bold text-offwhite mb-6"
              />
              <div className="space-y-4 text-offwhite/60 leading-relaxed">
                <p>
                  We&apos;re a team of creators and entrepreneurs — some who live
                  and breathe content and storytelling, others who&apos;ve already
                  built real, established businesses in our own community from the
                  ground up. Together, that means we don&apos;t just tell you what
                  should work. We&apos;ve already done it.
                </p>
                <p>
                  We&apos;ve built businesses from scratch — sourcing inventory,
                  setting up operations, growing brands from a single idea into
                  something people trust. We&apos;ve taken an existing shop and
                  turned it into a name recognized across the region. We&apos;ve
                  grown creators into recognized personal brands, and shaped the
                  look, story, and feel behind cafés and salons — from the logo on
                  the wall to the content on the feed.
                </p>
                <p>
                  That&apos;s the difference. We don&apos;t just manage your
                  social media. We build brands the same way we built our own —
                  step by step, with real skin in the game.
                </p>
                <p>
                  If you&apos;re starting from nothing or ready to scale to the
                  next level, we&apos;re not here as outside consultants.
                  We&apos;re here as people who&apos;ve built what you&apos;re
                  trying to build.
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
