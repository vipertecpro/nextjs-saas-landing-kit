import type { Metadata } from "next";
import { AuthCard, AuthLink } from "@/components/auth-card";
import { FormField } from "@/components/form-field";

export const metadata: Metadata = { title: "Log in", robots: { index: false } };

export default function LoginPage() {
  return (
    <AuthCard
      title="Welcome back"
      subtitle="Log in to your workspace."
      submitLabel="Log in"
      footer={
        <>
          New here? <AuthLink href="/signup">Create an account</AuthLink>
        </>
      }
    >
      <FormField label="Email" id="email" type="email" autoComplete="email" required />
      <FormField label="Password" id="password" type="password" autoComplete="current-password" required />
      <AuthLink href="/forgot-password">Forgot your password?</AuthLink>
    </AuthCard>
  );
}
