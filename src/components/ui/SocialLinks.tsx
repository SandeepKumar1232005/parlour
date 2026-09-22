"use client";

import { Phone } from "lucide-react";
import { InstagramIcon, FacebookIcon, WhatsAppIcon } from "@/components/ui/icons";
import { 
  socialLinks,
  getInstagramLink, 
  getFacebookLink, 
  hasPhone, 
  getPhoneLink 
} from "@/config/business";
import { cn } from "@/lib/utils";
import { WhatsAppButton } from "./WhatsAppButton";

interface SocialIconProps {
  href?: string;
  icon: React.ElementType;
  label: string;
  unconfiguredTooltip?: string;
  className?: string;
  isExternal?: boolean;
  variant?: "light" | "dark";
}

export function SocialIcon({
  href,
  icon: Icon,
  label,
  unconfiguredTooltip,
  className,
  isExternal = true,
  variant = "light",
}: SocialIconProps) {
  const isConfigured = Boolean(href && href.trim().length > 0 && href !== "#");

  const baseClasses =
    "group flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-full border transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne focus-visible:ring-offset-2";

  if (isConfigured && href) {
    const isWhatsApp = label === "WhatsApp";
    const activeClasses =
      variant === "light"
        ? isWhatsApp
          ? "border-border bg-white text-text-muted hover:border-whatsapp/50 hover:bg-whatsapp/10 hover:text-whatsapp hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 focus-visible:ring-offset-white cursor-pointer"
          : "border-border bg-white text-text-muted hover:border-champagne hover:bg-champagne/10 hover:text-champagne-dark hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 focus-visible:ring-offset-white cursor-pointer"
        : isWhatsApp
          ? "border-white/10 bg-white/5 text-white/70 hover:border-whatsapp/50 hover:bg-whatsapp/15 hover:text-whatsapp hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 focus-visible:ring-offset-charcoal cursor-pointer"
          : "border-white/10 bg-white/5 text-white/70 hover:border-champagne/50 hover:bg-champagne/20 hover:text-white hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 focus-visible:ring-offset-charcoal cursor-pointer";

    return (
      <a
        href={href}
        title={label}
        aria-label={label}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className={cn(baseClasses, activeClasses, className)}
      >
        <Icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
      </a>
    );
  }

  // Disabled / Unconfigured state — visibly rendered with muted styling and tooltip
  const disabledClasses =
    variant === "light"
      ? "border-border/60 bg-cream/40 text-text-muted/40 cursor-not-allowed opacity-60 focus-visible:ring-offset-white"
      : "border-white/10 bg-white/[0.03] text-white/40 cursor-not-allowed opacity-60 hover:bg-white/[0.03] focus-visible:ring-offset-charcoal";

  const disabledTitle = unconfiguredTooltip || `${label} link coming soon`;
  const disabledAriaLabel = `${label} (link coming soon)`;

  return (
    <button
      type="button"
      disabled
      aria-label={disabledAriaLabel}
      title={disabledTitle}
      className={cn(baseClasses, disabledClasses, className)}
    >
      <Icon className="h-5 w-5" />
    </button>
  );
}

interface SocialLinksGroupProps {
  className?: string;
  iconClassName?: string;
  variant?: "light" | "dark";
}

export function SocialLinksGroup({
  className,
  iconClassName,
  variant = "light",
}: SocialLinksGroupProps) {
  const instagramUrl = socialLinks.instagram || getInstagramLink();
  const facebookUrl = socialLinks.facebook || getFacebookLink();
  const phoneUrl = hasPhone() ? getPhoneLink() : "";

  return (
    <div className={cn("flex flex-row items-center gap-2.5 sm:gap-3 flex-nowrap", className)}>
      {/* 1. Instagram — Always visibly rendered */}
      <SocialIcon
        href={instagramUrl}
        icon={InstagramIcon}
        label="Instagram"
        unconfiguredTooltip="Instagram link coming soon"
        className={iconClassName}
        isExternal={true}
        variant={variant}
      />

      {/* 2. Facebook — Always visibly rendered */}
      <SocialIcon
        href={facebookUrl}
        icon={FacebookIcon}
        label="Facebook"
        unconfiguredTooltip="Facebook link coming soon"
        className={iconClassName}
        isExternal={true}
        variant={variant}
      />

      {/* 3. WhatsApp — Official WhatsApp brand icon */}
      <WhatsAppButton 
        variant={variant === "light" ? "footer-light" : "footer-dark"} 
        className={iconClassName}
        message="Hi, I would like to get in touch."
      />

      {/* 4. Call — Always visibly rendered */}
      <SocialIcon
        href={phoneUrl}
        icon={Phone}
        label="Call"
        unconfiguredTooltip="Phone number not configured"
        className={iconClassName}
        isExternal={false}
        variant={variant}
      />
    </div>
  );
}
