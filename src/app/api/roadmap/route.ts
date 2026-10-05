import { sections } from "@/data/sections";

/**
 * GET /api/roadmap: the vote count for every roadmap item.
 * POST /api/roadmap { "id": "forecasts", "vote": true }: add or remove a vote.
 *
 * The dummy version counts in memory, so counts reset when the server
 * restarts and aren't shared between servers. Store them in your database.
 */
const votes = new Map(sections.roadmap.columns.flatMap((column) => column.items.map((item) => [item.id, item.votes] as const)));

export function GET() {
  return Response.json(Object.fromEntries(votes), { headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  const body: unknown = await request.json().catch(() => null);
  const id = typeof body === "object" && body !== null && "id" in body ? body.id : null;
  const vote = typeof body === "object" && body !== null && "vote" in body ? body.vote : null;

  if (typeof id !== "string" || !votes.has(id) || typeof vote !== "boolean") {
    return Response.json({ message: "Send an existing roadmap item id and vote: true or false." }, { status: 422 });
  }

  const count = Math.max(0, (votes.get(id) ?? 0) + (vote ? 1 : -1));
  votes.set(id, count);

  return Response.json({ id, votes: count });
}
