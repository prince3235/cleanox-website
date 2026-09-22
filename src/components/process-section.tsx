"use client";

import { useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Cpu,
  FileBadge,
  HardHat,
  KeyRound,
  MessagesSquare,
  PackageSearch,
  PencilRuler,
  Settings2,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/reveal";
import { processSteps } from "@/lib/data";

const icons: Record<string, LucideIcon> = {
  MessagesSquare,
  PencilRuler,
  Cpu,
  PackageSearch,
  HardHat,
  ClipboardCheck,
  Settings2,
  FileBadge,
  KeyRound,
};

export function ProcessSection() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    trackRef.current?.scrollBy({ left: dir * 310, behavior: "smooth" });
  };

  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="bg-white py-16 md:py-24 dark:bg-transparent"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            align="left"
            eyebrow="Services & Process"
            title="How we deliver — nine accountable stages"
            description="What Cleanox delivers and how the engagement runs, stage by stage. Each stage ends with a named deliverable, so you always know where your project stands."
          />
          {/* Scroll controls — desktop only */}
          <div className="hidden shrink-0 gap-2 lg:flex" role="group" aria-label="Scroll process stages">
            <Button
              variant="outline"
              size="icon"
              className="size-10 rounded-full"
              onClick={() => scrollBy(-1)}
              aria-label="Scroll to previous stages"
            >
              <ChevronLeft className="size-4" aria-hidden />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="size-10 rounded-full"
              onClick={() => scrollBy(1)}
              aria-label="Scroll to next stages"
            >
              <ChevronRight className="size-4" aria-hidden />
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll track — full width with consistent gutter matching the section container */}
      <div
        ref={trackRef}
        className="scrollbar-slim mt-10 flex snap-x snap-mandatory gap-0 overflow-x-auto px-4 pb-3 sm:px-6 lg:mx-auto lg:max-w-7xl lg:px-8"
        style={{ scrollPaddingLeft: "2rem" }}
      >
        {processSteps.map((step, i) => {
          const Icon = icons[step.icon] ?? ClipboardCheck;
          return (
            <div
              key={step.id}
              className="flex w-[260px] shrink-0 snap-start flex-col sm:w-[290px]"
              aria-label={`Stage ${i + 1} of ${processSteps.length}: ${step.title}`}
            >
              {/* Node + connector line */}
              <div className="flex items-center" aria-hidden>
                <span className="z-10 inline-flex size-11 shrink-0 items-center justify-center rounded-full border-2 border-primary/20 bg-card text-primary shadow-sm">
                  <Icon className="size-5" />
                </span>
                {i < processSteps.length - 1 && (
                  <span className="h-px flex-1 bg-gradient-to-r from-primary/35 to-primary/10" />
                )}
              </div>

              {/* Card */}
              <div className="mx-2.5 mb-1 mt-3 flex flex-1 flex-col rounded-xl border bg-card p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
                <p className="text-[0.65rem] font-bold uppercase tracking-widest text-primary">
                  Stage {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-1.5 font-heading text-base font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.short}</p>
                <p className="mt-auto pt-4 text-xs font-medium text-foreground/70">
                  <span className="font-semibold text-foreground">Deliverable:</span>{" "}
                  {step.deliverable}
                </p>
              </div>
            </div>
          );
        })}
        {/* Trailing spacer so last card has right gutter */}
        <div className="w-4 shrink-0" aria-hidden />
      </div>
    </section>
  );
}
