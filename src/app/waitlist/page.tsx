import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
import { WaitlistForm } from "@/components/waitlist-form";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Join the waitlist",
  description: `Get early access to ${site.name}, and 50% off your first year.`,
  alternates: { canonical: "/waitlist" },
};

const perks = ["Early access before public launch", "50% off your first year", "A direct line to the founders"];

export default function WaitlistPage() {
  return (
    <section className="relative isolate overflow-hidden py-24 sm:py-32">
      <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
        <div className="aurora" />
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      </div>
      <div className="container-page flex flex-col items-center gap-8 text-center">
        <Reveal>
          <p className="text-sm font-medium text-primary">Private beta</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="max-w-3xl font-heading text-5xl font-semibold tracking-tight text-balance sm:text-6xl">
            Be first to <span className="text-gradient">ask your data anything</span>
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-muted-foreground">
            {perks.map((perk) => (
              <li key={perk} className="flex items-center gap-2">
                <span aria-hidden className="size-1.5 rounded-full bg-primary" />
                {perk}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.15} className="flex w-full justify-center">
          <WaitlistForm />
        </Reveal>
      </div>
    </section>
  );
}
