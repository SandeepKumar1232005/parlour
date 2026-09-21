"use client";

import { useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { business, hasPhone, hasWhatsApp, getPhoneLink, getWhatsAppLink } from "@/config/business";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  links: { label: string; href: string }[];
}

export function MobileDrawer({ isOpen, onClose, links }: MobileDrawerProps) {
  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-charcoal/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 right-0 z-[60] w-[85vw] max-w-sm bg-ivory shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div className="flex h-full flex-col">
              {/* Drawer Header */}
              <div className="flex items-center justify-between border-b border-border px-6 py-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-champagne/30 bg-champagne/10">
                    <span className="font-display text-lg font-bold text-champagne-dark">
                      {business.name.charAt(0)}
                    </span>
                  </div>
                  <span className="font-display text-lg font-semibold tracking-wider text-charcoal">
                    {business.name}
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-cream text-text-muted transition-colors hover:bg-cream-dark hover:text-charcoal"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 overflow-y-auto px-6 py-6">
                <ul className="space-y-1" role="list">
                  {links.map((link, i) => (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        onClick={onClose}
                        className="group flex items-center gap-3 rounded-xl px-4 py-3.5 text-base font-medium text-text-body transition-all hover:bg-cream hover:text-charcoal"
                      >
                        <span className="h-1 w-1 rounded-full bg-champagne opacity-0 transition-opacity group-hover:opacity-100" />
                        {link.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* Drawer Footer — CTAs */}
              <div className="border-t border-border px-6 py-5 space-y-3 safe-bottom">
                <Link
                  href="/booking"
                  onClick={onClose}
                  className="flex w-full items-center justify-center rounded-xl bg-charcoal px-6 py-3.5 text-sm font-semibold tracking-wide text-ivory transition-all hover:bg-charcoal-soft"
                >
                  Book Appointment
                </Link>
                <div className="flex gap-3">
                  {hasWhatsApp() && (
                    <a
                      href={getWhatsAppLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-whatsapp/30 bg-whatsapp/10 px-4 py-3 text-sm font-semibold text-whatsapp-dark transition-all hover:bg-whatsapp/20"
                    >
                      WhatsApp
                    </a>
                  )}
                  {hasPhone() && (
                    <a
                      href={getPhoneLink()}
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border bg-cream px-4 py-3 text-sm font-semibold text-text-body transition-all hover:bg-cream-dark"
                    >
                      Call
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
