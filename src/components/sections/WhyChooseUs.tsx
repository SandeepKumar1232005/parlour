"use client";

import { SectionHeader, AnimatedCard } from "@/components/ui";
import { Award, Gem, Heart, ShieldCheck, Sparkles, Users } from "lucide-react";

const reasons = [
  {
    icon: Award,
    title: "Certified Professionals",
    description:
      "Our team is trained and certified in the latest beauty techniques and trends.",
  },
  {
    icon: Gem,
    title: "Premium Products",
    description:
      "We use carefully selected, professional-grade products that are safe and effective.",
  },
  {
    icon: Heart,
    title: "Personalised Care",
    description:
      "Every treatment is tailored to your unique skin type, hair texture, and preferences.",
  },
  {
    icon: ShieldCheck,
    title: "Hygienic Standards",
    description:
      "Strict sanitisation protocols ensure a clean, safe, and comfortable environment.",
  },
  {
    icon: Sparkles,
    title: "Comfortable Ambience",
    description:
      "A welcoming, private space designed to make every visit a relaxing experience.",
  },
  {
    icon: Users,
    title: "Aftercare Support",
    description:
      "We provide expert guidance to help you maintain results long after your visit.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="section-padding bg-ivory" id="why-us">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Why Us"
          title="Why Choose"
          titleAccent="Us?"
          description="We go beyond beauty treatments — we create experiences built on trust and expertise."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <AnimatedCard key={reason.title} delay={index * 0.08}>
                <div className="group rounded-2xl border border-border bg-white p-7 transition-all duration-500 hover:border-champagne/20 hover:shadow-[0_8px_30px_rgba(201,169,110,0.06)]">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-cream transition-colors duration-300 group-hover:bg-champagne/10">
                    <Icon className="h-5 w-5 text-champagne-dark" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-charcoal">
                    {reason.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">
                    {reason.description}
                  </p>
                </div>
              </AnimatedCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
