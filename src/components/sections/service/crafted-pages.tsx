import type { ComponentType } from "react";
import { resolveServiceId, type Service } from "@/data/services";
import { SeoServicePage } from "./pages/SeoServicePage";
import { DigitalMarketingServicePage } from "./pages/DigitalMarketingServicePage";
import { EcommerceSeoServicePage } from "./pages/EcommerceSeoServicePage";
import { PerformanceServicePage } from "./pages/PerformanceServicePage";
import { SocialServicePage } from "./pages/SocialServicePage";
import { ContentServicePage } from "./pages/ContentServicePage";
import { EmailServicePage } from "./pages/EmailServicePage";
import { AiOptimizationServicePage } from "./pages/AiOptimizationServicePage";
import { WebsiteServicePage } from "./pages/WebsiteServicePage";
import { AppServicePage } from "./pages/AppServicePage";
import { BrandServicePage } from "./pages/BrandServicePage";
import { VideoServicePage } from "./pages/VideoServicePage";

type ServicePage = ComponentType<{ service: Service }>;

const craftedPages: Record<string, ServicePage> = {
  seo: SeoServicePage,
  "digital-marketing": DigitalMarketingServicePage,
  "ecommerce-seo": EcommerceSeoServicePage,
  performance: PerformanceServicePage,
  social: SocialServicePage,
  content: ContentServicePage,
  email: EmailServicePage,
  "ai-optimization": AiOptimizationServicePage,
  "web-dev": WebsiteServicePage,
  "app-development": AppServicePage,
  branding: BrandServicePage,
  "video-production": VideoServicePage,
};

export function getCraftedServicePage(slug: string): ServicePage | undefined {
  return craftedPages[resolveServiceId(slug)];
}
