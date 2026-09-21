"use client";

import { ChevronDown } from "lucide-react";
import { SectionHeader, AnimatedCard } from "@/components/ui";
import { faqs, hasFAQs } from "@/config/content";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function FAQSection() {
  const [openId, setOpenId] = useState<string | null>(null);

  if (!hasFAQs()) return null;

  return (
    <section className="section-padding bg-cream" id="faq">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Questions"
          title="Frequently Asked"
          titleAccent="Questions"
          description="Find answers to common questions about our services and booking."
        />

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openId === faq.id;
            return (
              <AnimatedCard key={faq.id} delay={index * 0.05}>
                <div
                  className={cn(
                    "overflow-hidden rounded-xl border transition-all duration-300",
                    isOpen
                      ? "border-champagne/25 bg-white shadow-sm"
                      : "border-border bg-white hover:border-champagne/15"
                  )}
                >
                  <button
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${faq.id}`}
                  >
                    <span className="font-display text-base font-semibold text-charcoal sm:text-lg">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 flex-shrink-0 text-champagne transition-transform duration-300",
                        isOpen && "rotate-180"
                      )}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        id={`faq-answer-${faq.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <div className="border-t border-border px-6 pb-5 pt-4">
                          <p className="text-sm leading-relaxed text-text-muted">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </AnimatedCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
