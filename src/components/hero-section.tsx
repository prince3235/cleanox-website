"use client";

import Image from "next/image";
import { motion, useReducedMotion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { ArrowRight, ChevronDown, MessageCircle, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { standards } from "@/lib/site";
import { site } from "@/lib/site";

/** Animated number counter — counts up from 0 to target when in view. */
function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
  duration = 1800,
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!inView || reduce) {
      setCount(target);
      return;
    }
    const start = performance.now();
    const raf = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out-cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, [inView, target, duration, reduce]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{count}{suffix}
    </span>
  );
}

const heroStats = [
  { value: 5, suffix: "+", label: "GMP Standards Referenced" },
  { value: 9, suffix: "", label: "Cleanroom Classes (ISO 5–9)" },
  { value: 100, suffix: "%", label: "Documentation on Handover" },
];

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
        {/* Gradient — stronger on left for text legibility, opens up on right */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/96 via-navy-deep/78 to-navy/20" />
        {/* Bottom vignette to blend into the stats bar */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/95 via-transparent to-navy-deep/35" />
      </div>

      {/* Ambient downward laminar airflow streams & particle sweeps */}
      {!reduce && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          {/* Vertical laminar flow paths */}
          <svg className="absolute inset-0 h-full w-full opacity-25" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="heroStreamGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#29a8e0" stopOpacity="0.8" />
                <stop offset="60%" stopColor="#12a6b4" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#29a8e0" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[80, 220, 380, 540, 700, 860, 1020, 1180, 1340].map((x, idx) => (
              <motion.line
                key={x}
                x1={x}
                y1="-80"
                x2={x}
                y2="100%"
                stroke="url(#heroStreamGrad)"
                strokeWidth={idx % 2 === 0 ? 1.5 : 1}
                strokeDasharray="12 48"
                initial={{ strokeDashoffset: 0 }}
                animate={{ strokeDashoffset: -240 }}
                transition={{
                  duration: 5 + (idx % 4) * 1.5,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            ))}
          </svg>

          {/* Subtle floating airborne micro-particles */}
          {[
            { top: "25%", left: "18%", size: 3, dur: 7, delay: 0 },
            { top: "45%", left: "38%", size: 2.5, dur: 9, delay: 1.5 },
            { top: "65%", left: "62%", size: 4, dur: 8, delay: 0.8 },
            { top: "35%", left: "78%", size: 3, dur: 10, delay: 2 },
            { top: "55%", left: "88%", size: 2, dur: 6.5, delay: 1.2 },
            { top: "75%", left: "28%", size: 2.5, dur: 8.5, delay: 2.5 },
          ].map((pt, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-brand-sky/40 blur-[0.5px] shadow-[0_0_8px_rgba(41,168,224,0.6)]"
              style={{
                top: pt.top,
                left: pt.left,
                width: pt.size,
                height: pt.size,
              }}
              animate={{
                y: [0, 45, 0],
                opacity: [0.2, 0.7, 0.2],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: pt.dur,
                repeat: Infinity,
                delay: pt.delay,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Horizontal ambient wave lines */}
          <svg
            className="absolute inset-x-0 bottom-0 h-56 w-full opacity-20"
            viewBox="0 0 1440 220"
            preserveAspectRatio="none"
          >
            {[0, 1, 2].map((i) => (
              <motion.path
                key={i}
                d={`M -50 ${150 - i * 38} C 320 ${108 - i * 26}, 640 ${185 - i * 30}, 920 ${128 - i * 22} S 1340 ${75 - i * 18}, 1510 ${115 - i * 20}`}
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
        </div>
      )}

      {/* Content */}
      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-4 pb-24 pt-28 sm:px-6 sm:pt-32 lg:px-8">
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

        {/* Headline — fluid size */}
        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1, ease: "easeOut" }}
          className="fluid-h1 mt-5 max-w-3xl font-heading font-bold leading-[1.07] tracking-tight text-white"
        >
          Engineering{" "}
          <span className="bg-gradient-to-r from-brand-sky to-brand-teal bg-clip-text text-transparent">
            Contamination-Free
          </span>{" "}
          Environments for Pharma Manufacturing
        </motion.h1>

        {/* Subline */}
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.2, ease: "easeOut" }}
          className="fluid-lead mt-5 max-w-xl leading-relaxed text-slate-300"
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
            className="h-12 rounded-full bg-brand-blue px-8 text-sm font-semibold text-white shadow-lg shadow-brand-blue/30 hover:bg-brand-blue/90 hover:shadow-brand-blue/40 hover:-translate-y-0.5 transition-all duration-200"
          >
            <a href="#contact">
              Request a Quote
              <ArrowRight className="size-4" aria-hidden />
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            className="h-12 rounded-full border-white/25 bg-white/5 px-8 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/10 hover:text-white hover:border-white/40 transition-all duration-200"
          >
            <a href="#solutions">Explore Our Solutions</a>
          </Button>
          <a
            href={`https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(
              "Hello Cleanox, I need a cleanroom for pharmaceutical manufacturing. Can we discuss?"
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center gap-2.5 rounded-full border border-[#25d366]/35 bg-[#25d366]/10 px-8 text-sm font-semibold text-[#6de897] backdrop-blur-sm transition-all duration-200 hover:bg-[#25d366]/20 hover:border-[#25d366]/55 hover:text-white sm:hidden"
            aria-label="Chat on WhatsApp"
          >
            <MessageCircle className="size-4.5" aria-hidden />
            WhatsApp Us
          </a>
        </motion.div>

        {/* Animated stats row */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45, ease: "easeOut" }}
          className="mt-12 flex flex-wrap gap-x-8 gap-y-4"
          aria-label="Key figures"
        >
          {heroStats.map((s, i) => (
            <div key={s.label} className="flex flex-col">
              <p className="font-heading text-3xl font-bold text-white stat-glow sm:text-4xl">
                <AnimatedCounter target={s.value} suffix={s.suffix} duration={1400 + i * 200} />
              </p>
              <p className="mt-0.5 text-xs font-medium text-slate-400">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue — subtle chevron */}
      <motion.a
        href="#about"
        aria-label="Scroll to learn more"
        className="absolute bottom-[5.5rem] left-1/2 hidden -translate-x-1/2 text-white/40 transition-colors hover:text-white/70 md:block"
        animate={reduce ? {} : { y: [0, 6, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="size-5" aria-hidden />
      </motion.a>

      {/* Trust strip — standards */}
      <div className="relative border-t border-white/8 bg-navy-deep/80 backdrop-blur-sm">
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

