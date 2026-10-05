import { sections } from "@/data/sections";

/** GET /api/sections: the ids of every section. */
export function GET() {
  return Response.json({ ids: Object.keys(sections) });
}
