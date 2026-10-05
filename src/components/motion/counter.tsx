"use client";

import { animate, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/**
 * A number that counts up from zero the first time it scrolls into view.
 */
export function Counter({ value, decimals = 0, suffix = "" }: { value: number; decimals?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(0);
  const format = (number: number) =>
    number.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

  useEffect(() => {
    if (!inView || reduceMotion) {
      return;
    }

    const controls = animate(0, value, { duration: 1.6, ease: [0.16, 1, 0.3, 1], onUpdate: setDisplay });

    return () => controls.stop();
  }, [inView, reduceMotion, value]);

  return (
    <span ref={ref} className="tabular-nums">
      <span className="sr-only">
        {format(value)}
        {suffix}
      </span>
      <span aria-hidden>
        {format(reduceMotion ? value : display)}
        {suffix}
      </span>
    </span>
  );
}
