"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/data/site";
import { LocalImage } from "@/components/ui/LocalImage";

export function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const hideTimer = setTimeout(() => setLoading(false), 1800);
    const removeTimer = setTimeout(() => setVisible(false), 2400);
    return () => {
      clearTimeout(hideTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-opacity duration-500 ${
        loading ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      aria-hidden={!loading}
    >
      <div className="relative flex flex-col items-center gap-6">
        <div className="animate-[fadeIn_0.5s_ease-out]">
          <LocalImage
            src={siteConfig.logo}
            alt={siteConfig.name}
            width={500}
            height={500}
            priority
            className="h-28 w-28 object-contain sm:h-32 sm:w-32"
          />
        </div>

        <div className="h-[2px] w-32 overflow-hidden rounded-full bg-white/10">
          <div className="h-full bg-orange animate-[loadBar_1.2s_ease-in-out_0.8s_both]" />
        </div>
      </div>
    </div>
  );
}
