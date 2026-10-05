"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Reveal } from "@/components/motion/reveal";
import { SectionShell } from "@/components/section-shell";
import { buttonVariants } from "@/components/ui/button";
import type { RoiContent } from "@/data/types";
import { cn } from "@/lib/utils";

const hoursPerWorkYear = 1800;

/**
 * Three sliders and three results. The sum is simple on purpose, so a
 * visitor can check it: people x hours a week x 52 weeks x the share of
 * that time Aurora saves.
 */
export function RoiCalculator({ content }: { content: RoiContent }) {
  const { people, hours, rate } = content.inputs;
  const [values, setValues] = useState({ people: people.default, hours: hours.default, rate: rate.default });

  const hoursSaved = Math.round(values.people * values.hours * 52 * content.timeSaved);
  const moneySaved = hoursSaved * values.rate;
  const peopleSaved = hoursSaved / hoursPerWorkYear;

  return (
    <SectionShell eyebrow={content.eyebrow} title={content.title} highlight={content.highlight} subtitle={content.subtitle}>
      <Reveal>
        <div className="mx-auto grid w-full max-w-5xl overflow-hidden rounded-2xl border bg-card lg:grid-cols-[1fr_22rem]">
          <div className="flex flex-col gap-8 p-6 sm:p-8">
            {(["people", "hours", "rate"] as const).map((key) => {
              const input = content.inputs[key];

              return (
                <label key={key} className="flex flex-col gap-3">
                  <span className="flex items-baseline justify-between gap-4 text-sm">
                    <span>{input.label}</span>
                    <span className="font-heading text-lg font-semibold tabular-nums">
                      {key === "rate" ? content.currency : ""}
                      {values[key].toLocaleString("en-US")}
                    </span>
                  </span>
                  <input
                    type="range"
                    min={input.min}
                    max={input.max}
                    step={input.step}
                    value={values[key]}
                    onChange={(event) => setValues({ ...values, [key]: Number(event.target.value) })}
                    className="w-full accent-(--primary)"
                  />
                </label>
              );
            })}
          </div>

          <div className="relative flex flex-col justify-center gap-6 overflow-hidden border-t bg-primary/5 p-6 sm:p-8 lg:border-s lg:border-t-0">
            <div aria-hidden className="aurora opacity-25" />
            <Result value={hoursSaved.toLocaleString("en-US")} label={content.results.hours} />
            <Result value={`${content.currency}${moneySaved.toLocaleString("en-US")}`} label={content.results.money} large />
            <Result value={peopleSaved.toFixed(1)} label={content.results.people} />
            <Link href={content.cta.href} className={cn(buttonVariants({ size: "lg" }), "relative")}>
              {content.cta.label}
              <ArrowRight data-icon="inline-end" />
            </Link>
          </div>
        </div>
      </Reveal>
    </SectionShell>
  );
}

function Result({ value, label, large = false }: { value: string; label: string; large?: boolean }) {
  return (
    <div className="relative" aria-live="polite">
      <p className={cn("font-heading font-semibold tracking-tight tabular-nums", large ? "text-gradient text-5xl" : "text-3xl")}>{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
