import type { Metadata } from "next";
import { business } from "@/config/business";

export const metadata: Metadata = {
  title: "Terms & Conditions",
};

export default function TermsPage() {
  return (
    <>
      <section className="relative bg-charcoal pt-32 pb-16 text-center">
        <div className="relative mx-auto max-w-4xl px-4">
          <h1 className="font-display text-4xl font-light text-white">
            Terms & Conditions
          </h1>
          <div className="gold-divider mx-auto my-5" />
        </div>
      </section>

      <section className="section-padding bg-ivory">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="prose prose-sm max-w-none text-text-body">
            <h2 className="font-display text-xl font-semibold text-charcoal">
              Appointments
            </h2>
            <p>
              Appointment requests submitted through our website are requests,
              not confirmed bookings. Our team will contact you to confirm
              availability.
            </p>
            <p>
              We appreciate timely communication if you need to reschedule or
              cancel your appointment.
            </p>

            <h2 className="font-display text-xl font-semibold text-charcoal mt-8">
              Services & Pricing
            </h2>
            <p>
              Service details and pricing are subject to change. For the most
              current pricing, please contact us directly.
            </p>

            <h2 className="font-display text-xl font-semibold text-charcoal mt-8">
              Cancellation
            </h2>
            <p>
              Please inform us as early as possible if you need to cancel or
              reschedule your appointment, ideally a few hours before your
              scheduled time.
            </p>

            <h2 className="font-display text-xl font-semibold text-charcoal mt-8">
              Liability
            </h2>
            <p>
              While we take every precaution to ensure the safety and quality of
              our services, we are not liable for adverse reactions to products
              or treatments. Please inform us of any allergies or sensitivities
              before your appointment.
            </p>

            <h2 className="font-display text-xl font-semibold text-charcoal mt-8">
              Website Content
            </h2>
            <p>
              The content on this website is provided for informational purposes
              only. We strive to keep information accurate and up to date.
            </p>

            <h2 className="font-display text-xl font-semibold text-charcoal mt-8">
              Contact
            </h2>
            <p>
              If you have questions about these terms, please contact us through
              our website or visit us at our salon.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
