"use client";

import { useActionState } from "react";
import { sendContactMessage, type FormState } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const initial: FormState = { status: "idle", message: "" };

export function ContactForm() {
  const [state, action, pending] = useActionState(sendContactMessage, initial);

  if (state.status === "success") {
    return (
      <p role="status" className="rounded-2xl border bg-card p-6 text-lg">
        {state.message}
      </p>
    );
  }

  return (
    <form action={action} className="flex flex-col gap-5 rounded-2xl border bg-card p-6" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" autoComplete="name" required />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Work email</Label>
          <Input id="email" name="email" type="email" autoComplete="email" required />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="company">Company (optional)</Label>
        <Input id="company" name="company" autoComplete="organization" />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="message">How can we help?</Label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          rows={5}
          className="rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"
        />
      </div>
      <input type="text" name="company_website" tabIndex={-1} autoComplete="off" aria-hidden className="sr-only" />
      <p role="status" className={cn("text-sm text-destructive", !state.message && "sr-only")}>
        {state.message}
      </p>
      <Button type="submit" size="lg" disabled={pending} className="h-10 self-start px-5">
        {pending ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
