"use client";

import { MapPin, Phone, Clock, MessageCircle, Navigation } from "lucide-react";
import { SectionHeader, AnimatedCard, Button } from "@/components/ui";
import {
  business,
  hasAddress,
  hasPhone,
  hasWhatsApp,
  hasHours,
  hasMaps,
  getPhoneLink,
  getWhatsAppLink,
  getFullAddress,
} from "@/config/business";

export function LocationSection() {
  const hasAnyContactInfo = hasAddress() || hasPhone() || hasHours();

  // Show a minimal version even without full address
  return (
    <section className="section-padding bg-ivory" id="location">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Visit Us"
          title="Find"
          titleAccent="Us"
          description={
            hasAddress()
              ? `Located in ${business.address.area || business.address.city}`
              : `Professional beauty services in ${business.address.city}`
          }
        />

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Map or placeholder */}
          <AnimatedCard>
            <div className="overflow-hidden rounded-2xl border border-border bg-cream">
              {hasMaps() && business.maps.embedUrl ? (
                <iframe
                  src={business.maps.embedUrl}
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`${business.name} location on Google Maps`}
                  className="h-[350px] w-full lg:h-[400px]"
                />
              ) : (
                <div className="flex h-[350px] items-center justify-center lg:h-[400px]">
                  <div className="text-center">
                    <MapPin className="mx-auto h-12 w-12 text-champagne/30" />
                    <p className="mt-3 text-sm text-text-muted">
                      {business.address.city}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </AnimatedCard>

          {/* Contact Details */}
          <AnimatedCard delay={0.15}>
            <div className="flex h-full flex-col justify-center space-y-6">
              {hasAddress() && (
                <div className="flex items-start gap-4 rounded-xl border border-border bg-white p-5">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-champagne/10">
                    <MapPin className="h-4 w-4 text-champagne-dark" />
                  </div>
                  <div>
                    <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-charcoal">
                      Address
                    </h3>
                    <p className="mt-1 text-sm text-text-muted">
                      {getFullAddress()}
                    </p>
                    {hasMaps() && (
                      <a
                        href={business.maps.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-champagne-dark hover:underline"
                      >
                        <Navigation className="h-3 w-3" />
                        Get Directions
                      </a>
                    )}
                  </div>
                </div>
              )}

              {hasPhone() && (
                <div className="flex items-start gap-4 rounded-xl border border-border bg-white p-5">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-champagne/10">
                    <Phone className="h-4 w-4 text-champagne-dark" />
                  </div>
                  <div>
                    <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-charcoal">
                      Phone
                    </h3>
                    <a
                      href={getPhoneLink()}
                      className="mt-1 text-sm text-text-muted hover:text-champagne-dark"
                    >
                      {business.phone}
                    </a>
                  </div>
                </div>
              )}

              {hasHours() && (
                <div className="flex items-start gap-4 rounded-xl border border-border bg-white p-5">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-champagne/10">
                    <Clock className="h-4 w-4 text-champagne-dark" />
                  </div>
                  <div>
                    <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-charcoal">
                      Hours
                    </h3>
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

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 sm:flex-row">
                {hasWhatsApp() && (
                  <Button
                    href={getWhatsAppLink("Hi, I would like to visit your salon.")}
                    external
                    variant="whatsapp"
                    className="flex-1"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp Us
                  </Button>
                )}
                {hasPhone() && (
                  <Button href={getPhoneLink()} variant="outline" className="flex-1">
                    <Phone className="h-4 w-4" />
                    Call Us
                  </Button>
                )}
              </div>
            </div>
          </AnimatedCard>
        </div>
      </div>
    </section>
  );
}
