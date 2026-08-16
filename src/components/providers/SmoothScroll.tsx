"use client";

import { useEffect } from "react";
import type Lenis from "lenis";

export const LENIS_READY_EVENT = "lenis-ready";

let lenisReady = false;

export function isLenisReady() {
  return lenisReady;
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let lenis: Lenis | null = null;
    let raf: ((time: number) => void) | null = null;
    let cancelled = false;

    async function init() {
      const [{ default: LenisCtor }, { gsap }, { ScrollTrigger }] =
        await Promise.all([
          import("lenis"),
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);

      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);

      lenis = new LenisCtor({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      const scroller = document.documentElement;

      ScrollTrigger.scrollerProxy(scroller, {
        scrollTop(value) {
          if (!lenis) return window.scrollY;
          if (arguments.length && value !== undefined) {
            lenis.scrollTo(value, { immediate: true });
          }
          return lenis.scroll;
        },
        scrollHeight() {
          return document.documentElement.scrollHeight;
        },
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          };
        },
        pinType: "fixed",
      });

      ScrollTrigger.defaults({ scroller });

      lenis.on("scroll", ScrollTrigger.update);

      ScrollTrigger.addEventListener("refresh", () => {
        lenis?.resize();
      });

      raf = (time: number) => {
        lenis?.raf(time * 1000);
      };

      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
        lenisReady = true;
        window.dispatchEvent(new CustomEvent(LENIS_READY_EVENT));
      });
    }

    init();

    return () => {
      cancelled = true;
      lenisReady = false;
      if (raf) {
        import("gsap").then(({ gsap }) => {
          gsap.ticker.remove(raf!);
        });
      }
      lenis?.destroy();
    };
  }, []);

  return <>{children}</>;
}
