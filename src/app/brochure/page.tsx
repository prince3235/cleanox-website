"use client";

import Image from "next/image";
import { site, standards as siteStandards } from "@/lib/site";
import { solutions, industries, processSteps, resources, faqs, glossary } from "@/lib/data";

export default function BrochurePage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4 portrait; margin: 15mm; }
          .page-break { break-after: page; }
          html, body { background: white !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .no-print { display: none !important; }
        }
      `}} />

      {/* Screen-only instructions */}
      <div className="no-print bg-slate-900 text-white p-6 text-center fixed top-0 w-full z-50 shadow-md">
        <h1 className="text-2xl font-bold mb-2">CleanOx Digital Brochure</h1>
        <p className="mb-4 text-slate-300">Press <kbd className="bg-slate-700 px-2 py-1 rounded">Ctrl + P</kbd> or <kbd className="bg-slate-700 px-2 py-1 rounded">Cmd + P</kbd> to save as PDF or Print.</p>
        <button onClick={() => window.print()} className="bg-brand-sky hover:bg-brand-blue text-white px-6 py-2 rounded-full font-semibold transition-colors">
          Print / Save as PDF
        </button>
      </div>

      <div className="bg-white text-slate-900 print:p-0 pt-32 pb-12 max-w-4xl mx-auto space-y-12 print:space-y-0">
        
        {/* PAGE 1: COVER */}
        <section className="page-break flex flex-col justify-between h-[1050px] print:h-[100vh] bg-navy-deep text-white p-12 rounded-2xl print:rounded-none relative overflow-hidden">
          <div className="absolute inset-0 opacity-40">
             <Image src="/images/brand/hero-cleanroom.jpg" alt="Cleanroom" fill className="object-cover" />
             <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/80 to-navy-deep/40" />
          </div>
          <div className="relative z-10">
            <Image src="/images/brand/cleanox_logo_white.png" alt="CleanOx" width={240} height={60} className="mb-4" />
            <div className="w-16 h-1 bg-brand-sky mb-8"></div>
          </div>
          
          <div className="relative z-10 pb-20">
            <h1 className="text-6xl font-bold font-heading mb-6 leading-tight">
              Engineering <br/><span className="text-brand-sky">Contamination-Free</span> <br/>Environments
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mb-8 leading-relaxed">
              CleanOx engineers contamination-controlled environments for pharmaceutical and life-science manufacturing — cleanroom design, HVAC, HEPA filtration, modular panels and monitoring, delivered from concept to compliance.
            </p>
            <div className="flex gap-8 text-sm font-semibold tracking-wide uppercase mt-12 border-t border-white/20 pt-8">
              <div>
                <p className="text-brand-sky mb-1">Contact</p>
                <p>{site.contact.phone}</p>
              </div>
              <div>
                <p className="text-brand-sky mb-1">Email</p>
                <p>{site.contact.email}</p>
              </div>
              <div>
                <p className="text-brand-sky mb-1">Web</p>
                <p>cleanox.in</p>
              </div>
            </div>
          </div>
        </section>

        {/* PAGE 2: ABOUT & VISION */}
        <section className="page-break flex flex-col p-12 h-[1050px] print:h-[100vh] border border-slate-200 print:border-none rounded-2xl print:rounded-none">
          <div className="mb-12">
            <h2 className="text-3xl font-heading font-bold text-navy-deep mb-2 border-b-2 border-brand-sky pb-4 inline-block">About CleanOx</h2>
            <p className="text-lg text-slate-700 mt-6 leading-relaxed">
              CleanOx is a newly established pharmaceutical cleanroom solutions company. We will not claim decades of history we do not have. What we offer instead: rigorous engineering practice, standards-aligned design, and full documentation on every engagement — so our work speaks before our track record does.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 mb-12">
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
              <h3 className="text-xl font-bold text-navy-deep mb-3">Our Vision</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                To make engineered contamination control accessible to every pharma and life-science manufacturer that needs it — built right the first time, documented end to end.
              </p>
            </div>
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
              <h3 className="text-xl font-bold text-navy-deep mb-3">Engineering Philosophy</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Every cleanroom starts from your process, not from a template. Airflow, zoning and pressure cascades are calculated around what you actually make and how you make it.
              </p>
            </div>
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
              <h3 className="text-xl font-bold text-navy-deep mb-3">Quality Mindset</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                We design to recognized standards — ISO 14644, EU GMP Annex 1, WHO GMP, Schedule M, USFDA cGMP — and hand over the test records to prove the design was met.
              </p>
            </div>
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
              <h3 className="text-xl font-bold text-navy-deep mb-3">Customer Focus</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Single-point accountability from consultation to handover, plain-language communication at every milestone, and support that continues after commissioning.
              </p>
            </div>
          </div>
          
          <div className="mt-auto grid grid-cols-4 gap-4">
             <div className="bg-navy-deep text-white text-center p-4 rounded-xl">
               <p className="text-2xl font-bold text-brand-sky mb-1">Est. 2026</p>
               <p className="text-xs font-medium uppercase tracking-wider">Newly Founded</p>
             </div>
             <div className="bg-navy-deep text-white text-center p-4 rounded-xl">
               <p className="text-2xl font-bold text-brand-sky mb-1">ISO 5–9</p>
               <p className="text-xs font-medium uppercase tracking-wider">Classifications</p>
             </div>
             <div className="bg-navy-deep text-white text-center p-4 rounded-xl">
               <p className="text-2xl font-bold text-brand-sky mb-1">5+</p>
               <p className="text-xs font-medium uppercase tracking-wider">GMP Standards</p>
             </div>
             <div className="bg-navy-deep text-white text-center p-4 rounded-xl">
               <p className="text-2xl font-bold text-brand-sky mb-1">100%</p>
               <p className="text-xs font-medium uppercase tracking-wider">Custom Design</p>
             </div>
          </div>
        </section>

        {/* PAGE 3: SOLUTIONS OVERVIEW */}
        <section className="page-break p-12 h-[1050px] print:h-[100vh] border border-slate-200 print:border-none rounded-2xl print:rounded-none bg-slate-50">
          <h2 className="text-3xl font-heading font-bold text-navy-deep mb-2 border-b-2 border-brand-sky pb-4 inline-block">Our Solutions Core</h2>
          <p className="text-md text-slate-600 mt-4 mb-8">Comprehensive contamination control systems for pharmaceutical applications.</p>
          
          <div className="grid grid-cols-3 gap-x-6 gap-y-8">
            {solutions.map((sol, i) => (
              <div key={sol.slug} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="text-sm font-bold text-navy-deep mb-2 leading-tight">{sol.title}</h3>
                <p className="text-[11px] text-slate-600 leading-relaxed mb-3">{sol.short}</p>
                <ul className="text-[10px] text-slate-500 space-y-1.5 list-disc pl-3">
                  {sol.points.slice(0, 3).map((p, idx) => (
                    <li key={idx}>{p}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* PAGE 4: DETAILED SOLUTIONS */}
        <section className="page-break p-12 h-[1050px] print:h-[100vh] border border-slate-200 print:border-none rounded-2xl print:rounded-none">
          <h2 className="text-3xl font-heading font-bold text-navy-deep mb-8 border-b-2 border-brand-sky pb-4 inline-block">System Specifications</h2>
          
          <div className="space-y-8">
            {solutions.slice(0, 5).map((sol) => (
              <div key={sol.slug} className="flex gap-6 items-start pb-8 border-b border-slate-100 last:border-0">
                <div className="w-1/3 h-32 relative rounded-lg overflow-hidden shrink-0 border border-slate-200">
                  <Image src={sol.image} alt={sol.title} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-navy-deep mb-2">{sol.title}</h3>
                  <p className="text-xs text-slate-600 mb-3 leading-relaxed">{sol.description}</p>
                  <ul className="grid grid-cols-2 gap-x-4 gap-y-1 text-[11px] text-slate-700 list-disc pl-3">
                    {sol.points.map((p, idx) => (
                      <li key={idx}>{p}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PAGE 5: INDUSTRIES */}
        <section className="page-break p-12 h-[1050px] print:h-[100vh] border border-slate-200 print:border-none rounded-2xl print:rounded-none bg-navy-deep text-white">
          <h2 className="text-3xl font-heading font-bold mb-2 border-b-2 border-brand-sky pb-4 inline-block">Industries We Serve</h2>
          <p className="text-md text-slate-300 mt-4 mb-10">Application-specific engineering aligned with sector regulatory demands.</p>
          
          <div className="grid grid-cols-2 gap-8">
            {industries.map((ind) => (
              <div key={ind.id} className="bg-white/5 border border-white/10 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-brand-sky mb-3">{ind.name}</h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-4">{ind.intro}</p>
                <div className="space-y-3">
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Key Requirements</span>
                    <ul className="text-xs text-slate-200 list-disc pl-3 mt-1 space-y-1">
                      {ind.requirements.map((req, idx) => <li key={idx}>{req}</li>)}
                    </ul>
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Classifications</span>
                    <p className="text-xs text-slate-200 mt-1">{ind.classifications.join(" | ")}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PAGE 6: STANDARDS MATRIX */}
        <section className="page-break p-12 h-[1050px] print:h-[100vh] border border-slate-200 print:border-none rounded-2xl print:rounded-none">
          <h2 className="text-3xl font-heading font-bold text-navy-deep mb-2 border-b-2 border-brand-sky pb-4 inline-block">Standards & Compliance</h2>
          
          <div className="mt-8 mb-10">
            <h3 className="text-lg font-bold text-navy-deep mb-4">Design Frameworks</h3>
            <div className="grid grid-cols-2 gap-4">
              {siteStandards.map(std => (
                <div key={std.code} className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                  <p className="font-bold text-sm text-brand-blue">{std.code}</p>
                  <p className="text-xs text-slate-600 mt-1">{std.name}</p>
                </div>
              ))}
            </div>
          </div>

          <h3 className="text-lg font-bold text-navy-deep mb-4">Classification Cross-Reference Matrix</h3>
          <div className="overflow-hidden border border-slate-200 rounded-lg">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-navy-deep">
                <tr>
                  <th className="p-3 border-b border-slate-200">EU GMP</th>
                  <th className="p-3 border-b border-slate-200">ISO 14644-1</th>
                  <th className="p-3 border-b border-slate-200">0.5µm Limits (Rest / Oper)</th>
                  <th className="p-3 border-b border-slate-200">ACH / Flow</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                <tr>
                  <td className="p-3 font-semibold text-brand-blue">Grade A</td>
                  <td className="p-3">ISO 5</td>
                  <td className="p-3">3,520 / 3,520</td>
                  <td className="p-3">0.36–0.54 m/s UDF</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-3 font-semibold text-brand-blue">Grade B</td>
                  <td className="p-3">ISO 5 (rest) / 7 (oper)</td>
                  <td className="p-3">3,520 / 352,000</td>
                  <td className="p-3">45 – 60+ ACH</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-brand-blue">Grade C</td>
                  <td className="p-3">ISO 7 (rest) / 8 (oper)</td>
                  <td className="p-3">352k / 3.52M</td>
                  <td className="p-3">25 – 40 ACH</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-3 font-semibold text-brand-blue">Grade D</td>
                  <td className="p-3">ISO 8 (rest)</td>
                  <td className="p-3">3.52M / Not defined</td>
                  <td className="p-3">15 – 25 ACH</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="mt-8">
            <h3 className="text-lg font-bold text-navy-deep mb-3">Validation Methodology (5-Stage)</h3>
            <div className="flex gap-2">
              {['URS', 'DQ', 'IQ', 'OQ', 'PQ'].map(stage => (
                <div key={stage} className="flex-1 bg-navy-deep text-white text-center py-3 rounded-lg text-sm font-bold border-b-4 border-brand-sky">
                  {stage}
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-500 mt-3 text-center">Full IQ/OQ/PQ documentation and execution support provided as standard.</p>
          </div>
        </section>

        {/* PAGE 7: PROCESS & GLOSSARY */}
        <section className="page-break p-12 h-[1050px] print:h-[100vh] border border-slate-200 print:border-none rounded-2xl print:rounded-none">
          <div className="mb-10">
            <h2 className="text-3xl font-heading font-bold text-navy-deep mb-2 border-b-2 border-brand-sky pb-4 inline-block">Execution Process</h2>
            <div className="grid grid-cols-2 gap-x-6 gap-y-4 mt-6">
              {processSteps.map((step, idx) => (
                <div key={step.id} className="flex gap-3 items-start">
                  <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-sky text-white text-xs font-bold">{idx + 1}</div>
                  <div>
                    <h4 className="text-sm font-bold text-navy-deep">{step.title}</h4>
                    <p className="text-[11px] text-slate-600 mt-1">{step.short}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-heading font-bold text-navy-deep mb-2 border-b-2 border-brand-sky pb-4 inline-block">Technical Glossary</h2>
            <div className="grid grid-cols-2 gap-x-6 gap-y-4 mt-6">
              {glossary.slice(0, 6).map(g => (
                <div key={g.term}>
                  <p className="text-xs font-bold text-brand-blue mb-1">{g.term}</p>
                  <p className="text-[11px] text-slate-600">{g.def}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PAGE 8: CONTACT */}
        <section className="page-break flex flex-col p-12 h-[1050px] print:h-[100vh] bg-slate-50 border border-slate-200 print:border-none rounded-2xl print:rounded-none">
          
          <div className="text-center mb-16 pt-20">
            <Image src="/images/brand/cleanox_logo_dark.png" alt="CleanOx" width={280} height={70} className="mx-auto mb-6" />
            <h2 className="text-3xl font-heading font-bold text-navy-deep">Ready to build your cleanroom?</h2>
            <p className="text-slate-600 mt-4 max-w-lg mx-auto">Get in touch for a technical consultation, facility audit, or turnkey project quotation.</p>
          </div>

          <div className="grid grid-cols-2 gap-8 max-w-3xl mx-auto w-full">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
              <h3 className="text-lg font-bold text-navy-deep mb-6">Corporate Office & Works</h3>
              <div className="space-y-4 text-sm text-slate-700">
                <p><strong>Legal Name:</strong><br/>{site.legalName}</p>
                <p><strong>Address:</strong><br/>{site.contact.address}</p>
              </div>
            </div>
            
            <div className="bg-navy-deep p-8 rounded-2xl shadow-sm text-white">
              <h3 className="text-lg font-bold text-brand-sky mb-6">Direct Contact</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="text-slate-400 text-xs mb-1 uppercase tracking-wide">Phone & WhatsApp</p>
                  <p className="text-lg font-semibold">{site.contact.phone}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-xs mb-1 uppercase tracking-wide">Official Email</p>
                  <p className="text-lg font-semibold">{site.contact.email}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-xs mb-1 uppercase tracking-wide">Website</p>
                  <p className="text-lg font-semibold">www.cleanox.in</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-auto text-center border-t border-slate-200 pt-8 text-xs text-slate-500">
            <p>&copy; 2026 {site.legalName}. All rights reserved.</p>
            <p className="mt-1">Document generated electronically from cleanox.in/brochure</p>
          </div>
        </section>

      </div>
    </>
  );
}
