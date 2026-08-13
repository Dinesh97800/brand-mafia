import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { generateSEO, generateBreadcrumbSchema } from "@/lib/seo";
import { blogPosts } from "@/data/site";
import { BlurRevealText } from "@/components/ui/BlurRevealText";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};

  return generateSEO({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${slug}`,
    image: post.image,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) notFound();

  const breadcrumb = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: post.title, url: `/blog/${slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <article>
        <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
          <Image src={post.image} alt={post.title} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </div>

        <div className="section-padding">
          <div className="container-custom max-w-3xl">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-offwhite/60 hover:text-orange transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-heading uppercase tracking-wider text-orange">
                {post.category}
              </span>
              <span className="text-xs text-offwhite/40">{post.date}</span>
            </div>

            <BlurRevealText
              as="h1"
              trigger="mount"
              text={post.title}
              className="font-heading text-3xl md:text-4xl font-bold text-offwhite mb-8"
            />

            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-offwhite/70 leading-relaxed mb-6">
                {post.excerpt}
              </p>
              <p className="text-offwhite/60 leading-relaxed mb-4">
                In today&apos;s competitive digital landscape, brands that fail to
                adapt get left behind. At Brand Mafia, we&apos;ve developed proven
                frameworks that consistently deliver exceptional results for our
                clients across industries.
              </p>
              <p className="text-offwhite/60 leading-relaxed mb-4">
                Whether you&apos;re looking to dominate search rankings, scale paid
                advertising, or build an unforgettable brand identity, the strategies
                outlined in this article will give you a clear roadmap to success.
              </p>
              <p className="text-offwhite/60 leading-relaxed">
                Ready to put these insights into action? Book a free strategy call
                with our team and let&apos;s build your empire together.
              </p>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
