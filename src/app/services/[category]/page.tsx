import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MessageCircle, Calendar } from "lucide-react";
import { business } from "@/config/business";
import { getCategoryBySlug } from "@/config/services";
import { AnimatedCard, Button } from "@/components/ui";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);
  
  if (!category) {
    return {
      title: `Service Not Found | ${business.name || 'Beauty Parlour'}`,
    };
  }

  return {
    title: `${category.name} Services | ${business.name || 'Beauty Parlour'}`,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categorySlug } = await params;
  
  const category = getCategoryBySlug(categorySlug);

  if (!category) {
    notFound();
  }

  const activeServices = category.services.filter((s) => s.enabled);
  
  // Sort services if sortOrder exists
  activeServices.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));

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
              <li className="text-champagne" aria-current="page">{category.name}</li>
            </ol>
          </nav>
          
          <h1 className="font-display text-4xl font-light text-white sm:text-5xl md:text-6xl">
            {category.name}
          </h1>
          <div className="gold-divider mx-auto my-5" />
          <p className="mx-auto max-w-lg text-base text-white/60 leading-relaxed">
            {category.description}
          </p>
        </div>
      </section>

      <section className="section-padding bg-ivory min-h-[50vh]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          
          {activeServices.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-text-muted">No services are currently available in this category.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {activeServices.map((service, index) => (
                <AnimatedCard key={service.id} delay={index * 0.1}>
                  <div className="flex flex-col rounded-2xl border border-border bg-white shadow-sm overflow-hidden sm:flex-row">
                    <div className="flex-1 p-6 sm:p-8">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div>
                          <h2 className="font-display text-2xl font-semibold text-charcoal">
                            {service.name}
                          </h2>
                          <p className="mt-2 text-sm text-text-muted leading-relaxed">
                            {service.description || service.shortDescription}
                          </p>
                        </div>
                        
                        {(service.price || service.duration) && (
                          <div className="flex flex-row sm:flex-col gap-4 sm:gap-2 shrink-0 border-t sm:border-t-0 sm:border-l border-border pt-4 sm:pt-0 sm:pl-6">
                            {service.price && (
                              <div>
                                {service.priceNote && <span className="block text-xs text-text-light">{service.priceNote}</span>}
                                <span className="text-lg font-semibold text-charcoal">{service.price}</span>
                              </div>
                            )}
                            {service.duration && (
                              <div>
                                <span className="block text-xs text-text-light">Duration</span>
                                <span className="text-sm font-medium text-text-muted">{service.duration}</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      
                      <div className="mt-8 flex flex-col sm:flex-row gap-3">
                        <Button 
                          href={`/booking?service=${service.slug}`} 
                          variant="primary" 
                          className="flex-1 sm:flex-none justify-center"
                        >
                          <Calendar className="h-4 w-4 mr-2" />
                          Book
                        </Button>
                        <WhatsAppButton 
                          variant="service"
                          message={`Hi, I would like to enquire about the ${service.name} service.`}
                          className="flex-1 sm:flex-none justify-center"
                        />
                        <Button 
                          href={`/services/${category.slug}/${service.slug}`} 
                          variant="ghost" 
                          className="flex-1 sm:flex-none justify-center"
                        >
                          Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </AnimatedCard>
              ))}
            </div>
          )}

          {/* Need help choosing CTA */}
          <div className="mt-16 text-center border-t border-border pt-12">
            <h3 className="font-display text-xl font-semibold text-charcoal">Not sure which service is right for you?</h3>
            <p className="mt-2 text-sm text-text-muted mb-6">Our experts can help you choose the perfect {category.name.toLowerCase()} treatment.</p>
            <WhatsAppButton 
              variant="default"
              message={`Hi, I would like some help choosing a ${category.name} service.`}
            >
              Chat with us on WhatsApp
            </WhatsAppButton>
          </div>
          
        </div>
      </section>
    </>
  );
}
