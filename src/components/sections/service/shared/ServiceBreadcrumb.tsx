import Link from "next/link";

export function ServiceBreadcrumb({ current }: { current: string }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-8 flex flex-wrap items-center gap-2 text-xs font-heading uppercase tracking-[0.18em] text-offwhite/40"
    >
      <Link href="/" className="transition-colors hover:text-orange">
        Home
      </Link>
      <span aria-hidden>/</span>
      <Link href="/services" className="transition-colors hover:text-orange">
        Services
      </Link>
      <span aria-hidden>/</span>
      <span className="text-offwhite/70">{current}</span>
    </nav>
  );
}
