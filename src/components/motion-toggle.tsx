"use client";

import { Pause, Play } from "lucide-react";
import { useEffect } from "react";
import { buttonVariants } from "@/components/ui/button";
import { useStoredValue } from "@/lib/use-stored-value";
import { cn } from "@/lib/utils";

/**
 * Lets visitors pause every animation on the site, including the 3D. The
 * choice is remembered, and it is on top of the system setting for reduced
 * motion, which is always respected.
 */
export function MotionToggle() {
  const [motion, setMotion] = useStoredValue("motion");
  const off = motion === "off";

  useEffect(() => {
    if (off) {
      document.documentElement.dataset.motion = "off";
    } else {
      delete document.documentElement.dataset.motion;
    }
  }, [off]);

  return (
    <button
      type="button"
      onClick={() => setMotion(off ? null : "off")}
      aria-pressed={off}
      aria-label={off ? "Turn animations on" : "Pause animations"}
      title={off ? "Turn animations on" : "Pause animations"}
      className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}
    >
      {off ? <Play className="size-4" aria-hidden /> : <Pause className="size-4" aria-hidden />}
    </button>
  );
}
