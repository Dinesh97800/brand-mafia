import { HeroSection } from "@/components/sections/HeroSection";
import { ClientsSection } from "@/components/sections/ClientsSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { FortuneTellerServices } from "@/components/sections/FortuneTellerServices";
import { BrandGrowthSection } from "@/components/sections/BrandGrowthSection";
import { WhySection } from "@/components/sections/WhySection";
import { ShowcaseSection } from "@/components/sections/ShowcaseSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { TeamSection } from "@/components/sections/TeamSection";
// import { PricingSection } from "@/components/sections/PricingSection";
import { SolutionsSection } from "@/components/sections/SolutionsSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ClientsSection />
      <ServicesSection />
      <FortuneTellerServices />
      <WhySection />
      <BrandGrowthSection />
      <ShowcaseSection />
      <ProjectsSection />
      <ProcessSection />
      <TestimonialsSection />
      <TeamSection />
      {/* <PricingSection /> */}
      <SolutionsSection />
      <ContactSection />
    </>
  );
}
