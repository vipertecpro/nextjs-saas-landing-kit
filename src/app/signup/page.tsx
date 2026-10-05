import type { Metadata } from "next";
import { AuthCard, AuthLink } from "@/components/auth-card";
import { FormField } from "@/components/form-field";

export const metadata: Metadata = { title: "Start your free trial", robots: { index: false } };

export default function SignupPage() {
  return (
    <AuthCard
      title="Start your free trial"
      subtitle="14 days free. No credit card required."
      submitLabel="Create account"
      footer={
        <>
          Already have an account? <AuthLink href="/login">Log in</AuthLink>
        </>
      }
    >
      <FormField label="Full name" id="name" autoComplete="name" required />
      <FormField label="Work email" id="email" type="email" autoComplete="email" required />
      <FormField label="Password" id="password" type="password" autoComplete="new-password" minLength={8} required />
      <p className="text-xs text-muted-foreground">
        By creating an account you agree to the <AuthLink href="/terms">Terms</AuthLink> and{" "}
        <AuthLink href="/privacy">Privacy Policy</AuthLink>.
      </p>
    </AuthCard>
  );
}
