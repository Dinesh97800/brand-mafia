"use client";

import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { LocalImage } from "@/components/ui/LocalImage";

export function ServicesCta() {
  return (
    <section className="relative px-4 pb-12 sm:px-6 md:pb-16 lg:px-8 xl:px-16">
      <div className="container-custom relative">
        <div className="relative flex h-[136px] items-center overflow-hidden rounded-2xl sm:h-[148px]">
          <LocalImage
            src="/images/service-plane.png"
            alt=""
            className="pointer-events-none absolute inset-0 h-full w-full object-cover object-[12%_center] select-none"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-black/20 to-black/55" />

          <div className="relative z-10 ml-auto flex max-w-[min(100%,22rem)] flex-col items-end pr-5 text-right sm:pr-8 md:pr-10">
            <h2 className="font-heading text-xl font-bold leading-tight text-offwhite sm:text-2xl">
              Ready to Build Something That{" "}
              <span className="text-orange">Scales?</span>
            </h2>
            <Button
              href={siteConfig.calendly}
              external
              magnetic
              size="sm"
              className="mt-3"
            >
              Book Free Strategy Call
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
