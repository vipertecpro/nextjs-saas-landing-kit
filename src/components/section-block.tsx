import type { ComponentType } from "react";
import { type PageSectionId, sections } from "@/components/sections/registry";
import type { SectionData } from "@/data/types";
import { getSection } from "@/lib/api";

/**
 * Loads a section's content from the API and renders the section with it.
 * Sections on a page load in parallel.
 */
export async function SectionBlock<Id extends PageSectionId>({ id }: { id: Id }) {
  const content = await getSection(id);
  // TypeScript can't link sections[id] to SectionData[id] on its own.
  const Section = sections[id].component as ComponentType<{ content: SectionData[Id] }>;

  return <Section content={content} />;
}
