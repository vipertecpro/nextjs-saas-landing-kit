"use client";

import type { PointerEvent, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * A card that glows softly where the pointer is.
 */
export function SpotlightCard({ children, className }: { children: ReactNode; className?: string }) {
  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
  }

  return (
    <div
      onPointerMove={onPointerMove}
      className={cn("group relative overflow-hidden rounded-2xl border bg-card transition-colors hover:border-primary/40", className)}
    >
      <div aria-hidden className="spotlight pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative h-full">{children}</div>
    </div>
  );
}
