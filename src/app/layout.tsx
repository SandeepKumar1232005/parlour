import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomBar } from "@/components/layout/MobileBottomBar";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { DemoBadge } from "@/components/ui/DemoBadge";
import { business } from "@/config/business";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#1C1C1E",
};

export const metadata: Metadata = {
  title: {
    default: `${business.name} | Premium Beauty Parlour in ${business.address.city}`,
    template: `%s | ${business.name}`,
  },
  description: business.description,
  keywords: [
    "beauty parlour",
    "beauty salon",
    "hair salon",
    "bridal makeup",
    business.address.city,
  ].filter(Boolean),
  authors: [{ name: business.name }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: business.name,
    title: `${business.name} | Premium Beauty Parlour in ${business.address.city}`,
    description: business.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-ivory text-text-body antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <MobileBottomBar />
        <WhatsAppFloat />
        <DemoBadge />
      </body>
    </html>
  );
}
