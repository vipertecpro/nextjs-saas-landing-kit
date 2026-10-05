import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { buttonVariants } from "@/components/ui/button";
import type { CtaContent } from "@/data/types";
import { Icon } from "@/lib/icons";
import { cn } from "@/lib/utils";

export function Cta({ content: cta }: { content: CtaContent }) {
  return (
    <section className="py-24">
      <Reveal className="container-page">
        <div className="relative isolate flex flex-col items-center gap-6 overflow-hidden rounded-3xl border bg-card px-6 py-20 text-center">
          <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
            <div className="aurora opacity-70" />
            <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
          </div>
          <Icon name={cta.icon} className="size-10 text-primary" />
          <h2 className="max-w-2xl font-heading text-4xl font-semibold tracking-tight text-balance sm:text-5xl">{cta.title}</h2>
          <p className="max-w-xl text-lg text-muted-foreground">{cta.subtitle}</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href={cta.primary.href} className={cn(buttonVariants({ size: "lg" }), "h-11 px-5 text-base shadow-lg shadow-primary/25")}>
              {cta.primary.label}
            </Link>
            <Link href={cta.secondary.href} className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-11 bg-background/60 px-5 text-base")}>
              {cta.secondary.label}
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
