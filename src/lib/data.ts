/**
 * CleanOx content model — typed data consumed by all page sections.
 * Copy is factual and generic-technical by design (see brief §4.2 & §8):
 * describes what equipment does and why it matters, never performance claims
 * about specific CleanOx installations.
 */

export type Solution = {
  slug: string;
  title: string;
  short: string;
  description: string;
  points: string[];
  image: string;
  icon: string;
};

export const solutions: Solution[] = [
  {
    slug: "cleanroom-design",
    title: "Cleanroom Design & Turnkey Execution",
    short: "Concept-to-commissioning delivery of classified environments.",
    description:
      "Layout planning, airflow design, and complete turnkey execution of controlled environments — engineered around your process flow, classification targets, and GMP zoning from day one.",
    points: [
      "Process-driven layout & GMP zoning (Grade A–D / ISO 5–8)",
      "Airflow, pressure-cascade & ACH design calculations",
      "Single-point turnkey responsibility with documented handover",
      "Design qualification (DQ) documentation from the first drawing",
    ],
    image: "/images/solutions/cleanroom-design.jpg",
    icon: "DraftingCompass",
  },
  {
    slug: "hvac-ahu",
    title: "HVAC / AHU Systems",
    short: "Pharma-grade air handling with precise control of temperature, humidity and filtration.",
    description:
      "Cleanroom-duty air handling units and distribution networks with multi-stage filtration, dehumidification coils and hygienic construction — configured for recirculation or once-through duty as your process demands.",
    points: [
      "Hygienic AHU construction with accessible, cleanable internals",
      "Multi-stage filtration: pre → fine → terminal HEPA",
      "Temperature & RH control strategy sized per room load",
      "Energy-efficient recirculation with fresh-air balancing",
    ],
    image: "/images/solutions/hvac-ahu.jpg",
    icon: "Fan",
  },
  {
    slug: "hepa-filtration",
    title: "HEPA Filtration Systems",
    short: "Terminal HEPA/ULPA filtration at 99.95–99.9995% efficiency at MPPS.",
    description:
      "Terminal housings, filter banks and gel-sealed grids engineered around H13/H14 HEPA and ULPA media — the final barrier that decides your room's cleanliness class.",
    points: [
      "H13 (99.95%) and H14 (99.995%) HEPA @ MPPS; ULPA U15+ on request",
      "Gel-seal / gasket terminal housings with DOP test ports",
      "Filter integrity testing (DOP/PAO) as standard practice",
      "Matched plenums for uniform airflow across the ceiling",
    ],
    image: "/images/solutions/hepa-filtration.jpg",
    icon: "Filter",
  },
  {
    slug: "cleanroom-panels",
    title: "Cleanroom Wall & Ceiling Panels",
    short: "Modular flush panels with smooth coving for a sealed, cleanable envelope.",
    description:
      "Prefabricated PPGI / stainless-steel sandwich panels with flush glazing, coved junctions and gasketed joints — built for repeated disinfection and airtight room integrity.",
    points: [
      "Modular PPGI / SS panels with PIR or rockwool cores",
      "Flush windows, vision panels & coved corners",
      "Walkable ceiling grids for HEPA & lighting integration",
      "Fast, low-debris site assembly with minimal hot works",
    ],
    image: "/images/solutions/cleanroom-panels.jpg",
    icon: "LayoutPanelTop",
  },
  {
    slug: "cleanroom-doors",
    title: "Cleanroom Doors & Airlocks",
    short: "Flush doors and interlocked airlocks that protect pressure cascades.",
    description:
      "Airtight hinged, sliding and hermetic doors with drop seals and interlocked personnel / material airlocks — controlling ingress routes so differential pressures hold where they must.",
    points: [
      "Flush PPGI / SS / HPL doors with vision panels",
      "Interlocked airlock sequences (personnel & material)",
      "Automatic & hermetic sliding options for high traffic",
      "Drop seals and gasketing engineered for DP retention",
    ],
    image: "/images/solutions/cleanroom-doors.jpg",
    icon: "DoorClosed",
  },
  {
    slug: "pass-box",
    title: "Pass Boxes (Static & Dynamic)",
    short: "Material transfer hatches that move product, not contamination.",
    description:
      "Static and dynamic (active HEPA-flushed) pass-through boxes that transfer materials between classified zones without opening doors — keeping pressure differentials and cleanliness intact.",
    points: [
      "SS 304 construction with interlocked doors",
      "Dynamic units with internal HEPA recirculation",
      "UV-C option for surface decontamination cycles",
      "Hatch-mounted status indicators for transfer discipline",
    ],
    image: "/images/solutions/pass-box.jpg",
    icon: "PackageCheck",
  },
  {
    slug: "air-shower",
    title: "Air Showers",
    short: "High-velocity HEPA jets strip particulates from gowning before entry.",
    description:
      "Personnel and pallet air showers dislodge surface particles with filtered high-velocity air at the cleanroom boundary — a simple, effective guard for your classification.",
    points: [
      "SS 304 chambers with adjustable nozzle arrays",
      "20–25 m/s jet velocity across garment surfaces",
      "Interlocked entry/exit with cycle-timer control",
      "Pallet / trolley showers for material routes",
    ],
    image: "/images/solutions/air-shower.jpg",
    icon: "Wind",
  },
  {
    slug: "laminar-air-flow",
    title: "Laminar Air Flow (LAF) Units",
    short: "Unidirectional ISO 5 workzones for bench-scale aseptic work.",
    description:
      "Horizontal and vertical LAF benches deliver HEPA-filtered unidirectional airflow over the work surface — protecting product during sampling, dispensing and sterile manipulations.",
    points: [
      "Vertical & horizontal flow configurations",
      "ISO Class 5 workzone at rest (typical)",
      "SS 304 work tray, manometer & UV option",
      "Mobile / tabletop variants for flexible layouts",
    ],
    image: "/images/solutions/laminar-air-flow.jpg",
    icon: "AirVent",
  },
  {
    slug: "ffu-systems",
    title: "Fan Filter Units (FFU)",
    short: "Ceiling-integrated fan + HEPA modules for scalable clean zones.",
    description:
      "Self-contained FFUs combine a fan and HEPA filter in one ceiling module — ideal for modular cleanrooms, retrofit zones and phased capacity expansion without rebuilding the HVAC.",
    points: [
      "Independent speed control per unit (EC fans)",
      "Low noise, low power duty cycles",
      "Retrofit-friendly: drop into standard ceiling grids",
      "Daisy-chained group control options",
    ],
    image: "/images/solutions/ffu-systems.jpg",
    icon: "SquareDot",
  },
  {
    slug: "ems",
    title: "Environmental & Differential Pressure Monitoring",
    short: "Continuous particle, DP, temperature & RH surveillance with alarms and logs.",
    description:
      "Integrated monitoring of particle counts, differential pressures, temperature and humidity — with alarm annunciation and report-grade data logging that supports your QA review.",
    points: [
      "Online particle counters for non-viable monitoring",
      "DP transmitters at every critical boundary",
      "Alarm triggers with audible/visual annunciation",
      "21 CFR Part 11-friendly data logging & reports",
    ],
    image: "/images/solutions/environmental-monitoring.jpg",
    icon: "Gauge",
  },
  {
    slug: "bms",
    title: "Building Management & Monitoring (BMS)",
    short: "Central supervision of HVAC, utilities and cleanroom parameters.",
    description:
      "A single control layer that supervises AHUs, terminal devices and room parameters — trend analysis, setpoint management and audit-ready historical records for the whole facility.",
    points: [
      "Central SCADA-style dashboards with 3D facility views",
      "Setpoint scheduling & energy reporting",
      "Trending for pressure, temp, RH & particle data",
      "Role-based access with audit trails",
    ],
    image: "/images/solutions/bms.jpg",
    icon: "MonitorCog",
  },
  {
    slug: "controlled-environment",
    title: "Controlled Environment Solutions",
    short: "Purpose-built modular cleanrooms, RABS and containment envelopes.",
    description:
      "From single ISO 5 zones to multi-room GMP suites — complete controlled environments integrating panels, HVAC, filtration and monitoring into one coherent, documented system.",
    points: [
      "Modular cleanroom suites, Grade A–D",
      "RABS & restricted-access barrier integration",
      "Cold rooms & low-humidity special environments",
      "Relocation-ready demountable construction",
    ],
    image: "/images/solutions/controlled-environment.jpg",
    icon: "Building2",
  },
];

