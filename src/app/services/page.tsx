import type { Metadata } from "next";
import { SectionHeader, AnimatedCard, Button } from "@/components/ui";
import { ServiceDirectory } from "@/components/sections/ServiceDirectory";
import { ServicePackages } from "@/components/sections/ServicePackages";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { business } from "@/config/business";

export const metadata: Metadata = {
  title: `Services | ${business.name}`,
  description: `Explore our complete range of professional beauty services — hair, skin, bridal, makeup, nails, and more. ${business.name}, ${business.address.city}.`,
};

export default function ServicesPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="relative bg-charcoal pt-32 pb-20 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-soft to-charcoal" />
        <div className="relative mx-auto max-w-4xl px-4">
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.3em] text-champagne-soft">
            What We Offer
          </span>
          <h1 className="font-display text-4xl font-light text-white sm:text-5xl md:text-6xl">
            Our <em className="not-italic text-champagne">Services</em>
          </h1>
          <div className="gold-divider mx-auto my-5" />
          <p className="mx-auto max-w-md text-base text-white/50">
            Professional beauty services crafted with care and expertise.
          </p>
        </div>
      </section>

      {/* Service Directory (Intelligent Search & Filter) */}
      <ServiceDirectory />

      {/* Service Packages */}
      <ServicePackages />

      {/* Not Sure CTA */}
      <section className="bg-cream py-16">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <AnimatedCard>
            <div className="rounded-2xl border border-champagne/15 bg-white p-8 shadow-sm">
              <h3 className="font-display text-2xl font-semibold text-charcoal">
                Not sure what to choose?
              </h3>
              <p className="mt-2 text-sm text-text-muted">
                Talk to one of our beauty experts — we will recommend the best
                service for your needs.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Button href="/booking" variant="primary">
                  Book a Consultation
                </Button>
                <Button href="/contact" variant="outline">
                  Contact Us
                </Button>
              </div>
            </div>
          </AnimatedCard>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
