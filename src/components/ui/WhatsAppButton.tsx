"use client";

import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

/** `raised` lifts the button above the floating bottom navigation bar. */
export function WhatsAppButton({ raised = false }: { raised?: boolean }) {
  return (
    <a
      href={`https://wa.me/${siteConfig.whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className={cn(
        "fixed right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110 hover:shadow-xl",
        raised ? "bottom-24 lg:bottom-6" : "bottom-6"
      )}
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}
