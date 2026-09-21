"use client";

import { ArrowRight } from "lucide-react";
import { InstagramIcon } from "@/components/ui/icons";
import { SectionHeader, Button } from "@/components/ui";
import { hasSocial, getInstagramLink } from "@/config/business";

export function InstagramFollow() {
  if (!hasSocial("instagram")) {
    return null;
  }

  return (
    <section className="section-padding bg-ivory">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-charcoal px-6 py-16 sm:px-12 sm:py-24 lg:px-20">
          {/* Background Decorative Elements */}
          <div className="absolute -left-1/4 -top-1/4 h-1/2 w-1/2 rounded-full bg-champagne/10 blur-[100px]" />
          <div className="absolute -bottom-1/4 -right-1/4 h-1/2 w-1/2 rounded-full bg-champagne/10 blur-[100px]" />

          <div className="relative z-10 mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-champagne-dark via-champagne to-champagne-soft shadow-lg">
              <InstagramIcon className="h-8 w-8 text-white" />
            </div>
            
            <h2 className="font-display text-3xl font-semibold tracking-wide text-white sm:text-4xl">
              Follow Our Work
            </h2>
            
            <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-white/70">
              See our latest beauty looks, transformations and salon updates. 
              Join our community on Instagram for daily inspiration.
            </p>

            <div className="mt-10 flex justify-center">
              <Button 
                href={getInstagramLink()}
                variant="primary"
                external
                className="group px-8 py-4 text-base font-semibold"
              >
                Follow us on Instagram
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
