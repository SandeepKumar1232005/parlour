import Link from "next/link";
import {
  MapPin,
  Phone,
  Clock,
  MessageCircle,
} from "lucide-react";

import { SocialLinksGroup } from "@/components/ui/SocialLinks";
import {
  business,
  hasPhone,
  hasWhatsApp,
  hasAddress,
  hasHours,
  getPhoneLink,
  getWhatsAppLink,
  getFullAddress,
} from "@/config/business";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Bridal", href: "/bridal" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Book Appointment", href: "/booking" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-white/80" role="contentinfo">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="group inline-flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-champagne/30 bg-champagne/10">
                <span className="font-display text-lg font-bold text-champagne">
                  {business.name.charAt(0)}
                </span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display text-xl font-semibold tracking-[0.12em] text-white">
                  {business.name}
                </span>
                <span className="mt-0.5 text-[0.6rem] font-medium uppercase tracking-[0.25em] text-white/50">
                  Beauty Studio
                </span>
              </div>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">
              {business.shortDescription ||
                "Professional beauty services crafted with care and expertise."}
            </p>

            {/* Social Links */}
            <div className="mt-8">
              <SocialLinksGroup variant="dark" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-base font-semibold tracking-wider text-white">
              Quick Links
            </h3>
            <div className="mt-1 h-px w-8 bg-champagne/50" />
            <ul className="mt-5 space-y-3" role="list">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-champagne"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services — only show if services exist */}
          <div>
            <h3 className="font-display text-base font-semibold tracking-wider text-white">
              Services
            </h3>
            <div className="mt-1 h-px w-8 bg-champagne/50" />
            <ul className="mt-5 space-y-3" role="list">
              {["Hair", "Skin & Facials", "Bridal", "Makeup", "Nails", "Spa"].map(
                (service) => (
                  <li key={service}>
                    <Link
                      href="/services"
                      className="text-sm text-white/60 transition-colors hover:text-champagne"
                    >
                      {service}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-base font-semibold tracking-wider text-white">
              Contact
            </h3>
            <div className="mt-1 h-px w-8 bg-champagne/50" />
            <div className="mt-5 space-y-4">
              {hasAddress() && (
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-champagne/70" />
                  <p className="text-sm text-white/60">{getFullAddress()}</p>
                </div>
              )}
              {hasPhone() && (
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 flex-shrink-0 text-champagne/70" />
                  <a
                    href={getPhoneLink()}
                    className="text-sm text-white/60 transition-colors hover:text-champagne"
                  >
                    {business.phone}
                  </a>
                </div>
              )}
              {hasHours() && (
                <div className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-4 w-4 flex-shrink-0 text-champagne/70" />
                  <div className="text-sm text-white/60">
                    <p>Mon–Sat: {business.hours.weekdays}</p>
                    {business.hours.sunday && <p>Sun: {business.hours.sunday}</p>}
                  </div>
                </div>
              )}
            </div>

            {/* CTA Buttons */}
            <div className="mt-6 flex gap-2">
              {hasWhatsApp() && (
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg bg-whatsapp/15 px-4 py-2.5 text-xs font-semibold text-whatsapp transition-all hover:bg-whatsapp/25"
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  WhatsApp
                </a>
              )}
              {hasPhone() && (
                <a
                  href={getPhoneLink()}
                  className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2.5 text-xs font-semibold text-white/80 transition-all hover:bg-white/15"
                >
                  <Phone className="h-3.5 w-3.5" />
                  Call
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
            <p className="text-xs text-white/40">
              © {currentYear} {business.name}. All rights reserved.
            </p>
            <div className="flex gap-6">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs text-white/40 transition-colors hover:text-white/60"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
