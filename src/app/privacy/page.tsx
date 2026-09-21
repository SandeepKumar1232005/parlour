import type { Metadata } from "next";
import { business } from "@/config/business";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <>
      <section className="relative bg-charcoal pt-32 pb-16 text-center">
        <div className="relative mx-auto max-w-4xl px-4">
          <h1 className="font-display text-4xl font-light text-white">
            Privacy Policy
          </h1>
          <div className="gold-divider mx-auto my-5" />
        </div>
      </section>

      <section className="section-padding bg-ivory">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="prose prose-sm max-w-none text-text-body">
            <h2 className="font-display text-xl font-semibold text-charcoal">
              Information We Collect
            </h2>
            <p>
              When you book an appointment or contact us through our website, we
              collect personal information such as your name, phone number, and
              email address. This information is used solely to process your
              appointment request and communicate with you.
            </p>

            <h2 className="font-display text-xl font-semibold text-charcoal mt-8">
              How We Use Your Information
            </h2>
            <p>We use the information you provide to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Process and confirm your appointment requests</li>
              <li>Communicate with you about our services</li>
              <li>Improve our website and services</li>
              <li>Send relevant updates with your consent</li>
            </ul>

            <h2 className="font-display text-xl font-semibold text-charcoal mt-8">
              Data Security
            </h2>
            <p>
              We take reasonable measures to protect the personal information you
              provide. However, no method of transmission over the internet is
              completely secure.
            </p>

            <h2 className="font-display text-xl font-semibold text-charcoal mt-8">
              Third-Party Services
            </h2>
            <p>
              Our website may use third-party services for analytics and
              functionality. These services have their own privacy policies.
            </p>

            <h2 className="font-display text-xl font-semibold text-charcoal mt-8">
              Contact
            </h2>
            <p>
              If you have questions about this privacy policy, please contact us
              through our website or visit us at our salon.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
