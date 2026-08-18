"use client";

import { useMemo } from "react";
import {
  Palette,
  Search,
  Target,
  Code2,
  Share2,
  TrendingUp,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { projects } from "@/data/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import InteractiveSelector, {
  type InteractiveSelectorOption,
} from "@/components/ui/interactive-selector";

const categoryIcons: Record<string, LucideIcon> = {
  Branding: Palette,
  SEO: Search,
  "Paid Ads": Target,
  "Web Design": Code2,
  "Social Media": Share2,
};

function iconFor(category: string) {
  const Icon = categoryIcons[category] ?? TrendingUp;
  return <Icon size={24} className="text-white" />;
}

export function CaseStudiesSection() {
  const options: InteractiveSelectorOption[] = useMemo(
    () =>
      projects.map((project) => ({
        title: project.title,
        description: project.description,
        image: project.image,
        icon: iconFor(project.category),
        href: `/case-studies/${project.id}`,
      })),
    []
  );

  return (
    <section className="section-padding relative overflow-hidden pb-0">
      <div className="container-custom">
        <SectionHeading
          label="Case Studies"
          title="Work that dominates"
          description="Select a panel to explore the story. Click again to open the full case study."
          align="center"
        />

        <InteractiveSelector options={options} />

        <div className="mt-10 flex justify-center">
          <Button href="/case-studies" variant="secondary">
            View all case studies
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
