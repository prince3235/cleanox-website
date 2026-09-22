'use client'

import { useEffect, useRef, useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import { ArrowLeftRight, ArrowRight, Filter, Ruler, Thermometer, Wind } from 'lucide-react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

/* ------------------------------------------------------------------ */
/* Brand palette (mirrors design tokens in globals.css)                */
/* ------------------------------------------------------------------ */

const SKY = '#29a8e0'
const TEAL = '#12a6b4'

/* ------------------------------------------------------------------ */
/* Topic model                                                         */
/* ------------------------------------------------------------------ */

const TOPICS = [
  { id: 'airflow', label: 'Airflow Patterns', icon: Wind },
  { id: 'filtration', label: 'Filtration Stages', icon: Filter },
  { id: 'pressure', label: 'Pressure Cascade', icon: ArrowLeftRight },
  { id: 'climate', label: 'Temperature & Humidity', icon: Thermometer },
  { id: 'iso', label: 'ISO 14644 Classification', icon: Ruler },
] as const

type TopicId = (typeof TOPICS)[number]['id']

/* ------------------------------------------------------------------ */
/* Shared animated primitives                                          */
/* ------------------------------------------------------------------ */

/**
 * Dashed path whose dash offset loops seamlessly (period must divide 160).
 * Falls back to a static dashed line when the user prefers reduced motion.
 */
function FlowPath({
  d,
  color,
  reduce,
  dash = '6 10',
  duration = 2.6,
  delay = 0,
  width = 2,
  opacity = 0.55,
}: {
  d: string
  color: string
  reduce: boolean
  dash?: string
  duration?: number
  delay?: number
  width?: number
  opacity?: number
}) {
  const common = {
    d,
    fill: 'none' as const,
    stroke: color,
    strokeWidth: width,
    strokeDasharray: dash,
    strokeLinecap: 'round' as const,
    opacity,
  }
  if (reduce) return <path {...common} />
  return (
    <motion.path
      {...common}
      animate={{ strokeDashoffset: [0, -160] }}
      transition={{ duration, delay, ease: 'linear', repeat: Infinity }}
    />
  )
}

/* Number formatting helpers (module scope so identities are stable) */

const fmtMicron = (v: number) => `${v.toFixed(1)} µm`
const fmtHepa = (v: number) => `${v.toFixed(3)}%`
const fmtCascade = (v: number) => `+5–${Math.round(v)} Pa`

function defaultFormat(v: number, decimals: number, group: boolean, suffix: string) {
  return `${group ? Math.round(v).toLocaleString('en-US') : v.toFixed(decimals)}${suffix}`
}

/**
 * Count-up number that starts when scrolled into view.
 * Screen readers always get the final value; reduced motion skips the count.
 */
function AnimatedNumber({
  value,
  from = 0,
  decimals = 0,
  group = false,
  suffix = '',
  format,
  duration = 1,
  className,
}: {
  value: number
  from?: number
  decimals?: number
  group?: boolean
  suffix?: string
  duration?: number
  className?: string
  format?: (v: number) => string
}) {
  const reduce = useReducedMotion() ?? false
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [display, setDisplay] = useState(from)

  useEffect(() => {
    if (!inView || reduce) return
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / (duration * 1000))
      const eased = 1 - Math.pow(1 - t, 3) // easeOutCubic
      setDisplay(from + (value - from) * eased)
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value, from, duration, reduce])

  const shown = reduce ? value : display
  const text = format ? format(shown) : defaultFormat(shown, decimals, group, suffix)
  const finalText = format ? format(value) : defaultFormat(value, decimals, group, suffix)

  return (
    <span ref={ref} className={className}>
      <span aria-hidden="true">{text}</span>
      <span className="sr-only">{finalText}</span>
    </span>
  )
}

