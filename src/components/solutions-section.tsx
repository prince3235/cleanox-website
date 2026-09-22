"use client";

import { useState } from "react";
import Image from "next/image";
import {
  AirVent,
  ArrowRight,
  Building2,
  CheckCircle2,
  DoorClosed,
  DraftingCompass,
  Fan,
  FileText,
  Filter,
  Gauge,
  LayoutPanelTop,
  MessageCircle,
  MonitorCog,
  PackageCheck,
  PackageSearch,
  ShieldCheck,
  SquareDot,
  Wind,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Reveal, SectionHeading } from "@/components/reveal";
import { solutions, type Solution } from "@/lib/data";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  DraftingCompass,
  Fan,
  Filter,
  LayoutPanelTop,
  DoorClosed,
  PackageCheck,
  Wind,
  AirVent,
  SquareDot,
  Gauge,
  MonitorCog,
  Building2,
  PackageSearch,
};

const categories = [
  { id: "all", label: "All Solutions (12)" },
  { id: "hvac", label: "HVAC & Filtration (4)" },
  { id: "envelope", label: "Modular Envelope (3)" },
  { id: "transfer", label: "Transfer & Access (2)" },
  { id: "turnkey", label: "Turnkey & Monitoring (3)" },
] as const;

const categoryMapping: Record<string, string> = {
  "hvac-ahu": "hvac",
  "hepa-filtration": "hvac",
  "ffu-systems": "hvac",
  "laminar-air-flow": "hvac",
  "cleanroom-panels": "envelope",
  "cleanroom-doors": "envelope",
  "controlled-environment": "envelope",
  "pass-box": "transfer",
  "air-shower": "transfer",
  "cleanroom-design": "turnkey",
  ems: "turnkey",
  bms: "turnkey",
};

