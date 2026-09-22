import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { SolutionsSection } from "@/components/solutions-section";
import { IndustriesSection } from "@/components/industries-section";
import { ProcessSection } from "@/components/process-section";
import TechnicalSection from "@/components/technical-section";
import { QualitySection } from "@/components/quality-section";
import { ProjectsSection } from "@/components/projects-section";
import { ResourcesSection } from "@/components/resources-section";
import { ContactSection } from "@/components/contact-section";
import { FloatingWidgets } from "@/components/floating-widgets";
import { faqs, solutions } from "@/lib/data";
import { site } from "@/lib/site";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const servicesJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Cleanox Cleanroom Solutions",
  itemListElement: solutions.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Service",
      name: s.title,
      description: s.description,
      provider: { "@type": "Organization", name: site.legalName },
      areaServed: "IN",
    },
  })),
};

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <SolutionsSection />
        <IndustriesSection />
        <ProcessSection />
        <TechnicalSection />
        <QualitySection />
        <ProjectsSection />
        <ResourcesSection />
        <ContactSection />
      </main>
      <SiteFooter />
      <FloatingWidgets />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
      />
    </div>
  );
}
