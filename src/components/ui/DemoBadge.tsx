"use client";

import { AlertTriangle } from "lucide-react";
import { isDemoMode } from "@/config/services";

export function DemoBadge() {
  if (!isDemoMode()) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full border border-amber-200 bg-amber-100 px-3 py-1.5 shadow-lg sm:bottom-6 sm:right-6">
      <AlertTriangle className="h-4 w-4 text-amber-600" />
      <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
        Demo Mode
      </span>
    </div>
  );
}
