/**
 * CENTRAL BUSINESS CONFIGURATION
 * ================================
 * This is the SINGLE SOURCE OF TRUTH for all business information.
 * Update this file to change business details across the entire website.
 *
 * IMPORTANT: Only add REAL, VERIFIED information.
 * Leave fields empty ("") if information is not yet available.
 */

export const business = {
  // ─── Brand ───────────────────────────────────────────
  name: "Parlour",
  tagline: "Beauty, Styled Around You",
  description:
    "Premium hair, skin, bridal and beauty experiences crafted by professionals.",
  shortDescription: "Professional beauty services in Coimbatore.",

  // ─── Contact ─────────────────────────────────────────
  phone: "", // e.g. "+919500000000"
  whatsapp: "", // e.g. "919500000000" (without +)
  email: "", // e.g. "hello@example.com"

  // ─── Location ────────────────────────────────────────
  address: {
    street: "",
    area: "",
    city: "Coimbatore",
    state: "Tamil Nadu",
    pin: "",
    full: "", // Full formatted address
  },

  // ─── Hours ───────────────────────────────────────────
  hours: {
    weekdays: "", // e.g. "10:00 AM – 8:00 PM"
    saturday: "", // e.g. "10:00 AM – 8:00 PM"
    sunday: "", // e.g. "Closed" or "3:00 PM – 9:00 PM"
    note: "", // e.g. "Walk-ins welcome"
  },

  // ─── Google Maps ─────────────────────────────────────
  maps: {
    url: "", // Google Maps link
    embedUrl: "", // Google Maps embed iframe URL
    lat: 0,
    lng: 0,
  },

  // ─── Social Media ────────────────────────────────────
  social: {
    instagram: "",
    facebook: "",
    youtube: "",
    google: "", // Google Business Profile URL
  },

  // ─── Business Details ────────────────────────────────
  established: "", // e.g. "2014"
  type: "women-only" as "women-only" | "family" | "unisex",
  parking: "", // e.g. "Free parking available"
  payment: [] as string[], // e.g. ["Cash", "UPI", "Cards"]

  // ─── SEO ─────────────────────────────────────────────
  seo: {
    siteUrl: "", // e.g. "https://yoursalon.com"
    ogImage: "", // Open Graph image path
  },
} as const;

// ─── Helper Functions ────────────────────────────────────

export function hasPhone(): boolean {
  return business.phone.length > 0;
}

export function hasWhatsApp(): boolean {
  return business.whatsapp.length > 0;
}

export function hasAddress(): boolean {
  return business.address.full.length > 0 || business.address.street.length > 0;
}

export function hasHours(): boolean {
  return business.hours.weekdays.length > 0;
}

export function hasMaps(): boolean {
  return business.maps.url.length > 0;
}

export function hasSocial(platform: keyof typeof business.social): boolean {
  return business.social[platform].length > 0;
}

export function getPhoneLink(): string {
  return business.phone ? `tel:${business.phone}` : "#";
}

export function getWhatsAppLink(message?: string): string {
  if (!business.whatsapp) return "#";
  const msg = message
    ? encodeURIComponent(message)
    : encodeURIComponent(
      `Hi, I would like to enquire about your beauty services.`
    );
  return `https://wa.me/${business.whatsapp}?text=${msg}`;
}

export function getFullAddress(): string {
  if (business.address.full) return business.address.full;
  const parts = [
    business.address.street,
    business.address.area,
    business.address.city,
    business.address.state,
    business.address.pin,
  ].filter(Boolean);
  return parts.join(", ");
}
