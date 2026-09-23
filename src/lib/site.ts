/**
 * CleanOx site configuration.
 * NOTE: Contact fields marked PLACEHOLDER must be replaced with the real
 * business details (see brief §9) before launch.
 */
export const site = {
  name: "CleanOx",
  legalName: "CleanOx",
  tagline: "Smart Clean Solutions",
  domain: "https://cleanox.in",
  description:
    "CleanOx engineers contamination-controlled environments for pharmaceutical and life-science manufacturing — cleanroom design, HVAC, HEPA filtration, modular panels and monitoring, delivered from concept to compliance.",
  contact: {
    phone: "+91 93270 40001",
    phoneHref: "+919327040001",
    whatsapp: "919327040001",
    email: "cleanox26@gmail.com",
    careersEmail: "cleanox26@gmail.com",
    address:
      "Plot No.87, Vibrant Mega Industrial Park, Vahelal Daskroi, Ahmedabad - 382330",
    city: "Ahmedabad",
  },
  social: {
    linkedin: "https://www.linkedin.com/company/cleanox",
  },
  founded: "2026",
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
