import type { Metadata } from "next";
import { SectionBlock } from "@/components/section-block";
import { SectionHeading } from "@/components/section-heading";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "About",
  description: `Why we build ${site.name}, and the team behind it.`,
  alternates: { canonical: "/about" },
};

const values = [
  { title: "Show the working", description: "Every answer links to the query behind it. Trust comes from transparency." },
  { title: "Your data stays yours", description: "Read-only access, encryption everywhere, and never any training on your data." },
  { title: "Fast is a feature", description: "An answer in seconds changes how a team works. We obsess over speed." },
];

export default function AboutPage() {
  return (
    <>
      <section className="py-20">
        <div className="container-page flex flex-col gap-12">
          <SectionHeading
            as="h1"
            eyebrow="About"
            title={`We started ${site.name} so everyone can ask the data`}
            subtitle="We spent years as the people every question went through. Aurora is the analyst we wished our teams had: fast, honest about how it got the answer, and never too busy."
          />
          <ul className="grid gap-6 md:grid-cols-3">
            {values.map((value) => (
              <li key={value.title} className="flex flex-col gap-2 rounded-2xl border bg-card p-6">
                <h2 className="font-semibold">{value.title}</h2>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <SectionBlock id="stats" />
      <SectionBlock id="cta" />
    </>
  );
}
