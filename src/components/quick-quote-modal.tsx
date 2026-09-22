"use client";

import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Loader2,
  MessageCircle,
  Phone,
  Send,
  ShieldCheck,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { site } from "@/lib/site";

interface QuickQuoteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function QuickQuoteModal({ open, onOpenChange }: QuickQuoteModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [requirement, setRequirement] = useState("Turnkey Cleanroom Project");
  const [submitting, setSubmitting] = useState(false);
  const [succeeded, setSucceeded] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || submitting) return;

    setSubmitting(true);

    const fd = new FormData();
    fd.set("name", name);
    fd.set("phone", phone);
    fd.set("email", "quick-callback@cleanox.in");
    fd.set("industry", "Quick Callback Request");
    fd.set("projectType", requirement);
    fd.set(
      "message",
      `Quick Callback Request from header CTA. Requirement: ${requirement}. Phone: ${phone}`
    );
    fd.set("tsStart", new Date().toISOString());

    try {
      const res = await fetch("/api/contact", { method: "POST", body: fd });
      if (res.ok) {
        setSucceeded(true);
        setName("");
        setPhone("");
      }
    } catch {
      // Fallback
    } finally {
      setSubmitting(false);
    }
  }

  const handleFullRfq = () => {
    onOpenChange(false);
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
    else window.location.hash = "contact";
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-6">
        <DialogHeader className="text-left">
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex size-7 items-center justify-center rounded-md bg-primary/10 text-primary">
              <Phone className="size-3.5" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              Direct Engineering Desk
            </span>
          </div>
          <DialogTitle className="font-heading text-xl font-bold text-foreground">
            Request an Engineering Consultation
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground leading-normal">
            Drop your number for a direct technical review with a cleanroom project engineer within one working day.
          </DialogDescription>
        </DialogHeader>

        {succeeded ? (
          <div className="py-6 text-center space-y-3">
            <span className="inline-flex size-14 items-center justify-center rounded-full bg-brand-green/10 text-brand-green ring-8 ring-brand-green/5">
              <CheckCircle2 className="size-8" />
            </span>
            <h4 className="font-heading text-lg font-bold text-foreground">
              Callback Request Logged!
            </h4>
            <p className="text-xs text-muted-foreground max-w-xs mx-auto">
              Thank you, our senior HVAC & cleanroom engineer will connect with you at your provided number.
            </p>
            <div className="pt-2 flex flex-col gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setSucceeded(false);
                  onOpenChange(false);
                }}
                className="rounded-full text-xs font-semibold"
              >
                Close Window
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <Label htmlFor="qq-name" className="text-xs font-semibold">
                Your Name *
              </Label>
              <Input
                id="qq-name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Dr. A. K. Patel"
                className="h-10 text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="qq-phone" className="text-xs font-semibold">
                Phone / WhatsApp Number *
              </Label>
              <Input
                id="qq-phone"
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98XXX XXXXX"
                className="h-10 text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="qq-req" className="text-xs font-semibold">
                Primary Cleanroom Need
              </Label>
              <Select value={requirement} onValueChange={setRequirement}>
                <SelectTrigger id="qq-req" className="h-10 text-xs">
                  <SelectValue placeholder="Select primary need" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Turnkey Cleanroom Project">
                    New Turnkey Cleanroom Project
                  </SelectItem>
                  <SelectItem value="HVAC / AHU & Dehumidification">
                    HVAC, AHU & Dehumidification
                  </SelectItem>
                  <SelectItem value="HEPA Filtration & Air Showers">
                    HEPA Filtration & Pass-Boxes
                  </SelectItem>
                  <SelectItem value="Cleanroom Retrofit / Upgrade">
                    Facility Retrofit / Classification Upgrade
                  </SelectItem>
                  <SelectItem value="Testing & Validation (IQ/OQ)">
                    Testing & Validation Support
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2 rounded-lg bg-secondary/50 p-2.5 text-[0.72rem] text-muted-foreground">
              <Clock className="size-3.5 text-primary shrink-0" />
              <span>Response within 2 hours during business hours (9:30–18:30 IST)</span>
            </div>

            <Button
              type="submit"
              disabled={submitting}
              className="w-full h-10 rounded-full font-semibold text-xs shadow-md shadow-primary/20"
            >
              {submitting ? (
                <>
                  <Loader2 className="size-4 animate-spin mr-2" />
                  Connecting…
                </>
              ) : (
                <>
                  Request Engineering Callback
                  <Send className="size-3.5 ml-1.5" />
                </>
              )}
            </Button>

            <div className="pt-2 border-t flex items-center justify-between text-xs text-muted-foreground">
              <a
                href={`https://wa.me/${site.contact.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[#1da851] hover:underline font-medium"
              >
                <MessageCircle className="size-3.5 text-[#25d366]" />
                WhatsApp us directly
              </a>
              <button
                type="button"
                onClick={handleFullRfq}
                className="text-primary hover:underline font-medium"
              >
                Have drawings? Full RFQ form →
              </button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