export type Industry = {
  id: string;
  name: string;
  intro: string;
  requirements: string[];
  classifications: string[];
  image?: string;
};

export const industries: Industry[] = [
  {
    id: "pharma",
    name: "Pharmaceutical",
    intro:
      "Sterile and non-sterile dosage manufacturing lives or dies by its environment. Grade zoning, pressure cascades, and material transfer discipline must be designed together — not bolted on afterwards.",
    requirements: [
      "Grade A/B aseptic filling & Grade C/D support zones",
      "Personnel & material airlocks with gowning discipline",
      "Annex 1-aligned airflow and smoke-study-ready design",
    ],
    classifications: ["ISO 5 (Grade A/B)", "ISO 7 (Grade C/D)", "EU GMP Annex 1"],
    image: "/images/industries/pharma-filling.jpg",
  },
  {
    id: "biotech",
    name: "Biotechnology",
    intro:
      "Bioprocessing adds biologics-sensitive constraints — containment strategy, room pressure regimes, and cleanability for CIP/SIP equipment must coexist with GMP cleanliness.",
    requirements: [
      "Upstream/downstream support & media prep areas",
      "Containment-aware pressure regime design",
      "Hygienic utilities routing & washable envelope",
    ],
    classifications: ["ISO 7–8 process zones", "ISO 5 local workzones"],
    image: "/images/industries/laf-workstation.jpg",
  },
  {
    id: "medical-devices",
    name: "Medical Devices",
    intro:
      "Device manufacturing under ISO 13485/QSR needs defined bioburden control. Cleanliness classes follow the product's contact level — from packaging lines to sterile implant finishing.",
    requirements: [
      "Class-defined assembly, packaging & finishing zones",
      "Bioburden-controlled material flow",
      "Documentation-ready validation support",
    ],
    classifications: ["ISO 7–8 typical", "ISO 5 for sterile-critical steps"],
    image: "/images/industries/syringe-line.jpg",
  },
  {
    id: "healthcare",
    name: "Healthcare",
    intro:
      "Hospitals demand contamination control with patient safety at the centre — operating theatres, ICUs and transplant suites rely on engineered airflow, not just filtration.",
    requirements: [
      "OT suites with laminar canopies & low-turbulence flow",
      "Positive/negative pressure isolation rooms",
      "Quiet, redundant systems for 24×7 operation",
    ],
    classifications: ["NABH-aligned OT design", "Isolation room regimes"],
  },
  {
    id: "laboratories",
    name: "Laboratories",
    intro:
      "QC, microbiology and testing labs need controlled, cross-contamination-free environments with correct directional airflow — often with biosafety layers added.",
    requirements: [
      "Micro labs with negative-pressure & BSC integration",
      "Sample/newsample flow segregation",
      "Stable temp/RH for instrument suites",
    ],
    classifications: ["ISO 7–8 typical", "ISO 5 within BSC/LAF"],
    image: "/images/industries/lab-microscope.jpg",
  },
  {
    id: "rnd",
    name: "R&D Facilities",
    intro:
      "Pilot plants and R&D suites change fast. Flexible modular construction and scalable FFU-based airflow let the environment follow the science, not constrain it.",
    requirements: [
      "Demountable modular walls & ceiling grids",
      "Reconfigurable airflow with FFU zones",
      "Early-phase documentation that scales to GMP",
    ],
    classifications: ["ISO 6–8 flexible zones", "ISO 5 local protection"],
  },
];

