"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Wifi, WifiOff, AlertCircle, X } from "lucide-react";
import { useNetworkStatus } from "@/hooks/useNetworkStatus";
import { cn } from "@/lib/utils";

export function OfflineIndicator() {
  const { notice, dismissNetworkNotice } = useNetworkStatus();

  if (!notice) return null;

  const isOffline = notice.type === "offline";
  const isOnline = notice.type === "online";
  const isWarning = notice.type === "warning";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[9999] max-w-[90vw] sm:max-w-md md:bottom-6"
        role="status"
        aria-live="polite"
      >
        <div
          className={cn(
            "flex items-center gap-3 rounded-full px-4 py-2.5 shadow-xl backdrop-blur-md border text-xs sm:text-sm font-medium transition-all",
            isOffline && "bg-charcoal/95 border-champagne/30 text-white shadow-charcoal/20",
            isOnline && "bg-emerald-950/95 border-emerald-500/40 text-emerald-200 shadow-emerald-900/20",
            isWarning && "bg-amber-950/95 border-amber-500/40 text-amber-200 shadow-amber-900/20"
          )}
        >
          {isOffline && <WifiOff className="h-4 w-4 shrink-0 text-champagne" aria-hidden="true" />}
          {isOnline && <Wifi className="h-4 w-4 shrink-0 text-emerald-400" aria-hidden="true" />}
          {isWarning && <AlertCircle className="h-4 w-4 shrink-0 text-amber-400" aria-hidden="true" />}

          <span className="leading-tight">{notice.message}</span>

          <button
            onClick={dismissNetworkNotice}
            className="ml-1 rounded-full p-1 text-white/60 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-champagne"
            aria-label="Dismiss notification"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
