"use client";

import { SectionHeader, AnimatedCard } from "@/components/ui";
import { MessageSquare, UserCheck, Gem, HeartPulse } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Consultation",
    description: "Share your style preferences and concerns with our experts.",
    icon: MessageSquare,
  },
  {
    number: "02",
    title: "Personalised Plan",
    description: "We recommend treatments tailored to your unique needs.",
    icon: UserCheck,
  },
  {
    number: "03",
    title: "Professional Treatment",
    description: "Relax while our certified professionals work their craft.",
    icon: Gem,
  },
  {
    number: "04",
    title: "Aftercare Guidance",
    description: "Leave with expert tips to maintain your beautiful results.",
    icon: HeartPulse,
  },
];

export function ExperienceTimeline() {
  return (
    <section className="section-padding bg-cream" id="experience">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Your Journey"
          title="The"
          titleAccent="Experience"
          description="Every visit is designed to be a pampering, professional, and personalised experience."
        />

        {/* Timeline Grid */}
        <div className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Connecting line — desktop only */}
          <div className="absolute top-[3.25rem] left-[calc(12.5%+24px)] right-[calc(12.5%+24px)] hidden h-px bg-gradient-to-r from-transparent via-champagne/30 to-transparent lg:block" />

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <AnimatedCard key={step.number} delay={index * 0.1}>
                <div className="relative flex flex-col items-center text-center">
                  {/* Step Number + Icon */}
                  <div className="relative mb-6">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-champagne/20 bg-white shadow-sm">
                      <Icon className="h-6 w-6 text-champagne-dark" />
                    </div>
                    <span className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-charcoal text-xs font-bold text-ivory">
                      {step.number}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="font-display text-lg font-semibold text-charcoal">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">
                    {step.description}
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
