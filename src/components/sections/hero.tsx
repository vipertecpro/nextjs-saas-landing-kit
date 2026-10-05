import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { AppPreview } from "@/components/app-preview";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { hero } from "@/content/landing";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-16 pb-20 sm:pt-24">
      <div aria-hidden className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <div className="container-page flex flex-col items-center gap-6 text-center">
        <Badge variant="secondary" className="gap-1.5 rounded-full px-3 py-1">
          <span className="size-1.5 rounded-full bg-primary" aria-hidden />
          {hero.badge}
        </Badge>
        <h1 className="max-w-4xl font-heading text-4xl font-semibold tracking-tight text-balance sm:text-6xl">{hero.title}</h1>
        <p className="max-w-2xl text-lg text-pretty text-muted-foreground sm:text-xl">{hero.subtitle}</p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href={hero.primary.href} className={cn(buttonVariants({ size: "lg" }), "h-11 px-5 text-base")}>
            {hero.primary.label}
            <ArrowRight data-icon="inline-end" aria-hidden />
          </Link>
          <Link href={hero.secondary.href} className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-11 px-5 text-base")}>
            {hero.secondary.label}
          </Link>
        </div>
        <p className="text-sm text-muted-foreground">{hero.note}</p>
      </div>
      <div className="container-page mt-16">
        <AppPreview />
      </div>
    </section>
  );
}
