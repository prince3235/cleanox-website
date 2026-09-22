"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  Download,
  FileCheck2,
  FileText,
  HelpCircle,
  Loader2,
  Lock,
  ScrollText,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Reveal, SectionHeading } from "@/components/reveal";
import { faqs, glossary, resources, type Resource } from "@/lib/data";
import { cn } from "@/lib/utils";

const topics = ["All", "Design Basics", "Standards", "Equipment", "Validation"] as const;

const topicIcon: Record<Resource["topic"], typeof BookOpen> = {
  "Design Basics": BookOpen,
  Standards: ScrollText,
  Equipment: Download,
  Validation: ScrollText,
};

export function ResourcesSection() {
  const [active, setActive] = useState<(typeof topics)[number]>("All");
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [downloadName, setDownloadName] = useState("");
  const [downloadEmail, setDownloadEmail] = useState("");
  const [downloadCompany, setDownloadCompany] = useState("");
  const [downloadState, setDownloadState] = useState<"idle" | "loading" | "done">("idle");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const unlocked = localStorage.getItem("cleanox_resource_unlocked") === "true";
      setIsUnlocked(unlocked);
    }
  }, []);

  const filtered = useMemo(
    () => (active === "All" ? resources : resources.filter((r) => r.topic === active)),
    [active]
  );

  const triggerDownload = (resource: Resource) => {
    // Generate an engineering document text blob
    const content = `CLEANOX CLEANROOM ENGINEERING SPECIFICATION DOSSIER
Title: ${resource.title}
Topic: ${resource.topic} (${resource.type})
Read Time: ${resource.readTime}
========================================================================

EXECUTIVE SUMMARY:
${resource.excerpt}

TECHNICAL APPLICABILITY & STANDARDS:
- ISO 14644-1:2015 Classification of Air Cleanliness by Particle Concentration
- ISO 14644-4: Design, Construction & Start-up
- EU GMP Annex 1: Manufacture of Sterile Medicinal Products (rev. 2022)
- WHO Technical Report Series No. 961

CLEANOX PHARMA ENGINEERING PROTOCOLS:
1. Differential pressure cascades must maintain >= 10-15 Pa differential between adjacent classified zones.
2. Filter face velocity should be balanced to 0.45 m/s +/- 20% for unidirectional Grade A airflow regimes.
3. Air Change Rates (ACH) sized per heat load & recovery tests:
   - ISO Class 5: 240-360+ ACH (or 100% HEPA coverage)
   - ISO Class 7: 30-60 ACH
   - ISO Class 8: 15-25 ACH
4. Testing & Validation: DOP/PAO filter integrity test, airborne particle count survey, recovery time measurement.

FOR FACILITY SPECIFICATION SUPPORT:
CleanOx Engineering Desk: info@cleanox.in | +91 99000 00000
Visit: https://cleanox.in/#contact
========================================================================
(C) CleanOx Controlled Environments. All rights reserved.`;

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${resource.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-cleanox-dossier.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleResourceClick = (r: Resource) => {
    setSelectedResource(r);
    setDownloadState("idle");
    if (isUnlocked) {
      // If already unlocked in this browser, direct download immediately
      triggerDownload(r);
    }
  };

  const handleGateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!downloadName || !downloadEmail) return;

    setDownloadState("loading");
    setTimeout(() => {
      if (typeof window !== "undefined") {
        localStorage.setItem("cleanox_resource_unlocked", "true");
        setIsUnlocked(true);
      }
      setDownloadState("done");
      if (selectedResource) {
        triggerDownload(selectedResource);
      }
    }, 800);
  };

  return (
    <section
      id="resources"
      aria-labelledby="resources-heading"
      className="bg-white py-16 md:py-24 dark:bg-transparent"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Resources & Technical Library"
          title="A technical library, not a brochure"
          description="Plain-language explainers on the standards and equipment decisions that shape cleanroom projects — written to help you specify better, whoever builds your facility."
        />

        {/* Topic filter pills */}
        <Reveal delay={0.08}>
          <div
            className="mt-8 flex gap-2 overflow-x-auto pb-1 scrollbar-slim"
            role="tablist"
            aria-label="Filter resources by topic"
          >
            {topics.map((t) => (
              <button
                key={t}
                role="tab"
                aria-selected={active === t}
                onClick={() => setActive(t)}
                className={cn(
                  "h-9 shrink-0 rounded-full border px-4 text-sm font-medium transition-all duration-150 focus-visible:outline-2 focus-visible:outline-ring",
                  active === t
                    ? "border-primary bg-primary text-primary-foreground shadow-sm"
                    : "border-border bg-card text-foreground/70 hover:border-primary/35 hover:text-foreground"
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Resource cards */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-live="polite">
          {filtered.map((r, i) => {
            const Icon = topicIcon[r.topic];
            return (
              <Reveal key={r.title} delay={Math.min(i, 3) * 0.05} className="h-full">
                <article className="flex h-full flex-col rounded-xl border bg-card p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-md">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="gap-1.5 text-xs font-medium">
                      <Icon className="size-3" aria-hidden />
                      {r.topic}
                    </Badge>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock3 className="size-3" aria-hidden />
                      {r.readTime}
                    </span>
                  </div>
                  <h3 className="mt-3 font-heading text-sm font-semibold leading-snug">
                    {r.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-[0.8rem] leading-relaxed text-muted-foreground">
                    {r.excerpt}
                  </p>
                  <div className="mt-auto flex items-center justify-between pt-4 border-t mt-3">
                    <span className="text-[0.68rem] font-semibold uppercase tracking-wider text-muted-foreground">
                      {r.type}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleResourceClick(r)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary transition-colors hover:text-primary/80 focus-visible:outline-2"
                      aria-label={`Download technical resource: ${r.title}`}
                    >
                      <span>{isUnlocked ? "Download PDF" : "Access Guide"}</span>
                      <Download className="size-3.5" aria-hidden />
                    </button>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* Gated Resource Download Dialog */}
        <Dialog open={!!selectedResource} onOpenChange={(open) => !open && setSelectedResource(null)}>
          <DialogContent className="sm:max-w-md">
            {selectedResource && (
              <>
                <DialogHeader className="text-left">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="inline-flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <FileText className="size-4" />
                    </span>
                    <Badge variant="outline" className="text-[0.7rem] font-semibold">
                      {selectedResource.topic} • {selectedResource.type}
                    </Badge>
                  </div>
                  <DialogTitle className="font-heading text-lg font-bold text-foreground">
                    {selectedResource.title}
                  </DialogTitle>
                  <DialogDescription className="text-xs text-muted-foreground">
                    {selectedResource.excerpt}
                  </DialogDescription>
                </DialogHeader>

                {downloadState === "done" || (isUnlocked && downloadState === "idle") ? (
                  <div className="py-6 text-center space-y-3">
                    <span className="inline-flex size-14 items-center justify-center rounded-full bg-brand-green/10 text-brand-green">
                      <CheckCircle2 className="size-8" />
                    </span>
                    <h4 className="font-heading text-base font-bold text-foreground">
                      Resource Unlocked & Downloaded!
                    </h4>
                    <p className="text-xs text-muted-foreground max-w-xs mx-auto">
                      Your technical dossier has started downloading. You now have unlocked access to all CleanOx technical resources.
                    </p>
                    <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => triggerDownload(selectedResource)}
                        className="rounded-full text-xs font-semibold"
                      >
                        <Download className="size-3.5 mr-1" />
                        Download Again
                      </Button>
                      <Button
                        size="sm"
                        asChild
                        className="rounded-full text-xs font-semibold"
                        onClick={() => setSelectedResource(null)}
                      >
                        <a href="#contact">
                          Discuss Facility Requirements
                          <ArrowRight className="size-3.5 ml-1" />
                        </a>
                      </Button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleGateSubmit} className="space-y-4 pt-2">
                    <div className="rounded-lg border border-primary/15 bg-primary/5 p-3 flex items-start gap-2.5">
                      <Lock className="size-4 text-primary shrink-0 mt-0.5" />
                      <p className="text-[0.75rem] text-muted-foreground leading-normal">
                        Enter your professional email to unlock instant access to our engineering guides, standards summaries, and checklists.
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div className="space-y-1">
                        <Label htmlFor="res-name" className="text-xs font-semibold">
                          Your Name *
                        </Label>
                        <Input
                          id="res-name"
                          required
                          value={downloadName}
                          onChange={(e) => setDownloadName(e.target.value)}
                          placeholder="e.g. Anand Verma"
                          className="h-9 text-xs"
                        />
                      </div>

                      <div className="space-y-1">
                        <Label htmlFor="res-email" className="text-xs font-semibold">
                          Work Email *
                        </Label>
                        <Input
                          id="res-email"
                          type="email"
                          required
                          value={downloadEmail}
                          onChange={(e) => setDownloadEmail(e.target.value)}
                          placeholder="anand@pharma.com"
                          className="h-9 text-xs"
                        />
                      </div>

                      <div className="space-y-1">
                        <Label htmlFor="res-company" className="text-xs font-semibold">
                          Company / Facility (Optional)
                        </Label>
                        <Input
                          id="res-company"
                          value={downloadCompany}
                          onChange={(e) => setDownloadCompany(e.target.value)}
                          placeholder="e.g. Apex BioSciences"
                          className="h-9 text-xs"
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      disabled={downloadState === "loading"}
                      className="w-full h-10 rounded-full font-semibold text-xs shadow-md shadow-primary/20"
                    >
                      {downloadState === "loading" ? (
                        <>
                          <Loader2 className="size-4 animate-spin mr-2" />
                          Unlocking Resource…
                        </>
                      ) : (
                        <>
                          <Download className="size-3.5 mr-1.5" />
                          Unlock & Download Free Dossier
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* FAQ + Ask */}
        <div className="mt-14 grid gap-8 lg:grid-cols-[0.9fr_1.4fr] lg:gap-12">
          <div>
            <SectionHeading
              align="left"
              eyebrow="FAQ"
              title="Questions clients ask before the first drawing"
            />
            <Reveal delay={0.08}>
              <div className="mt-5 rounded-xl border border-primary/15 bg-secondary/40 p-5">
                <p className="flex items-center gap-2 font-heading text-sm font-semibold text-primary">
                  <HelpCircle className="size-4" aria-hidden />
                  Something more specific?
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  Ask us directly — technical questions get engineering answers, usually
                  within one working day.
                </p>
                <Button asChild variant="outline" className="mt-4 h-9 rounded-full text-sm font-semibold">
                  <a href="#contact">Ask a Question</a>
                </Button>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.06}>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((f, i) => (
                <AccordionItem key={f.q} value={`faq-${i}`}>
                  <AccordionTrigger className="text-left font-heading text-sm font-semibold hover:no-underline">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>

        {/* Glossary strip */}
        <Reveal delay={0.08}>
          <div className="mt-12 rounded-2xl border bg-haze p-6 sm:p-8 dark:bg-card/60">
            <h3 className="font-heading text-base font-semibold">
              Cleanroom Glossary — speak the language
            </h3>
            <dl className="mt-5 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
              {glossary.map((g) => (
                <div key={g.term}>
                  <dt className="font-heading text-sm font-bold text-primary">{g.term}</dt>
                  <dd className="mt-1 text-xs leading-relaxed text-muted-foreground">{g.def}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

