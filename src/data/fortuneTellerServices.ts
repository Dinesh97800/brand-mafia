export type FortuneTellerService = {
  id: string;
  title: string;
};

export type FortuneTellerPhase = {
  id: 1 | 2 | 3;
  label: string;
  subtitle: string;
  services: FortuneTellerService[];
};

/** Edit service titles here — grouped 4 per scroll phase. */
export const fortuneTellerPhases: FortuneTellerPhase[] = [
  {
    id: 1,
    label: "Brand & Reach",
    subtitle: "Creative foundations that capture attention",
    services: [
      { id: "branding", title: "Branding" },
      { id: "advertising", title: "Advertising" },
      { id: "social-media-ads", title: "Social Media Ads" },
      { id: "content-creation", title: "Content Creation" },
    ],
  },
  {
    id: 2,
    label: "Build & Design",
    subtitle: "Digital experiences engineered to convert",
    services: [
      { id: "website-development", title: "Website Development" },
      { id: "mobile-applications", title: "Mobile Applications" },
      { id: "ui-ux-design", title: "UI/UX Design" },
      { id: "e-commerce", title: "E-commerce" },
    ],
  },
  {
    id: 3,
    label: "Grow & Scale",
    subtitle: "Performance systems that compound results",
    services: [
      { id: "seo-content", title: "SEO & Content" },
      { id: "strategy", title: "Strategy" },
      { id: "crm-automation", title: "CRM & Automation" },
      { id: "performance-marketing", title: "Performance Marketing" },
    ],
  },
];

export const fortuneTellerServices = fortuneTellerPhases.flatMap(
  (phase) => phase.services
);
