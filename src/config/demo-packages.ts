import { Package } from "./packages";

export const demoPackages: Package[] = [
  {
    id: "demo-pkg-1",
    name: "Pre-Bridal Glow Package",
    slug: "pre-bridal-glow",
    description: "The ultimate preparation package for brides-to-be, designed to give you a radiant head-to-toe glow.",
    includes: [
      "Advanced Skin Brightening Facial",
      "Full Body Polishing & Spa",
      "Classic Manicure & Pedicure",
      "Hair Spa & Deep Conditioning"
    ],
    price: "₹7,999",
    originalPrice: "₹10,500",
    duration: "4.5 Hours",
    enabled: true,
    isDemo: true,
  },
  {
    id: "demo-pkg-2",
    name: "Weekend Relaxation Combo",
    slug: "weekend-relaxation",
    description: "Unwind after a long week with our signature relaxation services bundled together.",
    includes: [
      "Aromatherapy Body Massage",
      "Hydrating Glow Facial",
      "Aromatic Foot Spa"
    ],
    price: "₹3,499",
    originalPrice: "₹4,200",
    duration: "2.5 Hours",
    enabled: true,
    isDemo: true,
  },
];
