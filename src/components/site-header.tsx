"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { nav, site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setOpen(false);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300",
        scrolled
          ? "border-b border-border/70 bg-background/95 shadow-sm backdrop-blur-xl"
          : "border-b border-white/10 bg-navy-deep/10 backdrop-blur-[2px]"
      )}
    >
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <a
          href="#home"
          className="group shrink-0 rounded-lg focus-visible:outline-2 focus-visible:outline-ring"
          aria-label={site.name + " – home"}
        >
          <Image
            src={scrolled ? "/images/brand/cleanox_logo_dark.png" : "/images/brand/cleanox_logo_white.png"}
            alt={site.name + " – " + site.tagline}
            width={180}
            height={48}
            priority
            className="h-9 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02] sm:h-10"
          />
        </a>

        <nav aria-label="Primary" className="ml-auto hidden items-center gap-0.5 xl:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "group relative rounded-md px-3 py-2 text-[0.82rem] font-medium transition-colors",
                scrolled ? "text-foreground/75 hover:text-foreground" : "text-white/82 hover:text-white"
              )}
            >
              {item.label}
              <span
                className={cn(
                  "absolute inset-x-3 -bottom-px h-0.5 origin-left scale-x-0 rounded-full transition-transform duration-200 group-hover:scale-x-100",
                  scrolled ? "bg-primary" : "bg-brand-sky"
                )}
              />
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 xl:ml-4">
          <a
            href={site.contact.phone ? "tel:" + site.contact.phoneHref : "#contact"}
            className={cn(
              "hidden h-9 items-center gap-2 rounded-full px-3.5 text-xs font-semibold transition-colors sm:inline-flex",
              scrolled
                ? "text-foreground/75 hover:bg-muted hover:text-foreground"
                : "text-white/80 hover:bg-white/10 hover:text-white"
            )}
            aria-label="Call Cleanox"
          >
            <Phone className="size-3.5" aria-hidden />
            <span className="hidden 2xl:inline">{site.contact.phone}</span>
          </a>

          <Button
            asChild
            className={cn(
              "hidden h-9 rounded-full px-5 text-xs font-semibold sm:inline-flex",
              scrolled ? "bg-navy text-white hover:bg-navy/90" : "bg-white text-navy hover:bg-white/90"
            )}
          >
            <a href="#contact">Request a Quote</a>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                className={cn(
                  "inline-flex size-10 items-center justify-center rounded-full border focus-visible:outline-2 focus-visible:outline-ring lg:hidden",
                  scrolled
                    ? "border-border bg-card text-foreground"
                    : "border-white/20 bg-white/10 text-white backdrop-blur-sm"
                )}
                aria-label={open ? "Close navigation menu" : "Open navigation menu"}
              >
                {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
              </button>
            </SheetTrigger>

            <SheetContent side="right" className="w-[min(88vw,24rem)] border-l bg-background p-0">
              <SheetHeader className="border-b px-6 py-5 text-left">
                <SheetTitle className="font-heading text-lg">{site.name}</SheetTitle>
              </SheetHeader>

              <div className="px-6 py-6">
                <nav aria-label="Mobile primary" className="flex flex-col">
                  {nav.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={closeMenu}
                      className="border-b border-border py-4 font-heading text-base font-semibold text-foreground transition-colors hover:text-primary"
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>

                <Button asChild className="mt-6 h-11 w-full rounded-full font-semibold">
                  <a href="#contact" onClick={closeMenu}>Request a Quote</a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
