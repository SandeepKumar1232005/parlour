"use client";

import { useState, useEffect, useCallback, useSyncExternalStore } from "react";

export interface NetworkNotice {
  id: string;
  type: "offline" | "online" | "warning";
  message: string;
}

// Global listener store for cross-component coordination
let noticeListeners: Array<() => void> = [];
let currentNotice: NetworkNotice | null = null;
let dismissTimer: NodeJS.Timeout | null = null;

function notifyNoticeListeners() {
  noticeListeners.forEach((listener) => listener());
}

export function showNetworkNotice(message: string, type: "offline" | "online" | "warning" = "warning") {
  if (dismissTimer) clearTimeout(dismissTimer);
  currentNotice = {
    id: Date.now().toString(),
    type,
    message,
  };
  notifyNoticeListeners();

  // Auto-dismiss after 4 seconds
  dismissTimer = setTimeout(() => {
    currentNotice = null;
    notifyNoticeListeners();
  }, 4000);
}

export function dismissNetworkNotice() {
  if (dismissTimer) clearTimeout(dismissTimer);
  currentNotice = null;
  notifyNoticeListeners();
}

function subscribeOnline(callback: () => void) {
  window.addEventListener("online", callback);
  window.addEventListener("offline", callback);
  return () => {
    window.removeEventListener("online", callback);
    window.removeEventListener("offline", callback);
  };
}

function getOnlineSnapshot() {
  return typeof navigator !== "undefined" ? navigator.onLine : true;
}

function getOnlineServerSnapshot() {
  return true;
}

export function useNetworkStatus() {
  const isOnline = useSyncExternalStore(
    subscribeOnline,
    getOnlineSnapshot,
    getOnlineServerSnapshot
  );

  const [notice, setNotice] = useState<NetworkNotice | null>(() => currentNotice);

  useEffect(() => {
    const handleOnline = () => {
      showNetworkNotice("Back online", "online");
    };

    const handleOffline = () => {
      showNetworkNotice("You're offline — showing saved content.", "offline");
    };

    const handleNoticeChange = () => {
      setNotice(currentNotice);
    };

    noticeListeners.push(handleNoticeChange);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      noticeListeners = noticeListeners.filter((l) => l !== handleNoticeChange);
    };
  }, []);

  const triggerNotice = useCallback((msg: string, type?: "offline" | "online" | "warning") => {
    showNetworkNotice(msg, type);
  }, []);

  return {
    isOnline,
    notice,
    showNetworkNotice: triggerNotice,
    dismissNetworkNotice,
  };
}
