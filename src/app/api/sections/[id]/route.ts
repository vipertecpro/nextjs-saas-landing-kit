import { sections } from "@/data/sections";
import type { SectionId } from "@/data/types";

function isSectionId(id: string): id is SectionId {
  return Object.hasOwn(sections, id);
}

/** GET /api/sections/{id}: one section's content, e.g. /api/sections/hero. */
export async function GET(_request: Request, context: RouteContext<"/api/sections/[id]">) {
  const { id } = await context.params;

  if (!isSectionId(id)) {
    return Response.json({ message: `There is no section called "${id}".` }, { status: 404 });
  }

  return Response.json(sections[id]);
}
