"use client";

import { ArrowUpRight } from "lucide-react";
import { type MotionValue, motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { SectionHeading } from "@/components/section-heading";
import type { LayersContent } from "@/data/types";
import { cn } from "@/lib/utils";

/**
 * Cards that stack on top of each other as the visitor scrolls, each one
 * pushing the one before it slightly back. The heading stays beside them
 * with a counter of the layer in view.
 */
export function Layers({ content }: { content: LayersContent }) {
  const list = useRef<HTMLOListElement>(null);
  const cards = useRef<(HTMLLIElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: list, offset: ["start start", "end end"] });
  const total = content.items.length;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(Number((entry.target as HTMLElement).dataset.index));
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );

    cards.current.forEach((card) => card && observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24">
      <div className="container-page grid gap-12 lg:grid-cols-[2fr_3fr] lg:gap-16">
        <div className="flex flex-col gap-8 lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            eyebrow={content.eyebrow}
            title={content.title}
            highlight={content.highlight}
            subtitle={content.subtitle}
            className="mx-0 items-start text-start"
          />
          <Link href={content.cta.href} className="group flex w-fit items-center gap-2 border-b border-foreground/40 pb-1 text-sm font-medium">
            {content.cta.label}
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
          </Link>
          <p aria-hidden className="hidden items-center gap-4 font-mono text-xs text-muted-foreground lg:flex">
            {String(active + 1).padStart(2, "0")}
            <span className="relative h-px w-28 bg-border">
              <span className="absolute inset-y-0 left-0 bg-primary transition-[width] duration-500" style={{ width: `${((active + 1) / total) * 100}%` }} />
            </span>
            {String(total).padStart(2, "0")}
          </p>
        </div>

        <ol ref={list} className="flex flex-col gap-6">
          {content.items.map((item, index) => (
            <li
              key={item.title}
              ref={(element) => {
                cards.current[index] = element;
              }}
              data-index={index}
              className="lg:sticky"
              style={{ top: `calc(7rem + ${index * 1.75}rem)` }}
            >
              <LayerCard item={item} index={index} total={total} progress={scrollYProgress} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function LayerCard({
  item,
  index,
  total,
  progress,
}: {
  item: LayersContent["items"][number];
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  // Each card shrinks a little once the cards after it start covering it.
  const scale = useTransform(progress, [index / total, 1], [1, 1 - (total - 1 - index) * 0.04]);
  const last = index === total - 1;

  return (
    <motion.article
      style={{ scale, transformOrigin: "center top" }}
      className={cn(
        "flex min-h-80 flex-col justify-between gap-10 rounded-3xl border p-8 shadow-xl shadow-black/10 sm:p-10",
        last ? "border-transparent bg-linear-to-br from-(--accent-1) to-(--accent-2) text-white" : "bg-card",
      )}
    >
      <div className="flex flex-col gap-4">
        <p className={cn("font-mono text-xs tracking-[0.2em] uppercase", last ? "text-white/80" : "text-muted-foreground")}>{item.kicker}</p>
        <h3 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">{item.title}</h3>
        <p className={cn("max-w-md", last ? "text-white/85" : "text-muted-foreground")}>{item.description}</p>
      </div>
      <div className={cn("flex items-end justify-between gap-4 border-t pt-5", last ? "border-white/25" : "")}>
        <p className={cn("font-mono text-xs tracking-[0.2em] uppercase", last ? "text-white/80" : "text-muted-foreground")}>{item.tags.join(" · ")}</p>
        <span className="font-heading text-4xl font-semibold tabular-nums opacity-80">{String(index + 1).padStart(2, "0")}</span>
      </div>
    </motion.article>
  );
}
