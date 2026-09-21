"use client";

import { WifiOff, RefreshCw, Home } from "lucide-react";
import { Button, AnimatedCard } from "@/components/ui";

export default function OfflinePage() {
  const handleRetry = () => {
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-ivory px-4 py-24 sm:px-6">
      <AnimatedCard>
        <div className="mx-auto max-w-md rounded-2xl border border-border bg-white p-8 text-center shadow-sm sm:p-10">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-champagne/15 text-champagne-dark">
            <WifiOff className="h-8 w-8" aria-hidden="true" />
          </div>

          <span className="text-xs font-bold uppercase tracking-[0.2em] text-champagne-dark">
            Connection Lost
          </span>

          <h1 className="mt-2 font-display text-3xl font-semibold text-charcoal sm:text-4xl">
            You&apos;re Offline
          </h1>

          <p className="mt-3 text-sm leading-relaxed text-text-muted">
            Some information may be unavailable until your connection returns. Any previously visited pages and saved services are still accessible.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button
              onClick={handleRetry}
              variant="primary"
              className="w-full sm:w-auto min-h-[44px]"
            >
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Button>

            <Button
              href="/"
              variant="outline"
              className="w-full sm:w-auto min-h-[44px]"
            >
              <Home className="h-4 w-4" />
              Go to Home
            </Button>
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
}
