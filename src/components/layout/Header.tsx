"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { business, hasPhone, getPhoneLink, hasWhatsApp, getWhatsAppLink } from "@/config/business";
import { MobileDrawer } from "./MobileDrawer";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Bridal", href: "/bridal" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-[50] transition-all duration-500",
          scrolled
            ? "glass border-b border-border py-3 shadow-[0_4px_30px_rgba(0,0,0,0.06)]"
            : "bg-gradient-to-b from-black/40 to-transparent py-5"
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav
            className="flex items-center justify-between"
            aria-label="Main navigation"
          >
            {/* Logo */}
            <Link
              href="/"
              className="group flex items-center gap-3 transition-transform duration-300 hover:scale-[1.02]"
              aria-label={`${business.name} Home`}
            >
              <div
                className={cn(
                  "flex h-11 w-11 items-center justify-center rounded-xl border transition-all duration-500",
                  scrolled
                    ? "border-champagne/30 bg-champagne/10 text-champagne-dark"
                    : "border-white/20 bg-white/10 text-white backdrop-blur-sm"
                )}
              >
                <span className="font-display text-lg font-bold">
                  {business.name.charAt(0)}
                </span>
              </div>
              <div className="flex flex-col leading-none">
                <span
                  className={cn(
                    "font-display text-xl font-semibold tracking-[0.12em] transition-all duration-500",
                    scrolled
                      ? "text-charcoal"
                      : "text-white [text-shadow:0_2px_10px_rgba(0,0,0,0.3)]"
                  )}
                >
                  {business.name}
                </span>
                <span
                  className={cn(
                    "mt-0.5 text-[0.6rem] font-medium uppercase tracking-[0.25em] transition-colors duration-500",
                    scrolled ? "text-text-muted" : "text-white/70"
                  )}
                >
                  Beauty Studio
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <ul className="hidden items-center gap-8 lg:flex" role="list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "relative py-2 text-[0.88rem] font-medium transition-all duration-300",
                      "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:transition-all after:duration-400",
                      scrolled
                        ? "text-text-body hover:text-charcoal after:bg-champagne"
                        : "text-white/90 hover:text-champagne-soft after:bg-champagne-soft [text-shadow:0_2px_8px_rgba(0,0,0,0.2)]",
                      "hover:after:w-full"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Desktop CTA (Reveals on Scroll) */}
            <div 
              className={cn(
                "hidden items-center gap-3 lg:flex transition-all duration-500",
                scrolled ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
              )}
            >
              {hasWhatsApp() && (
                <a
                  href={getWhatsAppLink("Hi, I would like to book an appointment.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-whatsapp hover:bg-whatsapp/10 transition-colors"
                  aria-label="WhatsApp"
                >
                  <span className="hidden xl:inline">WhatsApp</span>
                </a>
              )}
              {hasPhone() && (
                <a
                  href={getPhoneLink()}
                  className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-text-body hover:text-charcoal transition-colors"
                  aria-label="Call us"
                >
                  <Phone className="h-4 w-4" />
                  <span className="hidden xl:inline">Call</span>
                </a>
              )}
              <Link
                href="/booking"
                className="rounded-xl bg-charcoal px-6 py-2.5 text-sm font-semibold tracking-wide text-ivory transition-all duration-400 hover:bg-charcoal-soft hover:shadow-lg hover:-translate-y-0.5"
              >
                Book Appointment
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setDrawerOpen(true)}
              className={cn(
                "flex h-11 w-11 items-center justify-center rounded-xl border transition-all duration-300 lg:hidden",
                scrolled
                  ? "border-border bg-cream text-charcoal hover:bg-cream-dark"
                  : "border-white/25 bg-white/15 text-white backdrop-blur-sm hover:bg-white/25"
              )}
              aria-label="Open menu"
              aria-expanded={drawerOpen}
            >
              <Menu className="h-5 w-5" />
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        links={navLinks}
      />
    </>
  );
}
