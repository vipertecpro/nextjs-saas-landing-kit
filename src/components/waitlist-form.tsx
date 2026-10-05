"use client";

import { Check, Copy } from "lucide-react";
import { useActionState, useState } from "react";
import { joinWaitlist, type WaitlistState } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { site } from "@/config/site";
import { cn } from "@/lib/utils";

const initial: WaitlistState = { status: "idle", message: "" };

/**
 * The waitlist sign-up. After joining, people get a personal referral link
 * to share; visits through it carry ?ref= so your webhook can credit them.
 */
export function WaitlistForm() {
  const [state, action, pending] = useActionState(joinWaitlist, initial);
  const [copied, setCopied] = useState(false);

  // Credits whoever shared the link this visitor arrived from.
  function submit(formData: FormData) {
    formData.set("ref", new URLSearchParams(window.location.search).get("ref") ?? "");

    return action(formData);
  }

  if (state.status === "success") {
    const origin = typeof window === "undefined" ? site.url : window.location.origin;
    const link = state.referralCode ? `${origin}/waitlist?ref=${state.referralCode}` : "";

    return (
      <div role="status" className="flex w-full max-w-md flex-col items-center gap-4 rounded-2xl border bg-card p-6 text-center">
        <span className="grid size-12 place-items-center rounded-full bg-primary/15 text-primary">
          <Check className="size-6" aria-hidden />
        </span>
        <p className="text-lg font-semibold">{state.message}</p>
        {state.position && (
          <p className="text-muted-foreground">
            You&apos;re <span className="font-semibold text-foreground">#{state.position.toLocaleString("en-US")}</span> in line.
          </p>
        )}
        {link && (
          <>
            <p className="text-sm text-muted-foreground">Move up the list: share your link, and every friend who joins bumps you forward.</p>
            <div className="flex w-full items-center gap-2 rounded-lg border bg-background p-1 ps-3">
              <code className="min-w-0 flex-1 truncate text-left text-sm">{link}</code>
              <Button
                type="button"
                size="sm"
                variant="secondary"
                onClick={async () => {
                  await navigator.clipboard.writeText(link);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
              >
                {copied ? <Check data-icon="inline-start" aria-hidden /> : <Copy data-icon="inline-start" aria-hidden />}
                {copied ? "Copied" : "Copy"}
              </Button>
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <form action={submit} className="flex w-full max-w-md flex-col gap-2" noValidate>
      <label htmlFor="waitlist-email" className="sr-only">
        Work email
      </label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <Input id="waitlist-email" name="email" type="email" autoComplete="email" required placeholder="you@company.com" className="h-11 flex-1" />
        <input type="text" name="company_website" tabIndex={-1} autoComplete="off" aria-hidden className="sr-only" />
        <Button type="submit" size="lg" disabled={pending} className="h-11 px-5 shadow-lg shadow-primary/25">
          {pending ? "Joining…" : "Join the waitlist"}
        </Button>
      </div>
      <p role="status" className={cn("text-sm", state.status === "error" ? "text-destructive" : "text-muted-foreground")}>
        {state.message || "Free during the beta. We'll only email you about access."}
      </p>
    </form>
  );
}
