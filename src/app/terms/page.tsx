import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { site } from "@/config/site";

export const metadata: Metadata = { title: "Terms of Service", alternates: { canonical: "/terms" } };

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" updated="1 October 2026">
      <p>
        These terms govern your use of {site.name}. Replace this template with terms written for your business and country.
      </p>
      <h2>Your account</h2>
      <p>Keep your login details safe. You are responsible for activity on your account.</p>
      <h2>Payments and trials</h2>
      <p>Paid plans renew automatically until cancelled. Trials end after 14 days unless you choose a plan.</p>
      <h2>Acceptable use</h2>
      <p>Don’t misuse the service, attempt to break it, or use it for anything unlawful.</p>
      <h2>Contact</h2>
      <p>
        Questions about these terms? Email <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </LegalPage>
  );
}