export function SolutionsSection() {
  const [selectedSolution, setSelectedSolution] = useState<Solution | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const activeIcon = selectedSolution ? iconMap[selectedSolution.icon] ?? Building2 : Building2;
  const ActiveIconComponent = activeIcon;

  // Filter solutions by category
  const filteredSolutions =
    activeCategory === "all"
      ? solutions
      : solutions.filter((s) => categoryMapping[s.slug] === activeCategory);

  // Find 3 other related solutions for the cross-navigation strip
  const relatedSolutions = selectedSolution
    ? solutions.filter((s) => s.slug !== selectedSolution.slug).slice(0, 3)
    : [];

  return (
    <section
      id="solutions"
      aria-labelledby="solutions-heading"
      className="bg-white py-16 md:py-24 dark:bg-transparent"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Solutions"
          title="Complete cleanroom systems, engineered as one"
          description="From the AHU to the last particle sensor — each system below is specified, supplied, installed and documented to work together as a single controlled environment."
        />

        {/* Category Filter Pills */}
        <div className="mt-8 flex gap-2 overflow-x-auto pb-2 scrollbar-slim">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "h-9 shrink-0 rounded-full border px-4 text-xs font-semibold transition-all duration-150 focus-visible:outline-2",
                activeCategory === cat.id
                  ? "border-primary bg-primary text-primary-foreground shadow-sm"
                  : "border-border bg-card text-foreground/75 hover:border-primary/40 hover:text-foreground"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredSolutions.map((s, i) => {
            const Icon = iconMap[s.icon] ?? Building2;
            return (
              <Reveal key={s.slug} delay={(i % 4) * 0.05} className="h-full">
                <div
                  id={`solution-${s.slug}`}
                  className="group h-full scroll-mt-20 overflow-hidden rounded-xl border bg-card shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
                >
                  <button
                    type="button"
                    onClick={() => setSelectedSolution(s)}
                    className="flex h-full w-full flex-col text-left focus-visible:outline-2 focus-visible:outline-ring"
                    aria-label={`View detailed technical specifications for ${s.title}`}
                  >
                    <span className="relative block aspect-[16/10] overflow-hidden">
                      <Image
                        src={s.image}
                        alt={`${s.title} — representative view`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform duration-400 group-hover:scale-105"
                        loading="lazy"
                      />
                      <span className="absolute inset-0 bg-gradient-to-t from-navy-deep/60 via-transparent to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                      <span className="absolute bottom-2.5 left-2.5 inline-flex size-8 items-center justify-center rounded-lg bg-white/95 text-primary shadow-sm">
                        <Icon className="size-4" aria-hidden />
                      </span>
                    </span>
                    <span className="flex flex-1 flex-col p-4">
                      <span className="font-heading text-sm font-semibold leading-snug text-foreground">
                        {s.title}
                      </span>
                      <span className="mt-1.5 line-clamp-2 text-[0.79rem] leading-relaxed text-muted-foreground">
                        {s.short}
                      </span>
                      <span className="mt-auto inline-flex items-center gap-1.5 pt-3 text-[0.79rem] font-semibold text-primary">
                        Technical Specs
                        <ArrowRight
                          className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                          aria-hidden
                        />
                      </span>
                    </span>
                  </button>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* Right Slide-over Sheet Panel */}
      <Sheet open={!!selectedSolution} onOpenChange={(open) => !open && setSelectedSolution(null)}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-xl p-0 overflow-y-auto z-50 flex flex-col h-full bg-card border-l shadow-2xl"
        >
          {selectedSolution && (
            <div className="flex flex-col min-h-full">
              {/* Header Hero Image with Gradient Overlay */}
              <div className="relative aspect-[16/9] w-full shrink-0 overflow-hidden bg-navy-deep">
                <Image
                  src={selectedSolution.image}
                  alt={`${selectedSolution.title} engineering view`}
                  fill
                  priority
                  className="object-cover opacity-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                
                {/* Floating badge over image */}
                <div className="absolute bottom-4 left-6 right-6 flex items-center gap-3">
                  <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary text-white shadow-md ring-2 ring-white/20">
                    <ActiveIconComponent className="size-5.5" aria-hidden />
                  </span>
                  <div>
                    <span className="block text-[0.68rem] font-bold uppercase tracking-widest text-primary">
                      CleanOx Engineered System
                    </span>
                    <SheetTitle className="font-heading text-lg sm:text-xl font-bold text-foreground leading-tight">
                      {selectedSolution.title}
                    </SheetTitle>
                  </div>
                </div>
              </div>

              {/* Sheet Body Content */}
              <div className="flex-1 p-6 space-y-6">
                <SheetHeader className="p-0 text-left">
                  <SheetDescription className="text-sm leading-relaxed text-foreground/85">
                    {selectedSolution.description}
                  </SheetDescription>
                </SheetHeader>

                {/* Technical Highlights */}
                <div className="rounded-xl border bg-secondary/30 p-4 sm:p-5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-foreground/90">
                    Engineering Specifications & Highlights
                  </h4>
                  <ul className="mt-3 space-y-2.5" aria-label={`Key aspects of ${selectedSolution.title}`}>
                    {selectedSolution.points.map((point) => (
                      <li key={point} className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground/85">
                        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-brand-green" aria-hidden />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Regulatory & Standards Compliance Badges */}
                <div className="space-y-2">
                  <p className="text-[0.68rem] font-bold uppercase tracking-wider text-muted-foreground">
                    Applicable Regulatory & Design Standards
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {["ISO 14644-1/4", "EU GMP Annex 1", "US FDA 21 CFR Part 211", "WHO TRS 961", "Schedule M"].map(
                      (std) => (
                        <span
                          key={std}
                          className="inline-flex items-center gap-1 rounded-md border border-border bg-background px-2.5 py-1 text-[0.72rem] font-medium text-foreground/80"
                        >
                          <ShieldCheck className="size-3 text-brand-green" aria-hidden />
                          {std}
                        </span>
                      )
                    )}
                  </div>
                </div>

                {/* Related Systems Switcher Strip */}
                {relatedSolutions.length > 0 && (
                  <div className="border-t pt-5">
                    <p className="text-xs font-semibold text-muted-foreground mb-3">
                      Interconnected Cleanroom Systems:
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      {relatedSolutions.map((rel) => {
                        const RelIcon = iconMap[rel.icon] ?? Building2;
                        return (
                          <button
                            key={rel.slug}
                            type="button"
                            onClick={() => setSelectedSolution(rel)}
                            className="flex flex-col items-center justify-center p-2 rounded-lg border bg-background/50 hover:bg-secondary/60 hover:border-primary/40 text-center transition-all group"
                          >
                            <RelIcon className="size-4 text-primary group-hover:scale-110 transition-transform mb-1" />
                            <span className="text-[0.68rem] font-medium text-foreground line-clamp-2 leading-tight">
                              {rel.title}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Sticky Action Footer */}
              <div className="sticky bottom-0 border-t bg-card/95 backdrop-blur-md p-5 flex flex-col sm:flex-row gap-3">
                <SheetClose asChild>
                  <Button asChild className="flex-1 rounded-full font-semibold shadow-md shadow-primary/20">
                    <a href="#contact">
                      Request Technical BOQ & Quote
                      <ArrowRight className="size-4 ml-1" aria-hidden />
                    </a>
                  </Button>
                </SheetClose>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full font-semibold border-[#25d366]/40 text-[#1da851] hover:bg-[#25d366]/10"
                >
                  <a
                    href={`https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(
                      `Hello CleanOx, I am interested in technical details for ${selectedSolution.title}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="size-4 mr-1 text-[#25d366]" aria-hidden />
                    WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </section>
  );
}

