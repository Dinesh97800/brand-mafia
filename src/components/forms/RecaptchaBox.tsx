"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      render: (
        container: string | HTMLElement,
        parameters: {
          sitekey: string;
          theme?: "dark" | "light";
          callback?: (token: string) => void;
        }
      ) => number;
      getResponse: (widgetId?: number) => string;
      reset: (widgetId?: number) => void;
    };
  }
}

export function getRecaptchaToken(widgetId: number | null) {
  if (widgetId === null || !window.grecaptcha) return "";
  return window.grecaptcha.getResponse(widgetId);
}

export function resetRecaptcha(widgetId: number | null) {
  if (widgetId === null || !window.grecaptcha) return;
  window.grecaptcha.reset(widgetId);
}

export function RecaptchaBox({
  onReady,
}: {
  onReady: (widgetId: number) => void;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<number | null>(null);

  const renderWidget = () => {
    if (!SITE_KEY || !window.grecaptcha || !hostRef.current) return;
    if (widgetIdRef.current !== null) return;
    if (hostRef.current.childElementCount > 0) return;

    widgetIdRef.current = window.grecaptcha.render(hostRef.current, {
      sitekey: SITE_KEY,
      theme: "dark",
    });
    onReady(widgetIdRef.current);
  };

  useEffect(() => {
    if (window.grecaptcha) {
      window.grecaptcha.ready(renderWidget);
    }
  }, []);

  if (!SITE_KEY) {
    return (
      <p className="text-xs text-orange">
        reCAPTCHA is not configured.
      </p>
    );
  }

  return (
    <>
      <Script
        src="https://www.google.com/recaptcha/api.js?render=explicit"
        strategy="afterInteractive"
        onLoad={() => window.grecaptcha?.ready(renderWidget)}
      />
      <div className="h-[62px] w-[243px] overflow-hidden sm:h-[78px] sm:w-[304px]">
        <div
          ref={hostRef}
          className="origin-top-left scale-[0.8] sm:scale-100"
        />
      </div>
    </>
  );
}
