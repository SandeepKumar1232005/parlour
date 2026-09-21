import type { Metadata } from "next";
import { AnimatedCard, Button } from "@/components/ui";
import { Heart, Sparkles } from "lucide-react";
import { business } from "@/config/business";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";

export const metadata: Metadata = {
  title: `About`,
  description: `Learn about ${business.name} — our story, values, and commitment to professional beauty care in ${business.address.city}.`,
};

export default function AboutPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="relative bg-charcoal pt-32 pb-20 text-center">
        <div className="relative mx-auto max-w-4xl px-4">
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.3em] text-champagne-soft">
            Our Story
          </span>
          <h1 className="font-display text-4xl font-light text-white sm:text-5xl md:text-6xl">
            About <em className="not-italic text-champagne">{business.name}</em>
          </h1>
          <div className="gold-divider mx-auto my-5" />
        </div>
      </section>

      {/* About Content */}
      <section className="section-padding bg-ivory">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-5">
            {/* Image Area */}
            <AnimatedCard className="lg:col-span-2">
              <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-cream">
                <div className="flex h-full items-center justify-center">
                  <Sparkles className="h-12 w-12 text-champagne/20" />
                </div>
              </div>
            </AnimatedCard>

            {/* Text Content */}
            <AnimatedCard delay={0.15} className="lg:col-span-3">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-champagne">
                  Who We Are
                </span>
                <h2 className="mt-3 font-display text-3xl font-semibold text-charcoal sm:text-4xl">
                  Professional Beauty Care
                </h2>
                <div className="my-5 h-px w-12 bg-champagne/40" />

                <div className="space-y-4 text-sm leading-relaxed text-text-body">
                  <p>
                    {business.name} is a women-only beauty studio in{" "}
                    {business.address.city}, dedicated to providing professional
                    hair, skin, and beauty services in a comfortable, private
                    environment.
                  </p>
                  <p>
                    We believe that beauty care is personal. Every treatment we
                    offer is tailored to your individual needs — whether it is a
                    simple haircut, a rejuvenating facial, or complete bridal
                    styling for your special day.
                  </p>
                  <p>
                    Our team is trained in modern techniques and uses
                    professional-grade products. We maintain strict hygiene
                    standards and ensure every visit is a relaxing, positive
                    experience.
                  </p>
                </div>

                {/* Values */}
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {[
                    {
                      icon: Heart,
                      title: "Personalised Attention",
                      desc: "Every client gets individual consultation and care.",
                    },
                    {
                      icon: Sparkles,
                      title: "Professional Standards",
                      desc: "Trained professionals, quality products, strict hygiene.",
                    },
                  ].map((value) => {
                    const Icon = value.icon;
                    return (
                      <div
                        key={value.title}
                        className="rounded-xl border border-border bg-cream/50 p-4"
                      >
                        <Icon className="h-5 w-5 text-champagne-dark" />
                        <h4 className="mt-2 font-display text-sm font-semibold text-charcoal">
                          {value.title}
                        </h4>
                        <p className="mt-1 text-xs text-text-muted">{value.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </AnimatedCard>
          </div>
        </div>
      </section>

      <ExperienceTimeline />
      <WhyChooseUs />
      <FinalCTA />
    </>
  );
}
