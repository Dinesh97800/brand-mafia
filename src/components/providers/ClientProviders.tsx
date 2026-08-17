"use client";

import { navigationVariant } from "@/data/site";
import { Navbar } from "@/components/layout/Navbar";
import { PillNavbar } from "@/components/layout/PillNavbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { ChunkLoadRecovery } from "@/components/providers/ChunkLoadRecovery";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { ScrollProgress, CursorGlow } from "@/components/ui/ScrollProgress";
// import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

function SiteNavigation() {
  switch (navigationVariant) {
    case "bottom":
      return <BottomNav />;
    case "classic":
      return <Navbar />;
    case "pill":
    default:
      return <PillNavbar />;
  }
}

export function ClientProviders({ children }: { children: React.ReactNode }) {
  const useBottomNav = navigationVariant === "bottom";

  return (
    <>
      <ChunkLoadRecovery />
      <LoadingScreen />
      <ScrollProgress />
      <CursorGlow />
      <SmoothScroll>
        <SiteNavigation />
        <main>{children}</main>
        <Footer />
        {useBottomNav && <div aria-hidden className="h-20" />}
        {/* <WhatsAppButton raised={useBottomNav} /> */}
      </SmoothScroll>
    </>
  );
}
