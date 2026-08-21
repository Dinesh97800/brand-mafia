"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { navLinks, siteConfig } from "@/data/site";
import { LocalImage } from "@/components/ui/LocalImage";
import { cn } from "@/lib/utils";

const pillShell =
  "rounded-full border border-white/[0.08] bg-black/80 shadow-xl backdrop-blur-xl";

/** Same surface as the header pill, but rounded for tall dropdown panels. */
const menuPanelShell =
  "rounded-2xl border border-white/[0.08] bg-black/80 shadow-xl backdrop-blur-xl";

function isActivePath(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function PillNavbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.header
        className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8 xl:px-16"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 2.2 }}
      >
        <div
          className={cn(
            "pointer-events-auto mx-auto flex h-[60px] max-w-7xl items-center gap-2 p-1.5 sm:p-2",
            pillShell
          )}
        >
          {/* Logo */}
          <Link
            href="/"
            className="group flex shrink-0 items-center px-1.5 sm:px-2"
            aria-label={siteConfig.name}
          >
            <LocalImage
              src={siteConfig.logo}
              alt={siteConfig.name}
              width={500}
              height={500}
              priority
              className="h-7 w-auto max-w-[8rem] object-contain transition-transform group-hover:scale-105 sm:h-8 sm:max-w-[9.5rem]"
            />
          </Link>

          {/* Desktop navigation */}
          <nav
            className="hidden min-w-0 flex-1 items-center justify-center gap-1 lg:flex"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => {
              const active = isActivePath(pathname, link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-full px-3 py-2 font-heading text-sm font-medium transition-colors duration-200 xl:px-4",
                    active
                      ? "bg-orange/10 text-orange"
                      : "text-offwhite/60 hover:bg-white/[0.06] hover:text-offwhite"
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <Link
            href={siteConfig.calendly}
            className="group hidden shrink-0 items-center gap-2 rounded-full bg-orange px-4 py-2 font-heading text-xs font-semibold text-black transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(240,87,7,0.35)] lg:inline-flex xl:px-5 xl:text-sm"
          >
            Free Strategy Call
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="ml-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-offwhite transition-colors hover:bg-white/[0.06] lg:hidden"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
              aria-hidden
            />

            <motion.nav
              className={cn(
                "absolute left-4 right-4 top-[4.75rem] max-h-[calc(100dvh-5.5rem)] overflow-y-auto overscroll-contain p-3",
                menuPanelShell
              )}
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 380, damping: 32 }}
              aria-label="Mobile navigation"
            >
              <ul className="flex flex-col gap-1">
                {navLinks.map((link, i) => {
                  const active = isActivePath(pathname, link.href);

                  return (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                    >
                      <Link
                        href={link.href}
                        className={cn(
                          "flex items-center rounded-full px-4 py-3 font-heading text-base font-medium transition-colors duration-200",
                          active
                            ? "bg-orange/10 text-orange"
                            : "text-offwhite/70 hover:bg-white/[0.06] hover:text-offwhite"
                        )}
                        aria-current={active ? "page" : undefined}
                      >
                        {link.label}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>

              <div className="mt-3 border-t border-white/[0.08] pt-3">
                <Link
                  href={siteConfig.calendly}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-orange px-5 py-3 font-heading text-sm font-semibold text-black transition-transform active:scale-[0.98]"
                >
                  Free Strategy Call
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
