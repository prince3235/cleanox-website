"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Clock3,
  Download,
  HelpCircle,
  ScrollText,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
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

  const filtered = useMemo(
    () => (active === "All" ? resources : resources.filter((r) => r.topic === active)),
    [active]
  );

  return (
    <section
      id="resources"
      aria-labelledby="resources-heading"
      className="bg-white py-16 md:py-24 dark:bg-transparent"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Resources"
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
                  <div className="mt-auto flex items-center justify-between pt-4">
                    <span className="text-[0.68rem] font-semibold uppercase tracking-wider text-muted-foreground">
                      {r.type}
                    </span>
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-primary transition-colors hover:text-primary/80"
                      aria-label={`Request the article: ${r.title}`}
                    >
                      Read / request
                      <ArrowRight className="size-3.5" aria-hidden />
                    </a>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

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
