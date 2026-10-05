"use client";

import { Play, X } from "lucide-react";
import { useSystemPrefersReducedMotion } from "@/lib/use-reduced-motion";
import { useStoredValue } from "@/lib/use-stored-value";

/**
 * For the live demo: when a visitor's device asks for reduced motion, the
 * site stays still, which can look broken to someone evaluating the kit.
 * This says why, and offers to play the animations. Shown only with
 * NEXT_PUBLIC_DEMO_MODE=true, until the visitor makes a choice.
 */
export function MotionNotice() {
  const systemPrefersReducedMotion = useSystemPrefersReducedMotion();
  const [motion, setMotion] = useStoredValue("motion");

  if (!systemPrefersReducedMotion || motion !== null) {
    return null;
  }

  return (
    <div
      role="status"
      className="fixed bottom-4 left-4 z-50 flex max-w-sm items-start gap-3 rounded-2xl border bg-background/95 p-4 text-sm shadow-lg backdrop-blur"
    >
      <p className="flex-1 text-muted-foreground">
        Animations are paused because your device asks for reduced motion.
        <button
          type="button"
          onClick={() => setMotion("on")}
          className="mt-2 flex items-center gap-1.5 font-medium text-primary hover:underline"
        >
          <Play className="size-4" aria-hidden />
          Play animations
        </button>
      </p>
      <button
        type="button"
        onClick={() => setMotion("off")}
        aria-label="Keep animations paused"
        className="grid size-7 shrink-0 place-items-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
      >
        <X className="size-4" aria-hidden />
      </button>
    </div>
  );
}
