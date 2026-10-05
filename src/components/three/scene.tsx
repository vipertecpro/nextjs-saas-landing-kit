"use client";

import { Canvas } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/utils";

/**
 * A three.js canvas that only animates while it is on screen, and draws a
 * single still frame for visitors who prefer reduced motion. Every 3D
 * element in the kit renders inside one of these.
 */
export function Scene({
  children,
  className,
  camera = [0, 0, 3.2],
  interactive = false,
  eventSource,
}: {
  children: ReactNode;
  className?: string;
  camera?: [number, number, number];
  interactive?: boolean;
  /** "document" makes the scene follow the pointer anywhere on the page, not just over the canvas. */
  eventSource?: "document";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [onScreen, setOnScreen] = useState(false);
  // Scenes are only ever rendered in the browser (see lazy.tsx), so the page is there to read.
  const pageRoot = eventSource === "document" ? document.body : undefined;

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), { rootMargin: "100px" });
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} aria-hidden className={cn("relative", !interactive && "pointer-events-none", className)}>
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: camera, fov: 45 }}
        frameloop={onScreen && !reduceMotion ? "always" : "demand"}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
        eventSource={pageRoot}
        eventPrefix={pageRoot ? "client" : undefined}
      >
        {children}
      </Canvas>
    </div>
  );
}
