"use client";

import { ArrowUpRight } from "lucide-react";
import { useActionState } from "react";
import type { ComponentProps } from "react";
import { type FormState, sendInquiry } from "@/app/actions";
import { cn } from "@/lib/utils";

const initial: FormState = { status: "idle", message: "" };

const fieldClass =
  "w-full border-0 border-b border-input bg-transparent px-0 py-2.5 text-base outline-none transition-colors placeholder:text-muted-foreground/70 focus-visible:border-primary";

function Field({ label, id, className, ...props }: { label: string; id: string } & ComponentProps<"input">) {
  return (
    <label htmlFor={id} className={cn("flex flex-col gap-1 text-sm text-muted-foreground", className)}>
      {label}
      <input id={id} name={id} className={fieldClass} {...props} />
    </label>
  );
}

function Choice({ label, id, options }: { label: string; id: string; options: string[] }) {
  return (
    <label htmlFor={id} className="flex flex-col gap-1 text-sm text-muted-foreground">
      {label}
      <select id={id} name={id} className={cn(fieldClass, "text-foreground [&>option]:bg-background")} defaultValue={options[0]}>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

/**
 * The enquiry form: underlined fields, two choices and a message. It is
 * sent with the sendInquiry server action.
 */
export function InquiryForm({ teamSizes, goals, submitLabel, note }: { teamSizes: string[]; goals: string[]; submitLabel: string; note: string }) {
  const [state, action, pending] = useActionState(sendInquiry, initial);

  if (state.status === "success") {
    return (
      <p role="status" className="rounded-3xl border bg-card p-8 text-lg">
        {state.message}
      </p>
    );
  }

  return (
    <form action={action} className="grid gap-x-8 gap-y-6 sm:grid-cols-2" noValidate>
      <Field label="Your name" id="name" autoComplete="name" required />
      <Field label="Work email" id="email" type="email" autoComplete="email" required />
      <Field label="Company" id="company" autoComplete="organization" className="sm:col-span-2" />
      <Choice label="Team size" id="team_size" options={teamSizes} />
      <Choice label="Main goal" id="goal" options={goals} />
      <label htmlFor="message" className="flex flex-col gap-1 text-sm text-muted-foreground sm:col-span-2">
        Your question
        <textarea id="message" name="message" rows={3} required minLength={10} className={cn(fieldClass, "resize-y")} />
      </label>
      <input type="text" name="company_website" tabIndex={-1} autoComplete="off" aria-hidden className="sr-only" />
      <p role="status" className={cn("text-sm text-destructive sm:col-span-2", !state.message && "sr-only")}>
        {state.message}
      </p>
      <div className="flex flex-col gap-3 sm:col-span-2">
        <button
          type="submit"
          disabled={pending}
          className="group flex w-fit items-center gap-3 rounded-full bg-foreground py-2 ps-6 pe-2 text-sm font-medium text-background transition-opacity disabled:opacity-60"
        >
          {pending ? "Sending…" : submitLabel}
          <span className="grid size-9 place-items-center rounded-full bg-background text-foreground transition-transform group-hover:rotate-45">
            <ArrowUpRight className="size-4" aria-hidden />
          </span>
        </button>
        <p className="text-xs text-muted-foreground">{note}</p>
      </div>
    </form>
  );
}
