import type { Metadata } from "next";
import { BridalSection } from "@/components/sections/BridalSection";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { FAQSection } from "@/components/sections/FAQSection";
import { AnimatedCard, Button } from "@/components/ui";
import { Calendar, MessageCircle } from "lucide-react";
import { business, hasWhatsApp, getWhatsAppLink } from "@/config/business";

export const metadata: Metadata = {
  title: `Bridal Makeup & Services`,
  description: `Premium bridal makeup, hair styling, pre-bridal treatments, and complete wedding beauty services. Book your bridal consultation today.`,
};

export default function BridalPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="relative bg-charcoal pt-32 pb-20 text-center">
        <div className="relative mx-auto max-w-4xl px-4">
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.3em] text-champagne-soft">
            Bridal Beauty
          </span>
          <h1 className="font-display text-4xl font-light text-white sm:text-5xl md:text-6xl">
            Bridal <em className="not-italic text-champagne">Services</em>
          </h1>
          <div className="gold-divider mx-auto my-5" />
          <p className="mx-auto max-w-lg text-base text-white/50">
            Comprehensive bridal beauty services designed to make you feel
            confident and radiant on your special day.
          </p>
        </div>
      </section>

      {/* Bridal Services Detail */}
      <section className="section-padding bg-ivory">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            {[
              {
                title: "Bridal Makeup",
                desc: "Customised makeup look designed to complement your outfit, jewellery, and personal style.",
              },
              {
                title: "Hair Styling",
                desc: "Elegant updos, braids, and styling to complete your bridal look.",
              },
              {
                title: "Pre-Bridal Treatments",
                desc: "A series of skin and hair treatments to prepare you for the big day.",
              },
              {
                title: "Bridal Trial",
                desc: "A trial session to finalise your look, colours, and styling before the wedding.",
              },
              {
                title: "Reception & Engagement",
                desc: "Separate looks for reception, engagement, and other wedding functions.",
              },
              {
                title: "Wedding Guest Makeup",
                desc: "Professional makeup services for bridesmaids, family, and wedding guests.",
              },
            ].map((service, index) => (
              <AnimatedCard key={service.title} delay={index * 0.08}>
                <div className="rounded-2xl border border-border bg-white p-6 transition-all hover:border-champagne/20 hover:shadow-sm">
                  <h3 className="font-display text-xl font-semibold text-charcoal">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">
                    {service.desc}
                  </p>
                  <p className="mt-3 text-xs font-medium text-champagne-dark">
                    Contact us for pricing
                  </p>
                </div>
              </AnimatedCard>
            ))}
          </div>

          {/* Bridal CTA */}
          <div className="mt-12 text-center">
            <AnimatedCard>
              <div className="rounded-2xl border border-champagne/15 bg-cream p-8">
                <h3 className="font-display text-2xl font-semibold text-charcoal">
                  Ready to plan your bridal look?
                </h3>
                <p className="mt-2 text-sm text-text-muted">
                  Book a consultation to discuss your vision, outfit, and
                  preferences.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                  <Button href="/booking" variant="primary" size="lg">
                    <Calendar className="h-4 w-4" />
                    Book Bridal Consultation
                  </Button>
                  {hasWhatsApp() && (
                    <Button
                      href={getWhatsAppLink(
                        "Hi, I would like to enquire about your bridal makeup services for my wedding."
                      )}
                      external
                      variant="whatsapp"
                      size="lg"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Enquire on WhatsApp
                    </Button>
                  )}
                </div>
              </div>
            </AnimatedCard>
          </div>
        </div>
      </section>

      <FAQSection />
      <FinalCTA />
    </>
  );
}
