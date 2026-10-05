import { Cta } from "@/components/sections/cta";
import { Faq } from "@/components/sections/faq";
import { Features } from "@/components/sections/features";
import { Hero } from "@/components/sections/hero";
import { Highlights } from "@/components/sections/highlights";
import { LogoCloud } from "@/components/sections/logo-cloud";
import { Newsletter } from "@/components/sections/newsletter";
import { Pricing } from "@/components/sections/pricing";
import { Stats } from "@/components/sections/stats";
import { Steps } from "@/components/sections/steps";
import { Testimonials } from "@/components/sections/testimonials";

/**
 * The landing page. Reorder or remove sections here; their words live in
 * src/content/landing.ts.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <LogoCloud />
      <Features />
      <Highlights />
      <Stats />
      <Steps />
      <Testimonials />
      <Pricing />
      <Faq />
      <Cta />
      <Newsletter />
    </>
  );
}
