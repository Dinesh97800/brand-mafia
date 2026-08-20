import type { ComponentType } from "react";
import { LalajiCaseStudyPage } from "./pages/LalajiCaseStudyPage";
import { LalasPizzaCaseStudyPage } from "./pages/LalasPizzaCaseStudyPage";

const craftedPages: Record<string, ComponentType> = {
  "lalaji-the-barbershop": LalajiCaseStudyPage,
  "lalas-pizza": LalasPizzaCaseStudyPage,
};

export function getCraftedCaseStudyPage(slug: string) {
  return craftedPages[slug];
}
