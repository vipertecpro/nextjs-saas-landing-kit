"use client";

import { Check } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { pricing, type Plan } from "@/content/landing";
import { cn } from "@/lib/utils";

/**
 * Plans with a monthly / yearly switch. Prices are whole dollars in
 * src/content/landing.ts; a plan without a price shows "Custom".
 */
export function Pricing({ asPageHeading = false }: { asPageHeading?: boolean }) {
  const [yearly, setYearly] = useState(false);

  return (
    <section id="pricing" className="scroll-mt-20 py-24">
      <div className="container-page flex flex-col gap-10">
        <SectionHeading as={asPageHeading ? "h1" : "h2"} eyebrow="Pricing" title={pricing.title} subtitle={pricing.subtitle} />

        <div className="flex items-center justify-center gap-3 text-sm">
          <span className={cn(!yearly && "font-medium")}>Monthly</span>
          <Switch checked={yearly} onCheckedChange={setYearly} aria-label="Bill yearly" />
          <span className={cn(yearly && "font-medium")}>Yearly</span>
          <Badge variant="secondary" className="rounded-full">
            {pricing.yearlyNote}
          </Badge>
        </div>

        <ul className="grid items-stretch gap-6 lg:grid-cols-3">
          {pricing.plans.map((plan) => (
            <li key={plan.name}>
              <PlanCard plan={plan} yearly={yearly} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function PlanCard({ plan, yearly }: { plan: Plan; yearly: boolean }) {
  const price = yearly ? plan.yearly : plan.monthly;

  return (
    <div
      className={cn(
        "relative flex h-full flex-col gap-6 rounded-2xl border bg-card p-6",
        plan.highlighted && "border-primary shadow-xl shadow-primary/10 ring-1 ring-primary",
      )}
    >
      {plan.highlighted && <Badge className="absolute -top-3 left-6 rounded-full">Most popular</Badge>}
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold">{plan.name}</h3>
        <p className="text-sm text-muted-foreground">{plan.description}</p>
      </div>
      <p className="flex items-baseline gap-1">
        {price === null ? (
          <span className="font-heading text-4xl font-semibold tracking-tight">Custom</span>
        ) : (
          <>
            <span className="font-heading text-4xl font-semibold tracking-tight">${price}</span>
            <span className="text-sm text-muted-foreground">/{yearly ? "year" : "month"}</span>
          </>
        )}
      </p>
      <Link
        href={plan.cta.href}
        className={cn(buttonVariants({ variant: plan.highlighted ? "default" : "outline", size: "lg" }), "h-10")}
      >
        {plan.cta.label}
      </Link>
      <ul className="flex flex-col gap-2.5 text-sm">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2">
            <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}
