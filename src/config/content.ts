/**
 * CONTENT CONFIGURATION
 * =====================
 * Gallery, reviews, team, offers, packages, FAQs — all config-driven.
 * Only populate with REAL, VERIFIED information.
 */

// ─── Gallery ─────────────────────────────────────────────

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  category: "hair" | "bridal" | "makeup" | "skin" | "nails" | "interior" | "all";
  caption: string;
  featured: boolean;
}

export const gallery: GalleryItem[] = [];

export function hasGallery(): boolean {
  return gallery.length > 0;
}

// ─── Reviews / Testimonials ──────────────────────────────

export interface Review {
  id: string;
  customerName: string;
  service: string;
  review: string;
  rating: number; // 1-5
  photoUrl: string;
  date: string;
}

/** Only add GENUINE reviews from real customers */
export const reviews: Review[] = [];

export function hasReviews(): boolean {
  return reviews.length > 0;
}

// ─── Team ────────────────────────────────────────────────

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  experience: string;
  specialization: string[];
  photoUrl: string;
  enabled: boolean;
}

/** Only add REAL staff members */
export const team: TeamMember[] = [];

export function hasTeam(): boolean {
  return team.some((m) => m.enabled);
}

// ─── Offers ──────────────────────────────────────────────

export interface Offer {
  id: string;
  title: string;
  description: string;
  validFrom: string;
  validUntil: string;
  terms: string;
  image: string;
  enabled: boolean;
}

/** Only add REAL current offers */
export const offers: Offer[] = [];

export function hasOffers(): boolean {
  return offers.some((o) => o.enabled);
}

// ─── Packages ────────────────────────────────────────────

export interface Package {
  id: string;
  name: string;
  description: string;
  includedServices: string[];
  price: string;
  priceNote: string;
  validity: string;
  savings: string;
  image: string;
  enabled: boolean;
}

/** Only add REAL packages */
export const packages: Package[] = [];

export function hasPackages(): boolean {
  return packages.some((p) => p.enabled);
}

// ─── FAQs ────────────────────────────────────────────────

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export const faqs: FAQ[] = [
  {
    id: "faq-1",
    question: "Do I need an appointment?",
    answer:
      "While we accept walk-ins for select services, we recommend booking an appointment to ensure availability and avoid waiting.",
    category: "general",
  },
  {
    id: "faq-2",
    question: "How do I book an appointment?",
    answer:
      "You can book through our website, call us, or message us on WhatsApp. Our team will confirm your preferred time slot.",
    category: "general",
  },
  {
    id: "faq-3",
    question: "What should I do before my appointment?",
    answer:
      "For most services, no special preparation is needed. For specific treatments, our team will provide preparation guidelines when you book.",
    category: "general",
  },
  {
    id: "faq-4",
    question: "Is the appointment confirmed immediately?",
    answer:
      "Online bookings are appointment requests. Our team will contact you to confirm availability for your preferred date and time.",
    category: "booking",
  },
  {
    id: "faq-5",
    question: "Can I reschedule or cancel my appointment?",
    answer:
      "Yes, please contact us at least a few hours before your appointment to reschedule or cancel.",
    category: "booking",
  },
];

export function hasFAQs(): boolean {
  return faqs.length > 0;
}

// ─── Blog Posts ──────────────────────────────────────────

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  featuredImage: string;
  publishedDate: string;
  author: string;
  enabled: boolean;
}

export const blogPosts: BlogPost[] = [];

export function hasBlogPosts(): boolean {
  return blogPosts.some((p) => p.enabled);
}

// ─── Trust Stats ─────────────────────────────────────────

export interface TrustStat {
  label: string;
  value: string;
  icon: string;
  enabled: boolean;
}

/**
 * IMPORTANT: Only enable stats that are REAL and VERIFIED.
 * Do NOT fabricate numbers.
 */
export const trustStats: TrustStat[] = [
  {
    label: "Certified Professionals",
    value: "",
    icon: "Award",
    enabled: false,
  },
  {
    label: "Premium Products",
    value: "",
    icon: "Gem",
    enabled: false,
  },
  {
    label: "Hygienic Environment",
    value: "",
    icon: "ShieldCheck",
    enabled: false,
  },
  {
    label: "Personalised Care",
    value: "",
    icon: "Heart",
    enabled: false,
  },
];

export function hasTrustStats(): boolean {
  return trustStats.some((s) => s.enabled);
}
