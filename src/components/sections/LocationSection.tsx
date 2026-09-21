"use client";

import { MapPin, Phone, Clock, MessageCircle, Mail, Calendar } from "lucide-react";
import { SectionHeader, AnimatedCard, Button } from "@/components/ui";
import {
  business,
  hasAddress,
  hasPhone,
  hasWhatsApp,
  hasHours,
  hasMaps,
  hasEmail,
  getPhoneLink,
  getWhatsAppLink,
  getEmailLink,
  getFullAddress,
  getMapsEmbedUrl,
  getDirectionsUrl,
} from "@/config/business";

export function LocationSection() {
  const embedUrl = getMapsEmbedUrl();
  const directionsUrl = getDirectionsUrl();
  const address = getFullAddress();

  return (
    <section className="section-padding bg-ivory" id="location">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Visit Us"
          title="Find"
          titleAccent="Us"
          description={
            hasAddress()
              ? `Located at ${business.location.address || business.address.area || business.address.city}`
              : `Professional beauty services in ${business.address.city}`
          }
        />

        <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
          {/* Map Column (LEFT on Desktop: lg:order-1, order-2 on Mobile) */}
          <div className="order-2 lg:order-1 flex flex-col space-y-4">
            <AnimatedCard>
              <div className="overflow-hidden rounded-2xl border border-border bg-cream shadow-sm">
                {embedUrl ? (
                  <iframe
                    src={embedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Google Maps location of ${business.name}`}
                    className="h-[320px] sm:h-[380px] lg:h-[480px] w-full"
                  />
                ) : (
                  <div className="flex h-[320px] sm:h-[380px] lg:h-[480px] w-full items-center justify-center p-6 text-center">
                    <div>
                      <MapPin className="mx-auto h-12 w-12 text-champagne/40" />
                      <p className="mt-3 text-sm font-medium text-text-muted">
                        Google Maps location will appear here.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </AnimatedCard>

            {/* Address & Get Directions Card Below Map */}
            {hasAddress() && (
              <AnimatedCard delay={0.1}>
                <div className="rounded-2xl border border-border bg-white p-5 sm:p-6 shadow-sm">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-1">
                      <span className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-champagne-dark">
                        Location
                      </span>
                      <p className="text-sm font-medium leading-relaxed text-charcoal sm:max-w-md">
                        {address}
                      </p>
                    </div>
                    {hasMaps() && (
                      <a
                        href={directionsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[44px] shrink-0 items-center justify-center gap-2 rounded-xl bg-champagne px-5 py-3 text-xs font-bold tracking-wider uppercase text-charcoal shadow-sm transition-all duration-300 hover:bg-champagne-dark hover:text-white"
                      >
                        <span>GET DIRECTIONS</span>
                        <span aria-hidden="true" className="text-sm font-bold">→</span>
                      </a>
                    )}
                  </div>
                </div>
              </AnimatedCard>
            )}
          </div>

          {/* Contact Details Column (RIGHT on Desktop: lg:order-2, order-1 on Mobile) */}
          <div className="order-1 lg:order-2 flex flex-col space-y-5">
            <AnimatedCard delay={0.15}>
              <div className="space-y-4">
                {/* Contact Heading */}
                <div className="mb-2">
                  <h3 className="font-display text-2xl font-semibold text-charcoal">
                    Get in Touch
                  </h3>
                  <p className="mt-1 text-sm text-text-muted">
                    We are available for bookings, consultations, and walk-ins.
                  </p>
                </div>

                {/* Phone */}
                {hasPhone() && (
                  <div className="flex items-start gap-4 rounded-xl border border-border bg-white p-5 shadow-sm">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-champagne/10">
                      <Phone className="h-4 w-4 text-champagne-dark" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-display text-xs font-semibold uppercase tracking-wider text-charcoal">
                        Phone
                      </h4>
                      <a
                        href={getPhoneLink()}
                        className="mt-1 block text-base font-semibold text-charcoal hover:text-champagne-dark transition-colors"
                      >
                        {business.phone}
                      </a>
                    </div>
                  </div>
                )}

                {/* Action Buttons: WhatsApp & Call */}
                <div className="flex flex-col gap-3 sm:flex-row">
                  {hasWhatsApp() && (
                    <Button
                      href={getWhatsAppLink("Hi, I would like to visit your salon.")}
                      external
                      variant="whatsapp"
                      className="flex-1 min-h-[44px]"
                    >
                      <MessageCircle className="h-4 w-4" />
                      WhatsApp Us
                    </Button>
                  )}
                  {hasPhone() && (
                    <Button
                      href={getPhoneLink()}
                      variant="outline"
                      className="flex-1 min-h-[44px]"
                    >
                      <Phone className="h-4 w-4" />
                      Call Us
                    </Button>
                  )}
                </div>

                {/* Email (if available) */}
                {hasEmail() && (
                  <div className="flex items-start gap-4 rounded-xl border border-border bg-white p-5 shadow-sm">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-champagne/10">
                      <Mail className="h-4 w-4 text-champagne-dark" />
                    </div>
                    <div>
                      <h4 className="font-display text-xs font-semibold uppercase tracking-wider text-charcoal">
                        Email
                      </h4>
                      <a
                        href={getEmailLink()}
                        className="mt-1 block text-sm text-text-muted hover:text-champagne-dark transition-colors"
                      >
                        {business.email}
                      </a>
                    </div>
                  </div>
                )}

                {/* Opening Hours */}
                {hasHours() && (
                  <div className="flex items-start gap-4 rounded-xl border border-border bg-white p-5 shadow-sm">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-champagne/10">
                      <Clock className="h-4 w-4 text-champagne-dark" />
                    </div>
                    <div>
                      <h4 className="font-display text-xs font-semibold uppercase tracking-wider text-charcoal">
                        Opening Hours
                      </h4>
                      <div className="mt-1 space-y-1 text-sm text-text-muted">
                        <p>Mon–Sat: {business.hours.weekdays}</p>
                        {business.hours.sunday && <p>Sun: {business.hours.sunday}</p>}
                        {business.hours.note && (
                          <p className="text-xs italic text-text-light">
                            {business.hours.note}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Book Appointment CTA */}
                <div className="pt-2">
                  <Button
                    href="/booking"
                    variant="primary"
                    className="w-full min-h-[44px]"
                  >
                    <Calendar className="h-4 w-4" />
                    Book an Appointment
                  </Button>
                </div>
              </div>
            </AnimatedCard>
          </div>
        </div>
      </div>
    </section>
  );
}
