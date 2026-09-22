/**
 * SERVICE CONFIGURATION
 * =====================
 * Define all service categories and individual services.
 * Set `enabled: true` only for categories/services the salon actually offers.
 */

export interface Service {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  price: string; // e.g. "₹1,500" or "" for "Contact for pricing"
  priceNote: string; // e.g. "Starting from" or "Per session"
  duration: string; // e.g. "45 mins" or ""
  image: string; // Image path
  benefits: string[];
  suitableFor: string[];
  preparation: string[];
  aftercare: string[];
  faqs: { question: string; answer: string }[];
  enabled: boolean;
  sortOrder?: number;
  isDemo?: boolean;
}

export interface ServiceCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string; // Lucide icon name
  image: string;
  services: Service[];
  enabled: boolean;
  sortOrder: number;
  isDemo?: boolean;
}

export const serviceCategories: ServiceCategory[] = [
  {
    id: "hair",
    name: "Hair",
    slug: "hair",
    description: "Expert hair styling, cuts, colouring and advanced treatments using premium salon products.",
    icon: "Scissors",
    image: "/images/categories/hair.jpg",
    enabled: true,
    sortOrder: 1,
    services: [
      {
        id: "hair-1",
        name: "Hair Spa",
        slug: "hair-spa",
        shortDescription: "A relaxing hair and scalp treatment designed to refresh the hair and provide a nourishing salon experience.",
        description: "Experience ultimate relaxation with our deep nourishing Hair Spa. This treatment involves a gentle massage to stimulate the scalp, applying nutrient-rich creams to restore moisture and shine, followed by a warm steam treatment to lock in hydration.",
        price: "₹799",
        priceNote: "Starting from",
        duration: "60 minutes",
        image: "",
        benefits: ["Refreshes hair texture", "Deeply nourishes scalp", "Relaxing salon experience"],
        suitableFor: ["Dry hair", "Frizzy hair", "Scalp tension"],
        preparation: ["No special preparation required. Come with unwashed hair if preferred."],
        aftercare: ["Avoid washing hair for 24 hours.", "Use mild sulfate-free shampoo."],
        faqs: [
          { question: "How long does the effect last?", answer: "Usually 2-3 weeks depending on your hair care routine." }
        ],
        enabled: true,
        sortOrder: 1,
      },
      {
        id: "hair-2",
        name: "Keratin Treatment",
        slug: "keratin-treatment",
        shortDescription: "A professional smoothing treatment that infuses keratin deep into the hair cuticle for a silky, frizz-free finish.",
        description: "A professional smoothing treatment that infuses keratin deep into the hair cuticle, eliminating frizz and curl for a silky, smooth finish.",
        price: "₹3,999",
        priceNote: "Starting from",
        duration: "120 minutes",
        image: "",
        benefits: ["Smoother-looking hair", "Easier styling", "Salon finishing experience", "Frizz reduction"],
        suitableFor: ["Curly hair", "Frizzy hair", "Unmanageable hair"],
        preparation: ["Consult with stylist prior to appointment.", "Ensure scalp has no irritation."],
        aftercare: ["Use only keratin-safe sulfate-free shampoo.", "Avoid washing or tying hair tightly for 48 hours."],
        faqs: [
          { question: "Is this a permanent straightening?", answer: "No, it is a semi-permanent smoothing treatment." }
        ],
        enabled: true,
        sortOrder: 2,
      },
      {
        id: "hair-3",
        name: "Haircut & Styling",
        slug: "haircut",
        shortDescription: "Professional haircut customized to your face shape and personal style.",
        description: "Our expert stylists will consult with you to determine the best cut for your face shape, lifestyle, and hair texture.",
        price: "₹999",
        priceNote: "",
        duration: "45 minutes",
        image: "",
        benefits: ["Fresh look", "Removes split ends", "Easier daily styling"],
        suitableFor: ["All hair types"],
        preparation: [],
        aftercare: [],
        faqs: [],
        enabled: true,
        sortOrder: 3,
      },
      {
        id: "hair-4",
        name: "Global Hair Colour",
        slug: "hair-colour",
        shortDescription: "Premium hair coloring services using high-quality professional products.",
        description: "Transform your look with our professional coloring service. Includes consultation, application, and finishing style.",
        price: "₹2,499",
        priceNote: "Starting from",
        duration: "150 minutes",
        image: "",
        benefits: ["Vibrant color", "Grey coverage", "Glossy finish"],
        suitableFor: ["All hair types"],
        preparation: [],
        aftercare: ["Use color-protect shampoo"],
        faqs: [],
        enabled: true,
        sortOrder: 4,
      },
    ],
  },
  {
    id: "skin",
    name: "Skin & Facials",
    slug: "skin",
    description: "Advanced skincare & facial treatments for a radiant, healthy glow.",
    icon: "Sparkles",
    image: "/images/categories/skin-facials.jpg",
    enabled: true,
    sortOrder: 2,
    services: [
      {
        id: "skin-1",
        name: "Glow Facial",
        slug: "glow-facial",
        shortDescription: "A salon facial experience focused on cleansing, hydration and a refreshed appearance.",
        description: "This signature facial uses premium botanical extracts to brighten dull skin. It includes deep cleansing, gentle exfoliation, a relaxing massage, and a specialized glow-boosting mask.",
        price: "₹1,299",
        priceNote: "",
        duration: "75 minutes",
        image: "",
        benefits: ["Instant brightness", "Deep hydration", "Relaxation"],
        suitableFor: ["Dull skin", "Tired skin", "Special occasions"],
        preparation: ["Avoid harsh exfoliants 2 days prior"],
        aftercare: ["Apply sunscreen", "Avoid heavy makeup for 12 hours"],
        faqs: [],
        enabled: true,
        sortOrder: 1,
      },
      {
        id: "skin-2",
        name: "Deep Cleansing Facial",
        slug: "deep-cleansing",
        shortDescription: "Purifying treatment to unclog pores and clear the complexion.",
        description: "A thorough cleansing facial designed to extract impurities and balance oil production.",
        price: "₹1,499",
        priceNote: "",
        duration: "60 minutes",
        image: "",
        benefits: ["Clearer pores", "Reduced oiliness"],
        suitableFor: ["Oily skin", "Congested skin"],
        preparation: [],
        aftercare: [],
        faqs: [],
        enabled: true,
        sortOrder: 2,
      },
      {
        id: "skin-3",
        name: "De-Tan Treatment",
        slug: "detan",
        shortDescription: "Effective treatment to remove sun tan and even out skin tone.",
        description: "A specialized pack and massage that gently removes superficial tanning and restores natural skin tone.",
        price: "₹699",
        priceNote: "",
        duration: "30 minutes",
        image: "",
        benefits: ["Removes sun tan", "Evens skin tone"],
        suitableFor: ["Sun-exposed skin"],
        preparation: [],
        aftercare: [],
        faqs: [],
        enabled: true,
        sortOrder: 3,
      },
    ],
  },
  {
    id: "bridal",
    name: "Bridal",
    slug: "bridal",
    description: "Complete bridal beauty services ensuring you look perfect on your special day.",
    icon: "Crown",
    image: "/images/categories/bridal.jpg",
    enabled: true,
    sortOrder: 3,
    services: [
      {
        id: "bridal-1",
        name: "Bridal Makeup",
        slug: "bridal-makeup",
        shortDescription: "A complete bridal beauty experience designed for wedding-day styling.",
        description: "Our signature bridal service includes HD or Airbrush makeup, elaborate hairstyling, dupatta/saree draping, and premium accessory placement.",
        price: "₹12,999",
        priceNote: "Starting from",
        duration: "180 minutes",
        image: "",
        benefits: ["Long-lasting finish", "Flawless in photography", "Complete styling"],
        suitableFor: ["Brides"],
        preparation: ["Book a consultation 1 month prior", "Complete facials 1 week before"],
        aftercare: ["Professional makeup removal required"],
        faqs: [],
        enabled: true,
        sortOrder: 1,
      },
      {
        id: "bridal-2",
        name: "Pre-Bridal Package",
        slug: "pre-bridal",
        shortDescription: "Comprehensive grooming package before the big day.",
        description: "Includes body polishing, advanced facials, hair spa, and complete waxing.",
        price: "₹5,999",
        priceNote: "Package",
        duration: "150 minutes",
        image: "",
        benefits: ["Head-to-toe grooming", "Glowing skin"],
        suitableFor: ["Brides-to-be"],
        preparation: [],
        aftercare: [],
        faqs: [],
        enabled: true,
        sortOrder: 2,
      },
    ],
  },
  {
    id: "makeup",
    name: "Makeup",
    slug: "makeup",
    description: "Professional makeup for every occasion, from subtle to glamorous.",
    icon: "Palette",
    image: "/images/categories/makeup.jpg",
    enabled: true,
    sortOrder: 4,
    services: [
      {
        id: "makeup-1",
        name: "Party Makeup",
        slug: "party-makeup",
        shortDescription: "Professional makeup styling for celebrations and special occasions.",
        description: "A glamorous makeup look tailored to your outfit and the event. Includes basic hair styling.",
        price: "₹2,499",
        priceNote: "",
        duration: "90 minutes",
        image: "",
        benefits: ["Flawless look", "Event-appropriate styling"],
        suitableFor: ["Party guests", "Bridesmaids"],
        preparation: ["Have a clean face"],
        aftercare: [],
        faqs: [],
        enabled: true,
        sortOrder: 1,
      },
      {
        id: "makeup-2",
        name: "HD Makeup",
        slug: "hd-makeup",
        shortDescription: "High-definition makeup perfect for photography and videography.",
        description: "Using specialized HD products that diffuse light and create a flawless, natural finish on camera.",
        price: "₹3,999",
        priceNote: "",
        duration: "90 minutes",
        image: "",
        benefits: ["Camera-ready", "Lightweight feel"],
        suitableFor: ["Photoshoots", "Special events"],
        preparation: [],
        aftercare: [],
        faqs: [],
        enabled: true,
        sortOrder: 2,
      },
    ],
  },
  {
    id: "nails",
    name: "Nails",
    slug: "nails",
    description: "Manicure, pedicure & beautiful nail art.",
    icon: "Hand",
    image: "/images/categories/nails.jpg",
    enabled: true,
    sortOrder: 5,
    services: [
      {
        id: "nails-1",
        name: "Classic Manicure",
        slug: "classic-manicure",
        shortDescription: "A complete nail grooming experience including shaping, care and finishing.",
        description: "Includes nail shaping, cuticle care, a relaxing hand massage, and application of a polish of your choice.",
        price: "₹699",
        priceNote: "",
        duration: "45 minutes",
        image: "",
        benefits: ["Clean nails", "Soft hands", "Polished look"],
        suitableFor: ["Everyone"],
        preparation: [],
        aftercare: ["Allow polish to dry completely"],
        faqs: [],
        enabled: true,
        sortOrder: 1,
      },
      {
        id: "nails-2",
        name: "Gel Polish",
        slug: "gel-polish",
        shortDescription: "Long-lasting gel nail polish application.",
        description: "High-gloss, chip-resistant gel polish cured under LED light.",
        price: "₹999",
        priceNote: "",
        duration: "60 minutes",
        image: "",
        benefits: ["Chip-resistant", "Lasts up to 3 weeks"],
        suitableFor: ["Long-lasting wear"],
        preparation: [],
        aftercare: [],
        faqs: [],
        enabled: true,
        sortOrder: 2,
      },
    ],
  },
  {
    id: "spa",
    name: "Spa & Wellness",
    slug: "spa",
    description: "Relaxing spa treatments to rejuvenate your mind and body.",
    icon: "Flower2",
    image: "/images/categories/spa-wellness.jpg",
    enabled: true,
    sortOrder: 6,
    services: [
      {
        id: "spa-1",
        name: "Head Massage",
        slug: "head-massage",
        shortDescription: "A relaxing scalp and head massage experience.",
        description: "Relieve stress and tension with our signature head massage using warm, aromatic oils.",
        price: "₹599",
        priceNote: "",
        duration: "30 minutes",
        image: "",
        benefits: ["Stress relief", "Improves circulation"],
        suitableFor: ["Stress relief"],
        preparation: [],
        aftercare: [],
        faqs: [],
        enabled: true,
        sortOrder: 1,
      },
      {
        id: "spa-2",
        name: "Body Spa",
        slug: "body-spa",
        shortDescription: "Full body relaxation massage.",
        description: "A complete body therapy designed to soothe muscles and calm the mind.",
        price: "₹1,999",
        priceNote: "",
        duration: "60 minutes",
        image: "",
        benefits: ["Muscle relaxation", "Mental calm"],
        suitableFor: ["Fatigue", "Stress"],
        preparation: [],
        aftercare: ["Drink plenty of water"],
        faqs: [],
        enabled: true,
        sortOrder: 2,
      },
    ],
  },
  {
    id: "waxing",
    name: "Waxing & Threading",
    slug: "waxing",
    description: "Professional hair removal services.",
    icon: "Leaf",
    image: "",
    services: [],
    enabled: false,
    sortOrder: 7,
  },
];

// ─── Helper Functions ────────────────────────────────────

export function isDemoMode(): boolean {
  return false;
}

export function getActiveCategories(): ServiceCategory[] {
  return serviceCategories;
}

export function getEnabledCategories(): ServiceCategory[] {
  return getActiveCategories()
    .filter((category) => category.enabled)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getEnabledServices(): Service[] {
  return getEnabledCategories()
    .flatMap((cat) => cat.services.filter((s) => s.enabled));
}

export function hasServices(): boolean {
  return getEnabledCategories().some(
    (category) => category.services.filter((s) => s.enabled).length > 0
  );
}

export function getServiceBySlug(slug: string): Service | undefined {
  return getEnabledServices().find((s) => s.slug === slug);
}

export function getCategoryBySlug(slug: string): ServiceCategory | undefined {
  return getEnabledCategories().find((c) => c.slug === slug);
}

export function hasBridalServices(): boolean {
  const bridal = getActiveCategories().find((c) => c.id === "bridal" || c.slug === "bridal" || c.id === "demo-bridal");
  return bridal?.enabled === true && bridal.services.some((s) => s.enabled);
}
