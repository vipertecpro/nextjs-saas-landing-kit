import { NewsletterForm } from "@/components/newsletter-form";
import { SectionHeading } from "@/components/section-heading";
import type { NewsletterContent } from "@/data/types";

export function Newsletter({ content }: { content: NewsletterContent }) {
  return (
    <section className="pb-24">
      <div className="container-page flex flex-col items-center gap-6 rounded-3xl border bg-card px-6 py-12">
        <SectionHeading title={content.title} subtitle={content.subtitle} />
        <NewsletterForm />
      </div>
    </section>
  );
}
