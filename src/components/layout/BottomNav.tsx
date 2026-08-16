"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  Home,
  Users,
  Sparkles,
  Briefcase,
  Tag,
  Mail,
  ArrowUpRight,
} from "lucide-react";
import { siteConfig } from "@/data/site";
import { BottomNavBar, type BottomNavItem } from "@/components/ui/bottom-nav-bar";
import { LocalImage } from "@/components/ui/LocalImage";
import { cn } from "@/lib/utils";

const bottomNavItems: (BottomNavItem & { href: string })[] = [
  { label: "Home", icon: Home, href: "/" },
  { label: "About", icon: Users, href: "/about" },
  { label: "Services", icon: Sparkles, href: "/services" },
  { label: "Portfolio", icon: Briefcase, href: "/portfolio" },
  { label: "Pricing", icon: Tag, href: "/pricing" },
  { label: "Contact", icon: Mail, href: "/contact" },
];

export function BottomNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const activeIndex = bottomNavItems.findIndex((item) =>
    item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
  );

  return (
    <>
      {/* Slim top strip keeps the logo and primary CTA reachable */}
      <motion.header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-white/[0.06] bg-black/80 backdrop-blur-xl"
            : "bg-transparent"
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: 2.2 }}
      >
        <div className="container-custom flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8 xl:px-16">
          <Link href="/" className="group flex items-center gap-3">
            <LocalImage
              src={siteConfig.logo}
              alt={siteConfig.name}
              width={500}
              height={500}
              priority
              className="h-9 w-auto object-contain transition-transform group-hover:scale-105 sm:h-10"
            />
          </Link>

          <Link
            href={siteConfig.calendly}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full border border-orange/40 px-5 py-2 font-heading text-xs font-semibold text-orange transition-all duration-300 hover:bg-orange/10 sm:text-sm"
          >
            Free Strategy Call
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </motion.header>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 2.2 }}
        className="fixed inset-x-0 bottom-4 z-50 mx-auto flex w-fit max-w-[95vw] justify-center"
      >
        <BottomNavBar items={bottomNavItems} activeIndex={activeIndex} />
      </motion.div>
    </>
  );
}
