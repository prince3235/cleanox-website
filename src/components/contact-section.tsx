"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Clock3,
  Edit3,
  FileCheck,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Paperclip,
  Phone,
  Send,
  ShieldCheck,
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

  // Wizard Step State
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Form Fields State
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    industry: "",
    projectType: "",
    message: "",
  });

  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [succeeded, setSucceeded] = useState(false);

  // Step 1 Validation
  const validateStep1 = () => {
    const newErrors: Errors = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (formData.phone.trim().length < 7) {
      newErrors.phone = "Please enter a valid contact number";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Step 2 Validation
  const validateStep2 = () => {
    const newErrors: Errors = {};
    if (!formData.industry) newErrors.industry = "Please select your industry";
    if (!formData.projectType) newErrors.projectType = "Please select a project type";
    if (!formData.message.trim()) {
      newErrors.message = "Please describe your project requirements";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Please provide at least a brief description (10+ characters)";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    } else if (currentStep === 2 && validateStep2()) {
      setCurrentStep(3);
    }
  };

  const handleBack = () => {
    setErrors({});
    if (currentStep === 3) setCurrentStep(2);
    else if (currentStep === 2) setCurrentStep(1);
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;

    if (!validateStep1() || !validateStep2()) {
      return;
    }

    setErrors({});
    setSubmitting(true);

    const fd = new FormData();
    fd.set("name", formData.name);
    fd.set("company", formData.company);
    fd.set("email", formData.email);
    fd.set("phone", formData.phone);
    fd.set("industry", formData.industry);
    fd.set("projectType", formData.projectType);
    fd.set("message", formData.message);
    fd.set("tsStart", tsStart.current);

    if (file) {
      fd.set("attachment", file);
    }

    // Honeypot field
    const websiteInput = formRef.current?.querySelector('input[name="website"]') as HTMLInputElement | null;
    if (websiteInput?.value) {
      fd.set("website", websiteInput.value);
    }

    try {
      const res = await fetch("/api/contact", { method: "POST", body: fd });
      const data = (await res.json()) as {
        ok: boolean;
        id?: string;
        errors?: Errors & { root?: string };
      };
      if (res.ok && data.ok) {
        setSucceeded(true);
        setFormData({
          name: "",
          company: "",
          email: "",
          phone: "",
          industry: "",
          projectType: "",
          message: "",
        });
        setFile(null);
        setCurrentStep(1);
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
          eyebrow="Contact & RFQ"
          title="Tell us what you need to keep clean"
          description="Share your requirement — from a preliminary concept to a fully detailed RFQ with drawings. Every enquiry reaches an engineer, not a call-centre script."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1.4fr]">
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
                  <span className="block text-xs font-medium uppercase tracking-wider text-muted-foreground">Call us directly</span>
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
                  <span className="block text-xs font-medium uppercase tracking-wider text-muted-foreground">WhatsApp Engineering</span>
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
                  <span className="block text-xs font-medium uppercase tracking-wider text-muted-foreground">Email technical desk</span>
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
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Head Office & Works</p>
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

          {/* Form Column — 3-Step Wizard */}
          <Reveal delay={0.06}>
            <div className="rounded-2xl border bg-card p-6 shadow-md sm:p-8 relative">
              {succeeded ? (
                <div className="flex h-full min-h-96 flex-col items-center justify-center gap-4 text-center py-8">
                  <span className="inline-flex size-16 items-center justify-center rounded-full bg-brand-green/10 text-brand-green ring-8 ring-brand-green/5 animate-pulse">
                    <CheckCircle2 className="size-9" aria-hidden />
                  </span>
                  <h3 className="font-heading text-2xl font-bold">RFQ / Enquiry Received.</h3>
                  <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
                    Thank you! Your requirements have been routed directly to our senior cleanroom engineering team. Expect a structured response and technical feedback within one working day.
                  </p>
                  <div className="rounded-xl border bg-secondary/30 p-4 max-w-sm text-left text-xs space-y-1 text-muted-foreground">
                    <p className="font-semibold text-foreground flex items-center gap-1.5">
                      <ShieldCheck className="size-4 text-brand-green" /> What happens next:
                    </p>
                    <p>1. Engineering review of classification & layout requirements</p>
                    <p>2. Clarification call / feasibility check</p>
                    <p>3. Draft BOQ & indicative schedule proposal</p>
                  </div>
                  <Button
                    variant="outline"
                    className="mt-2 h-11 rounded-full font-semibold"
                    onClick={() => setSucceeded(false)}
                  >
                    Submit another requirement
                  </Button>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} noValidate>
                  {/* Wizard Step Progress Indicator */}
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-3">
                      {[
                        { num: 1, label: "Contact Details" },
                        { num: 2, label: "Project Scope" },
                        { num: 3, label: "Review & Submit" },
                      ].map((s) => {
                        const isDone = currentStep > s.num;
                        const isCurrent = currentStep === s.num;
                        return (
                          <div
                            key={s.num}
                            className="flex items-center gap-2 cursor-pointer"
                            onClick={() => {
                              if (isDone) setCurrentStep(s.num as 1 | 2 | 3);
                            }}
                          >
                            <span
                              className={cn(
                                "inline-flex size-7 items-center justify-center rounded-full text-xs font-bold transition-all",
                                isDone
                                  ? "bg-brand-green text-white"
                                  : isCurrent
                                  ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                                  : "border bg-muted text-muted-foreground"
                              )}
                            >
                              {isDone ? <Check className="size-3.5" /> : s.num}
                            </span>
                            <span
                              className={cn(
                                "hidden sm:inline text-xs font-semibold",
                                isCurrent ? "text-foreground" : "text-muted-foreground"
                              )}
                            >
                              {s.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                    {/* Visual Progress Bar */}
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-brand-sky transition-all duration-300"
                        style={{
                          width:
                            currentStep === 1
                              ? "33%"
                              : currentStep === 2
                              ? "66%"
                              : "100%",
                        }}
                      />
                    </div>
                  </div>

                  {errors.root && (
                    <p
                      role="alert"
                      className="mb-5 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
                    >
                      {errors.root}
                    </p>
                  )}

                  {/* Wizard Content Steps with Framer Motion */}
                  <AnimatePresence mode="wait">
                    {/* STEP 1: Contact Details */}
                    {currentStep === 1 && (
                      <motion.div
                        key="step-1"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-4"
                      >
                        <div className="border-b pb-2">
                          <h4 className="font-heading text-base font-bold text-foreground">
                            Step 1: Your Contact Information
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            Please provide your business coordinates so our engineers can reply with technical documentation.
                          </p>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-1.5">
                            <Label htmlFor="cf-name" className="text-xs font-semibold">
                              Full Name *
                            </Label>
                            <Input
                              id="cf-name"
                              value={formData.name}
                              onChange={(e) => {
                                setFormData({ ...formData, name: e.target.value });
                                if (errors.name) setErrors({ ...errors, name: undefined });
                              }}
                              placeholder="e.g. Dr. Rajesh Sharma"
                              aria-invalid={!!errors.name}
                              className={cn(errors.name && "border-destructive focus-visible:ring-destructive")}
                            />
                            {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
                          </div>

                          <div className="space-y-1.5">
                            <Label htmlFor="cf-company" className="text-xs font-semibold">
                              Company / Organization
                            </Label>
                            <Input
                              id="cf-company"
                              value={formData.company}
                              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                              placeholder="e.g. Biopharma Labs Pvt Ltd"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <Label htmlFor="cf-email" className="text-xs font-semibold">
                              Work Email *
                            </Label>
                            <Input
                              id="cf-email"
                              type="email"
                              value={formData.email}
                              onChange={(e) => {
                                setFormData({ ...formData, email: e.target.value });
                                if (errors.email) setErrors({ ...errors, email: undefined });
                              }}
                              placeholder="r.sharma@biopharma.com"
                              aria-invalid={!!errors.email}
                              className={cn(errors.email && "border-destructive focus-visible:ring-destructive")}
                            />
                            {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                          </div>

                          <div className="space-y-1.5">
                            <Label htmlFor="cf-phone" className="text-xs font-semibold">
                              Phone Number *
                            </Label>
                            <Input
                              id="cf-phone"
                              type="tel"
                              value={formData.phone}
                              onChange={(e) => {
                                setFormData({ ...formData, phone: e.target.value });
                                if (errors.phone) setErrors({ ...errors, phone: undefined });
                              }}
                              placeholder="+91 98XXX XXXXX"
                              aria-invalid={!!errors.phone}
                              className={cn(errors.phone && "border-destructive focus-visible:ring-destructive")}
                            />
                            {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
                          </div>
                        </div>

                        <div className="flex justify-end pt-4">
                          <Button
                            type="button"
                            onClick={handleNext}
                            className="h-10 rounded-full px-6 text-xs font-semibold shadow-sm"
                          >
                            Next: Project Scope
                            <ArrowRight className="size-4 ml-1.5" />
                          </Button>
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 2: Project Scope & Specs */}
                    {currentStep === 2 && (
                      <motion.div
                        key="step-2"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-4"
                      >
                        <div className="border-b pb-2">
                          <h4 className="font-heading text-base font-bold text-foreground">
                            Step 2: Cleanroom Scope & Requirements
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            Tell us about your classification, facility size, or equipment needs.
                          </p>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-1.5">
                            <Label htmlFor="cf-industry" className="text-xs font-semibold">
                              Industry Sector *
                            </Label>
                            <Select
                              value={formData.industry}
                              onValueChange={(val) => {
                                setFormData({ ...formData, industry: val });
                                if (errors.industry) setErrors({ ...errors, industry: undefined });
                              }}
                            >
                              <SelectTrigger id="cf-industry" aria-invalid={!!errors.industry}>
                                <SelectValue placeholder="Select industry" />
                              </SelectTrigger>
                              <SelectContent>
                                {industryOptions.map((o) => (
                                  <SelectItem key={o} value={o}>
                                    {o}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            {errors.industry && <p className="text-xs text-destructive">{errors.industry}</p>}
                          </div>

                          <div className="space-y-1.5">
                            <Label htmlFor="cf-type" className="text-xs font-semibold">
                              Project Type *
                            </Label>
                            <Select
                              value={formData.projectType}
                              onValueChange={(val) => {
                                setFormData({ ...formData, projectType: val });
                                if (errors.projectType) setErrors({ ...errors, projectType: undefined });
                              }}
                            >
                              <SelectTrigger id="cf-type" aria-invalid={!!errors.projectType}>
                                <SelectValue placeholder="Select requirement type" />
                              </SelectTrigger>
                              <SelectContent>
                                {projectTypeOptions.map((o) => (
                                  <SelectItem key={o} value={o}>
                                    {o}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            {errors.projectType && <p className="text-xs text-destructive">{errors.projectType}</p>}
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <Label htmlFor="cf-message" className="text-xs font-semibold">
                            Technical Scope / Message *
                          </Label>
                          <Textarea
                            id="cf-message"
                            value={formData.message}
                            onChange={(e) => {
                              setFormData({ ...formData, message: e.target.value });
                              if (errors.message) setErrors({ ...errors, message: undefined });
                            }}
                            rows={4}
                            placeholder="Describe your target cleanroom class (ISO 5–8 / Grade A–D), room dimensions, product handling, timeline, or specific equipment requirements…"
                            className={cn(errors.message && "border-destructive focus-visible:ring-destructive")}
                          />
                          {errors.message && <p className="text-xs text-destructive">{errors.message}</p>}
                        </div>

                        {/* File Attachment */}
                        <div className="space-y-1.5">
                          <Label htmlFor="cf-attachment" className="text-xs font-semibold">
                            Attachment (Optional — Drawings, URS, BOQ)
                          </Label>
                          <label
                            htmlFor="cf-attachment"
                            className="flex cursor-pointer items-center gap-3 rounded-lg border border-input border-dashed px-4 py-3 text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
                          >
                            <Paperclip className="size-4 shrink-0 text-primary" aria-hidden />
                            <span className="truncate flex-1">
                              {file ? file.name : "Attach drawing or URS (PDF, DWG, DOCX, ZIP up to 5MB)"}
                            </span>
                            <Input
                              id="cf-attachment"
                              name="attachment"
                              type="file"
                              className="sr-only"
                              accept=".pdf,.png,.jpg,.jpeg,.dwg,.dxf,.doc,.docx,.xls,.xlsx,.txt,.step,.stp,.zip"
                              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                            />
                            {file && (
                              <button
                                type="button"
                                aria-label="Remove attachment"
                                className="inline-flex size-6 shrink-0 items-center justify-center rounded-full hover:bg-destructive/10 text-destructive"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setFile(null);
                                }}
                              >
                                <X className="size-3.5" />
                              </button>
                            )}
                          </label>
                        </div>

                        <div className="flex items-center justify-between pt-4">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={handleBack}
                            className="h-10 rounded-full px-5 text-xs font-semibold"
                          >
                            <ArrowLeft className="size-3.5 mr-1.5" />
                            Back
                          </Button>
                          <Button
                            type="button"
                            onClick={handleNext}
                            className="h-10 rounded-full px-6 text-xs font-semibold shadow-sm"
                          >
                            Review & Submit
                            <ArrowRight className="size-4 ml-1.5" />
                          </Button>
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 3: Review & Submit */}
                    {currentStep === 3 && (
                      <motion.div
                        key="step-3"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-4"
                      >
                        <div className="border-b pb-2">
                          <h4 className="font-heading text-base font-bold text-foreground">
                            Step 3: Review Your Cleanroom RFQ
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            Please verify your information before transmitting to our engineering desk.
                          </p>
                        </div>

                        {/* Review Summary Cards */}
                        <div className="space-y-3">
                          <div className="rounded-xl border bg-secondary/30 p-3.5 text-xs">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-bold uppercase tracking-wider text-muted-foreground text-[0.68rem]">
                                Contact Coordinates
                              </span>
                              <button
                                type="button"
                                onClick={() => setCurrentStep(1)}
                                className="inline-flex items-center gap-1 text-primary hover:underline font-semibold"
                              >
                                <Edit3 className="size-3" /> Edit
                              </button>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-foreground/90">
                              <div>
                                <span className="text-muted-foreground block text-[0.68rem]">Name:</span>
                                <span className="font-medium">{formData.name}</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground block text-[0.68rem]">Company:</span>
                                <span className="font-medium">{formData.company || "Not provided"}</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground block text-[0.68rem]">Email:</span>
                                <span className="font-medium">{formData.email}</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground block text-[0.68rem]">Phone:</span>
                                <span className="font-medium">{formData.phone}</span>
                              </div>
                            </div>
                          </div>

                          <div className="rounded-xl border bg-secondary/30 p-3.5 text-xs">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-bold uppercase tracking-wider text-muted-foreground text-[0.68rem]">
                                Scope & Requirements
                              </span>
                              <button
                                type="button"
                                onClick={() => setCurrentStep(2)}
                                className="inline-flex items-center gap-1 text-primary hover:underline font-semibold"
                              >
                                <Edit3 className="size-3" /> Edit
                              </button>
                            </div>
                            <div className="space-y-2 text-foreground/90">
                              <div className="grid grid-cols-2 gap-2">
                                <div>
                                  <span className="text-muted-foreground block text-[0.68rem]">Industry:</span>
                                  <span className="font-medium">{formData.industry}</span>
                                </div>
                                <div>
                                  <span className="text-muted-foreground block text-[0.68rem]">Project Type:</span>
                                  <span className="font-medium">{formData.projectType}</span>
                                </div>
                              </div>
                              <div>
                                <span className="text-muted-foreground block text-[0.68rem]">Message / Specifications:</span>
                                <p className="font-medium text-foreground/85 line-clamp-3 mt-0.5">{formData.message}</p>
                              </div>
                              {file && (
                                <div className="flex items-center gap-1.5 pt-1 text-brand-green font-medium">
                                  <FileCheck className="size-3.5" />
                                  <span>Attached: {file.name}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Honeypot field (hidden from humans) */}
                        <div className="absolute -left-[9999px] top-auto" aria-hidden="true">
                          <label htmlFor="cf-website">Website</label>
                          <input id="cf-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
                        </div>

                        <div className="flex items-center justify-between pt-4">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={handleBack}
                            disabled={submitting}
                            className="h-10 rounded-full px-5 text-xs font-semibold"
                          >
                            <ArrowLeft className="size-3.5 mr-1.5" />
                            Back
                          </Button>

                          <Button
                            type="submit"
                            disabled={submitting}
                            className="h-11 rounded-full px-8 font-semibold text-xs shadow-md shadow-primary/25"
                          >
                            {submitting ? (
                              <>
                                <Loader2 className="size-4 animate-spin mr-2" aria-hidden />
                                Transmitting RFQ…
                              </>
                            ) : (
                              <>
                                Transmit RFQ to Engineering
                                <Send className="size-3.5 ml-2" aria-hidden />
                              </>
                            )}
                          </Button>
                        </div>

                        <p className="mt-3 text-[0.7rem] text-muted-foreground text-center">
                          Protected by CleanOx security verification. Your data is strictly kept confidential per NDA standards.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

