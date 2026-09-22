"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Clock,
  Cpu,
  FileBadge,
  HardHat,
  KeyRound,
  MessagesSquare,
  PackageSearch,
  PencilRuler,
  Settings2,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/reveal";
import { processSteps } from "@/lib/data";
import { cn } from "@/lib/utils";

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

// Enriched technical details for each accountable stage
const stageDetails: Record<
  string,
  {
    timeline: string;
    activities: string[];
    documentation: string;
    standardsFocus: string;
  }
> = {
  consultation: {
    timeline: "Week 1",
    activities: [
      "User Requirement Specification (URS) review & regulatory route scoping",
      "Process flow & contamination risk assessment (containment vs. aseptic)",
      "Site structural, floor loading & utility envelope feasibility inspection",
    ],
    documentation: "Signed URS Baseline & Technical Feasibility Report",
    standardsFocus: "ISO 14644-1 / WHO GMP / EU GMP Annex 1",
  },
  design: {
    timeline: "Weeks 2–3",
    activities: [
      "Zoning & airflow schematic development (Grade A through CNC)",
      "Differential pressure cascade calculations & air change rate (ACH) sizing",
      "Thermal load calculations & sensible/latent heat balancing",
    ],
    documentation: "Design Qualification (DQ) Documentation & Architectural Concept",
    standardsFocus: "ISPE Baseline Guide Vol 4 / ISO 14644-4",
  },
  engineering: {
    timeline: "Weeks 3–5",
    activities: [
      "Detailed 3D BIM coordination for ducting, piping, electricals & ceiling grids",
      "Issue For Construction (IFC) civil, architectural & MEP drawings",
      "Procurement Bill of Materials (BOM) & equipment data sheets sign-off",
    ],
    documentation: "Full IFC Drawing Set, P&ID, Wiring Diagrams & Technical BOM",
    standardsFocus: "ASHRAE 170 / NFPA / ISO 14644-4",
  },
  supply: {
    timeline: "Weeks 5–8",
    activities: [
      "Factory Acceptance Testing (FAT) for AHUs, chillers & dynamic equipment",
      "Pre-inspected modular PPGI/SS sandwich panels & flush accessories",
      "Certified H14 HEPA/ULPA filters with factory leak test certificates",
    ],
    documentation: "FAT Certificates, Material Test Reports (MTR) & Shipping Manifests",
    standardsFocus: "EN 1822 / ISO 29463 (HEPA/ULPA)",
  },
  installation: {
    timeline: "Weeks 8–11",
    activities: [
      "Dust-free panel erection with food-grade silicone coving & gasketed joints",
      "Airtight HVAC ductwork installation with leakage testing per SMACNA",
      "Flush cleanroom doors, interlocks, vision panels & walkable ceilings",
    ],
    documentation: "Site Erection Logs, Duct Leakage Test Reports & Daily QA Sign-offs",
    standardsFocus: "SMACNA HVAC Duct Leakage / ISO 14644-4",
  },
  testing: {
    timeline: "Week 12",
    activities: [
      "DOP / PAO aerosol challenge testing for terminal HEPA filter integrity",
      "Airflow velocity & volume measurements to confirm design ACH",
      "Room differential pressure, temperature & relative humidity stabilization",
    ],
    documentation: "Comprehensive Cleanroom Test Report & Calibration Certificates",
    standardsFocus: "ISO 14644-3 (Test Methods)",
  },
  commissioning: {
    timeline: "Weeks 12–13",
    activities: [
      "Air balancing between zones & airlock interlock sequence verification",
      "EMS/BMS sensor calibration & high/low alarm parameter tuning",
      "Integrated 72-hour continuous thermal & pressure stability run",
    ],
    documentation: "Integrated Commissioning Statement & Final Balancing Sheets",
    standardsFocus: "NEBB / CIBSE Commissioning Codes",
  },
  validation: {
    timeline: "Weeks 13–14",
    activities: [
      "Installation Qualification (IQ) protocol execution & component verification",
      "Operational Qualification (OQ) protocols: recovery time & particle counts 'at rest'",
      "Airflow visualization smoke pattern studies (unidirectional zones)",
    ],
    documentation: "Executed IQ/OQ Protocols, Smoke Study Video & Traceability Matrix",
    standardsFocus: "EU GMP Annex 1 / US FDA 21 CFR Part 211",
  },
  handover: {
    timeline: "Week 15",
    activities: [
      "Facility handover with operations & maintenance staff training",
      "Provision of complete As-Built drawing dossiers and spare parts list",
      "Establishment of routine preventative maintenance & re-certification plan",
    ],
    documentation: "As-Built Dossier, O&M Manuals, Warranty & Support SLA",
    standardsFocus: "ISO 9001 / CleanOx Lifetime Engineering Guarantee",
  },
};

