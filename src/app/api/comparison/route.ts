import { comparison } from "@/data/pages";

/** GET /api/comparison: the comparison table. */
export function GET() {
  return Response.json(comparison);
}
