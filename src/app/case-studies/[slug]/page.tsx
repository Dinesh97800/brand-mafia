import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { generateSEO, generateBreadcrumbSchema } from "@/lib/seo";
import { projects, siteConfig } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { BlurRevealText } from "@/components/ui/BlurRevealText";
import { getCraftedCaseStudyPage } from "@/components/sections/case-study/crafted-pages";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);
  if (!project) return {};

  return generateSEO({
    title: `${project.title} Case Study`,
    description: project.description,
    path: `/case-studies/${slug}`,
    image: project.image,
  });
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);

  if (!project) notFound();

  const CraftedPage = getCraftedCaseStudyPage(slug);
  const breadcrumb = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Case Studies", url: "/case-studies" },
    { name: project.title, url: `/case-studies/${slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      {CraftedPage ? (
        <CraftedPage />
      ) : (
        <article>
        <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 container-custom section-padding pb-12">
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 text-sm text-offwhite/60 hover:text-orange transition-colors mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Case Studies
            </Link>
            <span className="block text-xs font-heading uppercase tracking-wider text-orange mb-2">
              {project.category}
            </span>
            <BlurRevealText
              as="h1"
              trigger="mount"
              text={project.title}
              className="font-heading text-3xl md:text-5xl font-bold text-offwhite"
            />
          </div>
        </div>

        <div className="section-padding">
          <div className="container-custom max-w-3xl">
            <p className="text-lg text-offwhite/70 leading-relaxed mb-12">
              {project.description}
            </p>

            <BlurRevealText
              as="h2"
              trigger="inView"
              text="Key Results"
              className="font-heading text-2xl font-bold text-offwhite mb-6"
            />
            <div className="grid sm:grid-cols-2 gap-4 mb-12">
              {project.results.map((result) => (
                <div key={result} className="glass rounded-xl p-6">
                  <p className="font-heading text-lg font-semibold text-orange">
                    {result}
                  </p>
                </div>
              ))}
            </div>

            <div className="glass-strong rounded-2xl p-8 text-center">
              <h3 className="font-heading text-xl font-bold text-offwhite mb-3">
                Ready for Similar Results?
              </h3>
              <p className="text-offwhite/60 mb-6">
                Let&apos;s build a custom strategy for your brand.
              </p>
              <Button href={siteConfig.calendly} external magnetic>
                Get Free Strategy Call
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        </article>
      )}
    </>
  );
}
