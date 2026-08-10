"use client";

import Link from "next/link";
import { ArrowUpRight, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import { footerLinks, siteConfig } from "@/data/site";
import { LocalImage } from "@/components/ui/LocalImage";

const socialIcons = [
  { icon: Twitter, href: siteConfig.social.twitter, label: "Twitter" },
  { icon: Instagram, href: siteConfig.social.instagram, label: "Instagram" },
  { icon: Linkedin, href: siteConfig.social.linkedin, label: "LinkedIn" },
  { icon: Youtube, href: siteConfig.social.youtube, label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] bg-black">
      <div className="absolute inset-0 bg-hero-glow opacity-30 pointer-events-none" />

      <div className="section-padding relative">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
            <div className="lg:col-span-4">
              <Link href="/" className="inline-block mb-6">
                <LocalImage
                  src="/images/logo.jpg"
                  alt={siteConfig.name}
                  width={140}
                  height={90}
                  className="h-16 w-auto object-contain"
                />
              </Link>
              <p className="text-offwhite/50 text-sm leading-relaxed max-w-sm mb-6">
                {siteConfig.tagline} Premium digital marketing for brands that
                refuse to settle.
              </p>
              <div className="flex gap-3">
                {socialIcons.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-offwhite/60 transition-all hover:border-orange hover:text-orange hover:scale-110"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2">
              <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-offwhite mb-6">
                Quick Links
              </h3>
              <ul className="space-y-3">
                {footerLinks.quick.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-offwhite/50 hover:text-orange transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-3">
              <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-offwhite mb-6">
                Services
              </h3>
              <ul className="space-y-3">
                {footerLinks.services.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-offwhite/50 hover:text-orange transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-3">
              <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-offwhite mb-6">
                Newsletter
              </h3>
              <p className="text-sm text-offwhite/50 mb-4">
                Get growth insights delivered to your inbox.
              </p>
              <form
                className="flex gap-2"
                onSubmit={(e) => e.preventDefault()}
                aria-label="Newsletter signup"
              >
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 rounded-full bg-white/[0.05] border border-white/10 px-4 py-2.5 text-sm text-offwhite placeholder:text-offwhite/30 focus:outline-none focus:border-orange/50 transition-colors"
                  aria-label="Email address"
                />
                <button
                  type="submit"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange text-black transition-transform hover:scale-110"
                  aria-label="Subscribe"
                >
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-offwhite/40">
              &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
              reserved.
            </p>
            <div className="flex gap-6">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs text-offwhite/40 hover:text-orange transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