export function ProcessSection() {
  const [activeStep, setActiveStep] = useState(0);
  const currentStep = processSteps[activeStep];
  const details = stageDetails[currentStep.id] ?? stageDetails.consultation;
  const Icon = icons[currentStep.icon] ?? ClipboardCheck;

  const nextStep = () => {
    setActiveStep((prev) => (prev + 1) % processSteps.length);
  };

  const prevStep = () => {
    setActiveStep((prev) => (prev - 1 + processSteps.length) % processSteps.length);
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
            description="From initial feasibility to audit-ready handover, every milestone produces an uncompromised engineering deliverable. Select any stage to review our technical execution protocol."
          />
          {/* Progress counter pill */}
          <div className="hidden shrink-0 items-center gap-3 rounded-full border bg-secondary/50 px-4 py-2 text-xs font-semibold text-foreground lg:flex">
            <span className="inline-block size-2 rounded-full bg-brand-green animate-pulse" />
            <span>Stage {String(activeStep + 1).padStart(2, "0")} of {String(processSteps.length).padStart(2, "0")}</span>
            <span className="text-muted-foreground">|</span>
            <span className="text-primary font-medium">{details.timeline}</span>
          </div>
        </div>

        {/* Mobile / Tablet Horizontal Stepper Strip */}
        <div className="mt-8 flex gap-2 overflow-x-auto pb-2 scrollbar-slim lg:hidden">
          {processSteps.map((step, idx) => {
            const StepIcon = icons[step.icon] ?? ClipboardCheck;
            const isActive = idx === activeStep;
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => setActiveStep(idx)}
                className={cn(
                  "flex shrink-0 items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold transition-all",
                  isActive
                    ? "border-primary bg-primary text-primary-foreground shadow-md"
                    : "border-border bg-card text-foreground/70 hover:border-primary/40 hover:text-foreground"
                )}
                aria-pressed={isActive}
              >
                <StepIcon className="size-3.5" aria-hidden />
                <span>{String(idx + 1).padStart(2, "0")}. {step.title}</span>
              </button>
            );
          })}
        </div>

        {/* Main 2-Column Stepper on Desktop */}
        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Vertical Interactive List */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="relative rounded-2xl border bg-card/60 p-3 shadow-sm backdrop-blur-sm">
              <div className="space-y-1.5" role="tablist" aria-label="Process stages">
                {processSteps.map((step, idx) => {
                  const StepIcon = icons[step.icon] ?? ClipboardCheck;
                  const isActive = idx === activeStep;
                  return (
                    <button
                      key={step.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveStep(idx)}
                      className={cn(
                        "group relative flex w-full items-center gap-3.5 rounded-xl p-3 text-left transition-all duration-200 focus-visible:outline-2 focus-visible:outline-ring",
                        isActive
                          ? "bg-primary text-primary-foreground shadow-md shadow-primary/20 ring-1 ring-primary/40"
                          : "text-foreground/75 hover:bg-secondary/70 hover:text-foreground"
                      )}
                    >
                      {/* Step Number Badge */}
                      <span
                        className={cn(
                          "inline-flex size-9 shrink-0 items-center justify-center rounded-lg text-xs font-bold transition-colors",
                          isActive
                            ? "bg-white/20 text-white"
                            : "border bg-background text-primary group-hover:border-primary/30"
                        )}
                      >
                        {String(idx + 1).padStart(2, "0")}
                      </span>

                      {/* Title & Preview */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <span
                            className={cn(
                              "font-heading text-sm font-semibold truncate",
                              isActive ? "text-white" : "text-foreground"
                            )}
                          >
                            {step.title}
                          </span>
                          <span
                            className={cn(
                              "text-[0.68rem] font-medium uppercase tracking-wider",
                              isActive ? "text-white/80" : "text-muted-foreground"
                            )}
                          >
                            {stageDetails[step.id]?.timeline}
                          </span>
                        </div>
                        <p
                          className={cn(
                            "truncate text-xs mt-0.5",
                            isActive ? "text-white/80" : "text-muted-foreground"
                          )}
                        >
                          {step.short}
                        </p>
                      </div>

                      {/* Right Chevron on Active */}
                      <ChevronRight
                        className={cn(
                          "size-4 shrink-0 transition-transform duration-200",
                          isActive
                            ? "text-white translate-x-0.5 opacity-100"
                            : "text-muted-foreground/40 opacity-0 group-hover:opacity-100"
                        )}
                        aria-hidden
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Active Stage Rich Card with AnimatePresence */}
          <div className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-2xl border bg-card p-6 shadow-lg sm:p-8">
              {/* Decorative background glow */}
              <div
                className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-primary/5 blur-3xl"
                aria-hidden
              />

              {/* Top Progress Bar */}
              <div className="mb-6 flex items-center justify-between border-b pb-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary">
                  <span className="inline-flex size-6 items-center justify-center rounded-full bg-primary/10 text-primary text-[0.65rem]">
                    {activeStep + 1}
                  </span>
                  <span>Stage {String(activeStep + 1).padStart(2, "0")} / {String(processSteps.length).padStart(2, "0")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-foreground/80">
                    <Clock className="size-3 text-primary" aria-hidden />
                    {details.timeline}
                  </span>
                  <span className="hidden sm:inline-flex items-center gap-1 rounded-full border border-brand-green/30 bg-brand-green/10 px-3 py-1 text-xs font-semibold text-brand-green">
                    <ShieldCheck className="size-3" aria-hidden />
                    {details.standardsFocus}
                  </span>
                </div>
              </div>

              {/* Animated Stage Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.22, ease: "easeInOut" }}
                  className="space-y-6"
                >
                  {/* Title & Icon Header */}
                  <div className="flex items-start gap-4">
                    <span className="inline-flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/15 to-brand-sky/20 text-primary ring-1 ring-primary/20 shadow-inner">
                      <Icon className="size-7" aria-hidden />
                    </span>
                    <div>
                      <h3 className="font-heading text-xl font-bold tracking-tight sm:text-2xl text-foreground">
                        {currentStep.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {currentStep.short}
                      </p>
                    </div>
                  </div>

                  {/* Key Engineering Activities Checklist */}
                  <div className="rounded-xl border bg-secondary/30 p-4 sm:p-5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-foreground/90">
                      Key Engineering Scope & Activities
                    </h4>
                    <ul className="mt-3 space-y-2.5">
                      {details.activities.map((act) => (
                        <li key={act} className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground/85 leading-normal">
                          <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-brand-green" aria-hidden />
                          <span>{act}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Guaranteed Deliverable Highlight */}
                  <div className="rounded-xl border border-primary/25 bg-gradient-to-br from-primary/5 via-card to-brand-sky/5 p-4 sm:p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-[0.68rem] font-bold uppercase tracking-widest text-primary">
                          Stage Gate Deliverable
                        </p>
                        <p className="mt-1 font-heading text-sm sm:text-base font-bold text-foreground">
                          {currentStep.deliverable}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          Signed off jointly with client project managers before progressing to the next stage.
                        </p>
                      </div>
                      <span className="hidden sm:inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <FileBadge className="size-5" aria-hidden />
                      </span>
                    </div>
                  </div>

                  {/* Documentation & Sign-off Dossier */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-lg border border-border/80 bg-background/50 px-4 py-3 text-xs">
                    <span className="text-muted-foreground">
                      <strong className="text-foreground">Audit Record:</strong> {details.documentation}
                    </span>
                    <span className="shrink-0 font-medium text-primary">GMP Compliance Assured</span>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Footer */}
              <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t pt-5">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={prevStep}
                    className="h-9 gap-1 rounded-full text-xs font-semibold"
                    aria-label="Previous process stage"
                  >
                    <ChevronLeft className="size-4" aria-hidden />
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={nextStep}
                    className="h-9 gap-1 rounded-full text-xs font-semibold"
                    aria-label="Next process stage"
                  >
                    Next
                    <ChevronRight className="size-4" aria-hidden />
                  </Button>
                </div>

                <Button asChild size="sm" className="h-9 rounded-full font-semibold text-xs shadow-sm shadow-primary/20">
                  <a href="#contact">
                    Discuss Project Requirements
                    <ArrowRight className="size-3.5 ml-1" aria-hidden />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

