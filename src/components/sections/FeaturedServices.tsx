"use client";

import Link from "next/link";
import { Scissors, Sparkles, Crown, Palette, Hand, Flower2, Leaf, ArrowRight } from "lucide-react";
import { SectionHeader, AnimatedCard, Button } from "@/components/ui";
import { getEnabledCategories, hasServices } from "@/config/services";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ElementType> = {
  Scissors, Sparkles, Crown, Palette, Hand, Flower2, Leaf,
};

export function FeaturedServices() {
  const displayCategories = getEnabledCategories();
  
  if (displayCategories.length === 0) {
    return null; // Do not render fake services
  }

  return (
    <section className="section-padding bg-ivory" id="services">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="What We Offer"
          title="Our"
          titleAccent="Services"
          description="Discover beauty experiences crafted with care and professional expertise."
        />

        {/* Service Category Grid */}
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {displayCategories.map((category, index) => {
            const Icon = iconMap[category.icon] || Sparkles;
            const activeServicesCount = category.services.filter(s => s.enabled).length;

            return (
              <AnimatedCard key={category.id} delay={index * 0.08}>
                <Link
                  href={`/services/${category.slug}`}
                  className={cn(
                    "group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-white p-6 sm:p-7 transition-all duration-500",
                    "hover:border-champagne/20 hover:shadow-[0_8px_30px_rgba(201,169,110,0.08)]",
                    "hover:-translate-y-1 active:scale-[0.98]"
                  )}
                >
                  <div className="flex items-start justify-between">
                    {/* Icon */}
                    <div className="mb-4 sm:mb-5 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-cream transition-colors duration-500 group-hover:bg-champagne/10">
                      <Icon className="h-5 w-5 text-champagne-dark transition-transform duration-500 group-hover:scale-110" />
                    </div>
                    {/* Service Count (if available) */}
                    {activeServicesCount > 0 && (
                      <span className="rounded-full bg-cream px-2.5 py-1 text-xs font-medium text-text-muted">
                        {activeServicesCount} Services
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <h3 className="font-display text-lg sm:text-xl font-semibold text-charcoal">
                    {category.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted line-clamp-2">
                    {category.description}
                  </p>

                  {/* CTA */}
                  <div className="mt-5 flex items-center gap-1 text-sm font-medium text-champagne-dark transition-all duration-300 group-hover:gap-2">
                    <span>Explore Services</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>

                  {/* Hover accent line */}
                  <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-champagne to-champagne-soft transition-all duration-500 group-hover:w-full" />
                </Link>
              </AnimatedCard>
            );
          })}
        </div>

        {/* View All CTA */}
        {hasServices() && (
          <div className="mt-12 text-center">
            <Button href="/services" variant="outline">
              View All Services
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
