"use client";

import { CheckCircle2, MessageCircle, Calendar } from "lucide-react";
import { SectionHeader, AnimatedCard, Button } from "@/components/ui";
import { getEnabledPackages, hasPackages } from "@/config/packages";
import { getWhatsAppLink } from "@/config/business";

export function ServicePackages() {
  const displayPackages = getEnabledPackages();

  if (!hasPackages()) {
    return null;
  }

  return (
    <section className="section-padding bg-cream" id="packages">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Special Offers"
          title="Curated"
          titleAccent="Packages"
          description="Enjoy premium beauty experiences bundled together for your convenience and value."
        />

        <div className="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-2">
          {displayPackages.map((pkg, index) => (
            <AnimatedCard key={pkg.id} delay={index * 0.1}>
              <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-champagne/20 bg-white shadow-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-xl">
                <div className="bg-gradient-to-br from-champagne/10 to-transparent p-8">
                  <h3 className="font-display text-2xl font-semibold text-charcoal">
                    {pkg.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-text-muted">
                    {pkg.description}
                  </p>
                  <div className="mt-6 flex items-end gap-3">
                    <span className="text-3xl font-semibold text-charcoal">
                      {pkg.price}
                    </span>
                    {pkg.originalPrice && (
                      <span className="mb-1 text-sm font-medium text-text-light line-through">
                        {pkg.originalPrice}
                      </span>
                    )}
                  </div>
                  {pkg.duration && (
                    <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-champagne-dark">
                      Duration: {pkg.duration}
                    </p>
                  )}
                </div>

                <div className="flex flex-1 flex-col justify-between p-8">
                  <ul className="space-y-4">
                    {pkg.includes.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle2 className="mr-3 h-5 w-5 shrink-0 text-champagne" />
                        <span className="text-sm font-medium text-text-body">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Button
                      href={`/booking?service=${pkg.slug}`}
                      variant="primary"
                      className="flex-1 justify-center"
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      Book Now
                    </Button>
                    <Button
                      href={getWhatsAppLink(`Hi, I would like to book the ${pkg.name}.`)}
                      variant="whatsapp"
                      external
                      className="flex-1 justify-center"
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      WhatsApp
                    </Button>
                  </div>
                </div>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  );
}
