"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUp, Linkedin, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { solutions } from "@/lib/data";
import { site } from "@/lib/site";

function LegalDialog({
  trigger,
  title,
  children,
}: {
  trigger: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="text-left text-sm text-slate-400 transition-colors hover:text-slate-200 focus-visible:outline-2 focus-visible:outline-ring"
        >
          {trigger}
        </button>
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-heading">{title}</DialogTitle>
          <DialogDescription>
            Placeholder document — reviewed legal copy will replace this text before launch.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3 text-sm leading-relaxed text-foreground/80">{children}</div>
      </DialogContent>
    </Dialog>
  );
}

export function SiteFooter() {
  const [year] = useState(() => new Date().getFullYear());

  return (
    <footer className="mt-auto bg-navy-deep text-slate-300 print:hidden">
      {/* Top: sitemap columns */}
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.2fr] lg:px-8">
        {/* Brand */}
        <div className="space-y-4">
          {/* Logo on dark — actual transparent brand asset, zero container/sticker look */}
          <div className="inline-flex items-center">
            <Image
              src="/images/brand/cleanox_logo_white.png"
              alt={`${site.name} – ${site.tagline}`}
              width={150}
              height={40}
              className="h-9 w-auto object-contain"
              loading="lazy"
            />
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-slate-400">
            Cleanox designs, builds and monitors contamination-controlled environments
            for pharmaceutical and life-science manufacturing — from first layout to
            documented handover.
          </p>
          <div className="flex items-center gap-2">
            <a
              href={site.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Cleanox on LinkedIn"
              className="inline-flex size-9 items-center justify-center rounded-full bg-white/6 text-slate-400 transition-colors duration-150 hover:bg-brand-blue hover:text-white"
            >
              <Linkedin className="size-4" aria-hidden />
            </a>
            <a
              href={`https://wa.me/${site.contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Cleanox on WhatsApp"
              className="inline-flex size-9 items-center justify-center rounded-full bg-white/6 text-slate-400 transition-colors duration-150 hover:bg-[#25d366] hover:text-white"
            >
              <MessageCircle className="size-4" aria-hidden />
            </a>
            <a
              href={`mailto:${site.contact.email}`}
              aria-label="Email Cleanox"
              className="inline-flex size-9 items-center justify-center rounded-full bg-white/6 text-slate-400 transition-colors duration-150 hover:bg-brand-teal hover:text-white"
            >
              <Mail className="size-4" aria-hidden />
            </a>
          </div>
        </div>

        {/* Solutions */}
        <nav aria-label="Solutions">
          <h3 className="font-heading text-xs font-semibold uppercase tracking-wider text-white/90">
            Solutions
          </h3>
          <ul className="mt-4 space-y-2">
            {solutions.slice(0, 8).map((s) => (
              <li key={s.slug}>
                <a
                  href={`#solution-${s.slug}`}
                  className="text-sm text-slate-400 transition-colors duration-150 hover:text-slate-200"
                >
                  {s.title}
                </a>
              </li>
            ))}
            <li>
              <a href="#solutions" className="text-sm font-medium text-brand-sky transition-colors hover:text-white">
                View all solutions →
              </a>
            </li>
          </ul>
        </nav>

        {/* Industries */}
        <nav aria-label="Industries">
          <h3 className="font-heading text-xs font-semibold uppercase tracking-wider text-white/90">
            Industries
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {[
              "Pharmaceutical",
              "Biotechnology",
              "Medical Devices",
              "Healthcare",
              "Laboratories",
              "R&D Facilities",
            ].map((i) => (
              <li key={i}>
                <a href="#industries" className="text-slate-400 transition-colors duration-150 hover:text-slate-200">
                  {i}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Company */}
        <nav aria-label="Company">
          <h3 className="font-heading text-xs font-semibold uppercase tracking-wider text-white/90">
            Company
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li><a href="#about" className="text-slate-400 transition-colors hover:text-slate-200">About Us</a></li>
            <li><a href="#process" className="text-slate-400 transition-colors hover:text-slate-200">How We Deliver</a></li>
            <li><a href="#technical" className="text-slate-400 transition-colors hover:text-slate-200">Technical Insights</a></li>
            <li><a href="#quality" className="text-slate-400 transition-colors hover:text-slate-200">Quality & Compliance</a></li>
            <li><a href="#projects" className="text-slate-400 transition-colors hover:text-slate-200">Projects</a></li>
            <li><a href="#resources" className="text-slate-400 transition-colors hover:text-slate-200">Resources & FAQs</a></li>
            <li>
              <Dialog>
                <DialogTrigger asChild>
                  <button
                    type="button"
                    className="text-left text-slate-400 transition-colors hover:text-slate-200 focus-visible:outline-2 focus-visible:outline-ring"
                  >
                    Careers
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="font-heading">Careers at Cleanox</DialogTitle>
                    <DialogDescription>
                      We are building our founding engineering team.
                    </DialogDescription>
                  </DialogHeader>
                  <p className="text-sm leading-relaxed text-foreground/80">
                    We are always glad to hear from cleanroom design engineers, HVAC
                    specialists, project managers and validation professionals. Send your
                    CV and a short note about the environments you have worked on to{" "}
                    <a
                      href={`mailto:${site.contact.careersEmail}`}
                      className="font-medium text-primary underline underline-offset-2"
                    >
                      {site.contact.careersEmail}
                    </a>
                    .
                  </p>
                </DialogContent>
              </Dialog>
            </li>
          </ul>
        </nav>

        {/* Contact */}
        <div>
          <h3 className="font-heading text-xs font-semibold uppercase tracking-wider text-white/90">
            Contact
          </h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex gap-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0 text-brand-sky/80" aria-hidden />
              <span className="text-slate-400">{site.contact.address}</span>
            </li>
            <li>
              <a href={`tel:${site.contact.phoneHref}`} className="flex gap-2.5 text-slate-400 transition-colors hover:text-slate-200">
                <Phone className="mt-0.5 size-4 shrink-0 text-brand-sky/80" aria-hidden />
                {site.contact.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.contact.email}`} className="flex gap-2.5 text-slate-400 transition-colors hover:text-slate-200">
                <Mail className="mt-0.5 size-4 shrink-0 text-brand-sky/80" aria-hidden />
                {site.contact.email}
              </a>
            </li>
          </ul>
          <Button
            asChild
            className="mt-5 h-9 rounded-full bg-brand-blue text-sm font-semibold text-white hover:bg-brand-blue/90"
          >
            <a href="#contact">Request a Quote</a>
          </Button>
        </div>
      </div>

      <Separator className="bg-white/8" />

      {/* Bottom bar */}
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 pb-20 pt-5 text-center sm:px-6 lg:flex-row lg:gap-6 lg:pb-6 lg:text-left lg:px-8">
        <p className="text-xs text-slate-500">
          © {year} {site.legalName}. All rights reserved.
        </p>
        <p className="max-w-lg text-center text-xs leading-relaxed text-slate-600 lg:text-left">
          Standards referenced on this site (ISO 14644, EU GMP Annex 1, WHO GMP, Schedule M,
          USFDA cGMP) are design frameworks Cleanox aligns its engineering with — they are not
          certifications held by the company.
        </p>
        <div className="flex items-center gap-4 lg:ml-auto">
          <LegalDialog trigger="Privacy Policy" title="Privacy Policy">
            <p>
              Cleanox respects your privacy. Information submitted through the enquiry form
              (name, company, contact details, project information and any attachments) is
              used solely to respond to your request and prepare proposals.
            </p>
            <p>
              We do not sell or share your data with third parties for marketing. Form
              submissions are stored on secured infrastructure with access limited to
              authorised Cleanox staff, and basic anti-spam measures (including IP-based rate
              limiting) are applied to protect the service.
            </p>
            <p>
              You may request correction or deletion of your enquiry data at any time by
              writing to {site.contact.email}. This placeholder policy will be replaced with
              reviewed legal text before launch.
            </p>
          </LegalDialog>
          <LegalDialog trigger="Terms of Use" title="Terms of Use">
            <p>
              The content of this website is provided for general information about
              Cleanox&apos;s engineering services. Technical values shown (airflow velocities,
              filtration efficiencies, pressure cascades, ISO 14644 classification limits) are
              published industry reference figures, not performance commitments for any
              specific project.
            </p>
            <p>
              Project-specific designs, capacities and outcomes are defined exclusively in a
              signed proposal or contract. Nothing on this site constitutes regulatory
              certification or compliance advice; always validate requirements with your QA
              and regulatory team.
            </p>
            <p>
              This placeholder document will be replaced with reviewed legal text before
              launch.
            </p>
          </LegalDialog>
          {/* Back to top */}
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top of page"
            className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-400 transition-colors hover:border-white/20 hover:text-slate-200"
          >
            <ArrowUp className="size-3" aria-hidden />
            Top
          </button>
        </div>
      </div>
    </footer>
  );
}
