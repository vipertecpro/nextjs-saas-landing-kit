import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { SectionHeading } from "@/components/section-heading";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Talk to the ${site.name} team about plans, demos or anything else.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <section className="py-20">
      <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.4fr]">
        <div className="flex flex-col gap-4">
          <SectionHeading as="h1" eyebrow="Contact" title="Let's talk" className="items-start text-start" />
          <p className="text-lg text-muted-foreground">
            Questions about plans, a demo for your team, or help getting started. We reply within one business day.
          </p>
          <p className="text-muted-foreground">
            Prefer email? Write to{" "}
            <a href={`mailto:${site.email}`} className="text-primary underline underline-offset-4">
              {site.email}
            </a>
            .
          </p>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
