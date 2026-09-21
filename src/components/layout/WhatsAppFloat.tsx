"use client";

import { MessageCircle } from "lucide-react";
import { hasWhatsApp, getWhatsAppLink } from "@/config/business";
import { useNetworkStatus } from "@/hooks/useNetworkStatus";

export function WhatsAppFloat() {
  const { isOnline, showNetworkNotice } = useNetworkStatus();

  if (!hasWhatsApp()) return null;

  const handleClick = (e: React.MouseEvent) => {
    if (!isOnline) {
      e.preventDefault();
      showNetworkNotice(
        "WhatsApp requires an active internet connection. Please check your connection and try again.",
        "warning"
      );
    }
  };

  return (
    <a
      href={getWhatsAppLink()}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="fixed bottom-24 right-5 z-[80] flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl whatsapp-pulse md:bottom-8 md:right-8"
      aria-label="Chat on WhatsApp"
      title="Chat on WhatsApp"
    >
      <MessageCircle className="h-6 w-6" fill="currentColor" />
    </a>
  );
}
