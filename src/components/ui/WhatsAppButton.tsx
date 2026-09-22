"use client";

import { cn } from "@/lib/utils";
import { hasWhatsApp, getWhatsAppLink } from "@/config/business";
import { useNetworkStatus } from "@/hooks/useNetworkStatus";
import { WhatsAppIcon } from "@/components/ui/icons";
import { forwardRef } from "react";

export type WhatsAppButtonVariant = 
  | "default"
  | "hero"
  | "footer-light"
  | "footer-dark"
  | "floating"
  | "mobile-sticky"
  | "service"
  | "contact"
  | "booking"
  | "ghost"
  | "pill";

export interface WhatsAppButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: WhatsAppButtonVariant;
  message?: string;
  showIcon?: boolean;
}

export const WhatsAppButton = forwardRef<HTMLAnchorElement, WhatsAppButtonProps>(
  (
    {
      className,
      variant = "default",
      message,
      showIcon = true,
      children,
      ...props
    },
    ref
  ) => {
    const { isOnline, showNetworkNotice } = useNetworkStatus();

    if (!hasWhatsApp()) {
      return null;
    }

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (!isOnline) {
        e.preventDefault();
        showNetworkNotice(
          "WhatsApp requires an active internet connection. Please check your connection and try again.",
          "warning"
        );
      }
      if (props.onClick) {
        props.onClick(e);
      }
    };

    const href = getWhatsAppLink(message);

    // FLOATING VARIANT
    if (variant === "floating") {
      return (
        <a
          ref={ref}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          className={cn(
            "fixed bottom-24 right-5 z-[80] flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl whatsapp-pulse md:bottom-8 md:right-8",
            className
          )}
          aria-label="Chat on WhatsApp"
          title="Chat on WhatsApp"
          {...props}
        >
          <WhatsAppIcon className="h-6 w-6" />
        </a>
      );
    }

    // FOOTER VARIANTS
    if (variant === "footer-light" || variant === "footer-dark") {
      const isLight = variant === "footer-light";
      const baseClasses =
        "group flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-full border transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne focus-visible:ring-offset-2";
      
      const activeClasses = isLight
        ? "border-border bg-white text-text-muted hover:border-whatsapp/50 hover:bg-whatsapp/10 hover:text-whatsapp hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 focus-visible:ring-offset-white cursor-pointer"
        : "border-white/10 bg-white/5 text-white/70 hover:border-whatsapp/50 hover:bg-whatsapp/15 hover:text-whatsapp hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 focus-visible:ring-offset-charcoal cursor-pointer";

      return (
        <a
          ref={ref}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          className={cn(baseClasses, activeClasses, className)}
          aria-label="WhatsApp"
          title="WhatsApp"
          {...props}
        >
          <WhatsAppIcon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
        </a>
      );
    }

    // MOBILE STICKY VARIANT
    if (variant === "mobile-sticky") {
      return (
        <a
          ref={ref}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          className={cn(
            "flex flex-col items-center justify-center gap-0.5 rounded-xl px-3 py-1.5 min-w-[56px] min-h-[44px] transition-all duration-300 text-whatsapp-dark",
            className
          )}
          aria-label="WhatsApp"
          {...props}
        >
          <WhatsAppIcon className="h-5 w-5 text-whatsapp" />
          <span className="text-[0.6rem] font-bold tracking-wide">
            {children || "WhatsApp"}
          </span>
        </a>
      );
    }

    // GHOST / TEXT VARIANT
    if (variant === "ghost") {
      return (
        <a
          ref={ref}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          className={cn(
            "inline-flex items-center gap-1.5 text-xs font-semibold text-whatsapp-dark hover:underline",
            className
          )}
          aria-label="WhatsApp"
          {...props}
        >
          {showIcon && <WhatsAppIcon className="h-3 w-3" />}
          {children || "Chat Now"}
        </a>
      );
    }

    // PILL VARIANT (e.g. for Footer small CTA)
    if (variant === "pill") {
      return (
        <a
          ref={ref}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          className={cn(
            "flex items-center gap-2 rounded-lg bg-whatsapp/15 px-4 py-2.5 text-xs font-semibold text-whatsapp transition-all hover:bg-whatsapp/25",
            className
          )}
          aria-label="WhatsApp"
          {...props}
        >
          {showIcon && <WhatsAppIcon className="h-3.5 w-3.5" />}
          {children || "WhatsApp"}
        </a>
      );
    }

    // BUTTON VARIANTS (hero, default, service, contact, booking)
    const isLarge = variant === "hero" || variant === "contact" || variant === "booking";
    
    return (
      <a
        ref={ref}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className={cn(
          "inline-flex items-center justify-center rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
          isLarge
            ? "h-11 px-8 py-2 text-sm md:h-12 md:px-10 md:text-base"
            : "h-10 px-6 py-2 text-sm",
          "bg-whatsapp text-white hover:bg-whatsapp-dark hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0",
          className
        )}
        {...props}
      >
        {showIcon && <WhatsAppIcon className={cn("mr-2", isLarge ? "h-5 w-5" : "h-4 w-4")} />}
        {children || "WhatsApp"}
      </a>
    );
  }
);
WhatsAppButton.displayName = "WhatsAppButton";
