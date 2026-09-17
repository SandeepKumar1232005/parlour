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
}

/**
 * NOTE: All categories start with `enabled: false`.
 * Enable ONLY categories that the salon genuinely offers.
 * Do NOT add services with fabricated prices or descriptions.
 */
export const serviceCategories: ServiceCategory[] = [
  {
    id: "hair",
    name: "Hair",
    slug: "hair",
    description: "Professional hair care, styling, and treatments.",
    icon: "Scissors",
    image: "",
    services: [],
    enabled: false,
    sortOrder: 1,
  },
  {
    id: "skin",
    name: "Skin & Facials",
    slug: "skin",
    description: "Advanced skincare and facial treatments.",
    icon: "Sparkles",
    image: "",
    services: [],
    enabled: false,
    sortOrder: 2,
  },
  {
    id: "bridal",
    name: "Bridal",
    slug: "bridal",
    description: "Complete bridal beauty services for your special day.",
    icon: "Crown",
    image: "",
    services: [],
    enabled: false,
    sortOrder: 3,
  },
  {
    id: "makeup",
    name: "Makeup",
    slug: "makeup",
    description: "Professional makeup for every occasion.",
    icon: "Palette",
    image: "",
    services: [],
    enabled: false,
    sortOrder: 4,
  },
  {
    id: "nails",
    name: "Nails",
    slug: "nails",
    description: "Manicure, pedicure, and nail art services.",
    icon: "Hand",
    image: "",
    services: [],
    enabled: false,
    sortOrder: 5,
  },
  {
    id: "spa",
    name: "Spa & Wellness",
    slug: "spa",
    description: "Relaxing spa and wellness treatments.",
    icon: "Flower2",
    image: "",
    services: [],
    enabled: false,
    sortOrder: 6,
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

export function getEnabledCategories(): ServiceCategory[] {
  return serviceCategories
    .filter((cat) => cat.enabled)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getEnabledServices(): Service[] {
  return serviceCategories
    .filter((cat) => cat.enabled)
    .flatMap((cat) => cat.services.filter((s) => s.enabled));
}

export function getServiceBySlug(slug: string): Service | undefined {
  return getEnabledServices().find((s) => s.slug === slug);
}

export function getCategoryBySlug(slug: string): ServiceCategory | undefined {
  return getEnabledCategories().find((c) => c.slug === slug);
}

export function hasServices(): boolean {
  return getEnabledServices().length > 0;
}

export function hasBridalServices(): boolean {
  const bridal = serviceCategories.find((c) => c.id === "bridal");
  return bridal?.enabled === true && bridal.services.some((s) => s.enabled);
}
