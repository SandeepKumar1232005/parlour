"use client";

import { Mail, Phone, MessageCircle } from "lucide-react";
import { InstagramIcon, FacebookIcon } from "@/components/ui/icons";
import { 
  hasSocial, 
  getInstagramLink, 
  getFacebookLink, 
  hasEmail, 
  getEmailLink, 
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

export function SocialIcon({ href, icon: Icon, label, className, isExternal = true, variant = "light" }: SocialIconProps) {
  const baseClasses = "flex h-11 w-11 items-center justify-center rounded-full border transition-all";
  
  const variantClasses = variant === "light" 
    ? "border-border bg-white text-text-muted hover:border-champagne hover:bg-champagne/10 hover:text-champagne-dark"
    : "border-white/10 bg-white/5 text-white/70 hover:border-champagne/50 hover:bg-champagne/20 hover:text-white";
  return (
    <a
      href={href}
      aria-label={label}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={cn(
        baseClasses,
        variantClasses,
        className
      )}
    >
      <Icon className="h-5 w-5" />
    </a>
  );
}

interface SocialLinksGroupProps {
  className?: string;
  iconClassName?: string;
  variant?: "light" | "dark";
}

export function SocialLinksGroup({ className, iconClassName, variant = "light" }: SocialLinksGroupProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      {hasSocial("instagram") && (
        <SocialIcon 
          href={getInstagramLink()} 
          icon={InstagramIcon} 
          label="Visit us on Instagram"
          className={iconClassName}
          variant={variant}
        />
      )}
      {hasSocial("facebook") && (
        <SocialIcon 
          href={getFacebookLink()} 
          icon={FacebookIcon} 
          label="Visit us on Facebook"
          className={iconClassName}
          variant={variant}
        />
      )}
      {hasEmail() && (
        <SocialIcon 
          href={getEmailLink()} 
          icon={Mail} 
          label="Send us an email"
          className={iconClassName}
          isExternal={false}
          variant={variant}
        />
      )}
      {hasWhatsApp() && (
        <SocialIcon 
          href={getWhatsAppLink("Hi, I would like to get in touch.")} 
          icon={MessageCircle} 
          label="Chat with us on WhatsApp"
          className={iconClassName}
          variant={variant}
        />
      )}
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
