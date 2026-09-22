"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronDown, MessageCircle, Calendar } from "lucide-react";
import { Button } from "@/components/ui";
import { business, hasWhatsApp, getWhatsAppLink } from "@/config/business";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
      aria-label="Welcome"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-charcoal">
        {/* If no image config, this will act as fallback, but if we have images, we render them */}
        {business.hero?.backgroundImage ? (
          <>
            {/* Desktop Image */}
            <div className="hidden sm:block absolute inset-0">
              <Image
                src={business.hero.backgroundImage}
                alt=""
                fill
                priority
                className="object-cover object-[70%_center]"
                sizes="100vw"
                quality={90}
              />
            </div>
            {/* Mobile Image */}
            <div className="block sm:hidden absolute inset-0">
              <Image
                src={business.hero.mobileBackgroundImage || business.hero.backgroundImage}
                alt=""
                fill
                priority
                className="object-cover object-center"
                sizes="100vw"
                quality={90}
              />
            </div>
          </>
        ) : (
          /* Fallback Gradient if no image config */
          <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-charcoal-soft to-charcoal-muted" />
        )}

        {/* Dark Overlays for text readability (only show if image exists) */}
        {business.hero?.backgroundImage && (
          <>
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#141414]/90 via-[#141414]/60 to-[#141414]/30" />
          </>
        )}

        {/* Decorative subtle pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #C9A96E 1px, transparent 1px), radial-gradient(circle at 75% 75%, #C9A96E 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        {/* Bottom gradient fade */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ivory to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 py-32 text-center sm:px-6 lg:px-8">
        {/* Eyebrow */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6 inline-block text-xs font-semibold uppercase tracking-[0.35em] text-champagne-soft"
        >
          ✦ Premium Beauty Studio ✦
        </motion.span>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-5xl font-light leading-[1.1] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl"
        >
          {business.tagline || "Beauty, Styled Around You"}
        </motion.h1>

        {/* Gold divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="gold-divider mx-auto my-7"
        />

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mx-auto max-w-xl text-base leading-relaxed text-white/60 sm:text-lg md:text-xl"
        >
          {business.description ||
            "Professional hair, skin, bridal and beauty experiences crafted with care."}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <Button href="/booking" size="lg" variant="secondary">
            <Calendar className="h-4 w-4" />
            Book Appointment
          </Button>
          {hasWhatsApp() && (
            <Button
              href={getWhatsAppLink()}
              external
              size="lg"
              variant="whatsapp"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp Us
            </Button>
          )}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40"
        aria-hidden="true"
      >
        <span className="text-[0.65rem] font-medium uppercase tracking-[0.3em]">
          Scroll
        </span>
        <ChevronDown className="h-4 w-4 scroll-indicator" />
      </motion.div>
    </section>
  );
}
