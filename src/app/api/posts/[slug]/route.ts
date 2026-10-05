import { posts } from "@/data/posts";

/** GET /api/posts/{slug}: one post with its body. */
export async function GET(_request: Request, context: RouteContext<"/api/posts/[slug]">) {
  const { slug } = await context.params;
  const post = posts.find((item) => item.slug === slug);

  if (!post) {
    return Response.json({ message: "Post not found." }, { status: 404 });
  }

  return Response.json(post);
}
