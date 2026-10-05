import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { HeroDemo } from "@/components/hero-demo";
import { ScrollTilt } from "@/components/motion/scroll-tilt";
import { Globe, Wave } from "@/components/three/lazy";
import { buttonVariants } from "@/components/ui/button";
import type { HeroContent } from "@/data/types";
import { cn } from "@/lib/utils";

/**
 * The hero's entrance, in CSS, so the text is in the page from the first
 * byte (good for speed scores and visitors without JavaScript) and still
 * glides in. Each block starts a little after the one before.
 */
function Enter({ delay, className, children }: { delay: number; className?: string; children: ReactNode }) {
  return (
    <div
      className={cn("animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-700 motion-reduce:animate-none", className)}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export function Hero({ content: hero }: { content: HeroContent }) {
  return (
    <section className="relative isolate overflow-hidden pt-16 pb-24 sm:pt-24">
      <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
        <div className="aurora" />
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        {hero.background === "globe" ? (
          <div className="absolute top-8 left-1/2 aspect-square w-[min(1100px,140vw)] -translate-x-1/2 opacity-60 [mask-image:radial-gradient(circle,black_35%,transparent_68%)] dark:opacity-80">
            <Globe className="size-full" />
          </div>
        ) : (
          <div className="absolute inset-x-0 top-0 h-[44rem] opacity-70 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_70%,transparent)] dark:opacity-90">
            <Wave className="size-full" />
          </div>
        )}
      </div>

      <p
        aria-hidden
        className="absolute top-40 right-6 hidden font-mono text-[11px] tracking-[0.3em] text-muted-foreground uppercase [writing-mode:vertical-rl] xl:block"
      >
        {hero.sideNote}
      </p>

      <div className="container-page flex flex-col items-center gap-7 text-center">
        <Enter delay={0}>
          <Link
            href={hero.badge.href}
            className="group flex items-center gap-2 rounded-full border bg-background/60 py-1 ps-1 pe-3 text-sm backdrop-blur transition-colors hover:border-primary/50"
          >
            <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">{hero.badge.label}</span>
            <span className="text-muted-foreground group-hover:text-foreground">{hero.badge.text}</span>
            <ArrowRight className="size-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5" aria-hidden />
          </Link>
        </Enter>

        <Enter delay={100}>
          <h1 className="max-w-4xl font-heading text-5xl font-semibold tracking-tight text-balance sm:text-7xl">
            {hero.title} <span className="text-gradient">{hero.highlight}</span>
          </h1>
        </Enter>

        <Enter delay={200}>
          <p className="max-w-2xl text-lg text-pretty text-muted-foreground sm:text-xl">{hero.subtitle}</p>
        </Enter>

        <Enter delay={300} className="flex flex-col items-center gap-3">
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href={hero.primary.href}
              className={cn(buttonVariants({ size: "lg" }), "h-11 px-5 text-base shadow-lg shadow-primary/25")}
            >
              {hero.primary.label}
              <ArrowRight data-icon="inline-end" aria-hidden />
            </Link>
            <Link href={hero.secondary.href} className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-11 bg-background/60 px-5 text-base backdrop-blur")}>
              {hero.secondary.label}
            </Link>
          </div>
          <p className="text-sm text-muted-foreground">{hero.note}</p>
        </Enter>
      </div>

      <Enter delay={450} className="container-page mt-16">
        <ScrollTilt>
          <HeroDemo demo={hero.demo} />
        </ScrollTilt>
      </Enter>
    </section>
  );
}
