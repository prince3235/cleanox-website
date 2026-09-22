/**
 * CleanOx site configuration.
 * NOTE: Contact fields marked PLACEHOLDER must be replaced with the real
 * business details (see brief §9) before launch.
 */
export const site = {
  name: "Cleanox",
  legalName: "Cleanox – Smart Clean Solutions",
  tagline: "Smart Clean Solutions",
  domain: "https://cleanox.in", // PLACEHOLDER — update to real domain
  description:
    "Cleanox engineers contamination-controlled environments for pharmaceutical and life-science manufacturing — cleanroom design, HVAC, HEPA filtration, modular panels and monitoring, delivered from concept to compliance.",
  contact: {
    phone: "+91 90000 00000", // PLACEHOLDER
    phoneHref: "+919000000000", // PLACEHOLDER
    whatsapp: "919000000000", // PLACEHOLDER
    email: "info@cleanox.in", // PLACEHOLDER
    careersEmail: "careers@cleanox.in", // PLACEHOLDER
    address:
      "Plot No. 00, Industrial Estate, Phase II, Mumbai, Maharashtra 400001, India", // PLACEHOLDER
    city: "Mumbai",
  },
  social: {
    linkedin: "https://www.linkedin.com/company/cleanox", // PLACEHOLDER
  },
  founded: "2025",
} as const;

export const nav = [
  { label: "About", href: "#about" },
  { label: "Solutions", href: "#solutions" },
  { label: "Industries", href: "#industries" },
  { label: "Process", href: "#process" },
  { label: "Technical", href: "#technical" },
  { label: "Quality", href: "#quality" },
  { label: "Resources", href: "#resources" },
  { label: "Contact", href: "#contact" },
] as const;

/** Standards CleanOx designs to — referenced as design frameworks, never as held certifications. */
export const standards = [
  { code: "ISO 14644-1/-2", name: "Cleanroom classification & monitoring" },
  { code: "EU GMP Annex 1", name: "Sterile products manufacturing" },
  { code: "WHO GMP", name: "Good manufacturing practices" },
  { code: "Schedule M", name: "Indian pharma GMP requirements" },
  { code: "USFDA cGMP", name: "Current good manufacturing practice" },
] as const;
