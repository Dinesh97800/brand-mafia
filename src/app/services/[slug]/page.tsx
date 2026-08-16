import { notFound } from "next/navigation";
import { generateSEO, generateBreadcrumbSchema } from "@/lib/seo";
import { siteConfig } from "@/data/site";
import { getServiceById, getServiceStaticParams } from "@/data/services";
import { ServicePageContent } from "@/components/sections/service/ServicePageContent";
import { getCraftedServicePage } from "@/components/sections/service/crafted-pages";
import { ContactSection } from "@/components/sections/ContactSection";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getServiceStaticParams();
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const service = getServiceById(slug);
  if (!service) return {};

  return generateSEO({
    title: service.title,
    description: service.seoDescription,
    path: `/services/${slug}`,
    image: service.image,
  });
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceById(slug);

  if (!service) notFound();

  const breadcrumb = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" },
    { name: service.title, url: `/services/${slug}` },
  ]);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.seoDescription,
    url: `${siteConfig.url}/services/${slug}`,
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: siteConfig.address.country,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      {(() => {
        const CraftedPage = getCraftedServicePage(slug);
        return CraftedPage ? (
          <CraftedPage service={service} />
        ) : (
          <ServicePageContent service={service} />
        );
      })()}
      <ContactSection />
    </>
  );
}
