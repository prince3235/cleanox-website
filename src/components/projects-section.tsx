"use client";

import {
  ArrowRight,
  Boxes,
  ClipboardList,
  Factory,
  Layers,
  Ruler,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Reveal, SectionHeading } from "@/components/reveal";

const templateFields = [
  { icon: Factory, label: "Project type", value: "Sterile Manufacturing Suite" },
  { icon: Ruler, label: "Scale", value: "— sq. ft. / rooms & zones" },
  { icon: Layers, label: "Cleanroom class", value: "e.g., ISO 7 with ISO 5 zones" },
  { icon: Boxes, label: "Scope delivered", value: "Design → Handover summary" },
  { icon: TrendingUp, label: "Outcome", value: "Documented performance summary" },
];

export function ProjectsSection() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="relative overflow-hidden bg-navy-deep py-16 md:py-24"
    >
      <div className="bg-blueprint absolute inset-0" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          dark
          eyebrow="Projects & Portfolio"
          title="Building our portfolio — honestly, from zero"
          description="We are a new company, and this page will prove it either way. Instead of inventing case studies, we have built the complete project template below. The first real Cleanox installations will appear here with measured scope and outcomes — and not before they exist."
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-[1.15fr_1fr]">
          {/* Template card */}
          <Reveal className="h-full">
            <article className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.045] p-6 backdrop-blur-sm sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="flex items-center gap-2.5 font-heading text-base font-semibold text-white">
                  <ClipboardList className="size-5 text-brand-sky" aria-hidden />
                  Project Reference Template
                </h3>
                <Badge className="border-brand-sky/40 bg-brand-sky/10 text-brand-sky text-xs">
                  CMS-ready · awaiting first entry
                </Badge>
              </div>
              <dl className="mt-5 divide-y divide-white/8">
                {templateFields.map((f) => (
                  <div key={f.label} className="flex items-center gap-4 py-3">
                    <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-white/8 text-brand-sky">
                      <f.icon className="size-4" aria-hidden />
                    </span>
                    <dt className="w-28 shrink-0 text-sm font-medium text-slate-300 sm:w-36">
                      {f.label}
                    </dt>
                    <dd className="text-sm text-slate-200/85">{f.value}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-5 text-xs leading-relaxed text-slate-400">
                Illustrative template — the field values shown demonstrate structure only and
                do not describe any completed project.
              </p>
            </article>
          </Reveal>

          {/* What we're doing now + placeholder */}
          <div className="flex flex-col gap-5">
            <Reveal delay={0.08}>
              <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-6 backdrop-blur-sm sm:p-8">
                <h3 className="font-heading text-base font-semibold text-white">
                  What Cleanox is doing right now
                </h3>
                <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-slate-300">
                  <li className="flex gap-2.5">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand-green" aria-hidden />
                    Designing and costing cleanroom projects for prospective clients
                  </li>
                  <li className="flex gap-2.5">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand-green" aria-hidden />
                    Building supplier and installation partnerships across India
                  </li>
                  <li className="flex gap-2.5">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand-green" aria-hidden />
                    Preparing the documentation systems our projects will be audited against
                  </li>
                </ul>
                <p className="mt-5 border-t border-white/8 pt-4 text-sm leading-relaxed text-slate-300">
                  Founding clients get founder-level attention on every detail — and full
                  permission to publish the results.
                </p>
                <Button
                  asChild
                  className="mt-5 h-10 rounded-full bg-brand-blue text-sm font-semibold text-white hover:bg-brand-blue/90"
                >
                  <a href="#contact">
                    Become a Founding Client
                    <ArrowRight className="size-4" aria-hidden />
                  </a>
                </Button>
              </div>
            </Reveal>

            <Reveal delay={0.14}>
              <div className="flex flex-1 items-center justify-center rounded-2xl border-2 border-dashed border-white/12 p-8 text-center">
                <p className="max-w-xs text-sm leading-relaxed text-slate-400">
                  Reserved slots for real project references.
                  <span className="mt-2 block font-heading text-sm font-semibold text-slate-300">
                    First entries under review.
                  </span>
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
