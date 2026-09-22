"use client";

import Image from "next/image";
import {
  AirVent,
  ArrowRight,
  Building2,
  CheckCircle2,
  DoorClosed,
  DraftingCompass,
  Fan,
  Filter,
  Gauge,
  LayoutPanelTop,
  MonitorCog,
  PackageCheck,
  PackageSearch,
  SquareDot,
  Wind,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Reveal, SectionHeading } from "@/components/reveal";
import { solutions, type Solution } from "@/lib/data";

const iconMap: Record<string, LucideIcon> = {
  DraftingCompass,
  Fan,
  Filter,
  LayoutPanelTop,
  DoorClosed,
  PackageCheck,
  Wind,
  AirVent,
  SquareDot,
  Gauge,
  MonitorCog,
  Building2,
  PackageSearch,
};

function SolutionDialog({ solution }: { solution: Solution }) {
  const Icon = iconMap[solution.icon] ?? Building2;
  return (
    <DialogContent className="max-h-[88vh] overflow-y-auto sm:max-w-2xl">
      <DialogHeader className="text-left">
        <div className="flex items-center gap-3">
          <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
            <Icon className="size-5" aria-hidden />
          </span>
          <DialogTitle className="font-heading text-xl leading-snug">
            {solution.title}
          </DialogTitle>
        </div>
        <DialogDescription className="sr-only">
          Technical overview of {solution.title} offered by Cleanox.
        </DialogDescription>
      </DialogHeader>
      <div className="overflow-hidden rounded-xl">
        <Image
          src={solution.image}
          alt={`${solution.title} — representative system view`}
          width={760}
          height={428}
          className="h-auto w-full object-cover"
          loading="lazy"
        />
      </div>
      <p className="text-sm leading-relaxed text-foreground/80">{solution.description}</p>
      <ul className="space-y-2" aria-label={`Key aspects of ${solution.title}`}>
        {solution.points.map((point) => (
          <li key={point} className="flex gap-2.5 text-sm text-foreground/80">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-brand-green" aria-hidden />
            {point}
          </li>
        ))}
      </ul>
      <p className="text-xs leading-relaxed text-muted-foreground">
        Specifications shown are typical industry configurations. Every Cleanox system is
        engineered and documented against your project&apos;s classification and process
        requirements.
      </p>
      <Button asChild className="w-full rounded-full font-semibold sm:w-auto">
        <a href="#contact">
          Request Technical Details
          <ArrowRight className="size-4" aria-hidden />
        </a>
      </Button>
    </DialogContent>
  );
}

export function SolutionsSection() {
  return (
    <section
      id="solutions"
      aria-labelledby="solutions-heading"
      className="bg-white py-16 md:py-24 dark:bg-transparent"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Solutions"
          title="Complete cleanroom systems, engineered as one"
          description="From the AHU to the last particle sensor — each system below is specified, supplied, installed and documented to work together as a single controlled environment."
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {solutions.map((s, i) => {
            const Icon = iconMap[s.icon] ?? Building2;
            return (
              <Reveal key={s.slug} delay={(i % 4) * 0.05} className="h-full">
                <Dialog>
                  <div
                    id={`solution-${s.slug}`}
                    className="group h-full scroll-mt-20 overflow-hidden rounded-xl border bg-card shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary/35 hover:shadow-lg"
                  >
                    <DialogTrigger asChild>
                      <button
                        type="button"
                        className="flex h-full w-full flex-col text-left focus-visible:outline-2 focus-visible:outline-ring"
                        aria-label={`Learn more about ${s.title}`}
                      >
                        <span className="relative block aspect-[16/10] overflow-hidden">
                          <Image
                            src={s.image}
                            alt={`${s.title} — representative view`}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                            className="object-cover transition-transform duration-400 group-hover:scale-104"
                            loading="lazy"
                          />
                          <span className="absolute inset-0 bg-gradient-to-t from-navy-deep/50 via-transparent to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                          <span className="absolute bottom-2.5 left-2.5 inline-flex size-8 items-center justify-center rounded-lg bg-white/95 text-primary shadow-sm">
                            <Icon className="size-4" aria-hidden />
                          </span>
                        </span>
                        <span className="flex flex-1 flex-col p-4">
                          <span className="font-heading text-sm font-semibold leading-snug text-foreground">
                            {s.title}
                          </span>
                          <span className="mt-1.5 line-clamp-2 text-[0.79rem] leading-relaxed text-muted-foreground">
                            {s.short}
                          </span>
                          <span className="mt-auto inline-flex items-center gap-1.5 pt-3 text-[0.79rem] font-semibold text-primary">
                            Learn more
                            <ArrowRight
                              className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                              aria-hidden
                            />
                          </span>
                        </span>
                      </button>
                    </DialogTrigger>
                  </div>
                  <SolutionDialog solution={s} />
                </Dialog>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
