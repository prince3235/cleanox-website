"use client";

import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Filter,
  HelpCircle,
  Info,
  Ruler,
  ShieldCheck,
  TableProperties,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionHeading, Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

interface StandardRow {
  grade: string;
  isoClass: string;
  fedStd: string;
  particlesRest05: string;
  particlesOper05: string;
  particlesRest50: string;
  particlesOper50: string;
  ach: string;
  application: string;
  appKey: string;
  cleanoxSystem: string;
}

const matrixData: StandardRow[] = [
  {
    grade: "Grade A",
    isoClass: "ISO 5",
    fedStd: "Class 100",
    particlesRest05: "3,520",
    particlesOper05: "3,520",
    particlesRest50: "29",
    particlesOper50: "29",
    ach: "Unidirectional 0.36–0.54 m/s",
    application: "Aseptic filling lines, sterile vial sealing, open ampoules",
    appKey: "aseptic",
    cleanoxSystem: "Laminar Air Flow (LAF) & 100% HEPA Ceiling Grid",
  },
  {
    grade: "Grade B",
    isoClass: "ISO 5 (at rest) / ISO 7 (in operation)",
    fedStd: "Class 100 (rest)",
    particlesRest05: "3,520",
    particlesOper05: "352,000",
    particlesRest50: "29",
    particlesOper50: "2,930",
    ach: "45 – 60+ ACH",
    application: "Background environment for Grade A critical zones",
    appKey: "background",
    cleanoxSystem: "Modular PPGI Paneling & Multi-stage AHU",
  },
  {
    grade: "Grade C",
    isoClass: "ISO 7 (at rest) / ISO 8 (in operation)",
    fedStd: "Class 10,000",
    particlesRest05: "352,000",
    particlesOper05: "3,520,000",
    particlesRest50: "2,930",
    particlesOper50: "29,300",
    ach: "25 – 40 ACH",
    application: "Preparation of solutions to be filtered, component washing",
    appKey: "formulation",
    cleanoxSystem: "Controlled Pressure Airlocks & Dynamic Pass-Boxes",
  },
  {
    grade: "Grade D",
    isoClass: "ISO 8 (at rest)",
    fedStd: "Class 100,000",
    particlesRest05: "3,520,000",
    particlesOper05: "Not defined",
    particlesRest50: "29,300",
    particlesOper50: "Not defined",
    ach: "15 – 25 ACH",
    application: "Handling of components after washing, secondary packaging",
    appKey: "packaging",
    cleanoxSystem: "Flush Sealed Envelope & Return Air Grilles",
  },
  {
    grade: "CNC",
    isoClass: "Unclassified",
    fedStd: "Ambient Control",
    particlesRest05: "Not specified",
    particlesOper05: "Not specified",
    particlesRest50: "Not specified",
    particlesOper50: "Not specified",
    ach: "10 – 15 ACH",
    application: "Gowning change rooms, staging corridors, buffer areas",
    appKey: "support",
    cleanoxSystem: "Sanitary Finishes & Differential Pressure Monitoring",
  },
];

const appFilters = [
  { label: "All Grades", key: "all" },
  { label: "Aseptic Filling (Grade A)", key: "aseptic" },
  { label: "Filling Background (Grade B)", key: "background" },
  { label: "Formulation (Grade C)", key: "formulation" },
  { label: "Packaging & OSD (Grade D)", key: "packaging" },
];

export function StandardsMatrixSection() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredData =
    activeFilter === "all"
      ? matrixData
      : matrixData.filter((r) => r.appKey === activeFilter);

  return (
    <div className="mt-14 rounded-2xl border bg-card p-6 shadow-md sm:p-8 dark:bg-card/60">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <TableProperties className="size-4 text-primary" />
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              Engineering Cross-Reference
            </span>
          </div>
          <h3 className="font-heading text-lg sm:text-xl font-bold text-foreground">
            ISO 14644 vs. EU GMP Annex 1 vs. US FDA Matrix
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5 max-w-2xl">
            Correlate cleanroom cleanliness tiers, particulate counts per m³ (at rest & in operation), and standard air change rates across global pharma regulatory regimes.
          </p>
        </div>

        <Badge variant="secondary" className="self-start sm:self-auto text-[0.7rem] font-semibold">
          Annex 1 (2022 Rev) Aligned
        </Badge>
      </div>

      {/* Application quick filters */}
      <div className="mt-5 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-slim">
        <span className="text-xs font-semibold text-muted-foreground shrink-0 flex items-center gap-1">
          <Filter className="size-3 text-primary" /> Filter by Target Operation:
        </span>
        {appFilters.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setActiveFilter(f.key)}
            className={cn(
              "rounded-full px-3 py-1 text-xs font-medium transition-colors shrink-0 border",
              activeFilter === f.key
                ? "border-primary bg-primary text-primary-foreground font-semibold shadow-xs"
                : "border-border bg-background text-muted-foreground hover:text-foreground"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Cross-Reference Table */}
      <div className="mt-5 overflow-x-auto rounded-xl border bg-background/50 scrollbar-slim">
        <table className="w-full min-w-[760px] text-left text-xs border-collapse">
          <thead>
            <tr className="border-b bg-secondary/40 text-muted-foreground font-semibold">
              <th className="p-3">EU GMP</th>
              <th className="p-3">ISO 14644-1</th>
              <th className="p-3">US Fed 209E</th>
              <th className="p-3">Particles ≥0.5µm (Rest)</th>
              <th className="p-3">Particles ≥0.5µm (Operation)</th>
              <th className="p-3">Air Change Rate (ACH)</th>
              <th className="p-3">CleanOx Engineering Scope</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredData.map((row) => (
              <tr
                key={row.grade}
                className={cn(
                  "hover:bg-primary/5 transition-colors",
                  row.grade === "Grade A" && "bg-brand-sky/5 font-medium"
                )}
              >
                <td className="p-3">
                  <span className="font-bold text-foreground font-heading">
                    {row.grade}
                  </span>
                </td>
                <td className="p-3">
                  <Badge variant="outline" className="text-[0.68rem] font-semibold">
                    {row.isoClass}
                  </Badge>
                </td>
                <td className="p-3 text-muted-foreground">{row.fedStd}</td>
                <td className="p-3 font-mono text-foreground/90">
                  {row.particlesRest05}
                </td>
                <td className="p-3 font-mono text-foreground/90">
                  {row.particlesOper05}
                </td>
                <td className="p-3 text-primary font-medium">{row.ach}</td>
                <td className="p-3 text-muted-foreground">{row.cleanoxSystem}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[0.72rem] text-muted-foreground pt-1">
        <p className="flex items-center gap-1.5">
          <Info className="size-3.5 text-primary shrink-0" />
          Particle counts are defined per cubic metre (m³) per ISO 14644-1 and revised EU GMP Annex 1 guidelines.
        </p>
        <a
          href="#contact"
          className="text-primary font-semibold hover:underline flex items-center gap-1 shrink-0"
        >
          Discuss classification sizing with an engineer →
        </a>
      </div>
    </div>
  );
}