export type ProcessStep = {
  id: string;
  title: string;
  short: string;
  deliverable: string;
  icon: string;
};

export const processSteps: ProcessStep[] = [
  {
    id: "consultation",
    title: "Consultation",
    short: "We understand your process, product and regulatory context before proposing anything.",
    deliverable: "Requirements brief & feasibility inputs",
    icon: "MessagesSquare",
  },
  {
    id: "design",
    title: "Design",
    short: "Layout, classification zoning, airflow and load design — reviewed with your team.",
    deliverable: "Concept & detailed design package (DQ-ready)",
    icon: "PencilRuler",
  },
  {
    id: "engineering",
    title: "Engineering",
    short: "Drawings, specifications, BOMs and integration details across every discipline.",
    deliverable: "IFC drawings, specifications & BOM",
    icon: "Cpu",
  },
  {
    id: "supply",
    title: "Supply",
    short: "Procurement and factory-quality checks of panels, AHUs, filters and controls.",
    deliverable: "Inspected equipment & materials",
    icon: "PackageSearch",
  },
  {
    id: "installation",
    title: "Installation",
    short: "Low-debris, sequence-planned site execution by supervised crews.",
    deliverable: "Installed envelope & services",
    icon: "HardHat",
  },
  {
    id: "testing",
    title: "Testing",
    short: "Filter integrity, airflow, DP and recovery testing against design values.",
    deliverable: "Test records & measurement reports",
    icon: "ClipboardCheck",
  },
  {
    id: "commissioning",
    title: "Commissioning",
    short: "Balancing, controls tuning and integrated system performance trials.",
    deliverable: "Commissioning statement & tuned systems",
    icon: "Settings2",
  },
  {
    id: "validation",
    title: "Validation Support",
    short: "IQ/OQ/PQ documentation and execution support alongside your QA team.",
    deliverable: "IQ/OQ/PQ documentation pack",
    icon: "FileBadge",
  },
  {
    id: "handover",
    title: "Handover",
    short: "As-built documentation, training and clear support pathways after go-live.",
    deliverable: "As-built dossier, training & support plan",
    icon: "KeyRound",
  },
];

