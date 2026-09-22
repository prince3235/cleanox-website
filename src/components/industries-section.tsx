"use client";

import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SectionHeading } from "@/components/reveal";
import { industries } from "@/lib/data";

export function IndustriesSection() {
  return (
    <section
      id="industries"
      aria-labelledby="industries-heading"
      className="bg-haze py-16 md:py-24 dark:bg-card/40"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Industries Served"
          title="Different industries, different classification needs"
          description="A filling line for sterile injectables and a diagnostic QC lab both need controlled environments — but not the same one. We engineer to the regulatory context of each sector."
        />

        <Tabs
          defaultValue={industries[0].id}
          orientation="vertical"
          className="mt-10 flex flex-col gap-5 lg:flex-row lg:gap-8"
        >
          {/* Tab list — horizontal on mobile, vertical sidebar on desktop */}
          <TabsList
            aria-label="Industries"
            className="flex h-auto w-full shrink-0 flex-row gap-1 overflow-x-auto rounded-xl bg-card p-1.5 shadow-sm scrollbar-slim lg:h-fit lg:w-56 lg:flex-col lg:justify-start"
          >
            {industries.map((ind) => (
              <TabsTrigger
                key={ind.id}
                value={ind.id}
                className="h-10 shrink-0 justify-start rounded-lg px-3.5 text-sm font-medium transition-colors duration-150 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm lg:w-full"
              >
                {ind.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Tab panels */}
          {industries.map((ind) => (
            <TabsContent
              key={ind.id}
              value={ind.id}
              className="mt-0 flex-1 focus-visible:outline-none"
            >
              <div className="grid h-full gap-0 overflow-hidden rounded-2xl border bg-card shadow-sm md:grid-cols-2">
                {/* Image */}
                <div className="relative min-h-64 overflow-hidden md:min-h-full">
                  {ind.image ? (
                    <Image
                      src={ind.image}
                      alt={`${ind.name} manufacturing or laboratory environment`}
                      fill
                      sizes="(max-width: 768px) 100vw, 45vw"
                      className="object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="bg-blueprint-light flex h-full min-h-64 w-full items-center justify-center bg-gradient-to-br from-secondary to-accent p-8 md:min-h-full">
                      <div className="text-center">
                        <svg
                          viewBox="0 0 120 120"
                          className="mx-auto h-20 w-20"
                          role="img"
                          aria-label={`Stylized airflow motif representing ${ind.name} cleanroom engineering`}
                        >
                          <circle cx="60" cy="60" r="52" fill="none" stroke="var(--brand-blue)" strokeOpacity="0.2" strokeWidth="2" />
                          {[0, 1, 2].map((i) => (
                            <path
                              key={i}
                              d={`M 22 ${46 + i * 16} C 45 ${34 + i * 16}, 72 ${62 + i * 12}, 98 ${40 + i * 14}`}
                              fill="none"
                              stroke="var(--brand-blue)"
                              strokeOpacity={0.7 - i * 0.18}
                              strokeWidth="2.5"
                              strokeLinecap="round"
                            />
                          ))}
                        </svg>
                        <p className="mt-2 font-heading text-sm font-semibold text-primary">
                          {ind.name}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-col justify-center p-6 md:p-8">
                  <h3 className="font-heading text-xl font-bold">{ind.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {ind.intro}
                  </p>
                  <ul className="mt-5 space-y-2" aria-label={`${ind.name} cleanroom requirements`}>
                    {ind.requirements.map((r) => (
                      <li key={r} className="flex gap-2.5 text-sm text-foreground/80">
                        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-brand-green" aria-hidden />
                        {r}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 flex flex-wrap gap-2" aria-label="Typical classifications">
                    {ind.classifications.map((c) => (
                      <Badge key={c} variant="secondary" className="font-medium">
                        {c}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
