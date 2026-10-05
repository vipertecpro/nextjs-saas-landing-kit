import type { Metadata } from "next";
import { Cta } from "@/components/sections/cta";
import { Faq } from "@/components/sections/faq";
import { Pricing } from "@/components/sections/pricing";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Simple pricing for teams of every size, with a 14-day free trial on every plan.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <>
      <Pricing asPageHeading />
      <Faq />
      <Cta />
    </>
  );
}
