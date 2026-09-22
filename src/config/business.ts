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

  // ─── Hero ────────────────────────────────────────────
  hero: {
    backgroundImage: "/images/hero/hero-desktop.jpg",
    mobileBackgroundImage: "/images/hero/hero-mobile.jpg",
  },

  // ─── Contact ─────────────────────────────────────────
  phone: "+919363499428", // e.g. "+919500000000"
  whatsapp: "919363499428", // e.g. "919500000000" (without +)
  email: "", // e.g. "hello@example.com"

  // ─── Centralized Location & Google Maps ───────────────
  location: {
    address: "2/10, Kumaran Nagar, Vishweshwara Nagar, Coimbatore, Tamil Nadu 641035",
    googleMapsEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1170.3013593304368!2d77.01361897496331!3d11.056127482065314!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba857fee5ce4591%3A0x4c36da916f5869bf!2s2%2F10%2C%20Kumaran%20Nagar%2C%20Vishweshwara%20Nagar%2C%20Coimbatore%2C%20Tamil%20Nadu%20641035!5e1!3m2!1sen!2sin!4v1789981263066!5m2!1sen!2sin",
    googleMapsUrl:
      "https://www.google.com/maps/place/2%2F10,+Kumaran+Nagar,+Vishweshwara+Nagar,+Coimbatore,+Tamil+Nadu+641035/@11.0561275,77.013619,17z",
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=2%2F10%2C+Kumaran+Nagar%2C+Vishweshwara+Nagar%2C+Coimbatore%2C+Tamil+Nadu+641035",
    latitude: 11.0561275,
    longitude: 77.013619,
  },

  // ─── Address ─────────────────────────────────────────
  address: {
    street: "2/10, Kumaran Nagar",
    area: "Vishweshwara Nagar",
    city: "Coimbatore",
    state: "Tamil Nadu",
    pin: "641035",
    full: "2/10, Kumaran Nagar, Vishweshwara Nagar, Coimbatore, Tamil Nadu 641035",
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
    url: "https://www.google.com/maps/place/2%2F10,+Kumaran+Nagar,+Vishweshwara+Nagar,+Coimbatore,+Tamil+Nadu+641035/@11.0561275,77.013619,17z",
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1170.3013593304368!2d77.01361897496331!3d11.056127482065314!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba857fee5ce4591%3A0x4c36da916f5869bf!2s2%2F10%2C%20Kumaran%20Nagar%2C%20Vishweshwara%20Nagar%2C%20Coimbatore%2C%20Tamil%20Nadu%20641035!5e1!3m2!1sen!2sin!4v1789981263066!5m2!1sen!2sin",
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=2%2F10%2C+Kumaran+Nagar%2C+Vishweshwara+Nagar%2C+Coimbatore%2C+Tamil+Nadu+641035",
    lat: 11.0561275,
    lng: 77.013619,
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
  return (
    business.location.address.length > 0 ||
    business.address.full.length > 0 ||
    business.address.street.length > 0
  );
}

export function hasHours(): boolean {
  return business.hours.weekdays.length > 0;
}

export function hasMaps(): boolean {
  return (
    business.location.googleMapsEmbedUrl.length > 0 ||
    business.maps.embedUrl.length > 0 ||
    business.location.googleMapsUrl.length > 0 ||
    business.maps.url.length > 0
  );
}

export function getMapsEmbedUrl(): string {
  return business.location.googleMapsEmbedUrl || business.maps.embedUrl;
}

export function getGoogleMapsUrl(): string {
  return business.location.googleMapsUrl || business.maps.url;
}

export function getDirectionsUrl(): string {
  return (
    business.location.directionsUrl ||
    business.maps.directionsUrl ||
    getGoogleMapsUrl()
  );
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
  if (business.location.address) return business.location.address;
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

export function hasEmail(): boolean {
  return business.email.length > 0;
}

export function getEmailLink(): string {
  return business.email ? `mailto:${business.email}` : "#";
}

export function getInstagramLink(): string {
  return business.social.instagram || "#";
}

export function getFacebookLink(): string {
  return business.social.facebook || "#";
}
