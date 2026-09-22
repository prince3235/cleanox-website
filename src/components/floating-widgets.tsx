"use client";

import { useEffect, useState } from "react";
import { ArrowUp, MessageCircle, Phone } from "lucide-react";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/** Persistent click-to-call / WhatsApp widget — compact, professional, non-intrusive. */
export function FloatingWidgets() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 640);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="fixed right-4 z-50 flex flex-col items-center gap-2 lg:bottom-auto lg:right-6"
      style={{ bottom: "max(1.25rem, env(safe-area-inset-bottom))" }}
      role="complementary"
      aria-label="Quick contact"
    >
      {/* Back to top — only shows after scrolling */}
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        className={cn(
          "inline-flex size-9 items-center justify-center rounded-full border bg-card/90 text-foreground/70 shadow-md backdrop-blur-sm transition-all duration-300 hover:bg-card hover:text-foreground",
          showTop
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-3 opacity-0"
        )}
      >
        <ArrowUp className="size-4" aria-hidden />
      </button>

      {/* Phone — desktop only (mobile has the sticky bottom bar) */}
      <a
        href={`tel:${site.contact.phoneHref}`}
        aria-label={`Call ${site.name}: ${site.contact.phone}`}
        className="hidden lg:inline-flex size-10 items-center justify-center rounded-full bg-navy/90 text-white shadow-md backdrop-blur-sm transition-all duration-200 hover:bg-navy hover:scale-105"
      >
        <Phone className="size-4.5" aria-hidden />
      </a>

      {/* WhatsApp — slow breathing glow instead of aggressive ping */}
      <a
        href={`https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(
          "Hello Cleanox, I would like to discuss a cleanroom requirement."
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Cleanox on WhatsApp"
        className="group relative hidden lg:inline-flex size-11 items-center justify-center rounded-full bg-[#25d366] text-white shadow-md transition-all duration-200 hover:scale-105 hover:bg-[#20b958] whatsapp-breathe"
      >
        <MessageCircle className="size-5" aria-hidden />
        {/* Tooltip on hover — desktop only */}
        <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-md bg-navy-deep/95 px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-md transition-opacity duration-150 group-hover:opacity-100 sm:block">
          Chat on WhatsApp
        </span>
      </a>
    </div>
  );
}

