import { generateSEO, generateBreadcrumbSchema } from "@/lib/seo";
import { BlogHero } from "@/components/sections/blog/BlogHero";
import { BlogPageContent } from "@/components/sections/blog/BlogPageContent";

export const metadata = generateSEO({
  title: "Blog — Insights That Drive Growth",
  description:
    "Explore expert articles on digital marketing, SEO, branding, and growth strategies to help your business thrive in a competitive landscape.",
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
      <BlogHero />
      <BlogPageContent />
    </>
  );
}
