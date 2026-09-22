"use client";

import { useState, Suspense, useEffect } from "react";
import { Calendar, CheckCircle, ArrowLeft, MessageCircle, Phone, WifiOff, RefreshCw } from "lucide-react";
import { Button, AnimatedCard } from "@/components/ui";
import { cn } from "@/lib/utils";
import { hasPhone, getPhoneLink } from "@/config/business";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { useSearchParams } from "next/navigation";
import { getEnabledCategories } from "@/config/services";

interface BookingFormData {
  name: string;
  phone: string;
  email: string;
  service: string;
  date: string;
  time: string;
  message: string;
}

const DRAFT_KEY = "parlour_booking_draft";

const timeSlots = [
  "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM",
  "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM",
  "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM",
  "6:00 PM", "6:30 PM", "7:00 PM",
];

function BookingForm() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [offlineError, setOfflineError] = useState<string | null>(null);

  const [formData, setFormData] = useState<BookingFormData>(() => {
    let initial: BookingFormData = {
      name: "",
      phone: "",
      email: "",
      service: "",
      date: "",
      time: "",
      message: "",
    };

    if (typeof window !== "undefined") {
      try {
        const saved = sessionStorage.getItem(DRAFT_KEY);
        if (saved) {
          initial = { ...initial, ...JSON.parse(saved) };
        }
      } catch {}
    }

    const serviceSlug = searchParams.get("service");
    if (serviceSlug) {
      const allCategories = getEnabledCategories();
      for (const category of allCategories) {
        const service = category.services.find((s) => s.slug === serviceSlug);
        if (service) {
          initial.service = service.name;
          break;
        }
      }
    }

    return initial;
  });

  // Save non-sensitive draft on change
  useEffect(() => {
    try {
      sessionStorage.setItem(DRAFT_KEY, JSON.stringify(formData));
    } catch {}
  }, [formData]);

  const updateField = (field: keyof BookingFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    // Check internet connectivity
    if (typeof navigator !== "undefined" && !navigator.onLine) {
      setOfflineError("You're currently offline. Your request has not been submitted.");
      return;
    }

    setOfflineError(null);
    setSubmitted(true);
    try {
      sessionStorage.removeItem(DRAFT_KEY);
    } catch {}
  };

  const today = new Date().toISOString().split("T")[0];

  if (submitted) {
    return (
      <>
        <section className="relative bg-charcoal pt-32 pb-20 text-center">
          <div className="relative mx-auto max-w-4xl px-4">
            <h1 className="font-display text-4xl font-light text-white sm:text-5xl">
              Request <em className="not-italic text-champagne">Received</em>
            </h1>
          </div>
        </section>

        <section className="section-padding bg-ivory">
          <div className="mx-auto max-w-lg px-4 text-center">
            <AnimatedCard>
              <div className="rounded-2xl border border-border bg-white p-8">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-whatsapp/10">
                  <CheckCircle className="h-8 w-8 text-whatsapp" />
                </div>
                <h2 className="font-display text-2xl font-semibold text-charcoal">
                  Appointment Request Received
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-text-muted">
                  Our team will contact you to confirm availability for your
                  preferred date and time. This is{" "}
                  <strong>not a confirmed booking</strong> — we will reach out
                  shortly.
                </p>

                {/* Summary */}
                <div className="mt-6 rounded-xl bg-cream p-4 text-left text-sm text-text-body">
                  {formData.service && <p><strong>Service:</strong> {formData.service}</p>}
                  {formData.date && <p><strong>Preferred Date:</strong> {formData.date}</p>}
                  {formData.time && <p><strong>Preferred Time:</strong> {formData.time}</p>}
                </div>

                <div className="mt-6 flex flex-col gap-3">
                  <WhatsAppButton
                    variant="booking"
                    message={`Hi, I submitted an appointment request for ${formData.service || "a service"}${formData.date ? ` on ${formData.date}` : ""}. I would like to confirm availability.`}
                    className="w-full"
                  >
                    Continue on WhatsApp
                  </WhatsAppButton>
                  {hasPhone() && (
                    <Button href={getPhoneLink()} variant="outline" className="w-full">
                      <Phone className="h-4 w-4" />
                      Call to Confirm
                    </Button>
                  )}
                  <Button href="/" variant="ghost" className="w-full">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Home
                  </Button>
                </div>
              </div>
            </AnimatedCard>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      {/* Page Hero */}
      <section className="relative bg-charcoal pt-32 pb-20 text-center">
        <div className="relative mx-auto max-w-4xl px-4">
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.3em] text-champagne-soft">
            Appointments
          </span>
          <h1 className="font-display text-4xl font-light text-white sm:text-5xl md:text-6xl">
            Book an <em className="not-italic text-champagne">Appointment</em>
          </h1>
          <div className="gold-divider mx-auto my-5" />
          <p className="mx-auto max-w-md text-base text-white/50">
            Request your preferred time and our team will confirm availability.
          </p>
        </div>
      </section>

      {/* Booking Form */}
      <section className="section-padding bg-ivory">
        <div className="mx-auto max-w-2xl px-4">
          {/* Progress */}
          <div className="mb-10 flex items-center justify-center gap-3">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-3">
                <button
                  onClick={() => s < step && setStep(s)}
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition-all",
                    step >= s
                      ? "bg-charcoal text-ivory"
                      : "border border-border bg-white text-text-muted"
                  )}
                  disabled={s > step}
                >
                  {s}
                </button>
                {s < 3 && (
                  <div className={cn(
                    "h-px w-12 transition-all sm:w-20",
                    step > s ? "bg-charcoal" : "bg-border"
                  )} />
                )}
              </div>
            ))}
          </div>

          <AnimatedCard>
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8"
            >
              {/* Step 1: Service & Date */}
              {step === 1 && (
                <div className="space-y-5">
                  <h2 className="font-display text-xl font-semibold text-charcoal">
                    Select Service & Date
                  </h2>

                  <div>
                    <label htmlFor="service" className="mb-1.5 block text-sm font-medium text-text-body">
                      Service
                    </label>
                    <select
                      id="service"
                      value={formData.service}
                      onChange={(e) => updateField("service", e.target.value)}
                      className="w-full rounded-xl border border-border bg-ivory px-4 py-3 text-sm text-text-body transition-colors focus:border-champagne focus:outline-none"
                    >
                      <option value="">Select a service</option>
                      <option value="Hair Services">Hair Services</option>
                      <option value="Skin & Facials">Skin & Facials</option>
                      <option value="Bridal Makeup">Bridal Makeup</option>
                      <option value="Makeup">Makeup</option>
                      <option value="Nails">Nails</option>
                      <option value="Spa & Wellness">Spa & Wellness</option>
                      <option value="Waxing & Threading">Waxing & Threading</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="date" className="mb-1.5 block text-sm font-medium text-text-body">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      id="date"
                      min={today}
                      value={formData.date}
                      onChange={(e) => updateField("date", e.target.value)}
                      className="w-full rounded-xl border border-border bg-ivory px-4 py-3 text-sm text-text-body transition-colors focus:border-champagne focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="time" className="mb-1.5 block text-sm font-medium text-text-body">
                      Preferred Time
                    </label>
                    <select
                      id="time"
                      value={formData.time}
                      onChange={(e) => updateField("time", e.target.value)}
                      className="w-full rounded-xl border border-border bg-ivory px-4 py-3 text-sm text-text-body transition-colors focus:border-champagne focus:outline-none"
                    >
                      <option value="">Select a time</option>
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>

                  <Button
                    onClick={() => setStep(2)}
                    variant="primary"
                    className="w-full"
                    type="button"
                  >
                    Continue
                  </Button>
                </div>
              )}

              {/* Step 2: Personal Details */}
              {step === 2 && (
                <div className="space-y-5">
                  <h2 className="font-display text-xl font-semibold text-charcoal">
                    Your Details
                  </h2>

                  <div>
                    <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-text-body">
                      Name <span className="text-error">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      placeholder="Your name"
                      className="w-full rounded-xl border border-border bg-ivory px-4 py-3 text-sm text-text-body placeholder:text-text-light transition-colors focus:border-champagne focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone-input" className="mb-1.5 block text-sm font-medium text-text-body">
                      Mobile Number <span className="text-error">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone-input"
                      required
                      value={formData.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      placeholder="Your mobile number"
                      className="w-full rounded-xl border border-border bg-ivory px-4 py-3 text-sm text-text-body placeholder:text-text-light transition-colors focus:border-champagne focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="email-input" className="mb-1.5 block text-sm font-medium text-text-body">
                      Email <span className="text-xs text-text-light">(optional)</span>
                    </label>
                    <input
                      type="email"
                      id="email-input"
                      value={formData.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      placeholder="Your email address"
                      className="w-full rounded-xl border border-border bg-ivory px-4 py-3 text-sm text-text-body placeholder:text-text-light transition-colors focus:border-champagne focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-text-body">
                      Message <span className="text-xs text-text-light">(optional)</span>
                    </label>
                    <textarea
                      id="message"
                      rows={3}
                      value={formData.message}
                      onChange={(e) => updateField("message", e.target.value)}
                      placeholder="Any special requests or notes"
                      className="w-full resize-none rounded-xl border border-border bg-ivory px-4 py-3 text-sm text-text-body placeholder:text-text-light transition-colors focus:border-champagne focus:outline-none"
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={() => setStep(1)}
                      variant="ghost"
                      type="button"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Back
                    </Button>
                    <Button
                      onClick={() => setStep(3)}
                      variant="primary"
                      className="flex-1"
                      type="button"
                      disabled={!formData.name || !formData.phone}
                    >
                      Review
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Review & Submit */}
              {step === 3 && (
                <div className="space-y-5">
                  <h2 className="font-display text-xl font-semibold text-charcoal">
                    Review & Submit
                  </h2>

                  <div className="space-y-3 rounded-xl bg-cream p-5 text-sm">
                    <div className="flex justify-between">
                      <span className="text-text-muted">Service</span>
                      <span className="font-medium text-charcoal">
                        {formData.service || "Not selected"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-muted">Date</span>
                      <span className="font-medium text-charcoal">
                        {formData.date || "Not selected"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-muted">Time</span>
                      <span className="font-medium text-charcoal">
                        {formData.time || "Not selected"}
                      </span>
                    </div>
                    <hr className="border-border" />
                    <div className="flex justify-between">
                      <span className="text-text-muted">Name</span>
                      <span className="font-medium text-charcoal">{formData.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-muted">Phone</span>
                      <span className="font-medium text-charcoal">{formData.phone}</span>
                    </div>
                    {formData.email && (
                      <div className="flex justify-between">
                        <span className="text-text-muted">Email</span>
                        <span className="font-medium text-charcoal">{formData.email}</span>
                      </div>
                    )}
                    {formData.message && (
                      <div>
                        <span className="text-text-muted">Message:</span>
                        <p className="mt-1 text-charcoal">{formData.message}</p>
                      </div>
                    )}
                  </div>

                  <p className="text-xs text-text-muted">
                    By submitting, you are requesting an appointment. Our team
                    will contact you to confirm availability. This is not a
                    confirmed booking.
                  </p>

                  {offlineError && (
                    <div className="rounded-xl border border-amber-200 bg-amber-50/90 p-4 text-left">
                      <div className="flex items-center gap-2 text-amber-800 font-semibold text-sm">
                        <WifiOff className="h-4 w-4" />
                        <span>Offline</span>
                      </div>
                      <p className="mt-1 text-xs text-amber-700 leading-relaxed">
                        {offlineError}
                      </p>
                      <button
                        type="button"
                        onClick={() => handleSubmit()}
                        className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-amber-200 px-3 py-1.5 text-xs font-semibold text-amber-900 hover:bg-amber-300 transition-colors"
                      >
                        <RefreshCw className="h-3.5 w-3.5" />
                        Try Again
                      </button>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <Button onClick={() => setStep(2)} variant="ghost" type="button">
                      <ArrowLeft className="h-4 w-4" />
                      Back
                    </Button>
                    <Button type="submit" variant="primary" className="flex-1">
                      <Calendar className="h-4 w-4" />
                      Submit Request
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </AnimatedCard>
        </div>
      </section>
    </>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-ivory text-charcoal">Loading booking form...</div>}>
      <BookingForm />
    </Suspense>
  );
}
