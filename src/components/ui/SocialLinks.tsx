"use client";

import { Phone, MessageCircle } from "lucide-react";
import { InstagramIcon, FacebookIcon } from "@/components/ui/icons";
import { 
  hasSocial, 
  getInstagramLink, 
  getFacebookLink, 
  hasWhatsApp, 
  getWhatsAppLink, 
  hasPhone, 
  getPhoneLink 
} from "@/config/business";
import { cn } from "@/lib/utils";

interface SocialIconProps {
  href: string;
  icon: React.ElementType;
  label: string;
  className?: string;
  isExternal?: boolean;
  variant?: "light" | "dark";
}

export function SocialIcon({
  href,
  icon: Icon,
  label,
  className,
  isExternal = true,
  variant = "light",
}: SocialIconProps) {
  const baseClasses =
    "group flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-full border transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne focus-visible:ring-offset-2 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0";

  const variantClasses =
    variant === "light"
      ? "border-border bg-white text-text-muted hover:border-champagne hover:bg-champagne/10 hover:text-champagne-dark focus-visible:ring-offset-white"
      : "border-white/10 bg-white/5 text-white/70 hover:border-champagne/50 hover:bg-champagne/20 hover:text-white focus-visible:ring-offset-charcoal";

  return (
    <a
      href={href}
      aria-label={label}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={cn(baseClasses, variantClasses, className)}
    >
      <Icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
    </a>
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
  return (
    <div className={cn("flex flex-row items-center gap-3", className)}>
      {/* 1. Instagram */}
      {hasSocial("instagram") && (
        <SocialIcon
          href={getInstagramLink()}
          icon={InstagramIcon}
          label="Visit us on Instagram"
          className={iconClassName}
          isExternal={true}
          variant={variant}
        />
      )}

      {/* 2. Facebook */}
      {hasSocial("facebook") && (
        <SocialIcon
          href={getFacebookLink()}
          icon={FacebookIcon}
          label="Visit us on Facebook"
          className={iconClassName}
          isExternal={true}
          variant={variant}
        />
      )}

      {/* 3. WhatsApp */}
      {hasWhatsApp() && (
        <SocialIcon
          href={getWhatsAppLink("Hi, I would like to get in touch.")}
          icon={MessageCircle}
          label="Contact us on WhatsApp"
          className={iconClassName}
          isExternal={true}
          variant={variant}
        />
      )}

      {/* 4. Call */}
      {hasPhone() && (
        <SocialIcon
          href={getPhoneLink()}
          icon={Phone}
          label="Call us"
          className={iconClassName}
          isExternal={false}
          variant={variant}
        />
      )}
    </div>
  );
}
