import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FaqContent } from "@/data/types";

/**
 * Questions and answers. They are also published as FAQ structured data, so
 * search engines can show them directly in results.
 */
export function Faq({ content }: { content: FaqContent }) {
  const faqs = content.items;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <section id="faq" className="scroll-mt-20 py-24">
      <div className="container-page flex max-w-3xl flex-col gap-10">
        <Reveal>
          <SectionHeading eyebrow={content.eyebrow} title={content.title} highlight={content.highlight} subtitle={content.subtitle} />
        </Reveal>
        <Accordion className="rounded-2xl border bg-card px-6">
          {faqs.map((faq) => (
            <AccordionItem key={faq.question} value={faq.question}>
              <AccordionTrigger className="py-4 text-base">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
    </section>
  );
}
