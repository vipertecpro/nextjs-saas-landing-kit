import { activity } from "@/data/sections";

/**
 * GET /api/activity: the latest activity for the live feed. The dummy
 * version hands out the events in src/data/sections.ts in turn, a new one
 * every few seconds; replace it with a query on your own events.
 */
export function GET() {
  const tick = Math.floor(Date.now() / 2400);
  const event = activity[tick % activity.length];

  return Response.json({ id: tick, ...event }, { headers: { "Cache-Control": "no-store" } });
}
