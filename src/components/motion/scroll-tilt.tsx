"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import type { ReactNode } from "react";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/**
 * Leans its content back in 3D and straightens it as the visitor scrolls
 * it into view, like a screen being lifted to face them.
 */
export function ScrollTilt({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const rotateX = useTransform(scrollYProgress, [0, 1], [24, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);

  return (
    <div ref={ref} className={className} style={{ perspective: "1400px" }}>
      <motion.div style={reduceMotion ? undefined : { rotateX, scale, transformOrigin: "center top" }}>{children}</motion.div>
    </div>
  );
}
