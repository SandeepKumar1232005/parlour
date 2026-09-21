import type { Metadata } from "next";
import { FAQSection } from "@/components/sections/FAQSection";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { business } from "@/config/business";

export const metadata: Metadata = {
  title: `FAQ`,
  description: `Frequently asked questions about ${business.name} — appointments, services, bridal, pricing, and more.`,
};

export default function FAQPage() {
  return (
    <>
      <section className="relative bg-charcoal pt-32 pb-20 text-center">
        <div className="relative mx-auto max-w-4xl px-4">
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.3em] text-champagne-soft">
            Help
          </span>
          <h1 className="font-display text-4xl font-light text-white sm:text-5xl md:text-6xl">
            Frequently Asked{" "}
            <em className="not-italic text-champagne">Questions</em>
          </h1>
          <div className="gold-divider mx-auto my-5" />
          <p className="mx-auto max-w-md text-base text-white/50">
            Find answers to common questions about our services and bookings.
          </p>
        </div>
      </section>

      <FAQSection />
      <FinalCTA />
    </>
  );
}
