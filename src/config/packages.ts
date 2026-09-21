export interface Package {
  id: string;
  name: string;
  slug: string;
  description: string;
  includes: string[];
  price: string;
  originalPrice?: string;
  duration?: string;
  enabled: boolean;
  isDemo?: boolean;
}

export const packages: Package[] = [];

export function getActivePackages(): Package[] {
  if (process.env.NEXT_PUBLIC_USE_DEMO_DATA === "true") {
    const { demoPackages } = require("./demo-packages");
    return demoPackages;
  }
  return packages;
}

export function getEnabledPackages(): Package[] {
  return getActivePackages().filter((p) => p.enabled);
}

export function hasPackages(): boolean {
  return getEnabledPackages().length > 0;
}
