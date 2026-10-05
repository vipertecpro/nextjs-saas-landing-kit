"use client";

import { useSyncExternalStore } from "react";

const query = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const media = window.matchMedia(query);
  media.addEventListener("change", onChange);
  // The motion switch in the header sets data-motion="off" on <html>.
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-motion"] });

  return () => {
    media.removeEventListener("change", onChange);
    observer.disconnect();
  };
}

/**
 * Whether to keep things still: the visitor's system asks for reduced
 * motion, or they switched motion off in the header. It is false while the
 * page hydrates, matching the server's HTML, and updates straight after, so
 * there are never hydration errors.
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches || document.documentElement.dataset.motion === "off",
    () => false,
  );
}