export type Resource = {
  title: string;
  topic: "Design Basics" | "Standards" | "Equipment" | "Validation";
  excerpt: string;
  readTime: string;
  type: "Guide" | "Article" | "Explainer" | "Checklist";
};

export const resources: Resource[] = [
  {
    title: "Understanding ISO 14644 Cleanroom Classes",
    topic: "Standards",
    excerpt:
      "What Class 1–9 actually means, how particle-count limits scale, and how to pick a target class for your process instead of over- or under-building.",
    readTime: "6 min",
    type: "Explainer",
  },
  {
    title: "HEPA vs ULPA: Choosing the Right Filter Class",
    topic: "Equipment",
    excerpt:
      "H13, H14, U15 and beyond — efficiency at MPPS, pressure drop trade-offs, and where each filter class earns its cost in pharma environments.",
    readTime: "5 min",
    type: "Guide",
  },
  {
    title: "Pressure Cascades Explained: Protecting Clean Zones",
    topic: "Design Basics",
    excerpt:
      "Why rooms step down in pressure, how cascade–airlock–sink layouts differ, and what designers do to keep differentials stable through daily operation.",
    readTime: "7 min",
    type: "Explainer",
  },
  {
    title: "Airflow Patterns: Unidirectional vs Turbulent Mixed Flow",
    topic: "Design Basics",
    excerpt:
      "When a process truly needs laminar (unidirectional) airflow, and when well-mixed turbulent ventilation with sufficient ACH is the smarter, cheaper answer.",
    readTime: "6 min",
    type: "Explainer",
  },
  {
    title: "IQ / OQ / PQ: A Practical Overview for New Facilities",
    topic: "Validation",
    excerpt:
      "What each qualification phase verifies, what documentation to expect from your vendor, and how to keep validation support from stalling your schedule.",
    readTime: "8 min",
    type: "Guide",
  },
  {
    title: "Planning a GMP Gowning Sequence",
    topic: "Design Basics",
    excerpt:
      "Gowning room layout, airlock interlocks and material flow rules that make contamination control a habit instead of a poster on the wall.",
    readTime: "5 min",
    type: "Guide",
  },
  {
    title: "EU GMP Annex 1: What Changed for Cleanroom Design",
    topic: "Standards",
    excerpt:
      "The revised Annex 1 raises the bar on contamination control strategy (CCS). Here is what it means for airflow design, monitoring and barrier technology.",
    readTime: "9 min",
    type: "Article",
  },
  {
    title: "Cleanroom Pre-Commissioning Checklist",
    topic: "Validation",
    excerpt:
      "A practical checklist of the tests and documents to demand before handover — filter integrity, airflow uniformity, DP stability and recovery tests.",
    readTime: "4 min",
    type: "Checklist",
  },
];

