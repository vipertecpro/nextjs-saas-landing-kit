import { NewsletterForm } from "@/components/newsletter-form";
import { SectionHeading } from "@/components/section-heading";

export function Newsletter() {
  return (
    <section className="pb-24">
      <div className="container-page flex flex-col items-center gap-6 rounded-3xl border bg-card px-6 py-12">
        <SectionHeading title="Product updates, once a month" subtitle="New features, tips and the occasional behind-the-scenes post. No spam." />
        <NewsletterForm />
      </div>
    </section>
  );
}
