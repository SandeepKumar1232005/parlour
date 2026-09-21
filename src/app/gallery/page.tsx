import type { Metadata } from "next";
import { AnimatedCard, Button } from "@/components/ui";
import { ImageIcon } from "lucide-react";
import { gallery, hasGallery } from "@/config/content";
import { business } from "@/config/business";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: `Gallery`,
  description: `Browse our portfolio of hair, bridal, makeup, and beauty transformations. ${business.name}, ${business.address.city}.`,
};

export default function GalleryPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="relative bg-charcoal pt-32 pb-20 text-center">
        <div className="relative mx-auto max-w-4xl px-4">
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.3em] text-champagne-soft">
            Our Work
          </span>
          <h1 className="font-display text-4xl font-light text-white sm:text-5xl md:text-6xl">
            Beauty <em className="not-italic text-champagne">Gallery</em>
          </h1>
          <div className="gold-divider mx-auto my-5" />
          <p className="mx-auto max-w-md text-base text-white/50">
            A glimpse into the beauty experiences we create.
          </p>
        </div>
      </section>

      {/* Gallery Content */}
      <section className="section-padding bg-ivory">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {hasGallery() ? (
            /* Masonry Grid — shown when real images exist */
            <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
              {gallery.map((item, index) => (
                <AnimatedCard key={item.id} delay={index * 0.05}>
                  <div className="mb-5 overflow-hidden rounded-2xl border border-border bg-white">
                    <img
                      src={item.src}
                      alt={item.alt}
                      loading="lazy"
                      className="w-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    {item.caption && (
                      <div className="p-4">
                        <p className="text-xs font-medium uppercase tracking-wider text-champagne-dark">
                          {item.category}
                        </p>
                        <p className="mt-1 text-sm text-text-muted">
                          {item.caption}
                        </p>
                      </div>
                    )}
                  </div>
                </AnimatedCard>
              ))}
            </div>
          ) : (
            /* Empty State — shown when no real images available */
            <AnimatedCard>
              <div className="mx-auto max-w-md text-center py-20">
                <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-cream">
                  <ImageIcon className="h-8 w-8 text-champagne/40" />
                </div>
                <h3 className="font-display text-xl font-semibold text-charcoal">
                  Gallery Coming Soon
                </h3>
                <p className="mt-2 text-sm text-text-muted">
                  Our portfolio of work is being prepared. Visit us or follow us
                  on social media to see our latest looks.
                </p>
                <div className="mt-6">
                  <Button href="/contact" variant="outline">
                    Get in Touch
                  </Button>
                </div>
              </div>
            </AnimatedCard>
          )}
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
