"use client";

import { useRef, useState } from "react";
import {
  CheckCircle2,
  Clock3,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Paperclip,
  Phone,
  Send,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Reveal, SectionHeading } from "@/components/reveal";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const industryOptions = [
  "Pharmaceutical",
  "Biotechnology",
  "Medical Devices",
  "Healthcare",
  "Laboratory",
  "R&D Facility",
  "Other",
];

const projectTypeOptions = [
  "New cleanroom (turnkey)",
  "Cleanroom upgrade / retrofit",
  "Equipment supply only",
  "HVAC / AHU works",
  "EMS / BMS & monitoring",
  "Validation support",
  "Other",
];

type Errors = Partial<Record<string, string>>;

export function ContactSection() {
  const formRef = useRef<HTMLFormElement>(null);
  const tsStart = useRef<string>(new Date().toISOString());
  const [industry, setIndustry] = useState("");
  const [projectType, setProjectType] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [succeeded, setSucceeded] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    setErrors({});
    setSubmitting(true);

    const form = e.currentTarget;
    const fd = new FormData(form);
    fd.set("tsStart", tsStart.current);
    fd.set("industry", industry);
    fd.set("projectType", projectType);
    const attachment = fd.get("attachment");
    if (attachment instanceof File && attachment.size === 0) fd.delete("attachment");

    try {
      const res = await fetch("/api/contact", { method: "POST", body: fd });
      const data = (await res.json()) as {
        ok: boolean;
        id?: string;
        errors?: Errors & { root?: string };
      };
      if (res.ok && data.ok) {
        setSucceeded(true);
        form.reset();
        setIndustry("");
        setProjectType("");
        setFileName(null);
        tsStart.current = new Date().toISOString();
        return;
      }
      if (data.errors) setErrors(data.errors);
    } catch {
      setErrors({ root: "Network error — please check your connection and try again." });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="contact" aria-labelledby="contact-heading" className="bg-haze py-16 md:py-24 dark:bg-card/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Contact"
          title="Tell us what you need to keep clean"
          description="Share your requirement — a one-line question or a full RFQ with drawings. Every enquiry reaches an engineer, not a call-centre script."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1.35fr]">
          {/* Info column */}
          <div className="flex flex-col gap-4">
            <Reveal className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <a
                href={`tel:${site.contact.phoneHref}`}
                className="flex items-center gap-4 rounded-xl border bg-card p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
              >
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                  <Phone className="size-5" aria-hidden />
                </span>
                <span>
                  <span className="block text-xs font-medium uppercase tracking-wider text-muted-foreground">Call us</span>
                  <span className="block font-heading text-sm font-semibold">{site.contact.phone}</span>
                </span>
              </a>
              <a
                href={`https://wa.me/${site.contact.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-xl border bg-card p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#25d366]/50 hover:shadow-md"
              >
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-lg bg-[#25d366]/10 text-[#1da851]">
                  <MessageCircle className="size-5" aria-hidden />
                </span>
                <span>
                  <span className="block text-xs font-medium uppercase tracking-wider text-muted-foreground">WhatsApp</span>
                  <span className="block font-heading text-sm font-semibold">Chat with an engineer</span>
                </span>
              </a>
              <a
                href={`mailto:${site.contact.email}`}
                className="flex items-center gap-4 rounded-xl border bg-card p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
              >
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                  <Mail className="size-5" aria-hidden />
                </span>
                <span>
                  <span className="block text-xs font-medium uppercase tracking-wider text-muted-foreground">Email</span>
                  <span className="block font-heading text-sm font-semibold">{site.contact.email}</span>
                </span>
              </a>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="flex items-start gap-4 rounded-xl border bg-card p-4 shadow-sm">
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                  <MapPin className="size-5" aria-hidden />
                </span>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Office</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-foreground/85">{site.contact.address}</p>
                  <p className="mt-1.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock3 className="size-3.5" aria-hidden /> Mon–Sat, 9:30–18:30 IST
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.12} className="flex-1">
              <div className="h-full min-h-52 overflow-hidden rounded-xl border shadow-sm">
                <iframe
                  title="Cleanox office location map"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=72.7316%2C18.8900%2C73.0166%2C19.1500&layer=mapnik"
                  loading="lazy"
                  className="h-full min-h-52 w-full border-0"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Reveal>
          </div>

          {/* Form column */}
          <Reveal delay={0.06}>
            <div className="rounded-2xl border bg-card p-6 shadow-md sm:p-8">
              {succeeded ? (
                <div className="flex h-full min-h-96 flex-col items-center justify-center gap-4 text-center">
                  <span className="inline-flex size-16 items-center justify-center rounded-full bg-brand-green/10 text-brand-green">
                    <CheckCircle2 className="size-9" aria-hidden />
                  </span>
                  <h3 className="font-heading text-2xl font-bold">Enquiry received.</h3>
                  <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
                    Thank you — your requirement is with our engineering team. Expect a
                    response within one working day.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-2 h-11 rounded-full font-semibold"
                    onClick={() => setSucceeded(false)}
                  >
                    Send another enquiry
                  </Button>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} noValidate={false}>
                  {errors.root ? (
                    <p
                      role="alert"
                      className="mb-5 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
                    >
                      {errors.root}
                    </p>
                  ) : null}

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="cf-name">Name *</Label>
                      <Input id="cf-name" name="name" required placeholder="Your full name" autoComplete="name" aria-invalid={!!errors.name} />
                      {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cf-company">Company</Label>
                      <Input id="cf-company" name="company" placeholder="Company / organisation" autoComplete="organization" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cf-email">Email *</Label>
                      <Input id="cf-email" name="email" type="email" required placeholder="name@company.com" autoComplete="email" aria-invalid={!!errors.email} />
                      {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cf-phone">Phone *</Label>
                      <Input id="cf-phone" name="phone" type="tel" required placeholder="+91 98XXX XXXXX" autoComplete="tel" aria-invalid={!!errors.phone} />
                      {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cf-industry">Industry *</Label>
                      <Select value={industry} onValueChange={setIndustry} required>
                        <SelectTrigger id="cf-industry" aria-invalid={!!errors.industry}>
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                        <SelectContent>
                          {industryOptions.map((o) => (
                            <SelectItem key={o} value={o}>{o}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.industry && <p className="text-xs text-destructive">{errors.industry}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cf-type">Project type *</Label>
                      <Select value={projectType} onValueChange={setProjectType} required>
                        <SelectTrigger id="cf-type" aria-invalid={!!errors.projectType}>
                          <SelectValue placeholder="Select requirement" />
                        </SelectTrigger>
                        <SelectContent>
                          {projectTypeOptions.map((o) => (
                            <SelectItem key={o} value={o}>{o}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.projectType && <p className="text-xs text-destructive">{errors.projectType}</p>}
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="cf-message">Requirement / message *</Label>
                      <Textarea
                        id="cf-message"
                        name="message"
                        required
                        rows={5}
                        placeholder="Briefly describe your product, target classification, area and timeline…"
                        aria-invalid={!!errors.message}
                      />
                      {errors.message && <p className="text-xs text-destructive">{errors.message}</p>}
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="cf-attachment">Attachment (optional — RFQ, drawings, datasheets)</Label>
                      <label
                        htmlFor="cf-attachment"
                        className={cn(
                          "flex cursor-pointer items-center gap-3 rounded-lg border border-input border-dashed px-4 py-3 text-sm text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
                        )}
                      >
                        <Paperclip className="size-4 shrink-0" aria-hidden />
                        <span className="truncate">
                          {fileName ?? "Attach a file — PDF, DWG, DOC, XLS, images, ZIP (max 2 MB)"}
                        </span>
                        <Input
                          id="cf-attachment"
                          name="attachment"
                          type="file"
                          className="sr-only"
                          accept=".pdf,.png,.jpg,.jpeg,.dwg,.dxf,.doc,.docx,.xls,.xlsx,.txt,.step,.stp,.zip"
                          onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
                        />
                        {fileName ? (
                          <span
                            role="button"
                            tabIndex={0}
                            aria-label="Remove attachment"
                            className="ml-auto inline-flex size-7 shrink-0 items-center justify-center rounded-full hover:bg-accent"
                            onClick={(e) => {
                              e.preventDefault();
                              setFileName(null);
                              const input = document.getElementById("cf-attachment") as HTMLInputElement | null;
                              if (input) input.value = "";
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                setFileName(null);
                                const input = document.getElementById("cf-attachment") as HTMLInputElement | null;
                                if (input) input.value = "";
                              }
                            }}
                          >
                            <X className="size-4" aria-hidden />
                          </span>
                        ) : null}
                      </label>
                      {errors.attachment && <p className="text-xs text-destructive">{errors.attachment}</p>}
                    </div>
                  </div>

                  {/* Honeypot — hidden from users, visible to bots */}
                  <div className="absolute -left-[9999px] top-auto" aria-hidden="true">
                    <label htmlFor="cf-website">Website</label>
                    <input id="cf-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
                  </div>

                  <Button
                    type="submit"
                    disabled={submitting}
                    className="mt-5 h-11 w-full rounded-full font-semibold shadow-md shadow-primary/20 sm:w-auto sm:px-10"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="size-5 animate-spin" aria-hidden />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send Enquiry
                        <Send className="size-4.5" aria-hidden />
                      </>
                    )}
                  </Button>
                  <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                    Protected by layered anti-spam (honeypot, timing and rate limits). Your
                    details are used only to respond to this enquiry — see our{" "}
                    <a href="#" className="underline underline-offset-2 hover:text-foreground">Privacy Policy</a>.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
