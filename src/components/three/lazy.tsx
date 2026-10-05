"use client";

import dynamic from "next/dynamic";

/**
 * The 3D elements load in the browser after the page, so three.js never
 * slows down the first paint. Each shows a soft glow while it loads.
 */
function Placeholder() {
  return <div aria-hidden className="size-full animate-pulse rounded-full bg-primary/5 blur-3xl" />;
}

export const Globe = dynamic(() => import("@/components/three/globe"), { ssr: false, loading: Placeholder });

export const BarChart3D = dynamic(() => import("@/components/three/bar-chart-3d"), { ssr: false, loading: Placeholder });

export const Wave = dynamic(() => import("@/components/three/wave"), { ssr: false, loading: Placeholder });
