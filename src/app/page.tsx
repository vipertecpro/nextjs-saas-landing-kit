import { SectionBlock } from "@/components/section-block";
import { homeSections } from "@/config/home";

/**
 * The landing page. Choose and order its sections in src/config/home.ts;
 * each one loads its content from the API.
 */
export default function Home() {
  return homeSections.map((id) => <SectionBlock key={id} id={id} />);
}
