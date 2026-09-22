"use client";

import Image from "next/image";
import { Compass, HeartHandshake, Microscope, ShieldCheck } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/reveal";
import { site } from "@/lib/site";

const pillars = [
  {
    icon: Compass,
    title: "Our Vision",
    body: "To make engineered contamination control accessible to every pharma and life-science manufacturer that needs it — built right the first time, documented end to end.",
  },
  {
    icon: Microscope,
    title: "Engineering Philosophy",
    body: "Every cleanroom starts from your process, not from a template. Airflow, zoning and pressure cascades are calculated around what you actually make and how you make it.",
  },
  {
    icon: ShieldCheck,
    title: "Quality Mindset",
    body: "We design to recognized standards — ISO 14644, EU GMP Annex 1, WHO GMP, Schedule M, USFDA cGMP — and hand over the test records to prove the design was met.",
  },
  {
    icon: HeartHandshake,
    title: "Customer Focus",
    body: "Single-point accountability from consultation to handover, plain-language communication at every milestone, and support that continues after commissioning.",
  },
];

export function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">

          {/* Image composition — order: mobile shows text first, then image */}
          <Reveal className="relative order-2 lg:order-1">
            {/* Outer container holds the images; padding-bottom gives room for the thumbnail */}
            <div className="relative pb-10 sm:pb-12 lg:pb-8">
              {/* Main image */}
              <div className="relative overflow-hidden rounded-2xl shadow-xl">
                <Image
                  src="/images/solutions/controlled-environment.jpg"
                  alt="Modular cleanroom suite with stainless-steel process equipment"
                  width={760}
                  height={475}
                  className="h-auto w-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Thumbnail inset — absolute bottom-right, contained within parent */}
              <div className="absolute bottom-0 -right-2 hidden w-44 overflow-hidden rounded-xl border-4 border-background shadow-2xl sm:block md:w-56 lg:w-52">
                <Image
                  src="/images/industries/laf-workstation.jpg"
                  alt="Operator working within a laminar air flow workstation"
                  width={760}
                  height={512}
                  className="h-auto w-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* "New Build" badge — top-left, only on lg+ to avoid mobile clip */}
              <div className="absolute -left-3 -top-3 hidden rounded-xl bg-primary px-4 py-3 text-white shadow-lg lg:block">
                <p className="font-heading text-xl font-bold leading-none">New Build.</p>
                <p className="mt-1 text-[0.7rem] text-white/80">Fresh engineering. Zero shortcuts.</p>
              </div>
            </div>
          </Reveal>

          {/* Copy + pillars */}
          <div className="order-1 lg:order-2">
            <SectionHeading
              align="left"
              eyebrow="About Cleanox"
              title="A new-generation cleanroom engineering partner — built on transparency and technical depth"
              description="Cleanox is a newly established pharmaceutical cleanroom solutions company. We will not claim decades of history we do not have. What we offer instead: rigorous engineering practice, standards-aligned design, and full documentation on every engagement — so our work speaks before our track record does."
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {pillars.map((p, i) => (
                <Reveal key={p.title} delay={0.07 * i}>
                  <div className="group h-full rounded-xl border bg-card p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary/35 hover:shadow-md">
                    <div className="inline-flex size-10 items-center justify-center rounded-lg bg-secondary text-primary transition-colors duration-200 group-hover:bg-primary group-hover:text-primary-foreground">
                      <p.icon className="size-5" aria-hidden />
                    </div>
                    <h3 className="mt-3 font-heading text-sm font-semibold">{p.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.18}>
              <p className="mt-5 text-sm italic text-muted-foreground">
                {site.legalName} — established {site.founded}.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
