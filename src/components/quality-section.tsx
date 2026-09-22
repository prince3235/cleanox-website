"use client";

import { Award, BadgeCheck, FileBadge2, FileCheck2 } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/reveal";

const standards = [
  {
    code: "ISO 14644-1 / -2",
    title: "Cleanroom Classification & Monitoring",
    body: "Room classes, particle-count limits and the monitoring plan that proves them — the baseline vocabulary of every Cleanox layout.",
  },
  {
    code: "EU GMP Annex 1",
    title: "Manufacture of Sterile Products",
    body: "Contamination Control Strategy thinking — barrier technology, airflow visualization readiness and transfer disinfection designed in from day one.",
  },
  {
    code: "WHO GMP",
    title: "Good Manufacturing Practices",
    body: "Global GMP expectations for premises, utilities and documentation, applied for clients supplying regulated markets worldwide.",
  },
  {
    code: "Schedule M (India)",
    title: "Indian GMP Requirements",
    body: "CDSCO-aligned premises, plant and equipment requirements for products manufactured and marketed in India.",
  },
  {
    code: "USFDA cGMP",
    title: "Current Good Manufacturing Practice",
    body: "Design and documentation practice aligned with 21 CFR Parts 210/211 expectations for facilities serving US-regulated products.",
  },
  {
    code: "ISPE Baseline Guides",
    title: "Engineering Design Practice",
    body: "Industry-consensus engineering approaches for HVAC, commissioning and qualification planning referenced throughout our design process.",
  },
];

const qualification = [
  { step: "URS", label: "User Requirement Specification — what the room must do" },
  { step: "DQ", label: "Design Qualification — the design is checked against the URS" },
  { step: "IQ", label: "Installation Qualification — what was installed matches the design" },
  { step: "OQ", label: "Operational Qualification — systems perform across their ranges" },
  { step: "PQ", label: "Performance Qualification — sustained performance under load" },
];

export function QualitySection() {
  return (
    <section
      id="quality"
      aria-labelledby="quality-heading"
      className="bg-haze py-16 md:py-24 dark:bg-[#0c1e30]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Quality & Compliance"
          title="Standards we design to — stated exactly as they are"
          description="Cleanox is a new company: we hold no legacy certifications and we will not imply any. What we commit to is method — designs and engineering practices aligned with the frameworks below, and documentation that lets your QA team verify everything we say."
        />

        {/* Standards grid */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {standards.map((s, i) => (
            <Reveal key={s.code} delay={(i % 3) * 0.06} className="h-full">
              <article className="flex h-full flex-col rounded-xl border bg-card p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg dark:bg-[#0f2540]">
                <div className="flex items-center gap-2">
                  <BadgeCheck className="size-4.5 shrink-0 text-primary" aria-hidden />
                  <h3 className="font-heading text-sm font-bold text-primary">{s.code}</h3>
                </div>
                <p className="mt-1.5 text-sm font-semibold text-foreground">{s.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                <p className="mt-auto pt-4 text-[0.72rem] italic text-muted-foreground/75">
                  Our designs and engineering practices are aligned with this framework.
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Validation approach */}
        <Reveal delay={0.08}>
          <div className="mt-10 overflow-hidden rounded-2xl border bg-card shadow-sm">
            <div className="border-b bg-secondary/50 px-6 py-5 md:px-8">
              <h3 className="flex items-center gap-2.5 font-heading text-lg font-bold">
                <FileCheck2 className="size-5 text-primary" aria-hidden />
                Our Validation & Documentation Approach
              </h3>
              <p className="mt-1.5 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                Every engagement follows a documented qualification path. The sequence below
                describes the industry-standard approach we support — it is a process
                description, not a claim of past validations.
              </p>
            </div>
            <ol className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-5" aria-label="Qualification sequence">
              {qualification.map((q, i) => (
                <li key={q.step} className="flex flex-col bg-card p-5">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex size-7 items-center justify-center rounded-full bg-primary font-heading text-xs font-bold text-primary-foreground">
                      {i + 1}
                    </span>
                    <span className="font-heading text-base font-bold text-primary">{q.step}</span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{q.label}</p>
                </li>
              ))}
            </ol>
            <div className="flex items-start gap-2.5 px-6 py-4 text-xs leading-relaxed text-muted-foreground md:px-8">
              <FileBadge2 className="mt-0.5 size-4 shrink-0 text-brand-green" aria-hidden />
              Handover includes as-built drawings, equipment datasheets, test records and
              IQ/OQ/PQ documentation where in scope — an audit-ready history of the
              facility, not just keys to the door.
            </div>
          </div>
        </Reveal>

        {/* Honest certifications placeholder */}
        <Reveal delay={0.12}>
          <div className="mt-6 flex flex-col items-center gap-4 rounded-2xl border-2 border-dashed border-border bg-background/40 px-6 py-8 text-center">
            <span className="inline-flex size-11 items-center justify-center rounded-full bg-secondary text-primary">
              <Award className="size-5" aria-hidden />
            </span>
            <div>
              <h3 className="font-heading text-base font-semibold">
                Certifications & Accreditations
              </h3>
              <p className="mx-auto mt-1.5 max-w-lg text-sm leading-relaxed text-muted-foreground">
                As a newly established company, Cleanox has not yet obtained third-party
                certifications or accreditations. This reserved space will display verified
                certificates — company registrations, ISO accreditation, industry memberships —
                as they are actually earned.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
