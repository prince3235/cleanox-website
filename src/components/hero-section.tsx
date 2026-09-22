"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronDown, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { standards } from "@/lib/site";

export function HeroSection() {
  const reduce = useReducedMotion();

  return (
    <section
      id="home"
      aria-label="Cleanox – Smart Clean Solutions introduction"
      className="relative flex min-h-[94svh] flex-col overflow-hidden bg-navy-deep"
    >
      {/* Background image */}
      <div className="absolute inset-0" aria-hidden>
        <Image
          src="/images/brand/hero-cleanroom.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Left-to-right gradient — keeps text readable without fully hiding photo */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/92 via-navy-deep/72 to-navy/25" />
        {/* Bottom vignette to bleed into trust strip */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-transparent to-navy-deep/30" />
      </div>

      {/* Ambient airflow lines echoing the logo mark — simplified, 3 paths */}
      {!reduce && (
        <svg
          className="pointer-events-none absolute inset-x-0 bottom-0 h-48 w-full opacity-20"
          viewBox="0 0 1440 200"
          preserveAspectRatio="none"
          aria-hidden
        >
          {[0, 1, 2].map((i) => (
            <motion.path
              key={i}
              d={`M -50 ${140 - i * 36} C 320 ${100 - i * 24}, 620 ${180 - i * 28}, 900 ${120 - i * 20} S 1320 ${70 - i * 16}, 1500 ${110 - i * 18}`}
              fill="none"
              stroke="var(--brand-sky)"
              strokeWidth={1.2}
              strokeDasharray="5 12"
              initial={{ strokeDashoffset: 0, opacity: 0 }}
              animate={{ strokeDashoffset: -180, opacity: [0, 0.8, 0.8, 0.3] }}
              transition={{
                strokeDashoffset: { duration: 12 + i * 2.5, repeat: Infinity, ease: "linear" },
                opacity: { duration: 2, delay: 0.5 + i * 0.3 },
              }}
            />
          ))}
        </svg>
      )}

      {/* Content */}
      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-4 pb-20 pt-28 sm:px-6 sm:pt-32 lg:px-8">
        {/* Eyebrow badge */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/6 px-4 py-1.5 text-xs font-medium tracking-wide text-slate-200 backdrop-blur-sm"
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-green opacity-55" />
            <span className="relative inline-flex size-2 rounded-full bg-brand-green" />
          </span>
          Pharmaceutical Cleanroom Engineering
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1, ease: "easeOut" }}
          className="mt-5 max-w-3xl font-heading text-4xl font-bold leading-[1.1] text-white sm:text-5xl lg:text-[3.5rem]"
        >
          Engineering Contamination-Free Environments for Pharma Manufacturing
        </motion.h1>

        {/* Subline */}
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.2, ease: "easeOut" }}
          className="mt-5 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg"
        >
          Cleanox designs, builds and monitors cleanrooms for pharmaceutical and
          life-science manufacturers — from the first concept drawing to a documented,
          audit-ready handover.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.3, ease: "easeOut" }}
          className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <Button
            asChild
            className="h-11 rounded-full bg-brand-blue px-7 text-sm font-semibold text-white shadow-lg shadow-brand-blue/25 hover:bg-brand-blue/90 hover:shadow-brand-blue/35"
          >
            <a href="#contact">
              Request a Quote
              <ArrowRight className="size-4" aria-hidden />
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            className="h-11 rounded-full border-white/25 bg-white/5 px-7 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/10 hover:text-white hover:border-white/35"
          >
            <a href="#solutions">Explore Our Solutions</a>
          </Button>
        </motion.div>
      </div>

      {/* Scroll cue — subtle chevron */}
      <motion.a
        href="#about"
        aria-label="Scroll to learn more"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 text-white/50 transition-colors hover:text-white/80 md:block"
        animate={reduce ? {} : { y: [0, 6, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="size-5" aria-hidden />
      </motion.a>

      {/* Trust strip — standards referenced as design frameworks */}
      <div className="relative border-t border-white/8 bg-navy-deep/75 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:gap-8 lg:px-8">
          <p className="flex shrink-0 items-center gap-2 text-sm font-semibold text-white/90">
            <ShieldCheck className="size-4 text-brand-green" aria-hidden />
            Standards we design to
          </p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-1.5" aria-label="Design standards referenced">
            {standards.map((s) => (
              <li key={s.code} className="flex items-baseline gap-1.5">
                <span className="font-heading text-sm font-semibold tracking-wide text-white">
                  {s.code}
                </span>
                <span className="hidden text-xs text-slate-400 xl:inline">{s.name}</span>
              </li>
            ))}
          </ul>
          <p className="text-xs text-slate-500 lg:ml-auto lg:shrink-0">
            Design frameworks — not certifications held.
          </p>
        </div>
      </div>
    </section>
  );
}
