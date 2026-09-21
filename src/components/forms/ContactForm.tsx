"use client";

import { useState, useEffect } from "react";
import { Send, CheckCircle, WifiOff, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui";

const CONTACT_DRAFT_KEY = "parlour_contact_draft";

interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
}

export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>(() => {
    let initial: ContactFormData = {
      name: "",
      phone: "",
      email: "",
      subject: "",
      message: "",
    };
    if (typeof window !== "undefined") {
      try {
        const saved = sessionStorage.getItem(CONTACT_DRAFT_KEY);
        if (saved) {
          initial = { ...initial, ...JSON.parse(saved) };
        }
      } catch {}
    }
    return initial;
  });

  const [submitted, setSubmitted] = useState(false);
  const [offlineError, setOfflineError] = useState<string | null>(null);

  // Persist draft on changes
  useEffect(() => {
    try {
      sessionStorage.setItem(CONTACT_DRAFT_KEY, JSON.stringify(formData));
    } catch {}
  }, [formData]);

  const updateField = (field: keyof ContactFormData, value: string) => {
    setFormData((prev: ContactFormData) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (typeof navigator !== "undefined" && !navigator.onLine) {
      setOfflineError("You're currently offline. Your message has not been sent.");
      return;
    }

    setOfflineError(null);
    setSubmitted(true);
    try {
      sessionStorage.removeItem(CONTACT_DRAFT_KEY);
    } catch {}
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-border bg-white p-8 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
          <CheckCircle className="h-7 w-7" />
        </div>
        <h3 className="font-display text-2xl font-semibold text-charcoal">
          Message Sent
        </h3>
        <p className="mt-2 text-sm text-text-muted max-w-sm mx-auto leading-relaxed">
          Thank you for reaching out! We have received your message and our team will get back to you shortly.
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setFormData({ name: "", phone: "", email: "", subject: "", message: "" });
          }}
          className="mt-6 inline-flex items-center text-xs font-semibold uppercase tracking-wider text-champagne-dark hover:underline"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8">
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
              value={formData.name}
              onChange={(e) => updateField("name", e.target.value)}
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
              value={formData.phone}
              onChange={(e) => updateField("phone", e.target.value)}
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
            value={formData.email}
            onChange={(e) => updateField("email", e.target.value)}
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
            value={formData.subject}
            onChange={(e) => updateField("subject", e.target.value)}
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
            value={formData.message}
            onChange={(e) => updateField("message", e.target.value)}
            placeholder="How can we help you?"
            className="w-full resize-none rounded-xl border border-border bg-ivory px-4 py-3 text-sm text-text-body placeholder:text-text-light transition-colors focus:border-champagne focus:outline-none"
          />
        </div>

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

        <Button type="submit" variant="primary" className="w-full min-h-[44px]">
          <Send className="h-4 w-4" />
          Send Message
        </Button>
      </div>
    </form>
  );
}