function TopicHeading({ icon: Icon, title, lead }: { icon: LucideIcon; title: string; lead: string }) {
  return (
    <div>
      <h3 className="flex items-center gap-3 font-heading text-xl font-semibold text-white md:text-2xl">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-brand-sky/30 bg-brand-sky/10">
          <Icon className="size-5 text-brand-sky" aria-hidden="true" />
        </span>
        {title}
      </h3>
      <p className="mt-2 text-sm text-slate-400">{lead}</p>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Counters strip — "Typical industry design parameters"               */
/* ------------------------------------------------------------------ */

function CountersStrip({ reduce }: { reduce: boolean }) {
  return (
    <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-sky">
        Typical industry design parameters
      </p>
      <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
        <div className="flex flex-col">
          <dd className="order-1 font-heading text-2xl tracking-tight text-white md:text-3xl">
            <AnimatedNumber value={0.3} format={fmtMicron} />
          </dd>
          <dt className="order-2 mt-2 text-xs leading-relaxed text-slate-400 md:text-sm">
            Smallest particle size routinely monitored
          </dt>
        </div>
        <div className="flex flex-col">
          <dd className="order-1 font-heading text-2xl tracking-tight text-white md:text-3xl">
            <AnimatedNumber value={99.995} format={fmtHepa} />
          </dd>
          <dt className="order-2 mt-2 text-xs leading-relaxed text-slate-400 md:text-sm">
            H14 HEPA efficiency at MPPS (most penetrating particle size)
          </dt>
        </div>
        <div className="flex flex-col">
          <dd className="order-1 font-heading text-2xl tracking-tight text-white md:text-3xl">
            <AnimatedNumber value={20} from={5} format={fmtCascade} />
          </dd>
          <dt className="order-2 mt-2 text-xs leading-relaxed text-slate-400 md:text-sm">
            Typical room-to-room pressure cascade
          </dt>
        </div>
        <div className="flex flex-col">
          <dd className="order-1 font-heading text-2xl tracking-tight text-white md:text-3xl">
            {reduce ? (
              'ISO 5–8'
            ) : (
              <motion.span
                className="inline-block"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                ISO 5–8
              </motion.span>
            )}
          </dd>
          <dt className="order-2 mt-2 text-xs leading-relaxed text-slate-400 md:text-sm">
            Cleanroom classes most pharma facilities target
          </dt>
        </div>
      </dl>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Topic 1 — Airflow patterns                                          */
/* ------------------------------------------------------------------ */

function LaminarFlowSVG({ reduce }: { reduce: boolean }) {
  const lanes = [92, 133, 174, 215, 256, 297, 338]
  const durations = [2.2, 2.5, 2.3, 2.6, 2.4, 2.7, 2.5]
  return (
    <svg
      viewBox="0 0 420 330"
      role="img"
      aria-label="Unidirectional laminar flow diagram: air moves straight down through a ceiling HEPA filter module, over the work surface, at a typical velocity of 0.3 to 0.5 metres per second."
      className="h-auto w-full"
    >
      <defs>
        <pattern id="ts-hatch-lam" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="6" height="6" fill="#12365c" />
          <line x1="0" y1="0" x2="0" y2="6" stroke={SKY} strokeWidth="2" strokeOpacity="0.55" />
        </pattern>
      </defs>
      <text x="210" y="22" textAnchor="middle" fontSize="10" fill="#94a3b8" letterSpacing="2">
        CEILING HEPA FILTER MODULE
      </text>
      <rect x="70" y="30" width="280" height="16" rx="2" fill="url(#ts-hatch-lam)" stroke={SKY} strokeOpacity="0.45" />
      {lanes.map((x, i) => (
        <FlowPath key={x} d={`M ${x} 54 V 246`} color={SKY} reduce={reduce} duration={durations[i]} opacity={0.5} />
      ))}
      {lanes.map((x) => (
        <polygon key={`arrow-${x}`} points={`${x - 4},246 ${x + 4},246 ${x},256`} fill={SKY} opacity="0.7" />
      ))}
      <rect x="56" y="262" width="308" height="9" rx="2" fill="#334155" />
      <rect x="92" y="271" width="8" height="14" fill="#334155" />
      <rect x="320" y="271" width="8" height="14" fill="#334155" />
      <text x="210" y="300" textAnchor="middle" fontSize="10" fill="#94a3b8" letterSpacing="1.5">
        WORK SURFACE
      </text>
      <text x="210" y="320" textAnchor="middle" fontSize="12" fontWeight="500" fill={SKY}>
        0.3–0.5 m/s typical
      </text>
    </svg>
  )
}

function TurbulentFlowSVG({ reduce }: { reduce: boolean }) {
  return (
    <svg
      viewBox="0 0 420 330"
      role="img"
      aria-label="Turbulent mixed-flow diagram: air enters from a high-level supply diffuser, swirls through the room in recirculating eddies, and exits through a return grille near the floor, giving well-mixed air at higher air-change rates."
      className="h-auto w-full"
    >
      <defs>
        <pattern id="ts-hatch-turb" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="6" height="6" fill="#12365c" />
          <line x1="0" y1="0" x2="0" y2="6" stroke={SKY} strokeWidth="2" strokeOpacity="0.55" />
        </pattern>
      </defs>
      <text x="110" y="22" textAnchor="middle" fontSize="10" fill="#94a3b8" letterSpacing="2">
        SUPPLY DIFFUSER
      </text>
      <rect x="55" y="28" width="110" height="14" rx="2" fill="url(#ts-hatch-turb)" stroke={SKY} strokeOpacity="0.45" />
      {/* jet from diffuser */}
      <FlowPath d="M110 46 C 118 68, 124 92, 118 114" color={SKY} reduce={reduce} duration={1.8} opacity={0.6} dash="5 11" />
      <polygon points="114,112 122,112 118,122" fill={SKY} opacity="0.7" />
      {/* recirculating eddies */}
      <FlowPath d="M132 76 C 222 46, 316 86, 308 146" color={SKY} reduce={reduce} duration={2.6} opacity={0.5} />
      <FlowPath d="M304 158 C 296 212, 220 246, 154 224" color={SKY} reduce={reduce} duration={2.9} opacity={0.5} />
      <FlowPath d="M146 216 C 94 196, 80 146, 102 106" color={SKY} reduce={reduce} duration={2.7} opacity={0.5} />
      <FlowPath
        d="M168 128 C 214 108, 258 126, 252 158 C 247 186, 196 196, 174 178 C 156 163, 154 142, 168 128"
        color={SKY}
        reduce={reduce}
        duration={2.4}
        opacity={0.38}
      />
      <polygon points="303,145 313,147 306,157" fill={SKY} opacity="0.7" />
      <polygon points="156,218 156,230 144,224" fill={SKY} opacity="0.7" />
      <polygon points="98,110 106,110 102,98" fill={SKY} opacity="0.7" />
      {/* return grille */}
      <text x="332" y="268" textAnchor="middle" fontSize="10" fill="#94a3b8" letterSpacing="1.5">
        RETURN GRILLE
      </text>
      <rect x="286" y="274" width="96" height="14" rx="2" fill="url(#ts-hatch-turb)" stroke="#94a3b8" strokeOpacity="0.4" />
      <text x="180" y="318" textAnchor="middle" fontSize="12" fontWeight="500" fill={SKY}>
        Well-mixed air, higher ACH
      </text>
    </svg>
  )
}

function AirflowTopic({ reduce }: { reduce: boolean }) {
  return (
    <div>
      <TopicHeading
        icon={Wind}
        title="Airflow Patterns"
        lead="Two canonical flow regimes — the choice is driven by how critical the zone is."
      />
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <figure className="m-0">
          <div className="rounded-xl border border-white/10 bg-navy/60 p-3">
            <LaminarFlowSVG reduce={reduce} />
          </div>
          <figcaption className="mt-2 text-center text-xs font-semibold uppercase tracking-[0.14em] text-slate-300">
            Unidirectional (Laminar) Flow
          </figcaption>
        </figure>
        <figure className="m-0">
          <div className="rounded-xl border border-white/10 bg-navy/60 p-3">
            <TurbulentFlowSVG reduce={reduce} />
          </div>
          <figcaption className="mt-2 text-center text-xs font-semibold uppercase tracking-[0.14em] text-slate-300">
            Turbulent (Mixed) Flow
          </figcaption>
        </figure>
      </div>
      <p className="mt-5 text-sm leading-relaxed text-slate-300">
        Unidirectional flow sweeps particles away from the product in straight, parallel streams and is specified for
        the most critical zones — typically ISO Class 5 or cleaner, such as aseptic filling lines. Turbulent (mixed)
        flow dilutes contamination through high air-change rates and is the economical choice for support and
        lower-classification process rooms.
      </p>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Topic 2 — Filtration stages                                         */
/* ------------------------------------------------------------------ */

const FILTER_STAGES = [
  { barX: 200, cx: 207, name: 'Pre-filter', spec: 'G4', eff: '~90% @ ≥10 µm', optional: false },
  { barX: 350, cx: 357, name: 'Fine filter', spec: 'F8/F9', eff: '~95% @ ≥1 µm', optional: false },
  { barX: 500, cx: 507, name: 'HEPA', spec: 'H13/H14', eff: '99.95–99.995% @ MPPS', optional: false },
  { barX: 630, cx: 637, name: 'ULPA', spec: 'U15', eff: '99.9995% · optional', optional: true },
]

const FILTER_CHIPS = [
  { stage: 'G4 pre-filter', value: '~90%', at: '@ ≥10 µm' },
  { stage: 'F8/F9 fine filter', value: '~95%', at: '@ ≥1 µm' },
  { stage: 'HEPA H13/H14', value: '99.95–99.995%', at: '@ MPPS' },
  { stage: 'ULPA U15 (optional)', value: '99.9995%', at: '@ MPPS' },
]

const FILTER_SEGMENTS = [
  { x0: 34, x1: 190, n: 14, r: 3, delay: 0.15 },
  { x0: 224, x1: 338, n: 9, r: 2.6, delay: 0.55 },
  { x0: 374, x1: 488, n: 4, r: 2.2, delay: 0.95 },
  { x0: 524, x1: 618, n: 2, r: 1.8, delay: 1.35 },
]

function segmentDots(x0: number, x1: number, n: number) {
  return Array.from({ length: n }, (_, i) => {
    const t = n === 1 ? 0.5 : i / (n - 1)
    const jitterY = ((i * 37 + 11) % 61) - 30
    return { x: x0 + (x1 - x0) * t, y: 104 + jitterY }
  })
}

function ParticleDots({
  points,
  r,
  delay,
  reduce,
}: {
  points: { x: number; y: number }[]
  r: number
  delay: number
  reduce: boolean
}) {
  return (
    <g>
      {points.map((p, i) =>
        reduce ? (
          <circle key={i} cx={p.x} cy={p.y} r={r} fill={SKY} opacity="0.85" />
        ) : (
          <motion.circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={r}
            fill={SKY}
            initial={{ opacity: 0, scale: 0.3 }}
            whileInView={{ opacity: 0.85, scale: 1 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.4, delay: delay + i * 0.06, ease: 'easeOut' }}
            style={{ transformBox: 'view-box', transformOrigin: `${p.x}px ${p.y}px` }}
          />
        ),
      )}
    </g>
  )
}

function FiltrationSVG({ reduce }: { reduce: boolean }) {
  return (
    <svg
      viewBox="0 0 720 214"
      role="img"
      aria-label="Multi-stage filtration duct diagram: pre-filter G4, fine filter F8/F9, HEPA H13/H14 and optional ULPA U15 in series; particle dots become fewer and smaller after each stage."
      className="h-auto w-full"
    >
      <defs>
        <pattern id="ts-hatch-filt" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="6" height="6" fill="#12365c" />
          <line x1="0" y1="0" x2="0" y2="6" stroke={SKY} strokeWidth="2" strokeOpacity="0.55" />
        </pattern>
      </defs>
      <rect x="20" y="48" width="680" height="112" rx="8" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.18)" />
      <FlowPath d="M30 104 H 690" color={SKY} reduce={reduce} duration={4.2} opacity={0.22} dash="4 12" />
      {/* intake arrow */}
      <line x1="2" y1="104" x2="14" y2="104" stroke={SKY} strokeWidth="2.5" strokeLinecap="round" />
      <polygon points="14,98 14,110 24,104" fill={SKY} />
      {/* filtered-air outflow arrow */}
      <line x1="706" y1="104" x2="714" y2="104" stroke={SKY} strokeWidth="2.5" strokeLinecap="round" />
      <polygon points="714,98 714,110 704,104" fill={SKY} />
      {FILTER_STAGES.map((f) => (
        <g key={f.barX}>
          {f.optional ? (
            <rect
              x={f.barX}
              y="48"
              width="14"
              height="112"
              rx="3"
              fill="rgba(18,114,196,0.12)"
              stroke={SKY}
              strokeDasharray="4 4"
              strokeOpacity="0.7"
            />
          ) : (
            <rect x={f.barX} y="48" width="14" height="112" rx="3" fill="url(#ts-hatch-filt)" stroke={SKY} strokeOpacity="0.55" />
          )}
          <text x={f.cx} y="184" textAnchor="middle" fontSize="11.5" fontWeight="600" fill="#e2e8f0">
            {f.name} {f.spec}
          </text>
          <text x={f.cx} y="201" textAnchor="middle" fontSize="10.5" fill="#94a3b8">
            {f.eff}
          </text>
        </g>
      ))}
      {FILTER_SEGMENTS.map((s) => (
        <ParticleDots key={s.x0} points={segmentDots(s.x0, s.x1, s.n)} r={s.r} delay={s.delay} reduce={reduce} />
      ))}
    </svg>
  )
}

function FiltrationTopic({ reduce }: { reduce: boolean }) {
  return (
    <div>
      <TopicHeading
        icon={Filter}
        title="Filtration Stages"
        lead="Clean air is made in stages — each filter protects the next."
      />
      <div className="mt-6 rounded-xl border border-white/10 bg-navy/60 p-3 md:p-4">
        <FiltrationSVG reduce={reduce} />
      </div>
      <ul className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {FILTER_CHIPS.map((c) => (
          <li key={c.stage} className="rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3">
            <p className="text-xs text-slate-400">{c.stage}</p>
            <p className="mt-1 text-base font-semibold text-white">
              {c.value} <span className="text-xs font-normal text-slate-400">{c.at}</span>
            </p>
          </li>
        ))}
      </ul>
      <p className="mt-5 text-sm leading-relaxed text-slate-300">
        Every stage upstream captures the bulk of the dust load, so the terminal HEPA or ULPA module — the most
        expensive item in the air stream — only ever sees the last fraction of particles. That multi-stage protection
        extends filter life, keeps pressure drop stable, and makes certification intervals predictable.
      </p>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Topic 3 — Pressure cascade                                          */
/* ------------------------------------------------------------------ */

const CASCADE_ROOMS = [
  { x: 16, w: 160, name: 'Corridor', dp: '+5 Pa', fill: '#d9eaf7', text: '#071e38' },
  { x: 196, w: 160, name: 'Airlock', dp: '+10 Pa', fill: '#9cc9e8', text: '#071e38' },
  { x: 376, w: 160, name: 'Gowning', dp: '+15 Pa', fill: '#3e8ec7', text: '#071e38' },
  { x: 556, w: 168, name: 'Clean Suite', dp: '+20 Pa', fill: '#0b4a86', text: '#ffffff' },
]

/* arrows above each doorway, flowing from the cleaner (right) room to the less-clean (left) room */
const CASCADE_ARROWS = [
  { x0: 214, x1: 166 },
  { x0: 394, x1: 346 },
  { x0: 574, x1: 526 },
]

function PressureSVG({ reduce }: { reduce: boolean }) {
  return (
    <svg
      viewBox="0 0 740 236"
      role="img"
      aria-label="Plan-view pressure cascade diagram: corridor at plus 5 pascals, airlock at plus 10, gowning at plus 15, clean suite at plus 20. Arrows show air flowing from cleaner, higher-pressure rooms toward less-clean, lower-pressure rooms."
      className="h-auto w-full"
    >
      {CASCADE_ARROWS.map((a) => (
        <g key={a.x1}>
          <FlowPath d={`M ${a.x0} 42 L ${a.x1} 42`} color={SKY} reduce={reduce} duration={1.5} width={2.5} opacity={0.9} dash="4 6" />
          <polygon points={`${a.x1 - 8},42 ${a.x1},37 ${a.x1},47`} fill={SKY} opacity="0.9" />
        </g>
      ))}
      {CASCADE_ROOMS.map((r) => (
        <g key={r.name}>
          <rect x={r.x} y="58" width={r.w} height="132" rx="8" fill={r.fill} stroke="rgba(255,255,255,0.25)" />
          <text x={r.x + r.w / 2} y="106" textAnchor="middle" fontSize="13" fontWeight="600" fill={r.text}>
            {r.name}
          </text>
          <text x={r.x + r.w / 2} y="142" textAnchor="middle" fontSize="21" fontWeight="700" fill={r.text} className="font-heading">
            {r.dp}
          </text>
        </g>
      ))}
      {/* door gaps between rooms */}
      {[176, 356, 536].map((gx) => (
        <g key={gx} stroke="#94a3b8" strokeOpacity="0.55">
          <line x1={gx} y1="58" x2={gx} y2="70" />
          <line x1={gx + 20} y1="58" x2={gx + 20} y2="70" />
          <line x1={gx} y1="190" x2={gx} y2="178" />
          <line x1={gx + 20} y1="190" x2={gx + 20} y2="178" />
        </g>
      ))}
    </svg>
  )
}

function PressureTopic({ reduce }: { reduce: boolean }) {
  return (
    <div>
      <TopicHeading
        icon={ArrowLeftRight}
        title="Pressure Cascade"
        lead="Air must always move from cleaner to less-clean spaces."
      />
      <figure className="m-0 mt-6">
        <div className="rounded-xl border border-white/10 bg-navy/60 p-3 md:p-4">
          <PressureSVG reduce={reduce} />
        </div>
        <figcaption className="mt-2 text-center text-xs text-slate-400">
          Typical illustrative cascade — actual values set per process.
        </figcaption>
      </figure>
      <p className="mt-5 text-sm leading-relaxed text-slate-300">
        Each room sits at a higher pressure than the one before it, so air always flows from cleaner to less-clean
        areas — carrying contamination away from the product, never toward it. Differential-pressure sensors across
        every doorway monitor the cascade around the clock and raise an alarm before the gradient can collapse.
      </p>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Topic 4 — Temperature & humidity gauges                             */
/* ------------------------------------------------------------------ */

function polar(cx: number, cy: number, r: number, frac: number) {
  const a = Math.PI * (1 - frac)
  return { x: cx + r * Math.cos(a), y: cy - r * Math.sin(a) }
}

function arcPath(cx: number, cy: number, r: number, f0: number, f1: number) {
  const p0 = polar(cx, cy, r, f0)
  const p1 = polar(cx, cy, r, f1)
  return `M ${p0.x.toFixed(2)} ${p0.y.toFixed(2)} A ${r} ${r} 0 0 1 ${p1.x.toFixed(2)} ${p1.y.toFixed(2)}`
}

function GaugeSVG({
  reduce,
  fraction,
  band,
  color,
  ariaLabel,
}: {
  reduce: boolean
  fraction: number
  band: [number, number]
  color: string
  ariaLabel: string
}) {
  const angle = fraction * 180 - 90
  const needle = (
    <>
      <line x1="110" y1="112" x2="110" y2="42" stroke="#e2e8f0" strokeWidth="3" strokeLinecap="round" />
      <circle cx="110" cy="112" r="6" fill={color} />
    </>
  )
  return (
    <svg viewBox="0 0 220 128" role="img" aria-label={ariaLabel} className="h-auto w-full">
      <path d={arcPath(110, 112, 86, 0, 1)} fill="none" stroke="#334155" strokeWidth="10" strokeLinecap="round" />
      <path d={arcPath(110, 112, 86, band[0], band[1])} fill="none" stroke={color} strokeWidth="10" strokeLinecap="round" opacity="0.35" />
      {[0, 0.25, 0.5, 0.75, 1].map((f) => {
        const a = polar(110, 112, 70, f)
        const b = polar(110, 112, 78, f)
        return <line key={f} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#64748b" strokeWidth="2" />
      })}
      {reduce ? (
        <g transform={`rotate(${angle} 110 112)`}>{needle}</g>
      ) : (
        <motion.g
          initial={{ rotate: -90 }}
          whileInView={{ rotate: angle }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
          style={{ transformBox: 'view-box', transformOrigin: '110px 112px' }}
        >
          {needle}
        </motion.g>
      )}
    </svg>
  )
}

function ClimateTopic({ reduce }: { reduce: boolean }) {
  return (
    <div>
      <TopicHeading
        icon={Thermometer}
        title="Temperature & Humidity"
        lead="Tight tolerance on two interdependent variables."
      />
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <figure className="m-0">
          <div className="rounded-xl border border-white/10 bg-navy/60 px-4 pt-4 pb-5">
            <GaugeSVG
              reduce={reduce}
              fraction={0.5}
              band={[0.45, 0.55]}
              color={SKY}
              ariaLabel="Gauge showing a typical temperature target of 20 degrees Celsius, plus or minus 2 degrees; the shaded band marks the acceptable range."
            />
            <div className="mt-1 text-center">
              <p className="font-heading text-2xl text-white">20 ±2 °C</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">Temperature</p>
            </div>
          </div>
        </figure>
        <figure className="m-0">
          <div className="rounded-xl border border-white/10 bg-navy/60 px-4 pt-4 pb-5">
            <GaugeSVG
              reduce={reduce}
              fraction={0.5}
              band={[0.45, 0.55]}
              color={TEAL}
              ariaLabel="Gauge showing a typical relative humidity band of 45 to 55 percent; the shaded band marks the acceptable range."
            />
            <div className="mt-1 text-center">
              <p className="font-heading text-2xl text-white">45–55 %RH</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">Relative humidity</p>
            </div>
          </div>
        </figure>
      </div>
      <p className="mt-5 text-sm leading-relaxed text-slate-300">
        Typical comfort and process targets — set per product requirement. Stability matters as much as the setpoint:
        excursions affect product quality as well as instrument accuracy, and rapid swings drive condensation, static,
        and calibration drift.
      </p>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Topic 5 — ISO 14644-1:2015 classification                           */
/* ------------------------------------------------------------------ */

const ISO_SIZES = [0.1, 0.2, 0.3, 0.5, 1, 5] as const

const ISO_LIMITS: Record<number, (number | null)[]> = {
  1: [10, 2, null, null, null, null],
  2: [100, 24, 10, 4, null, null],
  3: [1000, 237, 102, 35, 8, null],
  4: [10000, 2370, 1020, 352, 83, null],
  5: [100000, 23700, 10200, 3520, 832, 29],
  6: [1000000, 237000, 102000, 35200, 8320, 293],
  7: [null, null, null, 352000, 83200, 2930],
  8: [null, null, null, 3520000, 832000, 29300],
  9: [null, null, null, 35200000, 8320000, 293000],
}

const LOG_MAX = Math.log10(35_200_000)

function IsoTopic({ reduce }: { reduce: boolean }) {
  const [selected, setSelected] = useState(5)
  const row = ISO_LIMITS[selected]
  const limit = row[3]
  const pct = limit === null ? 0 : (Math.log10(limit) / LOG_MAX) * 100

  return (
    <div>
      <TopicHeading
        icon={Ruler}
        title="ISO 14644 Classification"
        lead="Select a class to see its particle limits — from the strictest (ISO 1) to near-ambient (ISO 9)."
      />

      <div role="group" aria-label="Select ISO class" className="mt-6 grid grid-cols-5 gap-2 sm:grid-cols-9">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={selected === c}
            onClick={() => setSelected(c)}
            className={`flex h-11 items-center justify-center rounded-md border text-sm font-semibold transition-colors ${
              selected === c
                ? 'border-brand-sky bg-brand-sky/15 text-white'
                : 'border-white/15 text-slate-300 hover:border-white/35 hover:text-white'
            }`}
          >
            ISO {c}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {limit === null ? (
          <motion.div
            key="no-limit"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="mt-6 rounded-lg border border-dashed border-white/25 bg-white/[0.03] px-4 py-5">
              <p className="text-sm text-slate-200">No limit at ≥0.5 µm (defined at smaller sizes).</p>
              <p className="mt-1 text-xs text-slate-400">ISO Class 1 is defined at ≥0.1 µm: 10 particles/m³.</p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key={`bar-${selected}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="mt-6">
              <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-1">
                <p className="text-sm text-slate-300">Max particles/m³ at ≥0.5 µm</p>
                <p className="font-heading text-2xl text-white md:text-3xl">
                  <AnimatedNumber value={limit} group />
                  <span className="ml-1.5 text-sm font-normal text-slate-400">particles/m³</span>
                </p>
              </div>
              <div
                className="mt-2 h-11 overflow-hidden rounded-lg border border-white/10 bg-white/[0.04]"
                role="img"
                aria-label={`Log-scale bar: ISO Class ${selected} allows up to ${limit.toLocaleString('en-US')} particles per cubic metre at 0.5 micrometres and larger, shown relative to ISO Class 9.`}
              >
                <motion.div
                  className="h-full rounded-md bg-gradient-to-r from-brand-blue to-brand-sky"
                  initial={false}
                  animate={{ width: `${pct}%` }}
                  transition={reduce ? { duration: 0 } : { duration: 0.8, ease: 'easeOut' }}
                  aria-hidden="true"
                />
              </div>
              <div className="mt-2 flex justify-between gap-3 text-[11px] text-slate-400">
                <span>0 (log scale)</span>
                <span>full bar = ISO Class 9 · 35,200,000 particles/m³</span>
              </div>
              {selected <= 2 && (
                <p className="mt-2 text-xs text-slate-400">
                  ISO Classes 1–2 are defined at smaller particle sizes; their ≥0.5 µm values are nominal.
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-6 overflow-x-auto rounded-lg border border-white/10 scrollbar-slim">
        <table className="w-full min-w-[600px] border-collapse text-sm">
          <caption className="sr-only">
            ISO 14644-1:2015 concentration limits for ISO Class {selected}, particles per cubic metre, by particle size
          </caption>
          <thead>
            <tr className="bg-white/[0.04]">
              <th scope="col" className="px-3 py-2.5 text-left font-semibold text-slate-300">
                Class
              </th>
              {ISO_SIZES.map((s, i) => (
                <th
                  key={s}
                  scope="col"
                  className={`px-3 py-2.5 text-right font-semibold tabular-nums ${i === 3 ? 'text-brand-sky' : 'text-slate-300'}`}
                >
                  ≥ {s} µm
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-white/10">
              <th scope="row" className="px-3 py-2.5 text-left font-semibold text-white">
                ISO {selected}
              </th>
              {row.map((v, i) => (
                <td
                  key={i}
                  className={`px-3 py-2.5 text-right tabular-nums ${
                    i === 3 ? 'bg-brand-sky/10 font-semibold text-white' : v === null ? 'text-slate-400' : 'text-slate-100'
                  }`}
                >
                  {v === null ? '–' : v.toLocaleString('en-US')}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-xs leading-relaxed text-slate-400">
        Limits per ISO 14644-1:2015 (particles per m³). Class 1 is the strictest; Class 9 approaches ambient air.
        Cleanox engineers to the class your process and regulator require.
      </p>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

export default function TechnicalSection() {
  const prefersReduce = useReducedMotion()
  const reduce = prefersReduce ?? false
  const [active, setActive] = useState<TopicId>('airflow')

  return (
    <section id="technical" aria-labelledby="technical-heading" className="relative overflow-hidden bg-navy-deep py-16 md:py-24">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-blueprint" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl">
          <Badge variant="outline" className="border-brand-sky/40 bg-brand-sky/10 text-brand-sky">
            The Engineering Behind Clean
          </Badge>
          <h2
            id="technical-heading"
            className="mt-4 font-heading text-3xl font-semibold tracking-tight text-white md:text-4xl lg:text-[2.75rem] lg:leading-[1.1]"
          >
            How a Cleanroom Works
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-300 text-balance md:text-lg">
            Five engineering principles govern every controlled environment. These are the generic fundamentals Cleanox
            designs to — the exact values are always set by your process, your product, and your regulator.
          </p>
        </div>

        <CountersStrip reduce={reduce} />

        {/* Topic navigation + detail panel */}
        <div className="mt-12 grid gap-6 lg:mt-14 lg:grid-cols-[290px_minmax(0,1fr)] lg:gap-8">
          <div
            role="group"
            aria-label="Technical topics"
            className="flex snap-x gap-2 overflow-x-auto pb-2 scrollbar-slim lg:flex-col lg:overflow-visible lg:pb-0"
          >
            {TOPICS.map((t, i) => {
              const Icon = t.icon
              const isActive = t.id === active
              return (
                <button
                  key={t.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActive(t.id)}
                  className={`flex min-h-11 shrink-0 snap-start items-center gap-3 rounded-lg border px-4 py-2.5 text-left text-sm font-medium transition-colors lg:w-full ${
                    isActive
                      ? 'border-brand-sky/60 bg-brand-sky/10 text-white'
                      : 'border-white/10 text-slate-300 hover:border-white/25 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Icon className={`size-5 shrink-0 ${isActive ? 'text-brand-sky' : 'text-slate-400'}`} aria-hidden="true" />
                  <span className="whitespace-nowrap lg:whitespace-normal">{t.label}</span>
                  <span
                    className={`ml-auto hidden text-xs tabular-nums lg:inline ${isActive ? 'text-brand-sky' : 'text-slate-500'}`}
                  >
                    0{i + 1}
                  </span>
                </button>
              )
            })}
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-7 lg:min-h-[640px] lg:p-9">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={reduce ? { duration: 0 } : { duration: 0.4, ease: 'easeInOut' }}
              >
                {active === 'airflow' && <AirflowTopic reduce={reduce} />}
                {active === 'filtration' && <FiltrationTopic reduce={reduce} />}
                {active === 'pressure' && <PressureTopic reduce={reduce} />}
                {active === 'climate' && <ClimateTopic reduce={reduce} />}
                {active === 'iso' && <IsoTopic reduce={reduce} />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 flex flex-col items-center gap-4 text-center md:mt-16">
          <h3 className="font-heading text-xl font-semibold text-white md:text-2xl">
            Ready to put these principles to work?
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button asChild className="h-10 rounded-full px-6 text-sm font-semibold">
              <a href="#contact">
                Discuss Your Classification Needs
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
            </Button>
            <a
              href="#solutions"
              className="inline-flex h-10 items-center rounded-md px-2 text-sm font-medium text-brand-sky underline-offset-4 transition-colors hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
            >
              Explore Solutions
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
