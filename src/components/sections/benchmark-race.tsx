"use client";

import { Trophy } from "lucide-react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { SectionShell } from "@/components/section-shell";
import type { BenchmarkContent } from "@/data/types";
import { cn } from "@/lib/utils";

/**
 * Bars that grow to show how long each approach takes. The times range from
 * seconds to days, so the bars use a log scale and the exact time is
 * written beside each one.
 */
export function BenchmarkRace({ content }: { content: BenchmarkContent }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const longest = Math.log10(Math.max(...content.rows.map((row) => row.seconds)) + 1);

  return (
    <SectionShell eyebrow={content.eyebrow} title={content.title} highlight={content.highlight} subtitle={content.subtitle}>
      <div ref={ref} className="mx-auto flex w-full max-w-4xl flex-col gap-5">
        {content.rows.map((row, index) => {
          const width = Math.max(4, (Math.log10(row.seconds + 1) / longest) * 100);

          return (
            <div key={row.name} className="flex flex-col gap-2">
              <p className="flex items-center justify-between gap-4 text-sm">
                <span className={cn("flex items-center gap-2", row.highlight && "font-semibold")}>
                  {row.highlight && <Trophy className="size-4 text-primary" aria-hidden />}
                  {row.name}
                </span>
                <span className="text-end text-muted-foreground">{row.display}</span>
              </p>
              <div className="h-3 overflow-hidden rounded-full bg-muted">
                <motion.div
                  className={cn("h-full rounded-full", row.highlight ? "bg-linear-to-r from-(--accent-1) to-(--accent-2)" : "bg-muted-foreground/30")}
                  initial={{ width: "0%" }}
                  animate={{ width: inView ? `${width}%` : "0%" }}
                  transition={{ duration: row.highlight ? 0.6 : 1.4 + index * 0.4, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </SectionShell>
  );
}