export const faqs = [
  {
    q: "Which cleanroom classification is right for my product?",
    a: "It depends on your process and regulatory route, not a universal rule. Sterile aseptic operations typically target ISO 5 (Grade A/B) at the critical zone with ISO 7–8 support rooms, while many non-sterile operations run comfortably at ISO 7–8. We start from your product's exposure risk and work backwards to a class — avoiding both under-building and costly over-classification.",
  },
  {
    q: "Do you provide certification for the cleanrooms you build?",
    a: "We design and build to recognized standards and provide full testing documentation — filter integrity (DOP/PAO), airflow velocity and uniformity, differential pressure stability and particle counts against ISO 14644-1. Formal regulatory certification is issued by your QA/authorized bodies; we support that process with complete, audit-ready measurement records.",
  },
  {
    q: "Can Cleanox upgrade or retrofit an existing cleanroom?",
    a: "Yes. Many engagements start with an underperforming or legacy facility. We assess the current envelope, HVAC and monitoring, then scope targeted upgrades — from FFU retrofits and panel replacements to full EMS/BMS modernization — sequenced to minimize production downtime.",
  },
  {
    q: "What documentation do you hand over at project completion?",
    a: "A complete as-built dossier: design basis, drawings, equipment data sheets, material certificates, test and commissioning records, and IQ/OQ/PQ documentation where in scope. The goal is that your QA team can audit the facility's history without chasing paperwork.",
  },
  {
    q: "How long does a typical turnkey cleanroom project take?",
    a: "Timelines depend on classification, area and equipment lead times. A compact modular cleanroom can complete in weeks, while a multi-room GMP suite with validation support typically runs a few months. After understanding your scope we share a milestone-level schedule before any commitment.",
  },
  {
    q: "Do you work on equipment-only scopes?",
    a: "Yes. Cleanox supplies individual systems — AHUs, HEPA terminals, FFUs, pass boxes, air showers, LAF units and monitoring — either as standalone supply or integrated into your existing facility with engineering support for installation and testing.",
  },
];

export const glossary = [
  { term: "ACH", def: "Air Changes per Hour — how many times a room's air volume is replaced per hour." },
  { term: "MPPS", def: "Most Penetrating Particle Size — the hardest particle size for a filter to capture; HEPA efficiency is rated here." },
  { term: "DP", def: "Differential Pressure — the pressure difference between adjacent rooms that directs airflow from clean to less-clean zones." },
  { term: "Grade A/B/C/D", def: "EU GMP cleanliness zones for sterile manufacturing, roughly mapped to ISO 5–8." },
  { term: "DOP/PAO test", def: "Filter integrity test using a polydisperse aerosol to scan for leaks in HEPA installations." },
  { term: "Unidirectional flow", def: "Air moving in parallel streamlines at constant velocity — 'laminar' flow used at critical workzones." },
  { term: "CCS", def: "Contamination Control Strategy — the documented, risk-based plan tying together design, procedures and monitoring (Annex 1)." },
  { term: "RABS", def: "Restricted Access Barrier System — physical barrier around aseptic operations with limited, controlled openings." },
];
