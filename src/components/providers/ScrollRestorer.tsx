"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const STORAGE_KEY = "parlour_scroll_positions";

function getScrollPositions(): Record<string, number> {
  if (typeof window === "undefined") return {};
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveScrollPosition(path: string, y: number) {
  if (typeof window === "undefined") return;
  try {
    const positions = getScrollPositions();
    positions[path] = y;
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(positions));
  } catch {}
}

export function ScrollRestorer() {
  const pathname = usePathname();
  const isHistoryNavRef = useRef(false);
  const currentPathRef = useRef(pathname);

  // Set manual restoration so we have full deterministic control over history back/forward
  useEffect(() => {
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const handlePopState = () => {
      isHistoryNavRef.current = true;
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  // Save scroll position on scroll (throttled/debounced)
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    const handleScroll = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        saveScrollPosition(currentPathRef.current, window.scrollY);
      }, 150);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      if (timer) clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Handle path change: restore if history navigation, otherwise scroll to top
  useEffect(() => {
    currentPathRef.current = pathname;

    if (isHistoryNavRef.current) {
      const positions = getScrollPositions();
      const savedY = positions[pathname];

      if (typeof savedY === "number") {
        // Small timeout to allow DOM layout to stabilize before scrolling
        requestAnimationFrame(() => {
          window.scrollTo({ top: savedY, behavior: "instant" });
        });
      }
      isHistoryNavRef.current = false;
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [pathname]);

  return null;
}
