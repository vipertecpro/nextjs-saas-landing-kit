"use client";

import { useActionState } from "react";
import { subscribe, type FormState } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const initial: FormState = { status: "idle", message: "" };

/**
 * Email sign-up. Works without JavaScript too, as a plain form post.
 */
export function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const [state, action, pending] = useActionState(subscribe, initial);

  return (
    <form action={action} className="flex flex-col gap-2" noValidate>
      <label htmlFor={compact ? "newsletter-footer" : "newsletter"} className={compact ? "text-sm font-medium" : "sr-only"}>
        Get product updates by email
      </label>
      <div className={cn("flex gap-2", compact ? "flex-row" : "flex-col sm:flex-row")}>
        <Input
          id={compact ? "newsletter-footer" : "newsletter"}
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="you@company.com"
          aria-describedby={state.message ? `${compact ? "newsletter-footer" : "newsletter"}-status` : undefined}
          className={compact ? "h-9" : "h-10 sm:w-72"}
        />
        <input type="text" name="company_website" tabIndex={-1} autoComplete="off" aria-hidden className="sr-only" />
        <Button type="submit" size={compact ? "default" : "lg"} disabled={pending} className={compact ? "h-9" : "h-10 px-4"}>
          {pending ? "Subscribing…" : "Subscribe"}
        </Button>
      </div>
      <p
        id={`${compact ? "newsletter-footer" : "newsletter"}-status`}
        role="status"
        className={cn("text-sm", state.status === "error" ? "text-destructive" : "text-muted-foreground", !state.message && "sr-only")}
      >
        {state.message}
      </p>
    </form>
  );
}
