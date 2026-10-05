"use client";

import { Pause, Play } from "lucide-react";
import { useEffect } from "react";
import { buttonVariants } from "@/components/ui/button";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { useStoredValue } from "@/lib/use-stored-value";
import { cn } from "@/lib/utils";

/**
 * Pauses or plays every animation on the site, including the 3D. Without a
 * choice, the visitor's device setting for reduced motion decides; the
 * choice made here wins over it and is remembered.
 */
export function MotionToggle() {
  const [motion, setMotion] = useStoredValue("motion");
  const paused = useReducedMotion();

  useEffect(() => {
    if (motion === "on" || motion === "off") {
      document.documentElement.dataset.motion = motion;
    } else {
      delete document.documentElement.dataset.motion;
    }
  }, [motion]);

  return (
    <button
      type="button"
      onClick={() => setMotion(paused ? "on" : "off")}
      aria-pressed={paused}
      aria-label={paused ? "Play animations" : "Pause animations"}
      title={paused ? "Play animations" : "Pause animations"}
      className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}
    >
      {paused ? <Play className="size-4" aria-hidden /> : <Pause className="size-4" aria-hidden />}
    </button>
  );
}
