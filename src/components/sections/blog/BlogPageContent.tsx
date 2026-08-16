"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Mail,
  Search,
  Send,
} from "lucide-react";
import {
  blogFilterCategories,
  blogPosts,
  siteConfig,
} from "@/data/site";
import { LocalImage } from "@/components/ui/LocalImage";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { cn } from "@/lib/utils";

const POSTS_PER_PAGE = 6;

const categoryTagColors: Record<string, string> = {
  "Digital Marketing": "text-orange",
  SEO: "text-emerald-400",
  Branding: "text-orange",
  "Web Development": "text-sky-400",
  "Social Media": "text-purple-400",
  "Paid Ads": "text-orange",
  "Content Marketing": "text-amber-400",
};

function getCategoryColor(category: string) {
  return categoryTagColors[category] ?? "text-orange";
}

export function BlogPageContent() {
  const [activeFilter, setActiveFilter] =
    useState<(typeof blogFilterCategories)[number]>("All Posts");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredPosts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return blogPosts.filter((post) => {
      const matchesFilter =
        activeFilter === "All Posts" || post.filterCategory === activeFilter;
      const matchesSearch =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query) ||
        post.filterCategory.toLowerCase().includes(query);

      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedPosts = filteredPosts.slice(
    (safePage - 1) * POSTS_PER_PAGE,
    safePage * POSTS_PER_PAGE
  );

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    blogPosts.forEach((post) => {
      counts[post.filterCategory] = (counts[post.filterCategory] ?? 0) + 1;
    });
    return counts;
  }, []);

  const popularPosts = useMemo(
    () => [...blogPosts].slice(0, 3),
    []
  );

  const handleFilterChange = (filter: (typeof blogFilterCategories)[number]) => {
    setActiveFilter(filter);
    setCurrentPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const pageNumbers = useMemo(() => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages = new Set<number>([1, totalPages, safePage]);
    if (safePage > 1) pages.add(safePage - 1);
    if (safePage < totalPages) pages.add(safePage + 1);

    return Array.from(pages).sort((a, b) => a - b);
  }, [safePage, totalPages]);

  return (
    <>
      <section id="blog-articles" className="section-padding pt-0">
        <div className="container-custom">
          {/* Filters + search */}
          <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
              {blogFilterCategories.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => handleFilterChange(filter)}
                  className={cn(
                    "shrink-0 rounded-full px-4 py-2 font-heading text-xs font-semibold transition-all duration-300 sm:text-sm",
                    activeFilter === filter
                      ? "bg-orange text-black shadow-[0_0_24px_rgba(240,87,7,0.35)]"
                      : "border border-white/10 bg-white/[0.03] text-offwhite/65 hover:border-orange/30 hover:text-offwhite"
                  )}
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="relative w-full lg:max-w-xs">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-offwhite/35" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Search articles..."
                aria-label="Search articles"
                className="w-full rounded-full border border-white/10 bg-white/[0.04] py-2.5 pl-11 pr-4 text-sm text-offwhite placeholder:text-offwhite/30 focus:border-orange/40 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid gap-10 xl:grid-cols-[1fr_320px]">
            {/* Main grid */}
            <div>
              {paginatedPosts.length === 0 ? (
                <div className="glass rounded-2xl p-12 text-center">
                  <p className="font-heading text-lg text-offwhite">
                    No articles found
                  </p>
                  <p className="mt-2 text-sm text-offwhite/50">
                    Try a different category or search term.
                  </p>
                </div>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3">
                  {paginatedPosts.map((post) => (
                    <Link key={post.slug} href={`/blog/${post.slug}`}>
                      <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] transition-all duration-500 hover:border-orange/20 hover:shadow-[0_0_40px_rgba(240,87,7,0.08)]">
                        <div className="relative aspect-[16/10] overflow-hidden">
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                        </div>

                        <div className="flex flex-1 flex-col p-5">
                          <span
                            className={cn(
                              "font-heading text-[10px] font-semibold uppercase tracking-[0.2em]",
                              getCategoryColor(post.filterCategory)
                            )}
                          >
                            {post.filterCategory}
                          </span>

                          <h2 className="mt-3 line-clamp-2 font-heading text-base font-bold leading-snug text-offwhite transition-colors group-hover:text-orange sm:text-lg">
                            {post.title}
                          </h2>

                          <p className="mt-3 line-clamp-2 flex-1 text-sm leading-relaxed text-offwhite/50">
                            {post.excerpt}
                          </p>

                          <div className="mt-5 flex items-center gap-3 border-t border-white/[0.06] pt-4">
                            <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full border border-white/10 bg-black">
                              <LocalImage
                                src={siteConfig.logo}
                                alt={siteConfig.name}
                                width={500}
                                height={500}
                                className="h-full w-full object-contain p-0.5"
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="truncate font-heading text-xs font-semibold text-offwhite">
                                {siteConfig.name}
                              </p>
                              <p className="text-[11px] text-offwhite/40">
                                {post.date} • {post.readTime}
                              </p>
                            </div>
                          </div>

                          <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-orange">
                            Read More
                            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </span>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12 flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={safePage === 1}
                    aria-label="Previous page"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-offwhite/60 transition-colors hover:border-orange/40 hover:text-orange disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>

                  {pageNumbers.map((page, index) => {
                    const prev = pageNumbers[index - 1];
                    const showEllipsis = prev !== undefined && page - prev > 1;

                    return (
                      <span key={page} className="flex items-center gap-2">
                        {showEllipsis && (
                          <span className="px-1 text-offwhite/30">…</span>
                        )}
                        <button
                          type="button"
                          onClick={() => setCurrentPage(page)}
                          className={cn(
                            "flex h-10 min-w-10 items-center justify-center rounded-full px-3 font-heading text-sm font-semibold transition-all",
                            safePage === page
                              ? "bg-orange text-black"
                              : "border border-white/10 text-offwhite/60 hover:border-orange/30 hover:text-offwhite"
                          )}
                        >
                          {page}
                        </button>
                      </span>
                    );
                  })}

                  <button
                    type="button"
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={safePage === totalPages}
                    aria-label="Next page"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-offwhite/60 transition-colors hover:border-orange/40 hover:text-orange disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
                <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-offwhite">
                  Categories
                </h3>
                <ul className="mt-4 space-y-1">
                  {blogFilterCategories
                    .filter((cat) => cat !== "All Posts")
                    .map((cat) => {
                      const count = categoryCounts[cat] ?? 0;
                      if (count === 0) return null;

                      return (
                        <li key={cat}>
                          <button
                            type="button"
                            onClick={() => handleFilterChange(cat)}
                            className={cn(
                              "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-colors",
                              activeFilter === cat
                                ? "bg-orange/10 text-orange"
                                : "text-offwhite/60 hover:bg-white/[0.04] hover:text-offwhite"
                            )}
                          >
                            <span>{cat}</span>
                            <span className="text-xs opacity-60">{count}</span>
                          </button>
                        </li>
                      );
                    })}
                </ul>
              </div>

              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
                <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-offwhite">
                  Popular Posts
                </h3>
                <ul className="mt-4 space-y-4">
                  {popularPosts.map((post) => (
                    <li key={post.slug}>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="group flex gap-3"
                      >
                        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg">
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            sizes="56px"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="line-clamp-2 font-heading text-sm font-semibold leading-snug text-offwhite transition-colors group-hover:text-orange">
                            {post.title}
                          </p>
                          <p className="mt-1 text-[11px] text-offwhite/40">
                            {post.date}
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-orange/20 bg-gradient-to-br from-orange/10 via-black to-black p-6">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-orange/15 text-orange">
                  <Send className="h-4 w-4" />
                </div>
                <h3 className="font-heading text-lg font-bold text-offwhite">
                  Stay Ahead
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-offwhite/55">
                  Subscribe for the latest growth insights and marketing
                  strategies.
                </p>
                <NewsletterForm variant="sidebar" source="blog-sidebar" />
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Bottom newsletter banner */}
      <section className="section-padding pt-0">
        <div className="container-custom">
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] px-6 py-10 md:px-10 md:py-12">
            <div className="pointer-events-none absolute -left-10 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-orange/10 blur-3xl" />
            <div className="pointer-events-none absolute -right-10 top-0 h-32 w-32 rounded-full bg-orange/5 blur-3xl" />

            <div className="relative flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-start gap-5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-orange/15 text-orange">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-offwhite md:text-2xl">
                    Get the latest insights delivered to your inbox
                  </h3>
                  <p className="mt-2 max-w-lg text-sm text-offwhite/50">
                    Join thousands of marketers receiving weekly growth tips and
                    industry updates.
                  </p>
                </div>
              </div>

              <NewsletterForm variant="banner" source="blog-banner" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
