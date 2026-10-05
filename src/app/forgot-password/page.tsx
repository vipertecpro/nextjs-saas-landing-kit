import type { Metadata } from "next";
import { AuthCard, AuthLink } from "@/components/auth-card";
import { FormField } from "@/components/form-field";

export const metadata: Metadata = { title: "Reset your password", robots: { index: false } };

export default function ForgotPasswordPage() {
  return (
    <AuthCard
      title="Reset your password"
      subtitle="We'll email you a link to choose a new one."
      submitLabel="Send reset link"
      footer={
        <>
          Remembered it? <AuthLink href="/login">Back to log in</AuthLink>
        </>
      }
    >
      <FormField label="Email" id="email" type="email" autoComplete="email" required />
    </AuthCard>
  );
}
