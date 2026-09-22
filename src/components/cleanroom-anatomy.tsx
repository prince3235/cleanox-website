"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AirVent,
  ArrowRight,
  CheckCircle2,
  Cpu,
  DoorClosed,
  Eye,
  Filter,
  Gauge,
  Layers,
  ShieldCheck,
  Sparkles,
  Wind,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SectionHeading, Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

interface Hotspot {
  id: string;
  name: string;
  tag: string;
  x: number; // percentage from left
  y: number; // percentage from top
  icon: typeof Filter;
  role: string;
  standard: string;
  specs: string[];
  solutionSlug: string;
}

const hotspots: Hotspot[] = [
  {
    id: "hepa",
    name: "Terminal HEPA / FFU Ceiling Array",
    tag: "Clean Air Delivery",
    x: 48,
    y: 18,
    icon: Filter,
    role: "Delivers micro-filtered air directly over the aseptic process core with uniform face velocity, creating the first line of particulate defense.",
    standard: "ISO 14644-1 / EN 1822 H14 (99.995% @ MPPS)",
    specs: [
      "Gel-seal / gasket seal housings with PAO/DOP test ports",
      "0.36 to 0.54 m/s controlled unidirectional face velocity",
      "Integrated flush LED cleanroom lighting modules",
    ],
    solutionSlug: "hepa-filtration",
  },
  {
    id: "panels",
    name: "Modular PPGI Wall Panels & Coving",
    tag: "Clean Envelope",
    x: 18,
    y: 52,
    icon: Layers,
    role: "Airtight, non-shedding enclosure engineered with seamless radius coving that eliminates 90° corners where microbial contaminants gather.",
    standard: "ISO 14644-4 / Schedule M Hygienic Finishes",
    specs: [
      "50mm double-skin PPGI / SS 304 with PIR or Rockwool insulation",
      "Flush-glazed double-pane safety glass vision panels",
      "Resistant to aggressive sanitizers (VHP, Chlorine, IPA)",
    ],
    solutionSlug: "cleanroom-panels",
  },
  {
    id: "passbox",
    name: "Dynamic Pass-Through Hatch",
    tag: "Material Transfer",
    x: 84,
    y: 58,
    icon: AirVent,
    role: "Transfers raw materials, vials, and tooling between cleanroom zones without breaching pressure cascades or personnel airlocks.",
    standard: "EU GMP Annex 1 Grade A/B Material Discipline",
    specs: [
      "Internal HEPA recirculation with magnehelic DP gauge",
      "Electromagnetic interlocking doors (cannot open simultaneously)",
      "UV-C decontamination cycle timer and status beacons",
    ],
    solutionSlug: "pass-box",
  },
  {
    id: "doors",
    name: "Flush Hermetic Doors & Interlocks",
    tag: "Pressure Retention",
    x: 32,
    y: 72,
    icon: DoorClosed,
    role: "Sealed perimeter entryways equipped with automatic drop seals and PLC interlocks that prevent differential pressure loss during traffic.",
    standard: "ISPE Baseline Guide Vol 4 Airlock Sequences",
    specs: [
      "Drop-down acoustic & pneumatic bottom silicone seals",
      "Flush double-glazed windows with dessicant matrix",
      "Card-swipe / push-plate access with emergency override",
    ],
    solutionSlug: "cleanroom-doors",
  },
  {
    id: "risers",
    name: "Low-Level Return Air Risers",
    tag: "Contamination Sweep",
    x: 62,
    y: 82,
    icon: Wind,
    role: "Pulls airborne particulates down toward the floor and extracts them out of the cleanroom envelope, preventing recirculation at breathing height.",
    standard: "ASHRAE 170 Air Balance & Sweep Dynamics",
    specs: [
      "Perforated SS 304 grilles with cleanable lint pre-filters",
      "Integrated volume control dampers for room air balancing",
      "Direct duct connections back to secondary filtration AHU",
    ],
    solutionSlug: "hvac-ahu",
  },
  {
    id: "sensors",
    name: "Continuous Environmental Monitoring (EMS)",
    tag: "Regulatory Audit",
    x: 68,
    y: 38,
    icon: Gauge,
    role: "Continuously monitors differential pressure (DP), air velocity, temperature, relative humidity, and non-viable particle counts in real time.",
    standard: "US FDA 21 CFR Part 11 / EU GMP Annex 1",
    specs: [
      "High-accuracy differential pressure transmitters (±1 Pa)",
      "Multi-channel laser particle counters for 0.5µm & 5.0µm",
      "Audible/visual stack lights and automatic compliance data logs",
    ],
    solutionSlug: "ems",
  },
];

