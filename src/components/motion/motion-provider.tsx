"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/**
 * Turns animations into instant changes for visitors whose system asks for
 * reduced motion, or who switched motion off in the header.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();

  return <MotionConfig reducedMotion={reduceMotion ? "always" : "never"}>{children}</MotionConfig>;
}
