import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MessageCircle, Calendar, Clock, Banknote, ArrowLeft, CheckCircle2 } from "lucide-react";
import { business } from "@/config/business";
import { getCategoryBySlug } from "@/config/services";
import { AnimatedCard, Button } from "@/components/ui";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

interface ServicePageProps {
  params: Promise<{ category: string; service: string }>;
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { category: categorySlug, service: serviceSlug } = await params;
  
  const category = getCategoryBySlug(categorySlug);
  const service = category?.services.find((s) => s.slug === serviceSlug && s.enabled);
  
  if (!category || !service) {
    return {
      title: `Service Not Found | ${business.name || 'Beauty Parlour'}`,
    };
  }

  return {
    title: `${service.name} | ${category.name} | ${business.name || 'Beauty Parlour'}`,
    description: service.shortDescription || service.description,
  };
}

export default async function ServiceDetailsPage({ params }: ServicePageProps) {
  const { category: categorySlug, service: serviceSlug } = await params;
  
  const category = getCategoryBySlug(categorySlug);
  const service = category?.services.find((s) => s.slug === serviceSlug && s.enabled);

  if (!category || !service) {
    notFound();
  }

  return (
    <>
      <section className="relative bg-charcoal pt-32 pb-20 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-soft to-charcoal" />
        <div className="relative mx-auto max-w-4xl px-4">
          <nav className="mb-6 flex justify-center" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-champagne-soft/70">
              <li>
                <Link href="/" className="hover:text-champagne transition-colors">Home</Link>
              </li>
              <li><span>/</span></li>
              <li>
                <Link href="/services" className="hover:text-champagne transition-colors">Services</Link>
              </li>
              <li><span>/</span></li>
              <li>
                <Link href={`/services/${category.slug}`} className="hover:text-champagne transition-colors">{category.name}</Link>
              </li>
              <li><span>/</span></li>
              <li className="text-champagne" aria-current="page">{service.name}</li>
            </ol>
          </nav>
          
          <h1 className="font-display text-4xl font-light text-white sm:text-5xl md:text-6xl">
            {service.name}
          </h1>
          <div className="gold-divider mx-auto my-5" />
          <p className="mx-auto max-w-xl text-base text-white/60 leading-relaxed">
            {service.shortDescription}
          </p>
        </div>
      </section>

      <section className="section-padding bg-ivory">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-3">
            
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* About */}
              <AnimatedCard>
                <div className="rounded-2xl border border-border bg-white p-6 sm:p-8 shadow-sm">
                  <h2 className="font-display text-2xl font-semibold text-charcoal mb-4">About this service</h2>
                  <p className="text-text-body leading-relaxed whitespace-pre-wrap">
                    {service.description}
                  </p>
                </div>
              </AnimatedCard>

              {/* Benefits */}
              {service.benefits && service.benefits.length > 0 && (
                <AnimatedCard delay={0.1}>
                  <div className="rounded-2xl border border-border bg-white p-6 sm:p-8 shadow-sm">
                    <h2 className="font-display text-2xl font-semibold text-charcoal mb-5">Benefits</h2>
                    <ul className="space-y-3">
                      {service.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-champagne shrink-0 mt-0.5 mr-3" />
                          <span className="text-text-body">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </AnimatedCard>
              )}

              {/* What to expect / Preparation */}
              {(service.preparation?.length > 0 || service.aftercare?.length > 0) && (
                <div className="grid sm:grid-cols-2 gap-6">
                  {service.preparation?.length > 0 && (
                    <AnimatedCard delay={0.15}>
                      <div className="rounded-2xl border border-border bg-cream p-6 h-full">
                        <h3 className="font-display text-xl font-semibold text-charcoal mb-4">Preparation</h3>
                        <ul className="space-y-2 text-sm text-text-muted">
                          {service.preparation.map((item, i) => (
                            <li key={i} className="flex items-start">
                              <span className="text-champagne mr-2">•</span> {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </AnimatedCard>
                  )}
                  {service.aftercare?.length > 0 && (
                    <AnimatedCard delay={0.2}>
                      <div className="rounded-2xl border border-border bg-cream p-6 h-full">
                        <h3 className="font-display text-xl font-semibold text-charcoal mb-4">Aftercare</h3>
                        <ul className="space-y-2 text-sm text-text-muted">
                          {service.aftercare.map((item, i) => (
                            <li key={i} className="flex items-start">
                              <span className="text-champagne mr-2">•</span> {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </AnimatedCard>
                  )}
                </div>
              )}
              
              {/* FAQs */}
              {service.faqs && service.faqs.length > 0 && (
                <AnimatedCard delay={0.25}>
                  <h2 className="font-display text-2xl font-semibold text-charcoal mb-6 mt-4">Frequently Asked Questions</h2>
                  <div className="space-y-4">
                    {service.faqs.map((faq, i) => (
                      <div key={i} className="rounded-xl border border-border bg-white p-5">
                        <h4 className="font-semibold text-charcoal">{faq.question}</h4>
                        <p className="mt-2 text-sm text-text-muted">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </AnimatedCard>
              )}
            </div>
            
            {/* Sidebar / CTA */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <AnimatedCard delay={0.1}>
                  <div className="rounded-2xl border border-champagne/20 bg-white p-6 shadow-[0_8px_30px_rgba(201,169,110,0.06)]">
                    
                    {/* Price & Duration */}
                    <div className="space-y-4 mb-6">
                      {service.price && (
                        <div className="flex items-start space-x-3">
                          <Banknote className="h-5 w-5 text-champagne-dark mt-0.5" />
                          <div>
                            {service.priceNote && <span className="block text-xs text-text-light uppercase tracking-wider">{service.priceNote}</span>}
                            <span className="text-xl font-semibold text-charcoal">{service.price}</span>
                          </div>
                        </div>
                      )}
                      
                      {service.duration && (
                        <div className="flex items-start space-x-3">
                          <Clock className="h-5 w-5 text-champagne-dark mt-0.5" />
                          <div>
                            <span className="block text-xs text-text-light uppercase tracking-wider">Duration</span>
                            <span className="font-medium text-charcoal">{service.duration}</span>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <hr className="border-border mb-6" />
                    
                    <div className="space-y-3">
                      <Button href={`/booking?service=${service.slug}`} variant="primary" className="w-full justify-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        Book Appointment
                      </Button>
                      <WhatsAppButton 
                        variant="service"
                        message={`Hi, I would like to enquire about the ${service.name} service.`}
                        className="w-full justify-center"
                      >
                        WhatsApp Enquiry
                      </WhatsAppButton>
                    </div>
                    
                    <div className="mt-6 text-center">
                      <Link href={`/services/${category.slug}`} className="inline-flex items-center text-xs font-medium text-text-muted hover:text-champagne transition-colors">
                        <ArrowLeft className="h-3 w-3 mr-1" />
                        Back to {category.name}
                      </Link>
                    </div>
                  </div>
                </AnimatedCard>
              </div>
            </div>
            
          </div>
        </div>
      </section>
    </>
  );
}
