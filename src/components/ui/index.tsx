"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  titleAccent?: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
  children?: React.ReactNode;
}

export function SectionHeader({
  eyebrow,
  title,
  titleAccent,
  description,
  className,
  align = "center",
  children,
}: SectionHeaderProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "mb-12 md:mb-16",
        align === "center" && "text-center",
        className
      )}
    >
      {eyebrow && (
        <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.3em] text-champagne">
          {eyebrow}
        </span>
      )}

      <h2
        className={cn(
          "font-display text-3xl font-semibold leading-tight tracking-tight text-charcoal sm:text-4xl md:text-5xl",
          align === "center" && "mx-auto max-w-2xl"
        )}
      >
        {title}{" "}
        {titleAccent && (
          <em className="not-italic text-champagne-dark">{titleAccent}</em>
        )}
      </h2>

      {/* Gold Divider */}
      <div
        className={cn(
          "gold-divider mt-5",
          align === "left" && "mx-0"
        )}
      />

      {description && (
        <p
          className={cn(
            "mt-5 text-base leading-relaxed text-text-muted md:text-lg",
            align === "center" && "mx-auto max-w-xl"
          )}
        >
          {description}
        </p>
      )}

      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   ANIMATED CARD WRAPPER
   ═══════════════════════════════════════════════════════ */

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function AnimatedCard({ children, className, delay = 0 }: AnimatedCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   PRIMARY / SECONDARY BUTTONS
   ═══════════════════════════════════════════════════════ */

interface ButtonProps {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "whatsapp";
  size?: "sm" | "md" | "lg";
  href?: string;
  external?: boolean;
  children: React.ReactNode;
  className?: string;
  onClick?: (e?: React.MouseEvent) => void;
  type?: "button" | "submit";
  disabled?: boolean;
  ariaLabel?: string;
}

export function Button({
  variant = "primary",
  size = "md",
  href,
  external,
  children,
  className,
  onClick,
  type = "button",
  disabled,
  ariaLabel,
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center gap-2 rounded-xl font-semibold tracking-wide transition-all duration-400 focus-visible:outline-2 focus-visible:outline-champagne disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-charcoal text-ivory hover:bg-charcoal-soft hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0",
    secondary:
      "bg-champagne text-charcoal hover:bg-champagne-soft hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0",
    outline:
      "border-2 border-charcoal/15 text-charcoal hover:border-charcoal hover:bg-charcoal hover:text-ivory",
    ghost:
      "text-text-body hover:text-charcoal hover:bg-cream",
    whatsapp:
      "bg-whatsapp text-white hover:bg-whatsapp-dark hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0",
  };

  const sizes = {
    sm: "px-5 py-2.5 text-xs",
    md: "px-7 py-3 text-sm",
    lg: "px-9 py-4 text-base",
  };

  const classes = cn(baseClasses, variants[variant], sizes[size], className);

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          aria-label={ariaLabel}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={classes}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
