import type { Metadata } from "next";
import { AnimatedCard, Button } from "@/components/ui";
import { LocationSection } from "@/components/sections/LocationSection";
import { MapPin, Phone, MessageCircle, Clock, Mail, Send } from "lucide-react";
import {
  business,
  hasPhone,
  hasWhatsApp,
  hasAddress,
  hasHours,
  getPhoneLink,
  getWhatsAppLink,
  getFullAddress,
} from "@/config/business";

export const metadata: Metadata = {
  title: `Contact`,
  description: `Get in touch with ${business.name}. Visit us, call, WhatsApp, or send us a message. Located in ${business.address.city}.`,
};

export default function ContactPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="relative bg-charcoal pt-32 pb-20 text-center">
        <div className="relative mx-auto max-w-4xl px-4">
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.3em] text-champagne-soft">
            Get in Touch
          </span>
          <h1 className="font-display text-4xl font-light text-white sm:text-5xl md:text-6xl">
            Contact <em className="not-italic text-champagne">Us</em>
          </h1>
          <div className="gold-divider mx-auto my-5" />
          <p className="mx-auto max-w-md text-base text-white/50">
            We would love to hear from you. Reach out to book, enquire, or visit.
          </p>
        </div>
      </section>

      {/* Contact Form + Info */}
      <section className="section-padding bg-ivory">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-5">
            {/* Contact Form */}
            <AnimatedCard className="lg:col-span-3">
              <form className="rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8">
                <h2 className="font-display text-2xl font-semibold text-charcoal">
                  Send Us a Message
                </h2>
                <p className="mt-1 text-sm text-text-muted">
                  Fill in the form and we will get back to you shortly.
                </p>

                <div className="mt-6 space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium text-text-body">
                        Name <span className="text-error">*</span>
                      </label>
                      <input
                        type="text"
                        id="contact-name"
                        required
                        placeholder="Your name"
                        className="w-full rounded-xl border border-border bg-ivory px-4 py-3 text-sm text-text-body placeholder:text-text-light transition-colors focus:border-champagne focus:outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-phone" className="mb-1.5 block text-sm font-medium text-text-body">
                        Phone <span className="text-error">*</span>
                      </label>
                      <input
                        type="tel"
                        id="contact-phone"
                        required
                        placeholder="Your mobile number"
                        className="w-full rounded-xl border border-border bg-ivory px-4 py-3 text-sm text-text-body placeholder:text-text-light transition-colors focus:border-champagne focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium text-text-body">
                      Email <span className="text-xs text-text-light">(optional)</span>
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      placeholder="Your email"
                      className="w-full rounded-xl border border-border bg-ivory px-4 py-3 text-sm text-text-body placeholder:text-text-light transition-colors focus:border-champagne focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-subject" className="mb-1.5 block text-sm font-medium text-text-body">
                      Subject
                    </label>
                    <select
                      id="contact-subject"
                      className="w-full rounded-xl border border-border bg-ivory px-4 py-3 text-sm text-text-body transition-colors focus:border-champagne focus:outline-none"
                    >
                      <option value="">Select a topic</option>
                      <option value="appointment">Appointment Enquiry</option>
                      <option value="bridal">Bridal Enquiry</option>
                      <option value="services">Service Information</option>
                      <option value="pricing">Pricing</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium text-text-body">
                      Message <span className="text-error">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      required
                      placeholder="How can we help you?"
                      className="w-full resize-none rounded-xl border border-border bg-ivory px-4 py-3 text-sm text-text-body placeholder:text-text-light transition-colors focus:border-champagne focus:outline-none"
                    />
                  </div>

                  <Button type="submit" variant="primary" className="w-full">
                    <Send className="h-4 w-4" />
                    Send Message
                  </Button>
                </div>
              </form>
            </AnimatedCard>

            {/* Contact Info Sidebar */}
            <AnimatedCard delay={0.15} className="lg:col-span-2">
              <div className="space-y-5">
                {hasAddress() && (
                  <div className="rounded-xl border border-border bg-white p-5">
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-champagne/10">
                        <MapPin className="h-4 w-4 text-champagne-dark" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-charcoal">
                          Visit Us
                        </h3>
                        <p className="mt-1 text-sm text-text-muted">
                          {getFullAddress()}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {hasPhone() && (
                  <div className="rounded-xl border border-border bg-white p-5">
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-champagne/10">
                        <Phone className="h-4 w-4 text-champagne-dark" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-charcoal">
                          Call Us
                        </h3>
                        <a
                          href={getPhoneLink()}
                          className="mt-1 text-sm text-text-muted hover:text-champagne-dark"
                        >
                          {business.phone}
                        </a>
                      </div>
                    </div>
                  </div>
                )}

                {hasWhatsApp() && (
                  <div className="rounded-xl border border-whatsapp/15 bg-whatsapp/5 p-5">
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-whatsapp/15">
                        <MessageCircle className="h-4 w-4 text-whatsapp-dark" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-charcoal">
                          WhatsApp
                        </h3>
                        <p className="mt-1 text-xs text-text-muted">
                          Quick responses on WhatsApp
                        </p>
                        <a
                          href={getWhatsAppLink()}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-whatsapp-dark hover:underline"
                        >
                          <MessageCircle className="h-3 w-3" />
                          Chat Now
                        </a>
                      </div>
                    </div>
                  </div>
                )}

                {hasHours() && (
                  <div className="rounded-xl border border-border bg-white p-5">
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-champagne/10">
                        <Clock className="h-4 w-4 text-champagne-dark" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-charcoal">
                          Opening Hours
                        </h3>
                        <div className="mt-1 space-y-0.5 text-sm text-text-muted">
                          <p>Mon–Sat: {business.hours.weekdays}</p>
                          {business.hours.sunday && <p>Sun: {business.hours.sunday}</p>}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {business.email && (
                  <div className="rounded-xl border border-border bg-white p-5">
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-champagne/10">
                        <Mail className="h-4 w-4 text-champagne-dark" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-charcoal">
                          Email
                        </h3>
                        <a
                          href={`mailto:${business.email}`}
                          className="mt-1 text-sm text-text-muted hover:text-champagne-dark"
                        >
                          {business.email}
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <LocationSection />
    </>
  );
}
