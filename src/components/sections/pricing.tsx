"use client";

import { Check } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import type { Plan, PricingContent } from "@/data/types";
import { cn } from "@/lib/utils";

/**
 * Plans with a monthly / yearly switch, and a usage calculator underneath.
 * Prices are whole dollars in src/data/sections.ts; a plan without a price
 * shows "Custom".
 */
export function Pricing({ content: pricing, asPageHeading = false }: { content: PricingContent; asPageHeading?: boolean }) {
  const [yearly, setYearly] = useState(false);

  return (
    <section id="pricing" className="scroll-mt-20 py-24">
      <div className="container-page flex flex-col gap-10">
        <Reveal>
          <SectionHeading as={asPageHeading ? "h1" : "h2"} eyebrow={pricing.eyebrow} title={pricing.title} highlight={pricing.highlight} subtitle={pricing.subtitle} />
        </Reveal>

        <div className="flex items-center justify-center gap-3 text-sm">
          <span className={cn(!yearly && "font-medium")}>Monthly</span>
          <Switch checked={yearly} onCheckedChange={setYearly} aria-label="Bill yearly" />
          <span className={cn(yearly && "font-medium")}>Yearly</span>
          <Badge variant="secondary" className="rounded-full">
            {pricing.yearlyNote}
          </Badge>
        </div>

        <ul className="grid items-stretch gap-6 lg:grid-cols-3">
          {pricing.plans.map((plan, index) => (
            <Reveal as="li" key={plan.name} delay={index * 0.08}>
              <PlanCard plan={plan} yearly={yearly} />
            </Reveal>
          ))}
        </ul>

        <Reveal>
          <UsageCalculator calculator={pricing.calculator} />
        </Reveal>
      </div>
    </section>
  );
}

function PlanCard({ plan, yearly }: { plan: Plan; yearly: boolean }) {
  const price = yearly ? plan.yearly : plan.monthly;
  const card = (
    <div className="relative flex h-full flex-col gap-6 rounded-2xl bg-card p-6">
      <div className="flex flex-col gap-2">
        <h3 className="flex items-center justify-between gap-3 text-lg font-semibold">
          {plan.name}
          {/* Inside the card: the highlighted card's moving border clips anything outside it. */}
          {plan.highlighted && <Badge className="rounded-full">Most popular</Badge>}
        </h3>
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
      <Link href={plan.cta.href} className={cn(buttonVariants({ variant: plan.highlighted ? "default" : "outline", size: "lg" }), "h-10")}>
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

  return plan.highlighted ? (
    <div className="beam-border h-full rounded-2xl shadow-xl shadow-primary/15">{card}</div>
  ) : (
    <div className="h-full rounded-2xl border">{card}</div>
  );
}

/**
 * Drag to set monthly usage and see what each plan would cost, including
 * questions over its allowance.
 */
function UsageCalculator({ calculator }: { calculator: PricingContent["calculator"] }) {
  const [questions, setQuestions] = useState(calculator.default);

  const costs = calculator.tiers.map((tier) => ({
    plan: tier.plan,
    cost: tier.base + Math.max(0, questions - tier.included) * tier.overage,
  }));
  const best = costs.reduce((cheapest, option) => (option.cost < cheapest.cost ? option : cheapest));

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 rounded-2xl border bg-card p-6 sm:p-8">
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-semibold">{calculator.title}</h3>
        <label htmlFor="usage" className="text-sm text-muted-foreground">
          Questions per month: <span className="font-semibold text-foreground tabular-nums">{questions.toLocaleString("en-US")}</span>
        </label>
      </div>
      <input
        id="usage"
        type="range"
        min={calculator.min}
        max={calculator.max}
        step={calculator.step}
        value={questions}
        onChange={(event) => setQuestions(Number(event.target.value))}
        className="w-full accent-(--primary)"
      />
      <div className="grid gap-3 sm:grid-cols-2">
        {costs.map((option) => (
          <div
            key={option.plan}
            className={cn("flex items-center justify-between rounded-xl border p-4", option.plan === best.plan && "border-primary bg-primary/5")}
          >
            <span className="flex flex-col">
              <span className="font-medium">{option.plan}</span>
              {option.plan === best.plan && <span className="text-xs text-primary">Best value for you</span>}
            </span>
            <span className="font-heading text-2xl font-semibold tabular-nums">${Math.round(option.cost)}/mo</span>
          </div>
        ))}
      </div>
    </div>
  );
}
