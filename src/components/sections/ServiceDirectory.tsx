"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Sparkles, Scissors, Crown, Palette, Hand, Flower2, Leaf, ArrowRight, MessageCircle, Calendar } from "lucide-react";
import { AnimatedCard, Button } from "@/components/ui";
import { getEnabledCategories, Service } from "@/config/services";
import { cn } from "@/lib/utils";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

const iconMap: Record<string, React.ElementType> = {
  Scissors, Sparkles, Crown, Palette, Hand, Flower2, Leaf,
};

const SEARCH_KEY = "parlour_services_search";
const CATEGORY_KEY = "parlour_services_category";

export function ServiceDirectory() {
  const [searchQuery, setSearchQuery] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        return sessionStorage.getItem(SEARCH_KEY) || "";
      } catch {}
    }
    return "";
  });

  const [activeCategory, setActiveCategory] = useState<string>(() => {
    if (typeof window !== "undefined") {
      try {
        return sessionStorage.getItem(CATEGORY_KEY) || "ALL";
      } catch {}
    }
    return "ALL";
  });

  // Save filter state on update
  useEffect(() => {
    try {
      if (searchQuery) {
        sessionStorage.setItem(SEARCH_KEY, searchQuery);
      } else {
        sessionStorage.removeItem(SEARCH_KEY);
      }
      if (activeCategory !== "ALL") {
        sessionStorage.setItem(CATEGORY_KEY, activeCategory);
      } else {
        sessionStorage.removeItem(CATEGORY_KEY);
      }
    } catch {}
  }, [searchQuery, activeCategory]);
  
  const allCategories = getEnabledCategories();
  
  // Extract all enabled services and attach their category slug/name for routing/display
  const allServices = useMemo(() => {
    const services: (Service & { categorySlug: string; categoryName: string })[] = [];
    allCategories.forEach(cat => {
      cat.services.forEach(svc => {
        if (svc.enabled) {
          services.push({ ...svc, categorySlug: cat.slug, categoryName: cat.name });
        }
      });
    });
    return services.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
  }, [allCategories]);

  // Filtering Logic
  const isFiltering = searchQuery.trim().length > 0 || activeCategory !== "ALL";

  const filteredServices = useMemo(() => {
    if (!isFiltering) return [];
    
    return allServices.filter(svc => {
      const matchesCategory = activeCategory === "ALL" || svc.categorySlug === activeCategory;
      if (!matchesCategory) return false;
      
      const query = searchQuery.toLowerCase().trim();
      if (!query) return true;
      
      return (
        svc.name.toLowerCase().includes(query) ||
        svc.description.toLowerCase().includes(query) ||
        svc.shortDescription.toLowerCase().includes(query) ||
        svc.categoryName.toLowerCase().includes(query)
      );
    });
  }, [allServices, searchQuery, activeCategory, isFiltering]);

  if (allCategories.length === 0) {
    return null;
  }

  return (
    <section className="section-padding bg-ivory" id="directory">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Search & Filter Header */}
        <div className="mb-12 flex flex-col items-center justify-between gap-6 md:flex-row">
          
          {/* Category Pills */}
          <div className="flex w-full flex-wrap gap-2 md:w-auto">
            <button
              onClick={() => setActiveCategory("ALL")}
              className={cn(
                "rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300",
                activeCategory === "ALL"
                  ? "bg-charcoal text-white shadow-md"
                  : "bg-white text-text-muted border border-border hover:border-champagne hover:text-charcoal"
              )}
            >
              All
            </button>
            {allCategories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.slug)}
                className={cn(
                  "rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300",
                  activeCategory === cat.slug
                    ? "bg-charcoal text-white shadow-md"
                    : "bg-white text-text-muted border border-border hover:border-champagne hover:text-charcoal"
                )}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72 lg:w-96">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <Search className="h-4 w-4 text-text-muted" />
            </div>
            <input
              type="text"
              className="w-full rounded-full border border-border bg-white py-3 pl-11 pr-4 text-sm text-charcoal outline-none transition-all focus:border-champagne focus:ring-1 focus:ring-champagne"
              placeholder="Search services, treatments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* DEFAULT STATE: SHOW CATEGORIES GRID */}
        {!isFiltering && (
          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {allCategories.map((category, index) => {
              const Icon = iconMap[category.icon] || Sparkles;
              const activeServicesCount = category.services.filter(s => s.enabled).length;

              return (
                <AnimatedCard key={category.id} delay={index * 0.05}>
                  <Link
                    href={`/services/${category.slug}`}
                    className={cn(
                      "group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-white transition-all duration-500",
                      "hover:border-champagne/20 hover:shadow-[0_8px_30px_rgba(201,169,110,0.08)]",
                      "hover:-translate-y-1 active:scale-[0.98]"
                    )}
                  >
                    {/* Category Image */}
                    {category.image && (
                      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/9" }}>
                        <Image
                          src={category.image}
                          alt={`${category.name} services`}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                        />
                        {/* Subtle gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                        {/* Service count badge on image */}
                        {activeServicesCount > 0 && (
                          <span className="absolute top-3 right-3 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-charcoal shadow-sm">
                            {activeServicesCount} Services
                          </span>
                        )}
                      </div>
                    )}

                    {/* Card Content */}
                    <div className="flex flex-1 flex-col p-6 sm:p-7">
                      <div className="flex items-start justify-between">
                        <div className="mb-3 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-cream transition-colors duration-500 group-hover:bg-champagne/10">
                          <Icon className="h-4.5 w-4.5 text-champagne-dark transition-transform duration-500 group-hover:scale-110" />
                        </div>
                        {/* Fallback count badge if no image */}
                        {!category.image && activeServicesCount > 0 && (
                          <span className="rounded-full bg-cream px-2.5 py-1 text-xs font-medium text-text-muted">
                            {activeServicesCount} Services
                          </span>
                        )}
                      </div>
                      <h3 className="font-display text-lg sm:text-xl font-semibold text-charcoal">
                        {category.name}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-text-muted line-clamp-2">
                        {category.description}
                      </p>
                      <div className="mt-5 flex items-center gap-1 text-sm font-medium text-champagne-dark transition-all duration-300 group-hover:gap-2">
                        <span>Explore Services</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </div>
                    </div>
                  </Link>
                </AnimatedCard>
              );
            })}
          </div>
        )}

        {/* FILTERED STATE: SHOW MATCHING SERVICES */}
        {isFiltering && (
          <div className="space-y-6">
            {filteredServices.length === 0 ? (
              <div className="py-20 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-cream">
                  <Search className="h-6 w-6 text-text-muted" />
                </div>
                <h3 className="font-display text-xl font-semibold text-charcoal">No services found</h3>
                <p className="mt-2 text-sm text-text-muted">We couldn&apos;t find any treatments matching your search criteria.</p>
                <button 
                  onClick={() => { setSearchQuery(""); setActiveCategory("ALL"); }}
                  className="mt-6 text-sm font-semibold text-champagne-dark hover:text-champagne transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2">
                {filteredServices.map((service, index) => (
                  <AnimatedCard key={service.id} delay={index * 0.05}>
                    <div className="flex h-full flex-col justify-between rounded-2xl border border-border bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                      <div>
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <span className="text-xs font-semibold uppercase tracking-wider text-champagne-dark mb-2 block">
                              {service.categoryName}
                            </span>
                            <h3 className="font-display text-xl font-semibold text-charcoal">
                              {service.name}
                            </h3>
                          </div>
                          {(service.price || service.duration) && (
                            <div className="text-right shrink-0">
                              {service.price && <div className="text-lg font-semibold text-charcoal">{service.price}</div>}
                              {service.duration && <div className="text-xs text-text-muted mt-1">{service.duration}</div>}
                            </div>
                          )}
                        </div>
                        <p className="mt-3 text-sm text-text-muted leading-relaxed line-clamp-3">
                          {service.shortDescription || service.description}
                        </p>
                      </div>
                      
                      <div className="mt-6 flex flex-col sm:flex-row gap-3 pt-6 border-t border-border/50">
                        <Button 
                          href={`/booking?service=${service.slug}`} 
                          variant="primary" 
                          className="flex-1 justify-center py-2"
                        >
                          <Calendar className="h-4 w-4 mr-2" />
                          Book
                        </Button>
                        <WhatsAppButton 
                          variant="service"
                          message={`Hi, I would like to enquire about the ${service.name} service.`}
                          className="flex-1 justify-center py-2"
                        />
                        <Button 
                          href={`/services/${service.categorySlug}/${service.slug}`} 
                          variant="outline" 
                          className="flex-1 justify-center py-2"
                        >
                          Details
                        </Button>
                      </div>
                    </div>
                  </AnimatedCard>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
}
