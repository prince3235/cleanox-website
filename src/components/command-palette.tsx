"use client";

import { useEffect, useState } from "react";
import {
  AirVent,
  ArrowRight,
  BookOpen,
  Building2,
  Cpu,
  DoorClosed,
  Fan,
  FileBadge,
  Filter,
  Layers,
  MessageCircle,
  Phone,
  Ruler,
  Search,
  ShieldCheck,
  Wind,
} from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { site } from "@/lib/site";

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, onOpenChange]);

  const runCommand = (command: () => void) => {
    onOpenChange(false);
    command();
  };

  const scrollTo = (id: string) => {
    runCommand(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.hash = id;
      }
    });
  };

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Search CleanOx Engineering"
      description="Quickly search cleanroom systems, regulatory standards, industries, or technical guides."
    >
      <CommandInput placeholder="Search solutions, ISO standards, equipment, or documents… (e.g. 'HEPA', 'Annex 1', 'Pass Box')" />
      <CommandList className="max-h-[380px] scrollbar-slim">
        <CommandEmpty>No engineering matching results found.</CommandEmpty>

        {/* Quick Actions */}
        <CommandGroup heading="Direct Actions">
          <CommandItem
            onSelect={() => scrollTo("contact")}
            className="cursor-pointer"
          >
            <ArrowRight className="mr-2 size-4 text-primary" />
            <span>Request a Technical Quotation / RFQ</span>
          </CommandItem>
          <CommandItem
            onSelect={() =>
              runCommand(() =>
                window.open(`https://wa.me/${site.contact.whatsapp}`, "_blank")
              )
            }
            className="cursor-pointer"
          >
            <MessageCircle className="mr-2 size-4 text-[#25d366]" />
            <span>Chat with CleanOx Engineering Desk (WhatsApp)</span>
          </CommandItem>
          <CommandItem
            onSelect={() =>
              runCommand(() => {
                window.location.href = `tel:${site.contact.phoneHref}`;
              })
            }
            className="cursor-pointer"
          >
            <Phone className="mr-2 size-4 text-primary" />
            <span>Call Technical Office ({site.contact.phone})</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        {/* Cleanroom Solutions */}
        <CommandGroup heading="Cleanroom Engineered Systems">
          <CommandItem
            onSelect={() => scrollTo("solutions")}
            className="cursor-pointer"
          >
            <Building2 className="mr-2 size-4 text-primary" />
            <span>Cleanroom Design & Turnkey Execution</span>
          </CommandItem>
          <CommandItem
            onSelect={() => scrollTo("solutions")}
            className="cursor-pointer"
          >
            <Fan className="mr-2 size-4 text-primary" />
            <span>HVAC / AHU Systems & Dehumidification</span>
          </CommandItem>
          <CommandItem
            onSelect={() => scrollTo("solutions")}
            className="cursor-pointer"
          >
            <Filter className="mr-2 size-4 text-primary" />
            <span>HEPA / ULPA Filtration Modules (H13/H14)</span>
          </CommandItem>
          <CommandItem
            onSelect={() => scrollTo("solutions")}
            className="cursor-pointer"
          >
            <Layers className="mr-2 size-4 text-primary" />
            <span>Modular PPGI / SS Wall & Ceiling Panels</span>
          </CommandItem>
          <CommandItem
            onSelect={() => scrollTo("solutions")}
            className="cursor-pointer"
          >
            <DoorClosed className="mr-2 size-4 text-primary" />
            <span>Cleanroom Flush Doors & Interlocked Airlocks</span>
          </CommandItem>
          <CommandItem
            onSelect={() => scrollTo("solutions")}
            className="cursor-pointer"
          >
            <AirVent className="mr-2 size-4 text-primary" />
            <span>Pass Boxes (Static & Dynamic HEPA Flushed)</span>
          </CommandItem>
          <CommandItem
            onSelect={() => scrollTo("solutions")}
            className="cursor-pointer"
          >
            <Wind className="mr-2 size-4 text-primary" />
            <span>Personnel & Material Air Showers</span>
          </CommandItem>
          <CommandItem
            onSelect={() => scrollTo("solutions")}
            className="cursor-pointer"
          >
            <Cpu className="mr-2 size-4 text-primary" />
            <span>Laminar Air Flow (LAF) & FFUs</span>
          </CommandItem>
          <CommandItem
            onSelect={() => scrollTo("solutions")}
            className="cursor-pointer"
          >
            <Cpu className="mr-2 size-4 text-primary" />
            <span>EMS & Differential Pressure Surveillance</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        {/* Regulatory Standards */}
        <CommandGroup heading="Regulatory Frameworks & Standards">
          <CommandItem
            onSelect={() => scrollTo("quality")}
            className="cursor-pointer"
          >
            <ShieldCheck className="mr-2 size-4 text-brand-green" />
            <span>ISO 14644-1/-2 (Cleanroom Classification & Limits)</span>
          </CommandItem>
          <CommandItem
            onSelect={() => scrollTo("quality")}
            className="cursor-pointer"
          >
            <ShieldCheck className="mr-2 size-4 text-brand-green" />
            <span>EU GMP Annex 1 (Sterile Medicinal Products)</span>
          </CommandItem>
          <CommandItem
            onSelect={() => scrollTo("quality")}
            className="cursor-pointer"
          >
            <ShieldCheck className="mr-2 size-4 text-brand-green" />
            <span>Schedule M (Indian CDSCO GMP Requirements)</span>
          </CommandItem>
          <CommandItem
            onSelect={() => scrollTo("quality")}
            className="cursor-pointer"
          >
            <ShieldCheck className="mr-2 size-4 text-brand-green" />
            <span>US FDA 21 CFR Part 210/211 (Aseptic Processing)</span>
          </CommandItem>
          <CommandItem
            onSelect={() => scrollTo("quality")}
            className="cursor-pointer"
          >
            <FileBadge className="mr-2 size-4 text-brand-green" />
            <span>IQ / OQ / PQ Validation Protocols & DQ Dossiers</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        {/* Technical Library */}
        <CommandGroup heading="Technical Resources & Knowledge">
          <CommandItem
            onSelect={() => scrollTo("resources")}
            className="cursor-pointer"
          >
            <BookOpen className="mr-2 size-4 text-primary" />
            <span>Understanding ISO 14644 Cleanroom Classes</span>
          </CommandItem>
          <CommandItem
            onSelect={() => scrollTo("resources")}
            className="cursor-pointer"
          >
            <BookOpen className="mr-2 size-4 text-primary" />
            <span>HEPA vs ULPA: Choosing Filter Class</span>
          </CommandItem>
          <CommandItem
            onSelect={() => scrollTo("resources")}
            className="cursor-pointer"
          >
            <BookOpen className="mr-2 size-4 text-primary" />
            <span>Pressure Cascades & Airlock Sink Design</span>
          </CommandItem>
          <CommandItem
            onSelect={() => scrollTo("resources")}
            className="cursor-pointer"
          >
            <BookOpen className="mr-2 size-4 text-primary" />
            <span>Airflow Patterns: Laminar vs Mixed Turbulent</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
