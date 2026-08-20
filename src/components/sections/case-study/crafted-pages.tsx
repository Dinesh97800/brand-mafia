import type { ComponentType } from "react";
import { LalajiCaseStudyPage } from "./pages/LalajiCaseStudyPage";
import { LalasPizzaCaseStudyPage } from "./pages/LalasPizzaCaseStudyPage";
import { LalasCafeCaseStudyPage } from "./pages/LalasCafeCaseStudyPage";
import { BlumeCaseStudyPage } from "./pages/BlumeCaseStudyPage";
import { ActiveAwayCaseStudyPage } from "./pages/ActiveAwayCaseStudyPage";

const craftedPages: Record<string, ComponentType> = {
  "lalaji-the-barbershop": LalajiCaseStudyPage,
  "lalas-pizza": LalasPizzaCaseStudyPage,
  "lalas-cafe": LalasCafeCaseStudyPage,
  oohlalablume: BlumeCaseStudyPage,
  "active-away": ActiveAwayCaseStudyPage,
};

export function getCraftedCaseStudyPage(slug: string) {
  return craftedPages[slug];
}
