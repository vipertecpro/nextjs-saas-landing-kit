"use client";

import { useSyncExternalStore } from "react";

const query = "(prefers-reduced-motion: reduce)";

function subscribeToSystem(onChange: () => void) {
  const media = window.matchMedia(query);
  media.addEventListener("change", onChange);

  return () => media.removeEventListener("change", onChange);
}

function subscribe(onChange: () => void) {
  const stopSystem = subscribeToSystem(onChange);
  // The motion switch in the header sets data-motion="on" or "off" on <html>.
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-motion"] });

  return () => {
    stopSystem();
    observer.disconnect();
  };
}

/**
 * Whether the visitor's device asks for reduced motion.
 */
export function useSystemPrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeToSystem,
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/**
 * Whether to keep things still. The visitor's choice in the header wins;
 * without one, their device's reduced-motion setting decides. It is false
 * while the page hydrates, matching the server's HTML, and updates straight
 * after, so there are never hydration errors.
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => {
      const choice = document.documentElement.dataset.motion;

      return choice === "off" || (choice !== "on" && window.matchMedia(query).matches);
    },
    () => false,
  );
}