export function CleanroomAnatomySection() {
  const [activeHotspotId, setActiveHotspotId] = useState<string>("hepa");

  const activeHotspot =
    hotspots.find((h) => h.id === activeHotspotId) ?? hotspots[0];
  const ActiveIcon = activeHotspot.icon;

  const scrollToSolution = () => {
    const el = document.getElementById("solutions");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="anatomy"
      aria-labelledby="anatomy-heading"
      className="bg-white py-16 md:py-24 dark:bg-card/20 border-t border-border/40"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            align="left"
            eyebrow="Cleanroom Engineering Anatomy"
            title="Inside a compliant controlled facility"
            description="Explore the interconnected subsystems that make an audit-ready cleanroom suite. Click any hotspot on the technical blueprint to inspect its engineering design and GMP compliance role."
          />

          <Badge variant="outline" className="hidden lg:flex items-center gap-1.5 h-8 px-3 text-xs font-semibold">
            <Eye className="size-3.5 text-primary" />
            <span>Interactive Facility Blueprint</span>
          </Badge>
        </div>

        {/* Mobile quick switcher chips */}
        <div className="mt-8 flex gap-2 overflow-x-auto pb-2 scrollbar-slim lg:hidden">
          {hotspots.map((h) => {
            const Icon = h.icon;
            const isActive = h.id === activeHotspotId;
            return (
              <button
                key={h.id}
                type="button"
                onClick={() => setActiveHotspotId(h.id)}
                className={cn(
                  "flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all",
                  isActive
                    ? "border-primary bg-primary text-primary-foreground font-semibold shadow-sm"
                    : "border-border bg-card text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className="size-3.5" />
                <span>{h.name.split(" ")[0]}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-center">
          {/* Blueprint Diagram Card (Left / Top) */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border bg-gradient-to-br from-navy-deep via-[#0a2747] to-[#041224] p-4 sm:p-6 shadow-xl ring-1 ring-white/10">
              {/* Technical Blueprint Grid Pattern */}
              <div
                className="pointer-events-none absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, rgba(41,168,224,0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(41,168,224,0.3) 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                }}
                aria-hidden
              />

              {/* Cleanroom Cross-Section Schematic Elements */}
              <svg
                viewBox="0 0 800 500"
                className="absolute inset-0 h-full w-full pointer-events-none"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  <linearGradient id="airSupplyGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#29a8e0" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#29a8e0" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Ceiling Plenum & Grid */}
                <rect x="100" y="40" width="600" height="60" fill="rgba(255,255,255,0.06)" stroke="#29a8e0" strokeWidth="1.5" strokeOpacity="0.4" />
                <text x="400" y="75" textAnchor="middle" fill="#94a3b8" fontSize="11" letterSpacing="2">WALKABLE CEILING PLENUM & HEPA GRID</text>

                {/* Airflow Streams */}
                <rect x="250" y="100" width="300" height="260" fill="url(#airSupplyGrad)" opacity="0.6" />
                {[280, 330, 380, 430, 480, 520].map((x) => (
                  <line
                    key={x}
                    x1={x}
                    y1="100"
                    x2={x}
                    y2="340"
                    stroke="#29a8e0"
                    strokeWidth="1.5"
                    strokeDasharray="4 8"
                    strokeOpacity="0.45"
                  />
                ))}

                {/* Walls */}
                <rect x="100" y="100" width="30" height="280" fill="rgba(255,255,255,0.08)" stroke="#29a8e0" strokeWidth="1" strokeOpacity="0.5" />
                <rect x="670" y="100" width="30" height="280" fill="rgba(255,255,255,0.08)" stroke="#29a8e0" strokeWidth="1" strokeOpacity="0.5" />

                {/* Clean Floor Slab & Coving */}
                <rect x="100" y="380" width="600" height="40" fill="rgba(255,255,255,0.05)" stroke="#64748b" strokeWidth="1" />
                <path d="M 130 380 Q 130 370 140 370" fill="none" stroke="#29a8e0" strokeWidth="2" strokeOpacity="0.7" />
                <path d="M 670 380 Q 670 370 660 370" fill="none" stroke="#29a8e0" strokeWidth="2" strokeOpacity="0.7" />

                {/* Low-Level Return Air Duct */}
                <rect x="490" y="350" width="50" height="30" fill="rgba(18,166,180,0.2)" stroke="#12a6b4" strokeWidth="1.5" />
                <text x="515" y="370" textAnchor="middle" fill="#29a8e0" fontSize="9">RETURN</text>

                {/* Dynamic Pass Box Unit */}
                <rect x="655" y="240" width="45" height="50" fill="rgba(255,255,255,0.15)" stroke="#29a8e0" strokeWidth="1.5" />
                <text x="677" y="270" textAnchor="middle" fill="#fff" fontSize="8">HATCH</text>

                {/* Doorway */}
                <rect x="230" y="270" width="40" height="110" fill="rgba(255,255,255,0.08)" stroke="#94a3b8" strokeWidth="1.5" />
                <line x1="230" y1="270" x2="260" y2="250" stroke="#3aa53f" strokeWidth="2" />
              </svg>

              {/* Hotspot Interactive Trigger Buttons */}
              {hotspots.map((h, idx) => {
                const isActive = h.id === activeHotspotId;
                return (
                  <button
                    key={h.id}
                    type="button"
                    onClick={() => setActiveHotspotId(h.id)}
                    style={{ left: `${h.x}%`, top: `${h.y}%` }}
                    className={cn(
                      "group absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-transform",
                      isActive ? "scale-125 z-30" : "hover:scale-110 z-20"
                    )}
                    aria-label={`Inspect ${h.name}`}
                  >
                    {/* Pulsing ring */}
                    <span
                      className={cn(
                        "absolute size-8 rounded-full transition-opacity",
                        isActive
                          ? "animate-ping bg-brand-sky/40"
                          : "bg-primary/20 opacity-0 group-hover:opacity-100"
                      )}
                    />

                    {/* Button badge */}
                    <span
                      className={cn(
                        "relative flex size-7 items-center justify-center rounded-full text-xs font-bold shadow-lg transition-all",
                        isActive
                          ? "bg-brand-sky text-navy-deep ring-4 ring-brand-sky/40"
                          : "bg-card/90 text-primary border border-primary/40 hover:bg-primary hover:text-white"
                      )}
                    >
                      {idx + 1}
                    </span>

                    {/* Label tooltip */}
                    <span
                      className={cn(
                        "pointer-events-none absolute left-1/2 top-full mt-1.5 -translate-x-1/2 whitespace-nowrap rounded-md px-2 py-0.5 text-[0.65rem] font-semibold tracking-wide backdrop-blur-md transition-all shadow-md",
                        isActive
                          ? "bg-primary text-white opacity-100"
                          : "bg-navy-deep/90 text-slate-300 opacity-0 group-hover:opacity-100"
                      )}
                    >
                      {h.name.split(" ")[0]}
                    </span>
                  </button>
                );
              })}

              <div className="absolute bottom-3 left-4 text-[0.68rem] text-slate-400 font-mono">
                CleanOx BIM Engineering Suite · ISO 14644-4 Elevation Model
              </div>
            </div>
          </div>

          {/* Detailed Hotspot Breakdown Card (Right / Bottom) */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border bg-card p-6 sm:p-7 shadow-lg relative overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeHotspot.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-5"
                >
                  <div className="flex items-start justify-between gap-3 border-b pb-4">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
                        <ActiveIcon className="size-6" />
                      </span>
                      <div>
                        <Badge variant="secondary" className="text-[0.68rem] font-bold uppercase tracking-wider mb-1">
                          {activeHotspot.tag}
                        </Badge>
                        <h3 className="font-heading text-lg sm:text-xl font-bold text-foreground leading-snug">
                          {activeHotspot.name}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {activeHotspot.role}
                  </p>

                  <div className="rounded-xl border bg-secondary/30 p-3.5 space-y-1">
                    <p className="text-[0.68rem] font-bold uppercase tracking-wider text-muted-foreground">
                      Regulatory & Testing Standard
                    </p>
                    <p className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                      <ShieldCheck className="size-4 text-brand-green shrink-0" />
                      {activeHotspot.standard}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs font-bold uppercase tracking-wider text-foreground/85">
                      Key Engineering Parameters:
                    </p>
                    <ul className="space-y-2">
                      {activeHotspot.specs.map((spec) => (
                        <li key={spec} className="flex items-start gap-2 text-xs text-foreground/80 leading-normal">
                          <CheckCircle2 className="size-3.5 text-brand-green mt-0.5 shrink-0" />
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                    <Button
                      onClick={scrollToSolution}
                      className="rounded-full text-xs font-semibold shadow-sm flex-1"
                    >
                      Explore Related System
                      <ArrowRight className="size-3.5 ml-1.5" />
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="rounded-full text-xs font-semibold"
                    >
                      <a href="#contact">Consult Engineer</a>
                    </Button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
