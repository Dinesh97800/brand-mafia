"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { ScrollProgress, CursorGlow } from "@/components/ui/ScrollProgress";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LoadingScreen />
      <ScrollProgress />
      <CursorGlow />
      <SmoothScroll>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </SmoothScroll>
    </>
  );
}
