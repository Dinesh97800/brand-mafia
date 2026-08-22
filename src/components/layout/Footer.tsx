"use client";

import Link from "next/link";
import { ArrowUpRight, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import { footerLinks, siteConfig } from "@/data/site";
import { LocalImage } from "@/components/ui/LocalImage";
import { Button } from "@/components/ui/Button";
// import { NewsletterForm } from "@/components/forms/NewsletterForm";

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
          <div className="grid grid-cols-2 gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="col-span-2 lg:col-span-4">
              <Link href="/" className="inline-block mb-6">
                <LocalImage
                  src={siteConfig.footerLogo}
                  alt={siteConfig.name}
                  width={500}
                  height={500}
                  className="h-24 w-auto max-w-[min(90vw,20rem)] object-contain"
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

            <div className="col-span-2 lg:col-span-3">
              <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-offwhite mb-6">
                Let&apos;s Talk
              </h3>
              <p className="text-sm text-offwhite/50 mb-4">
                Ready to grow? Tell us about your brand and we&apos;ll build a
                plan that drives results.
              </p>
              {/* <NewsletterForm variant="footer" source="footer" /> */}
              <Button href="/contact" className="w-full sm:w-auto">
                Contact Us
                <ArrowUpRight className="h-4 w-4" />
              </Button>
              <p className="mt-5 text-xs text-offwhite/40">
                &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
                reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
