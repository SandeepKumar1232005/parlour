"use client";

import Image from "next/image";

import { Crown, Calendar, MessageCircle } from "lucide-react";
import { SectionHeader, AnimatedCard, Button } from "@/components/ui";
import { hasWhatsApp, getWhatsAppLink } from "@/config/business";

export function BridalSection() {
  return (
    <section className="relative overflow-hidden bg-charcoal py-20 md:py-28" id="bridal">
      {/* Subtle decorative pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle, #C9A96E 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left — Content */}
          <AnimatedCard>
            <div>
              <span className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-champagne-soft">
                <Crown className="h-3.5 w-3.5" />
                Bridal Services
              </span>

              <h2 className="font-display text-4xl font-light leading-tight text-white sm:text-5xl">
                Your Dream{" "}
                <em className="not-italic text-champagne">Bridal Look</em>
              </h2>

              <div className="my-6 h-px w-16 bg-champagne/40" />

              <p className="max-w-md text-base leading-relaxed text-white/60">
                From consultation to the final look, our bridal services are
                designed to make you feel confident and beautiful on your special
                day.
              </p>

              <ul className="mt-6 space-y-3">
                {[
                  "Bridal Makeup",
                  "Hair Styling",
                  "Pre-Bridal Treatments",
                  "Bridal Trial Sessions",
                ].map((service) => (
                  <li
                    key={service}
                    className="flex items-center gap-3 text-sm text-white/70"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-champagne" />
                    {service}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href="/bridal" variant="secondary" size="lg">
                  <Calendar className="h-4 w-4" />
                  Book Bridal Consultation
                </Button>
                {hasWhatsApp() && (
                  <Button
                    href={getWhatsAppLink(
                      "Hi, I would like to enquire about your bridal makeup services."
                    )}
                    external
                    variant="whatsapp"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Enquire on WhatsApp
                  </Button>
                )}
              </div>
            </div>
          </AnimatedCard>

          {/* Right — Visual */}
          <AnimatedCard delay={0.2}>
            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-charcoal-soft">
                <Image
                  src="/images/categories/bridal.jpg"
                  alt="Bridal beauty styling"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent pointer-events-none" />
              </div>
              {/* Decorative frame accent */}
              <div className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-2xl border border-champagne/15" />
            </div>
          </AnimatedCard>
        </div>
      </div>
    </section>
  );
}
