"use client";

import { ArrowUpRight, Mail, Phone } from "lucide-react";
// import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { siteConfig } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { LocalImage } from "@/components/ui/LocalImage";

export function WorkEmpireCta() {
  return (
    <section
      id="empire"
      className="relative overflow-hidden px-4 py-20 sm:px-6 md:py-28 lg:px-8 xl:px-16"
    >
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-[radial-gradient(ellipse_at_bottom,rgba(240,87,7,0.18),transparent_65%)]" />

      <div className="container-custom relative grid items-center gap-12 lg:grid-cols-[1fr_0.7fr_0.9fr] lg:gap-8">
        <div>
          <h2 className="font-heading text-4xl font-bold leading-tight text-offwhite md:text-5xl">
            Let&apos;s Build Your Empire
            <span className="text-orange">.</span>
          </h2>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={siteConfig.calendly} external magnetic>
              Book a Free Strategy Call
              <ArrowUpRight className="h-4 w-4" />
            </Button>
            {/* <Button
              href={`https://wa.me/${siteConfig.whatsapp}`}
              external
              variant="secondary"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp Us
            </Button> */}
          </div>
        </div>

        <ul className="space-y-5">
          {[
            {
              icon: Mail,
              label: "Email",
              value: siteConfig.email,
              href: `mailto:${siteConfig.email}`,
            },
            {
              icon: Phone,
              label: "Phone",
              value: siteConfig.phone,
              href: `tel:${siteConfig.phone}`,
            },
            // {
            //   icon: MapPin,
            //   label: "Office",
            //   value: `${siteConfig.address.city}, ${siteConfig.address.state}`,
            //   href: "/contact",
            // },
          ].map(({ icon: Icon, label, value, href }) => (
            <li key={label}>
              <a href={href} className="group flex items-start gap-3">
                <Icon className="mt-0.5 h-4 w-4 text-orange" />
                <span>
                  <span className="block font-heading text-[11px] uppercase tracking-[0.2em] text-offwhite/40">
                    {label}
                  </span>
                  <span className="text-sm text-offwhite transition-colors group-hover:text-orange">
                    {value}
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
          <div className="pointer-events-none absolute inset-x-8 bottom-0 h-40 rounded-full bg-orange/25 blur-[70px]" />
          <LocalImage
            src="/images/work/work-asset.png"
            alt=""
            className="relative z-10 w-full object-contain"
          />
        </div>
      </div>
    </section>
  );
}
