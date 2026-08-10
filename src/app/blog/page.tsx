import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { generateSEO, generateBreadcrumbSchema } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageTransition";
import { FadeUp } from "@/components/ui/SectionHeading";
import { blogPosts } from "@/data/site";

export const metadata = generateSEO({
  title: "Blog",
  description:
    "Growth insights, SEO strategies, and marketing tips from the Brand Mafia team.",
  path: "/blog",
});

export default function BlogPage() {
  const breadcrumb = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <PageHero
        title="Growth Insights"
        subtitle="Strategies, trends, and tactics from our team of marketing experts."
      />

      <section className="section-padding">
        <div className="container-custom grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, i) => (
            <FadeUp key={post.slug} delay={i * 0.1}>
              <Link href={`/blog/${post.slug}`}>
                <article className="group glass rounded-2xl overflow-hidden hover:shadow-[0_0_40px_rgba(240,87,7,0.1)] transition-all duration-500">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-heading uppercase tracking-wider text-orange">
                        {post.category}
                      </span>
                      <span className="text-xs text-offwhite/40">{post.date}</span>
                    </div>
                    <h2 className="font-heading text-lg font-semibold text-offwhite mb-2 group-hover:text-orange transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-sm text-offwhite/50 mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-1 text-orange text-sm">
                      Read More
                      <ArrowUpRight className="h-3.5 w-3.5" />
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
