import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { generateSEO, generateBreadcrumbSchema } from "@/lib/seo";
import { blogPosts, siteConfig } from "@/data/site";
import { BlurRevealText } from "@/components/ui/BlurRevealText";
import { Button } from "@/components/ui/Button";

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
        <div className="relative h-[40vh] overflow-hidden md:h-[50vh]">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </div>

        <div className="section-padding">
          <div className="container-custom max-w-3xl">
            <Link
              href="/blog"
              className="mb-8 inline-flex items-center gap-2 text-sm text-offwhite/60 transition-colors hover:text-orange"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>

            <div className="mb-4 flex items-center gap-3">
              <span className="font-heading text-xs uppercase tracking-wider text-orange">
                {post.category}
              </span>
              <span className="text-xs text-offwhite/40">{post.date}</span>
            </div>

            <BlurRevealText
              as="h1"
              trigger="mount"
              text={post.title}
              className="mb-8 font-heading text-3xl font-bold text-offwhite md:text-4xl"
            />

            <div className="prose prose-invert max-w-none">
              <p className="mb-8 text-lg leading-relaxed text-offwhite/75">
                {post.excerpt}
              </p>

              {post.content.map((paragraph) => (
                <p
                  key={paragraph}
                  className="mb-5 leading-relaxed text-offwhite/60"
                >
                  {paragraph}
                </p>
              ))}

              {post.quote && (
                <blockquote className="my-10 rounded-2xl border border-orange/20 bg-orange/5 px-6 py-5 font-heading text-lg font-semibold leading-relaxed text-offwhite md:text-xl">
                  {post.quote}
                </blockquote>
              )}
            </div>

            <div className="mt-12 border-t border-white/10 pt-10">
              <p className="mb-6 text-offwhite/60">
                Ready to put these insights into action for your business?
              </p>
              <Button href={siteConfig.calendly} external magnetic>
                Book a Free Strategy Call
              </Button>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
