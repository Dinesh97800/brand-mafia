import { generateSEO, generateBreadcrumbSchema } from "@/lib/seo";
import { ContactSection } from "@/components/sections/ContactSection";

export const metadata = generateSEO({
  title: "Contact",
  description:
    "Get in touch with Brand Mafia. Book a free strategy call, send us a message, or reach us via WhatsApp.",
  path: "/contact",
});

export default function ContactPage() {
  const breadcrumb = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Contact", url: "/contact" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <div className="pt-20">
        <ContactSection />
      </div>
    </>
  );
}
