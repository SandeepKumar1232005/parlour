"use client";

import { Calendar, MessageCircle, Phone, ArrowRight } from "lucide-react";
import { Button, AnimatedCard } from "@/components/ui";
import { business, hasPhone, hasWhatsApp, getPhoneLink, getWhatsAppLink } from "@/config/business";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-charcoal py-20 md:py-24">
      {/* Subtle gold gradient accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-champagne/5 via-transparent to-champagne/3" />

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <AnimatedCard>
          <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.3em] text-champagne-soft">
            Ready?
          </span>

          <h2 className="font-display text-3xl font-light leading-tight text-white sm:text-4xl md:text-5xl">
            Begin Your{" "}
            <em className="not-italic text-champagne">Beauty Journey</em>
          </h2>

          <div className="mx-auto my-6 h-px w-16 bg-champagne/30" />

          <p className="mx-auto max-w-md text-base text-white/50">
            Book an appointment or reach out to us — we look forward to
            welcoming you.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button href="/booking" variant="secondary" size="lg">
              <Calendar className="h-4 w-4" />
              Book Appointment
            </Button>
            {hasWhatsApp() && (
              <Button
                href={getWhatsAppLink()}
                external
                variant="whatsapp"
                size="lg"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp Us
              </Button>
            )}
            {hasPhone() && (
              <Button href={getPhoneLink()} variant="ghost" size="lg" className="text-white/60 hover:text-white hover:bg-white/10">
                <Phone className="h-4 w-4" />
                Call
              </Button>
            )}
          </div>
        </AnimatedCard>
      </div>
    </section>
  );
}
