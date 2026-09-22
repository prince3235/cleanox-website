"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Menu, Moon, Phone, Search, Sun, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CommandPalette } from "@/components/command-palette";
import { QuickQuoteModal } from "@/components/quick-quote-modal";
import { nav, site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: highlight nav item for the section closest to top of viewport
  useEffect(() => {
    const sectionIds = nav.map((item) => item.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border/60 bg-background/90 shadow-sm backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo — no white card container; use the actual logo asset */}
        <Link
          href="/"
          className="flex shrink-0 items-center rounded-lg focus-visible:outline-2 focus-visible:outline-ring"
          aria-label={`${site.name} – home`}
        >
          {/* White text logo for dark background (over hero when not scrolled, or dark mode when scrolled) */}
          <Image
            src="/images/brand/cleanox_logo_white.png"
            alt={`${site.name} – ${site.tagline}`}
            width={160}
            height={43}
            priority
            className={cn(
              "h-9 w-auto object-contain transition-opacity duration-300 sm:h-10",
              scrolled ? "hidden dark:block" : "block"
            )}
          />
          {/* Dark text logo for light mode when scrolled */}
          <Image
            src="/images/brand/cleanox_logo_dark.png"
            alt={`${site.name} – ${site.tagline}`}
            width={160}
            height={43}
            priority
            className={cn(
              "h-9 w-auto object-contain transition-opacity duration-300 sm:h-10",
              scrolled ? "block dark:hidden" : "hidden"
            )}
          />
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden items-center gap-0.5 lg:flex">
          {nav.map((item) => {
            const isActive = activeSection === item.href.replace("#", "");
            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "group relative rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200",
                  scrolled
                    ? isActive
                      ? "text-foreground"
                      : "text-foreground/70 hover:bg-muted hover:text-foreground"
                    : isActive
                    ? "text-white"
                    : "text-slate-100/85 hover:text-white"
                )}
              >
                {item.label}
                <span
                  className={cn(
                    "absolute inset-x-3 -bottom-px h-0.5 rounded-full transition-transform duration-200",
                    scrolled ? "bg-primary" : "bg-brand-sky",
                    isActive ? "scale-x-100" : "origin-left scale-x-0 group-hover:scale-x-100"
                  )}
                />
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          {/* Search Trigger (Ctrl + K) */}
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label="Search cleanroom solutions and standards (Ctrl + K)"
            className={cn(
              "flex items-center gap-2 rounded-full px-2.5 py-1.5 text-xs font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-ring cursor-pointer",
              scrolled
                ? "bg-muted/70 text-foreground/75 hover:bg-muted hover:text-foreground"
                : "bg-white/10 text-white/85 backdrop-blur-sm hover:bg-white/20 hover:text-white"
            )}
          >
            <Search className="size-3.5" aria-hidden />
            <span className="hidden sm:inline">Search</span>
            <kbd
              className={cn(
                "hidden rounded px-1.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase sm:inline-block",
                scrolled ? "bg-background/80 text-foreground/70 shadow-xs" : "bg-black/25 text-white/90"
              )}
            >
              ⌘K
            </kbd>
          </button>

          {/* Theme toggle */}
          <button
            type="button"
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            aria-label="Toggle dark mode"
            className={cn(
              "inline-flex size-9 items-center justify-center rounded-full transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-ring cursor-pointer",
              scrolled
                ? "text-foreground/60 hover:bg-muted hover:text-foreground"
                : "text-white/70 hover:bg-white/10 hover:text-white"
            )}
          >
            <Sun className="hidden size-4.5 dark:block" aria-hidden />
            <Moon className="size-4.5 dark:hidden" aria-hidden />
          </button>

          {/* CTA — opens quick quote / callback modal */}
          <Button
            type="button"
            onClick={() => setQuoteOpen(true)}
            className={cn(
              "hidden h-9 rounded-full px-5 text-sm font-semibold transition-all duration-200 sm:inline-flex cursor-pointer",
              scrolled
                ? "bg-navy text-white shadow-none hover:bg-navy/85 dark:bg-primary dark:hover:bg-primary/85"
                : "border border-white/35 bg-transparent text-white shadow-none backdrop-blur-sm hover:bg-white/10 hover:border-white/50"
            )}
          >
            Request a Quote
          </Button>

          {/* Mobile menu trigger */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Open menu"
                className={cn(
                  "inline-flex size-9 items-center justify-center rounded-full transition-colors duration-200 lg:hidden cursor-pointer",
                  scrolled
                    ? "text-foreground hover:bg-muted"
                    : "text-white hover:bg-white/10"
                )}
              >
                {open ? <X className="size-5" /> : <Menu className="size-5" />}
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="flex w-[86vw] max-w-sm flex-col gap-0 p-0">
              <SheetHeader className="border-b px-5 py-4 text-left">
                <SheetTitle asChild>
                  <div className="flex items-center">
                    <Image
                      src="/images/brand/cleanox_logo_dark.png"
                      alt={`${site.name} – ${site.tagline}`}
                      width={140}
                      height={38}
                      className="h-8 w-auto object-contain dark:hidden"
                    />
                    <Image
                      src="/images/brand/cleanox_logo_white.png"
                      alt={`${site.name} – ${site.tagline}`}
                      width={140}
                      height={38}
                      className="hidden h-8 w-auto object-contain dark:block"
                    />
                  </div>
                </SheetTitle>
              </SheetHeader>
              <div className="p-3 border-b">
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    setSearchOpen(true);
                  }}
                  className="flex w-full items-center justify-between rounded-lg border border-input bg-background/50 px-3 py-2 text-xs text-muted-foreground"
                >
                  <span className="flex items-center gap-2">
                    <Search className="size-3.5 text-primary" />
                    Search solutions, standards, specs...
                  </span>
                  <kbd className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-mono">⌘K</kbd>
                </button>
              </div>
              <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-3 py-4">
                <ul className="space-y-1">
                  {nav.map((item) => (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="block rounded-lg px-3 py-3 text-base font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                  <li>
                    <a
                      href="#projects"
                      onClick={() => setOpen(false)}
                      className="block rounded-lg px-3 py-3 text-base font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
                    >
                      Projects
                    </a>
                  </li>
                </ul>
              </nav>
              <div className="space-y-3 border-t px-5 py-4 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
                <Button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    setQuoteOpen(true);
                  }}
                  className="h-11 w-full rounded-full bg-navy font-semibold text-white hover:bg-navy/85 dark:bg-primary cursor-pointer"
                >
                  Request a Quote
                </Button>
                <a
                  href={`tel:${site.contact.phoneHref}`}
                  className="flex items-center justify-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Phone className="size-4" aria-hidden /> {site.contact.phone}
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Global Command Palette (Ctrl+K) and Quick Quote Modal */}
      <CommandPalette open={searchOpen} onOpenChange={setSearchOpen} />
      <QuickQuoteModal open={quoteOpen} onOpenChange={setQuoteOpen} />
    </header>
  );
}
