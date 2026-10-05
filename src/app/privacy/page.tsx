import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { site } from "@/config/site";

export const metadata: Metadata = { title: "Privacy Policy", alternates: { canonical: "/privacy" } };

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="1 October 2026">
      <p>
        This policy explains what personal data {site.name} collects, why, and the choices you have. Replace this template with a policy
        that matches how your product actually handles data.
      </p>
      <h2>What we collect</h2>
      <ul>
        <li>Account details you give us, such as your name and email address.</li>
        <li>Messages you send through our contact form or by email.</li>
        <li>Basic usage data, such as pages visited, to improve the product.</li>
      </ul>
      <h2>How we use it</h2>
      <p>To provide and improve the service, reply to you, and send product updates you’ve asked for. We never sell your data.</p>
      <h2>Your rights</h2>
      <p>
        You can ask for a copy of your data or ask us to delete it at any time by emailing <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </LegalPage>
  );
}
