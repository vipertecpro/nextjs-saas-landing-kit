"use client";

import { useSyncExternalStore } from "react";

function subscribe(onChange: () => void) {
  // Light/dark and the colour theme are attributes on <html>.
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "data-theme", "style"] });

  return () => observer.disconnect();
}

let canvas: HTMLCanvasElement | null = null;

/** A CSS colour (including oklch) as rgb(), which three.js understands. */
function toRgb(cssColor: string): string {
  canvas ??= document.createElement("canvas");
  canvas.width = canvas.height = 1;
  const context = canvas.getContext("2d", { willReadFrequently: true });

  if (!context || cssColor === "") {
    return "rgb(139, 92, 246)";
  }

  context.clearRect(0, 0, 1, 1);
  context.fillStyle = cssColor;
  context.fillRect(0, 0, 1, 1);
  const [red, green, blue] = context.getImageData(0, 0, 1, 1).data;

  return `rgb(${red}, ${green}, ${blue})`;
}

/**
 * The current value of a theme colour such as "--primary", updated when
 * the visitor switches light/dark or colour theme, so 3D scenes match the
 * rest of the page.
 */
export function useThemeColor(variable: `--${string}`): string {
  return useSyncExternalStore(
    subscribe,
    () => toRgb(getComputedStyle(document.documentElement).getPropertyValue(variable).trim()),
    () => "rgb(139, 92, 246)",
  );
}
