"use client";

import Link from "next/link";
import { useState, type FormEvent, type ReactNode } from "react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

/**
 * The frame shared by the sign-in, sign-up and reset pages. The forms are
 * ready to connect to your authentication provider (Auth.js, Clerk,
 * Supabase, your own API): replace onSubmit. Until then, submitting
 * explains that sign-in isn't connected.
 */
export function AuthCard({
  title,
  subtitle,
  submitLabel,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  submitLabel: string;
  children: ReactNode;
  footer: ReactNode;
}) {
  const [notice, setNotice] = useState("");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice("Sign-in isn't connected yet. Connect your authentication provider (see the README, “Authentication”).");
  }

  return (
    <section className="py-16 sm:py-24">
      <div className="container-page flex max-w-md flex-col gap-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <Logo />
          <h1 className="font-heading text-2xl font-semibold tracking-tight">{title}</h1>
          <p className="text-muted-foreground">{subtitle}</p>
        </div>
        <form onSubmit={onSubmit} className="flex flex-col gap-4 rounded-2xl border bg-card p-6">
          {children}
          {notice && (
            <p role="status" className="rounded-lg bg-muted p-3 text-sm">
              {notice}
            </p>
          )}
          <Button type="submit" size="lg" className="h-10">
            {submitLabel}
          </Button>
        </form>
        <p className="text-center text-sm text-muted-foreground">{footer}</p>
      </div>
    </section>
  );
}

export function AuthLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="font-medium text-primary underline-offset-4 hover:underline">
      {children}
    </Link>
  );
}
