import { changelog } from "@/data/pages";

/** GET /api/changelog: every release, newest first. */
export function GET() {
  return Response.json(changelog);
}
