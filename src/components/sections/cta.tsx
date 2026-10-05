import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cta } from "@/content/landing";
import { cn } from "@/lib/utils";

export function Cta() {
  return (
    <section className="py-24">
      <div className="container-page">
        <div className="relative flex flex-col items-center gap-6 overflow-hidden rounded-3xl bg-primary px-6 py-16 text-center text-primary-foreground">
          <div aria-hidden className="bg-grid absolute inset-0 opacity-20" />
          <cta.icon className="relative size-10" aria-hidden />
          <h2 className="relative max-w-2xl font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">{cta.title}</h2>
          <p className="relative max-w-xl text-lg text-primary-foreground/80">{cta.subtitle}</p>
          <div className="relative flex flex-col gap-3 sm:flex-row">
            <Link href={cta.primary.href} className={cn(buttonVariants({ variant: "secondary", size: "lg" }), "h-11 px-5 text-base")}>
              {cta.primary.label}
            </Link>
            <Link
              href={cta.secondary.href}
              className={cn(
                buttonVariants({ variant: "ghost", size: "lg" }),
                "h-11 px-5 text-base text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground",
              )}
            >
              {cta.secondary.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
