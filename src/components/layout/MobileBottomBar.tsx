"use client";

import Link from "next/link";
import { Home, Scissors, MessageCircle, Calendar, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { hasPhone, hasWhatsApp, getPhoneLink, getWhatsAppLink } from "@/config/business";

const barItems = [
  { label: "Home", href: "/", icon: Home, type: "link" as const },
  { label: "Services", href: "/services", icon: Scissors, type: "link" as const },
  { label: "WhatsApp", href: "", icon: MessageCircle, type: "whatsapp" as const },
  { label: "Book", href: "/booking", icon: Calendar, type: "link" as const },
  { label: "Call", href: "", icon: Phone, type: "call" as const },
];

export function MobileBottomBar() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[40] border-t border-border bg-white/95 backdrop-blur-xl md:hidden safe-bottom"
      role="navigation"
      aria-label="Quick actions"
    >
      <div className="flex items-center justify-around px-2 py-2">
        {barItems.map((item) => {
          // Skip WhatsApp/Call if not configured
          if (item.type === "whatsapp" && !hasWhatsApp()) return null;
          if (item.type === "call" && !hasPhone()) return null;

          const Icon = item.icon;
          const isHighlighted = item.type === "whatsapp" || item.label === "Book";

          const href =
            item.type === "whatsapp"
              ? getWhatsAppLink()
              : item.type === "call"
              ? getPhoneLink()
              : item.href;

          const isExternal = item.type === "whatsapp";

          const className = cn(
            "flex flex-col items-center justify-center gap-0.5 rounded-xl px-3 py-1.5 min-w-[56px] min-h-[44px] transition-all duration-300",
            isHighlighted
              ? item.type === "whatsapp"
                ? "text-whatsapp-dark"
                : "text-champagne-dark"
              : "text-text-muted hover:text-charcoal"
          );

          const content = (
            <>
              <Icon
                className={cn(
                  "h-5 w-5",
                  isHighlighted && item.type === "whatsapp" && "text-whatsapp",
                  isHighlighted && item.label === "Book" && "text-champagne"
                )}
              />
              <span
                className={cn(
                  "text-[0.6rem] font-semibold tracking-wide",
                  isHighlighted && "font-bold"
                )}
              >
                {item.label}
              </span>
            </>
          );

          if (isExternal || item.type === "call") {
            return (
              <a
                key={item.label}
                href={href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className={className}
                aria-label={item.label}
              >
                {content}
              </a>
            );
          }

          return (
            <Link key={item.label} href={href} className={className} aria-label={item.label}>
              {content}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
