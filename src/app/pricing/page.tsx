import type { Metadata } from "next";
import { SectionBlock } from "@/components/section-block";
import { Pricing } from "@/components/sections/pricing";
import { getSection } from "@/lib/api";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Simple pricing for teams of every size, with a 14-day free trial on every plan.",
  alternates: { canonical: "/pricing" },
};

export default async function PricingPage() {
  const pricing = await getSection("pricing");

  return (
    <>
      <Pricing content={pricing} asPageHeading />
      <SectionBlock id="faq" />
      <SectionBlock id="cta" />
    </>
  );
}
