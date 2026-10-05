import { posts } from "@/data/posts";

/** GET /api/posts: every post without its body, newest first. */
export function GET() {
  const summaries = posts
    .map(({ slug, title, description, date, author, readingMinutes }) => ({ slug, title, description, date, author, readingMinutes }))
    .sort((a, b) => b.date.localeCompare(a.date));

  return Response.json(summaries);
}
