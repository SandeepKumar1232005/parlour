import { Hero } from "@/components/sections/Hero";
import { FeaturedServices } from "@/components/sections/FeaturedServices";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { BridalSection } from "@/components/sections/BridalSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { LocationSection } from "@/components/sections/LocationSection";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { business } from "@/config/business";

export default function HomePage() {
  return (
    <>
      {/* Structured Data — LocalBusiness Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BeautySalon",
            name: business.name,
            url: business.seo.siteUrl || undefined,
            telephone: business.phone || undefined,
            address: business.address.full
              ? {
                "@type": "PostalAddress",
                streetAddress: business.address.street,
                addressLocality: business.address.city,
                addressRegion: business.address.state,
                postalCode: business.address.pin,
                addressCountry: "IN",
              }
              : undefined,
            geo:
              business.maps.lat && business.maps.lng
                ? {
                  "@type": "GeoCoordinates",
                  latitude: business.maps.lat,
                  longitude: business.maps.lng,
                }
                : undefined,
            areaServed: {
              "@type": "City",
              name: business.address.city,
            },
          }),
        }}
      />

      <Hero />
      <FeaturedServices />
      <ExperienceTimeline />
      <WhyChooseUs />
      <BridalSection />
      <LocationSection />
      <FAQSection />
      <FinalCTA />
    </>
  );
}
