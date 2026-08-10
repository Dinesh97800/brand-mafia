import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { generateSEO, generateBreadcrumbSchema } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageTransition";
import { FadeUp } from "@/components/ui/SectionHeading";
import { projects } from "@/data/site";

export const metadata = generateSEO({
  title: "Case Studies",
  description:
    "Deep-dive case studies showcasing how Brand Mafia delivers explosive growth through digital marketing.",
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
      <PageHero
        title="Case Studies"
        subtitle="Real results from real brands. See how we deliver dominance."
      />

      <section className="section-padding">
        <div className="container-custom space-y-8">
          {projects.map((project, i) => (
            <FadeUp key={project.id} delay={i * 0.1}>
              <Link href={`/case-studies/${project.id}`}>
                <article className="group grid md:grid-cols-2 gap-8 glass rounded-2xl overflow-hidden hover:shadow-[0_0_40px_rgba(240,87,7,0.1)] transition-all duration-500">
                  <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[300px]">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <span className="text-xs font-heading uppercase tracking-wider text-orange mb-2">
                      {project.category}
                    </span>
                    <h2 className="font-heading text-2xl md:text-3xl font-bold text-offwhite mb-3 group-hover:text-orange transition-colors">
                      {project.title}
                    </h2>
                    <p className="text-offwhite/60 mb-4">{project.description}</p>
                    <ul className="space-y-2 mb-6">
                      {project.results.map((result) => (
                        <li
                          key={result}
                          className="flex items-center gap-2 text-sm text-offwhite/70"
                        >
                          <span className="h-1 w-1 rounded-full bg-orange" />
                          {result}
                        </li>
                      ))}
                    </ul>
                    <span className="inline-flex items-center gap-1 text-orange text-sm font-medium">
                      Read Case Study
                      <ArrowUpRight className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </span>
                  </div>
                </article>
              </Link>
            </FadeUp>
          ))}
        </div>
      </section>
    </>
  );
}
