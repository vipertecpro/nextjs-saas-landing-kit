import type { Metadata } from "next";
import { Cta } from "@/components/sections/cta";
import { Stats } from "@/components/sections/stats";
import { SectionHeading } from "@/components/section-heading";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "About",
  description: `Why we build ${site.name}, and the team behind it.`,
  alternates: { canonical: "/about" },
};

const values = [
  { title: "Calm over busy", description: "Tools should reduce noise. Every feature has to earn its place." },
  { title: "Ship small, ship often", description: "We release every week, and we build for teams who want to do the same." },
  { title: "Customers in the room", description: "Every roadmap decision starts with what customers told us." },
];

export default function AboutPage() {
  return (
    <>
      <section className="py-20">
        <div className="container-page flex flex-col gap-12">
          <SectionHeading
            as="h1"
            eyebrow="About"
            title={`We started ${site.name} to make shipping feel calm again`}
            subtitle="After years of juggling spreadsheets, feedback inboxes and changelog docs, we built the tool we wanted: one place to plan, build and share what's next."
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
      <Stats />
      <Cta />
    </>
  );
}
