"use client";

import { useEffect, useState } from "react";
import { MessageCircle, Phone, ArrowRight } from "lucide-react";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/** Thin branded scroll-progress bar pinned to the very top of the viewport. */
export function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div
      className="scroll-progress"
      style={{ width: `${progress}%` }}
      role="progressbar"
      aria-label="Page scroll progress"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
    />
  );
}

/**
 * Mobile-only sticky bottom CTA bar.
 * Appears after user scrolls past the hero (>= 600px).
 * Hidden on desktop (lg+) where the nav already has a CTA.
 */
export function MobileCtaBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "mobile-cta-bar lg:hidden border-t border-white/10 bg-navy-deep/90 transition-transform duration-300",
        visible ? "translate-y-0" : "translate-y-full"
      )}
      aria-label="Quick contact actions"
    >
      <div className="flex items-stretch divide-x divide-white/10">
        {/* Call */}
        <a
          href={`tel:${site.contact.phoneHref}`}
          aria-label={`Call Cleanox: ${site.contact.phone}`}
          className="flex flex-1 flex-col items-center justify-center gap-1 py-3 text-white/70 transition-colors hover:bg-white/5 hover:text-white active:bg-white/10"
        >
          <Phone className="size-4.5" aria-hidden />
          <span className="text-[0.65rem] font-medium tracking-wide">Call</span>
        </a>

        {/* Get a Quote — primary CTA, prominent */}
        <a
          href="#contact"
          aria-label="Request a quote from Cleanox"
          className="flex flex-[1.6] items-center justify-center gap-2 bg-brand-blue py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-blue/90 active:bg-brand-blue/80"
        >
          Get a Quote
          <ArrowRight className="size-4 shrink-0" aria-hidden />
        </a>

        {/* WhatsApp */}
        <a
          href={`https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(
            "Hello Cleanox, I would like to discuss a cleanroom requirement."
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Cleanox on WhatsApp"
          className="flex flex-1 flex-col items-center justify-center gap-1 py-3 text-white/70 transition-colors hover:bg-white/5 hover:text-[#25d366] active:bg-white/10"
        >
          <MessageCircle className="size-4.5" aria-hidden />
          <span className="text-[0.65rem] font-medium tracking-wide">WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
