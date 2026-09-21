"use client";

import { useEffect } from "react";

export function ServiceWorkerRegistration() {
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      "serviceWorker" in navigator
    ) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then((registration) => {
            // Check for updates periodically
            registration.onupdatefound = () => {
              const installingWorker = registration.installing;
              if (installingWorker) {
                installingWorker.onstatechange = () => {
                  if (installingWorker.state === "installed") {
                    if (navigator.serviceWorker.controller) {
                      console.log("New Parlour content is available; please refresh.");
                    } else {
                      console.log("Parlour content is cached for offline use.");
                    }
                  }
                };
              }
            };
          })
          .catch((error) => {
            console.warn("ServiceWorker registration failed: ", error);
          });
      });
    }
  }, []);

  return null;
}
